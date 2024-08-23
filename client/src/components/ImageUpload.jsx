import React, { useState } from 'react'
import axios from 'axios'

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const response = await axios.post(
        'http://localhost:3001/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          
        }
      )

      setUploadedImageUrl(response.data.imageUrl)
    } catch (error) {
      console.error('Error uploading the file:', error)
    }
  }

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadedImageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedImageUrl}
            alt='Uploaded'
            style={{ width: '300px' }}
          />
        </div>
      )}
    </div>
  )
}

export default ImageUpload
