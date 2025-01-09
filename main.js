var player = document.getElementById("player");
var pxSprPlayerX = 0;
var pxsSprPlayerContainerSprs = [0, 100, 200, 300], pxsCountSprPlayerContainerX=0;

var isLeft = false, isRight = false;

var px = 0;
var py = 0;
var spd = 2;
var jumpForce = 5;

var rb = 0.00;
var gravityScale = 1;

var isGrounded = false;
var isJumping = false;
var canJump = false;

function drawObj(x, y, w, h, brdColor, bgColor) {
    var obj = document.createElement("div");
    obj.style.position = "absolute";
    obj.style.backgroundColor = bgColor;
    obj.style.zoom = 1.9;
    obj.style.border = brdColor;
    obj.style.width = w + "px";
    obj.style.height = h + "px";
    obj.style.marginLeft = x + "px";
    obj.style.marginTop = y + "px";
    document.body.appendChild(obj);
}

class Block {
    constructor(x, y, id) {
        this.upCorner = {
            xx: x,
            yy: y,
            init: function() {
                drawObj(this.xx, this.yy, 50, 0.1, "1px solid #ff00ff");
            },
            update: function() {
                if(px < this.xx + 50 && px > this.xx - 50 
                    && py < this.yy - 64 && py > this.yy - 78
                ) {
                    isGrounded = true;
                }
            }
        }

        this.downCorner = {
            xx: x,
            yy: y+50,
            init: function() {
                drawObj(this.xx, this.yy, 50, 0.1, "1px solid #ff00ff");
            },
            update: function() {
                if(px < this.xx + 50 && px > this.xx - 50 &&
                    py > this.yy && py < this.yy + 10
                ) {
                    jumpForce = 0;
                }
            }
        }

        this.leftCorner = {
            xx: x,
            yy: y,
            init: function() {
                drawObj(this.xx, this.yy, 0.1, 50, "1px solid #ff00ff");
            },
            update: function() {
                if(px < this.xx  && px > this.xx - 55 &&
                    py < this.yy + 50 && py > this.yy - 50
                ) {
                    px = px - spd;
                }else {
                }
            }
        }

        this.rightCorner = {
            xx: x+50,
            yy: y,
            init: function() {
                drawObj(this.xx, this.yy, 0.1, 50, "1px solid #ff00ff");
            },
            update: function() {
                if(px > this.xx && px < this.xx + 5 &&
                    py < this.yy + 50 && py > this.yy - 50
                ) {
                    px = px + spd;
                }else {
                }
            }
        }

        // this.upCorner.init();
        // this.downCorner.init();
        // this.leftCorner.init();
        // this.rightCorner.init();

        if(id == 0) {
            this.upCorner.init();
            this.downCorner.init();
            this.leftCorner.init();
            this.rightCorner.init();
        }
        
        if(id == 1) {
            var obj = document.createElement("div");
            obj.style.position = "absolute";
            obj.style.backgroundImage = `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4wab2n628aQuXAkUlGrqxSoHUaKaR2Wtz4g&s")`;
            obj.style.width = 50 + "px";
            obj.style.height = 50 + "px";
            obj.style.marginLeft = x + "px";
            obj.style.marginTop = y + "px";
            obj.style.zoom = 1.9;
            document.body.appendChild(obj);
        }

        if(id == 2) {
            var obj = document.createElement("div");
            obj.style.position = "absolute";
            obj.style.backgroundImage = `url("https://pt.quizur.com/_image?href=https://img.quizur.com/f/img61b9014f18d5a9.58248829.jpg?lastEdited=1639514451?o=feed&w=250&h=300&f=webp")`;
            obj.style.backgroundSize = "60px 40px";
            obj.style.width = 50 + "px";
            obj.style.height = 50 + "px";
            obj.style.marginLeft = x + "px";
            obj.style.marginTop = y + "px";
            obj.style.zoom = 1.9;
            document.body.appendChild(obj);
        }

        if(id == 3) {
            var obj = document.createElement("div");
            obj.style.position = "absolute";
            obj.style.backgroundImage = `url("https://bugs.mojang.com/secure/thumbnail/199082/_thumb_199082.png")`;
            obj.style.backgroundSize = "50px 50px";
            obj.style.width = 50 + "px";
            obj.style.height = 50 + "px";
            obj.style.marginLeft = x + "px";
            obj.style.zoom = 1.9;
            obj.style.marginTop = y + "px";
            document.body.appendChild(obj);
        }

        this.update = () => {
            this.upCorner.update();
            this.downCorner.update();
            this.leftCorner.update();
            this.rightCorner.update();
        }
    }
}

// addEventListener("mousemove", function(e) {
//     px = e.x;
//     py = e.y;
// })

var btnLeft = document.getElementById("btnLeft");
var btnRight = document.getElementById("btnRight");

