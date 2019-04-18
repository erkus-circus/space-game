let canv, c, map, cam, frameno = -1, player;
var keys = []
var s = 16

function render() {
    c.clearRect(0,0,canv.width,canv.height);
    
    map.render(c, cam)//render map
    
    player.render(c)
}

function logic() {
    
    //keys
    var sp = s*.25
    var ppos = player.getPosRelToCam(cam),
        ppxr = ppos[0] * map.size * 999,
        ppyr = ppos[1] * map.size * 999,
        ppxl = ppos[0],
        ppyl = ppos[1];

    if (ppxr > cam.width) {
        cam.x -= sp;
    } else if (-ppxl >= cam.width - map.size) {
        cam.x += sp;
    }
    if (ppyr > cam.height) {
        cam.y -= sp;
    } else if (-ppyl >= cam.height - map.size) {
        cam.y += sp;
    }
    for (let j = 0; j < keys.length; j++) {
        const kc = keys[j];

        if (kc == 38) {
            cam.y += sp
        }
        if (kc == 40) {
            cam.y -= sp
        }
        if (kc == 39) {
            cam.x -= sp
        }
        if (kc == 37) {
            cam.x += sp
        }
        if (kc == 116) {
            window.location.reload(true)
        }
    }
}


function gameUpdate() {
    window.requestAnimationFrame(gameUpdate)
    render()
    logic()
    
    //console.log("FRAMENO: " + ++frameno) // for testing if slow. if not
}

$(window).load(function () {
    canv = $("canvas")[0];
    c = canv.getContext("2d");

    canv.width = 800
    canv.height = 600

    map = new Map(canv.width / s, canv.width / s, s);
    map.generate();
    cam = new Camera(canv.width, canv.width);
    player = new Player(canv.width / 2, canv.height / 2);
    console.log("MAP generated");

    window.requestAnimationFrame(gameUpdate); // inita
})