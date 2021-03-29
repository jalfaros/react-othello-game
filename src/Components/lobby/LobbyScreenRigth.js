import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { createRoom, getInitialGame } from '../../helpers/getInitialGame';

export const LobbyScreenRigth = ({ setInputIdGamer, setSelect, inputIdGamer, select }) => {

    const [game, setGame] = useState({ data: [] });
    const idUser          = JSON.parse(localStorage.getItem('id'));


    useEffect(() => {

        if (select) {
            getInitialGame(select).then(response => {
                setGame({
                    data: response.game
                })
            });
        }
    }, [select])

    const history = useHistory();

    const inputOnChange = (e) => {
        setInputIdGamer(e.target.value);
    }

    const handleCreateRoom = async () => {
        if (!inputIdGamer || !select) {
            console.log('No se ingreso algo');
            return;
        }

        await createRoom({ idGame: select, ndPlayer: inputIdGamer })
            .then(n =>
                history.push(`/board/${select}`),
                setInputIdGamer(''),
                setSelect(''),
            )
            localStorage.setItem('secondPlayer', JSON.stringify(inputIdGamer));
    }

    const handlePlayAlone = async() => {
        await createRoom({ idGame: select, ndPlayer: idUser })
        .then(n =>
            history.push(`/board/${select}`),
            setSelect(''),
        )
        localStorage.setItem('secondPlayer', JSON.stringify(idUser));
    }

    return (
        <div className="col shadow-sm p-3 mb-5 bg-white rounded m-2 animate__animated animate__backInDown ">

            <div>

                <div className="text-right">
                    <strong>My id:</strong> <samp>{JSON.parse(localStorage.getItem('id'))}</samp>
                </div>

                {game.data && game.data.player2 === null ?
                    <div className="form-group h-100 mt-5 animate__animated animate__backInRigth">
                        <input
                            value={inputIdGamer}
                            onChange={inputOnChange}
                            type="text"
                            className="form-control w-75 m-3 mx-auto"
                            placeholder="Second player id" />
                        <button onClick={handleCreateRoom} type="button" className="btn btn-outline-primary btn-lg btn-block w-75 m-3 mt-3 mx-auto">Add second player</button>
                        <button onClick={handlePlayAlone} type="button" className="btn btn-outline-primary btn-lg btn-block w-75 m-3 mt-3 mx-auto">Play alone</button>

                    </div>
                    :

                    <div className="alert alert-primary mt-5 animate__animated animate__backInRigth" style={{ textAlign: 'center' }} >
                        <span>Id jugador #2:</span> <strong>{ game.data.player2 }</strong>

                        <button className=" btn  btn-outline-primary m-3 border-0 mx-auto" onClick={() => history.push(`/board/${select}`)}>
                            Continue...
                        </button>
                    </div>
                    
                }


                <button type="button" className="btn btn-secondary btn-lg btn-block w-75 m-3 mt-5 mx-auto">Scoreboard</button>
                {/* <button onClick={handleLogOut} type="button" className="btn btn-danger btn-lg btn-block w-75 m-3 mt-3">Log Out</button> */}
            </div>
        </div>
    )
}
