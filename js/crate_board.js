

export function crate_board(board_size){
    var board = [];
    // größe des 3d arrays
    
    // Durchläuft drei schleifen, bei jeder wird in einem array ein neues array gemacht
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
    return board
}




