const Books=require('../models/bookModel')
const mongoose=require('mongoose')

//to convert to title case and trim
function toTitleCase(str) {
    str=str.trim()
    return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  }


//CREATE a book
const createBook=async (req,res)=>{
    const {title,author,totalCopies}=req.body

    //checking for emoty fields
    let emptyValues=[]
    if(!title)emptyValues.push('title')
    if(!author)emptyValues.push('author')
    if(!totalCopies)emptyValues.push('totalCopies')
    if(emptyValues.length>0){
        return res.status(400).json({error:'Please fill in all the field',emptyValues})
    }

    try{
        const book=await Books.create({title:toTitleCase(title),author:toTitleCase(author),nAvailable:totalCopies,totalCopies})//at first  no of total copies = nAvailable
        res.status(200).json(book)

    }catch (error){
        res.status(400).json({error:error.message})
    }
}

//get all books
const getBooks=async (req,res)=>{
    
    const books=await Books.find()//returns all books
    
    res.status(200).json(books)
}

//READ a book
const getABook=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        //when given id in the req url parameter is not valid
        return res.status(404).json({error:'No such book is listed'})
    }
    const book=await Books.findById(id)
    if(!book){//no book found
        return res.status(404).json({error:'No such book is listed'})
    }
    res.status(200).json(book)
}


//UPDATE a book
const updateBook=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        //when given id in the req url parameter is not valid
        return res.status(404).json({error:'No such book is listed'})
    }

    const book=await Books.findByIdAndUpdate({_id:id},{...req.body})
    if(!book){
        return res.status(404).json({error:'No such book is listed'})
    }
    res.status(200).json(book)
}



//DELETE a book
const deleteBook=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such book is listed'})
    }
    const book=await Books.findByIdAndDelete({_id:id})
    if(!book){
        return res.status(404).json({error:'No such book is listed'})
    }
    res.status(200).json(book)
}

module.exports={
    createBook,
    getBooks,
    getABook,
    deleteBook,
    updateBook
}