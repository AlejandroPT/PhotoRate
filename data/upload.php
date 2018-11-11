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
      // if($_SERVER['REQUEST_METHOD'] == "POST"){
      //   echo "........This is a post.......";
      //   echo array_values($_POST);
      //   echo "........end of post.......";
      //   $test = array("hello" => "hola", "bye" => "adios");
      //   echo array_values($test);
      //   echo "end of test.........";
      // }
      //
      // $userName = $_POST["userName"];
      // $tittle = $_POST["tittle"];
      // $cat1 = $_POST["cat1"];
      // $cat2 = $_POST["cat2"];
      // $cat3 = $_POST["cat3"];
      //
      //
      // storePhoto($userName, $tittle, $target_file,
      //           $cat1,$cat2,$cat3);
      // //
      // // if ($response['status'] == 'SUCCESS'){
      // //   echo json_encode($response['status']);
      // // }
      // // else{
      // //   errorHandler($response['status'], $response['code']);
      // // }
      // print "          hola            \n";
      // echo $userName;
      // echo $tittle;
      // echo $target_file;
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
  $cat1 = "1";
  $cat2 = "2";
  $cat3 = "3";

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


// function storePhoto($username, $tittle, $cat1, $cat2, $cat3){
//   $servername = "localhost";
//   $Susername = "root";
//   $password= "root";
//   $dbname = "PhotoRateDB";
//
//   echo $username;
//   echo $tittle;
//   echo $loc;
//   echo ".........";
//
//   $conn = new mysqli($servername, $Susername, $password, $dbname);
//
//   if ($conn->connect_error){
//     return null;
//   }
//   else{
//     if($conn != null){
//
//           $sql = "INSERT INTO Images (username, tittle, cat1, cat2, cat3, img)
//                   VALUES ('$username', '$tittle', '$cat1', '$cat2', '$cat3', '$target_file')";
//
//           if (mysqli_query($conn, $sql)){
//             $conn-> close();
//             $response = array("status" => "SUCCESS");
//             return $response;
//           }
//           else{
//             $response = array("status" => mysqli_error($conn), "code" => 124);
//             $conn-> close();
//             return $response;
//           }
//       }
//     else{
//       return array("status" => "INTERNAL_SERVER_ERROR", "code"=>500);
//     }
//   }
// }

?>
