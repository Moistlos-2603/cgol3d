function balken(){
    console.log("balken")
    
    window.board[12][11][12].alive = 1
    window.board[12][12][12].alive = 1
    window.board[12][13][12].alive = 1
  
    window.board[12][11][13].alive = 1
    window.board[12][12][13].alive = 1
    window.board[12][13][13].alive = 1

}