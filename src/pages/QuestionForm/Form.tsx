import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store';
import { handleAnswer, goBack, QuestionState } from 'src/store/slices/questionnaire';
import { Box, Button, Card, Paper } from '@mui/material';
import QuestionStateBox from './QuestionStateBox';
import ResultBox from './ResultBox';
import { useTransition, animated } from 'react-spring';
interface Props {
  initialActionId: number;
}

const config = { mass: 1.2, tension: 3000, friction: 350 };
const getPosition = (i: number) => {
  switch (i) {
    case 1:
      return 'current';
    case 2:
      return 'prev';
    default:
      return 'hidden';
  }
};

const makeLoadingItem = (questionId: number): QuestionState => ({
  loading: true,
  question: {
    actionable_id: questionId,
    text: '',
    options: []
  }
});

const AnimatedBox = animated(Box);

const Form: React.FC<Props> = ({ initialActionId }) => {
  const dispatch = useDispatch();
  const refMap = useMemo(() => new WeakMap(), []);

  const result = useSelector((s) => s.questionnaire.result);
  const loading = useSelector((s) => s.questionnaire.loading);
  const questionsTrail = useSelector((s) => s.questionnaire.questionsTrail);

  const [items, setItems] = useState<QuestionState[]>([]);

  const onAnswer = async (next_action_id: number) => {
    if (loading) return;
    dispatch(handleAnswer(next_action_id));
  };

  const onBack = () => {
    if (loading) return;
    dispatch(goBack());
  };

  useEffect(() => {
    let lastActionId = questionsTrail.at(-1)?.choosenOptionNextActionId;
    if (questionsTrail.length === 0) lastActionId = initialActionId;

    if (loading && lastActionId) {
      setItems([...questionsTrail.slice(-2), makeLoadingItem(lastActionId)]);
    } else {
      setItems(questionsTrail.slice(-2));
    }
  }, [questionsTrail, loading]);

  const transitions = useTransition(items, {
    config,
    from: { opacity: 1, display: 'block', height: 'auto', marginTop: 0 },
    keys: (item) => item.question.actionable_id,
    enter: { opacity: 1, display: 'block', height: 'auto', marginTop: 20 },
    leave: (item) => {
      console.log(refMap.get(item).offsetHeight);
      return [
        { height: refMap.get(item).offsetHeight },
        { opacity: 0 },
        { height: 0, marginTop: 0 },
        { display: 'hidden' }
      ];
    }
  });

  return (
    <Box
      component={Paper}
      variant='outlined'
      sx={{ overflowY: 'hidden' }}
      height='100%'
      bgcolor='#ffffff42'
      width='100%'
      padding={7}
      pt={4}
      maxWidth='1000px'
      mx='auto'
      display='flex'
      flexDirection={'column'}>
      <Button
        sx={{ marginRight: 'auto' }}
        disabled={questionsTrail.length < 2}
        onClick={() => onBack()}>
        Back
      </Button>
      <Box width='100%' mt='auto'>
        {transitions((styles, questionState) => (
          <AnimatedBox
            sx={{ mt: 4 }}
            ref={(ref) => ref && refMap.set(questionState, ref)}
            style={{ ...styles }}
            key={`q-${questionState.question.actionable_id}`}>
            <QuestionStateBox questionState={questionState} onAnswer={onAnswer} />
          </AnimatedBox>
        ))}
        <ResultBox result={result} />
      </Box>
    </Box>
  );
};

export default Form;
