let jsonToSend = {"action" : "SESSION"};
let userName = "";
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
		$(location).attr('href', './loginRegister.html');
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


});
