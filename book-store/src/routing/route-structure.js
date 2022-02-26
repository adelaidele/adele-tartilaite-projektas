import { VISITOR, LOGGED_IN, ADMIN, USER } from "./auth-types";

export default [
  {
    path: "/",
    pageName: "PageLayout",
    children: [
      {
        path: 'home',
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
        auth: USER,
      },
      {
        path: "books",
        pageName: "BookGridPage",
        auth: USER
      },
      {
        path: "books/:id",
        pageName: "SingleBookPage",
        auth: USER,
      },
      {
        path: "*",
        pageName: "ErrorPage",
      },
      {
        path: "cart",
        pageName: "Cart",
        auth: USER
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

