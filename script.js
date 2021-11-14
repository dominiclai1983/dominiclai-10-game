//function to generate a pair of random number according to number range button
var genRanNum = function(){
  var h1 = Math.floor(Math.random() * 10) + 1;
  var h2 = Math.floor(Math.random() * 10) + 1;

  var l1 = $('.lv1').hasClass('active');
  var l2 = $('.lv2').hasClass('active');
  var l3 = $('.lv3').hasClass('active');
  var l4 = $('.lv4').hasClass('active'); 

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
    var index = newArray.indexOf("-");
    newArray.splice(index,1);
  }if(add){
    var index = newArray.indexOf("+");
    newArray.splice(index,1);
  }if(multi){
    var index = newArray.indexOf("*");
    newArray.splice(index,1);
  }if(div){
    var index = newArray.indexOf("/");
    newArray.splice(index,1);
  }

  var sign = newArray[Math.floor(Math.random() * newArray.length)];
  console.log(newArray);
  console.log(sign);
  return sign;
}

//function to display the question and return the answer to the question
var displayQuest = function(){
  $('.game-play').empty();
  
  do{
  var num = genRanNum();
  var signs = genRanArith();
  console.log('dis '+num);
  console.log('dis '+signs);
  }while((signs == '/') && (num[0] % num[1] != 0));
  //the number would generate again if the question is div and the ans is not whole number

  var checker = (num[0] - num[1]) > 0;
  //ensure the answer is +ve when the sign is -
  var answer;
  if(signs == '-'){
    if(checker){
      $('.game-play').append('<p>' + num[0] + " " + signs + " " + num[1] + '</p>');
    }else if(!(checker)){
      $('.game-play').append('<p>' + num[1] + " " + signs + " " + num[0] + '</p>');
    }
    answer = Math.abs(num[0] - num[1]);
  }else{
    $('.game-play').append('<p>' + num[0] + " " + signs + " " + num[1] + '</p>');
  }
  
  if(signs == '+'){
    answer = num[0] + num[1];
  }else if(signs == '*'){
    answer = num[0] * num[1];
  }else if(signs == '/'){
    answer = num[0] / num[1];
  }

  console.log('answer'+answer);
  return answer;
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

  $('input[type="radio"]').on('click', function(){
    $('input[type="radio"]').closest('label').removeClass('active');
    $(this).closest('label').addClass('active');
    var test = genRanNum();
    console.log(test);
  })

  $('#play-btn').on('click', function(){
    displayQuest();
  })

  var input; 

  $("#button-addon1").on('click', function(){
      input = $('.form-control').val();
      $('.form-control').val('');
  })
  
  //input field would listen to the "enter" event
  $(".form-control").on('keypress', function(key){
      if(key.which == 13){
      var input = $(this).val();
      $(this).val('');
    }
  })
  
  console.log(input);
})

/*
finally adding the timer 
if possible, adding the progressive bar
*/