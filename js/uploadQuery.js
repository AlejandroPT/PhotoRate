let jsonToSend = {"action" : "SESSION"};
let userName = "perro";
$.ajax({
	url : "./data/app.php",
	type : "GET",
  data : jsonToSend,
  ContentType : "application/json",
	dataType : "json",
	success : function(data){
    userName = data.uName;
    //userName = "HELLO";
		$('.userFullName').text(`${data.fName} ${data.lName}`);
    console.log(data);
	},
	error : function(err){
		//alert(err.responseText);
    console.log(err);
		//$(location).attr('href', './index.html');
	}
});

$('#menu > li').on('click', function(event){

	//$('.selectedNavElement').removeClass('selectedNavElement');

	let currentElement = $(this);
	let sectionName = currentElement.attr('class');

  if(sectionName == "home")
    $(location).attr("href", "./index.html");

  if(sectionName == "vote")
    $(location).attr("href", "./vote.html");

  if(sectionName == "upload")
    $(location).attr("href", "./data/upload.html");

  if(sectionName == "loginRegister")
    $(location).attr("href", "./loginRegister.html");

  if(sectionName == "about")
    $(location).attr("href", "./about.html");

});

$('#btnUpload').on('click', function(event){
  // let jsonToSend = {
  //   "action" : "UPLOAD",
  //   "username" : userName,
  //   "cat1" : "",
  //   "cat2" : "",
  //   "cat3" : "",
  //   "tittle" : "test1"
  // }
  // $.ajax({
  // 	url : "./data/app.php",
  // 	type : "POST",
  //   data : jsonToSend,
  //   ContentType : "application/json",
  // 	dataType : "json",
  // 	success : function(data){
  //     //userName = data.uName;
  // 		//$('.userFullName').text(`${data.fName} ${data.lName}`);
  //     console.log(data);
  // 	},
  // 	error : function(err){
  //     //userName = $_SESSION['uName'];
  // 		//alert(err.responseText);
  //     console.log(jsonToSend);
  //     console.log(userName);
  //     console.log(err);
  // 		//$(location).attr('href', './index.html');
  // 	}
  // });

  // let jsonToSend = {"action" : "COOKIE"};
  // $.ajax({
  //   url : './data/app.php',
  //   type : 'PUT',
  //   data : jsonToSend,
  //   ContentType : "application/json",
  //   dataType : 'json',
  //   success : function(data){
  //     $("#usernameL").val(data.username);
  //     console.log(data.username);
  //   },
  //   error : function(errorMsg){
  //     console.log("bye");
  //     console.log(errorMsg);
  //   }
  // });

});
