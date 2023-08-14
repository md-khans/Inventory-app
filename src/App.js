import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popup from "./component/Popup";
import Navbar from "./component/Navbar";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(No, Product, Quantity, Units, Action) {
  return { No, Product, Quantity, Units, Actions: Action };
}

export default function CustomizedTables() {
  const [rows, setRows] = React.useState([
    createData(1, "Mango", 5, "kg"),
    createData(2, "Apple", 10, "kg"),
    createData(3, "Banana", 15, "kg"),
  ]);

  useEffect(() => {
    const storedRows = JSON.parse(localStorage.getItem("inventoryRows")) || [];
    console.log("Stored Rows:", storedRows);
    setRows(storedRows);
  }, []);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleIncrement = (row) => {
    const updatedRows = rows.map((r) =>
      r.No === row.No ? { ...r, Quantity: r.Quantity + 1 } : r
    );
    setRows(updatedRows);
    localStorage.setItem("inventoryRows", JSON.stringify(updatedRows));
  };
  const handleDecrement = (row) => {
    const updatedRows = rows.map((r) =>
      r.No === row.No ? { ...r, Quantity: r.Quantity - 1 } : r
    );
    setRows(updatedRows);
    localStorage.setItem("inventoryRows", JSON.stringify(updatedRows));
  };

  const handleAddProduct = (newProduct) => {
    const nextNo = rows.length + 1; // Calculate the next continuous number
    const productWithNo = { ...newProduct, No: nextNo };

    const updatedRows = [...rows, productWithNo];
    setRows(updatedRows);

    // Update local storage with the modified rows array
    localStorage.setItem("inventoryRows", JSON.stringify(updatedRows));

    setIsAddProductOpen(false);
  };

  const handleDelete = (row) => {
    const updatedRows = rows.filter((r) => r.No !== row.No);
    setRows(updatedRows);
    localStorage.setItem("inventoryRows", JSON.stringify(updatedRows));
  };

  return (
    <>
      <div>
        <Navbar />
        <h1>Inventory-App</h1>
        <button onClick={() => setIsAddProductOpen(true)}>Add Product</button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Units</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.Product}>
                  <StyledTableCell align="left">{row.No}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.Product}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Units}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Actions}
                    <button onClick={() => handleIncrement(row)}>+</button>
                    <button onClick={() => handleDecrement(row)}>-</button>
                    <button onClick={() => handleDelete(row)}>Delete</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Popup
        open={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </>
  );
}
