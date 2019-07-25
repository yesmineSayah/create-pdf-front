//@ts-check
import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./App.css";

class App extends Component {
  state = {
    name: "",
    receiptId: "0",
    price1: "0",
    price2: "0"
  };

  handleChange(event, key) {
    this.setState({ [key]: event.target.value });
  }

  createAndDownlopadPdf = () => {
    axios.post("/create-pdf", this.state).then(() => {
      axios.get("fetch-pdf", { responseType: "blob" }).then(res => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });
    });
  };

  render() {
    return (
      <div className="App">
        <input
          type="text"
          placeholder="placeholder"
          value={this.state.name}
          name="name"
          onChange={e => this.handleChange(e, "name")}
        />
        <input
          type="text"
          placeholder="Receipt Id"
          name="receiptId"
          onChange={e => this.handleChange(e, "receiptId")}
        />
        <input
          type="text"
          placeholder="price 1"
          name="price1"
          onChange={e => this.handleChange(e, "price1")}
        />
        <input
          type="text"
          placeholder="price 2"
          name="price2"
          onChange={e => this.handleChange(e, "price2")}
        />
        <button onClick={this.createAndDownlopadPdf}>Download Pdf</button>
      </div>
    );
  }
}

export default App;
