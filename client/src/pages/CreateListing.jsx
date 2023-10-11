import React, { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({});
  const [offer,setOffer] = useState(false);
  const [rent,setRent] = useState(false);

  const changeHandler = (e) => {
    if(e.target.type === "checkbox"){
        if(e.target.id==='rent') setRent(e.target.checked );
        if(e.target.id==='offer') setOffer(e.target.checked );
    }
    setFormData({
      ...formData,
      [e.target.id]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
   

  };
  console.log(formData);
  return (
    <main className="p-3 mx-auto max-w-4xl">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
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
          />
          <textarea
            type="text"
            id="description"
            className="p-3 rounded-lg border"
            placeholder="Description"
            rows="3"
            required
            onChange={changeHandler}
          />
          <input
            type="text"
            id="address"
            className="p-3 rounded-lg border"
            placeholder="Address"
            required
            onChange={changeHandler}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={changeHandler}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={changeHandler}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={changeHandler}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={changeHandler}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={changeHandler}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <input
              type="number"
              id="bedrooms"
              className="p-3 rounded-lg border w-16"
              defaultValue="1"
              required
              min="1"
              onChange={changeHandler}
            />
            <label htmlFor="bedrooms">Beds</label>
            <input
              type="number"
              id="bathrooms"
              className="p-3 rounded-lg border w-16"
              defaultValue="1"
              required
              min="1"
              onChange={changeHandler}
            />
            <label htmlFor="bathrooms">Baths</label>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="regularPrice" className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                className="p-3 rounded-lg border"
                defaultValue="0"
                required
                min="0"
                onChange={changeHandler}
              />
              <p>
                <p>Regular Price</p>
                {rent && <p className="text-xs">($/month)</p>}
              </p>
            </label>

            { offer &&
              <label
                htmlFor="discountedPrice"
                className="flex gap-2 items-center"
              >
                <input
                  type="number"
                  id="discountedPrice"
                  className="p-3 rounded-lg border"
                  defaultValue="0"
                  required
                  min="0"
                  onChange={changeHandler}
                />
                <p>
                  <p>Discounted Price</p>
                  {rent && <p className="text-xs">($/month)</p>}
                </p>
              </label>
            }
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
            />
            <button
              className="p-3 text-green-700 border-green-700 border rounded 
              hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>
          <button
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95
             disabled:opacity-80"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
