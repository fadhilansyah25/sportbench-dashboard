import { useQuery } from "@apollo/client";
import { GET_CATEGORY } from "graphql/queries";
import React from "react";

export default function ModalEditProduct({
  handleEdit,
  handleImageAsFile,
  handleEditChange,
  resetFormEdit,
  editProduct,
  loadingUpdate,
  errorUpdate,
  imageEdit,
}) {
  const { data: category } = useQuery(GET_CATEGORY);

  return (
    <div
      className="modal fade"
      id="edit-product"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Product
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={resetFormEdit}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleEdit}>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="product_name"
                  value={editProduct?.product_name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="category_id"
                  value={editProduct?.category_id}
                  onChange={handleEditChange}
                  required
                >
                  <option disabled value="">
                    Select Category
                  </option>
                  {category?.sport_bench_product_categories.map((item, key) => (
                    <option key={key} value={item.id}>
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={editProduct?.price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-3">
                <img
                  src={editProduct?.product_image}
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  className="form-control"
                  type="file"
                  ref={imageEdit}
                  onChange={handleImageAsFile}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Rating</label>
                <input
                  type="number"
                  className="form-control"
                  name="rating"
                  value={editProduct?.rating}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={resetFormEdit}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
            <div className="mt3">
              {loadingUpdate ? <p>Updating data on progress</p> : null}
              {errorUpdate ? <p>{errorUpdate?.message}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
