export const getInitialGame = async ( idGame ) => {

    const url  = `http://localhost:4000/getGame?idGame=${encodeURI(idGame)}`;

    const resp = await fetch( url );

    const data = await resp.json();


    return data;
}