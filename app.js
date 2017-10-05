const fs = require("fs");

let dir = "posts";
let dirBuild = "build";
let postName ="";
let watcher = fs.watch(dir,function(){
     start();
});


function start() {
	
	fs.readdir(dir, function(err, files) {
	  if (err){
	  	console.log(err);
	  }


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
					 </html>`;

			 	fs.writeFile(`${dirBuild}/${file.slice(0, -4)}.html`, newHtml.trim(), function(err) {
			      if(err){
			      	console.log(err);
			      }
			      console.log(file.slice(0, -4) + ".html created");
			 	});//end fs.writeFile
		    });//end fs.readFile

		    postName += "<li>" + "<a href='"+ file.slice(0, -4) + ".html'>" + file.slice(0, -4) + "</a></li>";

	}//end for loop




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
	 	});//end fs.writeFile
	postName = "";
	});//end fs.readdir


};//end function start

start();

watcher.on('error', function (err) {
    console.error(err);
    process.exit(1);
});//end watcher



