import React, { useState, useRef } from "react";
import {
  DELETE_PRODUCT,
  GET_CATEGORY,
  GET_PRODUCTS,
  INSERT_PRODUCT,
  UPDATE_PRODUCT,
} from "graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { deleteFileFromFirebase, uploadImageToFireBase } from "firebase";
import ModalAddProduct from "components/ModalAddProduct";
import ModalEditProduct from "components/ModalEditProduct";
import TableProduct from "components/TableProduct";
import SideBar from "components/SideBar";

export default function Products() {
  const [formProduct, setFormProduct] = useState({
    product_name: "",
    category_id: "",
    price: "",
    rating: "",
  });
  const [editProduct, setEditProduct] = useState({
    id: "",
    category_id: "",
    instock: true,
    price: 0,
    product_category: {},
    product_image: "",
    product_name: "",
    rating: 0,
    __typename: "",
  });
  const [imageAsFile, setImageAsFile] = useState("");
  const imageInput = useRef(null);
  const imageEdit = useRef(null);

  // Query Graph
  const { data, loading: loadingProduct } = useQuery(GET_PRODUCTS, {
    variables: { where: {} },
  });

  // Mutation Graph
  const [insertProduct, { loading: loadingInsert, error: errorInsert }] =
    useMutation(INSERT_PRODUCT, {
      refetchQueries: [GET_PRODUCTS],
    });
  const [deleteProduct, { loading: loadDelete }] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [GET_PRODUCTS],
  });
  const [updateProduct, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_PRODUCT, {
      refetchQueries: [GET_CATEGORY],
    });

  // Function
  const handleInputChange = (e) => {
    setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const resetForm = async () => {
    imageInput.current.value = null;
    setImageAsFile("");
    setFormProduct({
      product_name: "",
      category_id: "",
      price: "",
      rating: "",
    });
  };

  const resetFormEdit = () => {
    setEditProduct({
      id: "",
      category_id: "",
      instock: true,
      price: 0,
      product_category: {},
      product_image: "",
      product_name: "",
      rating: 0,
      __typename: "",
    });
    imageEdit.current.value = null;
    setImageAsFile("");
  };

  const handleDelete = async (uuid, imageURL) => {
    if (window.confirm("Yakin mau ngehapus?")) {
      await deleteProduct({ variables: { _eq: uuid } });
      await deleteFileFromFirebase(imageURL);
      console.log("success delete data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getUploadedUrl = await uploadImageToFireBase(imageAsFile);
    await insertProduct({
      variables: {
        product_name: formProduct.product_name,
        price: formProduct.price,
        product_image: getUploadedUrl,
        category_id: formProduct.category_id,
        rating: formProduct.rating,
      },
    });
    resetForm();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (imageAsFile === "") {
      await updateProduct({
        variables: {
          id: { _eq: editProduct.id },
          _set: {
            category_id: editProduct.category_id,
            instock: editProduct.instock,
            price: editProduct.price,
            product_name: editProduct.product_name,
            rating: editProduct.rating,
          },
        },
      });
      console.log("success Update data");
    } else {
      await deleteFileFromFirebase(editProduct.product_image);
      const getUploadedUrl = await uploadImageToFireBase(imageAsFile);
      await updateProduct({
        variables: {
          id: { _eq: editProduct.id },
          _set: {
            category_id: editProduct.category_id,
            instock: editProduct.instock,
            price: editProduct.price,
            product_name: editProduct.product_name,
            rating: editProduct.rating,
            product_image: getUploadedUrl,
          },
        },
      });
      console.log("success Update data");
    }
  };

  return (
    <>
      <SideBar></SideBar>{" "}
      <div className="container p-5" style={{ marginLeft: "20rem" }}>
        <div className="d-flex justify-content-between">
          <h3>Products</h3>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#insert-product"
          >
            Add Product
          </button>
        </div>

        <div className="mt-3">
          {loadingProduct || loadDelete || loadingInsert || loadingUpdate ? (
            <div>Please wait</div>
          ) : null}
          <TableProduct
            data={data}
            setEditProduct={setEditProduct}
            handleDelete={handleDelete}
          ></TableProduct>
        </div>
        {/* end */}

        {/* <!-- Modal ADD Product --> */}
        <ModalAddProduct
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleImageAsFile={handleImageAsFile}
          formProduct={formProduct}
          loadingInsert={loadingInsert}
          errorInsert={errorInsert}
          imageInput={imageInput}
        ></ModalAddProduct>

        {/* <!-- Modal Edit Product --> */}
        <ModalEditProduct
          handleEdit={handleEdit}
          handleImageAsFile={handleImageAsFile}
          handleEditChange={handleEditChange}
          resetFormEdit={resetFormEdit}
          editProduct={editProduct}
          loadingUpdate={loadingUpdate}
          errorUpdate={errorUpdate}
          imageEdit={imageEdit}
        ></ModalEditProduct>
      </div>
    </>
  );
}
