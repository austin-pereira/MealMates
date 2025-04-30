import { useRoutes } from 'react-router-dom';
import Login from './components/AuthScreens/Login';
import GroupSelection from './components/AuthScreens/GroupSelection';
import CreateGroup from './components/AuthScreens/CreateGroup';
import ExistingGroup from './components/AuthScreens/ExistingGroup';
import ForgotPassword from './components/AuthScreens/ForgotPassword';
import './App.css';
import CookingAssistant from './CookingAssistant';

const Routes = () => {
    let element = useRoutes([
        {path: '/', element: <Login />},
        {path: '/group', element: <GroupSelection />},
        {path: '/create-group', element: <CreateGroup />},
        {path: '/existing-group', element: <ExistingGroup />},
        {path: '/forgot-password', element: <ForgotPassword />},
        {path: '/cooking-assistant', element: <CookingAssistant />},
    ]);
    
    return element;

};

export default Routes;