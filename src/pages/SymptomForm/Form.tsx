import { List, ListItemButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { useSymptoms } from './hooks';

interface Props {
  animalId: string;
}
const Form: React.FC<Props> = ({ animalId }) => {
  const { symptoms, loading, error } = useSymptoms(animalId);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {` ${error}`}</p>;

  return (
    <List>
      {symptoms.map((symptom) => (
        <ListItemButton
          key={symptom.id}
          onClick={() => navigate(`/symptom-wizard/question-form/${symptom.id}`)}>
          {symptom.desc}
        </ListItemButton>
      ))}
    </List>
  );
};

export default Form;
