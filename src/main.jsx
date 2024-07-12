import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/layouts/Main.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Login from './components/Login/Login.jsx';
import CreateUser from './components/UserManagement/CreateUser/CreateUser.jsx';
import User from './components/UserManagement/User/User.jsx';
import UpdateUser from './components/UserManagement/UpdateUser/UpdateUser.jsx';
import Groups from './components/Groups/Groups/Groups.jsx';
import UpdateGroups from './components/Groups/UpdateGroups/UpdateGroups.jsx';
import CreateGroups from './components/Groups/CreateGroups/CreateGroups.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Dashboard></Dashboard>
      },
      {
        path: 'users',
        element: <User></User>
      },
      {
        path: 'create-user',
        element: <CreateUser></CreateUser>
      },
      {
        path: 'update-user/:id',
        element: <UpdateUser></UpdateUser>
      },
      {
        path: 'update-groups/:id',
        element: <UpdateGroups></UpdateGroups>
      },
      {
        path: 'create-groups',
        element: <CreateGroups></CreateGroups>
      },
      {
        path: 'groups',
        element: <Groups></Groups>
      },
      {
        path: 'groups',
        element: <Groups></Groups>
      },
    ]
  },
  {
    path: 'login',
    element: <Login></Login>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
