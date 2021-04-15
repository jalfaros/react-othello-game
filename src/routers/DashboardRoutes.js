import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Board } from '../Components/boardScreem/Board'
import { GamesRoom } from '../Components/gameRoom/GamesRoom'
import { LobbyScreen } from '../Components/lobby/LobbyScreen'
import { ScoreScreen } from '../Components/score/ScoreScreen'
import { Navbar } from '../Components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="m-3">
                <Switch>
                    <Route exact path="/lobby"               component={ LobbyScreen } />
                    <Route exact path="/board/:board_idGame" component={ Board } />
                    <Route exact path="/score"               component={ ScoreScreen } />
                    <Route exact path="/room"                component={ GamesRoom } />
                    <Redirect to="/room"/>
                </Switch>
            </div>
        </>
    )
}
