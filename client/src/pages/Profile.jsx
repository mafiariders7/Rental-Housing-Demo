import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileErr, setfileErr] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);
  // console.log(file);
  // console.log(filePercent);

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
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
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setfileErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileRef}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <img
          src={formData.avatar || currUser?.avatar}
          alt="profile"
          onClick={() => fileRef.current.click()}
          className="rounded-full object-cover w-24 cursor-pointer h-24 self-center mt-2"
        />
        <p className="text-center">
          {fileErr ? (
            <span className="text-red-700">Error in image uplaod(image must be less than 2MB)</span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-blue-700">
              file uploading {filePercent} %
            </span>
          ) : fileErr === false && filePercent === 100  ? (
            <span className="text-green-700">Image successfully uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          // value={currUser?.username}
        />

        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          // value={currUser?.email}
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />

        <button
          className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95
         disabled:opacity-80 "
        >
          Update
        </button>
      </form>

      <div className="text-red-600 flex justify-between mt-2 font-semibold cursor-pointer">
        <p>Delete account</p>
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default Profile;
