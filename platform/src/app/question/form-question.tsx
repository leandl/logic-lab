'use client'

import { useFieldArray, useForm } from "react-hook-form";
import zod from "zod"
import { Plus } from "lucide-react";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button/Button";

import { useRouter } from 'next/navigation';

import toast from "react-hot-toast";
import { Select } from "@/components/select";
import { useCallback, useState } from "react";
import { FormHeader } from "@/components/form-header/form-header";
import { Card } from "@/components/card/card";

import "./form-question.scss"
import { QuestionCategory, QuestionCategoryCreate } from "@/repositories/question-category.repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { Question, Variable } from "@/repositories/question.repository";

import { wrapperCreateQuestionCategoryServerToClient } from "@/actions/question-category/create-question-category.action";
import { wrapperCreateQuestionServerToClient } from "@/actions/question/create-question.action";
import { wrapperUpdateQuestionServerToClient } from "@/actions/question/update-question.action";
import { CreateQuestionUseCaseError } from "@/application/question/create-question.use-case";
import { ROUTE } from "@/config/route";
import { UpdateQuestionUseCaseError } from "@/application/question/update-question.use-case";
import { Textarea } from "@/components/textarea/textarea";
import { allComponentInputVariable } from "./input-by-variable";
import { Modal } from "@/components/Modal";


const labelVariable = {
  [Variable.INTEGER]: "INTEGER",
  [Variable.FLOAT]: "FLOAT",
  [Variable.STRING]: "STRING",
  // [Variable.BOOLEAN]: "BOOLEAN",
  // [Variable.INTEGER_ARRAY]: "ARRAY of INTEGER",
  // [Variable.FLOAT_ARRAY]: "ARRAY of FLOAT",
  // [Variable.STRING_ARRAY]: "ARRAY of STRING",
  // [Variable.BOOLEAN_ARRAY]: "ARRAY of BOOLEAN",
}

type ConvertVariableToType = {
  [Variable.INTEGER]: number;
  [Variable.FLOAT]: number;
  [Variable.STRING]: string;
  // [Variable.BOOLEAN]: boolean;
  // [Variable.INTEGER_ARRAY]: number[];
  // [Variable.FLOAT_ARRAY]: number[];
  // [Variable.STRING_ARRAY]: string[];
  // [Variable.BOOLEAN_ARRAY]: boolean[];
}




type Param<V extends Variable = Variable> = {
  name: string;
  type: V;
  description: string;
}

type Tuple<T> = readonly T[] | readonly [];
type Test<Variables extends Tuple<Variable> = any, ReturnVariable extends Variable = Variable> = {
  args: {
    [K in keyof Variables]: ConvertVariableToType[Variables[K]]
  };
  result: ConvertVariableToType[ReturnVariable];
}


type FormQuestionData<Variables extends Tuple<Variable> = Tuple<Variable>, ReturnVariable extends Variable = Variable> = {
  name: string;
  description: string;
  params: {
    [K in keyof Variables]: Param<Variables[K]>
  };
  typeResult: ReturnVariable;
  descriptionResult: string;
  categoryId: number;
  tests: Test<Variables, ReturnVariable>[];
  // documentMarkdown?: string;
}

const VariableEnum = zod.enum([
  Variable.INTEGER,
  Variable.FLOAT,
  Variable.STRING,
  // Variable.BOOLEAN,
  // Variable.INTEGER_ARRAY,
  // Variable.FLOAT_ARRAY,
  // Variable.STRING_ARRAY,
  // Variable.BOOLEAN_ARRAY,
])

const validateForVariable = {
  [Variable.INTEGER]: zod.number().int(),
  [Variable.FLOAT]: zod.number().transform(num => num.toFixed(2)),
  [Variable.STRING]: zod.string().min(1),
  // [Variable.BOOLEAN]: zod.boolean(),
  // [Variable.INTEGER_ARRAY]: zod.array(zod.number().int()),
  // [Variable.FLOAT_ARRAY]: zod.array(zod.number()).transform(numbers => numbers.map(num => num.toFixed(2))),
  // [Variable.STRING_ARRAY]: zod.array(zod.string().nonempty()),
  // [Variable.BOOLEAN_ARRAY]: zod.array(zod.boolean()),
}

const messageErrorForVariable = {
  [Variable.INTEGER]: "O valor deve ser um Inteiro",
  [Variable.FLOAT]: "O valor deve ser um Float",
  [Variable.STRING]: "O valor deve ser um String",
  // [Variable.BOOLEAN]: "O valor deve ser um Boolean",
  // [Variable.INTEGER_ARRAY]: "O valor deve ser um Vetor de Inteiro",
  // [Variable.FLOAT_ARRAY]: "O valor deve ser um Vetor de Float",
  // [Variable.STRING_ARRAY]: "O valor deve ser um Vetor de String",
  // [Variable.BOOLEAN_ARRAY]: "O valor deve ser um Vetor de Boolean",
}

