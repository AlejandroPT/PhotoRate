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
      $action = $_POST['action'];
      putRequests($action);
      //parse_str(file_get_contents('php://input'), $putParams);
      //cookie();
      //$action = $putParams['action'];
      //putRequests($action, $putParams);
      break;
  }

function getRequests($action) {
  switch ($action) {
    case 'PHOTOS':
      getPhotos();
      break;
    case 'LOGIN':
      requestLogin();
      break;
    case 'LIKED':
      getLiked();
      break;
    case 'SESSION':
      retrieveSession();
      break;
    case 'COOKIE':
      cookie();
      break;
  }
}

function postRequests($action) {
  switch ($action) {
    case 'REGISTER':
      requestRegistration();
      break;
    case 'UPLOAD':
      postPhoto();
      break;
    case 'VOTE':
      vote();
      break;
    case 'LIKE':
      like();
      break;
  }
}

function putRequests($action) {
  switch ($action) {
    case 'LIKE':
      like();
      break;
  }
}

function retrieveSession(){
  session_start();

  if (!(isset($_SESSION["lastName"]))) {
      //session_destroy();
      header("HTTP/1.1 406 missing uname");
      die("Your session has expired.");
  }

	if (isset($_SESSION["firstName"])&&
		isset($_SESSION["lastName"]) &&
		isset($_SESSION["userName"])){
		$response = array("fName" => $_SESSION["firstName"], "lName" => $_SESSION["lastName"], "uName" => $_SESSION["userName"]);
		echo json_encode($response);
	}
	else{
		//session_destroy();
		header("HTTP/1.1 406 Session not set yet");
		die("Your session has expired.");
	}
}

function cookie(){
  if ( isset($_COOKIE["username"]) ){
		$response = array("username" => $_COOKIE["username"]);
		echo json_encode($response);
	}
	else{
		header("HTTP/1.1 406 Cookie not set yet");
		die("No cookies saved on this site");
	}
}

function requestLogin(){
  $uName = $_GET["username"];
  $uPassword = $_GET["password"];

  $response = attemptLogin($uName, $uPassword);


  if ($response["status"] == "SUCCESS"){
    //session_destroy();

    session_start();

    $_SESSION["firstName"] = $response['response']["firstName"];
    $_SESSION["lastName"] = $response['response']["lastName"];
    $_SESSION["userName"] = $uName;

    //$response = array("firstName" => $response['response']);

    if($_GET["rememberMe"] == "1"){
      setcookie("username", $uName, time() + 3600*24*10, "/", "", 0);
    }
    echo json_encode($response);
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

function getPhotos(){
  $response = retrievePhotos();
  if ($response['status'] == 'SUCCESS'){
    echo json_encode($response["images"]);
  }
  else{
    errorHandler($response['status'], $response['code']);
  }
}

function errorHandler($status, $code){
		switch ($code)
		{
			case 406:
        header("HTTP/1.1 $code User $status");
				die("Wrong credentials provided");
				break;
			case 500:
        header("HTTP/1.1 $code $status. Bad connection, portal is down");
				die("The server is down, we couldn't retrieve data from the data base");
				break;
      case 124:
        header("HTTP/1.1 $code $status ");
				die("query error2 $status");
				break;
      case 125:
        header("HTTP/1.1 $code $status ");
				die("something error");
				break;
      default:
        header("HTTP/1.1 Another error $status $code");
				die("Sorry, unknown error $code.");
				break;
		}
	}

function vote(){
  $id1 = $_POST['ID1'];
  $id2 = $_POST['ID2'];
  $rating1 = $_POST['rating1'];
  $rating2 = $_POST['rating2'];


  $response = updateRatings($id1, $id2, $rating1, $rating2);

  if ($response['status'] == 'SUCCESS'){
    echo json_encode($response['status']);
  }
  else{
    errorHandler($response['status'], $response['code']);
  }
}

function like(){
  $username = $_POST['username'];
  $photoID = $_POST['id'];

  $response = markLiked($username, $photoID);

  if ($response['status'] == 'SUCCESS'){
    echo json_encode($response['status']);
  }
  else{
    errorHandler($response['status'], $response['code']);
  }
}

function getLiked(){
  $username = $_GET['username'];

  $response = retrieveLiked($username);

  if ($response['status'] == 'SUCCESS'){
    echo json_encode($response['images']);
  }
  else if($response['status'] == 'EMPTY'){
    echo json_encode($response['status']);
  }
  else{
    errorHandler($response['status'], $response['code']);
  }
}

?>
