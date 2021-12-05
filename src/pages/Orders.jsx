import { useMutation, useSubscription } from "@apollo/client";
import ModalDetailProd from "components/ModalDetailProd";
import ModalimagePayment from "components/ModalimagePayment";
import SideBar from "components/SideBar";
import TableOrder from "components/TableOrder";
import { GET_ORDERS, UPDATE_ORDERS } from "graphql/queries";
import React, { useState } from "react";

export default function Orders() {
  const [imagePayment, setImagePayment] = useState("");
  const [detailTrans, setDetailTrans] = useState(null);
  const { data, loading, error } = useSubscription(GET_ORDERS);
  const [updateOrder, { loading: loadingUpdate }] = useMutation(UPDATE_ORDERS);

  const handleAccept = (id) => {
    if (window.confirm("Yakin Nih Mau ACC?")) {
      updateOrder({ variables: { _eq: id, status: "accepted" } });
    }
  };

  const handleReject = (id) => {
    if (window.confirm("Yakin Nih Mau Reject?")) {
      updateOrder({ variables: { _eq: id, status: "rejected" } });
    }
  };

  return (
    <>
      <SideBar></SideBar>{" "}
      <div className="container p-5" style={{ marginLeft: "20rem" }}>
        <div className="d-flex justify-content-between">
          <h3>Orders</h3>
          {/* <button
            type="button"
            className="btn btn-primary"
            onClick={() => refetch({ where: {} })}
          >
            Refresh
          </button> */}
        </div>
        <div className="mt-3">
          {loading || loadingUpdate ? <div>Please wait</div> : null}
          {error ? <div>{error.message}</div> : null}
          <TableOrder
            data={data}
            setDetailTrans={setDetailTrans}
            setImagePayment={setImagePayment}
            handleAccept={handleAccept}
            handleReject={handleReject}
          ></TableOrder>
        </div>

        {/* Modal Image Payment */}
        <ModalimagePayment imagePayment={imagePayment}></ModalimagePayment>

        {/* Modal Detail Transaction */}
        <ModalDetailProd detailTrans={detailTrans}></ModalDetailProd>
      </div>
    </>
  );
}
