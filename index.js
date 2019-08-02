const MongoClient = require('mongodb').MongoClient;
const jsonfile = require('jsonfile');

//let url = "mongodb://single:es9YNJKDq7YjNhbUGzmc@10.3.18.93:27017/Vsys_ms";
let url = "mongodb://riflores:uD2kC2tm6KAhgKS6qQfZ@10.3.18.93:27017/Vsys_ms";

MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  let dbo = db.db("Vsys_ms");

  dbo.listCollections().toArray((err, collInfos) => {
    collInfos.forEach((item, index) => {
      let file = `/tmp/${item.name}.json`;
      //console.log(item);
      jsonfile.writeFile(file, item).then(rs => {
        console.log('Write Complete');
      })
      .catch(error => console.log('Error: ', error));
    });
  });

  dbo.collection("crud").find().toArray((err, result) => {
    if (err) throw err;
    //console.log(result);
    db.close();
  });
});
