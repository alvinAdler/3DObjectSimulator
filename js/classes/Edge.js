class Edge{
    constructor(indexStart, indexEnd){
        this.indexStart = indexStart
        this.indexEnd = indexEnd
    }

    setLine(newIndexStart, newIndexEnd){
        this.indexStart = newIndexStart
        this.indexEnd = newIndexEnd
    }
}

export default Edge