module.exports =function(app,data){

	app.get('/tour_list',function(req,res){
		var newData = JSON.stringify(data);
		//  console.log('\n'+JSON.parse(newData));
		  console.log('Hello');
          res.render('admin2',{tours:JSON.parse(newData)});

	});

    app.get('/adminPage',function (req,res) {
    	res.render('admin');
    });
    
    
}