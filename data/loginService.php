<?php
	header('Content-type: application/json');
	header('Accept: application/json');
	$servername = "localhost";
	$serverUserName = "root";
	$serverPassword = "root";
	$databaseName = "PhotoRateDB";


	$connection = new mysqli($servername, $serverUserName, $serverPassword, $databaseName);

	if ($connection->connect_error)
	{
		header("HTTP/1.1 500 Bad connection, portal is down");
		die("The server is down, we couldn't retrieve data from the data base");
	}
	else
	{

		$uName = $_GET["username"];
			$uPassword = $_GET["password"];

			$sql = "SELECT fName, lName
					FROM Users
					WHERE username='$uName' AND passwrd='$uPassword'";

			$result = $connection->query($sql);

			if ($result->num_rows > 0)
			{
        session_destroy();

        if($_GET["rememberMe"] == "1"){
  				setcookie("username", $uName, time() + 3600*24*10, "/", "", 0);
				}
        while ($row = $result->fetch_assoc()){
//          session_start();

					//$_SESSION["firstName"] = $row["fName"];
					//$_SESSION["lastName"] = $row["lName"];
				//	$_SESSION["userName"] = $uName;

					$response = array("firstName" => $row["fName"], "lastname" => $row["lName"]);
        }

				echo json_encode($response);
			}
			else
			{
				header("HTTP/1.1 406 User not found");
				die("Wrong credentials provided");
			}
	}

?>
