import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Board } from '../Components/boardScreem/Board'
import { ScoreScreen } from '../Components/score/ScoreScreen'
import { Navbar } from '../Components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="m-3">
                <Switch>
                    <Route exact path="/board" component={ Board } />
                    <Route exact path="/score" component={ ScoreScreen } />

                    <Redirect to="/board"/>
                </Switch>
            </div>
        </>
    )
}
