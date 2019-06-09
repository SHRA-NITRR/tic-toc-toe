export const returnAsCoOrdinate=(arrayIndex, order=3)=>{
    return [Math.floor(arrayIndex/order), arrayIndex % order]
}

const ckeckRowMatches=(currentState, baseIndex, mark, order=3)=>{
    let winningSeq=[];

    for (let i=baseIndex; i<baseIndex+order; i++){
        winningSeq.push(i);
        if(currentState[i]!==mark) return false;
    }
    return winningSeq;
}

const ckeckColumnMatches=(currentState, baseIndex, mark, order=3)=>{
    let winningSeq=[];
    for (let i=baseIndex; i<currentState.length; i=i+order){
        winningSeq.push(i);

        if(currentState[i]!==mark) return false;
    }
    return winningSeq;
}

const ckeckDiagonalMatches=(currentState, mark, order=3)=>{
    let winningSeq=[];

    for (let i=0; i<order; i++){
        winningSeq.push((order+1)*i);
        if(currentState[(order+1)*i]!==mark) return false;
    }
    return winningSeq;
}

const ckeckReverseDiagonalMatches=(currentState, mark, order=3)=>{
    let winningSeq=[];

    for (let i=0; i<order; i++){
        winningSeq.push(order*i+(order-1-i));
        if(currentState[order*i+(order-1-i)]!==mark) return false;
    }
    return winningSeq;
}

export const checkIfAnyOneWins=(currentState, indexToUpdate, mark, order=3)=>{
    let diagonalMatch=false;
    const[row, column]=returnAsCoOrdinate(indexToUpdate);
    if(row===column){
        diagonalMatch=ckeckDiagonalMatches(currentState, mark);
    }
    if(row+column===order-1){
        diagonalMatch=ckeckReverseDiagonalMatches(currentState, mark);
    }

    return ckeckRowMatches(currentState, row*order, mark)||ckeckColumnMatches(currentState, column, mark)|| diagonalMatch;
}
