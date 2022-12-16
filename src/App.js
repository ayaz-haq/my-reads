import "./App.css";
import { useEffect, useState, } from "react";
import { Routes,Route, } from "react-router-dom";
import SearchMenu from "./components/SearchMenu";
import MyReads from "./components/MyReads";
import * as BooksAPI from "./BooksAPI"

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books,setBooks] = useState([])
  useEffect (() => {
    const getBook = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
      console.log(res)
    }
    getBook();
    console.log(books)
  },[])
  const getSingleBook = (id) => {
    const get = async () => {
      const res = await BooksAPI.get(id)
      console.log("get func",res);
    }
    
    get();
  }
  getSingleBook("nggnmAEACAAJ")
  return (
    <div className="app">
        <Routes>
          <Route excat path="/" element={<MyReads books={books} /> } />
          <Route excat path="/search" element={<SearchMenu books={books} /> }/>
        </Routes>
    </div>
  );
}

export default App;
