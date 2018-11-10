jsonToSend = {"action" : "COOKIE"};
$.ajax({
  url : './data/app.php',
  type : 'GET',
  data : jsonToSend,
  ContentType : "application/json",
  dataType : 'json',
  success : function(data){
    $("#usernameL").val(data.username);
    console.log(data.username);
  },
  error : function(errorMsg){
    console.log("bye");
    console.log(errorMsg);
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
    $(location).attr("href", "./upload.html");

  if(sectionName == "loginRegister")
    $(location).attr("href", "./loginRegister.html");

  if(sectionName == "about")
    $(location).attr("href", "./about.html");


});

$('#btnSubmit').on('click',function(event){
  event.preventDefault();

	let loginSuccess=true;
	let ErrorLogin = $('#ErrorLogin');
  let ErrorLogPassword = $('#ErrorLogPassword');
  let ErrorLogUsername = $('#ErrorLogUsername');
	let LoginUsername = $('#usernameL');
	let LoginPassword = $('#passwordL');

  ErrorLogin.text("");
  ErrorLogUsername.text("");
  ErrorLogPassword.text("");

  if (LoginUsername.val() == ""){
    loginSuccess = false;
    ErrorLogUsername.text("Please write your username")
	}

  if (LoginPassword.val() == ""){
    loginSuccess = false;
    ErrorLogPassword.text("Please write your password")
	}

	if (!loginSuccess){
		alert ("Please complete all fields");
		return false;
	}
  else{
    let jsonToSend ={
              "action" : "LOGIN",
              "username" : $("#usernameL").val(),
              "password" : $("#passwordL").val(),
              "rememberMe" : "0"
    };
    if ($('#chbRememberMe').is(':checked')) {
      jsonToSend["rememberMe"] = "1";
    }
    console.log(jsonToSend);
  	$.ajax({
  		url : "./data/app.php",
  		type : "GET",
  		data : jsonToSend,
  		ContentType : "application/json",
  		dataType : "json",
  		success : function(data){
        console.log(data);
  			//console.log(data["username"]);
  			//$(location).attr("href", "./index.html");
  		},
  		error : function(error){
    		ErrorLogin.text("Invalid user and/or password \n");
    		loginSuccess=false;
        //console.log(data);
  			console.log(error);
  		}
  	});
  }

});

let RegFirstName = $("#firstName");
let RegLastName = $("#lastName");
let RegUsername = $("#usernameR");
let RegEmail = $("#email");
let RegPassword = $("#passwordR");
let RegPasswordConf = $("#passwordRconf");

let ErrorRegFirstName = $("#ErrorRegFirstName");
let ErrorRegLastName = $("#ErrorRegLastName");
let ErrorRegUsername = $("#ErrorRegUsername");
let ErrorRegEmail = $("#ErrorRegEmail");
let ErrorRegPassword = $("#ErrorRegPassword");
let ErrorRegPasswordConf = $("#ErrorRegPasswordConf");
let RegCountry = $("#country");
let ErrorRegCountry = $("#ErrorRegCountry");
let RegGender = $('[name = "gender"]');
let ErrorRegGender = $("#ErrorRegGender");

$('#btnRegister').on("click", function(event){
	event.preventDefault();

	let RegSuccess = true;

  let SelectedCountry = $("#country option:selected").index();

	let selectedGender = false;
  let gender = 'Masculine';


  //clear errors
  ErrorRegFirstName.text("");
  ErrorRegLastName.text("");
  ErrorRegUsername.text("");
	ErrorRegEmail.text("");
  ErrorRegPassword.text("");
  ErrorRegPasswordConf.text("");
  ErrorRegGender.text("");
  ErrorRegCountry.text("");

	if (RegFirstName.val() === ""){
		ErrorRegFirstName.text( "Please write your first name");
		RegSuccess = false;
	}

	if (RegLastName.val() === ""){
		ErrorRegLastName.text("Please write your last name");
		RegSuccess = false;
	}

	if (RegUsername.val() === ""){
		ErrorRegUsername.text( "Please write your username");
		RegSuccess = false;
  }

	if (RegEmail.val() === ""){
		ErrorRegEmail.text( "Please write your Email");
		RegSuccess = false;
	}

	if (RegPassword.val() === ""){
		ErrorRegPassword.text("Please write your password");
		RegSuccess = false;
	}

	if (RegPasswordConf.val() === ""){
		ErrorRegPasswordConf.text("Please confirm your password");
		RegSuccess = false;
	}
	else if (RegPasswordConf.val() != RegPassword.val()){
		ErrorRegPasswordConf.text("The passwords don't match");
		RegSuccess = false;
	}

  if (SelectedCountry == "0"){
    ErrorRegCountry.text("Please select a country");
    RegSuccess=false;
  }

	for (let i = 0; i < RegGender.length;i++){
		if (RegGender[i].checked){
			selectedGender = true;
      if(i > 0){
        gender = 'Feminine';
      }
			break;
		}
	}

	if (!selectedGender){
		ErrorRegGender.text( "Please select a gender");
		RegSuccess=false;
	}
	if (!RegSuccess){
		alert ("Complete all fields");
		return false;
	}
	else{
    let jsonToSend ={
						"username" : RegUsername.val(),
						"userPassword" : RegPassword.val(),
						"userFirstName" : RegFirstName.val(),
						"userLastName" : RegLastName.val(),
            "userEmail" : RegEmail.val(),
						"userCountry" : RegCountry.val(),
						"userGender" : gender,
            "action" : "REGISTER"
					};

  	$.ajax({
  		url : "./data/app.php",
  		type : "POST",
  		data : jsonToSend,
  		ContentType : "application/json",
  		dataType : "json",
  		success : function(data){
  			console.log(data);
  			//$(location).attr("href", "./index.html");
        //window.location.href = "../home/index.html";
  		},
  		error : function(error){
  			console.log(error);
        console.log("bye");
  		}
  	});

	}

});

btnClear.addEventListener("click", function(event){
	event.preventDefault();

	RegFirstName.val("");
	RegLastName.val("");
	RegUsername.val("");
	RegEmail.val("");
	RegPassword.val("");
	RegPasswordConf.val("");
	ErrorRegFirstName.text("");
	ErrorRegLastName.text("");
	ErrorRegUsername.text("");
	ErrorRegEmail.text("");
	ErrorRegPassword.text("");
	ErrorRegPasswordConf.text("");
	ErrorRegCountry.text("");
	ErrorRegGender.text("");

	RegCountry.val("0");
	RegGender.prop('checked',false);
})
