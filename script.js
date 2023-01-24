var countDownDate = new Date("Feb 10, 2024 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
    document.getElementsByClassName("days")[0].innerHTML = days;
    document.getElementsByClassName("hours")[0].innerHTML = hours;
    document.getElementsByClassName("minutes")[0].innerHTML = minutes;
    document.getElementsByClassName("seconds")[0].innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementsByClassName("days")[0].innerHTML = "0";
    document.getElementsByClassName("hours")[0].innerHTML = "0";
    document.getElementsByClassName("minutes")[0].innerHTML = "0";
    document.getElementsByClassName("seconds")[0].innerHTML = "0";
    // start fireworks
    var rnd = Math.random,
  flr = Math.floor;

let canvas = document.createElement('canvas');
document.getElementsByTagName('body')[0].appendChild(canvas);
canvas.style.position = 'absolute';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.top = '0';

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let ctx = canvas.getContext('2d');

function rndNum(num) {
  return rnd() * num + 1;
}

function vector(x, y) {
  this.x = x;
  this.y = y;

  this.add = function(vec2) {
    this.x = this.x + vec2.x;
    this.y = this.y + vec2.y;
  }
}

function particle(pos, vel) {
  this.pos = new vector(pos.x, pos.y);
  this.vel = vel;
  this.dead = false;
  this.start = 0;

  this.update = function(time) {
    let timeSpan = time - this.start;

    if (timeSpan > 500) {
      this.dead = true;
    }

    if (!this.dead) {
      this.pos.add(this.vel);
      this.vel.y = this.vel.y + gravity;
    }
  };

  this.draw = function() {
    if (!this.dead) {
      drawDot(this.pos.x, this.pos.y, 1);
    }
  }

}

function firework(x, y) {

  this.pos = new vector(x, y);
  this.vel = new vector(0, -rndNum(10) - 3);
  this.color = 'hsl(' + rndNum(360) + ', 100%, 50%)'
  this.size = 4;
  this.dead = false;
  this.start = 0;
  let exParticles = [],
    exPLen = 100;

  let rootShow = true;

  this.update = function(time) {
    if (this.dead) {
      return;
    }

    rootShow = this.vel.y < 0;

    if (rootShow) {
      this.pos.add(this.vel);
      this.vel.y = this.vel.y + gravity;
    } else {
      if (exParticles.length === 0) {
        flash = true;
        for (let i = 0; i < exPLen; i++) {
          exParticles.push(new particle(this.pos, new vector(-rndNum(10) + 5, -rndNum(10) + 5)));
          exParticles[exParticles.length - 1].start = time;
        }
      }
      let numOfDead = 0;
      for (let i = 0; i < exPLen; i++) {
        let p = exParticles[i];
        p.update(time);
        if (p.dead) {
          numOfDead++;
        }
      }

      if (numOfDead === exPLen) {
        this.dead = true;
      }

    }
  }

  this.draw = function() {
    if (this.dead) {
      return;
    }

    ctx.fillStyle = this.color;
    if (rootShow) {
      drawDot(this.pos.x, this.pos.y, this.size);
    } else {
      for (let i = 0; i < exPLen; i++) {
        let p = exParticles[i];
        p.draw();
      }
    }
  }

}

function drawDot(x, y, size) {
  ctx.beginPath();

  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();

  ctx.closePath();
}

var fireworks = [],
  gravity = 0.2,
  snapTime = 0,
  flash = false;

function init() {
  let numOfFireworks = 20;
  for (let i = 0; i < numOfFireworks; i++) {
    fireworks.push(new firework(rndNum(canvas.width), canvas.height));
  }
}

function update(time) {
  for (let i = 0, len = fireworks.length; i < len; i++) {
    let p = fireworks[i];
    p.update(time);
  }
}

function draw(time) {
  update(time);

  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  if (flash) {
    flash = false;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.font = "30px Arial";
  let newTime = time - snapTime;
  snapTime = time;

  //ctx.fillText(newTime,10,50);

  ctx.fillStyle = 'blue';
  for (let i = 0, len = fireworks.length; i < len; i++) {
    let p = fireworks[i];
    if (p.dead) {
      fireworks[i] = new firework(rndNum(canvas.width), canvas.height);
      p = fireworks[i];
      p.start = time;
    }
    p.draw();
  }

  window.requestAnimationFrame(draw);
}

window.addEventListener('resize', function() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
});

init();
draw();

  }
}, 1000);

