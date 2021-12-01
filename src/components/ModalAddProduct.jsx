import { useQuery } from "@apollo/client";
import { GET_CATEGORY } from "graphql/queries";
import React from "react";

export default function ModalAddProduct({
  handleSubmit,
  handleInputChange,
  formProduct,
  loadingInsert,
  errorInsert,
  imageInput,
  handleImageAsFile
}) {
  const { data: category } = useQuery(GET_CATEGORY);

  return (
    <div
      className="modal fade"
      id="insert-product"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Product
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="product_name"
                  value={formProduct.product_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="category_id"
                  value={formProduct.category_id}
                  onChange={handleInputChange}
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
                  value={formProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  className="form-control"
                  type="file"
                  ref={imageInput}
                  onChange={handleImageAsFile}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Rating</label>
                <input
                  type="number"
                  className="form-control"
                  name="rating"
                  value={formProduct.rating}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </form>
            <div className="mt3">
              {loadingInsert ? <p>Uploading data on progress</p> : null}
              {errorInsert ? <p>{errorInsert?.message}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
