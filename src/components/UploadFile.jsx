import React, { useState, useRef } from "react";
import { createFireBaseAuth, uploadImageToFireBase } from "../firebase";
import { useMutation } from "@apollo/client";
import { INSERT_USER } from "graphql/queries";

export default function UploadFile() {
  const [imageAsFile, setImageAsFile] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const imageInput = useRef(null);
  const [insertUser, { loading: loadingUpload, error: erroInsert }] =
    useMutation(INSERT_USER);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const hanldeInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", password: "" });
    imageInput.current.value = null;
    setImageAsFile("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getUploadedUrl = await uploadImageToFireBase(imageAsFile);
    const userCredential = await createFireBaseAuth(form.email, form.password);
    console.log(userCredential);
    await insertUser({
      variables: {
        uid: userCredential.uid,
        email: form.email,
        name: form.name,
        imageUrl: getUploadedUrl,
      },
    });
    resetForm();
  };

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="card" style={{ width: "20rem" }}>
          <div className="card-body">
            <div className="text-danger">
              {erroInsert ? <p>Something Wrong</p> : null}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={hanldeInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={hanldeInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={form.password}
                  onChange={hanldeInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  ref={imageInput}
                  className="form-control"
                  type="file"
                  onChange={handleImageAsFile}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>

            <div className="mt3">
              {loadingUpload ? <p>Uploading data on progress</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
