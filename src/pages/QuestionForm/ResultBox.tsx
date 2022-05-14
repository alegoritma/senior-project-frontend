import React, { useEffect, useRef, useState } from 'react';
import { Result, RiskCategory } from 'src/models/questionnaire';
import { Alert, AlertColor, Box, Button, Paper, Typography, Card, Divider } from '@mui/material';
import { animated, useSpring } from 'react-spring';
import DetailedResult from './DetailedResult';
import MuiMarkdown from 'mui-markdown';

interface Props {
  result?: Result;
}

const riskColor: Record<RiskCategory['rating'], AlertColor> = {
  'self-care': 'success',
  'medium-priority': 'info',
  urgent: 'warning',
  'high-priority': 'error'
};

const AnimatedCard = animated(Card);

const ResultBox: React.FC<Props> = ({ result }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>();
  const [spring, api] = useSpring(() => ({
    from: { opacity: 0, height: 0, marginTop: 0 },
    to: { opacity: 1, height: 0, marginTop: 0 }
  }));

  useEffect(() => {
    if (result) {
      api.start({ height: ref.current.offsetHeight, marginTop: 20 });
    } else {
      api.start({ height: 0, marginTop: 0 });
    }
  }, [result]);

  return (
    <AnimatedCard sx={{ width: 400, overflowY: 'hidden', mr: 'auto' }} style={{ ...spring }}>
      <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column' }}>
        {result && (
          <>
            <Alert
              sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              severity={riskColor[result.risk_category.rating]}>
              <MuiMarkdown>{result.risk_category.desc}</MuiMarkdown>
            </Alert>
            <Divider flexItem />
            <Button sx={{ m: 1, ml: 'auto' }} variant='text' onClick={() => setOpen(true)}>
              See details...
            </Button>
            <DetailedResult open={open} onClose={() => setOpen(false)} result={result} />
          </>
        )}
      </Box>
    </AnimatedCard>
  );
};

export default ResultBox;
