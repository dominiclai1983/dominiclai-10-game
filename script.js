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

  //if the button is uncheck, then the respective sign would remove from array
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

  //randomly generate the sign within new array 
  var sign = newArray[Math.floor(Math.random() * newArray.length)];

  return sign;
}

//function to display the question and return the answer to the question
var displayQuest = function(){
  $('.game-play').empty();
  
  do{
  var num = genRanNum();
  var signs = genRanArith();
  }while((signs == '/') && (num[0] % num[1] != 0));
  //the number would generate again if the question is div and the ans is not whole number

  var checker = (num[0] - num[1]) > 0;
  //ensure the answer is +ve when the sign is '-'
  var answer;
  if(signs == '-'){
    if(checker){
      $('.game-play').append('<h3>' + num[0] + " " + signs + " " + num[1] + ' =? </h3>');
    }else if(!(checker)){
      $('.game-play').append('<h3>' + num[1] + " " + signs + " " + num[0] + ' =? </h3>');
    }
    answer = Math.abs(num[0] - num[1]);//answer for '-' quest
  }else{
    $('.game-play').append('<h3>' + num[0] + " " + signs + " " + num[1] + ' =? </h3>');
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

    var count = 0;//set the sec counter as 0 at the begining

    var counter = function(){
	    setInterval(myTimer, 1000);
    }

    var myTimer = function(){
      count = count -1;
      if(count < 0){
  	    clearInterval(counter);
        $('.game-play').empty();
        $('.game-play').append('<h2 class="text-danger">GAME OVER!</h2');
        return;
      }   
      $('#time').html('Time Remaining: ' + count + ' sec');
      console.log('myTimer'+count)
    }

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
  });

    var play;
    var input; 

  //radio button group for user to choose the number range
  $('input[type="radio"]').on('click', function(){
    $('input[type="radio"]').closest('label').removeClass('active');
    $(this).closest('label').addClass('active');
    /*
    var test = genRanNum();
    console.log(test);
    */
  });

  //the game begin when the user click "play game" btn
  $('#play-btn').on('click', function(){
    //once play game button click, then the timer is set at 10 sec by setting count = 10;
    count = 10;
    counter();
    play = displayQuest();
    console.log('play'+play)
  });

  //a function to check the input == the answer of the questions
  var checkAnswer = function(userInput, questAns){
    var ansChecker = (userInput === questAns);
    console.log(userInput === questAns)
    if(ansChecker && count >= 0){
      play = displayQuest();
      //add plus 2 due to the user's eye cannot see the digit plus 1;
      count = count + 2;
    }
  }

  //capture the answer if the user press answer button
  $("#button-addon1").on('click', function(){
      input = parseInt($('.form-control').val());
      $('.form-control').val('');
      console.log('input'+input);
      checkAnswer(input, play);
  });
  
  //input field would listen to the "enter" event
  $(".form-control").on('keypress', function(key){
      if(key.which == 13){
      input = parseInt($(this).val());
      $(this).val('');
      console.log('input'+input);
      checkAnswer(input, play);
    }
  });

})
