const SampledDataModel = require('../models/SampledData')

const get = async () =>{
    const results = await SampledDataModel.get().fetch()
    return results
}


const getByCategory = async (category)=>{
    const results = await SampledDataModel.get().where('categ','=',category).fetch()
    return results
}

module.exports = {
    get,getByCategory
}