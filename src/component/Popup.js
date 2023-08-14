import React from "react";
import Dialog from "@mui/material/Dialog";
import AddProduct from "./AddProduct";
import { DialogContent } from "@mui/material";

const Popup = ({ open, onClose, onAddProduct, selectedProduct }) => {
  return (
    <Dialog open={open} onClose={onClose}>
 
      <DialogContent>
        <AddProduct onAddProduct={onAddProduct} />
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
