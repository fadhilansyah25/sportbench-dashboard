import React from "react";

export default function ModalDetailProd({detailTrans}) {
  return (
    <div
      className="modal fade"
      id="detail-transaction"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Detail Transaction
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <img
              src={detailTrans?.product_order.product_image}
              alt=""
              className="img-fluid"
            />
            <div className="mt-3 pe-5 ps-2">
              <h5 className="d-inline m-0">
                {detailTrans?.product_order.product_name}
              </h5>
              <p className="d-inline ms-2">
                ({detailTrans?.product_order.id.slice(0, 8)})
              </p>
              <p>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(detailTrans?.product_order.price)}
              </p>
              <div
                className="d-flex justify-content-between"
                style={{ fontSize: "0.9rem" }}
              >
                <p>
                  Color <br />
                  <strong>{detailTrans?.color}</strong>
                </p>
                <p>
                  Size <br />
                  <strong>{detailTrans?.size}</strong>
                </p>
                <p>
                  Quantity <br />
                  <strong>{detailTrans?.quantity} pcs</strong>
                </p>
              </div>
              <p className="m-0">Total</p>
              <h5>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(detailTrans?.total)}
              </h5>
            </div>
          </div>
          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
