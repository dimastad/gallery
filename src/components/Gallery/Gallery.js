import React, { useEffect, useRef, useState } from 'react';
import './Gallery.scss';

const Gallery = ({
  galleryImages,
  handleImageDelete,
  onFileDragOver,
  onFileDrop }) => {

  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(null);

  useEffect(() => {
    if(containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    window.addEventListener('resize', event => {
      setContainerWidth(containerRef.current.offsetWidth);
    })
  },[containerRef])

  const getResizedImages = () => {
    const imageArr = [];
    let lines = [];
    let imgRatioSum = 0;
    const linesRatio = containerWidth / 200;

    galleryImages.forEach((image, index) => {
      imgRatioSum += image.width / image.height;
      lines[index] = {
        ratio: image.width / image.height,
        url: image.url
      }

      if (imgRatioSum > linesRatio) {
        lines.forEach(({ratio, url}) => {
          imageArr.push({
            width: containerWidth * ratio / imgRatioSum,
            url: url
          })
        })

        lines = [];
        imgRatioSum = 0;
      }

      if (index + 1 === galleryImages.length) {
        lines.forEach(({ratio, url}) => {
          imageArr.push({
            width: containerWidth * ratio / linesRatio,
            url: url
          })
        })
      }

    });
    return imageArr;
  }

  return (
    <div className='gallery'>
      <ul
        className='gallery__list'
        ref={containerRef}
        onDragOver={onFileDragOver}
        onDrop={onFileDrop} >
        {getResizedImages().map((item, index) => (
            <li
              className='gallery__item'
              style={{ width: item.width }}
              key={index}>
              <img
                className='gallery__img ph-picture'
                src={item.url}
                alt=''
                loading='lazy'
                onClick={handleImageDelete} />
              <span className="gallery__item-text">click for delete</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Gallery;