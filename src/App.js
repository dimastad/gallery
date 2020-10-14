import React, { useEffect, useState } from 'react';
import './App.scss';
import Form from './components/Form/Form';
import Gallery from './components/Gallery/Gallery';
// import { galleryImages } from './images/gallery-images.json';

function App() {
  const [url, setUrl] = useState('');
  const [size, setSize] = useState({})
  const [images, setImages] = useState([]);

  const mockUrl = 'https://run.mocky.io/v3/99f32595-cf85-4340-91fc-a3a7c0d5efb5';

  fetch(mockUrl)
    .then(response => response.json())
    .then(json => localStorage.setItem('images' , JSON.stringify(json.galleryImages)))

  useEffect(() => {
    setImages(JSON.parse(localStorage.getItem('images')))
  }, [])

  const handleImageDelete = (e) => {
    const imgSrc = e.target.src;
    const _images = images.filter(img => img.url !== imgSrc );
    setImages(_images);
    _images.length === 0 && localStorage.clear();
    localStorage.setItem('images', JSON.stringify(_images));
  }

  const handleOnChange = (e) => e.target.value && setUrl(e.target.value);

  const onLoad = ({target:img}) => {
    setSize({
      width: img.offsetWidth,
      height: img.offsetHeight
    })
  }

  const addData = (e) => {
    e.preventDefault();
    const _images = [...images];
    const {width, height} = size;
    const img = {
      url,
      width,
      height
    }

    img.url && _images.push(img);
    localStorage.setItem('images', JSON.stringify(_images))
    setImages(_images);
    setUrl('');
  }

  return (
    <div className="App">
      <Form
        addData={addData}
        value={url}
        handleOnChange={handleOnChange} />
      <img
        className='form__preview'
        src={url}
        onLoad={onLoad}
        alt='' />
      <hr/>
      <Gallery
        galleryImages={images}
        handleImageDelete={handleImageDelete} />
    </div>
  );
}

export default App;
