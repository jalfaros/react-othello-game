import { useEffect, useState } from "react"
import { getGamesUser, getInitialGame, postClickGame, createNewGame } from "../helpers/getInitialGame";

export const useFetch = ( idGame ) => {

    const [state, setstate] = useState({
        data:[],
        loading: true
    });

    useEffect(() => {
       
        getInitialGame( idGame )
        
        .then( m => {
            setstate({
                data: m.game,
                loading: false
            });
        })
        .catch( error => {
            console.log(error);
        })
    }, [idGame])

    return state; 
}


export const useFetchPost = ( params ) => {

    const [state, setstate] = useState({
        data:[],
        loading: true
    });

    useEffect(() => {
       
        createNewGame( params ).then(async m => {
            setstate({
                data: await m,
                loading: false
            });
        })
    }, [params])

    return state; 
}

export const useFechNewGame = ( params ) => {
    const [state, setstate] = useState({
        data:[],
        loading: true
    });

    useEffect(() => {
       
        postClickGame( params ).then(async m => {
            setstate({
                data: await m,
                loading: false
            });
        })
    }, [params])

    return state; 


}

export const useFechGetGames = ( idUser ) => {

    const [state, setstate] = useState({
        data:[],
        loading: true
    });

    useEffect(() => {

        getGamesUser( idUser ).then( m => {
            setstate({
                data: m,
                loading: false
            });
        })
    }, [idUser])

    return state; 
}

