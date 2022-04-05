import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAnimals } from 'src/api/questionnaire.service';
import type { Animal } from 'src/models/questionnaire';

export interface AnimalsState {
  animals: Record<number, Animal>;
  animalIds: number[];
  loading: boolean;
}

export const initialState: AnimalsState = {
  animals: {},
  animalIds: [],
  loading: true
};

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    setAnimals: (state, action: PayloadAction<Animal[]>) => {
      state.animals = action.payload.reduce((acc, animal) => {
        acc[animal.id] = animal;
        return acc;
      }, {});
      state.animalIds = action.payload.map((animal) => animal.id);
      state.loading = false;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    }
  }
});

const { setAnimals } = animalsSlice.actions;

export const initializeAnimals = () => async (dispatch) => {
  const animals = await getAnimals();
  dispatch(setAnimals(animals));
};

export default animalsSlice.reducer;
