var genRanNum = function(){
  var h1 = Math.floor(Math.random() * 10) + 1;
  var h2 = Math.floor(Math.random() * 10) + 1;

  var l1 = $('button[type="button"].lv1').hasClass('active');
  var l2 = $('button[type="button"].lv2').hasClass('active');
  var l3 = $('button[type="button"].lv3').hasClass('active');
  var l4 = $('button[type="button"].lv4').hasClass('active');

  if(l1){
    h1 = h1 * 1;
    h2 = h2 * 1;
  }else if(l2){
    h1 = h1 * 2;
    h2 = h2 * 2;    
  }else if(l3){
    h1 = h1 * 3;
    h2 = h2 * 3;  
  }else if(l4){
    h1 = Math.floor(h1 * 4.5);
    h2 = Math.floor(h2 * 4.5);  
  }

  return [h1, h2];
}

$(document).ready(function(){
  genRanNum();

  //control the Arithmetic button group check or uncheck 
  $('input[type="checkbox"]').on('click', function(){
    $(this).closest('label').toggleClass('active');
    console.log($('label.ari-btn').hasClass('active'));

  //contorl the play button active, if any button Arithmetic button group is checked
    if($('label.ari-btn').hasClass('active')){
      $('#play-btn').prop('disabled', false);
    }else{
      $('#play-btn').prop('disabled', true);
    }
  })

  $('button[type="button"].btn').on('click', function(){
    $('button[type="button"].btn').removeClass('active');
    $(this).addClass('active');
    genRanNum();
  })

  
})