import React, { useEffect, useRef, useState } from 'react'
import { createNewGame, getGamesUser } from '../../helpers/getInitialGame';
import { LobbyScreenRigth } from './LobbyScreenRigth';

export const LobbyScreenLeft = ({ setSelect, setInputIdGame, setInputIdGamer, inputIdGame, inputIdGamer, select}) => {

    const idUser = JSON.parse(localStorage.getItem('id'));

    const [idGames, setIdGames]           = useState([]);
    const [selectedGame, setSelectedGame] = useState(false)
    const [copySuccess, setCopySuccess]   = useState('Copy id selected');

    const textAreaRef = useRef(null);

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
        setCopySuccess('Copy id selected')
        
    }

    const copyToClipboard = (e) =>{
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');
      };
    

    return (
        <div className = "col shadow-sm p-3 mb-5 bg-white">
             <div className = "row">
                <div className="col shadow-sm p-3 mb-5 bg-white rounded m-2 col card">
                    <div className="form-group h-40 mt-5">
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


            
                    {
                        document.queryCommandSupported('copy') && select &&
                        
                        <button type="button"
                        className="btn btn-outline-primary
                        btn-lg btn-block w-75 m-3 animate__animated animate__backInLeft"
                        onClick={ copyToClipboard }
                        >{copySuccess}</button>
                    }



                    <button type="button"
                    className="btn btn-success
                    btn-lg btn-block w-75 m-3 mt-5"
                    onClick={handleClickNewGame}
                    >Create game</button>


                        <textarea
                        readOnly
                        className="text-white border-0"
                        id="element"
                        ref={textAreaRef}
                        value={select}
                        />
     


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
