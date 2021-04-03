import React from 'react'
import { FaGithub } from 'react-icons/fa';
const AboutCard = ({ devName, gitLink, gitImg }) => {
    return (
        <>

            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img
                        src= { gitImg }
                        className="img-fluid"
                    />


                </div>
                    <div className="card-body">
                        <h6 className="card-title">{ devName }</h6>
                        <p className="card-text">
                            
                        </p>
                        <a href={ gitLink } target = "_blank" rel = "noopener noreferrer" className="btn btn-outline-dark">
                            <i> <FaGithub /> </i> GitHub
                        </a>
                </div>
            </div>
        </>
    )
}

export default AboutCard;
