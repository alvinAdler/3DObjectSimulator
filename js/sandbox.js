import Point from './classes/Point.js'
import Edge from './classes/Edge.js'
import Surface from './classes/Surface.js'
import Pyramid from './classes/Pyramid.js'
import SETTower from './classes/SETTower.js'
import SETBrick from './classes/SETBrick.js'

import { drawLine } from './functions.js'

window.onload = () => {
    const fillPolyButton = document.querySelector("#fill-polygons")
    const canvas = document.querySelector("#sandbox-canvas")
    const context = canvas.getContext("2d")

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const pyramid1_setTower = new SETTower()

    let pyramid1_point1 = new Point(100, 100, 0)
    let pyramid1_point2 = new Point(200, 400, 0)
    let pyramid1_point3 = new Point(300, 150, 0)

    let pyramid2_point1 = new Point(350, 125, 0)
    let pyramid2_point2 = new Point(425, 250, 0)
    let pyramid2_point3 = new Point(500, 125, 0)

    let pyramid3_point1 = new Point(500, 300, 0)
    let pyramid3_point2 = new Point(350, 400, 0)
    let pyramid3_point3 = new Point(650, 400, 0)

    let edge1 = new Edge(0, 1)
    let edge2 = new Edge(1, 2)
    let edge3 = new Edge(2, 0)

    let pyramid1_vertices = [pyramid1_point1, pyramid1_point2, pyramid1_point3]
    let pyramid2_vertices = [pyramid2_point1, pyramid2_point2, pyramid2_point3]
    let pyramid3_vertices = [pyramid3_point1, pyramid3_point2, pyramid3_point3]
    let pyramid_edges = [edge1, edge2, edge3]

    let surfaces = new Surface([0, 1, 2], "red")

    let pyramid1 = new Pyramid(canvas, context, pyramid1_vertices, pyramid_edges, [surfaces])
    let pyramid2 = new Pyramid(canvas, context, pyramid2_vertices, pyramid_edges, [surfaces])
    let pyramid3 = new Pyramid(canvas, context, pyramid3_vertices, pyramid_edges, [surfaces])

    for(let edge of pyramid1.edges){
        let point1 = pyramid1.vertices[edge.indexStart]
        let point2 = pyramid1.vertices[edge.indexEnd]

        let setBrick = new SETBrick(point1, point2)

        pyramid1_setTower.pushSetBrick(setBrick)
    }

    console.log(pyramid1_setTower)

    for(let edge of pyramid1.edges){
        let point1 = pyramid1.vertices[edge.indexStart]
        let point2 = pyramid1.vertices[edge.indexEnd]

        drawLine(context, point1, point2, "red")
    }
    
    for(let edge of pyramid2.edges){
        let point1 = pyramid2.vertices[edge.indexStart]
        let point2 = pyramid2.vertices[edge.indexEnd]

        drawLine(context, point1, point2, "blue")
    }

    for(let edge of pyramid3.edges){
        let point1 = pyramid3.vertices[edge.indexStart]
        let point2 = pyramid3.vertices[edge.indexEnd]

        drawLine(context, point1, point2, "green")
    }


    fillPolyButton.addEventListener("click", () => {
        console.log("Filling polygons...")
        console.log(pyramid1)
        console.log("==========================")
        console.log(pyramid2)
    })
}