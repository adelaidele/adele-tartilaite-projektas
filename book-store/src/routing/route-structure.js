import { VISITOR, LOGGED_IN, ADMIN, USER } from "./auth-types";

export default [
  {
    path: "/",
    pageName: "PageLayout",
    children: [
      {
        path: '',
        pageName: "HomePage",
      },
      {
        path: "login",
        pageName: "LoginPage",
        auth: VISITOR,
      },
      {
        path: "register",
        pageName: "RegisterPage",
        auth: VISITOR,
      },
      {
        path: "checkout",
        pageName: "Checkout",
        auth: LOGGED_IN,
      },
      {
        path: "books",
        pageName: "BookGridPage",
        auth: LOGGED_IN
      },
      {
        path: "books/:id",
        pageName: "SingleBookPage",
        auth: LOGGED_IN,
      },
      {
        path: "*",
        pageName: "ErrorPage",
      },
      {
        path: "cart",
        pageName: "Cart",
        auth: LOGGED_IN
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
      {
        path: 'profile',
        pageName: 'ProfilePage',
        auth: LOGGED_IN,
      },
    ],
  },
];

