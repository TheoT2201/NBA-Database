class Player{
    constructor(echipaID, nume, echipa, nrJersey, pozitie, inaltime, greutate, anDebut, PPG, RPG, APG) {
        this.echipaID = echipaID;
        this.nume = nume;
        this.echipa = echipa;
        this.nrJersey = nrJersey;
        this.pozitie = pozitie;
        this.inaltime = inaltime;
        this.greutate = greutate;
        this.anDebut = anDebut;
        this.PPG = PPG;
        this.RPG = RPG;
        this.APG = APG;
    }
}

module.exports = Player;