const express = require('express')
const mongoose = require('mongoose')
const app = express()
const crudmodel = require('./models/Crud')
const cors = require('cors')

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://rmpuser:html9869@cluster0.l0hbj.mongodb.net/cruddb?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
})


app.post("/insert", async(req,res)=>{
    const name = req.body.name
    const content = req.body.content
    const note = new crudmodel({Name:name,Content:content})
    try{
        await note.save()
    }catch(error){
        console.log(error)
    }
    res.send("Server is running")
})

app.get("/read", async(req,res)=>{
    crudmodel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
})

app.put("/update",async (req,res)=>{
    const newContent = req.body.newContent
    const id = req.body.id
    console.log(newContent)

    try{
        await crudmodel.findById(id,(err,updatenote)=>{
            updatenote.Content = newContent
            updatenote.save()
            res.send("Updated")
        })
    }catch(err){
        console.log(err)
    }
})

app.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id
    await crudmodel.findByIdAndRemove(id).exec()
    res.send("deleted")
})


app.listen(3001,()=>{
    console.log("Server running on port 3001")
})