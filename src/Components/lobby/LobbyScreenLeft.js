import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import { createNewGame, getGamesUser } from '../../helpers/getInitialGame';
import { LobbyScreenRigth } from './LobbyScreenRigth';

export const LobbyScreenLeft = ({ setSelect, setInputIdGame, setInputIdGamer, inputIdGame, inputIdGamer, select }) => {

    const idUser = JSON.parse(localStorage.getItem('id'));
    const history = useHistory();
    const [idGames, setIdGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(false)
    const [copySuccess, setCopySuccess] = useState('Copy id selected');

    const textAreaRef = useRef(null);

    const getIdGames = () => {
        getGamesUser(idUser).then(m => {
            setIdGames(m.games);
        })
    }

    useEffect(() => {
        getGamesUser(idUser).then(m => {
            setIdGames(m.games);
        })
    }, [idUser])

    const handleClickNewGame = () => {
        createNewGame(idUser).then(async m => {
            setIdGames([...idGames, m.idGame]);
        })
    }

    const selectOnChange = (e) => {
        setSelect(e.target.value)
        setSelectedGame(true)
        setCopySuccess('Copy id selected')
    }

    const copyToClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
    };

    const handleJoin = () => {

        if (!inputIdGame) {
            console.log('No se ingreso el id');
        }
        console.log(inputIdGame);
        history.push(`/board/${inputIdGame}`)

        setInputIdGame('');

    }

    const inputIdGameOnChange = (e) => {
        setInputIdGame(e.target.value);
    }

    return (
        <>
            <div className="row">

                <div className="col shadow-sm p-3 mb-5 bg-white rounded m-2 ">

                    <div className="text-left">
                        <strong>My id:</strong> <samp>{JSON.parse(localStorage.getItem('id'))}</samp>
                    </div>

                    <div className="form-group h-40 mt-5 text-center">

                        <button className=" btn  btn-outline-primary w-75 border-0 " onClick={getIdGames}>
                            <i className="bi bi-arrow-repeat"></i>
                        </button>

                        {
                            (idGames.length) ?
                                <select multiple onChange={selectOnChange} className="form-control w-75 m-3 mx-auto" >

                                    {
                                        idGames.map(
                                            (item, i) => (
                                                <option key={item} value={item}>{i + 1}- {item}</option>
                                            )
                                        )
                                    }
                                </select>


                                :


                                <div className="container w-75 mx-auto" style={{ width: '50rem' }}>

                                    <div className="alert alert-dark mt-5 " style={{ textAlign: 'center' }} >
                                        You don´t have games!
                                    </div>


                                </div>
                        }

                    </div>

                    <button type="button"
                        className="btn btn-outline-success
                    btn-lg btn-block w-75  mx-auto"
                        onClick={handleClickNewGame}
                    >Create game</button>

                    
                    {
                        document.queryCommandSupported('copy') && select &&

                        <button type="button"
                            className="btn btn-outline-primary
                        btn-lg btn-block w-75 m-3 mx-auto animate__animated animate__backInLeft"
                            onClick={copyToClipboard}
                        >{copySuccess}</button>
                    }


                    <div className="form-group mt-5 ">
                        <input
                            type="text"
                            value={inputIdGame}
                            onChange={inputIdGameOnChange}
                            className="form-control w-75 mx-auto m-3"
                            placeholder="Game id" />
                    </div>

                    <button onClick={handleJoin} type="button" className="btn btn-info btn-lg btn-block w-75 m-3 mx-auto">Watch Game</button>
                    <textarea
                        readOnly
                        className="text-white border-0"
                        id="element"
                        ref={textAreaRef}
                        value={select}
                    />



                </div>

                {selectedGame &&
                    <LobbyScreenRigth
                        setInputIdGamer={setInputIdGamer}
                        setSelect={setSelect}
                        inputIdGamer={inputIdGamer}
                        select={select}
                    />
                }

            </div>
        </>



    )
}
