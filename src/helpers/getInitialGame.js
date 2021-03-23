
//const urlHero ='http://localhost:4000/';
const urlHero = 'https://design-othello-game.herokuapp.com/'

export const getInitialGame = async ( idGame ) => {

    const url  = `${urlHero}getGame?idGame=${encodeURI(idGame)}`;

    const resp = await fetch( url );

    const data = await resp.json();
    return data;
}

export const postClickGame = async ( params ) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ params })
    };

    const url  = `${urlHero}editGame`;

    const resp = await fetch( url, requestOptions );

    const data = await resp.json();

    return data;
}