import React, { useState } from 'react';
import Axios from 'axios';

function App(){

  /**The attributes of product form */
  const [productID, setproductID] = useState(0);
  const [productName, setproductName] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [productPrice, setproductPrice] = useState(0);

  /**The add product METHOD */
  const addToProductList = () => {
    Axios.post("http://localhost:3001/insertProduct", {
      productID: productID,
      productName: productName,
      productDescrip: productDescription,
      productPrice: productPrice,
    });
    window.location.reload(false);
  }

  return(
    <div>
      <div>
        <h3>Add Product Details</h3>

<       label>Product ID </label>
        <input type="text" onChange={(event) => {
          setproductID(event.target.value)
        }} />

        <label>Product Name</label>
        <input type="text"  onChange={(event) => {
          setproductName(event.target.value)
        }} />

        <label>Product Description</label>
        <input type="text"  onChange={(event) => {
          setproductDescription(event.target.value)
        }} />

        <label>Product Price</label>
        <input type="text"  onChange={(event) => {
          setproductPrice(event.target.value)
        }} />

        <button onClick={addToProductList}>Add Product Details</button>
      </div>

    </div>
  )

}

export default App;

