function glider(){
    console.log("glider")
    
    window.board[3][24][4].alive = 1
    window.board[4][23][4].alive = 1
    window.board[4][22][4].alive = 1
    window.board[3][22][4].alive = 1
    window.board[2][22][4].alive = 1
    
    window.board[3][24][5].alive = 1
    window.board[4][23][5].alive = 1
    window.board[4][22][5].alive = 1
    window.board[3][22][5].alive = 1
    window.board[2][22][5].alive = 1
}