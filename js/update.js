// das Gesamte Board updaten und jeden Gme tic ausgeführt werden 
export function update(board,  el, eu, fl, fu){ 
    const board_size = board.length 

    //Durchläuft das Gesamte Board array und ruft für jede Zelle checkneighbours() auf
    for(var i = 0; i< board_size; i++){
        for(var j = 0; j < board_size; j++){            
            for(var l = 0; l < board_size; l++){
                checkneighbours(i, j, l)
            }
        }
    }

    for(var a = 0; a< board_size; a++){
        for(var b = 0; b < board_size;b ++){            
            for(var c = 0; c < board_size; c++){
                regel(a, b, c, el, eu, fl, fu) 
            }
        }
    }

    function checkneighbours(i, j, l){ // checkt für einzellne Zelle die Nachbarn
        board[i][j][l].neighbours = 0
        for(var k = - 1; k < 2; k++){
            for(var o = - 1; o < 2; o++){
                for(var p = - 1; p < 2; p++){
                    
                    if((i+k != -1 && i+k != board_size) && (j+o != -1 && j+o != board_size) && (l+p != -1 && l+p != board_size)){// checkt ob die abfrage außerhalb des board
                       // console.log(i+k +", " + (j+o) + ", " + (l+p))
                        if(board[i+k][j+o][l+p].alive == 1 ){
                            if( (i+k != i) || (j+p != j) || (l+o != l)){// sorgt dafür, das sich die Zelle selbst als nachbar erkennt.
                                
                                board[i][j][l].neighbours += 1
                                
                            }
                        }
                    }
                }
            }
        }
    }



    // R = (5766)
    // R steht für die Regel
    // in der Klamma steht (El, Eu, Fl, Fu)
    // E ist environment und gilt für die Zahl von Nachbarn die ein Zelle brauch um zu überleben und es gilt El <= E <= Eu
    // F ist Fertility und ist die Zahl die gebraucht wird für neue Zellen und es gilt Fl <= F <= Fu
    // Für 2D ist der standart R = (2333)

    function regel(i, j, l, el, eu, fl, fu){
        if(board[i][j][l].alive == 1){
            if(board[i][j][l].neighbours >= el && board[i][j][l].neighbours <= eu){
                board[i][j][l].alive = 1
            }else{
                board[i][j][l].alive = 0
            }
        }else{
            if(board[i][j][l].neighbours >= fl && board[i][j][l].neighbours <= fu){
                board[i][j][l].alive = 1
            }else(
                board[i][j][l].alive = 0
            )
        }
    }
    window.board = board
    return board
}