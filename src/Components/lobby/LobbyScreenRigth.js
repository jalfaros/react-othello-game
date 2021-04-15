import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { createRoom, getAllPlayers, getInitialGame } from '../../helpers/getInitialGame';
import { useAlert } from 'react-alert';
import AboutCard from '../aboutCard/AboutCard';


export const LobbyScreenRigth = ({ setInputIdGamer, setSelect, inputIdGamer, select }) => {

    const [game, setGame] = useState({ data: { player2: { playerId: null } } });
    const idUser = JSON.parse(localStorage.getItem('id'));
    const [users, setUsers] = useState([]);
    const alert = useAlert();

    useEffect(() => {

        if (select) {
            getInitialGame(select).then(response => {
                setGame({
                    data: response.game
                })
            });

            getAllPlayers().then(response => { setUsers(response.users); });
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
            alert.show('You should enter or select the id!', {
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

    const handlePlayAlone = async () => {
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
                        <label class="form-label mt-3 text-center">Gamers</label>
                        <select multiple onChange={selectOnChange} className="form-control w-75 m-3 mx-auto" >

                            {users &&
                                users.map(
                                    (item, i) => (
                                        (item.uid !== idUser &&
                                        <option key={item.uid} value={item.uid}> - {item.displayName}</option>)
                                        
                                    )
                                )
                            }
                        </select>
                        <input
                            value={inputIdGamer}
                            onChange={inputOnChange}
                            type="text"
                            className="form-control w-75 m-3 mx-auto"
                            placeholder="Second player id"
                            disabled />
                        <button onClick={handleCreateRoom} type="button" className="btn btn-outline-primary btn-lg btn-block w-75 m-3 mt-3 mx-auto">Add second player</button>
                        <button onClick={handlePlayAlone} type="button" className="btn btn-outline-primary btn-lg btn-block w-75 m-3 mt-3 mx-auto">Individual game</button>

                    </div>
                    :

                    (idUser === game.data.player2.playerId && idUser !== game.data.player1.playerId ?
                        <div className="alert alert-dark mt-5 animate__animated animate__backInRigth" style={{ textAlign: 'center' }} >
                            <span>Game created by: </span> <strong>{game.data.player1.playerName}</strong>
                            <p></p>
                            <span>Player id:</span> <strong>{game.data.player1.playerId}</strong>
                            <p></p>

                            <button className=" btn  btn-info m-3 border-0 mx-auto" onClick={() => history.push(`/board/${select}`)}>
                                Continue...
                            </button>
                        </div>

                        :

                        (idUser === game.data.player1.playerId && idUser === game.data.player2.playerId ?
                            <div className="alert alert-dark mt-5 animate__animated animate__backInRigth" style={{ textAlign: 'center' }} >
                                <strong>Individual game</strong>
                                <p></p>
                                <span>Player id:</span> <strong>{game.data.player1.playerId}</strong>
                                <p></p>

                                <button className=" btn  btn-info m-3 border-0 mx-auto" onClick={() => history.push(`/board/${select}`)}>
                                    Continue...
                             </button>
                            </div>

                            :

                            <div className="alert alert-dark mt-5 animate__animated animate__backInRigth" style={{ textAlign: 'center' }} >
                                <span>Player #2 id: </span> <strong>{game.data.player2.playerId}</strong>
                                <p></p>
                                <span>Player name:</span> <strong>{game.data.player2.playerName}</strong>
                                <p></p>

                                <button className=" btn  btn-info m-3 border-0 mx-auto" onClick={() => history.push(`/board/${select}`)}>
                                    Continue...
                        </button>
                            </div>)
                    )
                }
            </div>

            {
                !game.data.player2.playerId ?
                    <div className="card mt-5">
                        <div className="card-header text-center">
                            How to play?
                </div>
                        <div className="card-body">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe title="How play" className="embed-responsive-item" src="https://www.youtube.com/embed/Ol3Id7xYsY4?rel=0" ></iframe>


                            </div>
                        </div>
                    </div>

                    :

                    <div>
                        <div className="card-header text-center mt-5"> <strong>Developed by </strong></div>

                        <div className="row text-center">
                            <div className="col-md-6 mt-3">
                                <AboutCard devName={"Warner Hurtado Laguna"}
                                    gitLink={"https://github.com/warnerHurtado"}
                                    gitImg={"https://avatars.githubusercontent.com/u/56526123?v=4"}
                                />
                            </div>
                            <div className="col-md-6 mt-3">
                                <AboutCard devName={"Jose Ignacio Alfaro Solano"}
                                    gitLink={"https://github.com/jalfaros"}
                                    gitImg={"https://avatars.githubusercontent.com/u/42163361?v=4"}
                                />
                            </div>
                            
                        </div>
                    </div>


            }

        </div>
    )
}
