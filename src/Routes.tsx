import { useRoutes } from 'react-router-dom';
import Login from './components/AuthScreens/Login';
import GroupSelection from './components/AuthScreens/GroupSelection';
import CreateGroup from './components/AuthScreens/CreateGroup';
import ExistingGroup from './components/AuthScreens/ExistingGroup';
import ForgotPassword from './components/AuthScreens/ForgotPassword';
import InviteToGroup from './components/AuthScreens/InviteToGroup';
import './App.css';

const Routes = () => {
    let element = useRoutes([
        {path: '/', element: <Login />},
        {path: '/group', element: <GroupSelection />},
        {path: '/create-group', element: <CreateGroup />},
        {path: '/existing-group/:id', element: <ExistingGroup />},
        {path: '/existing-group/invite/:id', element: <InviteToGroup />},
        {path: '/forgot-password', element: <ForgotPassword />},

    ]);
    
    return element;

};

export default Routes;