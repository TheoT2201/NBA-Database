import React, { useState, useEffect } from 'react';

function TeamCard({ team, onEdit, onDelete }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{team.numeEchipa}</h5>
                <div className="card-text">An infiintare: {team.anInfiintare}</div>
                <div className="card-text">Manager: {team.manager}</div>
                <div className="card-text">Antrenor principal: {team.antrenorPrincipal}</div>
                <div className="card-text">Oras: {team.oras}</div>
                <button onClick={() => onEdit(team)}>Edit</button>
                <button onClick={() => onDelete(team.echipaID)}>Delete</button>
            </div>
        </div>
    );
}

function Echipe() {
    const [returnedData, setReturnedData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [echipaID, setEchipaID] = useState(null);
    const [arenaID, setArenaID] = useState(null);
    const [anInfiintare, setAnInfiintare] = useState('');
    const [numeEchipa, setNumeEchipa] = useState('');
    const [manager, setManager] = useState('');
    const [antrenorPrincipal, setAntrenorPrincipal] = useState('');
    const [oras, setOras] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newTeam = {
            arenaID: arenaID,
            anInfiintare: anInfiintare,
            numeEchipa: numeEchipa,
            manager: manager,
            antrenorPrincipal: antrenorPrincipal,
            oras: oras
        }

        const url = isEditing ? `http://localhost:5000/api/echipe/update/${echipaID}` : 'http://localhost:5000/api/echipe/insert';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTeam)
            });

            if (!response.ok) {
                throw new Error("Server responded with an error!");
            }
            else {
                await fetchTeams();
            }
        }
        catch (error) {
            console.log("Error:", error);
        }

        setIsEditing(false);
        setShowForm(false);
        setEchipaID(null);
        setArenaID(null);
        setAnInfiintare(null);
        setNumeEchipa(null);
        setManager(null);
        setAntrenorPrincipal(null);
        setOras(null);
    };

    const handleDelete = async (echipaID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/echipe/delete/${echipaID}`, {
                method: 'DELETE'
            });
    
            if (!response.ok) {
                throw new Error("Server responded with an error!");
            }
            else {
                await fetchTeams();
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    const handleEdit = (team) => {
        setEchipaID(team.echipaID);
        setArenaID(team.arenaID);
        setAnInfiintare(team.anInfiintare);
        setNumeEchipa(team.numeEchipa);
        setManager(team.manager);
        setAntrenorPrincipal(team.antrenorPrincipal);
        setOras(team.oras);
        setIsEditing(true);
        setShowForm(true);
    }

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    async function fetchTeams() {
        try {
            const response = await fetch('http://localhost:5000/api/echipe');
            const data = await response.json();
            setReturnedData(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    useEffect(() => {    
        fetchTeams();
    }, []);

    return (
        <div className="echipe">
            <div className="buttons">
                <button onClick={toggleForm}>Insert</button>
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="number"
                            placeholder='Arena ID'
                            value={arenaID}
                            onChange={(e) => setArenaID(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder='An Infiintare'
                            value={anInfiintare}
                            onChange={(e) => setAnInfiintare(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder='Team Name'
                            value={numeEchipa}
                            onChange={(e) => setNumeEchipa(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder='Manager'
                            value={manager}
                            onChange={(e) => setManager(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder='Head Coach'
                            value={antrenorPrincipal}
                            onChange={(e) => setAntrenorPrincipal(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder='City'
                            value={oras}
                            onChange={(e) => setOras(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>
            <div className="card-container">
                {returnedData.map((team) => (
                    <TeamCard key={team.echipaID} team={team} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}

export default Echipe;