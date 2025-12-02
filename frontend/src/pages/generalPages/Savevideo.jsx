import React, { useState , useEffect} from 'react'
import axios from 'axios';
import ReelFeed from '../../../component/Reelfeed';
import Navbar from '../../../component/Navbar';

const save = () => {
    const [Video , setVideo] = useState([])
   useEffect(()=>{
    const response = axios.get('http://localhost:3000/api/food/save' , {withCredentials: true})
    .then((res)=>{
      console.log(res.data.savedFoods)
    const savedvideo = res.data.savedFoods.map((item)=>({
      foodvideo: item.food.foodvideo,
      _id: item.food._id ,
      description: item.food.description ,
      likeCount:item.food.likeCount ,
      savesCount:item.food.savesCount ,
      commentsCount:item.food.CommentsCount,
      foodpartner: item.food.foodpartner,
    }))

    console.log(savedvideo)
    setVideo(savedvideo)
    })
   } , [])
    return (
      <div>
    <ReelFeed 
    items={Video}
    />
      <Navbar />
      </div>
  )
}

export default save
