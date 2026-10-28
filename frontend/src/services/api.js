import axios from "axios";
// Set the base URL for the API
const apiBaseUrl = "http://localhost:3000";

export function getProduct() {
  return axios.get(`${apiBaseUrl}/add_product`);
}// This function sends a GET request to the backend to retrieve the list of products.

export function adminAddProductAxiosFunction(data) {
  return axios.post(`${apiBaseUrl}/add_product`, data);
}

export function adminUpdateProductAxiosFunction(data) {
  return axios.put(`${apiBaseUrl}/add_product/update`, data);
}

export function adminDeleteProductAxiosFunction(productId) {
  return axios.delete(`${apiBaseUrl}/add_product/delete`, { data: { productId } });
}

export function signupCustomer(data) {
  return axios.post(`${apiBaseUrl}/api/customers`, data);
}

export function loginCustomer(data) {
  return axios.post(`${apiBaseUrl}/api/customers/login`, data);
}

export function signupAdmin(data) {
  return axios.post(`${apiBaseUrl}/api/admins`, data);
}

export function loginAdmin(data) {
  return axios.post(`${apiBaseUrl}/api/admins/login`, data);
}

export function updateAdminProfile(data) {
  return axios.put(`${apiBaseUrl}/api/admins/profile`, data);
}

export function createReservation(data) {
  return axios.post(`${apiBaseUrl}/api/reservations`, data);
}

export function createOrder(data) {
  return axios.post(`${apiBaseUrl}/api/orders`, data);
}

export function getOrders() {
  return axios.get(`${apiBaseUrl}/api/orders`);
}

export function updateOrderStatus(orderId, status) {
  return axios.put(`${apiBaseUrl}/api/orders/${orderId}/status`, { status });
}

export function pickupOrder(orderId, data) {
  return axios.put(`${apiBaseUrl}/api/orders/${orderId}/pickup`, data);
}

export function dropOrder(orderId, data) {
  return axios.put(`${apiBaseUrl}/api/orders/${orderId}/drop`, data);
}

export function createFeedback(data) {
  return axios.post(`${apiBaseUrl}/api/feedback`, data);
}

export function createComplaint(data) {
  return axios.post(`${apiBaseUrl}/api/complaints`, data);
}

export function getComplaints() {
  return axios.get(`${apiBaseUrl}/api/complaints`);
}

export function updateComplaint(complaintId, data) {
  return axios.put(`${apiBaseUrl}/api/complaints/${complaintId}`, data);
}