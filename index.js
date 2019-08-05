const MongoClient = require('mongodb').MongoClient;
const jsonfile = require('jsonfile');
const fs = require('fs');

//let url = "mongodb://single:es9YNJKDq7YjNhbUGzmc@10.3.18.93:27017/Vsys_ms";
let url = "mongodb://riflores:uD2kC2tm6KAhgKS6qQfZ@10.3.18.93:27017/Vsys_ms";

class Backup {
  constructor(){
    return this.bdBackup();
  }

  bdBackup(){
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
        let count = 0;
        let blackList = ['system.profile', 'crud', 'backlogFCS'];
        let total = collInfos.length - blackList.length;
    
        if (!fs.existsSync(carpeta)){
            fs.mkdirSync(carpeta);
        }
    
        collInfos.forEach((item, index) => {
          let file = `${carpeta}/${item.name}_${formato}.json`;
          if(blackList.includes(item.name) == false){
            dbo.collection(item.name).find().toArray((err, result) => {
              if (err) throw err;
              jsonfile.writeFile(file, result).then(rs => {
                console.log('Write Complete');
                count++;
                if(count == total){
                  //console.log('total: ' + count);
                  db.close();
                }
              })
              .catch(error => console.log('Error: ', error));
            });
          }
        });
      });
    });    
  }
}

let backBD = new Backup();
backBD;
