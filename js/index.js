import Point from './classes/Point.js'
import Edge from './classes/Edge.js'
import Matrix from './classes/Matrix.js'
import Pyramid from './classes/Pyramid.js'

import { clearCanvas, findCos, findSin, degToRad } from './functions.js'

const TRANSLATE = 0.05

const ELEV_DEG = 0
const DIR_DEG = 0

const ROT_DEG = 1

const CONTROLLER_KEYS = ["a", "w", "s", "d", "q", "e", "j", "i", "k", "l", "u", "o"]

window.onload = () => {

    const drawPyramids = (listOfPyramids) => {
        for(let pyramid of listOfPyramids){
            pyramid.drawPyramid()
        }
    }

    const mainCanvas = document.querySelector("#main-canvas")
    const context = mainCanvas.getContext("2d")
    let manipulationSelections = document.querySelectorAll("input[name='manipulation-method']")
    let manipulationMethod = document.querySelector("input[name='manipulation-method']:checked").value
    const listOfPyramids = []

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

    let pyramid_e0 = new Edge(0, 3)
    let pyramid_e1 = new Edge(3, 2)
    let pyramid_e2 = new Edge(2, 0)
    let pyramid_e3 = new Edge(0, 1)
    let pyramid_e4 = new Edge(1, 2)
    let pyramid_e5 = new Edge(1, 3)

    let pyramid1_listOfVertices = [pyramid1_v0, pyramid1_v1, pyramid1_v2, pyramid1_v3]
    let pyramid2_listOfVertices = [pyramid2_v0, pyramid2_v1, pyramid2_v2, pyramid2_v3]

    let pyramid_listOfEdges = [pyramid_e0, pyramid_e1, pyramid_e2, pyramid_e3, pyramid_e4, pyramid_e5]

    let pyramid1 = new Pyramid(mainCanvas, context, pyramid1_listOfVertices, pyramid_listOfEdges)
    let pyramid2 = new Pyramid(mainCanvas, context, pyramid2_listOfVertices, pyramid_listOfEdges)

    let wt = new Matrix([[1, 0, 0, 0], 
                        [0, 1, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]])

    // let vt = new Matrix([[1, 0, 0, 0],
    //                     [0, 1, 0, 0],
    //                     [0, 0, 0, 0],
    //                     [0, 0, 0, 1]])

    // let vt = new Matrix([[1, 0, 0, 0],
    //                     [0, 1, 0, 0],
    //                     [0, 0, 1, -0.2],
    //                     [0, 0, 0, 1]])

    let vt = new Matrix([[Math.cos(degToRad(DIR_DEG)), Math.sin(degToRad(DIR_DEG)) * Math.sin(degToRad(ELEV_DEG)), 0, 0],
                        [0, Math.cos(degToRad(ELEV_DEG)), 0, 0],
                        [Math.sin(degToRad(DIR_DEG)), -(Math.cos(degToRad(DIR_DEG))) * Math.sin(degToRad(ELEV_DEG)), 0, 0],
                        [0, 0, 0, 1]])

                        
    let st = new Matrix([[87.5, 0, 0, 0],
                        [0, -87.5, 0, 0],
                        [0, 0, 0, 0],
                        [700, 350, 0, 1]])

    
    pyramid1.initPyramid(wt, vt, st)
    pyramid2.initPyramid(wt, vt, st)

    window.addEventListener("keydown", (ev) => {
        const key = document.querySelector(`#button-${ev.key}`)
    
        if(!key || !CONTROLLER_KEYS.includes(ev.key)){
            return
        }

        clearCanvas(context, mainCanvas)

        console.log("I am executed")
    
        key.style.backgroundColor = "white"
        key.style.color = "#EB4034"

        switch(manipulationMethod){
            case "translation":

                if(CONTROLLER_KEYS.slice(0, 6).includes(ev.key)){
                    switch(ev.key){
                        case "a":
                            wt.setRow(3, [-TRANSLATE, 0, 0, 1])
                            break;
                        case "w":
                            wt.setRow(3, [0, TRANSLATE, 0, 1])
                            break;
                        case "s":
                            wt.setRow(3, [0, -TRANSLATE, 0, 1])
                            break;
                        case "d":
                            wt.setRow(3, [TRANSLATE, 0, 0, 1])
                            break;
                        case "q":
                            wt.setRow(3, [0, 0, -TRANSLATE, 1])
                            break;
                        case "e":
                            wt.setRow(3, [0, 0, TRANSLATE, 1])
                            break;
                    }

                    pyramid1.transformPyramid(wt, vt, st)

                }
                else if(CONTROLLER_KEYS.slice(6, 12)){
                    switch(ev.key){
                        case "j":
                            wt.setRow(3, [-TRANSLATE, 0, 0, 1])
                            break;
                        case "i":
                            wt.setRow(3, [0, TRANSLATE, 0, 1])
                            break;
                        case "k":
                            wt.setRow(3, [0, -TRANSLATE, 0, 1])
                            break;
                        case "l":
                            wt.setRow(3, [TRANSLATE, 0, 0, 1])
                            break;
                        case "u":
                            wt.setRow(3, [0, 0, -TRANSLATE, 1])
                            break;
                        case "o":
                            wt.setRow(3, [0, 0, TRANSLATE, 1])
                            break
                    }

                    pyramid2.transformPyramid(wt, vt, st)

                }

                drawPyramids([pyramid1, pyramid2])
                
                break;

            case "rotation":

                if(CONTROLLER_KEYS.slice(0, 6).includes(ev.key)){
                    switch(ev.key){
                        case "a":
                            wt.setMatrix([[findCos(ROT_DEG), 0, -findSin(ROT_DEG), 0],
                                        [0, 1, 0, 0],
                                        [findSin(ROT_DEG), 0, findCos(ROT_DEG), 0],
                                        [0, 0, 0, 1]])
                            break;

                        case "w":
                            wt.setMatrix([[1, 0, 0, 0],
                                        [0, findCos(ROT_DEG), findSin(ROT_DEG), 0],
                                        [0, -findSin(ROT_DEG), findCos(ROT_DEG)],
                                        [0, 0, 0, 1]])
                            break;

                        case "s":
                            wt.setMatrix([[1, 0, 0, 0],
                                        [0, findCos(-ROT_DEG), findSin(-ROT_DEG), 0],
                                        [0, -findSin(-ROT_DEG), findCos(-ROT_DEG)],
                                        [0, 0, 0, 1]])
                            break;

                        case "d":
                            wt.setMatrix([[findCos(-ROT_DEG), 0, -findSin(-ROT_DEG), 0],
                                        [0, 1, 0, 0],
                                        [findSin(-ROT_DEG), 0, findCos(-ROT_DEG), 0],
                                        [0, 0, 0, 1]])
                            break;

                        case "q":

                            wt.setMatrix([[findCos(-ROT_DEG), findSin(-ROT_DEG), 0, 0],
                                        [-findSin(-ROT_DEG), findCos(-ROT_DEG), 0, 0],
                                        [0, 0, 1, 0],
                                        [0, 0, 0, 1]])

                            break;

                        case "e":
                            wt.setMatrix([[findCos(ROT_DEG), findSin(ROT_DEG), 0, 0],
                                        [-findSin(ROT_DEG), findCos(ROT_DEG), 0, 0],
                                        [0, 0, 1, 0],
                                        [0, 0, 0, 1]])
                            break;
                        
                    }

                    pyramid1.transformPyramid(wt, vt, st)

                }
                else if(CONTROLLER_KEYS.slice(6, 12).includes(ev.key)){
                    switch(ev.key){
                        case "j":
                            wt.setMatrix([[findCos(ROT_DEG), 0, -findSin(ROT_DEG), 0],
                                        [0, 1, 0, 0],
                                        [findSin(ROT_DEG), 0, findCos(ROT_DEG), 0],
                                        [0, 0, 0, 1]])
                            break;

                        case "i":
                            wt.setMatrix([[1, 0, 0, 0],
                                        [0, findCos(ROT_DEG), findSin(ROT_DEG), 0],
                                        [0, -findSin(ROT_DEG), findCos(ROT_DEG)],
                                        [0, 0, 0, 1]])
                            break;

                        case "k":
                            wt.setMatrix([[1, 0, 0, 0],
                                        [0, findCos(-ROT_DEG), findSin(-ROT_DEG), 0],
                                        [0, -findSin(-ROT_DEG), findCos(-ROT_DEG)],
                                        [0, 0, 0, 1]])
                            break;

                        case "l":
                            wt.setMatrix([[findCos(-ROT_DEG), 0, -findSin(-ROT_DEG), 0],
                                        [0, 1, 0, 0],
                                        [findSin(-ROT_DEG), 0, findCos(-ROT_DEG), 0],
                                        [0, 0, 0, 1]])
                            break;

                        case "u":

                            wt.setMatrix([[findCos(-ROT_DEG), findSin(-ROT_DEG), 0, 0],
                                        [-findSin(-ROT_DEG), findCos(-ROT_DEG), 0, 0],
                                        [0, 0, 1, 0],
                                        [0, 0, 0, 1]])

                            break;

                        case "o":
                            wt.setMatrix([[findCos(ROT_DEG), findSin(ROT_DEG), 0, 0],
                                        [-findSin(ROT_DEG), findCos(ROT_DEG), 0, 0],
                                        [0, 0, 1, 0],
                                        [0, 0, 0, 1]])
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

    const handleChangeManipulation = (ev) => {
        manipulationMethod = ev.target.value
    }

    for(let radioButton of manipulationSelections){
        radioButton.addEventListener("change", (ev) => handleChangeManipulation(ev))
    }
}