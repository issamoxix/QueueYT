import React, { useEffect } from 'react';
import "./styles/home.css"
import { Link } from 'react-router-dom';

function Home() {
    return (<div className="home-container" >

        <h1>Youtube<span>Q</span></h1>
        <Link to="/player">
            <button>Get Started</button>
        </Link>
    </div>)
}

export default Home