var xx1=0;
var canLeft = true;
var canRight = true;
btnRight.onmousedown = () => {
    if(canRight) {
        canLeft = false;
        xx1++;
        xx2=0;
        if(xx1==1) {
            isRight = true;
        }
        if(xx1>1) {
            isRight = false;
            xx1=0;
            canLeft = true;
        }
    }
}

var xx2=0;
btnLeft.onmousedown = () => {
    if(canLeft) {
        canRight = false;
        xx2++;
        xx1=0;
        if(xx2==1) {
            isLeft = true;
        }
        if(xx2>1) {
            isLeft = false;
            xx2=0;
            canRight = true;
        }
    }
}

function playerUpdate() {
    if(isLeft || isRight) {
        pxsCountSprPlayerContainerX++;
        pxSprPlayerX = pxsSprPlayerContainerSprs[pxsCountSprPlayerContainerX];
        
        if(pxsCountSprPlayerContainerX > pxsSprPlayerContainerSprs.length - 1) {
            pxSprPlayerX = 0;
            pxsCountSprPlayerContainerX=0;
        }

        if(isLeft) {
            px-=spd;
            player.style.transform = "rotateY(180deg)";
        }
        if(isRight) {
            px+=spd;
            player.style.transform = "rotateY(0)";
        }
    }else {
        pxSprPlayerX = 450;
    }

    if(px<0){px=0}if(px>=500-50){px=500-50}

    if(isJumping && canJump) {
        isGrounded = false;
        rb = 0;
        py -= jumpForce;
        setTimeout(() => {
            isJumping = false;
        }, 100);   
    }else {
        canJump = false;
        rb += gravityScale;
        py += rb / 4;
    }

    if(py >= 440) {
        isGrounded = true;
    }

    if(isGrounded) {
        rb = -gravityScale;
        canJump = true;
    }

    player.style.backgroundPositionX = `${pxSprPlayerX}px`;
    player.style.marginLeft = `${px}px`;
    player.style.marginTop = `${py}px`;
}

var blocks = [
    // new Block(0, 0),
]

var map = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 0, 1,

    0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 1, 1, 1, 1, 1, 1,

    0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 1,

    0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
]

let layers = [
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
];
let variationLevel = 18;
for(let xx = 0;xx<map.length/10;xx++) {
    for(let yy=0;yy<map.length/10;yy++) {
        if((Math.random() * 20) >= variationLevel){
            map[10*2] = 0;
            map[10*2+1] = 0;
            map[10*8] = 0;map[10*8+1] = 0;map[10*8+2] = 0;map[10*8+3] = 0;
            map[1-xx+yy+xx*9] = Math.floor(Math.random()*2);
        }
    }
}

for(let i = 0; i < 10; i++) {
    if(map[i]==1) {
        blocks.push(new Block(i * 50, 0, layers[0]));
    }
}

for(let i = 10; i < 20; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-500+i*50, 50, layers[1]));
    }
}

for(let i = 20; i < 30; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-1000+i*50, 100, layers[2]));
    }
}

for(let i = 30; i < 40; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-1500+i*50, 150, layers[3]));
    }
}

for(let i = 40; i < 50; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-2000+i*50, 200, layers[4]));
    }
}

for(let i = 50; i < 60; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-2500+i*50, 250, layers[5]));
    }
}

for(let i = 60; i < 70; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-3000+i*50, 300, layers[6]));
    }
}

for(let i = 70; i < 80; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-3500+i*50, 350, layers[7]));
    }
}

for(let i = 80; i < 90; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-4000+i*50, 400, layers[8]));
    }
}

for(let i = 90; i < 100; i++) {
    if(map[i]==1) {
        blocks.push(new Block(-4500+i*50, 450, layers[9]));
    }
}

for(let xx = 0;xx<map.length/10;xx++) {
    for(let yy=0;yy<map.length/10;yy++) {
        // << 128
    }
}

function update() {
    jumpForce = 5;
    isGrounded = false;
    for(let i=0;i<blocks.length;i++){
        blocks[i].update();
    }
    playerUpdate();
}

setInterval(update, 1000 / 120);

var btnUp = document.getElementById("btnUp");

btnUp.onmousedown = () => {
    isJumping = true;
}

addEventListener("keydown", function(e) {
    if(e.key == "a") {
        isLeft = true;
    }
    if(e.key == "d") {
        isRight = true;
    }
    if(e.keyCode == 32) {
        isJumping = true;
    }

    if(e.key == "e") {
        this.window.location.reload();
    }
});

addEventListener("keyup", function(e) {
    if(e.key == "a") {
        isLeft = false;
    }
    if(e.key == "d") {
        isRight = false;
    }
    if(e.keyCode == 32) {
    }
});