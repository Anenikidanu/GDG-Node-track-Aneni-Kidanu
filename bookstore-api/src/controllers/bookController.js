const books = [
  { id: 1, title: "Clean Code", price: 20 },
  { id: 2, title: "You Don't Know JS", price: 25 }
];

export const getBooks = (req, res) => {
  res.status(200).json(books);
};

export const getBookById = (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json(book);
};

export const createBook = (req, res) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
};
