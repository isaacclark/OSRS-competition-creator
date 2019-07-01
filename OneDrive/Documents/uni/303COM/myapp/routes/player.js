var db = require('../database');
var dp = require('./datapoint');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
stats = {'Total': '', 'Attack': '','Defence': '', 'Strength': '', 
'Hitpoints': '','Ranged': '', 'Prayer':'', 'Magic':'', 'Cooking':'', 
'Woodcutting':'', 'Fletching':'', 'Fishing':'', 'Firemaking':'', 'Crafting':'',
'Smithing' : '', 'Mining':'', 'Herblore':'', 'Agility':'', 'Thieving':'',
'Slayer':'', 'Farming':'', 'Runecraft':'', 'Hunting':'', 'Construction':''}

exports.add = function(conData, account){
    var player =  new XMLHttpRequest();
    var lookup = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=' + account;

    player.open('GET',lookup) 
    player.onload = function() {
        var levels = [];
        var skillType;
        var playerData =  JSON.parse(JSON.stringify((player.responseText).split('\n')));  
        for (i =0; i < 24; i++){
            if (playerData[i] != undefined){
                levels[i] = playerData[i].split(',')
                skillType  = (Object.keys(stats)[i])
                stats[skillType] = levels[i][2]
            }
            else{
                return;
            }
        }
        
        var levels = JSON.stringify(stats);
        
        db.connect(conData, function(err, con){
            if(err) console.log("there's a connection problem");
            else{             
                con.query(`SELECT EXISTS(SELECT * FROM player WHERE PlayerName = '${account}');`, (err, data) =>{
                    if (err){
                        console.log("issue finding player") 
                        con.end();
                        return;
                    }
                    if (Object.values(data[0]) == 0){
                        con.query(`INSERT INTO player (PlayerName, Stats) VALUES('${account}', '${levels}');`, (err, result) =>{
                            if (err) console.log("issue adding player")
                            else console.log("succesfully added player: " +account)
                            con.end();
                            dp.add(conData, account, levels);
                        });
                        
                    }
                    else{        
                        con.query(`UPDATE player SET Stats = ('${levels}') WHERE PlayerName = ('${account}');`, (err, result) =>{
                        if (err) console.log("issue updating player")
                        else console.log("Succesfully updated player " + account + ".")
                        con.end();
                        dp.add(conData, account, levels);
                    });     
                    }
                });    

            }        
        });
    };

    player.onerror = function (){
        console.log("can't connect")
    };

    player.send(); 
    return; 
}
