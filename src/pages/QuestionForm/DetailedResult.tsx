import {
  Dialog,
  Typography,
  Divider,
  Box,
  DialogContent,
  Alert,
  AlertColor,
  AlertTitle,
  DialogTitle,
  styled,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Stack,
  SvgIcon,
  DialogActions,
  Button,
  ButtonGroup
} from '@mui/material';
import React from 'react';
import { Result, RiskCategory } from 'src/models/questionnaire';
import MuiMarkdown from 'mui-markdown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { ReactComponent as PawIcon } from 'src/assets/images/paw.svg';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: () => void;
  result: Result;
}

interface SectionProps {
  type:
    | 'additional_advice'
    | 'first_aid_text'
    | 'problem_text'
    | 'travel_advice_text'
    | 'risk_category';
  text: string;
}

const sectionHeader: Record<SectionProps['type'] | 'risk_category', string> = {
  risk_category: 'What to do next?',
  first_aid_text: 'First Aid Advice',
  problem_text: 'Diagnosis',
  additional_advice: 'Additional Advice',
  travel_advice_text: 'Travel Advice'
};

const riskColor: Record<RiskCategory['rating'], AlertColor> = {
  'self-care': 'success',
  'medium-priority': 'info',
  urgent: 'warning',
  'high-priority': 'error'
};

const StyledContent = styled(DialogContent)`
  & ul {
    list-style: none; /* Remove list bullets */
    padding: 0;
    margin: 0;
  }

  & li {
    padding-left: 24px;
  }
  & li + li {
    margin-top: 8px;
  }
  & li::before {
    content: '✓'; /* Insert content that looks like bullets */
    /* padding-right: 8px; */
    margin-left: -20px;
    padding-right: 8.5px;
    font-weight: 700;
    color: #366fd7; /* Or a color you prefer */
  }
`;

const Risk: React.FC<RiskCategory> = ({ description: desc, name, text_1, rating }) => {
  return (
    <Stack direction='row' sx={{ mb: 2 }}>
      <PawIcon fill='#d76fcd' height='32px' style={{ marginRight: '10px' }} />
      <Typography variant='h2'>Priority Rating: {` ${name}`}</Typography>
    </Stack>
  );
};

const Section: React.FC<SectionProps> = ({ type, text }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Box>
        <Typography gutterBottom variant='h4'>
          {sectionHeader[type]}
        </Typography>
        <Divider />
      </Box>
      <Box sx={{ m: 1, mt: 1.5 }}>
        <MuiMarkdown>{text}</MuiMarkdown>
      </Box>
    </Box>
  );
};

const DetailedResult: React.FC<Props> = ({ open, onClose, result }) => {
  const navigate = useNavigate();
  const { risk_category, additional_advice, first_aid_text, problem_text, travel_advice_text } =
    result;

  return (
    <Dialog fullWidth maxWidth='sm' open={open} onClose={onClose}>
      <StyledContent>
        <Risk {...risk_category} />
        <Box px={0.5} pb={1} pt={0.5}>
          <Section type={'risk_category'} text={risk_category.text_1} />
          {problem_text && <Section type={'problem_text'} text={problem_text} />}
          {first_aid_text && <Section type={'first_aid_text'} text={first_aid_text} />}
          {additional_advice && <Section type={'additional_advice'} text={additional_advice} />}
          {travel_advice_text && <Section type={'travel_advice_text'} text={travel_advice_text} />}
        </Box>
      </StyledContent>
      <Divider />
      <DialogActions sx={{ mb: 0.2 }}>
        <Button variant='text' sx={{ mr: 'auto' }} onClick={() => onClose()}>
          Close
        </Button>
        <ButtonGroup>
          <Button variant='outlined' onClick={() => navigate('/symptom-wizard')}>
            Start Again
          </Button>
          <Button
            variant='contained'
            onClick={() =>
              window.open('https://www.google.com/maps/search/veterinarian', '_blank')
            }>
            Find Vets in Your Area
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default DetailedResult;