const formQuestionSchema = zod.object({
  name: zod.string().min(3, "Nome deve ter mais de 2 caracteres").max(50, "Nome deve ter menos ou equal a 50 caracteres"),
  description: zod.string().min(5, "Descrição deve ter mais de 4 caracteres").max(1024, "Descrição deve ter menos ou equal a 1024 caracteres"),
  params: zod.array(
    zod.object({
      name: zod.string().min(1, "Nome deve conter no mínimo 1 caracter"),
      type: VariableEnum,
      description: zod.string().min(5, "Descrição deve ter mais de 4 caracteres"),
    })
  ).min(1, "Necessário adicionar um parâmetro"),
  typeResult: VariableEnum,
  descriptionResult: zod.string().min(5, "Descrição deve ter mais de 4 caracteres").max(250, "Descrição de Retorno deve ter menos ou equal a 250 caracteres"),
  categoryId: zod.number().positive(),
  tests: zod.array(
    zod.object({
      args: zod.array(zod.unknown()), // Use um esquema mais preciso, se possível.
      result: zod.unknown(), // Use um esquema mais preciso, se possível.
    })
  ).min(1, "Necessário adicionar um teste"),
}).superRefine(({ tests, params, typeResult }, ctx) => {
  for (let testIndex = 0; testIndex < tests.length; testIndex++) {
    const test = tests[testIndex];

    for (let paramIndex = 0; paramIndex < params.length; paramIndex++) {
      const param = params[paramIndex];
      const argument = test.args[paramIndex];
      const validator = validateForVariable[param.type];
      const result = validator.safeParse(argument);

      if (!result.success) {
        const messgeError = messageErrorForVariable[param.type]
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          path: ["tests", testIndex, "args", paramIndex],
          message: messgeError
        })
      }
    }

    const validator = validateForVariable[typeResult];
    const result = validator.safeParse(test.result);

    if (!result.success) {
      const messgeError = messageErrorForVariable[typeResult]
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["tests", testIndex, "result"],
        message: messgeError,
      })
    }
  }
})



const messageErrorForCreateQuestionUseCaseError: Record<CreateQuestionUseCaseError, string> = {
  [CreateQuestionUseCaseError.NAME_QUESTION_IN_USE]: "Nome da questão já esta sendo utlizado",
}

const messageErrorForUpdateQuestionUseCaseError: Record<UpdateQuestionUseCaseError, string> = {
  [UpdateQuestionUseCaseError.ID_INVALID]: "Identificador invalido",
  [UpdateQuestionUseCaseError.NAME_DIFFERENT_FROM_THE_ORIGINAL]: "Nome de questão não pode ser alterado"
}

type FormQuestionProps = {
  question?: Question;
  categories: QuestionCategory[];
}


