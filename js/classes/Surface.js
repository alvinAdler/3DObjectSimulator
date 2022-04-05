import PlaneEquation from "./PlaneEquation.js"

class Surface{
    constructor(indexOfEdges=[], surfColor="white"){
        this.edgeIndices = indexOfEdges
        this.surfColor = surfColor
        this.surfaceNormal = undefined
        this.planeEquation = new PlaneEquation()
    }

    setEdges(newIndexOfEdges){
        this.edges = new newIndexOfEdges
    }

    setSurfColor(newColor){
        this.surfColor = newColor
    }

    setSurfaceNormal(newSurfaceNormal){
        this.surfaceNormal = newSurfaceNormal
    }

    setPlaneEquation(point){
        this.planeEquation.setConstants(this.surfaceNormal, point)
    }
}

export default Surface