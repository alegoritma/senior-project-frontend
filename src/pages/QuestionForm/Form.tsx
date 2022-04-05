import React, { useEffect } from 'react';
import { getActionResult } from 'src/api/questionnaire.service';
import { useDispatch, useSelector } from 'src/store';
import {
  addQuestion,
  initializeQuestions,
  setCurrentQuestion,
  setQuestionLoading,
  updateQuestionTrail
} from 'src/store/slices/questionnaire';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import type { Response } from 'src/models/questionnaire';
import { ActionableType } from 'src/models/questionnaire';
interface Props {
  symptomId?: string;
}

const Form: React.FC<Props> = ({ symptomId }) => {
  const dispatch = useDispatch();
  const { cache, questionLoading, currentQuestionId } = useSelector((state) => state.questionnaire);

  const onResponse = async (response: Response) => {
    if (!(response.actionable_id in cache)) {
      dispatch(setQuestionLoading(true));
    }

    const { actionable, questions, type } = await getActionResult(response.actionable_id);

    if (type === ActionableType.Action) return;
    if (type === ActionableType.Question) {
      dispatch(addQuestion(questions));
      dispatch(updateQuestionTrail(response.actionable_id));
      dispatch(setCurrentQuestion(response.actionable_id));
    }
    dispatch(setQuestionLoading(false));
  };

  if (questionLoading) return <Typography>Loading...</Typography>;
  const question = cache[currentQuestionId];

  if (!question) return <Typography>No question...</Typography>;

  return (
    <Box>
      <Typography>{question.text}</Typography>
      <List>
        {question.responses?.map((response) => (
          <ListItemButton key={`response-${response.id}`}>{response.text}</ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Form;
