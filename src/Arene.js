import React, { useState, useEffect } from 'react';

function ArenaCard({ arena }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{arena.numeArena}</h5>
                <div className="card-text">Dimensiune: {arena.dimensiune}</div>
                <div className="card-text">An infiintare: {arena.anInfiintare}</div>
                <div className="card-text">Adresa: {arena.adresa}</div>
            </div>
        </div>
    );
}

function Arene() {
    const [returnedData, setReturnedData] = useState([]);

    async function fetchArenas() {
        try {
            const response = await fetch('http://localhost:5000/api/arene');
            const data = await response.json();
            setReturnedData(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    useEffect(() => {    
        fetchArenas();
    }, []);

    return (
        <div className="arene">
            <div className="card-container">
                {returnedData.map((arena) => (
                    <ArenaCard key={arena.arenaID} arena={arena} />
                ))}
            </div>
        </div>
    );
}

export default Arene;