import Point from './classes/Point.js'
import Edge from './classes/Edge.js'
import Matrix from './classes/Matrix.js'
import Pyramid from './classes/Pyramid.js'

import { drawLine, transformPoint, multMatrix4x4 } from './functions.js'

window.onload = () => {
    const mainCanvas = document.querySelector("#main-canvas")
    const context = mainCanvas.getContext("2d")
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

    let pyramid1 = new Pyramid(pyramid1_listOfVertices, pyramid1_listOfEdges)

    let wt = new Matrix([[1, 0, 0, 0], 
                        [0, 1, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]])

    let vt = new Matrix([[1, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0],
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

    
    for(let index=0; index < pyramid1.vertices.length; index++){
        pyramid1.addVerticesWorld(transformPoint(pyramid1.vertices[index], wt))
        pyramid1.addVerticesView(transformPoint(pyramid1.verticesWorld[index], vt))
        pyramid1.addVerticesScreen(transformPoint(pyramid1.verticesView[index], st))
    }


    for(let index=3; index < pyramid1.edges.length; index++){
        drawLine(context, pyramid1.verticesScreen[pyramid1.edges[index].indexStart], pyramid1.verticesScreen[pyramid1.edges[index].indexEnd])
    }
    
    for(let index=0; index < 3; index++){
        drawLine(context, pyramid1.verticesScreen[pyramid1.edges[index].indexStart], pyramid1.verticesScreen[pyramid1.edges[index].indexEnd], "#2285e4")
    }

    // drawLine(context, {x: 612.5, y: 350}, {x: 787.5, y: 350}, "#EB4034")

    // drawLine(context, {x: 612.5, y: 262.5}, {x: 787.5, y: 262.5}, "yellow")
    // drawLine(context, {x: 787.5, y: 262.5}, {x: 787.5, y: 437.5}, "yellow")
    // drawLine(context, {x: 787.5, y: 437.5}, {x: 612.5, y: 437.5}, "yellow")
    // drawLine(context, {x: 612.5, y: 437.5}, {x: 612.5, y: 262.5}, "yellow")
}

window.addEventListener("keydown", (ev) => {
    const key = document.querySelector(`#button-${ev.key}`)

    if(!key){
        return
    }

    key.style.backgroundColor = "white"
    key.style.color = "#EB4034"
})

window.addEventListener("keyup", (ev) => {

    const key = document.querySelector(`#button-${ev.key}`)

    if(!key){
        return
    }
    
    key.style.backgroundColor = "#EB4034"
    key.style.color = "white"
})