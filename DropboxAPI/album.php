<pre>
<?php
// put your generated access token here
$auth_token = 'sl.BSvQO_5uQOxgqMJcGjIRo3_FO4Ykbn3k8Q8OjPSUdJLrWe9tTvpxaGun8u4zIp87yQ1RSrWoTTu2tm41a6P5WgOMbaolWqND7pFPgWY5byY3XJWlHGkLBKQl94FSZ0KL3zWo0D-6lOW1';

// import the Dropbox library
include "dropbox.php";

// set it to true to display debugging info
$debug = true;

// display all errors on the browser
error_reporting(E_ALL);
ini_set('display_errors','On');

// // create a new Dropbox folder called images
// createFolder("images");

// // upload a local file into the Dropbox folder images
// upload("leonidas.jpg","/images");

// // print the files in the Dropbox folder images
// // $result = listFolder("/images");
// foreach ($result['entries'] as $x) {
//    echo $x['name'], "\n";
// }

// // download a file from the Dropbox folder images into the local directory tmp
// download("/images/leonidas.jpg","tmp/tmp.jpg");

// // delete a Dropbox file
// delete("/images/leonidas.jpg");

?>
</pre>
<img src="tmp/tmp.jpg"/>
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
</head>
<body>
<style>
        * {
            box-sizing: border-box;
            
        }
        .row {
        display: flex;
        box-sizing: border-box
        border:1px solid black;
        }
        .column {
            flex: 50%;
            padding: 10px;
            border:2px solid black;
        }
</style>
<div>
<form action = "" method = "POST" enctype= "multipart/form-data">
      Select image to upload:
      <input  type = "file" name = "file" id = "file">
      <input  type = "submit" name = "submit">
</form>
</div>
<?php
   if(isset($_POST["submit"])){
      $file = $_FILES["file"];
      $fileName = $_FILES['file']['name'];
      $fileError = $_FILES['file']['error'];
      $fileTempname = $_FILES['file']['tmp_name'];
      if($fileError === 0 ){
         // print_r($fileName);
         // move_uploaded_file($fileTempname,$destFolder);
         upload($fileName,"/images");
      }
      else{
         echo "Error Uplodaing file";
      }
   }

  

?>
<h2>Output</h2>
<div class="row">
   <div class="column">
        <h2>File Names</h2> 
      
      <?php

         $result = listFolder("/images");
         // print_r($result['entries']);
         foreach ($result['entries'] as $x) {
            ?>	
            <a href="album.php?display=<?php echo $x['name']; ?>"> <?php echo $x['name'] ?> </span></a>
            <a href="album.php?delete=<?php echo $x['name']; ?>"> Delete </span></a><br>
            <?php
          // echo $x['path_display']."<br>";
         }
         // echo $_SERVER['QUERY_STRING'];

         // if(isset($_GET["display"])){
            
         //    echo  "YES";
         // }
         // echo $_GET["display"];
        
         
      ?>   
      <?php
      
         if(isset($_GET["delete"])){
            echo $_GET["delete"];
            delete("/images/".$_GET["delete"]);

            header("Location:album.php");
            // upload($fileName,"/images");
      
         }
      ?>
   </div>
   <div class="column">
        <h2>Favourites</h2>
        <?php
         if(isset($_GET["display"])){
            echo $_GET["display"];
            download("/images/".$_GET["display"],"tmp/".$_GET["display"]);


            header("Location:album.php");
            // upload($fileName,"/images");
      
         }
         
         $dir = "tmp/";
         if($opendir = opendir($dir)){
            while(($file = readdir($opendir))!= FALSE){
               ?><img src = <?php echo $dir.'/'.$file?> height = '250' width = '250'><br><?php
            }
         }

        ?>

   </div>
</div>
   
</body>
</html>
