import { useState } from "react";
import { Button } from "../../commonComponents";
import { getDatabase, ref, push, get } from "firebase/database";
import { Table } from "../Dashboard/table";
import { toast } from "react-toastify";

const AddURL = () => {
  const [url, setURL] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmitURL = async () => {
    if (!url.trim()) {
      setError(true);
      return;
    }
    try {
      new URL(url);
    } catch (error) {
      toast.error("Enter valid url!", {
        style: {
          fontSize: "12px",
        },
      });
      return;
    }
    const db = getDatabase();
    const dbRef = ref(db, "hosts");
    //check duplicate url and push new url
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const values = Object.values(data) as string[];
        const isDuplicate = values.includes(url);
        if (isDuplicate) {
          toast.warning("This URL already exists!", {
            style: {
              fontSize: "12px",
            },
          });
          // setURL("");
          return;
        }
      }
      await push(dbRef, url);
      toast.success("URL added successfully", {
        style: {
          fontSize: "12px",
        },
      });
      setURL("");
    } catch (error) {
      toast.error("Something went wrong!", {
        style: {
          fontSize: "12px",
        },
      });
    }
  };
  return (
    <div className="container  mt-5 mx-auto w-[80%] py-5 px-[5%]">
      <div>
        <h1 className="text-[14px] font-medium mb-1">New URL</h1>
        <div className="flex flex-row gap-2 w-full items-center">
          <div className="w-[90%]">
            <input
              type="url"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              className="border w-full p-1.5 focus:outline-blue-200 rounded-[2px] border-gray-200 text-[10px]"
            />
          </div>
          <Button
            label="Add"
            onClick={handleSubmitURL}
            type="button"
            className="w-[10%] h-6 bg-blue-950 text-[14px] border-blue-950 rounded-[14px]"
          />
        </div>
      </div>
      {error && <p className="text-red-400 text-[10px] mt-1">Enter URL</p>}
      <Table />
    </div>
  );
};

export default AddURL;
