import { Suspense, lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import BaseLayout from './pages/BaseLayout';

// eslint-disable-next-line react/display-name
const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards
const SelectAnimal = Loader(lazy(() => import('src/pages/AnimalsForm')));
const SelectSymptom = Loader(lazy(() => import('src/pages/SymptomForm')));
const QuestionForm = Loader(lazy(() => import('src/pages/QuestionForm')));
// const ResponseForm = Loader(lazy(() => import('src/pages/ResponseForm')));
const Status404 = Loader(lazy(() => import('src/pages/Status/Status404')));

const routes: RouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='/symptom-wizard/select-animal' />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to='404' replace />
          },
          {
            path: '404',
            element: <Status404 />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'symptom-wizard',
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <Navigate to='/symptom-wizard/select-animal' replace />
      },
      {
        path: 'select-animal',
        element: <SelectAnimal />
      },
      {
        path: 'select-symptom/:animalId',
        element: <SelectSymptom />
      },
      {
        path: 'question-form/:symptomId',
        element: <QuestionForm />
      }
    ]
  }
];

export default routes;
