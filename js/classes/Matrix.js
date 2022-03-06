class Matrix{
    constructor(matrix=[]){
        //Sample representation of matrix:
        //this.matrix = [[1, 0, 0, 0],
        //              [0, 1, 0, 0],
        //              [0, 0, 1, 0],
        //              [0, 0, 0, 1]]
        this.matrix = matrix
        this.row_length = matrix.length
        this.col_length = matrix[0] ? matrix[0].length : 0
    }

    setRow(rowIndex, newRow){
        this.matrix[rowIndex] = newRow
        this.row_length = this.row_length + 1
        this.col_length = newRow.length
    }

    setMatrix(newMatrix){
        this.matrix = newMatrix
        this.row_length = newMatrix.length
        this.col_length = newMatrix[0] ? newMatrix[0].length : 0
    }

    setCell(row, col, val){
        this.matrix[row][col] = val
    }
}

export default Matrix