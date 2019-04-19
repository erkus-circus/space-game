let canv, c, map, cam, frameno = -1, player,
    maps;
var keys = [],
    collidable = []
    
var s = 16

function render() {
    c.clearRect(0, 0, canv.width, canv.height);

    map.update(c, cam)//render map

    player.update(c)
}

function getSpeed() {
    return s*.25
}

function logic() {

    //keys
    var sp = getSpeed()
    var ppos = player.getPosRelToCam(cam);

    if (ppos[0] < 0) {
        cam.x -= sp;
    } else if (ppos[0] > map.cols * map.size - map.size) {
        cam.x += sp;
    }

    if (ppos[1] < 0) {
        cam.y -= sp;
    } else if (ppos[1] > map.rows * (map.size - .5)) {
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

        for (let i = 0; i < collidable.length; i++) {
            // stop from colliding with things

            var [x, y] = collidable[i].pos;
            var [ppx, ppy] = player.getPosRelToCam(cam);
            var px = (ppx / s),
                py = (ppy / s);
            if (Math.round(px) == x && Math.round(py) == y) {
                if (kc == 38) {
                    cam.y -= sp
                }
                if (kc == 40) {
                    cam.y += sp
                }
                if (kc == 39) {
                    cam.x += sp
                }
                if (kc == 37) {
                    cam.x -= sp
                }
            }
        }
        

    }
}


function gameUpdate() {
    render()
    logic()
    //console.log("FRAMENO: " + ++frameno) // for testing if slow. if not
}
$(window).load(function () {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            maps = JSON.parse(this.responseText);
            init()
        }
    };
    xhttp.open("GET", "./dat/maps.json", true);
    xhttp.send();
})

function init () {
    canv = $("canvas")[0];
    c = canv.getContext("2d");

    canv.width = 250
    canv.height = 250

    map = new Map("first", s);
    map.generate();

    cam = new Camera(canv.width, canv.height);
    player = new Player(canv.width / 2, canv.height / 2);
    console.log("MAP generated");
    setInterval(() => {
        gameUpdate()
    }, 1000/60);
}