import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function read(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function exclude(url) {
  await axiosInstance.delete(url);
}

export async function create(url, object) {
  const { data } = await axiosInstance.post(url, object);
  return data;
}

export async function edit(url, object) {
  const { data } = await axiosInstance.put(url, object);
  return data;
}
