const local = {
  API_BASE_URL: "http://localhost:4000",
};

const prod = {
  //第一個就可以，nginx 會代理
  // API_BASE_URL: `${window.location.origin}/api`,
  //以下兩種都不行
  // API_BASE_URL: `http://myserver:4000/api`,
  // API_BASE_URL: `http://172.23.0.3:4000/api`, container 的 ip
  // API_BASE_URL: "http://localhost/api",
  //經測試 fetch api 在本地無法直接辨識 container_name or service_name Ex:myserver ，打ip(curl)也不行
  //我現在只能理解為，fetch api 打 localhost 會指向本機，無法直接打 container_service_name
};

let Config = prod;

console.log(Config.API_BASE_URL);

export default Config;
