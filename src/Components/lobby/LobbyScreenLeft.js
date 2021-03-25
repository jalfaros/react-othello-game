import React, { useState } from 'react'
import { createNewGame } from '../../helpers/getInitialGame';
import { LobbyScreenRigth } from './LobbyScreenRigth';

export const LobbyScreenLeft = ({setIdGames, setSelect, idGames, idUser, setInputIdGame, setInputIdGamer, inputIdGame, inputIdGamer, select}) => {


    const [selectedGame, setSelectedGame] = useState(false)

    

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
            
            <div className="col shadow-sm p-3 mb-5 bg-white rounded m-2">
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
                <div className = "col">
                    
                    <LobbyScreenRigth 
                    setInputIdGamer= { setInputIdGamer}
                    setInputIdGame = { setInputIdGame}
                    setSelect      = { setSelect }
                    inputIdGame    = { inputIdGame }
                    inputIdGamer   = { inputIdGamer }
                    select         = { select }
                    />
                </div>
            }

        </div>
        </div>
        
       
        
    )
}
