import { Actionable, ActionableType, Animal, Question, Symptom } from 'src/models/questionnaire';
// import { ActionableType } from 'src/models/questionnaire';

import { api } from './axiosInstance';

import animalData from 'src/assets/data/animals';
import allResponses from 'src/assets/data/all_responses.json';
import allActionables from 'src/assets/data/all_actionables.json';
import allSymptoms from 'src/assets/data/symptoms_lazy';

import sleep from 'src/utils/sleep';

interface IGetQuestionsResponse {
  questions: Question[];
  initialQuestionId: number;
}

interface IGetActionResultResponse {
  actionable: Actionable;
  questions?: Question[];
  type: ActionableType;
}

export async function getAnimals() {
  await sleep(500);
  return animalData as Animal[];
}

export async function getSymptoms(animalId: number) {
  throw new Error('Not implemented');
  return api.get(`symptoms/${animalId}`);
}

export async function getQuestions(symptomId: string): Promise<IGetQuestionsResponse> {
  throw new Error('Not implemented');
  const symptom: Symptom = undefined;
  return {
    initialQuestionId: symptom.questions[0].id,
    questions: [
      symptom.questions[0],
      ...symptom.questions[0].responses
        .map((response) => allActionables[response.actionable_id])
        .filter(Boolean)
    ]
  };
}

export async function sendResponse(response: Response) {
  throw new Error('Not implemented');
  return api.post<Actionable>('responses', response);
}

export async function getActionResult(actionable_id: number): Promise<IGetActionResultResponse> {
  const actionable = allActionables[actionable_id];
  const type = actionable.text ? ActionableType.Question : ActionableType.Action;
  const questions = actionable.responses?.map((r) => allResponses[r.id]) ?? [];
  return {
    actionable,
    questions,
    type
  };
}
