class FlagTable{
    constructor(bricksList){
        this.bricksList = bricksList
        this.table = {}

        //Initialize every brick with false
        for(let brick of bricksList){
            this.table[brick.brickColor] = {brick: brick, content: [false]}
        }
    }

    generateTable(){
        for(let brick of this.bricksList){
            // this.table[brick.brickColor].push(!lastBrickValue)
            for(let tableKey of Object.keys(this.table)){
                if(tableKey === brick.brickColor){
                    this.table[tableKey].content.push(!this.table[tableKey].content[this.table[tableKey].content.length - 1])
                    continue
                }
                this.table[tableKey].content.push(this.table[tableKey].content[this.table[tableKey].content.length - 1])
            }
        }
    }
}

export default FlagTable