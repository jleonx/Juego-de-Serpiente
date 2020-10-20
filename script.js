
  window.onload = function () {
    isPaused = false;
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(
      function () {
        game();
      },

      1000 / 10
    );
  };
  xPlayerPosition = yPlayerPosition = 10;
  gridSize = tileCount = 20;
  xApple = yApple = 15;
  xVelocity = yVelocity = 0;
  tail = 5;
  trail = [];
  position = document.getElementById("position");
  tailNumber = document.getElementById("tailNumber");
  trailContent = document.getElementById("trailContent");
  paused = document.getElementById("paused");
  function game() {
    paused.innerHTML = "Paused: " + isPaused;
    if (!isPaused) {
      xPlayerPosition += xVelocity;
      yPlayerPosition += yVelocity;

      if (xPlayerPosition < 0) {
        xPlayerPosition = tileCount - 1;
      }
      if (xPlayerPosition > tileCount - 1) {
        xPlayerPosition = 0;
      }
      if (yPlayerPosition < 0) {
        yPlayerPosition = tileCount - 1;
      }
      if (yPlayerPosition > tileCount - 1) {
        yPlayerPosition = 0;
      }
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canv.width, canv.height);

      ctx.fillStyle = "lime";
      for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(
          trail[i].x * gridSize,
          trail[i].y * gridSize,
          gridSize - 2,
          gridSize - 2
        );
        if (trail[i].x == xPlayerPosition && trail[i].y == yPlayerPosition) {
          //collision!
          tail = 5;
        }
      }
      trail.push({ x: xPlayerPosition, y: yPlayerPosition });
      while (trail.length > tail) {
        trail.shift();
      }

      if (xApple == xPlayerPosition && yApple == yPlayerPosition) {
        tail++;
        xApple = Math.floor(Math.random() * tileCount);
        yApple = Math.floor(Math.random() * tileCount);
      }
      ctx.fillStyle = "red";
      ctx.fillRect(
        xApple * gridSize,
        yApple * gridSize,
        gridSize - 2,
        gridSize - 2
      );

      position.innerHTML = "Snake Head Position: x= " + xPlayerPosition + " y= " + yPlayerPosition;
      tailNumber.innerHTML = "Tail Size: " + tail;
      trailContent.innerHTML = "Snake Body Positions: " + JSON.stringify(trail, null, 4);
    }
  }
  function keyPush(evt) {
    switch (evt.keyCode) {
      case 37: //left
        xVelocity = -1;
        yVelocity = 0;
        break;
      case 38: //up
        xVelocity = 0;
        yVelocity = -1;
        break;
      case 39: //right
        xVelocity = 1;
        yVelocity = 0;
        break;
      case 40: //down
        xVelocity = 0;
        yVelocity = 1;
        break;
      case 80: //down        
        isPaused = isPaused == false ? true : false;
        break;
    }
  }

