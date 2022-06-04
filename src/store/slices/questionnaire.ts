import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

import { getActionable } from 'src/api/questionnaire.service';
import { ActionableType, Question, Result, Option } from 'src/models/questionnaire';

export interface QuestionState {
  question?: Question;
  loading?: boolean;
  choosenOptionNextActionId?: number;
}

interface QuestionnnaireState {
  questionsTrail: QuestionState[];
  loading: boolean;
  result?: Result;
}

const initialState: QuestionnnaireState = {
  questionsTrail: [],
  loading: true,
  result: undefined
};

const questionSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<QuestionState | undefined>) => {
      if (action.payload) {
        state.questionsTrail.push(action.payload);
      }
    },
    setAnswerAndUpdateTrail: (state, action: PayloadAction<{ actionableId: number }>) => {
      const { actionableId } = action.payload;
      const currentQuestion = state.questionsTrail.at(-1);
      const selectedOption = currentQuestion?.question?.options.find(
        ({ next_action_id }) => next_action_id === actionableId
      );
      if (selectedOption) {
        currentQuestion.choosenOptionNextActionId = action.payload.actionableId;
      }
    },
    setResult(state, action: PayloadAction<Result>) {
      state.result = action.payload;
    },
    goBack(state) {
      if (!state.loading) {
        if (state.result) {
          state.result = undefined;
          const currentQuestion = state.questionsTrail.at(-1);
          if (currentQuestion) {
            currentQuestion.choosenOptionNextActionId = undefined;
          }
        } else {
          if (state.questionsTrail.length > 1) {
            let currentQuestion = state.questionsTrail.at(-1);
            if (currentQuestion.choosenOptionNextActionId === undefined) {
              state.questionsTrail.pop();
              currentQuestion = state.questionsTrail.at(-1);
            }
            currentQuestion.choosenOptionNextActionId = undefined;
            state.result = undefined;
          } else if (state.questionsTrail.length == 1) {
            state.questionsTrail.at(-1).choosenOptionNextActionId = undefined;
            state.result = undefined;
          }
        }
      }
    },
    reset: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const setCurrentQuestion = questionSlice.actions.setCurrentQuestion;
export const resetQuestionnaire = questionSlice.actions.reset;
export const setQuestionLoading = questionSlice.actions.setLoading;
export const setResult = questionSlice.actions.setResult;
export const goBack = questionSlice.actions.goBack;
export const setAnswerAndUpdateTrail = questionSlice.actions.setAnswerAndUpdateTrail;

export const initializeQuestionnaireState = (actionableId: number) => async (dispatch) => {
  dispatch(handleAnswer(actionableId));
};

export const handleAnswer = (actionableId: number) => async (dispatch) => {
  dispatch(setAnswerAndUpdateTrail({ actionableId }));
  dispatch(setQuestionLoading(true));

  const actionable = await getActionable(actionableId);
  switch (actionable.type) {
    case ActionableType.Question:
      dispatch(setCurrentQuestion({ question: actionable.question }));
      break;
    case ActionableType.Result:
      dispatch(setResult(actionable.result));
      break;
  }

  dispatch(setQuestionLoading(false));
};

export default questionSlice.reducer;
