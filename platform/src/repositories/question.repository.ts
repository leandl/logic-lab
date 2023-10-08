export enum Variable {
  INTEGER = "INTEGER",
  FLOAT = "FLOAT",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  INTEGER_ARRAY = "INTEGER-ARRAY",
  FLOAT_ARRAY = "FLOAT-ARRAY",
  STRING_ARRAY = "STRING-ARRAY",
  BOOLEAN_ARRAY = "BOOLEAN-ARRAY",
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
};

export type Param<V extends Variable = Variable> = {
  name: string;
  type: V;
  description: string;
};

type Tuple<T> = readonly T[] | readonly [];
export type Test<
  Variables extends Tuple<Variable> = any,
  ReturnVariable extends Variable = Variable
> = {
  args: {
    [K in keyof Variables]: ConvertVariableToType[Variables[K]];
  };
  result: ConvertVariableToType[ReturnVariable];
};

export type QuestionCreate<
  Variables extends Tuple<Variable> = Tuple<Variable>,
  ReturnVariable extends Variable = Variable
> = {
  name: string;
  description: string;
  params: {
    [K in keyof Variables]: Param<Variables[K]>;
  };
  typeResult: ReturnVariable;
  descriptionResult: string;
  categoryId: number;
  tests: Test<Variables, ReturnVariable>[];
  // documentMarkdown?: string;
};

export type Question = QuestionCreate & {
  id: number;
};

export interface QuestionRepository {
  findById(questionId: number): Promise<Question | null>;
  findByName(questionName: string): Promise<Question | null>;
  getAll(): Promise<Question[]>;
  create(question: QuestionCreate): Promise<Question>;
  update(questionId: number, question: QuestionCreate): Promise<Question>;
}
