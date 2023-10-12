import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    discountedPrice: 50,
    regularPrice: 50,
    furnished: false,
    offer: false,
    parking: false,
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(files);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image Upload failed (max 2MB /image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("Image Upload failed (max 6 images)");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is" + progress + "%");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const changeHandler = (e) => {
    if (e.target.id == "sell" || e.target.id == "rent") {
      setFormData({ ...formData, type: e.target.id });
    } else if (
      e.target.id == "parking" ||
      e.target.id == "furnished" ||
      e.target.id == "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const res = await fetch("/api/listing/createlisting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log(data);

      setLoading(false);
    
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  console.log(formData);

  return (
    <main className="p-3 mx-auto max-w-4xl">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            className="p-3 rounded-lg border"
            placeholder="Name"
            maxLength="62"
            minLength="5"
            required
            onChange={changeHandler}
            value={formData.name}
          />
          <textarea
            type="text"
            id="description"
            className="p-3 rounded-lg border"
            placeholder="Description"
            rows="3"
            required
            onChange={changeHandler}
            value={formData.description}
          />
          <input
            type="text"
            id="address"
            className="p-3 rounded-lg border"
            placeholder="Address"
            required
            onChange={changeHandler}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
                onChange={changeHandler}
                value={formData.type}
                checked={formData.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={changeHandler}
                value={formData.type}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={changeHandler}
                value={formData.parking}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={changeHandler}
                value={formData.furnished}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={changeHandler}
                value={formData.offer}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <input
              type="number"
              id="bedrooms"
              className="p-3 rounded-lg border w-16"
              required
              min="1"
              onChange={changeHandler}
              value={formData.bedrooms}
            />
            <label htmlFor="bedrooms">Beds</label>
            <input
              type="number"
              id="bathrooms"
              className="p-3 rounded-lg border w-16"
              required
              min="1"
              onChange={changeHandler}
              value={formData.bathrooms}
            />
            <label htmlFor="bathrooms">Baths</label>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="regularPrice" className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                className="p-3 rounded-lg border"
                required
                min="50"
                onChange={changeHandler}
                value={formData.regularPrice}
              />
              <div className="flex flex-col">
                <p>Regular Price</p>
                {formData.type === "rent" && (
                  <p className="text-xs">($/month)</p>
                )}
              </div>
            </label>

            {formData.offer === true && (
              <label
                htmlFor="discountedPrice"
                className="flex gap-2 items-center"
              >
                <input
                  type="number"
                  id="discountedPrice"
                  className="p-3 rounded-lg border"
                  required
                  min="50"
                  onChange={changeHandler}
                  value={formData.discountedPrice}
                />
                <div className="flex flex-col">
                  <span>Discounted Price</span>
                  {formData.type === "rent" && (
                    <span className="text-xs">($/month)</span>
                  )}
                </div>
              </label>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4 ">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 text-sm ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4 mt-2">
            <input
              type="file"
              id="images"
              accept="images/*"
              className="p-3 border border-gray-300 rounded w-full"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              max="6"
            />
            <button
              type="button"
              disabled={uploading}
              className="p-3 text-green-700 border-green-700 border rounded transition-all
              hover:shadow-lg disabled:opacity-80"
              onClick={handleImageSubmit}
            >
              {uploading ? "Uploading" : "Upload"}
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-600 text-sm">{imageUploadError}</p>
          )}

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between py-1 px-4 border-2 items.center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-16 h-16 object-contain rounded-lg"
                />
                <button
                  type="button"
                  className="text-red-600 p-3 uppercase rounded-lg hover:opacity-75 transition-all"
                  onClick={() => removeImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          <button disabled={loading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 transition-all
             disabled:opacity-80"
          >
            {loading?"Creating...":"Create"}
          </button>
          {error && <p className="text-red-600">{error.message}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
