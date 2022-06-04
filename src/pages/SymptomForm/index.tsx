import { useParams } from 'react-router';
import Form from './Form';
import Container from './Container';

function SymptomForm() {
  const { animalId } = useParams();

  return (
    <Container animalId={animalId}>
      <Form animalId={animalId} />
    </Container>
  );
}

export default SymptomForm;
