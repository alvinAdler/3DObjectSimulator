class Pyramid{
    constructor(listOfVertices=[], listOfEdges=[]){
        this.vertices = listOfVertices
        this.edges = listOfEdges

        this.verticesWorld = []
        this.verticesView = []
        this.verticesScreen = []
    }

    addVerticesWorld(point){
        this.verticesWorld.push(point)
    }

    addVerticesView(point){
        this.verticesView.push(point)
    }

    addVerticesScreen(point){
        this.verticesScreen.push(point)
    }
}

export default Pyramid