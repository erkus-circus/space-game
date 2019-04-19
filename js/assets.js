
function Camera(w, h) {
    this.x = 0;
    this.y = 0;
    this.width = w;
    this.height = h;
}

function Tile(x,y,pos,collide=false) {
    this.x = x;
    this.y = y;
    this.pos = pos
    this.collide = collide;
}

function Map(name, s = 7) {
    this.name = name;
    this.size = s;
    this.x = 0;
    this.y = 0;
    this.map = []
    this.generate = function (type = 'rand', spaces = 2) {
        var map = maps[this.name];
        console.log(map);
        this.rows = map.height;
        this.cols = map.width;
        map = map.map;
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                switch (map[y][x]) {
                    case 0:
                        map[y][x] = new Tile(0,0,[x,y],true) // rock
                        break;
                    case 1:
                        map[y][x] = new Tile(2, 0,[x,y]) // grass
                        break
                    case 2:
                        map[y][x] = new Tile(0, 2,[x,y], true); // water
                        break
                    default:
                        break;
                }
            }
        }
        this.map = map;
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
    this.update = function (c, camr) {
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
        collidable = []
        for (let y = startRow; y < endRow; y++) {
            // some logic is inside here and that is why this is update and not render.
            if (y >= this.rows) {
                break;
            }
            for (let x = startCol; x < endCol; x++) {
                if (x >= this.cols || this.get(x, y) === null) {
                    break;
                }
                //c.fillRect(x * this.size + camr.x, y * this.size + camr.y, this.size, this.size);
                c.beginPath();
                
                var tile = this.get(x,y);

                if (typeof tile === "undefined") {
                    continue
                }
                c.drawImage($("#basic-text")[0], tile.x * this.size, tile.y * this.size, this.size, this.size,
                    x * this.size + camr.x, y * this.size + camr.y, this.size, this.size);
                
                c.closePath();
                
                if (tile.collide) {
                    
                    collidable.push(tile)
                }
            }
        }
    }
}

function Player(x,y) {
    this.x = x;
    this.y = y;
    this.getPosRelToCam = function (cam) {
        return [
            this.x - cam.x,
            this.y - cam.y
        ];
    }
    this.touchingPoint = (x, y, ca) => {
        var [px,py] = this.getPosRelToCam(ca)
        
        return (px == x && py == y)
    }
    this.update = function (c) {
        c.beginPath()
        c.fillStyle = "#000";
        c.fillRect(this.x,this.y,s,s);
        c.closePath()
    }
}