import { useQuery } from "@apollo/client";
import SideBar from "components/SideBar";
import { GET_USERS } from "graphql/queries";
import React from "react";

export default function Customers() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  return (
    <>
      <SideBar></SideBar>
      <div className="container p-5" style={{ marginLeft: "20rem" }}>
        <div className="d-flex justify-content-between">
          <h3>Customers</h3>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => refetch({ where: {} })}
          >
            Refresh
          </button>
        </div>
        <div className="mt-3">
          {loading ? <div>Please wait</div> : null}
          {error ? <div>{error.message}</div> : null}
          <table
            id="example"
            className="table display"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Whatsapp</th>
                <th>Total Transaction</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: ".85rem" }}>
              {data?.sport_bench_users?.map((item, idx) => (
                <tr key={idx}>
                  <td>ID{item.id.slice(0,8)}</td>
                  <td>{item.fullname}</td>
                  <td>{item.email}</td>
                  <td>{item.no_telephone}</td>
                  <td>{item.orders.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
