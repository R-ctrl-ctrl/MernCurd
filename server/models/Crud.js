const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    Content:{type:String,required:true}
})

const crudmodel = mongoose.model("notes",notesSchema)

module.exports = crudmodel