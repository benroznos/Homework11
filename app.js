const express = require('express')
const { join } = require('path')
const fs = require('fs')

const app = express()

function getNotes(){

  fs.readFile('./db/db.json',function(err, data){
    if(err){return console.log(err)}
    let notes = JSON.parse(data.toString())
    console.log(notes)
    return notes
  })
}

function writeNotes(newNote){
  fs.appendFile('./db/db.json',`${newNote}`,function(err,data){
    if(err)return console.log(err)}
    console.log('saved')
  })
}
function deleteNotes(delete){
  fs.readFile('./db/db.json',function(err,data){
    if (err) { return console.log(err) }
    let notes =[]
    notes = JSON.parse(data.toString())
    for (i=0, i <notes.length, i++){
      if (notes[i].title === delete){
        return false
        else{
          return true
        }
      }
    }
  })
}

getNotes()
app.get('/notes',(req,res)=>{
  let notes = getNotes()
  res.json(notes)
})

app.post('/notes',(req,res)=>{
writeNotes(req.body)
res.sendStatus(200)
})
app.delete('/notes',(req,res)=>{
  deleteNotes(req.params.title)
})

app.listen(3000, () => console.log('http://localhost:3000'))
