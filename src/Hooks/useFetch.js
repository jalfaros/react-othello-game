import { useEffect, useState } from "react"
import { getInitialGame, postClickGame } from "../helpers/getInitialGame";

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

    console.log('En el fecth');
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

