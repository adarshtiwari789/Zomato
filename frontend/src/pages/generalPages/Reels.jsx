import React, { useEffect, useRef , useState } from 'react'
import {useNavigate , Link} from 'react-router-dom'
import axios from 'axios'
import '../../styles/reels.css'


export default function Reels() {
const [videos , setvideos] = useState([])

useEffect(()=>{
  axios.get('http://localhost:3000/api/food/getfood' , {withCredentials : true } )
  .then(respon => {
    setvideos(respon.data.fooditems)
  })
},[])




  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const videos = container.querySelectorAll('video')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0.25, 0.6, 0.9] }
    )

    videos.forEach((v) => {
      v.pause()
      observer.observe(v)
    })

    return () => observer.disconnect()
  }, [videos])

  return (
    <div className="reels-container" ref={containerRef}>

      {videos.map((item) => (
        <section className="reel-item" key={item._id}>
       
          <video
            className="reel-video"
            src={item.foodvideo}
            playsInline
            muted
            loop
            preload="metadata"
          />
        
          <div className="reel-overlay">
            <div className="reel-meta">
              <h3 className="reel-title">{item.description}</h3>
              <Link className='visit-store' to={"/food-partner/" + item.foodpartner} aria-label= "Visit store"  >Visit store</Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
