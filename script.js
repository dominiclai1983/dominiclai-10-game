var genRanNum = function(){
  var h1 = Math.floor(Math.random() * 10);
  var h2 = Math.floor(Math.random() * 10);

  console.log(h1);
  console.log(h2);
}

$(document).ready(function(){
  genRanNum();

  //control the Arithmetic button group check or uncheck 
  $('input[type="checkbox"]').on('click', function(){
    $(this).closest('label').toggleClass("active");
    console.log($('label.ari-btn').hasClass('active'));

  //contorl the play button active, if any button Arithmetic button group is checked
    if($('label.ari-btn').hasClass('active')){
      $('#play-btn').prop('disabled', false);
    }else{
      $('#play-btn').prop('disabled', true);
    }
  })

})