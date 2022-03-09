class Vector{
    constructor(x=0, y=0, z=0){
        this.x = x
        this.y = y
        this.z = z

        this.vectorArr = [x, y, z]
    }

    setVector(newX, newY, newZ){
        this.x = newX
        this.y = newY
        this.z = newZ

        this.vectorArr = [newX, newY, newZ]
    }
}

export default Vector