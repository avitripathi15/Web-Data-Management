<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
</head>
        <style>
            .container{
                width: 100%;
                overflow: auto;
            }
            .output2{
                width: 25% ;
                height:auto;
            }
            .links{
                width: 75%;
            }
    
        </style>
        <body>
            <form action="album.php" method="POST" enctype="multipart/form-data">
                    <p>Upload your Images Here!!</p>
                    <input type="file" name="file" id="imageFile">
                    <br><br>
                    <button type="button" name="submit" id="insert" value="Insert" class="B1" onclick="uploadFile()">Upload Image</button>
                </form>
                <div class= container>
                    <div  id="links"></div>
                    <div id="output2"></div>
                </div>
                <?php
               $directory = "./images/UploadedImages";
               $lisImage = scandir($directory);
               $filelisting = array_diff($lisImage, array('.','..'));
                ?>
               <script type="text/javascript">
                var myVar = "";
                var myUserImgList = <?php echo json_encode($filelisting); ?>;
                var viewImgList = Object.values(myUserImgList);
                for(var i=0; i<viewImgList.length;i++){
                    myVar += "<a href = '#' onclick='display(this)'>" +viewImgList[i]+"</a><br><input type='button' onclick='delImg(this)' value='DELETE'></input><br>";
                    document.getElementById("links").innerHTML = myVar;
                }
                console.log(myUserImgList);
                function uploadFile() {
                    var formdata = new FormData();
                    formdata.append("file", document.getElementById("imageFile").files[0]);
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("POST", "get.php", true);
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4) {
                            var obj = this.responseText;
                            //console.log(obj);
                            var data=document.getElementById("links");
                            //var data;
                            data.innerHTML+= "<a href='#' onclick= 'display(this)'>" +document.getElementById("imageFile").files[0]["name"]+"</a><br><Input type='button' onclick='delImg(this)' value='DELETE'></button><br>";
                            //document.getElementById("links").innerHTML= data;
                           }
                    };
                    xhttp.send(formdata);
                }
                function display(Img){
                    var Img1=document.getElementById("output2");
                    Img1.innerHTML = "<img src= './images/UploadedImages/"+Img.innerHTML+"''>";
                }
                function delImg(dat){
                    var deleteImg1=dat.previousElementSibling.previousElementSibling.innerHTML;
                    var xmlhttp=new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function(){
                        if(this.readyState == 4){
                            dat.previousElementSibling.previousElementSibling.remove();
                            dat.nextSibling.previousSibling.remove();
                            dat.nextSibling.remove();
                            
                        }
                    };
                    xmlhttp.open("GET", "delete.php?deleteImg1="+deleteImg1, true);
                    xmlhttp.send();
                    document.getElementById("output2").innerHTML="";
                    }
                    
                
            </script>
        </body>
    </html>