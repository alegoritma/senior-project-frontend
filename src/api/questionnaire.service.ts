import { Result, Animal, Symptom, Actionable } from 'src/models/questionnaire';
import { api } from './axiosInstance';

export async function getAnimals() {
  const { data } = await api.get<Animal[]>('/animals');
  return data;
}

export async function getSymptoms(animalId: number) {
  const { data } = await api.get<Symptom[]>(`/animal/${animalId}/symptoms`);
  return data;
}

export async function getActionable(actionable_id) {
  const { data } = await api.get<Actionable>(`/action/${actionable_id}`);
  return data;
}
