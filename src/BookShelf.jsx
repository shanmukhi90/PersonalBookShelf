import React,{useEffect,useState} from 'react'

function BookShelf() {
    const [status,setStatus]=useState("");
    const [books,setBooks]=useState([]);
    useEffect(()=>{
    const myBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    if(myBooks.length===0){
          setStatus("No Books Added Yet...")
    }else{
       setBooks(myBooks);
    }
},[])

function handleDelete(title,edition_count){
    setBooks([]);
    const existingBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    const filtered = existingBooks.filter(
        (book) => !(book.title === title && book.edition_count === edition_count)
      );
      
    console.log(filtered);
    if(filtered.length===0){
        setStatus("No Books Added Yet...");
    } localStorage.setItem(
        'bookshelf',
        JSON.stringify(filtered)
      );
      setBooks(filtered);
   
}
  return (
    <div>
     <h1>MY BOOKSHELF</h1>
      {books.length>0?
      <div className="books">{books.map(book=>(
        <div className="bookcard">
        <div className="bci">
         <label><h4>Book Title:</h4></label>
         <p>{book.title}</p>
         </div>
         <div className="bci">
         <label><h4>Edition Count:</h4></label>
         <p>{book.edition_count}</p>
     </div>
     <button onClick={()=>{handleDelete(book.title,book.edition_count)}}>Delete</button>
       </div>
     ))}</div>
        :""
      }
      {status !== "" && <p>{status}</p>}

    </div>
  )
}

export default BookShelf