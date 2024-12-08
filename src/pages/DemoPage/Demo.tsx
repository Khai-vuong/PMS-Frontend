import React from 'react';
import './Demo.css'
import { useEffect, useState } from 'react';
import axios from 'axios';



const DemoPage: React.FC = () => {

    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/test/database')
            .then(response => {
                setData(JSON.stringify(response.data));
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <>
            <div className="container">
                <div className="item">1</div>
                <div className="item">2</div>
                <div className="item">3</div>
            </div>

            <div>{data}</div>
        </>
    );
};

export default DemoPage;