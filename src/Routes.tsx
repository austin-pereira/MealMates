import { useRoutes } from 'react-router-dom';
import Login from './components/AuthScreens/Login';
import GroupSelection from './components/AuthScreens/GroupSelection';
import CreateGroup from './components/AuthScreens/CreateGroup';
import ExistingGroup from './components/AuthScreens/ExistingGroup';
import ForgotPassword from './components/AuthScreens/ForgotPassword';
import InviteToGroup from './components/AuthScreens/InviteToGroup';
import './App.css';
import CookingAssistant from './CookingAssistant';
import ExistingRecipe from './components/AuthScreens/ExistingRecipe';
import CreateRecipe from './components/AuthScreens/CreateRecipe';
import NewRecipePage from './components/AuthScreens/NewRecipePage';

const Routes = () => {
    let element = useRoutes([
        {path: '/', element: <Login />},
        {path: '/group', element: <GroupSelection />},
        {path: '/create-group', element: <CreateGroup />},
        {path: '/existing-group/:id', element: <ExistingGroup />},
        {path: '/existing-group/invite/:id', element: <InviteToGroup />},
        {path: '/forgot-password', element: <ForgotPassword />},
        {path: '/cooking-assistant', element: <CookingAssistant />},
        {path: '/existing-group/recipes/:id', element: <ExistingRecipe />},
        {path: '/existing-group/create-recipe/:id', element: <CreateRecipe />},
        {path: '/existing-group/new-recipe/:id', element: <NewRecipePage />},

    ]);
    
    return element;

};

export default Routes;