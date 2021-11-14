//function to generate a pair of random number according to number range button
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

//function to generate random arithmetic sign according to ari btn is checked or not
var genRanArith = function(){
  var newArray = ["+", "-", "*", "/"];
  
  var add = (!$('.ari-btn.add-btn').hasClass('active'));
  var sub = (!$('.ari-btn.sub-btn').hasClass('active'));
  var multi = (!$('.ari-btn.multi-btn').hasClass('active'));
  var div = (!$('.ari-btn.div-btn').hasClass('active'));

  if(sub){
    var index = newArray.indexOf("+");
    newArray.splice(index,1);
  }if(add){
    var index = newArray.indexOf("-");
    newArray.splice(index,1);
  }if(multi){
    var index = newArray.indexOf("*");
    newArray.splice(index,1);
  }if(div){
    var index = newArray.indexOf("/");
    newArray.splice(index,1);
  }
  /*
  console.log(newArray);
  */
  var sign = newArray[Math.floor(Math.random() * newArray.length)];
  
  console.log(sign);
  
  return sign;
}

var displayQuest = function(){
  $('.game-play').empty();
  var num = genRanNum();
  console.log(num)
  var signs = genRanArith();
  console.log(signs);
  $('.game-play').append('<p>' + num[0] + " " + signs + " " + num[1] + '</p>');
}

$(document).ready(function(){
  genRanNum();

  //control the Arithmetic button group check or uncheck 
  $('input[type="checkbox"]').on('click', function(){
    $(this).closest('label').toggleClass('active');
    /*
    checker for ari btn has active class or not
    console.log($('label.ari-btn').hasClass('active'));
    */

  //contorl the play button active, if any button Arithmetic button group is checked
    if($('label.ari-btn').hasClass('active')){
      $('#play-btn').prop('disabled', false);
    }else{
      $('#play-btn').prop('disabled', true);
    }

    genRanArith();
  })

  $('button[type="button"].btn').on('click', function(){
    $('button[type="button"].btn').removeClass('active');
    $(this).addClass('active');
    var test = genRanNum();
    console.log(test);
  })

  $('#play-btn').on('click', function(){
    displayQuest();
  })
  
})