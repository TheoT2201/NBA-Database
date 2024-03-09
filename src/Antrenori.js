import React, { useState, useEffect } from 'react';

function CoachCard({ coach }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{coach.numeAntrenor}</h5>
                <div className="card-text">Nationalitate: {coach.nationalitate}</div>
                <div className="card-text">Numar echipe antrenate: {coach.numarEchipe}</div>
            </div>
        </div>
    );
}

function Antrenori() {
    const [returnedData, setReturnedData] = useState([]);

    async function fetchCoaches() {
        try {
            const response = await fetch('http://localhost:5000/api/antrenori');
            const data = await response.json();
            setReturnedData(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    useEffect(() => {    
        fetchCoaches();
    }, []);

    return (
        <div className="antrenori">
            <div className="card-container">
                {returnedData.map((coach) => (
                    <CoachCard key={coach.antrenorID} coach={coach} />
                ))}
            </div>
        </div>
    );
}

export default Antrenori;