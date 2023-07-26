import React from "react";

export const SavedBooks = ({ savedBooks }) => {

  if (!savedBooks) {
    return null; // Handle the case when savedBooks is undefined or empty
  }

  return (
    <div>
      <h2>saved Books:</h2>
      <div className="saved-books">
        {savedBooks.map((savedBook) => (
          <div key={savedBook.id} className="column">
            <img
              src={savedBook.volumeInfo.imageLinks.thumbnail}
              alt={savedBook.volumeInfo.title}
            />
            <h1>{savedBook.volumeInfo.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
