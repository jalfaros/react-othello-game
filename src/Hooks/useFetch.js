import { useEffect, useState } from "react"
import { getInitialGame } from "../helpers/getInitialGame";

export const useFetch = ( idGame ) => {

    const [state, setstate] = useState({
        data:[],
        loading: true
    });

    useEffect(() => {
       
        getInitialGame( idGame ).then( m => {
            setstate({
                data: m.game,
                loading: false
            });
        })
    }, [idGame])

    return state; //{ data:[], loading: true };
}