import { drawLine, transformPoint } from "../functions.js"

class Pyramid{
    constructor(canvas, context, listOfVertices=[], listOfEdges=[], listOfSurfaces=[]){

        this.canvas = canvas
        this.context = context

        this.vertices = listOfVertices
        this.edges = listOfEdges
        this.surfaces = listOfSurfaces

        this.frontSurfaces = []
        this.visibleSurfaces = []

        this.verticesWorld = []
        this.verticesView = []
        this.verticesScreen = []

        this.rot_deg = 1
    }

    addVerticesWorld(index, point){
        // this.verticesWorld.push(point)
        this.verticesWorld[index] = point
    }

    addVerticesView(index, point){
        // this.verticesView.push(point)
        this.verticesView[index] = point
    }

    addVerticesScreen(index, point){
        // this.verticesScreen.push(point)
        this.verticesScreen[index] = point
    }

    initPyramid(wt, vt, st){
        for(let index=0; index < this.vertices.length; index++){
            this.addVerticesWorld(index, transformPoint(this.vertices[index], wt))
            this.addVerticesView(index, transformPoint(this.verticesWorld[index], vt))
            this.addVerticesScreen(index, transformPoint(this.verticesView[index], st))
        }
    
    
        for(let index=3; index < this.edges.length; index++){
            drawLine(this.context, this.verticesScreen[this.edges[index].indexStart], this.verticesScreen[this.edges[index].indexEnd])
        }
        
        for(let index=0; index < 3; index++){
            drawLine(this.context, this.verticesScreen[this.edges[index].indexStart], this.verticesScreen[this.edges[index].indexEnd], "#2285e4")
        }
    }

    drawPyramid(){
        for(let index=3; index < this.edges.length; index++){
            drawLine(this.context, this.verticesScreen[this.edges[index].indexStart], this.verticesScreen[this.edges[index].indexEnd])
        }
        
        for(let index=0; index < 3; index++){
            drawLine(this.context, this.verticesScreen[this.edges[index].indexStart], this.verticesScreen[this.edges[index].indexEnd], "#2285e4")
        }
    }

    transformPyramid(wt, vt, st){
        for(let index=0; index < this.vertices.length; index++){
            this.addVerticesWorld(index, transformPoint(this.verticesWorld[index], wt))
            this.addVerticesView(index, transformPoint(this.verticesWorld[index], vt))
            this.addVerticesScreen(index, transformPoint(this.verticesView[index], st))
        }
    }

}

export default Pyramid