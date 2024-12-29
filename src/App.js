// App.js
import React from "react";
import BillDetails from "/src/BillDetails.js";
import ItemList from "/src/Itemlist.js";
import TotalAmount from "/src/TotalAmount.js";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./App.css";

function App() {
  const [items, setItems] = React.useState([]);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    // Title
    pdf.text("Invoice", 20, 20);

    // Define columns and rows for the table
    const columns = ["Item", "Quantity", "Price"];
    const rows = items.map((item) => [item.item, item.quantity, item.price]);

    // Add table to the PDF
    pdf.autoTable({
      startY: 30,
      head: [columns],
      body: rows,
    });

    // Add total amount to PDF
    const totalAmount = calculateTotalAmount();
    pdf.text(
      `Total Amount: 
                    $${totalAmount.toFixed(2)}`,
      20,
      180
    );

    // Save the PDF
    pdf.save("invoice.pdf");
  };

  return (
    <div className="App">
      <h1>Bill/Invoice Generator</h1>
      <BillDetails onAddItem={handleAddItem} />
      <ItemList items={items} onDeleteItem={handleDeleteItem} />
      <TotalAmount total={calculateTotalAmount()} />
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
}

export default App;
