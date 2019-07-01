/*
var db = require('../database');
const index = require('./index');
const comp = require('./competition');

exports.create = function(conData,  compName, startDate, endDate){
    db.connect(conData, function(err, con){
        if(err) console.log("there's a problem");
        else{   
            con.query(`INSERT INTO competition(CompName, StartTime, EndTime) VALUES('${compName}','${startDate}','${endDate}')`, (err, result) =>{
                if (err) console.log("issue creating competition")
                else{
                    console.log('comp has been created')
                }
            })
        }
    })
};
*/