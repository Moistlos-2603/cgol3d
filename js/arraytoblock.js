export function arraytoblock(board, board_size){
    for(var i = 0; i< board_size; i++){
        for(var j = 0; j < board_size; j++){
            for(var l = 0; l < board_size; l++){
                if(board[i][j][l].alive == 1){
                    addcube(i,j,l)

                }
            }
        }
    }
}

