
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
    for (let i = 0; i < data.length; i += 1) {
      let current = data[i];
      let author = `${current['username']}`;
      let tittle = `${current['tittle']}`;
      let loc = `${current['img']}`;
      let correctLoc = loc.replace('..','.')
      console.log(loc);
      console.log(correctLoc);
      let newHtml = '<div class="author">' + author + "</div>"
                      +'<div class="tittle">'+ tittle + "</div>"
                      + '<img src ="' + correctLoc + '">';
      $('#photos').append(newHtml);
    };
    console.log(data);
  },
  error : function(errorMsg){
    console.log("bye");
    console.log(errorMsg);
  }
});
