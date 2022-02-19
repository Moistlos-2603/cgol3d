

function crate_board(){
    var board = [];
    const board_size = 25;
    for(var i = 0; i< board_size; i++){
        board[i] = []
        for(var j = 0; j < board_size; j++){
            board[i][j] = []
            for(var l = 0; l < board_size; l++){
                board[i][j][l] = {
                    alive: 0,
                    neighbours: 0
                }
            }
        }
    }
    window.board = board
}

crate_board()
console.log(board)



