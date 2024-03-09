import React, { useState, useEffect } from 'react';

function GameCard({ game }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{game.deplasare} - {game.acasa}</h5>
                <div className="card-text">Castigator: {game.castigator}</div>
                <div className="card-text">Arena: {game.arena}</div>
                <div className="card-text">Scor: {game.punctajOaspeti} - {game.punctajGazde}</div>
            </div>
        </div>
    );
}

function Meciuri() {
    const [returnedData, setReturnedData] = useState([]);

    async function fetchGames() {
        try {
            const response = await fetch('http://localhost:5000/api/meciuri');
            const data = await response.json();
            setReturnedData(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    useEffect(() => {    
        fetchGames();
    }, []);

    return (
        <div className="meciuri">
            <div className="card-container">
                {returnedData.map((game) => (
                    <GameCard key={game.meciID} game={game} />
                ))}
            </div>
        </div>
    );
}

export default Meciuri;