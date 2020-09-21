const ORM = require('./ORM')
class Model {
    constructor(params){
        this.db = new ORM()
        const { fields, table } = params
        if (fields.length == 0){
            throw 'A model must have at least one field'
        }
        this.fields = fields
        this.table = table
    }
    async fetch(){
        let results = await this.db.execute()
        return results
    }
    preview(){
        let statement = this.db.statement
        this.db.cleanup()
        return statement
    }
    get(fields){
        if(fields && fields.length > 0){
            const gettable = this.fields.filter((e)=>{return fields.includes(e)} )
            this.db.query(gettable).from(this.table)
            return this
        } else {
            this.db.query(this.fields).from(this.table)
            return this
        }
        
    }
    where(paramName, operator, paramValue){
        this.db.where(paramName, operator, paramValue)
        return this
    }
    and(paramName, operator, paramValue){
        this.db.andWhere(paramName, operator, paramValue)
        return this
    }
    or(paramName, operator, paramValue){
        this.db.orWhere(paramName, operator, paramValue)
        return this
    }
    async make(data){
        const results = await this.db.insert(this.table, data)
        return results
    }
}

module.exports = Model