import Point from './classes/Point.js'
import PlaneEquation from './classes/PlaneEquation.js'

import { drawLine, findIntersectionX } from './functions.js'

window.onload = () => {
    const drawLinesButton = document.querySelector("#draw-lines")

    const canvas = document.querySelector("#sandbox-canvas")
    const context = canvas.getContext("2d")

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const point1 = new Point(10, 0, -40)
    const point2 = new Point(15, 10, -15)

    const planeEquation1 = new PlaneEquation(-900, 0, 600, point1)
    const planeEquation2 = new PlaneEquation(250, -75, 100, point2)

    const intersectionX = findIntersectionX(planeEquation1, planeEquation2, 12)

    console.log(`The intersection is: ${intersectionX}`)
    
}