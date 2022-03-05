import Matrix from "./classes/Matrix.js"
import Point from "./classes/Point.js"

export const drawLine = (context, point1, point2, color="white") => {

    context.beginPath()

    context.strokeStyle = color

    context.moveTo(point1.x, point1.y)
    context.lineTo(point2.x, point2.y)

    context.stroke()    
}

export const transformPoint = (point, matrix) => {
    const resultPoint = new Point()
    const multResultArr = []

    for(let pointIndex = 0; pointIndex < 4; pointIndex++){
        let temp = 0
        for(let matrixIndex = 0; matrixIndex < 4; matrixIndex++){
            temp += point.pointArr[matrixIndex] * matrix.matrix[matrixIndex][pointIndex]
        }

        multResultArr.push(temp)
    }

    resultPoint.setPoint(multResultArr[0], multResultArr[1], multResultArr[2])

    return resultPoint

}

export const multMatrix4x4 = (matrix1, matrix2) => {
    const resultMatrix = new Matrix()
    
    for(let rowIndex = 0; rowIndex < 4; rowIndex++){
        let rowHolder = []

        for(let colIndex = 0; colIndex < 4; colIndex++){
            let temp = 0
            for(let multIndex = 0; multIndex < 4; multIndex++){
                temp += matrix1.matrix[rowIndex][multIndex] * matrix2.matrix[multIndex][colIndex]
            }
            rowHolder.push(temp)
        }

        resultMatrix.setRow(rowIndex, rowHolder)
    }

    return resultMatrix

}