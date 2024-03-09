const express = require('express');
const cors = require('cors');
const dbOperation = require('./dbFiles/dbOperation');
const Player = require('./dbFiles/jucator');
const Team = require('./dbFiles/echipa');


const API_PORT = process.env.PORT || 5000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// GET

app.get('/api/jucatori', async function (req, res) {
    try {
        const jucatori = await dbOperation.getPlayers();
        res.send(jucatori.recordset);
    } catch (error) {
        console.error('Eroare: ', error);
        res.status(500).send({ result: 'error', message: 'A aparut o eroare la preluarea jucatorilor.' });
    }
});

app.get('/api/echipe', async function (req, res) {
    try {
        const echipe = await dbOperation.getTeams();
        res.send(echipe.recordset);
    } catch (error) {
        console.error('Eroare: ', error);
        res.status(500).send({ result: 'error', message: 'A aparut o eroare la preluarea jucatorilor.' });
    }
});

app.get('/api/antrenori', async function (req, res) {
    try {
        const antrenori = await dbOperation.getCoaches();
        res.send(antrenori.recordset);
    } catch (error) {
        console.error('Eroare: ', error);
        res.status(500).send({ result: 'error', message: 'A aparut o eroare la preluarea jucatorilor.' });
    }
});

app.get('/api/meciuri', async function (req, res) {
    try {
        const meciuri = await dbOperation.getGames();
        res.send(meciuri.recordset);
    } catch (error) {
        console.error('Eroare: ', error);
        res.status(500).send({ result: 'error', message: 'A aparut o eroare la preluarea jucatorilor.' });
    }
});

app.get('/api/arene', async function (req, res) {
    try {
        const arene = await dbOperation.getArenas();
        res.send(arene.recordset);
    } catch (error) {
        console.error('Eroare: ', error);
        res.status(500).send({ result: 'error', message: 'A aparut o eroare la preluarea jucatorilor.' });
    }
});



// POST

app.post('/api/jucatori/insert', async (req, res) => {
    await dbOperation.createPlayer(req.body);
    const result = await dbOperation.getPlayers(req.body);
    res.send(result.recordset);
});

app.post('/api/echipe/insert', async (req, res) => {
    await dbOperation.createTeam(req.body);
    const result = await dbOperation.getTeams(req.body);
    res.send(result.recordset);
});



// PUT

app.put('/api/jucatori/update/:jucatorID', async (req, res) => {
    const jucatorID = req.params.jucatorID;
    await dbOperation.updatePlayer(jucatorID, req.body);
    res.send({message: 'Player updated successfully'});
});

app.put('/api/echipe/update/:echipaID', async (req, res) => {
    const echipaID = req.params.echipaID;
    await dbOperation.updateTeam(echipaID, req.body);
    res.send({message: 'Team updated successfully'});
});



// DELETE

app.delete('/api/jucatori/delete/:jucatorID', async (req, res) => {
    try {
        const jucatorID = req.params.jucatorID;
        await dbOperation.deletePlayer(jucatorID);
        res.send({message: 'Player deleted successfully'});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/api/echipe/delete/:echipaID', async (req, res) => {
    try {
        const echipaID = req.params.echipaID;
        await dbOperation.deleteTeam(echipaID);
        res.send({message: 'Team deleted successfully'});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});



// interogari simple

app.get('/api/jucatori/:teamName', async (req, res) => {
    try {
        const teamName = req.params.teamName;
        const players = await dbOperation.getPlayersByTeam(teamName);
        res.send(players.recordset);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/echipe/numarMeciuri', async (req, res) => {
    try {
        const nrMeciuri = await dbOperation.getNumberOfGames();
        res.send(nrMeciuri.recordset);
    }
    catch (error) {
        console.error(error);
    }
});

app.get('/api/echipe/highPPG', async (req, res) => {
    try {
        const teams = await dbOperation.getTeamsWithHighPPG();
        res.send(teams.recordset);
    } catch (error) {
        console.error(error);
    }
});

app.get('/api/meciuri/:jerseyNumber', async (req, res) => {
    try {
        const jerseyNumber = req.params.jerseyNumber;
        const teams = await dbOperation.getDateFromJerseyNumber(jerseyNumber);
        res.send(teams.recordset);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/scortotal', async (req, res) => {
    try {
        const score = await dbOperation.getTotalScore();
        res.send(score.recordset);
    } catch (error) {
        console.error('Error:', error);
    }
});

app.get('/api/coach', async (req, res) => {
    try {
        const coach = await dbOperation.getCoachesInArena();
        res.send(coach.recordset);
    } catch (error) {
        console.error('Error:', error);
    }
});


// interogari complexe

app.get('/api/complexe/:arenaName', async (req, res) => {
    try {
        const arenaName = req.params.arenaName;
        const teams = await dbOperation.getLeastScore(arenaName);
        res.send(teams.recordset);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/nowin', async (req, res) => {
    try {
        const team = await dbOperation.getTeamsWithoutWins();
        res.send(team.recordset);
    } catch (error) {
        console.error(error);
    }
});

app.get('/api/avgshoot', async (req, res) => {
    try {
        const player = await dbOperation.getPlayersThatScored();
        res.send(player.recordset);
    } catch (error) {
        console.error(error);
    }
});

app.get('/api/notarena/:newarena', async (req, res) => {
    try {
        const newarena = req.params.newarena;
        const teams = await dbOperation.getTeamsThatHaventplayed(newarena);
        res.send(teams.recordset);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));