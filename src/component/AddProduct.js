import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

const AddProduct = ({ onAddProduct }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [units, setUnits] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !quantity || !units) {
      alert("fill in all fields");
      return;
    }

    const newProduct = {
      No: new Date().getTime(),
      Product: productName,
      Quantity: parseInt(quantity),
      Units: units,
    };

    onAddProduct(newProduct);

    // Reset form fields
    setProductName("");
    setQuantity("");
    setUnits("");
  };

  return (
    <>
      <div>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Product Name:</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
        </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"v>
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"v>
            <Form.Label>Units:</Form.Label>
            <Form.Control
              type="text"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            />
          </Form.Group>
          <div>
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
