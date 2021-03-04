const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()

app.use(express.json())
let books = []

const uri = 'mongodb+srv://warakorn:warakorn14@cluster0.pcrnh.mongodb.net/buzon?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true})
let db, booksCollection

async function connect(){
    await client.connect()
    db = client.db('buzon')
    booksCollection = db.collection('books')
}
connect()

app.post('/books', async (req,res) => {
    
    let newtitle = req.body.title
    let newprice  = req.body.price
    let newunit = req.body.unit
    let newisbn = req.body.isbn
    let newimageurl = req.body.imageurl

    
    let newBook = {
        title: newtitle,
        price: newprice,
        unit: newunit,
        isbn: newisbn,
        imageurl: newimageurl
     }
    let bookID = 0

    const result = await booksCollection.insertOne(newBook)
    bookID = result.insertedId

    res.status(201).json(bookID)
})

app.get('/books/:id', async (req,res) => {
    
    let id = req.params.id
    
    const book = await booksCollection.findOne({ _id: ObjectId(id) })
    
    res.status(200).json(book)

})


const port = 3000
app.listen(port, () => console.log(`Server started at ${port}`))
