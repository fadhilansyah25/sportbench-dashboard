import SideBar from "components/SideBar";
import React from "react";

export default function Home() {
  return (
    <>
      <SideBar></SideBar>
      <div
        className="container p-5 text-center"
        style={{ marginLeft: "20rem" }}
      >
        <h2>Welcome Back Fellas</h2>
        <img
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
          style={{ maxHeight: "550px" }}
          className="img-fluid mt-3"
        />
      </div>
    </>
  );
}
