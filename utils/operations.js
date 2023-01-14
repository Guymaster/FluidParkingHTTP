const Req = require('./reqs');

const Operations = {
    getUserAll: async (conn, resolve)=>{
        conn.query(Req.getUserAll, (error, results, fields) => {
            if (error) {
                console.error('ERREUR: ', error.message);
            }
            else{
                console.log('pas erreur')
                let users = [];
                results.forEach((u)=>{
                    users.push({
                        id: u.id,
                        nom: u.nom,
                        prenoms: u.prenoms,
                        numeroPiece: u.numeroPiece,
                        typePiece: u.typePiece,
                        dateNaissance: u.dateNaissance.getTime()/1000,
                        adresse: u.adresse,
                        tel: u.tel,
                    });
                });
                r = JSON.stringify({succes: true, data: users});
                resolve();
            }
        });
    }
};

module.exports = Operations;