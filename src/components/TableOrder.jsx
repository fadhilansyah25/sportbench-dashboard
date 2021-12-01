import React from "react";

export default function TableOrder({
  data,
  setDetailTrans,
  setImagePayment,
  handleAccept,
  handleReject,
}) {
  return (
    <>
      <table id="example" className="table display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>ID</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Whatsapp</th>
            <th>Total</th>
            <th>Address</th>
            <th>Details</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: ".85rem" }}>
          {data?.sport_bench_orders?.map((item, idx) => (
            <tr key={idx}>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>{item.id.slice(0, 8)}</td>
              <td>{item.fullname}</td>
              <td>{item.email}</td>
              <td>{item.noTelephone}</td>
              <td>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(item.total)}
              </td>
              <td>{item.address}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm mx-1 btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#detail-transaction"
                  onClick={() => setDetailTrans(item)}
                >
                  View
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm mx-1 btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#image-payment"
                  onClick={() => setImagePayment(item.payment_image)}
                >
                  View
                </button>
              </td>
              <td className="text-capitalize">{item.status}</td>
              <td>
                {/* {item.status === "waiting" ? ( */}
                <>
                  <button
                    type="button"
                    className="btn btn-sm mx-1 btn-outline-success"
                    onClick={() => handleAccept(item.id)}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm mx-1 btn-outline-danger"
                    onClick={() => handleReject(item.id)}
                  >
                    Reject
                  </button>
                </>
                {/* ) : item.status} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
