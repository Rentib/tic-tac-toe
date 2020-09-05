function move(){
	var index = createVector(-1, -1), best = -1000;
	for(var i = 0;i < 3;i++)
		for(var j = 0;j < 3;j++){
			if(board[i][j] == ''){
				board[i][j] = 'O';
				var k = minimax(false);
				if(best < k){
					best = k;
					index = createVector(i, j);
				}
				board[i][j] = '';
			}
		}
	board[index.x][index.y] = 'O';
	turn ^= 1;
}
function minimax(is_maxing){
	if(checkWinner() != null){
		if(checkWinner() == 'O') return 1;
		if(checkWinner() == 'tie') return 0;
		if(checkWinner() == 'X') return -1;
	}
	var res = 0;
	if(is_maxing) res -= 1000;
	else res += 1000;
	for(var i = 0;i < 3;i++)
		for(var j = 0;j < 3;j++)
			if(board[i][j] == ''){
				if(is_maxing){
					board[i][j] = 'O';
					res = max(res, minimax(false));
				}
				else{
					board[i][j] = 'X';
					res = min(res, minimax(true));
				}
				board[i][j] = '';
			}
	return res;
}