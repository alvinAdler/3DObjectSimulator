import Point from './classes/Point.js'
import Edge from './classes/Edge.js'
import Matrix from './classes/Matrix.js'
import Pyramid from './classes/Pyramid.js'
import Vector from './classes/Vector.js'
import SetTower from './classes/SETTower.js'
import FlagTable from './classes/FlagTable.js'

import { clearCanvas, findCos, findSin, findCentroid, findRotationMatrix, drawLine, sortAel, isBrickIntersecting, findIntersectionX, findSt } from './functions.js'
import Surface from './classes/Surface.js'
import PlaneEquation from './classes/PlaneEquation.js'

const TRANSLATE = 0.05

const ROT_DEG = 1

const CONTROLLER_KEYS = ["a", "w", "s", "d", "q", "e", "j", "i", "k", "l", "u", "o"]

const USER_LOCATION = new Vector(0, 0, 5)

const WORLD_SIZE = {width: 16, height: 8}

window.onload = () => {

    const fillGlobalAEL = (globalTower, context, listOfPyramids) => {
        globalTower.setTowerList.sort((item1, item2) => item1.ymin - item2.ymin)

        let minimumY = Math.min.apply(Math, globalTower.setTowerList.map((brick) => brick.ymin))
        let maximumY = Math.max.apply(Math, globalTower.setTowerList.map((brick) => brick.ymax))

        globalTower.ael = globalTower.setTowerList.filter((brick) => Math.round(brick.ymin) === Math.round(minimumY))

        sortAel(globalTower.ael)

        try{
            for(let currentY=minimumY+1; Math.round(currentY) < Math.round(maximumY); currentY++){

                //Remove the expired bricks
                globalTower.ael = globalTower.ael.filter((brick) => (Math.round(brick.ymax) !== Math.round(currentY)) && brick.ymax !== brick.ymin)
    
                //Update the xofymin of the bricks
                for(let index = 0; index < globalTower.ael.length; index++){
                    let currentxofymin = globalTower.ael[index].xofymin
                    let dxdy = globalTower.ael[index].dxdy
    
                    globalTower.ael[index].setxofymin(currentxofymin + dxdy)
                }
    
                //Push new bricks
                for(let newBrick of globalTower.setTowerList){
                    if((Math.round(newBrick.ymin) === Math.round(currentY)) && (Math.round(newBrick.ymin) !== Math.round(newBrick.ymax))){
                        globalTower.ael.push(newBrick)
                    }
                }

                if(globalTower.ael.length === 0){
                    continue
                }
    
                //Sort the ael
                sortAel(globalTower.ael)
                
                //Generate the flag table
                const flags = new FlagTable(globalTower.ael)
                flags.generateTable()

                // console.log(flags)

                const tableWidth = flags.table[Object.keys(flags.table)[0]].content.length
                
                //Process the spans based on the generated flag table
                for(let flagIndex = 0; flagIndex < tableWidth - 1; flagIndex++){
                    let activeFlag = []
                    let brickHolder = []

                    for(let flagKey of Object.keys(flags.table)){
                        if(flags.table[flagKey].content[flagIndex]){
                            activeFlag.push(flagKey)
                            brickHolder.push(flags.table[flagKey])
                            continue
                        }
                    }
    
                    if(brickHolder.length === 1){
                        let point1 = new Point(Math.round(globalTower.ael[flagIndex - 1].xofymin), Math.round(currentY), 0)
                        let point2 = new Point(Math.round(globalTower.ael[flagIndex].xofymin), Math.round(currentY), 0)
    
                        drawLine(context, point1, point2, brickHolder[0].brick.brickColor)
                    }
                    else if(brickHolder.length === 2){

                        let brick1 = brickHolder[0]
                        let brick2 = brickHolder[1]
                        let action = isBrickIntersecting(brick1, brick2)

                        const pyramidsHolder = {
                            "Pyramid1": listOfPyramids[0],
                            "Pyramid2": listOfPyramids[1]
                        }

                        if(action.isIntersecting){
                            let planeEquation1 = undefined
                            let planeEquation2 = undefined

                            let currentPyramid = pyramidsHolder[brick1.brick.belongToPyramid]

                            //Finding the surface of brick1
                            for(let surface of currentPyramid.frontSurfaces){
                                if(surface.surfColor === brick1.brick.brickColor){
                                    //Getting the plane equation of that surface
                                    planeEquation1 = surface.planeEquation
                                }
                            }

                            currentPyramid = pyramidsHolder[brick2.brick.belongToPyramid]

                            //Finding the surface of brick2
                            for(let surface of currentPyramid.frontSurfaces){
                                if(surface.surfColor === brick2.brick.brickColor){
                                    //Getting the plane equation of that surface
                                    planeEquation2= surface.planeEquation
                                }
                            }

                            let interSectionX = findIntersectionX(planeEquation1, planeEquation2, currentY)

                            let point1 = new Point(Math.round(globalTower.ael[flagIndex - 1].xofymin), Math.round(currentY), 0)
                            let point2 = new Point(Math.round(interSectionX), Math.round(currentY), 0)
                            let point3 = new Point(Math.round(globalTower.ael[flagIndex].xofymin), Math.round(currentY), 0)

                            drawLine(context, point1, point2, brick1.brick.brickColor)
                            drawLine(context, point2, point3, brick2.brick.brickColor)
                        }
                        else{
                            let point1 = new Point(Math.round(globalTower.ael[flagIndex - 1].xofymin), Math.round(currentY), 0)
                            let point2 = new Point(Math.round(globalTower.ael[flagIndex].xofymin), Math.round(currentY), 0)

                            drawLine(context, point1, point2, action.color)
                        }
                    }
                    else if(brickHolder.length > 2){
                        console.log("More than 2")
                    }
                }

                // globalTower.ael.filter((brick) => !(brick.ymax > currentY))
            }
        }
        catch(err){
            console.log(err)
            console.log(globalTower)
            console.log("===============================================")
            console.log("===============================================")
        }

    }

    const drawPyramids = (listOfPyramids, globalTower) => {

        //Clear the tower
        globalTower.clearTower()

        //Determine the front surfaces
        for(let pyramid of listOfPyramids){
            pyramid.determineFrontSurfaces(USER_LOCATION)
            pyramid.drawSolid(context)

            //Pushing the SETBricks for the current pyramid to the global SET tower
            for(let brick of pyramid.getSetBricks()){
                globalTower.pushSetBrick(brick)
            }
        }

        // fillGlobalAEL(globalTower, context, listOfPyramids)
    }

    const mainCanvas = document.querySelector("#main-canvas")
    const context = mainCanvas.getContext("2d")
    let manipulationSelections = document.querySelectorAll("input[name='manipulation-method']")
    let manipulationMethod = document.querySelector("input[name='manipulation-method']:checked").value

    mainCanvas.width = mainCanvas.offsetWidth
    mainCanvas.height = mainCanvas.offsetHeight

    const globalTower = new SetTower()

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

    let pyramid2_s0 = new Surface([0, 2, 1], "lightcoral")
    let pyramid2_s1 = new Surface([1, 4, 5], "lightblue")
    let pyramid2_s2 = new Surface([5, 3, 0], "lightgreen")
    let pyramid2_s3 = new Surface([3, 4, 2], "lightgoldenrodyellow")

    let pyramid1_listOfVertices = [pyramid1_v0, pyramid1_v1, pyramid1_v2, pyramid1_v3]
    let pyramid2_listOfVertices = [pyramid2_v0, pyramid2_v1, pyramid2_v2, pyramid2_v3]

    let pyramid_listOfEdges = [pyramid_e0, pyramid_e1, pyramid_e2, pyramid_e3, pyramid_e4, pyramid_e5]

    let pyramid1_listOfSurfaces = [pyramid1_s0, pyramid1_s1, pyramid1_s2, pyramid1_s3]
    let pyramid2_listOfSurfaces = [pyramid2_s0, pyramid2_s1, pyramid2_s2, pyramid2_s3]

    let pyramid1 = new Pyramid("Pyramid1", mainCanvas, context, pyramid1_listOfVertices, pyramid_listOfEdges, pyramid1_listOfSurfaces)
    let pyramid2 = new Pyramid("Pyramid2", mainCanvas, context, pyramid2_listOfVertices, pyramid_listOfEdges, pyramid2_listOfSurfaces)

    let wt = new Matrix([[1, 0, 0, 0], 
                        [0, 1, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]])

    let vt = new Matrix([[1, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 1, -1/USER_LOCATION.z],
                        [0, 0, 0, 1]])
                        
    let st = findSt(WORLD_SIZE.width, WORLD_SIZE.height, mainCanvas.width, mainCanvas.height)

    
    pyramid1.initPyramid(wt, vt, st)
    pyramid2.initPyramid(wt, vt, st)

    clearCanvas(context, mainCanvas)

    drawPyramids([pyramid1, pyramid2], globalTower)

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

                drawPyramids([pyramid1, pyramid2], globalTower)
                
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

                drawPyramids([pyramid1, pyramid2], globalTower)            
    
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

    window.addEventListener("keypress", (ev) => {
        switch(ev.key){
            case "1":
                manipulationSelections[0].checked = true
                manipulationMethod = "translation"
                break;
            case "2":
                manipulationSelections[1].checked = true
                manipulationMethod = "rotation"
                break;
        }
    })

    const handleChangeManipulation = (ev) => {
        manipulationMethod = ev.target.value
    }

    for(let radioButton of manipulationSelections){
        radioButton.addEventListener("change", (ev) => handleChangeManipulation(ev))
    }

}