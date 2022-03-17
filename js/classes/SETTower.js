import { drawLine } from '../functions.js'
import Point from './Point.js'

class SETTower{
    constructor(arrOfSetBricks=[]){
        this.setTowerList = arrOfSetBricks
        this.ael = []
    }

    pushSetBrick(setBrick){
        this.setTowerList.push(setBrick)
    }

    fillPolygon(context, polyColor){
        this.setTowerList.sort((item1, item2) => item1.ymin - item2.ymin)

        let minimumY = Math.min.apply(Math, this.setTowerList.map((brick) => brick.ymin))
        let maximumY = Math.max.apply(Math, this.setTowerList.map((brick) => brick.ymax))

        this.ael = this.setTowerList.filter((brick) => brick.ymin === minimumY)

        this.ael.sort((item1, item2) => item1.xofymin - item2.xofymin)

        for(let currentY = minimumY + 1; currentY <= maximumY; currentY++){
            //Check if any of the SETBrick expired
            this.ael = this.ael.filter((brick) => brick.ymax !== currentY)

            //Update the xofymin for each brick
            for(let index = 0; index < this.ael.length; index++){
                let currentxofymin = this.ael[index].xofymin
                let dxdy = this.ael[index].dxdy

                this.ael[index].setxofymin(currentxofymin + dxdy)
            }
            
            for(let newBrick of this.setTowerList){
                if(newBrick.ymin === currentY){
                    this.ael.push(newBrick)
                }
            }

            //Sort the ael
            this.ael.sort((item1, item2) => item1.xofymin - item2.xofymin)


            //Draw the line
            for(let innerIndex = 0; innerIndex < this.ael.length - 1; innerIndex++){
                let point1 = new Point(this.ael[innerIndex].xofymin, currentY, 0)
                let point2 = new Point(this.ael[innerIndex + 1].xofymin, currentY, 0)

                drawLine(context, point1, point2, polyColor)
            }
        }
    }
}

export default SETTower