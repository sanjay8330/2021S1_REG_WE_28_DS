const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const ProductModel = require('./model/Product');

/**Insert a product */
app.post("/insertProduct", async (req, res) => {
    const productID = req.body.productID;
    const productName = req.body.productName;
    const productDescription = req.body.productDescrip;
    const productPrice = req.body.productPrice;

    const product = new ProductModel({
        productID: productID,
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice
    });

    try{
        await product.save();
        res.send("Inserted Data!!");
        console.log("Data inserted successfully!!!");
    }catch(err){
        console.log(err);
    }
});

/**Read all the products from the Product Schema */
app.get("/readProducts", async (req, res) => {
    ProductModel.find({}, (error,result) => {
        if(error){
            res.send(error);
        }
        res.send(result)
    })
});

/**Read product details for provided product ID */
app.get("/readProductById/:id", async (req, res) => {
    const id = req.params.id;

    ProductModel.find({_id:id}, (error,result) => {
        if(error){
            res.send(error);
        }
        res.send(result)
    })
});

/***Update product details for provided product ID */
app.put("/updateProduct/:id", async (req, res) => {
    const Id = req.params.id;
    const newProductName = req.body.productName;
    const newProductDescrip = req.body.productDescrip;
    const newProductPrice = req.body.productPrice;

    try{
        await ProductModel.findById(Id, (err, updatedProductObj) => {
            updatedProductObj.productName = newProductName;
            updatedProductObj.productDescription = newProductDescrip;
            updatedProductObj.productPrice = newProductPrice;
            updatedProductObj.save();
            res.send("Updated Successfully");
            console.log("Updated successfully");
            if(err){
                res.send(err);
                console.log("Oops something went wrong!!");
            }
        });
    }catch(err){
        console.log(err);
    }
});

/**Delete the product details fro  the product Schema for given product ID */
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await ProductModel.findByIdAndRemove(id).exec();
    res.send("Deleted Successfully!!!");
    console.log("Deleted Successfully!!!!");
});


/**The Database connection */
mongoose.connect("mongodb+srv://sanjay:sanjay-8330@services.vicz2.mongodb.net/ds?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
})

app.listen(3001,() => {
    console.log("Server is started and running on 3001");
})