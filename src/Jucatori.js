import React, { useState, useEffect } from 'react';

function PlayerCard({ player, onEdit, onDelete }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{player.nume}</h5>
                <p className="card-text">echipa: {player.echipa}</p>
                <p className="card-text">nrJersey: {player.nrJersey}</p>
                <p className="card-text">pozitie: {player.pozitie}</p>
                <p className="card-text">inaltime: {player.inaltime}</p>
                <p className="card-text">greutate: {player.greutate}</p>
                <p className="card-text">anDebut: {player.anDebut}</p>
                <p className="card-text">PPG: {player.PPG}</p>
                <p className="card-text">RPG: {player.RPG}</p>
                <p className="card-text">APG: {player.APG}</p>
                <button onClick={() => onEdit(player)}>Edit</button>
                <button onClick={() => onDelete(player.jucatorID)}>Delete</button>
            </div>
        </div>
    );
}

function Jucatori() {
    const [returnedData, setReturnedData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [jucatorID, setJucatorID] = useState(null);
    const [echipaID, setEchipaID] = useState('');
    const [nume, setNume] = useState('');
    const [echipa, setEchipa] = useState('');
    const [nrJersey, setNrJersey] = useState('');
    const [pozitie, setPozitie] = useState('');
    const [inaltime, setInaltime] = useState('');
    const [greutate, setGreutate] = useState('');
    const [anDebut, setAnDebut] = useState('');
    const [PPG, setPPG] = useState('');
    const [RPG, setRPG] = useState('');
    const [APG, setAPG] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newPlayer = {
            echipaID: echipaID,
            nume: nume,
            echipa: echipa,
            nrJersey: nrJersey,
            pozitie: pozitie,
            inaltime: inaltime,
            greutate: greutate,
            anDebut: anDebut,
            PPG: PPG,
            RPG: RPG,
            APG: APG
        }

        const url = isEditing ? `http://localhost:5000/api/jucatori/update/${jucatorID}` : 'http://localhost:5000/api/jucatori/insert';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlayer)
            });

            if (!response.ok) {
                throw new Error("Server responded with an error!");
            }
            else {
                await fetchPlayers();
            }
        }
        catch (error) {
            console.log("Error:", error);
        }

        setIsEditing(false);
        setShowForm(false);
        setJucatorID(null);
        setEchipaID(null);
        setNume(null);
        setEchipa(null);
        setNrJersey(null);
        setPozitie(null);
        setInaltime(null);
        setGreutate(null);
        setAnDebut(null);
        setPPG(null);
        setRPG(null);
        setAPG(null);
    };

    const handleDelete = async (jucatorID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/jucatori/delete/${jucatorID}`, {
                method: 'DELETE'
            });
    
            if (!response.ok) {
                throw new Error("Server responded with an error!");
            }
            else {
                await fetchPlayers();
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    const handleEdit = (player) => {
        setJucatorID(player.jucatorID);
        setEchipaID(player.echipaID);
        setNume(player.nume);
        setEchipa(player.echipa);
        setNrJersey(player.nrJersey);
        setPozitie(player.pozitie);
        setInaltime(player.inaltime);
        setGreutate(player.greutate);
        setAnDebut(player.anDebut);
        setPPG(player.PPG);
        setRPG(player.RPG);
        setAPG(player.APG);
        setIsEditing(true);
        setShowForm(true);
    }

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    async function fetchPlayers() {
        try {
            const response = await fetch('http://localhost:5000/api/jucatori');
            const data = await response.json();
            setReturnedData(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    useEffect(() => {    
        fetchPlayers();
    }, []);

    return (
        <div className="Jucatori">
            <div className="buttons">
                <button onClick={toggleForm}>Insert</button>
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="number"
                            placeholder='Team ID'
                            value={echipaID}
                            onChange={(e) => setEchipaID(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder='Name'
                            value={nume}
                            onChange={(e) => setNume(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder='Team Name'
                            value={echipa}
                            onChange={(e) => setEchipa(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder='Jersey Number'
                            value={nrJersey}
                            onChange={(e) => setNrJersey(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder='Position'
                            value={pozitie}
                            onChange={(e) => setPozitie(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder='Height'
                            value={inaltime}
                            onChange={(e) => setInaltime(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder='Weight'
                            value={greutate}
                            onChange={(e) => setGreutate(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder='Debut Year'
                            value={anDebut}
                            onChange={(e) => setAnDebut(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder='Points per Game'
                            value={PPG}
                            onChange={(e) => setPPG(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder='Rebounds per Game'
                            value={RPG}
                            onChange={(e) => setRPG(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder='Assists per Game'
                            value={APG}
                            onChange={(e) => setAPG(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>
            <div className="card-container">
                {returnedData.map((player) => (
                    <PlayerCard key={player.jucatorID} player={player} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}

export default Jucatori;