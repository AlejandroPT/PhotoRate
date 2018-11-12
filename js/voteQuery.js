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
		$('.userFullName').text(`${data.fName} ${data.lName}`);
    console.log(data);
	},
	error : function(err){
		//alert(err.responseText);
    console.log(err);
		$(location).attr('href', './loginRegister.html');
	}
});

$('#menu > li').on('click', function(event){

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

let author1 = "";
let author2 = "";
let tittle1 = "";
let tittle2 = "";
let rating1 = 1400;
let rating2 = 1400;
let phtID1 = 0;
let phtID2 = 0;


function getImages(){
  $('.author1').empty();
  $('.author2').empty();
  $('.tittle1').empty();
  $('.titt2').empty();
  jsonToSend = {"action" : "PHOTOS"};
  $.ajax({
    url : './data/app.php',
    type : 'GET',
    data : jsonToSend,
    ContentType : "application/json",
    dataType : 'json',
    success : function(data){
      var index1 = Math.floor(Math.random() * data.length);
      var index2 = Math.floor(Math.random() * data.length);
      while(index1 == index2){
        index2 = Math.floor(Math.random() * data.length);
      }

      let pht1 = data[index1];
      let pht2 = data[index2];

      author1 = `${pht1['username']}`;
      author2 = `${pht2['username']}`;

      tittle1 = `${pht1['tittle']}`;
      tittle2 = `${pht2['tittle']}`;

      phtID1 = `${pht1['photoID']}`;
      phtID1 = `${pht2['photoID']}`;

      let loc1 = `${pht1['img']}`;
      let loc2 = `${pht2['img']}`;

      let rating1 = `${pht1['rating']}`;
      let rating2 = `${pht2['rating']}`;

      let correctLoc1 = loc1.replace('..','.');
      let correctLoc2 = loc2.replace('..','.');

      $('.author1').append('Author: ' + author1);
      $('.author2').append('Author: ' + author2);
      $('.tittle1').append('Tittle: ' + tittle1);
      $('.tittle2').append('Tittle: ' + tittle2);
      $('.img1').attr('src',correctLoc1);
      $('.img2').attr('src',correctLoc2);

      console.log(data);
    },
    error : function(errorMsg){
      console.log("bye");
      console.log(errorMsg);
    }
  });
}

getImages();

$('.img1').on('click', function(event){
  console.log(author1);
  getImages();

  let Rtng1 = 10^(rating1/400);
  let Rtng2 = 10^(rating2/400);

  let Kcoef = 32;

  let expWin1 = Rtng1/(Rtng1+Rtng2);
  let expWin2 = Rtng2/(Rtng1+Rtng2);

  let newRating1 = rating1 + Kcoef*(1-expWin1);
  let newRating2 = rating1 + Kcoef*(0-expWin2);

  console.log(phtID1);
  console.log(newRating1);
  console.log(phtID2);
  console.log(newRating2);

  jsonToSend = {'action' : "VOTE",
                'ID1' : phtID1,
                'ID2' : phtID2,
                'rating1':newRating1,
                'rating2':newRating2
              };
  $.ajax({
    url : "./data/app.php",
    type : "POST",
    data : jsonToSend,
    ContentType : "application/json",
    dataType : "json",
    success : function(data){
      console.log(data);
      //$(location).attr("href", "./index.html");
      //window.location.href = "../home/index.html";
    },
    error : function(error){
      console.log(error);
      console.log("bye");
    }
  });

});

$('.img2').on('click', function(event){
  console.log(author1);
  getImages();

  let Rtng1 = 10^(rating1/400);
  let Rtng2 = 10^(rating2/400);

  let Kcoef = 32;

  let expWin1 = Rtng1/(Rtng1+Rtng2);
  let expWin2 = Rtng2/(Rtng1+Rtng2);

  let newRating1 = rating1 + Kcoef*(0-expWin1);
  let newRating2 = rating1 + Kcoef*(1-expWin2);

  console.log(phtID1);
  console.log(newRating1);
  console.log(phtID2);
  console.log(newRating2);

  jsonToSend = {'action' : "VOTE",
                'ID1' : phtID1,
                'ID2' : phtID2,
                'rating1':newRating1,
                'rating2':newRating2
              };
  $.ajax({
    url : "./data/app.php",
    type : "POST",
    data : jsonToSend,
    ContentType : "application/json",
    dataType : "json",
    success : function(data){
      console.log(data);
      //$(location).attr("href", "./index.html");
      //window.location.href = "../home/index.html";
    },
    error : function(error){
      console.log(error);
      console.log("bye");
    }
  });

});
