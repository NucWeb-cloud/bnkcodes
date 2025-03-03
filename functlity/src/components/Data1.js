import React, { useEffect, useMemo, useState } from "react";

const Data1 = () => {
  const [data, setData] = useState([]); // Store user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // State to track editing
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/users");
        if (!res.ok) {
          throw new Error("Network failed");
        }
        const json = await res.json();
        setData(json.users); // Extract 'users' array from response
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  // ✅ Use useMemo to optimize filtering
//   const filteredData = useMemo(
//     () =>
//       data.filter((item)=>{
//         item.firstName.toLowerCase().includes(search.toLowerCase())
//       }),
//     [data, search]
//   );
const filteredData = useMemo(() => {
    return data.filter((user) =>
      user.birthDate.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // ✅ Delete function
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((user) => user.id !== id));
  };

  // ✅ Start editing - Show input field
  const handleEdit = (id, currentName) => {
    setEditId(id);
    setEditText(currentName);
  };

  // ✅ Save the edited name
  const handleSave = (id) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, firstName:editText } : user
      )
    );
    setEditId(null); // Reset edit mode
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container">
        <h1>SEARCH FUNCTIONALITY</h1>
        <input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredData.length > 0 ? (
          <ul>
            {filteredData.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                {editId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      onClick={() => handleSave(item.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {item.firstName} - {item.birthDate}
                    <button
                      onClick={() => handleEdit(item.id, item.firstName)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </>
  );
};

export default Data1;
