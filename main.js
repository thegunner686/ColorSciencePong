let kelvin_values = [
  7500, // 0
  4500, // 1
  3500, // 2
  2500, // 3
  1500, // 4
  500, // 5
];
let clrs2 = {};
        var temp = 4000,
        strength = 25;
        function rgbToHsl(r, g, b) {
          r /= 255, g /= 255, b /= 255;
           var max = Math.max(r, g, b),
           min = Math.min(r, g, b);
           var h, s, l = (max + min) / 2;
           if (max == min) {
             h = s = 0;
           } else {
             var d = max - min;
             s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
             switch (max) {
               case r:
                h = (g - b) / d + (g < b ? 6 : 0);
               break;
               case g:
                h = (b - r) / d + 2;
               break;
               case b:
                h = (r - g) / d + 4;
                break;
              }
              h /= 6;
            }
            return [ h, s, l ];
          }
          function hslToRgb(h, s, l) {
            var r, g, b;
            if (s == 0) {
              r = g = b = l;
            } else {
              function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6)
                return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
              }
              var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
               var p = 2 * l - q;
               r = hue2rgb(p, q, h + 1/3);
               g = hue2rgb(p, q, h);
               b = hue2rgb(p, q, h - 1/3);
             }
             return [ r * 255, g * 255, b * 255 ];
           }
           function getRGBFromTemp(t) {
             let r, g, b;
             if(t <= 66) {
              r = 255
            } else {
              r = t - 60;
              r = 329.698727446 * (r ** -0.1332047592);
              if(r < 0) r = 0;
              if(r > 255) r = 255;
            }
            if(t <= 66) {
              g = t;
              g = 99.4708025861 * Math.log(g) - 161.1195681661;
              if(g < 0) g = 0;
              if(g > 255) g = 255;
            } else {
              g = t - 60;
              g = 288.1221695283 * (g ** -0.0755148492);
              if(g < 0) g = 0;
              if(g > 255) g = 255;
            }
            if(t >= 66) {
              b = 255;
            } else {
              if(t <= 19) {
                b = 0;
              } else {
                b = t - 10;
                b = 138.5177312231 * Math.log(b) - 305.0447927307;
                if(b < 0) b = 0;
                if(b > 255) b = 255;
              }
            }
            r = Math.floor(r);
            g = Math.floor(g);
            b = Math.floor(b);
            return {r,g,b};}
            function alphaBlend(c1, c2) {
              let s = strength / 200;
              return {
                r: c1.r * s + c2.r * (1 - s),
                g: c1.g * s + c2.g * (1 - s),
                b: c1.b * s + c2.b * (1 - s)
              };
              }

                document.addEventListener('keydown', function(e) {
                  switch(e.keyCode){
                    case 48:
                    temp = kelvin_values[0];
                    clrs2 = getRGBFromTemp(temp / 100);
                    cover.style.backgroundColor = "rgba(" + clrs2.r + ", " + clrs2.g + ", " + clrs2.b + ", 0.5)";
                    break;
                    case 49:
                    temp = kelvin_values[1];
                    clrs2 = getRGBFromTemp(temp / 100);
                    cover.style.backgroundColor = "rgba(" + clrs2.r + ", " + clrs2.g + ", " + clrs2.b + ", 0.5)";
                    break;
                    case 50:
                    temp = kelvin_values[2];
                    clrs2 = getRGBFromTemp(temp / 100);
                    cover.style.backgroundColor = "rgba(" + clrs2.r + ", " + clrs2.g + ", " + clrs2.b + ", 0.5)";
                    break;
                    case 51:
                    temp = kelvin_values[3];
                    clrs2 = getRGBFromTemp(temp / 100);
                    cover.style.backgroundColor = "rgba(" + clrs2.r + ", " + clrs2.g + ", " + clrs2.b + ", 0.5)";
                    break;
                    case 52:
                    temp = kelvin_values[4];
                    clrs2 = getRGBFromTemp(temp / 100);
                    cover.style.backgroundColor = "rgba(" + clrs2.r + ", " + clrs2.g + ", " + clrs2.b + ", 0.5)";
                    break;
                    case 53:
                    temp = kelvin_values[5];
                    clrs2 = getRGBFromTemp(temp / 100);
                    cover.style.backgroundColor = "rgba(" + clrs2.r + ", " + clrs2.g + ", " + clrs2.b + ", 0.5)";
                    break;
                    default:
                    break;
                  }
                });


