import QRCode from "react-qr-code";
import { useState } from "react";
import axios from "axios";

const GenerateQR = () => {
  const [qrValue, setQrValue] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const [url, setURL] = useState<string>("");
  const apiurl = import.meta.env.VITE_API_BASE_URL;
  const callApi = () => {
    if (url !== "") {
      axios
        .post(
          `${apiurl}/api/Token/generate`,
          {
            baseUrl: url,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("token:", res.data.token), setQrValue(res.data.token);
          setShowQR(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center mt-10">
      <div className="flex w-[70%]">
        <input
          type="text"
          className="border rounded-lg w-full border-gray-200 p-1 text-[12px] shadow-sm"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
        <button
          onClick={callApi}
          className="border ml-5 w-20 rounded-lg text-[12px] font-medium bg-blue-950 text-white border-blue-950"
        >
          Add
        </button>
      </div>

      {showQR && (
        <div className="flex flex-col gap-3 mt-10 items-center">
          <QRCode bgColor="white" fgColor="black" value={qrValue} size={150} />
          <button
            onClick={() => {
              setQrValue(""), setShowQR(false), setURL("");
            }}
            className="border w-20 rounded-lg text-[12px] font-medium bg-orange-400 text-white border-orange-400 p-1"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateQR;
