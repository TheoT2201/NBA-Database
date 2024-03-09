import React, { useState, useEffect } from 'react';

function Complexe () {
    const [noWin, setNoWin] = useState([]);
    const [avgShoot, setAvgShoot] = useState([]);
    const [teams, setTeams] = useState([]);
    const [arenaName, setArenaName] = useState('');
    const [arenaNoua, setArenaNoua] = useState([]);
    const [newArena, setNewArena] = useState('');

    useEffect(() => {
        if (arenaName) {
            fetch(`http://localhost:5000/api/complexe/${arenaName}`)
                .then(response => response.json())
                .then(data => setTeams(data))
                .catch(error => console.error('Error:', error));
        }
    }, [arenaName]);

    useEffect(() => {
        if (newArena) {
            fetch(`http://localhost:5000/api/notarena/${newArena}`)
                .then(response => response.json())
                .then(data => setArenaNoua(data))
                .catch(error => console.error('Error:', error));
        }
    }, [newArena]);

    useEffect(() => {
        fetch('http://localhost:5000/api/nowin')
            .then(response => response.json())
            .then(data => setNoWin(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/api/avgshoot')
            .then(response => response.json())
            .then(data => setAvgShoot(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="complexe">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter arena name"
                    value={arenaName}
                    onChange={(e) => setArenaName(e.target.value)}
                />
                {teams.map(team => (
                    <div key={team.numeEchipa}>{team.numeEchipa} - {team.punctajGazde}</div>
                ))}
            </div>
            <div className="nowin-container">
                {noWin.map(team => (
                    <div key={team.numeEchipa}>
                        <h3>{team.numeEchipa} - {team.oras}</h3>
                    </div>
                ))}
            </div>
            <div className="avgshoot-container">
                {avgShoot.map(player => (
                    <div key={player.nume}>
                        <h3>{player.nume}</h3>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter arena name"
                    value={newArena}
                    onChange={(e) => setNewArena(e.target.value)}
                />
                {arenaNoua.map(teams => (
                    <div key={teams.numeEchipa}>{teams.numeEchipa}</div>
                ))}
            </div>
        </div>
    );
}

export default Complexe