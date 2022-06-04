import { Button, Box } from '@mui/material';
import React, { useMemo } from 'react';
import { Option } from 'src/models/questionnaire';
import { useTransition, animated } from 'react-spring';

interface QuestionOptionsState {
  options: Option[];
  selectedOptionId?: number;
  onAnswer?: (nextActionId: number) => void;
}

const config = { mass: 1.2, tension: 1500, friction: 200 };

const QuestionOptions: React.FC<QuestionOptionsState> = ({
  selectedOptionId,
  options,
  onAnswer
}) => {
  const items = useMemo(() => {
    if (selectedOptionId) {
      return options.filter(({ next_action_id }) => next_action_id == selectedOptionId);
    } else {
      return options;
    }
  }, [options, selectedOptionId]);

  const transitions = useTransition(items, {
    config,
    from: { opacity: 0, height: 0 },
    keys: (item) => item.next_action_id,
    enter: { height: 40, opacity: 1 },
    leave: [{ opacity: 0 }, { height: 0 }]
  });

  return (
    <Box height='auto'>
      {transitions((styles, item) => (
        <animated.div
          style={{ ...styles, width: '100%', display: 'flex', overflowY: 'hidden' }}
          key={`option-${item.next_action_id}`}>
          <Button
            variant='outlined'
            size='small'
            sx={{
              ml: 'auto',
              borderRadius: 16,
              mt: 'auto'
            }}
            disabled={selectedOptionId !== undefined}
            onClick={() => onAnswer?.(item.next_action_id)}>
            {item.text}
          </Button>
        </animated.div>
      ))}
    </Box>
  );
};

export default QuestionOptions;
