import React, {useRef} from 'react'
import './_video-popup.scss'
import { useDispatch, useSelector } from 'react-redux'
import { toggleYoutubePopup } from '../../redux/actions/appAction'

const VideoPopup = ({ youtubeEmbed }) => {
  const videoRef = useRef(null)
  const youtubePopup = useSelector((state) => state.app.visibleYoutubePopupForm)
  const youtubeClasses = youtubePopup ? 'video-popup video-popup--show' : 'video-popup '
  const dispatch = useDispatch()

  const hidePopup = () => {
    dispatch(toggleYoutubePopup(!youtubePopup))
  }

  return (
    <div className={youtubeClasses}>
      <div className="video-popup__inner">
        <div className="video-popup__close" onClick={hidePopup}>✖</div>
        <iframe title={youtubeEmbed} ref={videoRef}  className="video-popup__iframe" src={`https://www.youtube.com/embed/${youtubeEmbed}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
        </iframe>
      </div>
    </div>
  )
}

export default VideoPopup