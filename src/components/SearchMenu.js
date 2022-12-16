import {React, useState,} from 'react'
import { Link } from "react-router-dom"
import "../App.css"

const SearchMenu = ({books}) => {
    const [query,setQuery] = useState("")
    const [showBooks,setShowBooks] = useState([])
    const handleOnChange = (e) => {
        setQuery(e.target.value)
        search();
    }
    const ISBN="",authors="";
    const getData = () => {
        for (let i in books){
            let ISBN="",authors="";
            for (let j in books[i].industryIdentifiers){    
                ISBN+= books[i].industryIdentifiers[j].type +" ";
            }
            for (let j in books[i].authors){
                authors+=books[i].authors[j] + " ";
            }
            let authorArr = books[i].authors;
            for (let j in authorArr){
                authors += authorArr[j] + " ";
            }
            console.log("cw",ISBN,authors);
        }
    }


    const search = () => {
        const serachResult = 
        query === ""
          ? books
          : books.filter((book) =>
              (book.title.toLowerCase().includes(query.toLowerCase())|| 
              book.authors.filter((a)=>(a.includes(query))) || 
              book.industryIdentifiers.filter((ii)=>(ii.type.includes(query))))
            );
        console.log(serachResult);
            for (let i in books){
            if (books[i].title.toLowerCase().includes(query) || authors.toLowerCase().includes(query) || ISBN.toLowerCase().includes(query)){
                if(!showBooks.includes(books[i]))
                    setShowBooks([books[i]])
            }
            console.log(showBooks)
        }
    }
    useState(()=>{
        getData();
        console.log("dgerger");
    },[])
    return (
    <div className="search-books">
        <div className="search-books-bar">
            {/* <a className="close-search" onClick={() => {}}>
              Close
            </a> */}
            <Link to="/" className="close-search" >Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                onChange={(e)=>handleOnChange(e)}
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {
                    showBooks.map((book,id)=>(
                        <li>
                        <div className="book">
                            <div className="book-top">
                            <div
                                className="book-cover"
                                style={{
                                width: 128,
                                height: 193,
                                backgroundImage:`url(${book.imageLinks.thumbnail})`
                                }}
                            ></div>
                            <div className="book-shelf-changer">
                                <select>
                                <option value="none" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">
                                    Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                                </select>
                            </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            {book.authors.map((author,id) => ( <div className="book-authors">{author}</div>))}
                        </div>
                        </li>
                    ))
                }
            </ol>
        </div>
    </div>
  )
}

export default SearchMenu