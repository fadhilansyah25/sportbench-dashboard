import { gql } from "@apollo/client";

export const INSERT_USER = gql`
  mutation MyMutation(
    $email: bpchar!
    $imageUrl: bpchar = ""
    $name: name!
    $uid: bpchar!
  ) {
    insert_testing_firebase_users(
      objects: { email: $email, imageUrl: $imageUrl, name: $name, uid: $uid }
    ) {
      affected_rows
    }
  }
`;

export const GET_CATEGORY = gql`
  query MyQuery {
    sport_bench_product_categories {
      category
      id
    }
  }
`;

export const INSERT_PRODUCT = gql`
  mutation MyMutation(
    $price: numeric!
    $product_image: bpchar!
    $product_name: name!
    $category_id: uuid!
    $rating: Float = 1.5
  ) {
    insert_sport_bench_products(
      objects: {
        product_name: $product_name
        price: $price
        product_image: $product_image
        category_id: $category_id
        rating: $rating
      }
    ) {
      affected_rows
    }
  }
`;

export const GET_PRODUCTS = gql`
  query MyQuery($where: sport_bench_products_bool_exp = {}) {
    sport_bench_products(where: $where) {
      category_id
      rating
      product_name
      product_image
      product_category {
        category
      }
      price
      instock
      id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation MyMutation($_eq: uuid = "") {
    delete_sport_bench_products(where: { id: { _eq: $_eq } }) {
      affected_rows
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation MyMutation2(
    $_set: sport_bench_products_set_input = {}
    $id: uuid_comparison_exp = {}
  ) {
    update_sport_bench_products(where: { id: $id }, _set: $_set) {
      affected_rows
    }
  }
`;

export const GET_ORDERS = gql`
  query MyQuery($where: sport_bench_orders_bool_exp = {}) {
    sport_bench_orders(where: $where) {
      address
      color
      description
      email
      fullname
      id
      noTelephone
      payment_image
      product_id
      user_id
      quantity
      size
      status
      total
      product_order {
        product_image
        id
        product_name
        price
      }
      user_order {
        email
        fullname
        id
        no_telephone
      }
    }
  }
`;

export const UPDATE_ORDERS = gql`
  mutation MyMutation($status: bpchar = "", $_eq: uuid = "") {
    update_sport_bench_orders(
      where: { id: { _eq: $_eq } }
      _set: { status: $status }
    ) {
      affected_rows
    }
  }
`;

export const GET_USERS = gql`
  query MyQuery($where: sport_bench_users_bool_exp = {}) {
    sport_bench_users(where: $where) {
      no_telephone
      id
      fullname
      email
      orders {
        id
      }
    }
  }
`;
