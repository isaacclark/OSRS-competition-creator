const index = require('./routes/index');
const player = require('./routes/player');
const users = require('./routes/users');
const db = require('./database');
const dp = require('./routes/datapoint');
const namelist = require ('./data')

//const comp = require('./routes/competition');

exports.allRoutes = function(database, app){
  
  app.get('/', function(req, res){    
    index.findAll(database, function(err, result){
      if(err) throw err;
      //console.log(result)
      res.render('index', {player: result})
    })      
  });

  app.post('/playeradd', (req, res) => {
    account = namelist
    for (i=0; i < account.length; i++){
      player.add(database, account[i])
    }
    res.redirect('/'); 
  }); 
  

  app.post('/diff', (req, res) => { 
    account = namelist
    start = '2019-05-09 05:00:00'
    var i = 0, limit = account.length;
    function differ(){
      dp.findDiff(database, account[i], start);
      i++;
      if(i < limit){
        setTimeout(differ, 50);
      }
    }
    differ(); 
    res.end('found diff')
  });

  app.post('/createTables', (req, res) => { 
    db.createTables(database, function(err, result){
        if(err) {
            res.end("an error has occured:" + err);
            return;
        }
        res.end("tables were created successfully");
    });
  });

  app.post('/Leaders', (req, res) => {
    var leaders = ['Skill Ritely', 'Twinkle Fox', 'Gezus', 'Dps', 'Die choking']
    start = '2019-05-09 05:00:00'
    var i = 0, limit = leaders.length;
    function progress(){
      dp.findProg(database, leaders[i], start);
      i++;
      if(i < limit){
        setTimeout(progress, 50);
      }
    }
    progress(); 
    res.end('found diff')
  })

  app.post('/datapoint', (req, res) => { 
    account = "kozmic blues"
    dp.find(database, account);
    res.end('found it')
  });

  //COMPETITION SERVES NO PURPOSE FOR RESEARCH
  /*
  app.post('/createcomp', (req, res) => { 
    startDate = '2019-05-09 08:00:00';
    compName = 'Agility'
    endDate = '2019-05-12 08:00:00';
    comp.create(database,  compName, startDate, endDate)
    res.end('found it')
  });
*/

}