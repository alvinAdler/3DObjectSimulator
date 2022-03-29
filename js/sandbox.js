import Point from './classes/Point.js'

import { drawLine } from './functions.js'

window.onload = () => {
    const drawLinesButton = document.querySelector("#draw-lines")

    const canvas = document.querySelector("#sandbox-canvas")
    const context = canvas.getContext("2d")

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let point1 = new Point(100, 100, 0)
    let point2 = new Point(300, 100, 0)

    let point3 = new Point(400, 100, 0)
    let point4 = new Point(600, 300, 0)

    drawLine(context, point1, point2, "red")
    drawLine(context, point3, point4, "blue")    

    drawLinesButton.addEventListener("click", () => {
        drawLine(context, point1, point2, "red")
        drawLine(context, point3, point4, "blue")
    })
    
}