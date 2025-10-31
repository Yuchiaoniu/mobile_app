import axios from 'axios';

// ----------------------------------------------------
// !!! 警告：請務必修改此 baseURL !!!
// 將此處的 IP 地址替換為您的電腦在區域網路中的 IP (例如 192.168.1.50)
// 模擬器或實機才能連線到您的 Express 後端伺服器。
// PORT 3000 是後端 app.js 中的預設值。
// ----------------------------------------------------
const baseURL = `http://172.20.10.13:3000`;

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
