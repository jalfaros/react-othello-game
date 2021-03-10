import React from 'react'

export const Square = ({data, setData, id}) => {

    const handleClick = () => {

        console.log('Tocado');
        console.log(data);

        setData(
            {
                score  : 0,
                color  : 'black',
                touched: true
            }
        )
        data.touched = true;

    }

    return (
        <div className="square border btn-success" onClick={handleClick}>
            
            { (data.color === 'white' && data.touched)
                &&
                <span className="text-white">
                    &#9679;
                </span>
            }

            { (data.color === 'black' && data.touched)
                &&
                <span className="text-dark">
                    &#9679;
                </span>
            }

        </div>
    )
}
