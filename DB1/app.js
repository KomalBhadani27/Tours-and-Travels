var express = require('express');
//var mysql = require('mysql');
var ejs = require ('ejs');
var app = express();
var bodyParser = require("body-parser");
// var   LocalStrategy     = require("passport-local").Strategy;
// var   passport          = require("passport"),
//       flash             = require('connect-flash'),
//       crypto            = require('crypto'),
//       user              = require("./models/user"),
//       morgan            = require('morgan');

var oracledb = require('oracledb');
let connection;

app.set('view engine', 'ejs');
app.use(express.static('public'));


//setup body-parser
app.use(bodyParser.urlencoded({extended : true}))

async function run() {
  connection = await oracledb.getConnection(
    {
      user          : "",
      password      : "",
      connectString : "localhost:1521/orcl.26.35.240"
    }
  );
}
console.log(typeof connection);

app.get('/',function(req,res){
     res.sendFile(__dirname +"/index.html");
});

app.post('/myaction',function (req, res){
     var queryq="INSERT INTO login_table VALUES (:a ,:b ,:c)";
    
      connection.execute(queryq,[req.body.fullname,req.body.emailId,req.body.pass],{ autoCommit: true,extendedMetaData:true}, function(err,result){
             
              if(err){
                console.error(err.message);
                return;
              }

              console.log('Values Inserted!');
              console.log(result.rowsAffected); 
          });
      res.redirect("/dest");
 });


app.get('/dest', function(req, res){
  query =`SELECT tour_list.Tour_id, tour_list.city, tour_list.state, tour_details.description,tour_details.cost, tour_details.tour_type FROM tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id where rownum <= 6`;
  queryTOFindDistinctCities = `SELECT DISTINCT city FROM tour_list`;
  queryTOFindDistinctSate = `SELECT DISTINCT state FROM tour_list`;
  queryTOFindDistinctTourTypes = `SELECT DISTINCT tour_type FROM tour_details`;
  queryTOFindDistinctTourDuration = `SELECT DISTINCT duration FROM tour_list`
  queryForAdministratorDetails='select * from administrator';

  // res.render("index";
  connection.execute(query, function(err, result)
        {
          if (err) { console.error(err); return; }
          else{
            console.log(result.rows);
            var destinations= result.rows;
            connection.execute(queryTOFindDistinctCities, function(err2, cities){
              if (err2) { console.error(err); return; }
              else{
                console.log('cities', cities);
                var allcities = cities.rows
                allcities = allcities.sort();
                connection.execute(queryTOFindDistinctSate, function(errState, state){
                  if (err) { console.error(errState); return; }
                  else{
                    var allstate = state.rows
                    allstate = allstate.sort();
                    connection.execute(queryTOFindDistinctTourTypes, function(errTourType, tourType){
                      if (err) { console.error(errTourType); return; }
                      else{
                        var allTT = tourType.rows
                        allTT = allTT.sort();
                        connection.execute(queryTOFindDistinctTourDuration, function(errDuration, duration){
                          if (err) { console.error(errDuration); return; }
                          else{
                            var allduration = duration.rows
                            allduration = allduration.sort();
                                connection.execute(queryForAdministratorDetails,[], {outFormat: oracledb.OBJECT }, function(errDuration, administrator){
                                if (err) { console.error(errDuration); return; }
                                else{
                                  var administratorDet = administrator.rows;
                                  var newData = JSON.stringify(administratorDet);
                                  var admin=JSON.parse(newData);
                                  console.log(admin[0].CONTACT);
                                  res.render('index', { destinations: destinations, allcities: allcities, allstate: allstate, allTT: allTT, allduration: allduration,administrator:admin});
                                }
                            })                          }
                        })

                      }
                    })
                  }
                })
                // res.render('index', { destinations: destinations, allcities: allcities})
                // res.send('success')
              }
            })
          }


          //res.send('success')
        });
})


app.get('/destination', function(req, res){
  query = `SELECT tour_details.tour_id, tour_list.city, tour_list.state, tour_details.cost, tour_details.description FROM tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id`;
  connection.execute(query, function(err, result)
        {
          if (err) { console.error(err); return; }
          console.log(result.rows);
          var destinations= result.rows;
          // res.send("success")
          res.render('destination', { destinations: destinations})
        });
})

// app.post("/search", function(req, res){
//   var city = req.body.city
//   res.redirect("/search/"+ city);
// })

app.get("/search", function(req, res){
  console.log(req.query);
  var city = req.query.city;
  var state = req.query.state;
  var tourType = req.query.tourType;
  var duration = req.query.duration;

  console.log(city)
  var query = `SELECT tour_details.tour_id, tour_list.city, tour_list.state, tour_details.cost, tour_details.description, tour_details.tour_type FROM tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id where `;
  if (city != ''){
    query = query + `tour_list.city = '` +  city + `' AND `;
  }

  if (state != ''){
    query = query + `tour_list.state = '` +  state + `' AND `;
  }


  if (tourType != ''){
    query = query + `tour_details.tour_type = '` +  tourType + `' AND `;
  }

  if (duration != ''){
    query = query + `tour_list.duration = '` +  duration + `'`;
  }

  console.log(query);
  console.log(query.slice(-4,-1));
  if (query.slice(-4,-1) == 'AND'){
    l = query.length;
    query = query.slice(0,l-5)
    console.log(query)
  }

  connection.execute(query, function(err, result){
    if (err) { console.error(err); return; }
    else{
      console.log(result);
      destinations = result.rows;
      res.render("search", {destinations: destinations})
    }
  })
})

