function random(board, board_size){
    console.log("random")
    for(var i = 0; i< board_size; i++){
        for(var j = 0; j < board_size; j++){
            for(var l = 0; l < board_size; l++){
                if (Math.floor(Math.random() * 10) == 1) {
                    board[i][j][l].alive = 1;
                    
                }
            }
        }
    }

    window.board = board
}