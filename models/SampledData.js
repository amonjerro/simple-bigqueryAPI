const Model = require('../database/Model')

const SampledDataSchema = {
    fields: ['processing_dt','epoch','dev','level','categ','temperature','volts'],
    table:'sampled_data'
}

module.exports = new Model(SampledDataSchema)