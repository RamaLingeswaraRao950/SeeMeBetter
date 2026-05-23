export type QuestionType = "text" | "textarea" | "mcq_single" | "mcq_multiple" | "rating_1_to_5";

export type QuestionDoc = {
  id: string;
  title: string;
  description: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  active: boolean;
  isDeleted: boolean;
  order: number;
  placeholder: string;
  createdAt: unknown;
  updatedAt: unknown;
};

export type ResponseAnswer = {
  questionId: string;
  questionTitle: string;
  type: string;
  answer: unknown;
};

export type ResponseDoc = {
  createdAt: unknown;
  anonymousId: string;
  source: "web";
  formHandle?: string;
  answers: ResponseAnswer[];
};

export type GlobalSettingsDoc = {
  profileName?: string;
  publicMessage: string;
  cooldownHours: number;
};
