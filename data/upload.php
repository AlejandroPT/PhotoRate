<?php

$target_dir = "../images/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submitImage"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {

        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    }
    else {
        echo "Sorry, there was an error uploading your file.";
    }
}

  $servername = "localhost";
  $Susername = "root";
  $password= "root";
  $dbname = "PhotoRateDB";
  session_start();
  $username = $_SESSION["userName"];
  echo "....." . $_SESSION["userName"] . "......";
  $tittle = $_POST["tittleName"];
  $cat1 = $_POST["category1"];
  $cat2 = $_POST["category2"];
  $cat3 = $_POST["category3"];

  $conn = new mysqli($servername, $Susername, $password, $dbname);

  if ($conn->connect_error){
    return null;
  }
  else{
    if($conn != null){

          $sql = "INSERT INTO Images (username, tittle, cat1, cat2, cat3, img)
                  VALUES ('$username', '$tittle', '$cat1', '$cat2', '$cat3', '$target_file')";

          if (mysqli_query($conn, $sql)){
            $conn-> close();
            $response = array("status" => "SUCCESS");
            echo "success";
            //return $response;
          }
          else{
            $response = array("status" => mysqli_error($conn), "code" => 124);
            echo mysqli_error($conn);
            $conn-> close();
            //return $response;
          }
      }
    else{
      //return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);
    }
  }

?>
