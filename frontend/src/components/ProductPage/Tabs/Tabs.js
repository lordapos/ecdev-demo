import React, { useState } from 'react'
import './_tabs.scss'

const Tabs = () => {
  const [tab, setTab] = useState('description')

  const tabHandler = (tab, e) => {
    const tabsNode = document.getElementsByClassName('product-tabs__item')
    for (const node of tabsNode) {
      node.classList.remove('active')
    }
    e.target.classList.add('active')

    setTab(tab)
  }

  const tabsClasses = ['product-tabs']
  tabsClasses.push(tab)

  return (
    <div className={tabsClasses.join(' ')}>
      <ul className='product-tabs__list'>
        <li
          className='product-tabs__item active'
          onClick={(e) => tabHandler('description', e)}
        >
          Description
        </li>
        <li
          className="product-tabs__item"
          onClick={(e) => tabHandler('specs', e)}
        >
          Specs
        </li>
        <li
          className="product-tabs__item"
          onClick={(e) => tabHandler('videos', e)}
        >
          Video
        </li>
      </ul>
      <div className="product-tab__item description-tab">
        <h5 className="product-tab__headline">
          Description
        </h5>
        <p className="description-tab__tagline">
          The Precision of Fine Control
        </p>
        <p className="description-tab__text">
          The first PowerShot G-Series camera to incorporate a full-featured 2.36 million dot electronic viewfinder, the PowerShot G5 X camera makes it simple
          to capture high-quality stills and video without taking your eye away from the camera. With its 1.0-inch CMOS sensor and a 4.2x Optical Zoom lens, it
          can deliver incredible performance that's easy to see.
        </p>
        <p className="description-tab__tagline">
          Built-in Electronic Viewfinder
        </p>
        <p className="description-tab__text">
          The PowerShot G5 X's 2.36 million dot electronic viewfinder adds flexibility in how you use the camera. It's great for photographers who prefer to
          hold the camera up to their eye, and is a veritable lifesaver in bright light and other situations where the lighting is difficult. What's more, you
          can also customize the image information you see in the viewfinder to help get your photo looking how you want it to, and view vivid edge-to-edge
          images you can easily compose, adjust and review.
        </p>

        <p className="description-tab__tagline">
          1.0-inch CMOS Sensor
        </p>
        <p className="description-tab__text">
          At the heart of the PowerShot G5 X camera is a brilliant 1.0-inch 20.2 Megapixel* High-Sensitivity CMOS sensor. Physically larger than the sensors
          found in most compact cameras, the PowerShot G5 X's sensor works in tandem with Canon's DIGIC 6 Image Processor to quickly deliver gorgeous,
          high-resolution images with nuanced details, plus impressive low-light performance with a low signal-to-noise ratio and minimal noise and distortion.
        </p>
      </div>
      <div className="product-tab__item specs-tab">
        <h5 className="product-tab__headline">
          Specs
        </h5>
        <ul className="specs-tab__list">
          <li className="specs-tab__item">
      <span className="specs-tab__name">
      Sensor Type
      </span>
            <p className="specs-tab__description">
              Approx. 22.3 mm x 14.9 mm CMOS
            </p>
          </li>
          <li className="specs-tab__item">
      <span className="specs-tab__name">
      Effective Pixels
      </span>
            <p className="specs-tab__description">
              Approx. 24.1 megapixels
            </p>
          </li>
          <li className="specs-tab__item">
      <span className="specs-tab__name">
      Total Pixels
      </span>
            <p className="specs-tab__description">
              Approx. 24.7 megapixels
            </p>
          </li>
          <li className="specs-tab__item">
      <span className="specs-tab__name">
      Sensor Type
      </span>
            <p className="specs-tab__description">
              Approx. 22.3 mm x 14.9 mm CMOS
            </p>
          </li>
          <li className="specs-tab__item">
      <span className="specs-tab__name">
      Effective Pixels
      </span>
            <p className="specs-tab__description">
              Approx. 24.1 megapixels
            </p>
          </li>
          <li className="specs-tab__item">
      <span className="specs-tab__name">
      Total Pixels
      </span>
            <p className="specs-tab__description">
              Approx. 24.7 megapixels
            </p>
          </li>
          <li className="specs-tab__item">
      <span className="specs-tab__name">
      Sensor Type
      </span>
            <p className="specs-tab__description">
              Approx. 22.3 mm x 14.9 mm CMOS
            </p>
          </li>
          <li className="specs-tab__item">
      <span className="specs-tab__name">
      Effective Pixels
      </span>
            <p className="specs-tab__description">
              Approx. 24.1 megapixels
            </p>
          </li>
          <li className="specs-tab__item">
      <span className="specs-tab__name">
      Total Pixels
      </span>
            <p className="specs-tab__description">
              Approx. 24.7 megapixels
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Tabs