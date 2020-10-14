const mongoose = require('mongoose');
const RecordSchema = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed });

const Record = mongoose.model('records', RecordSchema) // define  mongoDB Shema
module.exports = {Record,mongoose}