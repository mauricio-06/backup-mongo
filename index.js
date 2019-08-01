let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://single:es9YNJKDq7YjNhbUGzmc@10.3.18.93:27017/Vsys_ms";

MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  let dbo = db.db("Vsys_ms");

  dbo.listCollections().toArray(function(err, collInfos) {
    console.log(collInfos);
  });

  dbo.collection("crud").find().toArray((err, result) => {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
