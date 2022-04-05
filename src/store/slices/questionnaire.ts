import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getQuestions, getActionResult } from 'src/api/questionnaire.service';
import { ActionableType, Question, Response } from 'src/models/questionnaire';

interface QuestionState {
  initialized: boolean;
  cache: Record<number, Question>;
  answeredQuestionIds: number[];
  questionLoading: boolean;
  currentQuestionId?: number;
}

const initialState: QuestionState = {
  initialized: false,
  cache: {},
  answeredQuestionIds: [],
  questionLoading: true,
  currentQuestionId: undefined
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestionLoading: (state, action: PayloadAction<boolean>) => {
      state.questionLoading = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Record<number, Question>>) => {
      state.cache = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question[]>) => {
      action.payload.forEach((question) => {
        state.cache[question.id] = question;
      });
    },
    updateQuestionTrail: (state, action: PayloadAction<number>) => {
      state.answeredQuestionIds = [...state.answeredQuestionIds, action.payload];
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestionId = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const setInitialized = questionSlice.actions.setInitialized;
export const setCurrentQuestion = questionSlice.actions.setCurrentQuestion;
export const resetQuestionnaire = questionSlice.actions.reset;
export const setQuestionLoading = questionSlice.actions.setQuestionLoading;
export const setQuestions = questionSlice.actions.setQuestions;
export const addQuestion = questionSlice.actions.addQuestion;
export const updateQuestionTrail = questionSlice.actions.updateQuestionTrail;

export const initializeQuestions = (symptomId: string) => async (dispatch) => {
  dispatch(setQuestionLoading(true));
  const { questions, initialQuestionId } = await getQuestions(symptomId);
  dispatch(setQuestions(questions));
  dispatch(setCurrentQuestion(initialQuestionId));
  dispatch(setQuestionLoading(false));
  dispatch(setInitialized(true));
};

export default questionSlice.reducer;
