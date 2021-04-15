import React, { useContext } from 'react'

import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { GamesRoom } from '../Components/gameRoom/GamesRoom'
import { Login } from '../Components/login/Login'
import { Register } from '../Components/register/Register'
import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'


export const AppRouter = () => {

    const { user } = useContext(AuthContext)
    return (
        <Router>
        <div>
            <Switch>

                <PublicRoute 
                path='/room'
                component={GamesRoom}
                isAuthenticated={ user.logged }
                />
                <PublicRoute 
                    path="/login" 
                    component={ Login } 
                    isAuthenticated={ user.logged }/>

                <PublicRoute 
                    path="/register" 
                    component={ Register } 
                    isAuthenticated={ user.logged }/>

                <PrivateRoute 
                    path="/" 
                    component={ DashboardRoutes }
                    isAuthenticated ={ user.logged } />
            </Switch>
        </div>
    </Router>

    )
}
