export enum ActionableType {
  Question = 'Question',
  Action = 'Action'
}

export interface Animal {
  id: number;
  name: string;
  type: string;
  order: number;
  image?: string;
}

export interface Symptom {
  id: number;
  animal_id: number;
  desc: string;
  created_at: Date;
  updated_at: Date;
  questions: Question[];
}

export interface Question {
  id: number;
  animal_id: number;
  symptom_id: number;
  text: string;
  created_at: Date;
  updated_at: Date;
  responses: Response[];
}

export interface Actionable {
  id: number;
  animal_id?: number;
  symptom_id?: number;
  name: string;
  text?: string;
  desc: string;
  text_1: string;
  text_2?: string;
  text_3?: string;
  text_4?: string;
  responses: Response[];
  iframe_desc: string;
  iframe_text_1: string;
  iframe_text_2?: string;
  iframe_text_3?: string;
  iframe_text_4?: string;
  country_id: number;
  created_at: Date;
  updated_at: Date;
  rating: string;
}

export interface Response {
  id: number;
  question_id: number;
  text?: string;
  additional_advice: string;
  action_desc?: string;
  first_aid_text: string;
  problem_text: string;
  travel_advice_text: string;
  iframe_action_desc?: string;
  iframe_first_aid_text: string;
  iframe_problem_text: string;
  iframe_travel_advice_text: string;
  actionable_id: number;
  actionable_type: ActionableType;
  created_at: Date;
  updated_at: Date;
  actionable: Actionable;
}
