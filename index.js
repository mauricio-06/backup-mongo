const MongoClient = require('mongodb').MongoClient;
const jsonfile = require('jsonfile');
const fs = require('fs');

//let url = "mongodb://single:es9YNJKDq7YjNhbUGzmc@10.3.18.93:27017/Vsys_ms";
let url = "mongodb://riflores:uD2kC2tm6KAhgKS6qQfZ@10.3.18.93:27017/Vsys_ms";

MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  let dbo = db.db("Vsys_ms");

  dbo.listCollections().toArray((err, collInfos) => {
    let d = new Date;
    let dia = d.getDate();
    let mes = d.getMonth() + 1;
    let ano = d.getFullYear();
    let formato = `${dia}-${mes}-${ano}`;
    let carpeta = `./backup_${formato}`;
    
    if (!fs.existsSync(carpeta)){
        fs.mkdirSync(carpeta);
    }

    collInfos.forEach((item, index) => {
      let file = `${carpeta}/${item.name}_${formato}.json`;
      setTimeout(() => {
        if(item.name != 'system.profile'){
          dbo.collection(item.name).find().toArray((err, result) => {
            if (err) throw err;
            jsonfile.writeFile(file, result).then(rs => {
              console.log('Write Complete');
            })
            .catch(error => console.log('Error: ', error));
          });
        }
      }, 1000);
    });
    //db.close();
  });
});
