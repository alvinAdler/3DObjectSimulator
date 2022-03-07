class Point{
    constructor(x=0, y=0, z=0){
        this.x = x
        this.y = y
        this.z = z
        this.w = 1

        this.pointArr = [x, y, z, 1]
    }

    setPoint(newX, newY, newZ, newW=1){
        this.x = newX
        this.y = newY
        this.z = newZ
        this.w = newW

        this.pointArr = [newX, newY, newZ, newW]
    }

    normalizeW(){
        this.x /= this.w
        this.y /= this.w
        this.z /= this.w
        this.w = 1

        this.pointArr = [this.x, this.y, this.z, this.w]
    }
}

export default Point