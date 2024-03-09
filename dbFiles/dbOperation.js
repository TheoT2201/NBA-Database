const config = require('./dbConfig');
const sql = require('mssql');

// functiile de get

const getPlayers = async() => {
    try {
        let pool = await sql.connect(config);
        let players = pool.request().query("SELECT * from Jucatori")
        return players;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getTeams = async() => {
    try {
        let pool = await sql.connect(config);
        let teams = pool.request().query("SELECT * from Echipe")
        return teams;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getCoaches = async() => {
    try {
        let pool = await sql.connect(config);
        let coaches = pool.request().query("SELECT * from Antrenori")
        return coaches;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getGames = async() => {
    try {
        let pool = await sql.connect(config);
        let games = pool.request().query("SELECT * from Meciuri")
        return games;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getArenas = async() => {
    try {
        let pool = await sql.connect(config);
        let arenas = pool.request().query("SELECT * from Arene")
        return arenas;
    } catch (error) {
        console.log(error);
        return error;
    }
}



// functiile de create

const createPlayer = async(Player) => {
    try {
        let pool = await sql.connect(config);
        let players = pool.request()
        .query(`INSERT INTO Jucatori VALUES
        (${Player.echipaID}, '${Player.nume}', '${Player.echipa}', ${Player.nrJersey}, '${Player.pozitie}', ${Player.inaltime}, ${Player.greutate}, ${Player.anDebut}, ${Player.PPG}, ${Player.RPG}, ${Player.APG})
        `)
        return players;
    } catch (error) {
        console.log(error);
    }
}

const createTeam = async(Team) => {
    try {
        let pool = await sql.connect(config);
        let teams = pool.request()
        .query(`INSERT INTO Echipe VALUES
        (${Team.arenaID}, '${Team.anInfiintare}', '${Team.numeEchipa}', '${Team.manager}', '${Team.antrenorPrincipal}', '${Team.oras}')
        `)
        return teams;
    } catch (error) {
        console.log(error);
    }
}



// functiile de update

const updatePlayer = async (jucatorID, Player) => {
    try {
        let pool = await sql.connect(config);
        let updateQuery = `UPDATE Jucatori SET
                            echipaID = '${Player.echipaID}',
                            nume = '${Player.nume}',
                            echipa = '${Player.echipa}',
                            nrJersey = '${Player.nrJersey}',
                            pozitie = '${Player.pozitie}',
                            inaltime = '${Player.inaltime}',
                            greutate = '${Player.greutate}',
                            anDebut = '${Player.anDebut}',
                            PPG = '${Player.PPG}',
                            RPG = '${Player.RPG}',
                            APG = '${Player.APG}' 
                            WHERE jucatorID = '${jucatorID}'`;
        await pool.request().query(updateQuery);
    }
    catch (error) {
        console.log(error);
    }
}

const updateTeam = async (echipaID, Team) => {
    try {
        let pool = await sql.connect(config);
        let updateQuery = `UPDATE Echipe SET
                            arenaID = '${Team.arenaID}',
                            anInfiintare = '${Team.anInfiintare}',
                            numeEchipa = '${Team.numeEchipa}',
                            manager = '${Team.manager}',
                            antrenorPrincipal = '${Team.antrenorPrincipal}',
                            oras = '${Team.oras}'
                            WHERE echipaID = '${echipaID}'`;
        await pool.request().query(updateQuery);
    }
    catch (error) {
        console.log(error);
    }
}



// functiile de delete

const deletePlayer = async (jucatorID) => {
    try {
        let pool = await sql.connect(config);
        let deleteQuery = `DELETE FROM Jucatori WHERE jucatorID = '${jucatorID}'`;
        await pool.request().query(deleteQuery);
    }
    catch (error) {
        console.log(error);
    }
}

const deleteTeam = async (echipaID) => {
    try {
        let pool = await sql.connect(config);
        let deleteQuery = `DELETE FROM Echipe WHERE echipaID = '${echipaID}'`;
        await pool.request().query(deleteQuery);
    }
    catch (error) {
        console.log(error);
    }
}



// interogari simple

// 1.	Selecteaza toti jucatorii de la o anumita echipa 
const getPlayersByTeam = async (teamName) => {
    try {
        let pool = await sql.connect(config);
        let players = await pool.request()
            .input('teamName', sql.VarChar, teamName)
            .query(`SELECT Jucatori.nume
                    FROM Jucatori 
                    INNER JOIN Echipe 
                        ON Jucatori.echipaID = Echipe.echipaID 
                    WHERE Echipe.numeEchipa = @teamName`);
        return players;
    }
    catch (error) {
        console.error(error);
    }
}


// 2.	Afiseaza pentru fiecare echipa numarul de meciuri jucate
const getNumberOfGames = async() => {
    try {
        let pool = await sql.connect(config);
        let interogare = await pool.request()
            .query(`SELECT Echipe.numeEchipa, COUNT(Meciuri.meciID) AS NumarMeciuri
                    FROM Echipe 
                    INNER JOIN Meciuri 
                        ON Echipe.echipaID = Meciuri.oaspetiID OR Echipe.echipaID = Meciuri.gazdeID 
                    GROUP BY Echipe.numeEchipa`);
        return interogare;
    }
    catch (error) {
        console.error(error);
    }
}


// 3.	Afișarea echipelor ce au jucători cu un număr de puncte per meci peste 20
//      si ai caror pozitie de joc este forward-guard cu numarul de pe tricou 0
const getTeamsWithHighPPG = async () => {
    try {
        let pool = await sql.connect(config);
        let interogare = await pool.request()
            .query(`SELECT DISTINCT Echipe.numeEchipa
                    FROM Echipe
                    JOIN Jucatori
                        ON Echipe.echipaID = Jucatori.echipaID
                    WHERE Jucatori.PPG > 20 AND Jucatori.pozitie = 'forward-guard' AND Jucatori.nrJersey = 0`);
        return interogare;
    }
    catch (error) {
        console.error(error);
    }
}


// 4.	Afisarea tuturor datelor pentru meciurile in care
//      a jucat un jucator specificat prin numarul sau pe tricou
const getDateFromJerseyNumber = async (jerseyNumber) => {
    try {
        let pool = await sql.connect(config);
        let players = await pool.request()
            .input('jerseyNumber', sql.TinyInt, jerseyNumber)
            .query(`SELECT convert(varchar(10), Meciuri.data, 120) AS Data, Jucatori.nume, Jucatori.nrJersey
                    FROM Meciuri 
                    JOIN Echipe 
                        ON Meciuri.oaspetiID = Echipe.echipaID OR Meciuri.gazdeID = Echipe.echipaID
                    JOIN Jucatori
                        ON Jucatori.echipaID = Echipe.echipaID
                    WHERE Jucatori.nrJersey = @jerseyNumber`);
        return players;
    }
    catch (error) {
        console.error(error);
    }
}


// 5.	Afisarea tuturor meciurilor impreuna cu data meciului,
//      numele si adresa arenei, ordonate descrescator dupa punctajul total
const getTotalScore = async () => {
    try {
        let pool = await sql.connect(config);
        let score = await pool.request()
            .query(`SELECT convert(varchar(10), Meciuri.data, 120) AS Data, Arene.numeArena, Arene.adresa, (Meciuri.punctajGazde + Meciuri.punctajOaspeti) AS ScorTotal
                    FROM Meciuri
                    INNER JOIN Arene
                        ON Meciuri.arenaID = Arene.arenaID
                    ORDER BY ScorTotal DESC;`);
        return score;
    } catch (error) {
        console.error(error);
    }
}


// 6.	Afisarea antrenorilor care au antrenat in arena 'TD Garden'
const getCoachesInArena = async () => {
    try {
        let pool = await sql.connect(config);
        let coach = await pool.request()
            .query(`SELECT DISTINCT Antrenori.numeAntrenor
                    FROM Antrenori
                    JOIN AntrenoriEchipe ON Antrenori.antrenorID = AntrenoriEchipe.antrenorID
                    JOIN Echipe ON AntrenoriEchipe.echipaID = Echipe.echipaID
                    JOIN Meciuri ON Echipe.echipaID = Meciuri.gazdeID OR Echipe.echipaID = Meciuri.oaspetiID
                    JOIN Arene ON Meciuri.arenaID = Arene.arenaID
                    WHERE Arene.numeArena = 'TD Garden'`);
        return coach;
    } catch (error) {
        console.error(error);
    }
}



// interogari complexe


// 1.	Sa se afiseze pentru o anumita arena numele echipei si punctajul acesteia 
//      care a avut cel mai mic punctaj dintre toate meciurile jucate in arena respectiva drept gazda
const getLeastScore = async (arenaName) => {
    try {
        let pool = await sql.connect(config);
        let least = await pool.request()
            .input('arenaName', sql.VarChar, arenaName)
            .query(`SELECT E.numeEchipa, M.punctajGazde
                    FROM Meciuri M
                    JOIN Echipe E ON M.gazdeID = E.echipaID OR M.oaspetiID = E.echipaID
                    WHERE M.arenaID = (SELECT arenaID FROM Arene WHERE numeArena = @arenaName)
                    AND M.punctajGazde = (
                        SELECT MIN(punctajGazde)
                        FROM Meciuri
                        WHERE arenaID = (SELECT arenaID FROM Arene WHERE numeArena = @arenaName)
                    )`);
        return least;
    } catch (error) {
        console.error(error);
    }
}


// 2.	Afisarea echipelor si orasul lor fara meciuri castigate
const getTeamsWithoutWins = async () => {
    try {
        let pool = await sql.connect(config);
        let teams = await pool.request()
            .query(`SELECT DISTINCT Echipe.numeEchipa, Echipe.oras
                    FROM Echipe
                    LEFT OUTER JOIN Meciuri
                        ON Echipe.echipaID = Meciuri.gazdeID OR Echipe.echipaID = Meciuri.oaspetiID
                    WHERE Echipe.numeEchipa NOT IN (Meciuri.castigator)
                    `);
        return teams;
    } catch (error) {
        console.error(error);
    }
}


// 3.	Afisarea jucatorilor care au marcat peste medie puncte pe meci in comparatie cu media echipei lor
const getPlayersThatScored = async () => {
    try {
        let pool = await sql.connect(config);
        let players = await pool.request()
            .query(`SELECT J.nume
                    FROM Jucatori J
                    WHERE J.PPG > (
                        SELECT AVG(J2.PPG)
                        FROM Jucatori J2
                        WHERE J2.echipaID = J.echipaID
                    )`);
        return players;
    } catch (error) {
        console.error(error);
    }
}


// 4.	Afisarea echipelor care nu au jucat intr-o anumita arena drept gazde
const getTeamsThatHaventplayed = async (newarena) => {
    try {
        let pool = await sql.connect(config);
        let teams = await pool.request()
            .input('newarena', sql.VarChar, newarena)
            .query(`SELECT E.numeEchipa
                    FROM Echipe E
                    WHERE E.echipaID NOT IN (
                        SELECT M.gazdeID
                        FROM Meciuri M
                        WHERE M.arenaID = (SELECT A.arenaID FROM Arene A WHERE A.numeArena = @newarena)
                    )`);
        return teams;
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    createPlayer,
    getPlayers,
    updatePlayer,
    deletePlayer,
    createTeam,
    getTeams,
    updateTeam,
    deleteTeam,
    getCoaches,
    getGames,
    getArenas,
    getPlayersByTeam,
    getNumberOfGames,
    getTeamsWithHighPPG,
    getDateFromJerseyNumber,
    getTotalScore,
    getCoachesInArena,
    getLeastScore,
    getTeamsWithoutWins,
    getPlayersThatScored,
    getTeamsThatHaventplayed
}