var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
var w, h;
var turn, btn, finished;
function setup() {
    createCanvas(600, 600);
    scaleToFit: true;
    reset();
    btn = createButton("RESET GAME");
    btn.mousePressed(reset);
}
function reset(){
    w = width / 3;
    h = height / 3;
    turn = round(random(1));
    for(var i = 0;i < 3;i++)
        for(var j = 0;j < 3;j++)
            board[i][j] = '';
    finished = false;
}
function mousePressed() {
    var x = floor(mouseX / w), y = floor(mouseY / h);
    if(board[x][y] == '' && turn == 0){
        board[x][y] = 'X';
        turn ^= 1;
    }
}
function draw() {
    if(finished == true) return;
    background(50);
    strokeWeight(5);
    stroke(250);
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[i][j];
            textSize(32);
            let r = w / 4;
            if (spot == 'X') {
                noFill();
                ellipse(x, y, r * 2);
            } 
            else if (spot == 'O') {
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }
        }
    }
    var result = checkWinner();
    if (result != null) {
        finished = true;
        strokeWeight(10);
        stroke(250, 0, 0);
        for(var i = 0;i < 3;i++){
            if(equal3(board[i][0], board[i][1], board[i][2]))
                line(w * i + w / 2, 0, w * i + w / 2, height);
            if(equal3(board[0][i], board[1][i], board[2][i]))
                line(0, h * i + h / 2, width, h * i + h / 2);
        }
        if(equal3(board[0][0], board[1][1], board[2][2]))
            line(0, 0, width, height);
        if(equal3(board[0][2], board[1][1], board[2][0]))
            line(widt, 0, 0, height);
    }
    if(turn == 1)
        move();
}
function equal3(a, b, c){
    return a == b && b == c && a != '';
}
function checkWinner(){
    var winner = null;
    for(var i = 0;i < 3;i++){
        if(equal3(board[i][0], board[i][1], board[i][2]))
            winner = board[i][0];
        if(equal3(board[0][i], board[1][i], board[2][i]))
            winner = board[0][i];
    }
    if(equal3(board[0][0], board[1][1], board[2][2]) || equal3(board[0][2], board[1][1], board[2][0])) winner = board[1][1];
    var empty = 0;
    for(var i = 0;i < 3;i++)
        for(var j = 0;j < 3;j++)
            if(winner == null && board[i][j] == '')
                return null;
    if(winner == null) return 'tie';
    return winner;
}