const http = require('http');
const mysql = require('mysql');
const config = require('./utils/config');
const Req = require('./utils/reqs');
const Tools = require('./utils/tools');
const url = require('url');

const Paths = {
    home: '/',
    getuserall: '/getuserall',
    verifyuser: '/verifyuser',
    verifyadmin: '/verifyadmin',
    getuserbyid: '/getuserbyid',
    getadminbyid: '/getadminbyid',
    getuserbyid: '/getuserbyid',
    adduser: '/adduser',
    searchplace: '/searchplace',
    reserverplace: '/reserverplace',
    cancelreservation: '/cancelreservation',
    endreservation: '/endreservation',
    getreservationsbyuser: '/getreservationsbyuser',
    getplace: '/getplace',
    getfreeparkingplaces: '/getfreeparkingplaces',
    getparking: '/getparking',
    getparkingplaces: '/getparkingplaces',
    getparkingfreeplacescount: '/getparkingfreeplacescount',
    setplaceoccupation: '/setplaceoccupation',
    sendnotif: '/sendnotif',
    getplaceoccupation: '/getplaceoccupation',
    getnotifbyuser: '/getnotifbyuser',
    setparkingprices: '/setparkingprices',
    setnotiflu: '/setnotiflu',
    getparkingparties: '/getparkingparties',
    getreservation: '/getreservation',
    ajoutersolde: '/ajoutersolde',
    retirersolde: '/retirersolde'
}

