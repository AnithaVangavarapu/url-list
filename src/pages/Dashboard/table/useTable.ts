import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
export const useTable = () => {
  const [data, setData] = useState<object>({});
  const [dataToDisplay, setDataToDisplay] = useState<Array<Array<string>>>([]);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [qrValue, setQRValue] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedCell, setCopiedCell] = useState<"code" | "url" | null>(null);
  const db = getDatabase();
  const dbRef = ref(db, "hosts");
  const valPerPage = 2;
  useEffect(() => {
    const fetchData = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        console.log(Object.entries(snapshot.val()));
      } else {
        setData({});
      }
    });
    return () => fetchData();
  }, []);

  useEffect(() => {
    const DataArray = Object.entries(data);
    const reverserArray = DataArray.reverse();
    setDataToDisplay(reverserArray.slice(0, 2));
  }, [data]);

  const handleDelete = (key: string) => {
    const itemRef = ref(db, `hosts/${key}`);
    remove(itemRef)
      .then(() => {
        toast.success("URL deleted!", {
          style: {
            fontSize: "12px",
          },
        });
      })
      .catch((error) => {
        toast.error("Something went wrong while deleting url!", {
          style: {
            fontSize: "12px",
          },
        });
        console.log(error);
      });
  };

  const handleCopyCode = (key: string) => {
    let isCopy = copy(key);
    if (isCopy) {
      setCopiedKey(key);
      setCopiedCell("code");
      console.log("copied");
      setTimeout(() => {
        setCopiedKey(null);
        setCopiedCell(null);
      }, 2000);
    } else {
      setCopiedKey(null);
      console.log("notcopied");
    }
  };
  const handleCopyURL = (val: string, key: string) => {
    let isCopy = copy(val);
    if (isCopy) {
      setCopiedKey(key);
      setCopiedCell("url");
      console.log("copied");
      setTimeout(() => {
        setCopiedKey(null);
        setCopiedCell(null);
      }, 2000);
    } else {
      setCopiedKey(null);
      console.log("notcopied");
    }
  };
  const handleQRCode = (code: string) => {
    setQRValue(code);
    setShowQR(true);
  };

  return {
    handleQRCode,
    handleCopyURL,
    handleCopyCode,
    handleDelete,
    valPerPage,
    dataToDisplay,
    showQR,
    qrValue,
    copiedKey,
    data,
    setDataToDisplay,
    setQRValue,
    setShowQR,
    copiedCell,
  };
};
