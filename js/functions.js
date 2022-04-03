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
    context.lineWidth = 2
    context.globalAlpha = 1

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

export const findCounterClockwiseVertices = (edge1, edge2, edge3) => {
    const indexAddHolder = [...Object.values(edge1), ...Object.values(edge2), ...Object.values(edge3)].reduce((curr, acc) => curr + acc, 0)

    switch(indexAddHolder){
        case 10:
            //surface 0
            return [3, 0, 2]
        case 12:
            //surface 1
            return [3, 2, 1]
        case 8:
            //surface 2
            return [3, 1, 0]
        case 6:
            //surface 3
            return [0, 1, 2]
    }
}

export const sortAel = (ael) => {
    let prevBrick;
    for(let outterIndex = 0; outterIndex < ael.length - 1; outterIndex++){

        for(let innerIndex = 0; innerIndex < ael.length - 1; innerIndex++){
            if(ael[innerIndex].xofymin > ael[innerIndex + 1].xofymin){
                [ael[innerIndex], ael[innerIndex + 1]] = [ael[innerIndex + 1], ael[innerIndex]]
            }
            if((ael[innerIndex].xofymin === ael[innerIndex + 1].xofymin) && prevBrick && ael[innerIndex + 1].brickColor === prevBrick.brickColor){
                [ael[innerIndex], ael[innerIndex + 1]] = [ael[innerIndex + 1], ael[innerIndex]]
            }

            prevBrick = ael[innerIndex]
        }
    }
}

export const isBrickIntersecting = (brick1, brick2) => {
    let action = {isIntersecting: false, color: ""}

    if((brick1.brick.point1.z >= brick2.brick.point1.z) && (brick1.brick.point2.z >= brick2.brick.point2.z)){
        action.color = brick1.brick.brickColor
    }
    else if((brick2.brick.point1.z >= brick1.brick.point1.z) && (brick2.brick.point2.z >= brick1.brick.point2.z)){
        action.color = brick2.brick.brickColor
    }
    else{
        action.isIntersecting = true
    }

    return action
}

export const findIntersectionX = (planeEquation1, planeEquation2, currentY) => {
    const m1 = -(planeEquation1.B * currentY) - planeEquation1.D
    const m2 = -(planeEquation2.B * currentY) - planeEquation2.D

    //Performing elimination process
    const newPlane1 = {
        A: planeEquation2.C * planeEquation1.A,
        C: planeEquation2.C * planeEquation1.C,
        M: m1 * planeEquation2.C
    }

    const newPlane2 = {
        A: planeEquation1.C * planeEquation2.A,
        C: planeEquation1.C * planeEquation2.C,
        M: m2 * planeEquation1.C
    }

    let resultM, resultA

    //Determining the elimination sign
    if(newPlane1.C < 0 || newPlane2.C < 0){
        //Take addition elimination method
        resultM = newPlane1.M + newPlane2.M
        resultA = newPlane1.A + newPlane2.A
    }
    else{
        //Take subtraction elimination method
        resultM = newPlane1.M - newPlane2.M
        resultA = newPlane1.A - newPlane2.A
    }

    return resultM / resultA
}