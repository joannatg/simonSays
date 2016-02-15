 $(document).ready(function () { 
   var simonPlayedSounds = [];
   var round = 0;
   var values = [1,2,3,4];   
   var playersPlayedSounds = [];
   var audio = [];
   
   audio[1] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"); 
   audio[2] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
   audio[3] = new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3 ");
   audio[4] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" );

   
 
function isPlayerCorrect(){
    var result = true; 
    for(var k = 0; k<playersPlayedSounds.length; k++){
     var item = playersPlayedSounds[k];
     if(item !== simonPlayedSounds[k]){
        result = false;
        break;
      }
    }
    return result;
  } 
   //fn to randomly pick sounds for Simon to play 
   function getNextValueForSimonToPlay(){
        var newSound = values[Math.floor(Math.random() * values.length)];
        simonPlayedSounds.push(newSound);
  }   
  //for every count increase, theres 1 new sound to play 
     function playGame(){    
         for(var i = 0; i<simonPlayedSounds.length; i++){
            var sound = simonPlayedSounds[i];
            setTimeout (function(x){
              return function() { 
                $("#"+x).addClass('highlighted');   
                audio[x].play();       
                setTimeout(function(){
                  $("#"+x).removeClass('highlighted');
                }, 200);
              };
           }(sound), 800*i);
       }
}  
  
  //player`s sound and color effect
  $(".square").on("click", function() { 
      var  i = $(this).attr("id");
      $("#audio"+i)[0].play(); 
      $("#"+i).addClass('highlighted');     
      setTimeout(function(){
          $("#"+i).removeClass('highlighted');
      }, 200);
      var  h = parseInt(i);
      playersPlayedSounds.push(h);
       
      if(!isPlayerCorrect()){
         setTimeout(function(){
              alert("Listen again");
         }, 500);
         setTimeout(function(){
             playGame();
         }, 1000); 
       } else { 
          //player is correct
            if(playersPlayedSounds.length === simonPlayedSounds.length){ 
            // player is finished 
            // advance to next round
              playersPlayedSounds = [];
              round++;
              setTimeout(function(){              
                 $("#level").html(round);
              }, 800); 
              getNextValueForSimonToPlay();
              setTimeout(function(){
                 playGame();
              }, 1500);
           }else {
            // wait
          }
        }
     });
   
   //start the game
  $("#middleCircle").one("click", function (){   
     var m = $("#level").text();
     $("#level").html(1);
     round++;
     getNextValueForSimonToPlay();
     setTimeout(function(){
          playGame();  
     }, 1000); 
  });
 });

