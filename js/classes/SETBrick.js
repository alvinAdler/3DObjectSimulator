class SETBrick{
    constructor(point1, point2, color="white", pyramidName="DefaultPyramid"){
        if(point1.y >= point2.y){
            this.ymax = point1.y
            this.ymin = point2.y
            this.xofymin = point2.x
        }else{
            this.ymax = point2.y
            this.ymin = point1.y
            this.xofymin = point1.x
        }
        this.dx = point2.x - point1.x
        this.dy = point2.y - point1.y

        if(!isFinite(this.dx / this.dy)){
            this.dxdy = 0
        }else{
            this.dxdy = this.dx / this.dy
        }

        this.brickColor = color

        this.point1 = point1
        this.point2 = point2

        this.belongToPyramid = pyramidName
    }

    setxofymin(newXofymin){
        this.xofymin = newXofymin
    }
} 

export default SETBrick