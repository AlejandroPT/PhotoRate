<?php
function connect(){
	$servername = "localhost";
	$username = "root";
	$password= "root";
	$dbname = "PhotoRateDB";

	$connection = new mysqli($servername, $username, $password, $dbname);

	if ($connection->connect_error){
		return null;
	}
	else{
		return $connection;
	}
}

function attemptLogin($uName, $uPassword){
  $connection = connect();

  if($connection != null){

    $sql = "SELECT fName, lName
        FROM Users
        WHERE username='$uName' AND passwrd='$uPassword'";

    $result = $connection->query($sql);

    if ($result->num_rows > 0){

      while ($row = $result->fetch_assoc()){
        $response = array("firstName" => $row["fName"], "lastName" => $row["lName"]);
      }
      $connection -> close();
      return array('status' => "SUCCESS", 'response' => $response);
    }
    else{
      $connection -> close();
      return array("status" => "NOT_FOUND", "code"=>406);
    }
  }
  else{
    return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);
  }
}

function registerUser($userName, $userPassword, $userFirstName, $userLastName,
                          $userEmail, $userCountry, $userGender){

  $conn = connect();

  if($conn != null){
    $sql = "SELECT username
            FROM Users
            WHERE username = '$userName'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0){
      $conn-> close();
      return array("status" => "USER_ALREADY_EXISTS", "code"=>123);
    }
    else{

        $sql = "INSERT INTO Users (fName, lName, username, passwrd, country, gender, email)
                VALUES ('$userFirstName', '$userLastName', '$userName', '$userPassword', '$userCountry', '$userGender','$userEmail')";

        if (mysqli_query($conn, $sql)){
          $conn-> close();
          $info = array("userName" => $userName, "fName" => $userFirstName, "lName" => $userLastName);
          $response = array("status" => "SUCCESS", 'response' => $info);
          return $response;
        }
        else
        {
          $response = array("status" => mysqli_error($conn), "code" => 124);
          $conn-> close();
          return $response;
        }
    }
  }
  else{
    return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);
  }
}

function retrievePhotos(){
  $conn = connect();

  if($conn != null){
    $sql =	"SELECT *
             FROM Images";

    $images = $conn->query($sql);

    if($images->num_rows > 0){
      $imgs = array();
      while ($row = $images->fetch_assoc()){
        array_push($imgs, $row);
      }
      $conn-> close();
      $response = array("status" => "SUCCESS", "images"=>$imgs, "code" => 123);
      return $response;
    }
    else{
      $response = array("status" => mysqli_error($conn), "code" => 124);
      $conn-> close();
      return $response;
    }
  }
  else{
    return array("status" => "INTERNAL_SERVER_ERROR", "code"=>510);
  }
}

function updateRatings($id1, $id2, $rating1, $rating2){
  $conn = connect();

  if($conn != null){
    $sql = "UPDATE Images
            SET rating = '$rating1'
            WHERE photoID = '$id1'";

    if (mysqli_query($conn, $sql)){
      $sql = "UPDATE Images
              SET rating = '$rating2'
              WHERE photoID = '$id2'";
      if (mysqli_query($conn, $sql)){
        $response = array("status" => "SUCCESS");
        return $response;
      }
      else {
        $response = array("status" => mysqli_error($conn), "code" => 124);
        $conn-> close();
        return $response;
      }
    }
    else {
      $response = array("status" => mysqli_error($conn), "code" => 124);
      $conn-> close();
      return $response;
    }
  }
  else{
    return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);
  }
}

function markLiked($username, $id){

  $conn = connect();

  if($conn != null){
    $sql = "INSERT INTO Likes (username, photoID)
            VALUES ('$username', '$id')";

    if (mysqli_query($conn, $sql)){
      $conn-> close();
      $response = array("status" => "SUCCESS");
      return $response;
    }
    else
    {
      $response = array("status" => mysqli_error($conn), "code" => 124);
      $conn-> close();
      return $response;
    }

  }
  else{
    return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);
  }
}


?>
