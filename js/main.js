
var x=null;
var chronos='chrono25'
var distance = 1499;
var run=false

function chrono25(){

chronos='chrono25'

//update chrono
if (x!==null){
    clearInterval(x)
}
x = setInterval(function() {


  //calcule du temps
  var minutes = Math.floor(distance /60);
  var seconds = Math.floor(distance-minutes*60);
    
  //modidier le text
  document.getElementById("chrono").innerHTML =minutes + ":" + seconds;
  distance-=1;
  //stop repetiton
  if (minutes == 0) {
    distance=299
    clearInterval(x);
    document.getElementById("chrono").innerHTML =25 + ":" + '00';
    chrono5()
  }
}, 1000);
}



function chrono5(){
    chronos='chrono5'

//update chrono
if (x!==null){
    clearInterval(x)
}
x = setInterval(function() {


  //calcule du temps
  var minutes = Math.floor(distance /60);
  var seconds = Math.floor(distance-minutes*60);
    
  //modidier le text
  document.getElementById("chrono").innerHTML =minutes + ":" + seconds;
  distance-=1;
  //stop repetiton
  if (minutes ==0) {
    clearInterval(x);
    distance=1499
    chrono25()
  }
}, 1000);
}

const button_start=document.getElementById('start');
button_start.addEventListener('click',function(){
    if (run==false){
        if (chronos=='chrono25'){
            chrono25()
            run=true
        }else{
            chrono5()
            run=true
        }
    }
})

const button_stop=document.getElementById('Stop');
button_stop.addEventListener('click',function(){
    if (x!==null){
        run=false
        clearInterval(x)
        x=null
    }
})

const button_restart=document.getElementById('restart');
button_restart.addEventListener('click',function(){
    if (x!==null ){
        clearInterval(x)
        if(chronos=='chrono25'){
            distance=1499
            document.getElementById('chrono').innerHTML ='25' + ":" + '00';
            chrono25()
        }else{
            distance=299
            document.getElementById('chrono').innerHTML ='5' + ":" + '00';
            chrono5()
        }
        run=false

    }else{
        clearInterval(x)
        if(chronos=='chrono25'){
            distance=1499
            document.getElementById('chrono').innerHTML ='25' + ":" + '00';
        }else{
            distance=299
            document.getElementById('chrono').innerHTML ='5' + ":" + '00';
        }
    }
})