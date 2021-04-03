import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { createRoom, getAllPlayers, getInitialGame } from '../../helpers/getInitialGame';
import { useAlert } from 'react-alert';


export const LobbyScreenRigth = ({ setInputIdGamer, setSelect, inputIdGamer, select }) => {

    const [game, setGame]   = useState({ data:{player2:{playerId: null}}});
    const idUser            = JSON.parse(localStorage.getItem('id'));
    const [users, setUsers] = useState([]);
    const alert             = useAlert();

    useEffect(() => {

        if (select) {
            getInitialGame(select).then(response => {
                setGame({
                    data: response.game
                })
            });

            getAllPlayers().then(response => { setUsers(response.users);});
        }
    }, [select])

    const history = useHistory();

    const inputOnChange = (e) => {
        setInputIdGamer(e.target.value);
    }

    const selectOnChange = (e) => {
        setInputIdGamer(e.target.value)
    }

    const handleCreateRoom = async () => {
        if (!inputIdGamer || !select) {
            alert.show('You should enter or select the id!',{
                type: 'error',
                timeout: 3000,
            })
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
                        <select multiple onChange={selectOnChange} className="form-control w-75 m-3 mx-auto" >

                        {users &&
                            users.map(
                                (item, i) => (
                                    <option key={item.uid} value={item.uid}>{i + 1}- {item.displayName}</option>
                                )
                            )
                        }
                        </select>
                        <input
                            value={inputIdGamer}
                            onChange={inputOnChange}
                            type="text"
                            className="form-control w-75 m-3 mx-auto"
                            placeholder="Second player id" />
                        <button onClick={handleCreateRoom} type="button" className="btn btn-outline-primary btn-lg btn-block w-75 m-3 mt-3 mx-auto">Add second player</button>
                        <button onClick={handlePlayAlone} type="button" className="btn btn-outline-primary btn-lg btn-block w-75 m-3 mt-3 mx-auto">Individual game</button>

                    </div>
                    :

                   (idUser === game.data.player2.playerId && idUser !== game.data.player1.playerId?
                       <div className="alert alert-dark mt-5 animate__animated animate__backInRigth" style={{ textAlign: 'center' }} >
                            <span>Game created by: </span> <strong>{ game.data.player1.playerName }</strong>
                            <p></p>
                            <span>Player id:</span> <strong>{ game.data.player1.playerId }</strong>
                            <p></p>

                            <button className=" btn  btn-info m-3 border-0 mx-auto" onClick={() => history.push(`/board/${select}`)}>
                                Continue...
                            </button>
                        </div>
                    
                    :

                    (idUser === game.data.player1.playerId && idUser === game.data.player2.playerId?
                        <div className="alert alert-dark mt-5 animate__animated animate__backInRigth" style={{ textAlign: 'center' }} >
                             <strong>Individual game</strong>
                             <p></p>
                             <span>Player id:</span> <strong>{ game.data.player1.playerId }</strong>
                             <p></p>
 
                             <button className=" btn  btn-info m-3 border-0 mx-auto" onClick={() => history.push(`/board/${select}`)}>
                                 Continue...
                             </button>
                         </div>
                     
                     :
                    
                    <div className="alert alert-dark mt-5 animate__animated animate__backInRigth" style={{ textAlign: 'center' }} >
                        <span>Player #2 id: </span> <strong>{ game.data.player2.playerId }</strong>
                        <p></p>
                        <span>Player name:</span> <strong>{ game.data.player2.playerName }</strong>
                        <p></p>

                        <button className=" btn  btn-info m-3 border-0 mx-auto" onClick={() => history.push(`/board/${select}`)}>
                            Continue...
                        </button>
                    </div>)
                    )    
                }
            </div>
            <h3>How play</h3>
            <div className="embed-responsive embed-responsive-16by9">
            <iframe title = "How play" className="embed-responsive-item" src="https://www.youtube.com/embed/Ol3Id7xYsY4?rel=0" ></iframe>
            </div>
        </div>
    )
}
