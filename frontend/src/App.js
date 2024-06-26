import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Config from "./Config";

import JSEncrypt from "jsencrypt";
import pubKeyJson from "./pubkey.json";

export default function App() {
  const [iframeContent, setIframeContent] = useState(null);

  console.log(iframeContent);

  const encrypt = () => {
    const pubKey = pubKeyJson.key;
    const mes = {
      secret: "Jeff",
      email: "xxxx@gmail",
      // timeStamp: "2023-11-03T12:30:00",
      //使用以下，應該為 UnixTimestamp
      timeStamp: Date.now(),
    };
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(pubKey);
    const rsaMessage = encryptor.encrypt(JSON.stringify(mes));
    console.log(rsaMessage);
    return rsaMessage;
  };

  const decrypt = (encrypted) => {
    const decrypt = new JSEncrypt();
    const priKey =
      "-----BEGIN PRIVATE KEY-----\n" +
      "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEbvC0WoX+z/Y+rrP8ynmYPVjzPx+LHTJ5MhkO/j/QjwBoBJ6oM3yBwGF9WGtocyQFjaxCDtWnSr+3nkRUQk+plB/DYAXmi3YoMCc+EzvohgV2yZ4GX4vL/Qva5ceF9w70VQFE9Hnpp6CTQ/5wIjvdCnaEThjsjmjyvcJWS9RcgBI3htlnvqkwkedV2YB1f72gq8dB8HVhwWDcTmiNXENq5SJSBwc06TlzRPnD9yTble+/6CXeLuFbC+SbutdYOZaRz2gJmZnuquLe+o2+AKM0QTprGY5ybJlvm5hFOb6VS9jQUiE2CRNpHBIoSufW5oa0X/fwjnVCGThL7MBwB4ktAgMBAAECggEABDI6gh/M7PyUThJ9VdEdd9sXo1qd2eLtyRkA4AkeY94qLA6tNPqklkD91CenY7vR8SxtmZunhMNcBRgkbYhdG0pGw22xspMYGxOsQu82QGlchIUaExjHa7wkHLD76ii08RM/y7FNSWiDTaIONWcF0FsA3SKt9Z+1LjpPhHhqOO+ZzjDfqAcxP7viUgpWHQ97jbqhYx4N+tBcjVpNp2jpHjk6fE9idcaFhD9ioA4dhF/fyQf23d6uiW6s+fisFkZe3GVKbaDwDE22LTgMZrfx9eOmr90VszSBv6sCOuBTPMypr9RGXlGwm4FdEx8IPmICwPvihFoHB9NcZz84mJ4CIQKBgQD8W9W6FelfoSj04F/zuv4j7I9xJ6kqoUkjUqk8SlVhoC4zmTMFzODB/frKypQsNGA/hTigP0I1u7zyK26bUpjOChKAMNJu/0mFa0Ak0JJ+np9cM3FUw9YqPbVhbJbrZDKxev5U3RO46xLLeqOhnZCZf6vNubwM2vMV2O3QF1S7KwKBgQDHRIcX1ynmSEETBXI1EUEfVVtmmxyrJD9ODAx8Z9xc1IaHTykTet7nl4CD7BXiQUloYjqDF1O6OuGGEaRcZbos9ifoxpu08rc4WEIoyYbjJuRSmnEVDruQE8WvL/CziONOAlEzvGwKjE3sn7yaFFobeD5/BED3bJAmXGPnmVHBBwKBgBrP2wZZW6E4azSRPkCUBnpkoNzh3NxVpIKnPqnUL/weW6pJxZ0BJoQV6vZuzY1gxzUYf2qvLeatmqaULL096lRBx7Ns/H6kivgs6/S9YEMpsT7HjGv4HqIASmwecG50B9rJeYokrvq/pxCNaCM8rWdRpDxIVo17GcahdKreP7dfAoGBALizUizM6S9kRb0lzShXJ++tJJ1EpRwU6wCitmgRtPXuoAuHWmGOAFLV4O9mwxoGvc4dTnL4CkmSDjxA2gIy4JCQUYm3ndfpKd72H8zCj165S+Us9ig4ka4IRbIOU6N1/IrwJug3fEWCqy/rF9wRhTv1Bqig/r7YR/zmokunl1m9AoGBAJgqYjpS0dby/doCLSHv9zSN/xolOJ5PaxR3QOEM1Vu7SygD44GmAv8rE1VhHOEjlvIcRymfys8J2KoO6j9fxv+jehV9glI98UDd4KRv8AC0AmxBppmdHymK8ZCiwQJIWpT6qSgDQcJiMjodIvApCqPygkq4QYWNw/0sZbKOFcYG" +
      "-----END PRIVATE KEY-----";
    decrypt.setPrivateKey(priKey);
    const uncrypted = decrypt.decrypt(encrypted);
    console.log(uncrypted);
  };

  //取得 html 資料
  const getHtmlData = (message) => {
    console.log("5656");
    const url = "http://34.173.21.217:5000/api/getHtml";
    // 使用 fetch 获取 HTML 内容
    fetch(url, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        rsaMessage: message,
      },
    })
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((data) => {
        // 将获取的 HTML 内容设置到 state 中
        setIframeContent(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    const mes = encrypt();
    getHtmlData(mes);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <button onClick={() => encrypt()}>加密</button>
        <button onClick={() => decrypt()}>解密</button>

        <iframe srcDoc={iframeContent}></iframe>
      </Wrapper>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  /* font-family: "Clear Sans",sans-serif; */
}
p{
  color: #585858;
}
`;

const Wrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  width: 400px;
  height: 300px;
`;
