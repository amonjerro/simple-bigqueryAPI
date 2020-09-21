const { BigQuery } = require('@google-cloud/bigquery')
const bigQuery = new BigQuery()

class Database  {
    constructor(){
        this.statement = ``
        this.parameters = {}
    }
    cleanup(){
        this.statement = ``
        this.parameters = {}
    }
    async execute(){
        const query = this.statement
        const params = this.parameters
        const options = {
            query, location:'US', params
        }
        const [ rows ] = await bigQuery.query(options)
        this.cleanup()
        return rows
    }
    query(fields){
        this.statement += 'SELECT '
        for (let f = 0; f < fields.length; f++){
            this.statement += `${fields[f]}, `
        }
        this.statement = this.statement.substr(0,this.statement.length - 2)
        return this
    }
    from(table){
        this.statement += ` FROM ${process.env.SCHEMA+'.'+table} `
        return this
    }
    where(paramName, operator, paramValue){
        this.statement += `WHERE ${paramName} ${operator} @${paramName} `
        this.parameters[paramName] = paramValue
        return this
    }
    andWhere(paramName, operator, paramValue){
        this.statement += `AND WHERE ${paramName} ${operator} @${paramName}`
        this.parameters[paramName] = paramValue
        return this
    }
    orWhere(paramName, operator, paramValue){
        this.statement += `OR WHERE ${paramName} ${operator} @${paramName}`
        this.parameters[paramName] = paramValue
        return this
    }
    delete(table){
        this.statement += `DELETE ${process.env.SCHEMA+'.'+table} `
        return this
    }
    update(table){
        this.statement += `UPDATE ${process.env.SCHEMA+'.'+table} `
        return this
    }
    set(params){
        this.statement += 'SET '
        let fields = Object.keys(params)
        for (let f = 0; f < fields.length; f++){
            this.statement += `${fields[f]} = @${fields[f]}, `
            this.parameters[fields[f]] = params[fields[f]]
        }
        this.statement = this.statement.substr(0,this.statement.length -2)
        return this
    }
    async insert(into, rows){
        const dataset = bigQuery.dataset(process.env.SCHEMA)
        const table = dataset.table(into)
        let results = await table.insert(rows)
        return results
    }
}

module.exports = Database