export function FormQuestion({
  question,
  categories: initialCategories,
}: FormQuestionProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [isOpenModalAddCategory, setIsOpenModalAddCategory] = useState<boolean>(false);

  const {
    register: questionRegister,
    handleSubmit: questionHandleSubmit,
    control: questionControl,
    watch: questionWatch,
    formState: {
      errors
    }
  } = useForm<FormQuestionData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(formQuestionSchema),
    defaultValues: {
      categoryId: categories[0]?.id,
      typeResult: Variable.INTEGER,
      ...question
    },
  });

  const {
    register: categoryRegister,
    handleSubmit: categoryHandleSubmit
  } = useForm<{ name: string }>({ defaultValues: question });

  const {
    fields: paramFields,
    append: paramAppend,
    remove: paramRemove
  } = useFieldArray({
    control: questionControl,
    name: "params",
    rules: {
      required: true
    }
  });

  const {
    fields: testFields,
    append: testAppend,
    remove: testRemove
  } = useFieldArray({
    control: questionControl, // control props comes from useForm (optional: if you are using FormContext)
    name: "tests", // unique name for your Field Array
    rules: {
      required: true
    }
  });

  const resultType = questionWatch("typeResult", question?.typeResult ?? Variable.INTEGER);
  const params = questionWatch("params");
  const router = useRouter();

  const addParam = useCallback(() => {
    paramAppend({
      description: "",
      name: "",
      type: Variable.INTEGER
    });
  }, [paramAppend]);

  const addTest = useCallback(() => {
    testAppend({} as FormQuestionData["tests"][number]);
  }, [testAppend, params]);

  async function onSubmitQuestion(data: FormQuestionData) {
    console.log(data)
    if (question?.id) {
      const result = await wrapperUpdateQuestionServerToClient(question.id, data);
      if (result.tag === "LEFT") {
        const error = result.error;
        const messageError = messageErrorForUpdateQuestionUseCaseError[error];
        toast.error(messageError);
      }
    } else {
      const result = await wrapperCreateQuestionServerToClient(data);
      if (result.tag === "LEFT") {
        const error = result.error;
        const messageError = messageErrorForCreateQuestionUseCaseError[error];
        toast.error(messageError);
      }
    }

    router.push(ROUTE.APP.QUESTION.LIST);
  }

  async function onSubmitCategory(data: QuestionCategoryCreate) {
    const result = await wrapperCreateQuestionCategoryServerToClient(data);

    if (result.tag === "LEFT") {
      toast.error("Não possivel adicionar a categoria!");
      return;
    }

    const category = result.value;
    setCategories(prevCategories => [...prevCategories, category]);
    setIsOpenModalAddCategory(false);
  }

  const formTitle = (question?.id) ? "Editar Questão" : "Cadastrar Questão";
  const labelButtonCreateOrUpdate = (question?.id) ? "Salvar Alterção" : "Criar Questão";
  const messageErrorParamsEmpty = errors.params?.message ?? errors.params?.root?.message;
  const messageErrorTestsEmpty = errors.tests?.message ?? errors.tests?.root?.message;

  return (
    <>
      <Form className="form-question" onSubmit={questionHandleSubmit(onSubmitQuestion)}>
        <FormHeader
          title={formTitle}
          actions={(
            <Button
              className="buttonSignin"
              type="submit"
            >
              {labelButtonCreateOrUpdate}
            </Button>
          )}
        />

        <div className="container">
          <div className="row">
            <div className="col-4">

              <Card title="Informações básicas">
                <Input
                  displayName="Name"
                  {...questionRegister("name")}
                  type="text"
                  className="nameInput"
                  disabled={Boolean(question?.id)}
                  errorMessage={errors.name?.message}
                />

                <Textarea
                  displayName="Descrição"
                  {...questionRegister("description", { required: true })}
                  type="text"
                  className="nameInput"
                  errorMessage={errors.description?.message}
                />

                <div className="form-question-wrapper-category">
                  <Select
                    displayName="Categoria"
                    {...questionRegister("categoryId", { required: true, valueAsNumber: true })}

                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </Select>
                  <Button onClick={() => setIsOpenModalAddCategory(true)}><Plus /></Button>
                </div>
              </Card>

              <Card title="Informações de retorno">
                <Select
                  displayName="Tipo de retorno"
                  {...questionRegister("typeResult", { required: true })}
                  errorMessage={errors.typeResult?.message}
                >
                  {Object.entries(labelVariable).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </Select>
                <Textarea
                  displayName="Descrição do retorno"
                  {...questionRegister("descriptionResult", { required: true })}
                  type="text"
                  className="nameInput"
                  errorMessage={errors.descriptionResult?.message}
                />
              </Card>
            </div>

            <div className="col-4">
              <Button onClick={addParam}>Adicionar Parâmetros</Button>
              {messageErrorParamsEmpty && (
                <span className="error">{messageErrorParamsEmpty}</span>
              )}

              {paramFields.map((field, index) => (
                <Card key={field.id} onClose={() => paramRemove(index)}>
                  <Input
                    displayName="Name"
                    {...questionRegister(`params.${index}.name`, { required: true })}
                    type="text"
                    className="nameInput"
                    errorMessage={errors.params?.[index]?.name?.message}
                  />

                  <Textarea
                    displayName="Descrição"
                    {...questionRegister(`params.${index}.description`, { required: true })}
                    type="text"
                    className="nameInput"
                    errorMessage={errors.params?.[index]?.description?.message}
                  />

                  <Select
                    displayName="Tipo"
                    {...questionRegister(`params.${index}.type`, { required: true })}
                  >
                    {Object.entries(labelVariable).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </Select>
                </Card>
              )
              )}
            </div>

            <div className="col-4">
              <Button onClick={addTest}>Adicionar Teste</Button>
              {messageErrorTestsEmpty && (
                <span className="error">{messageErrorTestsEmpty}</span>
              )}
              {testFields.map((field, indexTest) => {
                const ComponentInputVariableResult = allComponentInputVariable[resultType];

                return (
                  <Card key={field.id} onClose={() => testRemove(indexTest)}>
                    {params.map((param, index) => {
                      const ComponentInputVariableParam = allComponentInputVariable[param.type];
                      return (
                        <ComponentInputVariableParam
                          key={index}
                          label={param.name}
                          register={questionRegister}
                          registerKey={`tests.${indexTest}.args.${index}`}
                          errorMessage={errors.tests?.[indexTest]?.args?.[index]?.message}
                        />
                      )
                    })}
                    <ComponentInputVariableResult
                      label="Retorno"
                      register={questionRegister}
                      registerKey={`tests.${indexTest}.result`}
                      errorMessage={errors.tests?.[indexTest]?.result?.message}
                    />
                  </Card>
                )
              })}


            </div>
          </div>
        </div>
      </Form>
      {isOpenModalAddCategory && (
        <Modal title="" className="sm" onCancel={() => setIsOpenModalAddCategory(false)}>
          <Form className="form-question" onSubmit={categoryHandleSubmit(onSubmitCategory)}>
            <FormHeader
              title="Adicionar Questão"
              actions={(
                <Button
                  className="buttonSignin"
                  type="submit"
                >
                  Criar
                </Button>
              )}
            />
            <Input
              displayName="Name"
              {...categoryRegister("name", { required: true })}
              type="text"
              className="nameInput"
            />
          </Form>
        </Modal>
      )}
    </>
  )
}
