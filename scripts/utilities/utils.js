//canvas:
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Functions:
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

//loaded Utils:
const colors = ["#42ebf4", "#00cdf2", "#b8ecf9", "#e1f2f7", "#00a1ff"];

//Objects:
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

function subImg(spriteSheet, sx, sy, sWidth, sHeight, dx, dy, scale, dWidth, dHeight) {
    this.spriteSheet = spriteSheet;
    this.sx = sx;
    this.sy = sy;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.scale = scale;
    this.dx = dx;
    this.dy = dy;
    this.firstDWidth = dWidth;
    this.firstDheight = dHeight;
    this.dWidth = this.firstDWidth * this.scale;
    this.dHeight = this.firstDheight * this.scale;
    
    this.draw = function () {
        c.drawImage(this.spriteSheet, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
    }

    this.update = function (x, y) {
        this.dx = x;
        this.dy = y;
        this.dWidth = this.firstDWidth * this.scale;
        this.dHeight = this.firstDheight * this.scale;
    }
}

function img(img, dx, dy, dWidth, dHeight, scale) {
    this.img = img;
    this.dx = dx;
    this.dy = dy;
    this.firstDWidth = dWidth;
    this.firstDheight = dHeight;
    this.scale = scale;
    this.dWidth = this.firstDWidth*this.scale;
    this.dHeight = this.firstDheight*this.scale;

    this.draw = function() {
        c.drawImage(this.img, this.dx, this.dy, this.dWidth, this.dHeight);
    }
     
    this.update = function (x, y) {
         this.dx = x;
         this.dy = y;
         this.dWidth = this.firstDWidth * this.scale;
         this.dHeight = this.firstDheight * this.scale;
    }
}

// Event Listeners:
addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

function vector2D(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    this.resultant = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    this.limitResultant = function() {
        if(this.resultant == Math.abs(this.dx) || this.resultant == Math.abs(this.dy)) return this;
        else {
            let componentX = this.dx/Math.sqrt(2);
            let componentY = this.dy/Math.sqrt(2);
            return new vector2D(componentX, componentY);
        }
    }

    this.update = function() {
        this.resultant = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
        this.dx = 0;
        this.dy = 0;
    }
};