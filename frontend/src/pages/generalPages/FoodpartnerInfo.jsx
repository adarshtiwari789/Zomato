import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../styles/reels.css'
const FoodpartnerInfo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [foodpar, setFoodpar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:3000/api/foodpartner/${id}`, { withCredentials: true })
      .then(respon => {
      
        setFoodpar(respon.data.foodPartner);
        setVideo(respon.data.foodPartner.foodItems || []);
       
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching foodpartner:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id])

  return (
    <div className="foodpartner-profile">
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {foodpar && (
      <div className="foodpartner-info">
        <img
          className="foodpartner-image"
          src={foodpar.image }
        ></img>
        <div>
          <h2 className="foodpartner-textinfo-username">{foodpar.username}</h2>
          <h3 className="foodpartner-textinfo-address">{foodpar.address}</h3>
          <p className="foodpartner-textinfo-mobile">{foodpar.mobile_number}</p>
        </div>
      </div>
      )}
      <div className="profile-grid">
        {video && video.length > 0 ? (
          video.map((v) => (
            <div key={v._id} className="profile-grid-item">
              <video
                className="profile-grid-video"
                src={v.foodvideo}
                muted
              ></video>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </div>
  );
};

export default FoodpartnerInfo;
