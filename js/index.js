import Point from './classes/Point.js'
import Edge from './classes/Edge.js'
import Matrix from './classes/Matrix.js'
import Pyramid from './classes/Pyramid.js'
import Vector from './classes/Vector.js'

import { clearCanvas, findCos, findSin, findCentroid, findRotationMatrix } from './functions.js'
import Surface from './classes/Surface.js'

const TRANSLATE = 0.05

const ROT_DEG = 1

const CONTROLLER_KEYS = ["a", "w", "s", "d", "q", "e", "j", "i", "k", "l", "u", "o"]

const USER_LOCATION = new Vector(0, 0, 5)

window.onload = () => {

    const drawPyramids = (listOfPyramids) => {
        for(let pyramid of listOfPyramids){
            pyramid.determineFrontSurfaces(USER_LOCATION)
            pyramid.drawSolid(context)
            // pyramid.drawWireframe(context)
        }
    }

    const mainCanvas = document.querySelector("#main-canvas")
    const context = mainCanvas.getContext("2d")
    let manipulationSelections = document.querySelectorAll("input[name='manipulation-method']")
    let manipulationMethod = document.querySelector("input[name='manipulation-method']:checked").value

    const devButton = document.querySelector("#dev-button")
    const verticesScreenButton = document.querySelector("#vertices-screen-button")

    mainCanvas.width = mainCanvas.offsetWidth
    mainCanvas.height = mainCanvas.offsetHeight

    let pyramid1_v0 = new Point(-5, -1, 1)
    let pyramid1_v1 = new Point(-4, -1, -1)
    let pyramid1_v2 = new Point(-3, -1, 1)
    let pyramid1_v3 = new Point(-4, 1, 0)

    let pyramid2_v0 = new Point(3, -1, 1)
    let pyramid2_v1 = new Point(4, -1, -1)
    let pyramid2_v2 = new Point(5, -1, 1)
    let pyramid2_v3 = new Point(4, 1, 0)

    let pyramid_e0 = new Edge(3, 0)
    let pyramid_e1 = new Edge(2, 3)
    let pyramid_e2 = new Edge(0, 2)
    let pyramid_e3 = new Edge(0, 1)
    let pyramid_e4 = new Edge(1, 2)
    let pyramid_e5 = new Edge(1, 3)

    let pyramid1_s0 = new Surface([0, 2, 1], "red")
    let pyramid1_s1 = new Surface([1, 4, 5], "blue")
    let pyramid1_s2 = new Surface([5, 3, 0], "green")
    let pyramid1_s3 = new Surface([3, 4, 2], "yellow")

    let pyramid2_s0 = new Surface([0, 2, 1], "lightred")
    let pyramid2_s1 = new Surface([1, 4, 5], "lightblue")
    let pyramid2_s2 = new Surface([5, 3, 0], "lightgreen")
    let pyramid2_s3 = new Surface([3, 4, 2], "lightyellow")

    let pyramid1_listOfVertices = [pyramid1_v0, pyramid1_v1, pyramid1_v2, pyramid1_v3]
    let pyramid2_listOfVertices = [pyramid2_v0, pyramid2_v1, pyramid2_v2, pyramid2_v3]

    let pyramid_listOfEdges = [pyramid_e0, pyramid_e1, pyramid_e2, pyramid_e3, pyramid_e4, pyramid_e5]

    let pyramid1_listOfSurfaces = [pyramid1_s0, pyramid1_s1, pyramid1_s2, pyramid1_s3]
    let pyramid2_listOfSurfaces = [pyramid2_s0, pyramid2_s1, pyramid2_s2, pyramid2_s3]

    let pyramid1 = new Pyramid(mainCanvas, context, pyramid1_listOfVertices, pyramid_listOfEdges, pyramid1_listOfSurfaces)
    let pyramid2 = new Pyramid(mainCanvas, context, pyramid2_listOfVertices, pyramid_listOfEdges, pyramid2_listOfSurfaces)

    let wt = new Matrix([[1, 0, 0, 0], 
                        [0, 1, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]])

    let vt = new Matrix([[1, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 1, -1/USER_LOCATION.z],
                        [0, 0, 0, 1]])

                        
    let st = new Matrix([[87.5, 0, 0, 0],
                        [0, -87.5, 0, 0],
                        [0, 0, 87.5, 0],
                        [700, 350, 0, 1]])

    
    pyramid1.initPyramid(wt, vt, st)
    pyramid2.initPyramid(wt, vt, st)

    clearCanvas(context, mainCanvas)

    drawPyramids([pyramid1, pyramid2])

    window.addEventListener("keydown", (ev) => {
        const key = document.querySelector(`#button-${ev.key}`)
    
        if(!key || !CONTROLLER_KEYS.includes(ev.key)){
            return
        }

        clearCanvas(context, mainCanvas)
    
        key.style.backgroundColor = "white"
        key.style.color = "#EB4034"

        switch(manipulationMethod){
            case "translation":

                if(CONTROLLER_KEYS.slice(0, 6).includes(ev.key)){
                    switch(ev.key){
                        case "a":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [-TRANSLATE, 0, 0, 1]
                            ])
                            break;
                        case "w":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [0, TRANSLATE, 0, 1]
                            ])
                            break;
                        case "s":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [0, -TRANSLATE, 0, 1]
                            ])
                            break;
                        case "d":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [TRANSLATE, 0, 0, 1]
                            ])
                            break;
                        case "q":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, -TRANSLATE, 1]
                            ])
                            break;
                        case "e":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, TRANSLATE, 1]
                            ])
                            break;
                    }

                    pyramid1.transformPyramid(wt, vt, st)

                }
                else if(CONTROLLER_KEYS.slice(6, 12)){
                    switch(ev.key){
                        case "j":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [-TRANSLATE, 0, 0, 1]
                            ])
                            break;
                        case "i":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [0, TRANSLATE, 0, 1]
                            ])
                            break;
                        case "k":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [0, -TRANSLATE, 0, 1]
                            ])
                            break;
                        case "l":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [TRANSLATE, 0, 0, 1]
                            ])
                            break;
                        case "u":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, -TRANSLATE, 1]
                            ])
                            break;
                        case "o":
                            wt.setMatrix([
                                [1, 0, 0, 0],
                                [0, 1, 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, TRANSLATE, 1]
                            ])
                            break
                    }

                    pyramid2.transformPyramid(wt, vt, st)

                }

                drawPyramids([pyramid1, pyramid2])
                
                break;

            case "rotation":

                if(CONTROLLER_KEYS.slice(0, 6).includes(ev.key)){
                    
                    let centroids = findCentroid(pyramid1.verticesWorld)
                    let rotationMatrix, finalMatrix

                    switch(ev.key){
                        case "a":

                            rotationMatrix = new Matrix([
                                [findCos(-ROT_DEG), 0, -findSin(-ROT_DEG), 0],
                                [0, 1, 0, 0],
                                [findSin(-ROT_DEG), 0, findCos(-ROT_DEG), 0],
                                [0, 0, 0, 1]
                            ])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)

                            wt.setMatrix(finalMatrix.matrix)
                            break;

                        case "w":

                            rotationMatrix = new Matrix([
                                [1, 0, 0, 0],
                                [0, findCos(-ROT_DEG), findSin(-ROT_DEG), 0],
                                [0, -findSin(-ROT_DEG), findCos(-ROT_DEG), 0],
                                [0, 0, 0, 1]
                            ])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)

                            wt.setMatrix(finalMatrix.matrix)
                            break;

                        case "s":

                            rotationMatrix = new Matrix([
                                [1, 0, 0, 0],
                                [0, findCos(ROT_DEG), findSin(ROT_DEG), 0],
                                [0, -findSin(ROT_DEG), findCos(ROT_DEG), 0],
                                [0, 0, 0, 1]
                            ])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)

                            wt.setMatrix(finalMatrix.matrix)
                            break;

                        case "d":

                            rotationMatrix = new Matrix([
                                [findCos(ROT_DEG), 0, -findSin(ROT_DEG), 0],
                                [0, 1, 0, 0],
                                [findSin(ROT_DEG), 0, findCos(ROT_DEG), 0],
                                [0, 0, 0, 1]
                            ])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)
                            wt.setMatrix(finalMatrix.matrix)
                            break;

                        case "q":
                            
                            rotationMatrix = new Matrix([
                                [findCos(ROT_DEG), findSin(ROT_DEG), 0, 0],
                                [-findSin(ROT_DEG), findCos(ROT_DEG), 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, 0, 1]
                            ])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)
                            wt.setMatrix(finalMatrix.matrix)
                            break;

                        case "e":

                            rotationMatrix = new Matrix([
                                [findCos(-ROT_DEG), findSin(-ROT_DEG), 0, 0],
                                [-findSin(-ROT_DEG), findCos(-ROT_DEG), 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, 0, 1]
                            ])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)
                            wt.setMatrix(finalMatrix.matrix)
                            break;
                        
                    }

                    pyramid1.transformPyramid(wt, vt, st)

                }
                else if(CONTROLLER_KEYS.slice(6, 12).includes(ev.key)){

                    let centroids = findCentroid(pyramid2.verticesWorld)
                    let rotationMatrix, finalMatrix
                    
                    switch(ev.key){
                        case "j":

                            rotationMatrix = new Matrix([
                                [findCos(-ROT_DEG), 0, -findSin(-ROT_DEG), 0],
                                [0, 1, 0, 0],
                                [findSin(-ROT_DEG), 0, findCos(-ROT_DEG), 0],
                                [0, 0, 0, 1]])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)

                            wt.setMatrix(finalMatrix.matrix)

                            break;

                        case "i":

                            rotationMatrix = new Matrix([
                                [1, 0, 0, 0],
                                [0, findCos(-ROT_DEG), findSin(-ROT_DEG), 0],
                                [0, -findSin(-ROT_DEG), findCos(-ROT_DEG), 0],
                                [0, 0, 0, 1]])
                            
                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)

                            wt.setMatrix(finalMatrix.matrix)

                            break;

                        case "k":

                            rotationMatrix = new Matrix([
                                [1, 0, 0, 0],
                                [0, findCos(ROT_DEG), findSin(ROT_DEG), 0],
                                [0, -findSin(ROT_DEG), findCos(ROT_DEG), 0],
                                [0, 0, 0, 1]
                            ])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)

                            wt.setMatrix(finalMatrix.matrix)

                            break;

                        case "l":

                            rotationMatrix = new Matrix([
                                [findCos(ROT_DEG), 0, -findSin(ROT_DEG), 0],
                                [0, 1, 0, 0],
                                [findSin(ROT_DEG), 0, findCos(ROT_DEG), 0],
                                [0, 0, 0, 1]
                            ])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)

                            wt.setMatrix(finalMatrix.matrix)

                            break;

                        case "u":

                            rotationMatrix = new Matrix([
                                [findCos(ROT_DEG), findSin(ROT_DEG), 0, 0],
                                [-findSin(ROT_DEG), findCos(ROT_DEG), 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, 0, 1]
                            ])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)

                            wt.setMatrix(finalMatrix.matrix)

                            break;

                        case "o":

                            rotationMatrix = new Matrix([
                                [findCos(-ROT_DEG), findSin(-ROT_DEG), 0, 0],
                                [-findSin(-ROT_DEG), findCos(-ROT_DEG), 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, 0, 1]
                            ])

                            finalMatrix = findRotationMatrix(centroids, rotationMatrix)

                            wt.setMatrix(finalMatrix.matrix)

                            break; 
                    }

                    pyramid2.transformPyramid(wt, vt, st)

                }

                drawPyramids([pyramid1, pyramid2])            
    
                break;


            default:
                console.error("Unrecognized manipulation method")
        }
    })
    
    window.addEventListener("keyup", (ev) => {
    
        const key = document.querySelector(`#button-${ev.key}`)
    
        if(!key){
            return
        }
        
        key.style.backgroundColor = "#EB4034"
        key.style.color = "white"
    })

    devButton.addEventListener("click", () => {
        const buttonsHolder = document.querySelector(".dev-action-buttons")

        if(window.getComputedStyle(buttonsHolder).display === "none"){
            buttonsHolder.style.display = "flex"
        }else{
            buttonsHolder.style.display = "none"
        }
    })

    verticesScreenButton.addEventListener("click", () => {
        console.log("Pyramid1")
        console.log(pyramid1.verticesScreen)

        console.log("========================")

        console.log("Pyramid2")
        console.log(pyramid2.verticesScreen)
    })

    const handleChangeManipulation = (ev) => {
        manipulationMethod = ev.target.value
    }

    for(let radioButton of manipulationSelections){
        radioButton.addEventListener("change", (ev) => handleChangeManipulation(ev))
    }

}