var server = http.createServer((req, res)=>{
    let invalidRequest = false;
    let conn = mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.dbName
    });

    conn.connect(async (err)=>{
        if(err){
            console.log('erreur de connexion: ', err.message);
        }
        else{
            console.log('connexion établie');
            res.writeHead(200, { 'Content-Type': 'text/json' });
            let reqUrl = url.parse(req.url, true);
            console.log('path: ', reqUrl.pathname);
            switch(reqUrl.pathname){
                case Paths.home:
                    res.write(JSON.stringify({hello: "world"}));
                    conn.end();
                    break;
                case Paths.getuserall:
                    await new Promise(resolve=>{
                        conn.query(Req.getUserAll, (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                let users = [];
                                results.forEach((u)=>{
                                    users.push({
                                        id: u.id,
                                        nom: u.nom,
                                        prenoms: u.prenoms,
                                        numeroPiece: u.numeroPiece,
                                        typePiece: u.typePiece,
                                        dateNaissance: u.dateNaissance.getTime(),
                                        adresse: u.adresse,
                                        tel: u.tel,
                                    });
                                });
                                r = JSON.stringify({succes: true, data: users});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.verifyuser:
                    await new Promise(resolve=>{
                        conn.query(Req.verifyUser, [reqUrl.query.id, reqUrl.query.mdp],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                r = (results.length != 0)?
                                    JSON.stringify({succes: true, data: {
                                        id: results[0].id,
                                        nom: results[0].nom,
                                        prenoms: results[0].prenoms,
                                        numeroPiece: results[0].numeroPiece,
                                        typePiece: results[0].typePiece,
                                        dateNaissance: results[0].dateNaissance.getTime(),
                                        adresse: results[0].adresse,
                                        tel: results[0].tel,
                                        solde: results[0].solde
                                    }})
                                    :
                                    JSON.stringify({succes: false});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.verifyadmin:
                    await new Promise(resolve=>{
                        conn.query(Req.verifyAdmin, [reqUrl.query.id, reqUrl.query.mdp],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                r = (results.length != 0)?
                                    JSON.stringify({succes: true, data: {
                                        id: results[0].id,
                                        nom: results[0].nom,
                                        prenoms: results[0].prenoms,
                                        idParking: results[0].idParking
                                    }})
                                    :
                                    JSON.stringify({succes: false});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.getadminbyid:
                    await new Promise(resolve=>{
                        conn.query(Req.getAdminById, [reqUrl.query.id],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                r = (results.length != 0)?
                                    JSON.stringify({succes: true, data: {
                                        id: results[0].id,
                                        nom: results[0].nom,
                                        prenoms: results[0].prenoms,
                                        idParking: results[0].idParking
                                    }})
                                    :
                                    JSON.stringify({succes: false});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.getuserbyid:
                    await new Promise(resolve=>{
                        conn.query(Req.getUserById, [reqUrl.query.id],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                r = (results.length != 0)?
                                    JSON.stringify({succes: true, data: {
                                        id: results[0].id,
                                        nom: results[0].nom,
                                        prenoms: results[0].prenoms,
                                        numeroPiece: results[0].numeroPiece,
                                        typePiece: results[0].typePiece,
                                        dateNaissance: results[0].dateNaissance.getTime(),
                                        adresse: results[0].adresse,
                                        tel: results[0].tel,
                                        solde: results[0].solde
                                    }})
                                    :
                                    JSON.stringify({succes: false});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.adduser:
                    await new Promise(resolve=>{
                        conn.query(Req.addUser, [reqUrl.query.nom, reqUrl.query.prenoms, reqUrl.query.numeroPiece, reqUrl.query.typePiece, Tools.timestampToDateString(+reqUrl.query.dateNaissance), reqUrl.query.adresse, reqUrl.query.tel, reqUrl.query.mdp],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                r = (results.affectedRows > 0)?
                                    JSON.stringify({succes: true})
                                    :
                                    JSON.stringify({succes: false});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.searchplace:
                    await new Promise(resolve=>{
                        let dateDebut = Tools.timestampToDateTimeString(+reqUrl.query.datedebut);
                        let dateFin = Tools.timestampToDateTimeString(+reqUrl.query.datefin);
                        let longitudeProximite = reqUrl.query.longitudeproximite;
                        let lattitudeProximite = reqUrl.query.lattitudeproximite;
                        conn.query(Req.searchPlace, [lattitudeProximite, longitudeProximite, lattitudeProximite, dateDebut, dateFin, dateDebut, dateFin],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                let places = [];
                                results.forEach((p)=>{
                                    places.push({
                                        id: p.id,
                                        nom: p.nom,
                                        idPartie: p.idPartie,
                                        occupee: (p.occupee == 1)? true : false,
                                        distance: p.dist,
                                    });
                                });
                                r = JSON.stringify({succes: true, data: places});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.reserverplace:
                    await new Promise(resolve=>{
                        conn.query(Req.reserverPlace, [reqUrl.query.idplace, reqUrl.query.idUser, dateDebut, dateFin, sommePayee],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                r = (results.affectedRows > 0)?
                                    JSON.stringify({succes: true})
                                    :
                                    JSON.stringify({succes: false});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.cancelreservation:
                    await new Promise(resolve=>{
                        conn.query(Req.cancelReservation, [reqUrl.query.idreservation],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                r = (results.affectedRows > 0)?
                                    JSON.stringify({succes: true})
                                    :
                                    JSON.stringify({succes: false});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.endreservation:
                    await new Promise(resolve=>{
                        conn.query(Req.cancelReservation, [reqUrl.query.idreservation],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                r = (results.affectedRows > 0)?
                                    JSON.stringify({succes: true})
                                    :
                                    JSON.stringify({succes: false});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.getreservationsbyuser:
                    await new Promise(resolve=>{
                        conn.query(Req.getReservationsByUser, [reqUrl.query.iduser],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                let reservs = [];
                                results.forEach((p)=>{
                                    reservs.push({
                                        id: p.id,
                                        idUser: p.idUtilisateur,
                                        datePaiement: p.datePaiement.getTime(),
                                        dateDebut: p.dateDebut.getTime(),
                                        dateFin: p.dateFin.getTime(),
                                        idPlace: p.idPlace,
                                        annule: (p.annule == 1)? true : false,
                                        sommePayee: p.sommePayee
                                    });
                                });
                                r = JSON.stringify({succes: true, data: reservs});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.getplace:
                    await new Promise(resolve=>{
                        conn.query(Req.getPlace, [reqUrl.query.idplace],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{                                
                                r = (results.length != 0)?
                                    JSON.stringify({succes: true, data: {
                                        id: results[0].id,
                                        nom: results[0].nom,
                                        occupee: (results[0].occupee == 1)? true : false,
                                        idParking: results[0].idParking,
                                        nomParking: results[0].nomParking,
                                        adresseParking: results[0].adresseParking,
                                        longitude: results[0].longitude,
                                        lattitude: results[0].lattitude,
                                        prixmort: results[0].prixmort,
                                        prixplein: results[0].prixplein,
                                    }})
                                    :
                                    JSON.stringify({succes: false});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
                case Paths.getfreeparkingplaces:
                    await new Promise(resolve=>{
                        conn.query(Req.getFreeParkingPlaces, [reqUrl.query.idparking],  (error, results, fields) => {
                            if (error) {
                                console.error('ERREUR: ', error.message);
                                r = JSON.stringify({succes: false});
                            }
                            else{
                                let places = [];
                                results.forEach((p)=>{
                                    places.push({
                                        id: p.id,
                                        nom: p.nom,
                                        occupee: (p.occupee == 1)? true : false,
                                        idParking: p.idParking,
                                        nomParking: p.nomParking,
                                        adresseParking: p.adresseParking,
                                        longitude: p.longitude,
                                        lattitude: p.lattitude,
                                        prixmort: p.prixmort,
                                        prixplein: p.prixplein,
                                    });
                                });
                                r = JSON.stringify({succes: true, data: places});
                                resolve();
                            }
                        });
                    });
                    res.write(r);
                    conn.end();
                    break;
            case Paths.getparking:
                await new Promise(resolve=>{
                    conn.query(Req.getParking, [reqUrl.query.idparking],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{                                
                            r = (results.length != 0)?
                                JSON.stringify({succes: true, data: {
                                    id: results[0].id,
                                    nom: results[0].nom,
                                    adresse: results[0].adresse,
                                    longitude: results[0].longitude,
                                    lattitude: results[0].lattitude,
                                    prixmort: results[0].prixmort,
                                    prixplein: results[0].prixplein,
                                }})
                                :
                                JSON.stringify({succes: false});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.getparkingplaces:
                await new Promise(resolve=>{
                    conn.query(Req.getParkingPlaces, [reqUrl.query.idparking],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{
                            let places = [];
                            results.forEach((p)=>{
                                places.push({
                                    id: p.id,
                                    nom: p.nom,
                                    occupee: (p.occupee == 1)? true : false,
                                    idParking: p.idParking,
                                    nomParking: p.nomParking,
                                    adresseParking: p.adresseParking,
                                    longitude: p.longitude,
                                    lattitude: p.lattitude,
                                    prixmort: p.prixmort,
                                    prixplein: p.prixplein,
                                });
                            });
                            r = JSON.stringify({succes: true, data: places});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.getparkingfreeplacescount:
                await new Promise(resolve=>{
                    conn.query(Req.getFreeParkingPlacesCount, [reqUrl.query.idparking],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{                                
                            r = results[0].nb;
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.setplaceoccupation:
                await new Promise(resolve=>{
                    conn.query(Req.setPlaceOccupation, [reqUrl.query.occupation, reqUrl.query.idplace],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{
                            r = (results.affectedRows > 0)?
                                JSON.stringify({succes: true})
                                :
                                JSON.stringify({succes: false});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.sendnotif:
                await new Promise(resolve=>{
                    conn.query(Req.sendNotif, [reqUrl.query.iduser, reqUrl.query.texte],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{
                            r = (results.affectedRows > 0)?
                                JSON.stringify({succes: true})
                                :
                                JSON.stringify({succes: false});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.getplaceoccupation:
                await new Promise(resolve=>{
                    conn.query(Req.getPlaceOccupation, [reqUrl.query.idplace],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{                                
                            r = (results[0].nb==1)? true : false;
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.getnotifbyuser:
                await new Promise(resolve=>{
                    conn.query(Req.getNotifByUser, [reqUrl.query.iduser],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{
                            let notifs = [];
                            results.forEach((p)=>{
                                notifs.push({
                                    id: p.id,
                                    texte: p.nom,
                                    lu: (p.lu == 1)? true : false
                                });
                            });
                            r = JSON.stringify({succes: true, data: notifs});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.setparkingprices:
                await new Promise(resolve=>{
                    conn.query(Req.setParkingPrices, [reqUrl.query.prixmort, reqUrl.query.prixplein, reqUrl.query.idparking],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{
                            r = (results.affectedRows > 0)?
                                JSON.stringify({succes: true})
                                :
                                JSON.stringify({succes: false});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.setnotiflu:
                await new Promise(resolve=>{
                    conn.query(Req.setNotifLu, [reqUrl.query.iduser],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{
                            r = (results.affectedRows > 0)?
                                JSON.stringify({succes: true})
                                :
                                JSON.stringify({succes: false});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.getreservation:
                await new Promise(resolve=>{
                    conn.query(Req.getReservation, [reqUrl.query.idreservation],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{                                
                            r = (results.length != 0)?
                                JSON.stringify({succes: true, data: {
                                    id: results[0].id,
                                    idUtilisateur: results[0].idUtilisateur,
                                    datePaiement: results[0].datePaiement.getTime(),
                                    dateDebut: results[0].dateDebut.getTime(),
                                    dateFin: results[0].dateFin.getTime(),
                                    idPlace: results[0].idPlace,
                                    annule: (results[0].annule==1)? true:false,
                                    sommePayee: results[0].sommePayee
                                }})
                                :
                                JSON.stringify({succes: false});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.getparkingparties:
                await new Promise(resolve=>{
                    conn.query(Req.getParkingParties, [reqUrl.query.idparking],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{
                            let parties = [];
                            results.forEach((p)=>{
                                parties.push({
                                    id: p.id,
                                    nom: p.nom,
                                });
                            });
                            r = JSON.stringify({succes: true, data: parties});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.ajoutersolde:
                await new Promise(resolve=>{
                    conn.query(Req.ajouterSolde, [reqUrl.query.montant, reqUrl.query.iduser],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{
                            r = (results.affectedRows > 0)?
                                JSON.stringify({succes: true})
                                :
                                JSON.stringify({succes: false});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            case Paths.retirersolde:
                await new Promise(resolve=>{
                    conn.query(Req.retirerSolde, [reqUrl.query.montant, reqUrl.query.iduser],  (error, results, fields) => {
                        if (error) {
                            console.error('ERREUR: ', error.message);
                            r = JSON.stringify({succes: false});
                        }
                        else{
                            r = (results.affectedRows > 0)?
                                JSON.stringify({succes: true})
                                :
                                JSON.stringify({succes: false});
                            resolve();
                        }
                    });
                });
                res.write(r);
                conn.end();
                break;
            default:
                invalidRequest = true;
                break;
            }
            (invalidRequest)?res.end(JSON.stringify({succes: false})):res.end();
        }
    });
});

server.listen(config.serverPort);
console.log('Le serveur HTTP a été lancé');