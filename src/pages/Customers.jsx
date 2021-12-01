import { useSubscription } from "@apollo/client";
import SideBar from "components/SideBar";
import { GET_USERS } from "graphql/queries";
import React from "react";

export default function Customers() {
  const { data, loading, error } = useSubscription(GET_USERS);
  return (
    <>
      <SideBar></SideBar>{" "}
      <div className="container p-5" style={{ marginLeft: "20rem" }}>
        <h3>Customers</h3>
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
                <th>ID</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Whatsapp</th>
                <th>Total Transaction</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: ".85rem" }}>
              {data?.sport_bench_users?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.id}</td>
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
