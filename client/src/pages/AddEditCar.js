import React, { useState, useEffect, useRef, useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api'; // Make sure this points to your API
import './AddEditCar.css'; // Import the CSS file

const AddEditCar = () => {
    const { loggedin } = useContext(DataContext);
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [existingImages, setExistingImages] = useState([]); // Images already in the car
    const [imagesToUpload, setImagesToUpload] = useState([]); // New images to upload
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // Ref for the file input

    // Redirect to login if not logged in
    useEffect(() => {
        if (!loggedin) {
            // console.log("================> reresehed !!!")
            navigate('/login');
        }
    }, [loggedin, navigate]);

    // Fetch car details for editing
    useEffect(() => {
        if (id) {
            const fetchCar = async () => {
                try {
                    const response = await api.getCar(id);
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setTags(response.data.tags.join(', '));
                    setExistingImages(response.data.images); // Set existing images
                } catch (error) {
                    console.error('Error fetching car details:', error);
                }
            };
            fetchCar();
        }
    }, [id]);

    // Function to upload images to Cloudinary
    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'your_upload_preset'); // Cloudinary upload preset

        try {
            const response = await api.uploadImage(formData); // POST to your server API endpoint
            return response.data.url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleSubmit = async () => {
        // Check if total images exceed 10
        if (existingImages.length + imagesToUpload.length > 10) {
            alert('You can only add up to 10 images for a car.');
            return;
        }

        // Upload new images to Cloudinary
        const uploadedImageUrls = await Promise.all(
            Array.from(imagesToUpload).map((image) => uploadImage(image))
        );

        // If any image upload failed, stop the form submission
        if (uploadedImageUrls.includes(null)) {
            alert("Failed to upload images. Please try again.");
            return;
        }

        // Construct car data with existing and new image URLs
        const carData = {
            title,
            description,
            tags: tags.split(',').map(tag => tag.trim()),
            images: [...existingImages, ...uploadedImageUrls], // Combine existing and new images
        };

        // If we are editing, update the car, else create a new one
        try {
            if (id) {
                await api.updateCar(id, carData);
            } else {
                await api.createCar(carData);
            }
            navigate('/cars'); // Redirect to cars list page
        } catch (error) {
            console.error("Error saving car:", error);
            alert("An error occurred while saving the car.");
        }
    };

    // Remove an image from the existing images
    const handleRemoveExistingImage = (index) => {
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    // Handle new image selection
    const handleImageSelection = (files) => {
        if (existingImages.length + files.length > 10) {
            alert(`You can only upload ${10 - existingImages.length} more image(s).`);
            fileInputRef.current.value = ''; // Reset file input
            return;
        }
        setImagesToUpload([...imagesToUpload, ...files]);
    };

    return (
        <div className="add-edit-car-container">
            <h2 className="add-edit-car-header">{id ? 'Edit' : 'Add'} Car</h2>

            <input
                className="add-edit-car-input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="add-edit-car-textarea"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                className="add-edit-car-tags"
                placeholder="Tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            {/* Render existing images */}
            {id && (
                <div className="add-edit-car-images-section">
                    <h3>Existing Images</h3>
                    {existingImages.length > 0 ? (
                        <div className="add-edit-car-existing-images">
                            {existingImages.map((image, index) => (
                                <div key={index} className="add-edit-car-existing-image">
                                    <img
                                        src={image}
                                        alt={`Car ${index + 1}`}
                                    />
                                    <button
                                        className="add-edit-car-remove-button"
                                        onClick={() => handleRemoveExistingImage(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No existing images.</p>
                    )}
                </div>
            )}

            {/* Upload new images */}
            <div className="add-edit-car-upload-section">
                <h3>Upload New Images</h3>
                <input
                    className="add-edit-car-upload-input"
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={(e) => handleImageSelection(Array.from(e.target.files))}
                />
            </div>

            {/* Save Button */}
            <button
                className="add-edit-car-save-button"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    );
};

export default AddEditCar;
