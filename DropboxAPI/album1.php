<pre>
<?php
// put your generated access token here
$auth_token = 'sl.BSu4uvnjodA0djI6Z5IQKaTP3CQ4DpaxgE8hPVfpyvUktR0iQ30bGDIz_9fe4AIxlTsq2ROfI3yfSsQv5faWJVuM9Vp3SK377Qp21mmMKawg1e_TIfvYgJBxuOfQfCXBQTmLT_CmqcX0';

// import the Dropbox library
include "dropbox.php";

// set it to true to display debugging info
$debug = true;

// display all errors on the browser
error_reporting(E_ALL);
ini_set('display_errors','On');

// create a new Dropbox folder called images
createFolder("images");

// upload a local file into the Dropbox folder images
// 
// if(isset($_POST["submit"])) {
//    upload("leonidas.jpg","/images");
// }

// print the files in the Dropbox folder images
// $result = listFolder("/images");
// foreach ($result['entries'] as $x) {
//    // echo $x['name'], "\n";
// }

// download a file from the Dropbox folder images into the local directory tmp
// download("/images/leonidas.jpg","tmp/tmp.jpg");

// delete a Dropbox file
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
   <title>Photo Album</title>
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
   <form action = "" method = "POST" enctype= "multipart/form-data">
      Select image to upload:
      <input  type = "file" name = "file" id = "file">
      <input  type = "submit" name = "submit">
</form>
</br>
<?php
   if(isset($_POST["submit"])){
      $file = $_FILES["file"];
      $fileName = $_FILES['file']['name'];
      $fileError = $_FILES['file']['error'];
      $fileTempname = $_FILES['file']['tmp_name'];
      // print_r($file);
      // $destFolder = 'album.php?userfile='.$fileName;
      // print($destFolder);

      if($fileError === 0 ){
         // print_r($fileName);
         // move_uploaded_file($fileTempname,$destFolder);
         upload("leonidas.jpg","/images");
      }
      else{
         echo "Error Uplodaing file";
      }

      
   }
?>
<h2>Output</h2>

   <?php
      $result = listFolder("/images");
      // print_r($result['entries']);
      $no = 1;
      foreach ($result['entries'] as $x) {
         
         ?>	
			<a href="album.php?display= <?php echo $x['name']; ?>"> <?php echo $x['name'] ?> </span>
         <a href="album.php?delete= <?php echo $x['name']; ?>"> Delete </span><br>
			
         
         
         <?php
         // echo $x['path_display']."<br>";
         }
      echo "</table>";
      ?>   

</body>
</html>

