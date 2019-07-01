const mysql = require('mysql');

// Intialise Database and add tables id not already existing 
exports.connect = function(conData, callback){

	var con = mysql.createConnection({
		host: conData.host,
		user: conData.user, 
		password: conData.password, 
		database: conData.database
    });
        
	con.connect(function(err) {
		if (err) callback(err);
		callback(null, con);
	});

};

exports.createTables = function(conData, callback){
    
    var con = mysql.createConnection({
        multipleStatements:true,
        host: conData.host,
        user: conData.user, 
        password: conData.password, 
        database: conData.database
    });
      
    let sql = "CREATE TABLE if not exists player(PlayerName VARCHAR(15) PRIMARY KEY NOT NULL, Stats VARCHAR(1024))";
    sql += ";" + "CREATE TABLE if not exists dataPoint(DP_ID INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, Levels VARCHAR(1024), DPTime datetime DEFAULT CURRENT_Timestamp, PlayerName VARCHAR(15))";
    //sql += ";" + "CREATE TABLE if not exists competition(Comp_ID INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, CompName TEXT NOT NULL, StartTime datetime, EndTime datetime)";
    
	con.query(sql, function (err, result) {
		//console.log("finish query:" + result);
		callback(err, true);
	});
};

exports.delete = function(conData){

    var con = mysql.createConnection({
        multipleStatements:true,
        host: conData.host,
        user: conData.user, 
        password: conData.password, 
        database: conData.database
	});
    
	let sql= "DELETE FROM player WHERE Player_ID NOT IN (1)";
	sql += ";" + "DELETE FROM dataPoint WHERE DP_ID NOT IN (1)";
    sql += ";" + "DELETE FROM competition WHERE Comp_ID NOT IN (1)";

	con.query(sql, function (err, result) {
		if(err)throw err;
		console.log("Data was successfully deleted");
	});

};