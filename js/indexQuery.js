
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

let photos = "";


jsonToSend = {"action" : "PHOTOS"};
$.ajax({
  url : './data/app.php',
  type : 'GET',
  data : jsonToSend,
  ContentType : "application/json",
  dataType : 'json',
  success : function(data){
    photos = data;
    displayPhotos();

    console.log(data);
  },
  error : function(errorMsg){
    console.log("bye");
    console.log(errorMsg);
  }
});


function displayPhotos(){
  let likedIDs=null;
  let empty = 0;
  $('#photos').empty();
  let searchCat = $("#category option:selected").index();
  if(searchCat == "1"){
    let userName="";
    let jsonToSend = {"action" : "SESSION"};
    $.ajax({
      url : "./data/app.php",
      type : "GET",
      data : jsonToSend,
      ContentType : "application/json",
      dataType : "json",
      success : function(data){
        userName = data.uName;
        //userName = "HELLO";
        jsonToSend = {"action" : "LIKED",
                      "username" : userName};
        $.ajax({
          url : "./data/app.php",
          type : "GET",
          data : jsonToSend,
          ContentType : "application/json",
          dataType : "json",
          success : function(data){
            if(data["status"] == "EMPTY"){
              empty = 1;
              likedIDs = data;
              console.log(data);
            }
            console.log(data);
            likedIDs = data;

            for (let i = 0; i < photos.length; i += 1) {
              let current = photos[i];
              let author = `${current['username']}`;
              let tittle = `${current['tittle']}`;
              let loc = `${current['img']}`;
              let rating = `${current['rating']}`;
              let cat1 = `${current['cat1']}`;
              let cat2 = `${current['cat2']}`;
              let cat3 = `${current['cat3']}`;
              let id = `${current['photoID']}`;
              let correctLoc = loc.replace('..','.')
              //console.log(searchCat);
              if(searchCat == "1"){
                //console.log(likedIDs);
                //console.log(id);
                let idStr = '"'+id + '"';
                //console.log(idStr);
                if(find(id, likedIDs)){
                  console.log(idStr, likedIDs);
                  let newHtml = '<div class="author">' + author + "</div>"
                                  +'<div class="tittle">'+ tittle + "</div>"
                                  +'<div class="tittle"> Rating: '+ rating + "</div>"
                                  + '<img src ="' + correctLoc + '"width=80%><br>'
                                  + '<input type="submit" name="likebtn" class="like" value="LIKE" id="like' + id + '"/><br><br>';
                  $('#photos').append(newHtml);
                }
              }
            };

          },
          error : function(err){
            //alert(err.responseText);
            console.log(err);
            console.log("bye");
          }
        });
        //console.log(data);

      },
      error : function(err){
        //alert(err.responseText);
        console.log(err);
        alert("You need to log in order to see liked photos");
      }
    });
  }
  for (let i = 0; i < photos.length; i += 1) {
    let current = photos[i];
    let author = `${current['username']}`;
    let tittle = `${current['tittle']}`;
    let loc = `${current['img']}`;
    let rating = `${current['rating']}`;
    let cat1 = `${current['cat1']}`;
    let cat2 = `${current['cat2']}`;
    let cat3 = `${current['cat3']}`;
    let id = `${current['photoID']}`;
    let correctLoc = loc.replace('..','.')
    //console.log(searchCat);
    if(searchCat == "1"){

    }
    else if (searchCat == "0" || searchCat == cat1 || searchCat == cat2 || searchCat == cat3){
      let newHtml = '<div class="author">' + author + "</div>"
                      +'<div class="tittle">'+ tittle + "</div>"
                      +'<div class="tittle"> Rating: '+ rating + "</div>"
                      + '<img src ="' + correctLoc + '"width=80%><br>'
                      + '<input type="submit" name="likebtn" class="like" value="LIKE" id="like' + id + '"/><br><br>';
      $('#photos').append(newHtml);
    }
  };
      //console.log(photos);
}

$('select').on('change', function(event){
  displayPhotos();
});

$(document).on('click','.like',function(event){
  console.log("clicked on like");
  let currentElement = $(this);
  let likeID = currentElement.attr('id');
  let id = likeID.replace("like","");
  let userName="";
  let jsonToSend = {"action" : "SESSION"};
  $.ajax({
  	url : "./data/app.php",
  	type : "GET",
    data : jsonToSend,
    ContentType : "application/json",
  	dataType : "json",
  	success : function(data){
      userName = data.uName;
      //userName = "HELLO";
      jsonToSend = {"action" : "LIKE",
                        "username" : userName,
                        "id" : id};
      $.ajax({
      	url : "./data/app.php",
      	type : "POST",
        data : jsonToSend,
        ContentType : "application/json",
      	dataType : "json",
      	success : function(data){
          console.log(data);
      	},
      	error : function(err){
      		//alert(err.responseText);
          console.log(err);
      		;
      	}
      });
      console.log(data);

  	},
  	error : function(err){
  		//alert(err.responseText);
      console.log(err);
      alert("You need to log in order to like photos");
  	}
  });
  console.log(id);
});

function find(value, arr){
  for (let i = 0; i < arr.length; i += 1){
    if(value == arr[i]["photoID"]){
      return 1;
    }
  }
  return 0;
}
