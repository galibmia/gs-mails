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
import Groups from './components/GroupsManagement/Groups/Groups.jsx';
import UpdateGroups from './components/GroupsManagement/UpdateGroups/UpdateGroups.jsx';
import CreateGroups from './components/GroupsManagement/CreateGroups/CreateGroups.jsx';
import Contacts from './components/ContactsManagement/Contacts/Contacts.jsx';
import UpdateContact from './components/ContactsManagement/UpdateContact/UpdateContact.jsx';
import CreateContacts from './components/ContactsManagement/CreateContact/CreateContacts.jsx';
import Categories from './components/CategoryManagement/Categories/Categories.jsx';
import UpdateCategory from './components/CategoryManagement/UpdateCategory/UpdateCategory.jsx';
import CreateCategory from './components/CategoryManagement/CreateCategory/CreateCategory.jsx';
import Templates from './components/TemplatesManagement/Templates/Templates.jsx';
import CreateTemplates from './components/TemplatesManagement/CreateTemplates/CreateTemplates.jsx';
import UpdateTemplates from './components/TemplatesManagement/UpdateTemplates/UpdateTemplates.jsx';
import Campaigns from './components/CampaignsManagement/Campaigns/Campaigns';
import CreateCampaigns from './components/CampaignsManagement/CreateCampaigns/CreateCampaigns';
import UpdateCampaigns from './components/CampaignsManagement/UpdateCampaigns/UpdateCampaigns';
import Logs from './components/Logs/Logs';
import Settings from './components/Settings/Settings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Dashboard></Dashboard>
      },
      // Users Routes
      {
        path: 'users',
        element: <User></User>
      },
      {
        path: 'users/create-user',
        element: <CreateUser></CreateUser>
      },
      {
        path: 'users/update-user/:id',
        element: <UpdateUser></UpdateUser>
      },
      // Groups Routes
      {
        path: 'groups',
        element: <Groups></Groups>
      },
      {
        path: 'groups/create-groups',
        element: <CreateGroups></CreateGroups>
      },
      {
        path: 'groups/update-groups/:id',
        element: <UpdateGroups></UpdateGroups>
      },
      // COntacts Routes
      {
        path: 'contacts',
        element: <Contacts></Contacts>
      },
      {
        path: 'contacts/create-contacts',
        element: <CreateContacts></CreateContacts>
      },
      {
        path: 'contacts/update-contacts/:id',
        element: <UpdateContact></UpdateContact>
      },
      // Categories Routes
      {
        path: 'categories',
        element: <Categories></Categories>
      },
      {
        path: 'categories/create-categories',
        element: <CreateCategory></CreateCategory>
      },
      {
        path: 'categories/update-categories/:id',
        element: <UpdateCategory></UpdateCategory>
      },
      // Templates Routes
      {
        path: 'templates',
        element: <Templates></Templates>
      },
      {
        path: 'templates/create-templates',
        element: <CreateTemplates></CreateTemplates>
      },
      {
        path: 'templates/update-templates/:id',
        element: <UpdateTemplates></UpdateTemplates>
      },
      // Campaign Routes
      {
        path: 'campaigns',
        element: <Campaigns></Campaigns>
      },
      {
        path: 'campaigns/create-campaigns',
        element: <CreateCampaigns></CreateCampaigns>
      },
      {
        path: 'campaigns/update-campaigns/:id',
        element: <UpdateCampaigns></UpdateCampaigns>
      },
      // Logs Routes
      {
        path: 'logs',
        element: <Logs></Logs>
      },
      {
        path: 'settings',
        element: <Settings></Settings>
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
