import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { createRoom, getInitialGame } from '../../helpers/getInitialGame';

export const LobbyScreenRigth = ({ setInputIdGamer, setSelect, inputIdGamer, select }) => {

    const [game, setGame] = useState({ data:{player2:{playerId: null}}});
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

                {game.data && game.data.player2.playerId === null ?
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

                   (idUser === game.data.player2.playerId && idUser !== game.data.player1.playerId?
                       <div className="alert alert-primary mt-5 animate__animated animate__backInRigth" style={{ textAlign: 'center' }} >
                            <span>Game created by: </span> <strong>{ game.data.player1.playerName }</strong>
                            <p></p>
                            <span>Player id:</span> <strong>{ game.data.player1.playerId }</strong>
                            <p></p>

                            <button className=" btn  btn-outline-primary m-3 border-0 mx-auto" onClick={() => history.push(`/board/${select}`)}>
                                Continue...
                            </button>
                        </div>
                    
                    :

                    (idUser === game.data.player1.playerId && idUser === game.data.player2.playerId?
                        <div className="alert alert-primary mt-5 animate__animated animate__backInRigth" style={{ textAlign: 'center' }} >
                             <strong>Play alone</strong>
                             <p></p>
                             <span>Player id:</span> <strong>{ game.data.player1.playerId }</strong>
                             <p></p>
 
                             <button className=" btn  btn-outline-primary m-3 border-0 mx-auto" onClick={() => history.push(`/board/${select}`)}>
                                 Continue...
                             </button>
                         </div>
                     
                     :
                    
                    <div className="alert alert-primary mt-5 animate__animated animate__backInRigth" style={{ textAlign: 'center' }} >
                        <span>Player id #2:</span> <strong>{ game.data.player2.playerId }</strong>
                        <p></p>
                        <span>Player name:</span> <strong>{ game.data.player2.playerName }</strong>
                        <p></p>

                        <button className=" btn  btn-outline-primary m-3 border-0 mx-auto" onClick={() => history.push(`/board/${select}`)}>
                            Continue...
                        </button>
                    </div>)
                    )    
                }
                <button type="button" className="btn btn-secondary btn-lg btn-block w-75 m-3 mt-5 mx-auto">Scoreboard</button>
            </div>
        </div>
    )
}
