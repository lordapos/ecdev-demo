import React from 'react'
import './_product-preview.scss'

const ProductPreview = ({mainImage, alt}) => {
  return (
    <div className="product__preview">
      <div className="product__preview__left">
        <ul className="product__thumbs ">
          <li className="product__thumbs__item">
            <img src={mainImage} alt={alt}/>
          </li>
          <li className="product__thumbs__item">
            <img src={mainImage} alt={alt}/>
          </li>
          <li className="product__thumbs__item">
            <img src={mainImage} alt={alt}/>
          </li>
          <li className="product__thumbs__item">
            <img src={mainImage} alt={alt}/>
          </li>
          <li className="product__thumbs__item">
            <img src={mainImage} alt={alt}/>
          </li>
        </ul>
      </div>
      <div className="product__preview__right">
        <img src={mainImage} alt={alt}/>
      </div>
    </div>
  );
};
export default ProductPreview;