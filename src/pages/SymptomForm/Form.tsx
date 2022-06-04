import React, { useEffect } from 'react';
import { CircularProgress, List, ListItemButton, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { Transition, animated, useTrail } from 'react-spring';
import { useSymptoms } from './hooks';
import { Symptom } from 'src/models/questionnaire';

interface Props {
  animalId: string;
}

const AnimatedListItemButton = animated(ListItemButton);

const config = { mass: 1.2, tension: 4000, friction: 300 };

const Form: React.FC<Props> = ({ animalId }) => {
  const { symptoms, loading, error } = useSymptoms(animalId);
  const navigate = useNavigate();

  const [trail, api] = useTrail(
    symptoms?.length ?? 0,
    () => ({
      config,
      opacity: loading ? 0 : 1,
      x: loading ? 300 : 0,
      from: { opacity: 0, x: 300 }
    }),
    [loading]
  );

  function onSymptomSelect(symptom: Symptom) {
    api.start({ x: -300, opacity: 0 });
    setTimeout(() => {
      navigate(`/symptom-wizard/question-form/${symptom.initial_action_id}`);
    }, 200);
  }

  if (loading)
    return (
      <Box display='flex' width='100%' justifyContent='center' mt={5}>
        <CircularProgress size={100} />
      </Box>
    );
  if (error) return <p>Error! {` ${error}`}</p>;

  return (
    <List>
      {trail.map(({ x, ...rest }, i) => (
        <AnimatedListItemButton
          style={{
            ...rest,
            transform: x.to((x) => `translate3d(0,${x}px,0)`)
          }}
          key={`symptom-${symptoms[i].id}`}
          onClick={() => onSymptomSelect(symptoms[i])}>
          {symptoms[i].description}
        </AnimatedListItemButton>
      ))}
    </List>
  );
};

export default Form;
