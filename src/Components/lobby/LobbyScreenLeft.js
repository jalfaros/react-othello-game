import React, { useEffect, useState } from 'react'
import { createNewGame, getGamesUser } from '../../helpers/getInitialGame';
import { LobbyScreenRigth } from './LobbyScreenRigth';

export const LobbyScreenLeft = ({ setSelect, setInputIdGame, setInputIdGamer, inputIdGame, inputIdGamer, select}) => {

    const idUser = JSON.parse(localStorage.getItem('id'));

    const [idGames, setIdGames]           = useState([]);
    const [selectedGame, setSelectedGame] = useState(false)

    useEffect(() => {
        getGamesUser( idUser ).then( m => {
            setIdGames(m.games);
        })
    }, [idUser])

    const handleClickNewGame = () => {
        createNewGame( idUser ).then(async m => {
            setIdGames([...idGames, m.idGame]);
        })
    }

    const selectOnChange = (e) => {
        setSelect(e.target.value)
        setSelectedGame( true )
        
    }

    return (
        <div className = "col shadow-sm p-3 mb-5 bg-white rounded m-2">
             <div className = "row">
                <div className="col shadow-sm p-3 mb-5 bg-white rounded m-2 col card animate__animated animate__backInDown animate__delay-1s">
                    <div className="form-group h-50 mt-5">
                        <label>Games</label>
                        <select multiple onChange={ selectOnChange } className="form-control w-75 m-3 " >
                        
                            {(idGames)
                                &&
                                idGames.map(
                                (item, i) => (
                                <option key={item} value={item}>{i+1}- {item}</option>
                                )
                            )}
                        </select>
                    </div>

                    <button type="button"
                    className="btn btn-success
                    btn-lg btn-block w-75 m-3 mt-5"
                    onClick={handleClickNewGame}
                    >Create game</button>

                </div>
                
                { selectedGame  &&                        
                        <LobbyScreenRigth 
                        setInputIdGamer= { setInputIdGamer}
                        setInputIdGame = { setInputIdGame}
                        setSelect      = { setSelect }
                        inputIdGame    = { inputIdGame }
                        inputIdGamer   = { inputIdGamer }
                        select         = { select }
                        />
                }

            </div>
        </div>
        
       
        
    )
}
