import React, { useEffect, useState } from 'react';
import './App.scss';
// import Form from './components/Form/Form';
import Gallery from './components/Gallery/Gallery';
// import { galleryImages } from './images/gallery-images.json';

function App() {
  const [images, setImages] = useState([])

  const url = 'https://run.mocky.io/v3/99f32595-cf85-4340-91fc-a3a7c0d5efb5';

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => localStorage.setItem('images' , JSON.stringify(json.galleryImages)))

    setImages(
      JSON.parse(
        localStorage.getItem('images')))
  }, [])

  const handleImageDelete = (e) => {
    const imgSrc = e.target.src;
    const _images = images.filter(img => img.url !== imgSrc );
    setImages(_images);
    _images.length === 0 && localStorage.clear();
    localStorage.setItem('images', JSON.stringify(_images));
  }

  return (
    <div className="App">
      <h1>Gallery</h1>
      <Gallery
        galleryImages={images}
        handleImageDelete={handleImageDelete} />
    </div>
  );
}

export default App;
