import { useTable } from "./useTable";
import { Trash2, Copy, Check } from "lucide-react";
import { Button } from "../../../commonComponents";
import QRCode from "react-qr-code";
import { Pagination } from "../../../components";

const Table = () => {
  const {
    handleQRCode,
    handleCopyURL,
    handleCopyCode,
    handleDelete,
    valPerPage,
    dataToDisplay,
    showQR,
    qrValue,
    copiedKey,
    hoverKey,
    setHoverKey,
    displayhover,
    setDisplayHover,
    data,
    setDataToDisplay,
    setQRValue,
    setShowQR,
  } = useTable();
  return (
    <div>
      <div className="mt-8 border rounded-[2px] border-gray-200 shadow-sm">
        <table className="w-full">
          <thead className="border-b-[1px] text-[10px] border-gray-200">
            <tr>
              <th className="py-2 text-left px-2">URL</th>
              <th className="py-2 text-left px-1">Code</th>
              <th className="py-2 text-left px-1">QRCode</th>
            </tr>
          </thead>
          <tbody className="text-[10px]">
            {dataToDisplay.map(([key, val], index) => {
              const isOdd: boolean = Number(index) % 2 === 1;
              return (
                <tr
                  key={key}
                  style={{ backgroundColor: isOdd ? "aliceblue" : "" }}
                >
                  <td className="pl-2 w-1/2 py-2 text-blue-400">{val}</td>
                  <td className="py-2 pl-1">{key}</td>
                  <td className="py-2 pl-1">
                    <div
                      onClick={() => handleQRCode(key)}
                      className="cursor-pointer"
                    >
                      Show
                    </div>
                  </td>
                  <td className=" w-[10%]">
                    {copiedKey === key ? (
                      <div className="flex items-center pl-2">
                        <Check width={12} />
                        <p className=" text-[10px]">Copied!</p>
                      </div>
                    ) : (
                      <div className="relative flex">
                        <div
                          onMouseEnter={() => {
                            setHoverKey(key);
                            setDisplayHover("code");
                          }}
                          onMouseLeave={() => {
                            setHoverKey(null);
                            setDisplayHover(null);
                          }}
                        >
                          <Copy
                            onClick={() => handleCopyCode(key)}
                            className="cursor-pointer ml-2 "
                            width={15}
                          />
                        </div>
                        <div
                          onMouseEnter={() => {
                            setHoverKey(key);
                            setDisplayHover("url");
                          }}
                          onMouseLeave={() => {
                            setHoverKey(null);
                            setDisplayHover(null);
                          }}
                        >
                          <Copy
                            onClick={() => handleCopyURL(val, key)}
                            className="cursor-pointer ml-2 "
                            width={15}
                            color="#51a2ff"
                          />
                        </div>
                        {hoverKey === key && (
                          <p className="absolute -top-1.5 text-[8px] left-2">
                            {`Copy ${displayhover === "code" ? "code" : "url"}`}
                          </p>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="w-[8%] ">
                    <Trash2
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure want to delete url: ${val}`
                          )
                        ) {
                          handleDelete(key);
                        }
                      }}
                      className="cursor-pointer ml-5"
                      width={15}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Pagination
          data={data}
          setDataToDisplay={setDataToDisplay}
          valPerPage={valPerPage}
        />
      </div>

      {showQR && (
        <div className="bg-[rgba(0,0,0,0.5)] top-0 left-0 z-9 w-[100vw] h-[100vh] fixed">
          <div className="border bg-white  fixed top-0 bottom-0 left-0 right-0 m-auto  max-w-[20%] max-h-[30%] p-8 border-white rounded-lg shadow-md flex flex-col items-center gap-3 justify-center">
            <QRCode
              bgColor="white"
              fgColor="black"
              value={qrValue}
              size={100}
            />
            <Button
              label="Close"
              onClick={() => {
                setQRValue("");
                setShowQR(false);
              }}
              type="button"
              className="text-[12px] bg-orange-400 border-orange-400 w-[50%]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
