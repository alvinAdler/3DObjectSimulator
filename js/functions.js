import Matrix from "./classes/Matrix.js"
import Point from "./classes/Point.js"
import Vector from "./classes/Vector.js"

export const clearCanvas = (context, canvas) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

export const degToRad = (deg) => {
    return deg * 3.14 / 180
}

export const findCos = (deg) => {
    return Math.cos(degToRad(deg))
}

export const findSin = (deg) => {
    return Math.sin(degToRad(deg))
}

export const findVector = (point1, point2) => {
    return new Vector(point2.x - point1.x, point2.y - point1.y, point2.z - point1.z)
}

export const findDotProduct = (vector1, vector2) => {
    return (vector1.x * vector2.x) + (vector1.y * vector2.y) + (vector1.z * vector2.z)
}

export const findCrossProduct = (vector1, vector2) => {
    const resultVector = new Vector()

    const resultX = (vector1.y * vector2.z) - (vector2.y * vector1.z)
    const resultY = (vector1.z * vector2.x) - (vector2.z * vector1.x)
    const resultZ = (vector1.x * vector2.y) - (vector2.x * vector1.y)

    resultVector.setVector(resultX, resultY, resultZ)

    return resultVector
}

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

    resultPoint.setPoint(multResultArr[0], multResultArr[1], multResultArr[2], multResultArr[3])

    if(resultPoint.w !== 1){
        resultPoint.normalizeW()
    }

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

export const findCentroid = (listOfVertices) => {
    let centX = 0, centY = 0, centZ = 0

    for(let vertex of listOfVertices){
        centX += vertex.x
        centY += vertex.y
        centZ += vertex.z
    }

    centX /= listOfVertices.length
    centY /= listOfVertices.length
    centZ /= listOfVertices.length

    return {centX, centY, centZ}
}

export const findRotationMatrix = (centroids, rotationMatrix) => {
    let adjustMatrix1 = new Matrix([[1, 0, 0, 0],
                                    [0, 1, 0, 0],
                                    [0, 0, 1, 0],
                                    [-centroids.centX, -centroids.centY, -centroids.centZ, 1]])

    let adjustMatrix2 = new Matrix([[1, 0, 0, 0],
                                    [0, 1, 0, 0],
                                    [0, 0, 1, 0],
                                    [centroids.centX, centroids.centY, centroids.centZ, 1]])

    let result = multMatrix4x4(multMatrix4x4(adjustMatrix1, rotationMatrix), adjustMatrix2)

    return result
}