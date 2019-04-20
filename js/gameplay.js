var gamePlay = {
    weapons: {},
    inventory: {},
    health: 3
};
var oldMan;
function LVL_first() {
    var [x,y] = player.getPosRelToCamSize(cam,s);
    if (Math.round(y) == 0 && (Math.round(x) == 6 || Math.round(x) == 7)) {
        cam.y -= map.rows*s-s*2;
        map.name = "cave_1";
        map.generate("cave_1")
    }
}
//sword 8,8
function LVL_cave_1() {
    var [x, y] = player.getPosRelToCamSize(cam, s);
    var px = Math.round(x),
        py = Math.round(y);
    if (Math.round(y) == 14 && (Math.round(x) == 6 || Math.round(x) == 7)) {
        map.name = "first";
        cam.y += map.rows * s - s * 2;
        map.generate("first")
    }

    if (("sword" in gamePlay.weapons)) {
        return;
    }
    oldMan.update(c);
    oldMan.x = cam.x - map.cols*-1*3;
    oldMan.y = cam.y - map.rows * -1 * 2.5;
    
}

function initGame() {
    oldMan = new Player(map.cols, map.rows, "char","oldman");
}

function game() {
    var n = map.name
    if (n == "first") {
        LVL_first()
    } else if (n == "cave_1") {
        LVL_cave_1()
    }
}