var db = require('../database');
players = {}

exports.findAll = function(conData, callback) {

  db.connect(conData, function(err, con){  
    if (err) {
      console.log(err);
      throw(err);
    }	

    con.query(`SELECT * FROM player;`, function (err, result) {
      for (i = 0; i < result.length; i++){
        players[i] = {"PlayerName": result[i].PlayerName, "Stats" : JSON.parse(result[i].Stats)}
      }
      result = players
      callback(err, result);
    });
  });
}