app.get("/search-by-state/:id", (req, res)=>{
  state = req.params.id;
  query = "SELECT tour_list.tour_id, tour_list.city, tour_list.state, tour_details.description FROM tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id where tour_list.state = '" + state + "'";
  connection.execute(query, function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      destinations = result.rows;
      res.render("search", {destinations: destinations})
    }
  })
})


app.get('/pricing', (req, res)=>{
  query = `SELECT tour_list.tour_id, tour_list.city, tour_list.state, tour_details.description, tour_details.cost, tour_details.tour_type FROM tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id order by cost
`;
  connection.execute(query, function(err, result){
          if (err) { console.error(err); return; }
          console.log(result.rows);
          var destinations= result.rows;
          // res.send("success")
          res.render('pricing', { destinations: destinations})
        });
})

app.get('/contact', (req, res)=>{
  query = `SELECT tour_list.city, tour_list.state, tour_details.description, tour_details.cost FROM tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id order by cost
`;
  connection.execute(query, function(err, result){
          if (err) { console.error(err); return; }
          console.log(result.rows);
          var destinations= result.rows;
          // res.send("success")
          res.render('contact', { destinations: destinations})
        });
})


app.get("destination/:id", (req, res)=>{
  query = "SELECT tour_list.city, tour_list.state, tour_details.description FROM tour_list INNER JOIN tour_details ON tour_list.tour_id = tour_details.tour_id where tour_list.tour_id = '" + req.params.id + "'";
  console.log(req.params.id)
})


app.get("/book-ticket", (req, res)=>{
  res.render("booking")
});


app.get("/home", (req, res)=>{
  res.render("index")
});


app.post("/book-ticket", (req, res)=>{
  console.log(req.body);
  query = "select booking_id from booking_details"
  connection.execute(query, (err,result)=>{
    if (err) { console.error(err); return; }
    else{
      var arr = result.rows;
      console.log(result.rows)
      var l = arr.length;
      var bId;
      if(l != 0){
        bId = arr[l-1];
        bId = parseInt(bId);
        bId = bId + 1
      } else{
        bId = 1;
      }
      connection.execute("select tour_list.duration from tour_list where tour_id = '" + req.body.tourId + "'" , (err, duration)=>{
          if (err) { console.error(err); return; }
          else{
            console.log(duration.rows[0][0]);
            console.log(bId);
            var d = new Date(req.body.date);
            insertQuery = "insert into booking_details (booking_id, username, tour_id, start_date, duration, no_adults, no_children, hotel) values(:bid, :un, :tid, :sd, :du, :na, :nc, :ho )"
            connection.execute(insertQuery,{
              bid:  bId.toString(),
              un: req.body.name,
              tid: req.body.tourId,
              sd: d,
              du: duration.rows[0][0],
              na: req.body.adults,
              nc: req.body.children,
              ho: req.body.roomType
            },{ autoCommit: true }, (err, insertResult)=>{
              if (err) { console.error(err); return; }
              else{
                console.log(insertResult);
                res.redirect("/booking/payment/"+bId.toString() + "/" + req.body.tourId)
              }
            })

          }
      })

    }

  })

})

app.get("/booking/payment/:id/:tid", (req, res)=>{
  var tid = req.params.tid;
  costQuery = "select tour_id, cost from tour_details where tour_id = '" + tid + "'";
  console.log(costQuery);
  connection.execute(costQuery, (err, result)=>{
    if (err) { console.error(err); return; }
    else{
      console.log(result.rows[0]);
      res.render("payment" ,{bid: req.params.id, result: result.rows[0]})
    }
  })


})

app.post("/booking/payment", (req, res)=>{
  console.log(req.body);
  insertQuery = "update booking_details set address_line1 = :ad1, address_line2= :ad2, town = :t, postal_code = :p, country = :c where booking_id = '" + req.body.bid + "'";
  console.log(insertQuery);
  connection.execute(insertQuery,{
    ad1: req.body.ad1,
    ad2: req.body.ad2,
    t: req.body.town,
    p: req.body.pin,
    c: req.body.count
  },{ autoCommit: true,outFormat: oracledb.OBJECT }, (err, insertResult)=>{
    if (err) { console.error(err); return; }
    else{
      console.log(insertResult.rows);
      res.render("invoice");
    }
  })
})


app.post("/Contact", (req, res)=>{
  console.log(req.body);
  insertQuery = "insert into Contact (f_name,email,subject,message) values(:nm, :email, :sub, :m)";
  console.log(insertQuery);
  connection.execute(insertQuery,{
    nm: req.body.nm,
    email: req.body.email,
    sub: req.body.sub,
    m: req.body.message,
    },{ autoCommit: true }, (err, insertResult)=>{
    if (err) { console.error(err); return; }
    else{
      res.send("Your request will be processed.")
    }
  })
})


run();


app.listen(3000, function(){
  console.log("server started........")
})
