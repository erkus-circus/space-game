let canv, c, map, cam, frameno = -1;
var keys = []
var s = 16

function Camera(w, h) {
    this.x = 0;
    this.y = 0;
    this.width = w;
    this.height = h;
}

function Map(r, c, s = 7) {
    this.rows = r;
    this.cols = c;
    this.size = s;
    this.x = 0;
    this.y = 0;
    this.map = []
    this.generate = function (type='rand',spaces=2) {
        this.map = [];

        if (type == 'rand') {
            for (var y = 0; y < this.rows; y++) {
                this.map.push([])
                for (let x = 0; x < this.cols; x++) {
                    this.map[y].push(Math.round(Math.random()));
                }
            }
        }
    }
    this.get = function (x, y) {
        x = Math.round(x)
        y = Math.round(y)
        try {
            return this.map[y][x];
        } catch (e) {
            return null;
        }
    }
    this.render = function (c, camr) {
        var startCol = 0,
            startRow = 0,

            endCol = Math.round((camr.width - camr.x) / this.size) + 1,
            endRow = Math.round((camr.height - camr.y) / this.size) + 1;
        
        if (camr.x >= 0) {
            startCol = 0
        } else {
            startCol = Math.round(-(camr.width + camr.x) / this.size);
        }

        if (camr.y >= 0) {
            startRow = 0;
        } else {
            startRow = Math.round(-(camr.height + camr.y) / this.size);
        }

        for (let y = startRow; y < endRow; y++) {
            if (y >= this.rows) {
                break;
            }
            for (let x = startCol; x < endCol; x++) {
                if(x >= this.cols || this.get(x,y)===null) {
                    break;
                }
                
                c.beginPath();

                switch (this.get(x, y)) {
                    case 0:
                        c.fillStyle = "rgb(255,0,0)";
                        break;
                    case 1:
                        c.fillStyle = "rgb(0,255,0)";
                        break;
                }

                c.fillRect(x * this.size + camr.x, y * this.size + camr.y, this.size, this.size);
                c.strokeRect(x * this.size + camr.x, y * this.size + camr.y, this.size, this.size);
                c.closePath();
            }
        }
    }
}

function render() {
    c.clearRect(0,0,canv.width,canv.height);
    window.requestAnimationFrame(render)
    
    console.log("FRAMENO: " + ++frameno) // for testing if slow. if not
    
    
    // drawing
    map.render(c, cam)//render map
    
    c.beginPath(); // render camera in center
    c.fillStyle = "rgb(0,0,0)";
    c.fillRect((canv.width / 2) + s / 6, (canv.height / 2) + s / 3, s + 1, s + 1);
    c.closePath();
    
    var {x,y} = cam;
    
    x /= s;
    y /= s;
    
    if (x <= map.cols ||
        x >= 0 ||
        y <= map.rows ||
        y >= 0) {
        console.log("BROKE")
    }

    
    //keys
    for (let j = 0; j < keys.length; j++) {
        const kc = keys[j];
        
        var sp = s*.25 / keys.length
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

$(window).load(function () {
    canv = $("canvas")[0];
    c = canv.getContext("2d");

    canv.width = 800
    canv.height = 600
    
    map = new Map(canv.width, canv.width, s);
    map.generate();
    cam = new Camera(canv.width, canv.height);
    console.log("MAP generated");

    $(window).keydown(function (e) {
        e.preventDefault()
        var m = 1;
        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            if (k == e.keyCode) {
                m = 0;
            }
        }
        var kce = e.keyCode;
        if (m) {
            keys.push(kce);
        }
    });

    $(window).keyup(function (e) {
        e.preventDefault()
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] == e.keyCode) {
                keys.splice(i,1);
            }
        }
    })
    render(); // inita
})