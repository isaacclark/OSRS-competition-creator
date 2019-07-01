var db = require('../database');
const index = require('./index');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
stats = {'Total': '', 'Attack': '','Defence': '', 'Strength': '', 
'Hitpoints': '','Ranged': '', 'Prayer':'', 'Magic':'', 'Cooking':'', 
'Woodcutting':'', 'Fletching':'', 'Fishing':'', 'Firemaking':'', 'Crafting':'',
'Smithing' : '', 'Mining':'', 'Herblore':'', 'Agility':'', 'Thieving':'',
'Slayer':'', 'Farming':'', 'Runecraft':'', 'Hunting':'', 'Construction':''}

var Active = []

exports.add = function(conData, account, levels){
    db.connect(conData, function(err, con){
        if(err) console.log("there's a problem");
        else{
            con.query(`INSERT INTO datapoint(PlayerName, Levels) VALUES ('${account}', '${levels}');`, (err, result) =>{
                if (err) console.log("datapoint failure")
                con.end();
                return;
            });
        }
    })
};

exports.find = function(conData, account){
    db.connect(conData, function(err, con){
        if(err) console.log("there's a problem");
        else{
            con.query(`SELECT * FROM datapoint WHERE PlayerName = '${account}';`, (err, result) =>{
                if (err) console.log("datapoint finding failure")   
                else {
                    for (i=0; i < result.length; i++){
                        Levels = JSON.parse(result[i].Levels)
                        console.log(' total xp :' + Levels.Total  +'  DP timestamp: ' + result[i].DPTime )
                    }
                    return;
                }
            });
        }
    })
};

exports.findDiff = function(conData, account, startTime){
    let sql = `(SELECT * FROM datapoint WHERE PlayerName = '${account}' AND DPTIME > '${startTime}' ORDER BY DPTime ASC LIMIT 1)`;
    sql += `UNION` + `(SELECT * FROM datapoint WHERE PlayerName = '${account}' AND DPTIME > '${startTime}' ORDER BY DPTime Desc LIMIT 1);`;
    db.connect(conData, function(err, con){
        if(err) {
            console.log("there's a problem");
            throw(err)
        }
        else{
            con.query(sql, (err, result) =>{
                if (err) {
                    console.log("datapoint finding start stat failure")
                    con.end()
                    return;}
                else {
                    if (typeof (result[0].Levels) !== "string"){
                        throw con.end();          
                    } 
                    else{
                        StartLevels = JSON.parse(result[0].Levels)
                        CurrLevels = JSON.parse(result[result.length-1].Levels)
                        if (CurrLevels.Total - StartLevels.Total > 0){
                            console.log(CurrLevels.Total , "   " , CurrLevels.Fishing - StartLevels.Fishing);
                             /*         con.query(`INSERT INTO comp (PlayerName, Fish) VALUES( '${account}', '${CurrLevels.Fishing - StartLevels.Fishing}' )`,(err, data) =>{ 
                                if (err) throw(err);               
                            })*/
                        }
                        con.end()
                            
                    }
                }
            })
                        
        }
    })
}


exports.findProg = function(conData, account, startTime){
    let sql = `(SELECT * FROM datapoint WHERE PlayerName = '${account}' AND DPTIME > '${startTime}' ORDER BY DPTime ASC)`;
    db.connect(conData, function(err, con){
        if(err) {
            console.log("there's a problem");
            throw(err)
        }
        else{
            con.query(sql, (err, result) =>{
                if (err) {
                    console.log("datapoint finding start stat failure")
                    con.end()
                    return;}
                else {
                    if (typeof (result[0].Levels) !== "string"){
                        throw con.end();          
                    } 
                    else{
                        console.log(account)
                        for(i=0;i < result.length-1; i++){
                            TimeSt = result[i].DPTime
                            Levels = JSON.parse(result[i].Levels)
                            console. log(TimeSt, "   ", Levels.Fishing);
                        }
                        con.end()  
                    }
                }
            })
                    
        }
    })
}
/*

47/132 active players*/