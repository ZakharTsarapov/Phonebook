import { lazy } from 'react';

export default function createAsyncPage(pageName) {
  return lazy(() => import(`Pages/${pageName}`));
}