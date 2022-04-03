class PlaneEquation{
    constructor(A, B, C, point){
        this.A = A
        this.B = B
        this.C = C
        this.D = undefined

        if(point){
            this.findD(point)
        }
    }

    findD(point){
        this.D = -(this.A * point.x) - (this.B * point.y) - (this.C * point.z)
    }

    setConstants(normalVector, point){
        this.A = normalVector.x
        this.B = normalVector.y
        this.C = normalVector.z
        this.findD(point)
    }
}

export default PlaneEquation