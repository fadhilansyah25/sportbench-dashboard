import React from "react";

export default function TableProduct({ data, setEditProduct, handleDelete }) {
  return (
    <>
      <table id="example" className="table display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Instock</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.sport_bench_products?.map((item, idx) => (
            <tr key={idx}>
              <td>{item.id.slice(0, 8)}</td>
              <td>{item.product_name}</td>
              <td className="text-capitalize">
                {item.product_category.category}
              </td>
              <td>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(item.price)}
              </td>
              <td>{item.rating}</td>
              <td>{item.instock ? "yes" : "no"}</td>
              <td>
                <img
                  src={item.product_image}
                  alt=""
                  style={{ height: "100px", width: "150px" }}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm mx-1 btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#edit-product"
                  onClick={() => setEditProduct(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm mx-1 btn-danger"
                  onClick={() => handleDelete(item.id, item.product_image)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
