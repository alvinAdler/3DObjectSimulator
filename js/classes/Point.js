class Point{
    constructor(x=0, y=0, z=0){
        this.x = x
        this.y = y
        this.z = z
        this.w = 1

        this.pointArr = [x, y, z, 1]
    }

    setPoint(newX, newY, newZ){
        this.x = newX
        this.y = newY
        this.z = newZ

        this.pointArr = [newX, newY, newZ, this.w]
    }
}

export default Point