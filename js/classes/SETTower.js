class SETTower{
    constructor(arrOfSetBricks=[]){
        this.setTowerList = arrOfSetBricks.slice().sort((item1, item2) => item1.ymin - item2.ymin)
    }

    pushSetBrick(setBrick){
        this.setTowerList.push(setBrick)
        this.setTowerList.sort((item1, item2) => item1.ymin - item2.ymin)
    }
}

export default SETTower