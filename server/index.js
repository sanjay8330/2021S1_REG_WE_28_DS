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


/**The Database connection */
mongoose.connect("mongodb+srv://sanjay:sanjay-8330@services.vicz2.mongodb.net/ds?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.listen(3001,() => {
    console.log("Server is started and running on 3001");
})