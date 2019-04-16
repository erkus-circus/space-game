let canv, c, map, cam;


function Camera(w,h) {
    this.x = 0;
    this.y = 0;
    this.width = w;
    this.height = h;
}

function Map(r,c,s=7) {
    this.rows = r;
    this.cols = c;
    this.size = s;
    this.x = 0;
    this.y = 0;
    this.map = []
    this.generate = function () {
        this.map = [];
        for (var i = 0; i < this.cols * this.rows; i++) {
            this.map.push(Math.round(Math.random()));
        }
    }
    this.get = function (x, y) {
        return this.map[Math.floor(x + 1) * Math.floor(y + 1) - Math.floor(y) - Math.floor(x)]
    }
    this.render = function (c, camera) {
        var startCol = Math.round(camera.x) / this.size,
            startRow = Math.round(camera.y) / this.size,
            endCol = ((camera.width) / this.size) - startCol,// / this.size,
            endRow = ((camera.height) / this.size) - startRow// / this.size;

            for (let y = startRow; y < endRow; y++) {
                for (let x = startCol; x < endCol; x++) {
                c.beginPath();

                switch (this.get(x, y)) {
                    case 0:
                        c.fillStyle = "rgb(255,0,0)";
                        break;
                    case 1:
                        c.fillStyle = "rgb(0,255,0)";
                        break;
                    default:
                        c.fillStyle = "rgb(0,0,255)";
                        break;
                }

                c.fillRect(x * this.size + camera.x, y * this.size + camera.y, this.size, this.size);
                //c.strokeRect(x * this.size + camera.x, y * this.size + camera.y, this.size, this.size);
                c.closePath();
            }
        }
        c.beginPath();
        c.fillStyle = "rgb(0,0,0)";
        c.fillRect(canv.width / 2 + 4, canv.height / 2 + 5.1,this.size,this.size);
        c.closePath();
    }
}

function render() {
    //map.generate();
    map.render(c, cam)
}

$(window).load(function () {
    canv = $("canvas")[0];
    c = canv.getContext("2d");

    canv.width = 600
    canv.height = 500
    var s = 1
    map = new Map(10,10,s);
    map.generate();
    cam = new Camera(canv.width,canv.height);
    console.log("MAP generated");
    
    setInterval(() => {
        exec("_start_contxt,'canvas',;clr,;_end_contxt,;")
        render()
    }, 20);

    $(window).keydown(function (e) {
        var kc = e.keyCode;
        if (kc == 38) {
            cam.y += s
        }
        if (kc == 40) {
            cam.y -= s
        }
        if (kc == 39) {
            cam.x -= s
        }
        if (kc == 37) {
            cam.x += s
        }
    })
})