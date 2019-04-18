
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
    this.generate = function (type = 'rand', spaces = 2) {
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
                if (x >= this.cols || this.get(x, y) === null) {
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

function Player(x,y) {
    this.x = x;
    this.y = y;
    this.getPosRelToCam = function (cam) {
        
        return [
            cam.x - this.x,
            cam.y - this.y
        ];
    }
    this.render = function (c) {
        c.beginPath()
        c.fillStyle = "#000";
        c.fillRect(this.x,this.y,s,s);
        c.closePath()
    }
}