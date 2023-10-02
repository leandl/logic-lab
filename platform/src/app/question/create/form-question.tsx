'use client'

import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Plus } from "lucide-react";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button/Button";
import { signIn } from "next-auth/react";

import { useRouter } from 'next/navigation';
import { ROUTE } from "@/config/route";
import Link from "next/link";
import toast from "react-hot-toast";
import { Select } from "@/components/select";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { FormHeader } from "@/components/form-header/form-header";
import { Card } from "@/components/card/card";

import "./form-question.scss"
import { QuestionCategory, QuestionCategoryCreate } from "@/repositories/question-category.repository";
import { CreateQuestionCategoryUseCaseError } from "@/application/question-categoty/create-question-categoty.use-case";
import { EitherJSON } from "@/utils/patterns";
import { Modal } from "@/components/Modal";
import { register } from "module";

enum Variable {
  INTEGER = "INTEGER",
  FLOAT = "FLOAT",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  INTEGER_ARRAY = "INTEGER-ARRAY",
  FLOAT_ARRAY = "FLOAT-ARRAY",
  STRING_ARRAY = "STRING-ARRAY",
  BOOLEAN_ARRAY = "BOOLEAN-ARRAY",
}


const labelVariable = {
  [Variable.INTEGER]: "INTEGER",
  [Variable.FLOAT]: "FLOAT",
  [Variable.STRING]: "STRING",
  [Variable.BOOLEAN]: "BOOLEAN",
  [Variable.INTEGER_ARRAY]: "ARRAY of INTEGER",
  [Variable.FLOAT_ARRAY]: "ARRAY of FLOAT",
  [Variable.STRING_ARRAY]: "ARRAY of STRING",
  [Variable.BOOLEAN_ARRAY]: "ARRAY of BOOLEAN",
}

type ConvertVariableToType = {
  [Variable.INTEGER]: number;
  [Variable.FLOAT]: number;
  [Variable.STRING]: string;
  [Variable.BOOLEAN]: boolean;
  [Variable.INTEGER_ARRAY]: number[];
  [Variable.FLOAT_ARRAY]: number[];
  [Variable.STRING_ARRAY]: string[];
  [Variable.BOOLEAN_ARRAY]: boolean[];
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

type FormQuestionProps = {
  question?: FormQuestionData;
  categories: QuestionCategory[];
  addCategory(category: QuestionCategoryCreate): Promise<EitherJSON<CreateQuestionCategoryUseCaseError, QuestionCategory>>;
  addQuestion(question: any): Promise<any>
}


export function FormQuestion({
  question,
  categories: initialCategories,
  addCategory
}: FormQuestionProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [isOpenModalAddCategory, setIsOpenModalAddCategory] = useState<boolean>(false)

  const {
    register: questionRegister,
    unregister: questionUnregister,
    handleSubmit: questionHandleSubmit,
    control: questionControl,
    watch: questionWatch
  } = useForm<FormQuestionData>({ defaultValues: question });
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
    // const signInResponse = await signIn("credentials", {
    //   ...data,
    //   redirect:
    //     false
    // })

    // if (signInResponse?.error) {
    //   toast.error("User not found")
    //   return;
    // }

    // router.push(ROUTE.APP.HOME);
  }

  async function onSubmitCategory(data: { name: string }) {
    const result = await addCategory(data);

    if (result.tag === "LEFT") {
      toast.error("Não possivel adicionar a categoria!");
      return;
    }

    const category = result.value;
    setCategories(prevCategories => [...prevCategories, category]);
    setIsOpenModalAddCategory(false);
  }

  return (
    <>
      <Form className="form-question" onSubmit={questionHandleSubmit(onSubmitQuestion)}>
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

        <Card title="Informações Basicas">
          <Input
            displayName="Name"
            {...questionRegister("name")}
            type="text"
            className="nameInput"
          />

          <Input
            displayName="Descrição"
            {...questionRegister("description", { required: true })}
            type="text"
            className="nameInput"
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
            <Button onClick={() => setIsOpenModalAddCategory(true)}><Plus />Categoria</Button>
          </div>
        </Card>



        <div>
          <Button onClick={addParam}>Adicionar Parametros</Button>
          {paramFields.map((field, index) => (
            <Card key={field.id} onClose={() => paramRemove(index)}>
              <Input
                displayName="Name"
                {...questionRegister(`params.${index}.name`, { required: true })}
                type="text"
                className="nameInput"
              />

              <Input
                displayName="Descrição"
                {...questionRegister(`params.${index}.description`, { required: true })}
                type="text"
                className="nameInput"
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

        <Card title="Informações de Retorno">
          <Select
            displayName="Tipo de Retorno"
            {...questionRegister("typeResult", { required: true })}
          >
            {Object.entries(labelVariable).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </Select>
          <Input
            displayName="Descrição do retorno"
            {...questionRegister("descriptionResult", { required: true })}
            type="text"
            className="nameInput"
          />


        </Card>


        <div>
          <Button onClick={addTest}>Adicionar Teste</Button>
          {testFields.map((field, indexTest) => {

            return (
              <Card key={field.id}>
                {params.map((param, index) => (
                  <Input
                    key={`tests.${indexTest}.args.${index}`}
                    displayName={param.name}
                    {...questionRegister(`tests.${indexTest}.args.${index}`)}
                    type="text"
                    className="nameInput"
                  />
                ))}
              </Card>
            )
          })}
        </div>

      </Form>
      {isOpenModalAddCategory && (
        <Modal size="md">
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
