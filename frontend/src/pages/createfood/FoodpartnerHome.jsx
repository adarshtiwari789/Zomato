import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/foodpartnerhome.css'

function FoodpartnerHome() {
  const [foodname, setFoodname] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  const onFileChange = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    if (!foodname) return setMessage('Please enter a food name')
    if (!file) return setMessage('Please choose a video file')

    const fd = new FormData()
    // backend expects the file under the 'video' field (multer configured with upload.single('video'))
    fd.append('video', file)
    fd.append('foodname', foodname)
    fd.append('description', description)

    try {
      setUploading(true)
      setProgress(0)

      // POST to dummy route for development/testing; change to /api/food/create for production
      const endpoint = 'https://zomato-aqgm.onrender.com/api/food/create'

      await axios.post(endpoint, fd, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (pe) => {
          if (!pe.total) return
          setProgress(Math.round((pe.loaded * 100) / pe.total))
        },
      })

      // on success navigate to user home
    } catch (err) {
      console.error('Upload error', err)
      setMessage(err.response?.data?.error || err.message || 'Upload failed')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="fp-home-container">
      <h2>Food Partner — Upload Food Video</h2>
      <form className="fp-upload-form" onSubmit={onSubmit}>
        <label className="fp-field">
          <span>Food name</span>
          <input
            type="text"
            name="foodname"
            value={foodname}
            onChange={(e) => setFoodname(e.target.value)}
            placeholder="e.g. Paneer Butter Masala"
            required
          />
        </label>

        <label className="fp-field">
          <span>Description</span>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            rows={3}
          />
        </label>

        <label className="fp-field">
          <span>Video (video)</span>
          <input type="file" accept="video/*" name="video" onChange={onFileChange} />
        </label>

        {preview && (
          <div className="fp-preview">
            <video src={preview} controls muted style={{ maxWidth: '100%', maxHeight: 360 }} />
          </div>
        )}

        <div className="fp-actions">
          <button type="submit" className="fp-btn" disabled={uploading}>
            {uploading ? `Uploading... ${progress}%` : 'Upload'}
          </button>
          <div className="fp-progress">{uploading && <progress value={progress} max="100" />}</div>
        </div>

        {message && <p className="fp-message">{message}</p>}
      </form>
    </div>
  )
}

export default FoodpartnerHome
