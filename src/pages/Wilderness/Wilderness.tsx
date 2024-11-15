import React from 'react';
import './Wilderness.css';
import { useNavigate } from "react-router-dom";


const Wilderness: React.FC = () => {

    const navigate = useNavigate();
    const toHomePage = () => {
        navigate('/');
    }

    return (
        <>
            <div className="container-wilderness">
                <div className="content-wilderness">
                    <h1>BRUH YOU ARE LOST!</h1>
                    <h3>This is the web's backroom</h3>
                    <button onClick={toHomePage}>TO THE SAFE ZONE</button>
                </div>

            </div>
        </>
    );
};

export default Wilderness;