import React, { useEffect } from 'react';
import { Response, Question, Symptom, ActionableType } from 'src/models/questionnaire';
import symptoms_data from 'src/assets/data/symptoms_lazy';
import sleep from 'src/utils/sleep';

export function useSymptoms(animalId?: string) {
  const [loading, setLoading] = React.useState(true);
  const [symptoms, setSymptoms] = React.useState<Symptom[]>([]);
  const [error, setError] = React.useState('');

  useEffect(() => {
    if (animalId === undefined) {
      setSymptoms([]);
      return;
    }
    setLoading(true);
    sleep(1000)
      .then(() => {
        const data: Symptom[] = symptoms_data[animalId] ?? [];
        setSymptoms(data.sort((a, b) => a.desc.localeCompare(b.desc)));
      })
      .finally(() => setLoading(false));
  }, [animalId]);

  return { loading, symptoms, error };
}

export function useQuestions(symptomId?: string) {
  const [loading, setLoading] = React.useState(true);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [error, setError] = React.useState('');

  useEffect(() => {
    if (symptomId === undefined) {
      setQuestions([]);
      return;
    }
    setLoading(true);
    fetch(`/api/questions/${symptomId}`)
      .then((res) => res.json())
      .then((res) => setQuestions(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [symptomId]);

  return { loading, questions, error };
}

export function useQuestion(questionId?: number) {
  const [loading, setLoading] = React.useState(true);
  const [question, setQuestion] = React.useState<Question>();
  const [error, setError] = React.useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/questions/${questionId}`)
      .then((res) => res.json())
      .then((res) => setQuestion(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [questionId]);

  return { loading, question, error };
}
