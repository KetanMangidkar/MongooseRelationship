
const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = ()=>{
    return mongoose.connect("mongodb+srv://ketan:ketan123@cluster0.pvb7r.mongodb.net/Books?retryWrites=true&w=majority"
    );

}

/// section schema -->

const sectionSchema = new mongoose.Schema({

    section:{type:String , required:true},
   
    
},
{
    versionKey:false,
    timestamps:true
});

const Section = mongoose.model("section",sectionSchema);

//// books -->

const bookSchema = new mongoose.Schema({


    name:{type:String , required:true},
    sectionID:{type:mongoose.Schema.Types.ObjectId , ref:"section",required:true},
    authorId:{type:mongoose.Schema.Types.ObjectId , ref:"author",required:true},

},
{
    versionKey:false,
    timestamps:true
});

const Book = mongoose.model("book",bookSchema);

/// author ---> 

const authorSchema = new mongoose.Schema({

    firstName:{type:String , required:true},
    lastName:{type:String , required:true},
},
{
    versionKey:false,
    timestamps:true
});

const Author = mongoose.model("author",authorSchema);


//// CRUD operation for sections ------------------////////////////-------------------

app.get("/section", async(req,res)=>{

    try {
        const section = await Section.find().lean().exec();

        return res.send(section);

    } catch (error) {
        return res.send(error);
    }
});

app.post("/section", async (req, res) => {
    try {
      const section = await Section.create(req.body);
  
      return res.status(201).send(section);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

app.patch("/section/:id", async(req,res)=>{

    try {
        const section = await Section.findByIdAndUpdate(req.body ,req.params.id,{new:true}).lean().exec();
 
        return res.send(section);

    } catch (error) {
        return res.send(error);
    }
});


app.get("/section/:id", async(req,res)=>{

    try {
        const section = await Section.findById().lean().exec();

        return res.send(section);

    } catch (error) {
        return res.send(error);
    }
});


app.delete("/section/:id", async(req,res)=>{

    try {
        const section = await Section.findByIdAndDelete(req.params.id).lean().exec();

        return res.send(section);

    } catch (error) {
        return res.send(error);
    }
});


/////  CRUD operations for books =================

app.get("/books", async(req,res)=>{

    try {
        const book = await Book.find().lean().exec();

        return res.send(book);

    } catch (error) {
        return res.send(error);
    }
});

app.post("/books", async(req,res)=>{

    try {
        const book = await Book.create(req.body);

        return res.send(book);

    } catch (error) {
        return res.send(error);
    }
});

app.patch("/books/:id", async(req,res)=>{

    try {
        const book = await Book.findByIdAndUpdate(req.params.id,req.body ,{new:true}).lean().exec();

        return res.status(201).send(book);

    } catch (error) {
        return res.send(error);
    }
});



app.get("/books/:id", async(req,res)=>{

    try {
        const book = await Book.findById().lean().exec();

        return res.send(book);

    } catch (error) {
        return res.send(error);
    }
});


app.delete("/books/:id", async(req,res)=>{

    try {
        const book = await Book.findByIdAndDelete(book).lean().exec();

        return res.status(200).send(book);

    } catch (error) {
        return res.send(error);
    }
});




///// CRUD operation on Authors 


app.get("/authors", async(req,res)=>{

    try {
        const author = await Author.find().lean().exec();

        return res.send(author);

    } catch (error) {
        return res.send(error);
    }
});

app.post("/authors", async (req, res) => {
    try {
      const author = await Author.create(req.body);
  
      return res.status(201).send(author);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  app.patch("/authors/:id", async (req,res) => {
    try {
      const author = await Author.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
      return res.status(201).send(author)
    } catch (error) {
       return  res.status(500).send({messege : error.messege})
       
    }
    
})


app.get("/authors/:id", async(req,res)=>{

    try {
        const author = await Author.findById().lean().exec();

        return res.send(author);

    } catch (error) {
        return res.send(error);
    }
});


app.delete("/authors/:id", async(req,res)=>{

    try {
        const author = await Author.findByIdAndDelete(req.params.id).lean().exec();

        return res.send(author);

    } catch (error) {
        return res.send(error);
    }
});




app.listen(9555, async(req,res)=>{
    try {
        await connect();
        console.log("listning to port 9555")
    } catch (error) {
        console.log(error);
    }
});
