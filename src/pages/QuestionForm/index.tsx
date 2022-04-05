import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'src/store';
import { initializeQuestions, resetQuestionnaire } from 'src/store/slices/questionnaire';
import Form from './Form';
import { Typography } from '@mui/material';

function QuestionForm() {
  const { symptomId } = useParams();
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.questionnaire);

  useEffect(() => {
    dispatch(initializeQuestions(symptomId));
    return () => {
      dispatch(resetQuestionnaire());
    };
  }, [symptomId]);

  if (!initialized) return <Typography>Initializing...</Typography>;
  return <Form symptomId={symptomId} />;
}

export default QuestionForm;
