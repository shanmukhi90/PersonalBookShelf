import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookOpen} from "@fortawesome/free-solid-svg-icons";

function App() {
  const navigate=useNavigate();
  const [search,setSearch]=useState("");
  const [books,setBooks]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [searchStatus,setSearchStatus]=useState("");
   function handleChange(e){
      setSearch(e.target.value);
      setBooks([]);
  }

  async function fetchData(url){
    setIsLoading(true); 
    

    try {
      const results = await fetch(url);
      const json = await results.json();
      const newBooks = json.docs.map((doc) => ({
        title: doc.title,
        edition_count: doc.edition_count,
      }));
      console.log(newBooks);
      if(newBooks.length===0) setSearchStatus("No Books found");
      else setBooks([...books,...newBooks]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); 
    }
  }
  async function handleSearch(e){
    e.preventDefault();
    setBooks([]);
    console.log(search);
    setSearchStatus(""); 
    
    const url="https://openlibrary.org/search.json?q="+search+"&limit=10&page=1";
    await fetchData(url);
    console.log(books);
  }
  function handleAdd(title, edition_count) {
    const existingBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
  
    const existingBook = existingBooks.find(
      (book) => book.title === title && book.edition_count === edition_count
    );
  
    if (existingBook) {
      alert("Already Book is in you bookshelf");
    } else {
      localStorage.setItem(
        'bookshelf',
        JSON.stringify([...existingBooks, { title, edition_count }])
      );
      alert("Added Successfully");
    }
  }

  function handleBookShelf(){
      navigate("/BookShelf");
  }
  
  return (
    <div>
      <nav>
      <FontAwesomeIcon icon={faBookOpen} style={{color: "#fbfcfe",height:"40px"}} />
        <h1>PERSONAL  BOOKSHELF</h1>
        <button className="mbs" onClick={handleBookShelf}>My BOOKSHELF</button>
        </nav>
      
        <div>
          <div className="search">
          <label><h2>Search By Book Name</h2></label>
          <div className="si">
          <input type="text" placeholder="Search for book..." onChange={handleChange} value={search} />
          <button type="submit" onClick={handleSearch}>Search</button>
          </div>
          </div>
         
          {isLoading?<h4>Loading....</h4>:""}
          {books.length>0?<div className="books">{books.map(book=>(
             <div className="bookcard">
             <div className="bci">
              <label><h4>Book Title:</h4></label>
              <p>{book.title}</p>
              </div>
              <div className="bci">
              <label><h4>Edition Count:</h4></label>
              <p>{book.edition_count}</p>
          </div>
           <button  onClick={()=>{handleAdd(book.title,book.edition_count)}}>Add to Mybookshelf</button>
            </div>
          ))}</div>:""}
          {searchStatus==="No Books found"?"No Books found":""}
        </div>
  

    </div>
  );
}

export default App;
