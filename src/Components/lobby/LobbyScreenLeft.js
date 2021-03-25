import React from 'react'
import { createNewGame } from '../../helpers/getInitialGame';

export const LobbyScreenLeft = ({setIdGames, setSelect, idGames, idUser}) => {

    const handleClickNewGame = () => {
        createNewGame( idUser ).then(async m => {
            setIdGames([...idGames, m.idGame]);
        })
    }

    const selectOnChange = (e) => {
        setSelect(e.target.value)
    }

    return (
        <div className="col shadow-sm p-3 mb-5 bg-white rounded m-2">
            <div className="form-group h-50 mt-5">
                <label>New Games</label>
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
            >Create new game</button>
    
        </div>
    )
}
