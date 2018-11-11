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

    let pht1 = data[index1];
    let pht2 = data[index2];

    let author1 = `${pht1['username']}`;
    let author2 = `${pht2['username']}`;

    let tittle1 = `${pht1['tittle']}`;
    let tittle2 = `${pht2['tittle']}`;

    let loc1 = `${pht1['img']}`;
    let loc2 = `${pht2['img']}`;

    let correctLoc1 = loc1.replace('..','.');
    let correctLoc2 = loc2.replace('..','.');
    let newHtml =
      '<span class="author1">' + author1 + "</span>" +'<span class="author2">' + author2 + "</span>"
      +'<br><span class="tittle1">'+ tittle1 + "</span>" +'<span class="tittle2">'+ tittle2 + "</span>"
      + '<br><img src ="' + correctLoc1 + '" width=40% class="img1">' + '<img src ="' + correctLoc2 + '"width=40% class="img2">';
    $('#photos').append(newHtml);
    console.log(data);
  },
  error : function(errorMsg){
    console.log("bye");
    console.log(errorMsg);
  }
});
