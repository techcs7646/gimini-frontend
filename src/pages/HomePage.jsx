import React from 'react';
import './HomePage.css';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';


const HomePage = () => {
    

    return (
        <div className="home">
            <Sidebar />
            <Main />
        </div>
    );
};

export default HomePage;
