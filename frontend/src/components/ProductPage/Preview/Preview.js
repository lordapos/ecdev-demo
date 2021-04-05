import React, {useState} from 'react'
import './_preview.scss'

const Preview = ({alt, images}) => {

  const [mainImage, setMainImage] = useState(`${images[0]}`)

  const currentImage = mainImage === 'undefined'? images[0] : mainImage;

  const handleChangeImage = (e) =>{
    setMainImage(e.target.src)
  }

  const renderItems = (items) =>{
    return items.map((item, index) =>{
      return(
        <button className='product__thumbs__item' key={index} onClick={handleChangeImage} onKeyDown={handleChangeImage}>
          <img src={item} alt={alt}/>
        </button>
      )
    })
  }

  return (
    <div className='product__preview'>
      <div className='product__preview__left'>
        <div className='product__thumbs'>
          {renderItems(images)}
        </div>
      </div>
      <div className='product__preview__right'>
        <img src={currentImage} alt={alt}/>
      </div>

    </div>
  );
};
export default Preview;