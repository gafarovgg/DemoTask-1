const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const Schema = mongoose.Schema;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

const port = 8080;

const ShopSchema = new Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  imageUrl: { type: String, require: true },
});

const ShopModel = mongoose.model("Shop", ShopSchema);

const DB_URL =
  "mongodb+srv://gafarovgg:gafarovgg@cluster0.7funi8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.get("/api/shops", async (req, res) => {
  try {
    const shops = await ShopModel.find({});
    if (shops.length > 0) {
      res.status(200).send({ message: "success", data: shops });
    } else {
      res.status(204).send({ message: "data is empty" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.get("/api/shops/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const shop = await ShopModel.findById(id);
    if (shop) {
      res.status(200).send({
        message: "success",
        data: shop,
      });
    } else {
      res.status(404).send({ message: "not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.delete("/api/shops/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedShop = await ShopModel.findByIdAndDelete(id);

    res.status(200).send({ message: "deleted", deletedShop: deletedShop });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.post("/api/shops", async (req, res) => {
  try {
    const newShop = new ShopModel(req.body);
    await newShop.save();
    res.status(201).send({ message: "posted", newShop: newShop });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

mongoose.connect(DB_URL).then(() => {
  console.log("Connected!");
  app.listen(port, () => {
    console.log(`Link : http://localhost:${port}`);
  });
});
