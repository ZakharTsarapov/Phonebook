import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';
import createAsyncPage from 'utils/createAsyncPage';
import Layout from 'components/Layout';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';

const HomePage = createAsyncPage('Home');
const RegisterPage = createAsyncPage('Register');
const LoginPage = createAsyncPage('Login');
const PhonebookPage = createAsyncPage('Phonebook');
const NotfoundPage = createAsyncPage('Notfound');

export default function App() {
  const dispatch = useDispatch();

  const isFetchingCurrentUser = useSelector(
    authSelectors.getIsFetchingCurrentUser
  );

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
  
      !isFetchingCurrentUser && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute redirectTo="/" restricted>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute redirectTo="/contacts" restricted>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <PhonebookPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotfoundPage />} />
        </Route>
      </Routes>
      )
  );
}
