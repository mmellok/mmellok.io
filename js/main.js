
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

$(function() {

  var $sea = $(".sea");
  var $seaYour = $(".sea_player");
  var $seaEnemy = $(".sea_enemy");
  var moveCount = 1;
  var ships = 0;
  var ready = false;
  var yShips = [];
  var eShipsArr = [
    [11, 12, 13, 14, 16, 17, 32, 35, 36, 37, 42, 52, 55, 57, 71, 76, 81, 83, 84, 88],
    [13, 16, 28, 32, 34, 42, 44, 46, 54, 56, 58, 61, 64, 66, 71, 83, 84, 86, 87, 88],
    [21, 22, 23, 26, 27, 28, 42, 47, 61, 62, 64, 65, 67, 68, 81, 83, 84, 85, 86, 88],
    [11, 18, 21, 28, 31, 33, 34, 35, 36, 38, 51, 53, 56, 58, 71, 74, 75, 78, 81, 88],
    [11, 12, 13, 14, 16, 17, 31, 32, 33, 36, 37, 51, 52, 53, 56, 58, 71, 72, 76, 78]
  ]; 
  var enemyMoves = [];
  var yStrike = false;
  var eStrike = false;
  var eCount = 0;
  var yCount = 0;

  yPoints = 0;
  ePoints = 0;

  getArray($seaYour);
  getArray($seaEnemy);

  var $yourCell = $(".sea__item", $seaYour);
  var $enemyCell = $(".sea__item", $seaEnemy);

  var r = random(0, eShipsArr.length);
  var eShips = eShipsArr[r];

  $($enemyCell).on("click", function(){
    if (eStrike) return
    yStrike = false;
    var $this = this;
    $($this).addClass("sea__item_choose");
    eStrike = true;
    var num = Number($($this).attr('data-num'));
    var time = random(1000, 4000);

    
    for (var i = 0; i < eShips.length; i++){
      if (eShips[i] == num){
        setTimeout(function(){
          $($this).addClass("sea__item_killed");
        }, 1000)
        yStrike = true;
        eStrike = false;
        yCount++;
      } 
    }

    if (yCount == 20){
      alert("You win!!!");
    }

    setTimeout(function(){
      enemyMove()
    }, time)
  })

  $($yourCell).on("click", function(){
    if (ready) {
      $($seaYour).addClass("sea__disabled");
      return;
    }

    if ($(this).hasClass("ship__item")){
      $(this).removeClass("ship__item");
      ships--;
    } else {
      $(this).addClass("ship__item");
      ships++;
    }
    if (ships == 20){
      for (var i = 0; i < $yourCell.length; i++ ){
        if ($($yourCell[i]).hasClass("ship__item")){
          yShips.push($($yourCell[i]).attr('data-num'));
        }
      }
      ready = true;

      console.log(yShips)
    }
  })

  function enemyMove(){
    if (yStrike) return
    eStrike = true;
    var move = getMove();
    var cell = ($($yourCell[move]).attr('data-num'));
    if ($($yourCell[move]).hasClass("ship__item")){
      $($yourCell[move]).addClass("sea__item_killed");
      eCount++;
      var time = random(1000, 4000);
      setTimeout(function(){
        enemyMove();
      }, time)
    } else {
      $($yourCell[move]).addClass("sea__item_choose");
    }

    if (eCount == 20){
      alert("You lose!");
    }

    eStrike = false;
  }

  function getMove(){
    var move = random(0, 99);
    if (enemyMoves != []){
      for (var i = 0; i < enemyMoves.length; i++){
        if (move == enemyMoves[i]) {
          console.log(move);
          return getMove();
        }
      }
    }
    enemyMoves.push(move);
    return move;
  }



  function getArray(elem){
    var count = 0;
    for (var i = 0; i < 100; i++){
      var newSeaItem = document.createElement('div');
      newSeaItem.className = 'sea__item';
      elem.append(newSeaItem);
      $(newSeaItem).attr('data-num', count);
      count++;
    }
  }
});

