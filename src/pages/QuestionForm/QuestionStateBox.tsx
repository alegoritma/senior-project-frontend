import { Divider, CardHeader, Button, Box, Card, CardContent, styled } from '@mui/material';
import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import { Result, Option } from 'src/models/questionnaire';
import { QuestionState } from 'src/store/slices/questionnaire';
import QuestionOptions from './QuestionOptions';

interface Props {
  questionState?: QuestionState;
  result?: Result;
  onAnswer?: (next_action_id: number) => void;
}

const LoadingIndicator = styled('div')`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;

  ::before,
  ::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  ::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  ::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: #9880ff;
    }
    50%,
    100% {
      background-color: #ebe6ff;
    }
  }
`;

const QuestionStateBox: React.FC<Props> = ({ questionState, result, onAnswer }) => {
  if (questionState) {
    const { question, choosenOptionNextActionId, loading } = questionState;
    const isOptionChoosen = choosenOptionNextActionId !== undefined;
    if (loading) {
      return (
        <Box p={2} display='flex' flexDirection='column' alignItems='center'>
          <LoadingIndicator />
        </Box>
      );
    }

    if (questionState) {
      return (
        <Box>
          <Card
            variant='elevation'
            sx={{ width: 400, bgcolor: 'transparent', overflowY: 'hidden', mr: 'auto' }}>
            <CardHeader title={question.text} />
          </Card>
          <Box display='flex'>
            <Card
              sx={{
                ml: 'auto',
                mt: 2,
                bgcolor: 'transparent',
                p: 0,
                pb: 0.5,
                transitionDelay: isOptionChoosen ? '1.6s' : 0
              }}
              elevation={isOptionChoosen ? 4 : 0}>
              <QuestionOptions
                options={question?.options}
                selectedOptionId={choosenOptionNextActionId}
                onAnswer={onAnswer}
              />
            </Card>
          </Box>
        </Box>
      );
    }
  }

  return <Box>aaaa</Box>;
};

export default QuestionStateBox;
