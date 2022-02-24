import { VISITOR, ADMIN, USER } from './auth-types';

export default [
  {
    path: '/',
    pageName: 'PageLayout',
    children: [
      {
        path: 'home',
        pageName: 'HomePage',
      },
      {
        path: 'login',
        pageName: 'LoginPage',
        auth: VISITOR,
      },
      {
        path: 'register',
        pageName: 'RegisterPage',
        auth: VISITOR,
      },
      {
        path: 'books',
        pageName: 'BookGridPage',
        auth: USER,
      },
      {
        path: 'books/:id',
        pageName: 'SingleBookPage',
        auth: USER,
      },
      {
        path: '*',
        pageName: 'ErrorPage',
      },
      {
        path: 'management',
        pageName: 'ManagementPage',
        auth: ADMIN,
      },
      {
        path: 'management/edit/:id',
        pageName: 'ManagementPageBookForm',
        auth: ADMIN,
      },
      {
        path: 'management/add',
        pageName: 'ManagementPageBookForm',
        auth: ADMIN,
      },
    ],
  },
];
