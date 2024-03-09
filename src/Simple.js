import React, { useState, useEffect } from 'react';

function Simple() {
    const [players, setPlayers] = useState([]);
    const [teamGames, setTeamGames] = useState([]);
    const [highPPGTeams, setHighPPGTeams] = useState([]);
    const [dates, setDates] = useState([]);
    const [totalScore, setTotalScore] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [jerseyNumber, setJerseyNumber] = useState('');

    useEffect(() => {
        if (teamName) {
            fetch(`http://localhost:5000/api/jucatori/${teamName}`)
                .then(response => response.json())
                .then(data => setPlayers(data))
                .catch(error => console.error('Error:', error));
        }
    }, [teamName]);

    useEffect(() => {
        fetch('http://localhost:5000/api/echipe/numarMeciuri')
            .then(response => response.json())
            .then(data => setTeamGames(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/api/echipe/highPPG')
            .then(response => response.json())
            .then(data => setHighPPGTeams(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        if (jerseyNumber) {
            fetch(`http://localhost:5000/api/meciuri/${jerseyNumber}`)
                .then(response => response.json())
                .then(data => setDates(data))
                .catch(error => console.error('Error:', error));
        }
    }, [jerseyNumber]);

    useEffect(() => {
        fetch('http://localhost:5000/api/scortotal')
            .then(response => response.json())
            .then(data => setTotalScore(data))
            .catch(error => console.error('Error:', error));
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/coach')
            .then(response => response.json())
            .then(data => setCoaches(data))
            .catch(error => console.error('Error:', error));
    });

    return (
        <div className="simple">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
                {players.map(player => (
                    <div key={player.nume}>{player.nume}</div>
                ))}
            </div>
            <div className="numar-meciuri-container">
                <h2>Number of Games</h2>
                {teamGames.map(team => (
                    <div key={team.numeEchipa}>
                        <h3>{team.numeEchipa}</h3>
                        <p>Number of Games: {team.NumarMeciuri}</p>
                    </div>
                ))}
            </div>
            <div className="highPPG-container">
                {highPPGTeams.map(team => (
                    <div key={team.numeEchipa}>
                        <h3>{team.numeEchipa}</h3>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="number"
                    placeholder="Enter jersey number"
                    value={jerseyNumber}
                    onChange={(e) => setJerseyNumber(e.target.value)}
                />
                {dates.map(date => (
                    <div key={date.data}>{date.Data} {date.nume} {date.nrJersey}</div>
                ))}
            </div>
            <div className="scor-total-container">
                {totalScore.map(score => (
                    <div key={score.data}>
                        <h3>{score.numeArena} - {score.adresa}</h3>
                        <p>Date: {score.Data}</p>
                        <p>Total Score: {score.ScorTotal}</p>
                    </div>
                ))}
            </div>
            <div className="antrenori-arena-container">
                {coaches.map(coach => (
                    <div key={coach.numeAntrenor}>
                        <h3>{coach.numeAntrenor}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Simple;