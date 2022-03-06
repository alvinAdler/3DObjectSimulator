import Point from './classes/Point.js'
import Edge from './classes/Edge.js'
import Matrix from './classes/Matrix.js'
import Pyramid from './classes/Pyramid.js'

import { clearCanvas, findCos, findSin, degToRad } from './functions.js'

const TRANSLATE_X = 0.05
const TRANSLATE_Y = 0.05

const ELEV_DEG = 0
const DIR_DEG = 0

const ROT_DEG = 1

window.onload = () => {
    const mainCanvas = document.querySelector("#main-canvas")
    const context = mainCanvas.getContext("2d")
    let manipulationSelections = document.querySelectorAll("input[name='manipulation-method']")
    let manipulationMethod = document.querySelector("input[name='manipulation-method']:checked").value

    mainCanvas.width = mainCanvas.offsetWidth
    mainCanvas.height = mainCanvas.offsetHeight

    let pyramid1_v0 = new Point(-1, -1, 1)
    let pyramid1_v1 = new Point(0, -1, -1)
    let pyramid1_v2 = new Point(1, -1, 1)
    let pyramid1_v3 = new Point(0, 1, 0)

    let pyramid1_e0 = new Edge(0, 3)
    let pyramid1_e1 = new Edge(3, 2)
    let pyramid1_e2 = new Edge(2, 0)
    let pyramid1_e3 = new Edge(0, 1)
    let pyramid1_e4 = new Edge(1, 2)
    let pyramid1_e5 = new Edge(1, 3)

    let pyramid1_listOfVertices = [pyramid1_v0, pyramid1_v1, pyramid1_v2, pyramid1_v3]
    let pyramid1_listOfEdges = [pyramid1_e0, pyramid1_e1, pyramid1_e2, pyramid1_e3, pyramid1_e4, pyramid1_e5]

    let pyramid1 = new Pyramid(mainCanvas, context, pyramid1_listOfVertices, pyramid1_listOfEdges)

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
    
    //* Small world
    // let st = new Matrix([[175, 0, 0, 0],
    //                     [0, -87.5, 0, 0],
    //                     [0, 0, 0, 0],
    //                     [700, 350, 0, 1]])
      
    //* Big world
    let st = new Matrix([[87.5, 0, 0, 0],
                        [0, -87.5, 0, 0],
                        [0, 0, 0, 0],
                        [700, 350, 0, 1]])

    
    pyramid1.initPyramid(wt, vt, st)

    window.addEventListener("keydown", (ev) => {
        const key = document.querySelector(`#button-${ev.key}`)
    
        if(!key){
            return
        }

        clearCanvas(context, mainCanvas)
    
        key.style.backgroundColor = "white"
        key.style.color = "#EB4034"

        console.log(ev.key)

        switch(manipulationMethod){
            case "translation":
                switch(ev.key){
                    case "a":
                        wt.setRow(3, [-TRANSLATE_X, 0, 0, 1])
                        pyramid1.drawPyramid(wt, vt, st)
                        break;
                    case "w":
                        wt.setRow(3, [0, TRANSLATE_Y, 0, 1])
                        pyramid1.drawPyramid(wt, vt, st)
                        break;
                    case "s":
                        wt.setRow(3, [0, -TRANSLATE_Y, 0, 1])
                        pyramid1.drawPyramid(wt, vt, st)
                        break;
                    case "d":
                        wt.setRow(3, [TRANSLATE_X, 0, 0, 1])
                        pyramid1.drawPyramid(wt, vt, st)
                        break;
                    case "j":
                        break;
                    case "i":
                        break;
                    case "k":
                        break;
                    case "l":
                        break;    
                }
                break;
            case "rotation":
                switch(ev.key){
                    case "a":
                        wt.setMatrix([[findCos(ROT_DEG), 0, -findSin(ROT_DEG), 0],
                                    [0, 1, 0, 0],
                                    [findSin(ROT_DEG), 0, findCos(ROT_DEG), 0],
                                    [0, 0, 0, 1]])
                        pyramid1.drawPyramid(wt, vt, st)
                        break;

                        case "w":
                            wt.setMatrix([[1, 0, 0, 0],
                                [0, findCos(ROT_DEG), findSin(ROT_DEG), 0],
                                [0, -findSin(ROT_DEG), findCos(ROT_DEG)],
                                    [0, 0, 0, 1]])

                        pyramid1.drawPyramid(wt, vt, st)
                        break;

                    case "s":
                        wt.setMatrix([[1, 0, 0, 0],
                            [0, findCos(-ROT_DEG), findSin(-ROT_DEG), 0],
                            [0, -findSin(-ROT_DEG), findCos(-ROT_DEG)],
                            [0, 0, 0, 1]])

                        pyramid1.drawPyramid(wt, vt, st)
                        break;

                    case "d":
                        wt.setMatrix([[findCos(-ROT_DEG), 0, -findSin(-ROT_DEG), 0],
                                    [0, 1, 0, 0],
                                    [findSin(-ROT_DEG), 0, findCos(-ROT_DEG), 0],
                                    [0, 0, 0, 1]])
                        pyramid1.drawPyramid(wt, vt, st)
                        break;

                    case "j":
                        break;
                    case "i":
                        break;
                    case "k":
                        break;
                    case "l":
                        break;    
                }
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