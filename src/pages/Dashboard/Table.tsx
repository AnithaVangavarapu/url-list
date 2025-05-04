import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Trash2, Copy, Check } from "lucide-react";
import copy from "copy-to-clipboard";
const Table = () => {
  const [data, setData] = useState<object>({});

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const db = getDatabase();
  const dbRef = ref(db, "hosts");
  useEffect(() => {
    const fetchData = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData({});
      }
    });
    return () => fetchData();
  }, []);

  const handleDelete = (key: string) => {
    const itemRef = ref(db, `hosts/${key}`);
    remove(itemRef)
      .then(() => {
        alert("Deleted successfully!");
      })
      .catch((error) => {
        alert("Something went wrong while deleting");
        console.log(error);
      });
  };

  const handleCopy = (val: string, key: string) => {
    let isCopy = copy(val);
    if (isCopy) {
      setCopiedKey(key);
      console.log("copied");
      setTimeout(() => setCopiedKey(null), 2000);
    } else {
      setCopiedKey(null);
      console.log("notcopied");
    }
  };
  return (
    <div className="mt-5 border rounded-[2px]">
      <table className=" w-full">
        <thead className="border-b-[1px]">
          <tr>
            <th className="p-2 text-left">URL</th>
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">QRCOde</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, val]) => (
            <tr key={key} className="border-b-[1px]">
              <td className="p-1 w-1/2">{val}</td>
              <td className="p-1">{key}</td>
              <td className="p-1">show</td>
              <td className="border w-[8%]">
                {copiedKey === key ? (
                  <div className="flex items-center pl-2">
                    <Check width={12} />
                    <p className=" text-[10px]">Copied!</p>
                  </div>
                ) : (
                  <Copy
                    onClick={() => handleCopy(val, key)}
                    className="cursor-pointer ml-6"
                    width={20}
                  />
                )}
              </td>
              <td>
                <Trash2
                  onClick={() => {
                    if (
                      window.confirm(`Are you sure want to delete url: ${val}`)
                    ) {
                      handleDelete(key);
                    }
                  }}
                  className="cursor-pointer"
                  width={20}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
