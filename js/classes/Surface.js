class Surface{
    constructor(indexOfEdges=[], surfColor="white"){
        this.edgeIndices = indexOfEdges
        this.surfColor = surfColor
    }

    setEdges(newIndexOfEdges){
        this.edges = new newIndexOfEdges
    }

    setSurfColor(newColor){
        this.surfColor = newColor
    }
}

export default Surface