let canv, c, map, cam;


function Camera(w,h) {
    this.x = 0;
    this.y = 0;
    this.width = w;
    this.height = h;
}

function Map() {}
Map.prototype = {
    rows: window.innerWidth / 16,
    cols: window.innerHeight / 16,
    size: 7,
    x: 0,
    y: 0,
    map: [],
    generate: function () {
        this.rows = window.innerWidth / this.size;
        this.cols = window.innerHeight / this.size;
        this.map = [];
        for (var i = 0; i < this.cols * this.rows;i++) {
            this.map.push(Math.floor(Math.random() * 5));
        }
    },
    get: function (x,y) {
        return this.map[Math.round(x)*Math.round(y)]
    },
    render: function (c,camera) {
        this.rows = window.innerHeight / this.size / 2;
        this.cols = window.innerWidth / this.size / 2;
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                c.beginPath();
                switch(this.get(x,y)) {
                case 0:
                    c.fillStyle = "rgb(255,0,0)";
                    break;
                case 1:
                    c.fillStyle = "rgb(0,255,0)";
                    break;
                case 2:
                    c.fillStyle = "rgb(0,0,255)"
                    break;
                case 3:
                    c.fillStyle = "rgb(0,0,0)"
                    break;
                case 4:
                    c.fillStyle = "rgb(255,255,255)"
                    break;
                }
                c.fillRect(x * this.size + camera.x, y * this.size + camera.y, this.size, this.size);
                c.strokeRect(x * this.size + camera.x, y * this.size + camera.y, this.size, this.size);
                c.closePath();
            }
        }
    }
}
function render() {
    map.generate();
    map.render(c, cam)
}
$(window).load(function () {
    canv = $("canvas")[0];
    c = canv.getContext("2d");

    canv.width = window.innerWidth / 2;
    
    canv.height = window.innerHeight / 2;
    
    map = new Map();
    map.generate();
    console.log(map);
    console.log(map.get(0,1));
    cam = new Camera(window.innerWidth / 2, window.innerHeight /2 );
    setInterval(() => {
        exec("_start_contxt,'canvas',;clr,;_end_contxt,;")
        render()
    }, 100);

})