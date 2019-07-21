var express=require('express');
var mysql=require('mysql');
var oracledb=require('oracledb');
var bodyParser = require('body-parser');
var location = require('location-href');

var app=express();


oracledb.outFormat = oracledb.OBJECT;
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/css',express.static(__dirname+'/css'));
app.set('view engine', 'ejs');

var admin=require('./routes/admin');

app.get('/',function(req,res) {
	res.render('adminlogin',{err:" "});
})

app.use(express.static(__dirname));

let username='';
let pass='';

let ress;
var resp;
app.post('/details2',function (req,res) {
	
	 username=req.body.fullname;
	 pass=req.body.pass;
     console.log(username);

var newData="{}";

oracledb.getConnection(
  {
    user          : username,
    password      : pass,
    connectString : "localhost:1521/orcl.26.35.240"
  },connExecute);

resp=res;
}
);

function connExecute(err, connection)
{
    if (err) {
        console.error(err.message);
        resp.render('adminlogin',{err:"Invalid Input"});
        return ;
    }
resp.render('admin');
console.log("connection successful");

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
    
 });
var tours_list="{}";

 app.get('/tour_list',function (req,res) {
 	connection.execute("select * from tour_list",{},{extendedMetaData: true}, function(err,result){
              if(err){  
              console.error(err.message);
              return;
              } 
              
 	         tours_list = JSON.stringify(result.rows);
		       console.log('Hello');
            res.render('admin2',{tours:JSON.parse(tours_list),err:""});

	});

});

app.get('/showBookings',function (req,res) {
 	connection.execute("select * from booking_details inner join tour_list using (tour_id)",{},{extendedMetaData: true}, function(err,result){
              if(err){  
              console.error(err.message);
              return;
              } 
              
 	        var newData = JSON.stringify(result.rows);

		    console.log(JSON.parse(newData));

		    // res.send('Ddfd');
            res.render('showBookings',{bookings:JSON.parse(newData)});

	});

});

 app.get('/addTour',function (req,res) {
    	res.sendFile('E:/NodeJs/addTourForm.html');
 });

 app.get('/genSettings',function (req,res) {
    	res.sendFile('E:/NodeJs/genSettingForm.html');
 });


 app.get('/adminPage',function (req,res) {
    	res.render('admin');
 });



 app.post('/updateTour',function(req,res){
  connection.execute("update tour_list set tour_name=:b,duration=:c,city=:d,state=:e,transport_type=:f where tour_id=:g",[req.body.tourname,
    req.body.duration,req.body.city,req.body.state,req.body.transport,req.body.tourid],{extendedMetaData: true,autoCommit: true}, function(err,result){
              if(err){  
              console.error(err.message);
              return;
              } 
              res.redirect('/tour_list');
           
   });
 });

 app.post('/insertTour',function(req,res){
 	connection.execute("INSERT INTO tour_list(tour_id,tour_name,duration,city,state,transport_type) VALUES (:a ,:b ,:c,:d,:e,:f)",[req.body.tourid,req.body.tourname,req.body.duration,req.body.city
 		,req.body.state,req.body.transport],{extendedMetaData: true,autoCommit: true}, function(err,result){
              if(err){  
              console.error(err.message);
              return;
              } 

              else{
              connection.execute("INSERT INTO tour_details VALUES (:a ,:b ,:c,:d,:e)",[req.body.tourid,req.body.resId,req.body.description,req.body.cost,req.body.tour_type
                    ],{extendedMetaData: true,autoCommit: true}, function(err,result){
              if(err){  
              console.error(err.message);
              return;
                }
                 res.sendFile('E:/NodeJs/addTourForm.html');

                }) 
              }
           
   });
 });
  
 app.post('/changeSettings',function(req,res){

    var queryD='delete from administrator where 1=1';
     connection.execute(queryD,[],{autoCommit: true},function(err,result){
          if(err){
              console.log(err);  
              return;
          }
          console.log(result.rowsAffected); 
     }); 
     var query='insert into administrator values (:a,:b,:c,:d)';
     connection.execute(query,[req.body.webname,req.body.mobile,req.body.email,req.body.address],{autoCommit: true},function(err,result){
          if(err){
              console.log(err);  
              return;
          }
          console.log(result.rowsAffected); 
     });

      res.sendFile('E:/NodeJs/genSettingForm.html');
 });
 
 app.get('/addReport',function (req,res) {
    connection.execute("select * from login_table",{},{extendedMetaData: true}, function(err,result){
      if(err){  
        console.error(err.message);
        return;
      } 

      var newData1 = JSON.stringify(result.rows);
      connection.execute("select * from booking_details where trunc(book_date)>trunc(sysdate-7) and trunc(book_date)<=trunc(sysdate)",{},{extendedMetaData: true}, function(err,result){
        if(err){  
          console.error(err.message);
          return;
        } 
        var newData2 = JSON.stringify(result.rows);
        connection.execute("select * from tour_list",{},{extendedMetaData: true}, function(err,result){
          if(err){  
            console.error(err.message);
            return;
          }  
          var newData3 = JSON.stringify(result.rows);
          connection.execute("select * from administrator",{},{extendedMetaData: true}, function(err,result){
            if(err){  
              console.error(err.message);
              return;
            }  
            var newData4 = JSON.stringify(result.rows);
            connection.execute("select * from booking_details",{},{extendedMetaData: true}, function(err,result){
            if(err){  
              console.error(err.message);
              return;
            }  
            var newData5 = JSON.stringify(result.rows);
            console.log(JSON.parse(newData4));
            //console.log(JSON.parse(newData1));
            res.render('addReport',{users:JSON.parse(newData1),book:JSON.parse(newData2),tour:JSON.parse(newData3),admin:JSON.parse(newData4),bookings:JSON.parse(newData5)});
          });
          });
        });

      });
    });
});

app.post('/updateBooking',function(req,res){
      connection.execute("update booking_details set address_line1=:c,address_line2=:d,town=:e where booking_id=:f",[
        req.body.address1,req.body.address2,req.body.town,req.body.bookingid],{extendedMetaData: true,autoCommit: true}, function(err,result){
          if(err){  
            console.error(err.message);
            return;
          } 
          res.redirect('/showBookings');

        });
    });


app.post('/deleteTour',function(req,res){
      connection.execute("delete from tour_details where tour_id=:a",[req.body.delId],{extendedMetaData: true,autoCommit: true}, function(err,result){
        if(err){  
          console.error(err.message);
            res.render('admin2',{tours:JSON.parse(tours_list),err:"CANNOT DELETE THIS TOUR!"});
          return;
        }
        console.log(req.body.delId); 
         connection.execute("delete from tour_list where tour_id=:a",[req.body.delId],{extendedMetaData: true,autoCommit: true}, function(err,result){
        if(err){  
          console.error(err.message);
            res.render('admin2',{tours:JSON.parse(tours_list),err:"CANNOT DELETE THIS TOUR!"});
          return;
        }
            res.redirect('/tour_list');
      });
    });
});


app.get('/logout',function (req,res){

 connection.release();
  res.redirect('..');


});
}


app.listen(8081);