import { useState } from "react";
import { Button } from "../../commonComponents";
import { getDatabase, ref, push, get } from "firebase/database";
import Table from "./Table";
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
      alert("Enter valid url");
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
          alert("This URL already exists!");
          return;
        }
      }
      await push(dbRef, url);
      alert("Added successfully");
      setURL("");
    } catch (error) {
      alert("Something went wrong!");
    }
  };
  return (
    <div className="container border mt-10 mx-auto w-[80%] py-5 px-[5%]">
      <div>
        <h1 className="">New URL</h1>
        <div className="flex flex-row gap-2 w-full">
          <div className="w-[90%]">
            <input
              type="url"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              className="border w-full p-0.5 focus:outline-blue-200 rounded-[2px]"
            />
            {error && <p className="text-red-500 text-sm mt-2">Enter URL</p>}
          </div>
          <Button
            label="Add"
            onClick={handleSubmitURL}
            type="button"
            className="text-black w-[10%] py-0.5"
          />
        </div>
      </div>
      <Table />
    </div>
  );
};

export default AddURL;
