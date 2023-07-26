import React, { useState } from 'react';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import { SavedBooks } from './saved-books';
import "./home.css";

export const Home = () => {
  const [book, setBook] = useState("");
  const apiKey = "AIzaSyASWiBwsV51cQ9yuyUWOuEN5xi-wpw_ROw"; // Replace with your Google Books API key
  const [searchs, setSearch] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [cookies] = useCookies(["access_token"]);

  function handleChange(event) {
    setBook(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}`)
      .then(res => {
        setSearch(res.data.items);
      })
      .catch(error => {
        console.error(error);
      });
  }


  const handleSaveBook = (book) => {
    const {
      volumeInfo: {
        title,
        description,
        authors,
        imageLinks: { thumbnail },
      },
    } = book;
  
    // Check if the required fields are provided
    if (!title || !description) {
      console.error('Title and description are required');
      return;
    }
  
    const imageLink = thumbnail || '';
  
    const newBook = {
      title,
      description,
      authors: authors ? authors.join(', ') : '',
      imageLink,
    };
  
    Axios.post("http://localhost:3001/add/book", newBook)
      .then(res => {
        console.log('Book saved successfully');
        setSavedBooks(prevBooks => [...prevBooks, book]);
      })
      .catch(error => {
        console.error('Error saving book:', error);
      });
  };  
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {!cookies.access_token ? (
          <>
            <h1 style={{ color: "red" }}>Login To Access</h1>
            <input type='text' placeholder='Login to Search Book' disabled /><button type="submit" disabled>Search</button>
          </>
        ) : (
            <>
              <input type='text' placeholder='Search Book' onChange={handleChange} /><button type="submit">Search</button>
            </>
          )}
      </form>
      <div className='books-Container'>
        {searchs.map((search) => {
          const id = search.id;
          const image = search.volumeInfo?.imageLinks?.thumbnail;
          const title = search.volumeInfo.title;
          return (
            <div key={id} className='column'>
              <img src={image} alt={title} />
              <h1>{title}</h1>
              <button onClick={() => handleSaveBook(search)}>read</button>
            </div>
          )
        })}
      </div>
      <SavedBooks savedBooks={savedBooks} />
    </div>
  );
}
