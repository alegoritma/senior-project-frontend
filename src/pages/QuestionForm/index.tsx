import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'src/store';
import { initializeQuestionnaireState, resetQuestionnaire } from 'src/store/slices/questionnaire';
import Form from './Form';

function QuestionForm() {
  const { symptomId: initialActionId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeQuestionnaireState(parseInt(initialActionId)));
    return () => {
      dispatch(resetQuestionnaire());
    };
  }, [initialActionId]);

  // if (result) return <Result data={result} />;
  return <Form initialActionId={parseInt(initialActionId)} />;
}

export default QuestionForm;