var canvas = document.createElement("canvas"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    cover = document.createElement("div");

cover.style.width = "100vw";
cover.style.height = "100vh";
cover.style.position = "fixed";
cover.style.top = "0px";
cover.style.left = "0px";

let t = temp / 100;
let {r, g, b} = getRGBFromTemp(t);

cover.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ", 0.5)";

document.body.appendChild(cover);

var enemyVelocity = 7;
var enemyScore = 0,
    playerScore = 0;

document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");

ctx.fillRect(0, 0, width, height);

    var paddle = {
    _x: 0,
    _y: 0,
    _width: 0,
    _height: 0,
    create: function(x, y, width, height) {
        var p = Object.create(this);
            p._x = x;
            p._y = y;
            p._width = width;
            p._height = height;
        return p;
    },

    render: function(c) {
        c.fillRect(this._x, this._y, this._width, this._height);
    },

    setX: function(x) {
        this._x = x
    },

    setY: function(y) {
        this._y = y;
    },

    getX: function() {
        return this._x;
    },

    getY: function() {
        return this._y;
    },

        getWidth: function() {
        return this._width;
    },

    getHeight: function() {
        return this._height;
    }
};

var ball = {
    _x: width / 2, // center the ball
    _y: height / 2, // center the ball
    _vx: -4.7,
    _vy: 4.7,
    _size: 6,

    update: function() {
        this._x += this._vx;
        this._y += this._vy;
    },

    render: function(c) {
        c.beginPath();
        c.arc(this._x, this._y, this._size, 0, Math.PI * 2);
        c.fill();
        c.closePath();
    }
};

var playerPaddle = paddle.create(0, 0, 10, 150);
var enemyPaddle = paddle.create(width - 10, 0, 10, 150);

document.body.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(event) {
    playerPaddle.setY(event.clientY - playerPaddle.getHeight() / 2);
}

function reset() {
    ball._x = width / 2;
    ball._y = height / 2;
ball._vx *= -1;
}

update();

function update() {
  let t = temp / 100;
  let temp_colors = getRGBFromTemp(t);
  let lum = 0;
  let blended = alphaBlend({r: 100, g: 100, b: 220}, temp_colors);
  let hsl = rgbToHsl(blended.r, blended.g, blended.b);
  let rgb = hslToRgb(hsl[0], hsl[1], lum);
    ctx.fillStyle = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    ctx.fillRect(0, 0, width, height);

    if(ball._y - ball._size < 0 || ball._y + ball._size > height) {
    ball._vy *= -1;
}

if(ball._x - ball._size < 0) {
    if(ball._y >= playerPaddle.getY() && ball._y <= playerPaddle.getY() + playerPaddle.getHeight()) {
        ball._vx *= -1;
    } else {
    enemyScore++;
  reset();
    }
}

if(ball._x + ball._size > width) {
    if(ball._y >= enemyPaddle.getY() && ball._y <= enemyPaddle.getY() + enemyPaddle.getHeight()) {
        ball._vx *= -1;
    } else {
playerScore++;
reset();
    }
}


let enemyPos = enemyPaddle.getY();

if(enemyPos < ball._y) {
  enemyVelocity = 7;
} else {
  enemyVelocity = -7;
}


// if the paddle is at the top of the screen, start moving down
if(enemyPos < 0) {
    enemyPaddle._y = 0;
}

// if the paddle is at the bottom of the screen, start moving up
if(enemyPos + enemyPaddle.getHeight() > height) {
    enemyPaddle._y = height - enemyPaddle.getHeight();
}

    // update the position of the enemy paddle
enemyPaddle.setY(enemyPos + enemyVelocity);

ball.update();
ctx.fillStyle = "white";
    playerPaddle.render(ctx);
    enemyPaddle.render(ctx);
ball.render(ctx);

    ctx.fillText(playerScore, width / 4, height / 10);
ctx.fillText(enemyScore, width / 4 * 3, height / 10);
    requestAnimationFrame(update);
}
