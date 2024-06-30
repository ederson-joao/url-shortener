import React, { useState } from 'react';
import './urlShortener.css';
import illustrationWorking from '../img/illustration-working.svg'

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleShorten = async () => {
    try {
      const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
          'Authorization': `ad8a70d3ed757d9f495dddf16a85848a8333672c`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ long_url: longUrl })
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.link);
      setErrorMessage('');
    } catch (error) {
      setShortUrl('');
      setErrorMessage('Something went wrong.');
    }
  };

  return (
    <div className="url-shortener">
      <h2>Encurtador de URL</h2>
      <img src={illustrationWorking} alt="illustration-working"/>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Insira a URL para encurtar"
        className="url-input"
      />
      <button onClick={handleShorten} className="shorten-button">Encurtar URL</button>
      
      {shortUrl && (
        <div className="shortened-url">
          <p>URL Encurtada:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="shortened-link">{shortUrl}</a>
        </div>
      )}
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default UrlShortener;
