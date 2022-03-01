// das Gesamte Board updaten und jeden Gme tic ausgeführt werden 
export function update(board){ 
    const board_size = board.length 

    //Durchläuft das Gesamte Board array und ruft für jede Zelle checkneighbours() auf
    for(var i = 0; i< board_size; i++){
        for(var j = 0; j < board_size; j++){            
            for(var l = 0; l < board_size; l++){
                checkneighbours(i, j, l)
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
                                console.log("fuck ja")
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(board)
    return board
}