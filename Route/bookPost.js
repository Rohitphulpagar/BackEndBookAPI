const express = require("express");
const router = express.Router();
const Book = require("../models/BookModel");

router.post("/book/create", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    const bookpost = new Book({
      title,
      author,
      publishYear,
    });
    await bookpost.save();
    return res.status(201).json({
      message: "book post successufully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/book", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/book/details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: message.error });
  }
});

router.put("/book/edit/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: "send all required fields",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "books not founds" });
    }
    return res.status(200).json({ message: "Book updated successufully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/book/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "book not found" });
    }
    return res.status(200).json({ message: "successfully deleted." });
  } catch (error) {
    res.status(500).json({
      message: message.error,
    });
  }
});

module.exports = router;
