let books = [
  { id: 1, title: "Clean Code", price: 20 },
  { id: 2, title: "You Don't Know JS", price: 25 }
];

// GET /books
exports.getAllBooks = (req, res) => {
  res.status(200).json(books);
};

// GET /books/:id
exports.getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
};

// POST /books
exports.createBook = (req, res) => {
  const { title, price } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    price
  };

  books.push(newBook);
  res.status(201).json(newBook);
};
