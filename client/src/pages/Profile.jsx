import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [formData, setFormData] = useState({});
  const [uploadError, setUploadError] = useState(false);

  const imageRef = useRef(null);

  console.log(formData);

  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="py-[6rem] px-8 mx-auto">
        <h1 className="text-center font-bold text-xl md:text-3xl">PROFILE</h1>

        <form className="gap-x-6">
          <input
            type="file"
            ref={imageRef}
            onChange={(e) => setFile(e.target.files[0])}
            hange
            hidden
            accept="image/*"
          />
          <img
            src={formData?.avatar || currentUser?.avatar}
            onClick={() => imageRef.current.click()}
            alt="profile image"
            className="rounded-full h-16 w-16 md:h-20 md:w-20 mx-auto object-cover cursor-pointer self-center mt-3"
          />
          <p className="text-center text-xl md:text-base mt-4">
            {uploadError ? (
              <span className="text-red-700">Error uploading image(Max. size of 2MB)!</span>
            ) : filePercent > 0 && filePercent < 100 ? (
              <span className="text-green-900">{`Uploading Progress: ${filePercent}%`}</span>
            ) : (
              filePercent === 100 ? (<span className="text-green-400">Upload Successful</span>) : ""
            )}
          </p>

          <div className="gap-4 flex flex-col mx-auto max-w-lg py-3 md:py-5">
            <input
              type="text"
              placeholder="Username"
              className=" w-full p-2 rounded-lg"
              id="username"
              value={currentUser}
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full p-2 rounded-lg"
              id="email"
              value={currentUser}
            />
            <input
              type="text"
              placeholder="password"
              className="w-full p-2 rounded-lg"
              id="password"
              value={currentUser}
            />

            <button className="rounded-lg text-white bg-slate-600 p-3 uppercase">
              Update
            </button>
          </div>

          <div className="flex justify-between mt-5">
            <span className="cursor-pointer text-red-700 ">Delete Account</span>
            <span className="cursor-pointer text-blue-600 ">Sign Out</span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
