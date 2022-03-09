class Surface{
    constructor(arrOfEdges=[], surfColor="black"){
        this.edges = arrOfEdges
        this.surfColor = surfColor
    }

    setEdges(newArrOfEdges){
        this.edges = new newArrOfEdges
    }

    setSurfColor(newColor){
        this.surfColor = newColor
    }
}

export default Surface