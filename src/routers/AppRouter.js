import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'

import React from 'react'

export const AppRouter = () => {

    const { user } = useContext(AuthContext)

    return (
        <Router>
            
        </Router>
    )
}
