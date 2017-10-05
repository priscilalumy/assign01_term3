const fs = require("fs");



let dir = "posts";
let dirBuild = "build";
let postName ="";
let watcher = fs.watch(dir,function(){
    //console.log(type + ' ' + filename);
     start();
});




function start() {
	
fs.readdir(dir, function(err, files) {

  if (err){
  	console.log(err);
  }

console.log(files)

	for(let file of files){


		fs.readFile(`${dir}/${file}`, function(err, data){
			if(err){
				console.log(err);
			}
			let newHtml = `
				 <html>
				 	<body>
				 		<div>${data}</div>
				 	</body>
				 </html>`

		 	fs.writeFile(`${dirBuild}/${file.slice(0, -4)}.html`, newHtml.trim(), function(err) {
		      if(err){
		      	console.log(err);
		      }
		      console.log(file.slice(0, -4) + ".html created");
		 	});
	    });

		//console.log('name: '+ file.slice(0, -4));

	    postName += "<li>" + "<a href='"+ file.slice(0, -4) + ".html'>" + file.slice(0, -4) + "</a></li>";


	}




	let newindexHtml = `
			<html>
				<body>
					<ul>${postName}</ul>
				</body>
			</html>
		`
		fs.writeFile(`${dirBuild}/index.html`, newindexHtml .trim(), function(err) {
	      if(err){
	      	console.log(err);
	      }
	      console.log("index.html created");
	 	});
	postName = "";
});

//track changes later


};

start();

watcher.on('error', function (err) {
    console.error(err);
    process.exit(1);
});



