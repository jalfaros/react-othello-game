import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'

export const Navbar = () => {

    const { user:{name} } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
               <h5 className="navbar-brand">Othello</h5>
            

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info">
                        {name}
                    </span>
                </ul>
            </div>
        </nav>
    )
}
