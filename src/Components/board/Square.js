import React from 'react'

export const Square = ({data, setData, id, item, array, state, setState}) => {

    const handleClick = () => {

        if (!array.xPlay){
            console.log('Espere su turno');
        }

        if(data.touched){
            return;
        }

        if(!data.touched && item){
            console.log('No entre');
            setData({touched: true});
            return;
        }

        setData({touched: true});

        array.boardGame[id] = 'X';

        if(array.boardGame[id -1]=== 'O' && array.boardGame[id -2]==='X'){

            console.log(array.boardGame[id --], 'borrando');
            array.boardGame[id --] = 'X';
        }

        //array.boardGame[28+1] = 'X'

        setState(array);

        console.log(id);

        console.log(state, 'El state');

    }

    return (
        <div className="square border btn-success" onClick={handleClick}>

            { (item === 'O')
                            &&
                            <span className="text-white">
                                &#9679;
                            </span>
                        }

            {/* { (item === 'X')
                            &&
                            <span className="text-dark">
                                &#9679;
                            </span>
                        } */}

            { (array[id] === 'O')
                &&
                <span className="text-white">
                    &#9679;
                </span>
            }

            { ((array[id] === 'X' || ((data.touched && !array[id]) && array.xPlay)) || item === 'X')
                &&
                <span className="text-dark">
                    &#9679;
                </span>
            }


        </div>
    )
}
