import React, { useEffect } from 'react';
import { Symptom } from 'src/models/questionnaire';
import { getSymptoms } from 'src/api/questionnaire.service';

export function useSymptoms(animalId?: string) {
  const [loading, setLoading] = React.useState(true);
  const [symptoms, setSymptoms] = React.useState<Symptom[]>([]);
  const [error] = React.useState('');

  useEffect(() => {
    if (animalId === undefined) {
      setSymptoms([]);
      return;
    }
    setLoading(true);

    getSymptoms(parseInt(animalId))
      .then((data) => {
        setSymptoms(data.sort((a, b) => a.description.localeCompare(b.description)));
      })
      .finally(() => setLoading(false));
  }, [animalId]);

  return { loading, symptoms, error };
}
