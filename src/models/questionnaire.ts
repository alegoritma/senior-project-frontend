export enum ActionableType {
  Question = 'Question',
  Result = 'Result'
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
  description: string;
  initial_action_id: number;
}

export interface RiskCategory {
  name: string;
  description: string;
  text_1: string;
  iframe_desc: string;
  iframe_text_1: string;
  rating: 'self-care' | 'medium-priority' | 'urgent' | 'high-priority';
}

export interface Option {
  text: string;
  next_action_id: number;
}

export interface Question {
  actionable_id: number;
  text: string;
  options: Option[];
}

export interface Result {
  risk_category: RiskCategory;

  additional_advice?: string;
  first_aid_text?: string;
  problem_text?: string;
  travel_advice_text?: string;
  iframe_first_aid_text?: string;
  iframe_problem_text?: string;
}

export interface Actionable {
  id: number;
  type: ActionableType;
  question?: Question;
  result?: Result;
}
