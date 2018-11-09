<?php

	header('Content-type: application/json');
	header('Accept: application/json');

	require_once __DIR__ . '/data.php';

	$requestMethod = $_SERVER['REQUEST_METHOD'];

  switch ($requestMethod){
    case 'GET':
      $action = $_GET['action'];
      getRequests($action);
      break;
    case 'POST':
      $action = $_POST['action'];
      postRequests($action);
      break;
    case 'PUT':
      parse_str(file_get_contents('php://input'), $putParams);
      $action = $putParams['action'];
      //putRequests($action, $putParams);
      break;
  }

function getRequests($action) {
  switch ($action) {
    case 'PHOTOS':
      //requestComments1();
      break;
    case 'LOGIN':
      requestLogin();
      break;
    case 'PROFILE':
      //requestProfile();
      break;
    case 'SESSION':
      //retrieveSession();
      break;
  }
}

function postRequests($action) {
  switch ($action) {
    case 'REGISTER':
      requestRegistration();
      break;
    case 'COMMENT':
      //postComment();
      break;
  }
}

function requestLogin(){
  $uName = $_GET["username"];
  $uPassword = $_GET["password"];

  $response = attemptLogin($uName, $uPassword);


  if ($response["status"] == "SUCCESS"){
  //session_destroy();

  //session_start();

  //$_SESSION["firstName"] = $response['response']["fName"];
  //$_SESSION["lastName"] = $response['response']["lName"];
  //$_SESSION["userName"] = $uName;

  $response = array("firstName" => $response['response']["fName"], "lastname" => $response['response']["lName"]);

  if($_GET["rememberMe"] == "1"){
  //  setcookie("username", $uName, time() + 3600*24*10, "/", "", 0);
  }
    echo json_encode($response["response"]);
  }
  else{
    errorHandler($response["status"], $response["code"]);
  }
}

function requestRegistration(){
  $userName = $_POST['username'];
  $userPassword = $_POST['userPassword'];
  $userFirstName = $_POST['userFirstName'];
  $userLastName = $_POST['userLastName'];
  $userEmail = $_POST['userEmail'];
  $userCountry = $_POST['userCountry'];
  $userGender= $_POST['userGender'];

  $response = registerUser($userName, $userPassword, $userFirstName, $userLastName,
                            $userEmail, $userCountry, $userGender);

  if ($response['status'] == 'SUCCESS'){
    echo json_encode($response['status']);
  }
  else{
    errorHandler($response['status'], $response['code']);
  }
}
?>
