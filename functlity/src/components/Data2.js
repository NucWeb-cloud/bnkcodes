import React, { useEffect, useMemo, useState } from 'react';

const Data2 = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://dummyjson.com/quotes");
                if (!res.ok) {
                    throw new Error("Error in network");
                }
                const json = await res.json(); // ✅ Corrected with `await`
                setData(json.quotes);
            } catch (error) {
                setErr(error.message); // ✅ Removed incorrect second argument
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // ✅ Safe handling of `data`
    const filterData = useMemo(() => {
        return (data || []).filter((quote) =>
            quote.author.toLowerCase().includes(search.toLowerCase())
        );
    }, [data, search]);

    // ✅ Delete function
    const deleteHandle = (id) => {
        setData((prev) => prev.filter((quote) => quote.id !== id));
    };

    // ✅ Loading and Error Handling
    if (loading) return <p>Loading Data.........</p>;
    if (err) return <p>An Error Occurred... {err}</p>;

    return (
        <>
            <div className="container">
                <h1>Quotes of the Year</h1>

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by author"
                />

                {filterData.length > 0 ? ( // ✅ Fixed condition check
                    <ul>
                        {filterData.map((item) => (
                            <li key={item.id}>
                                {item.author} - "{item.text}"
                                <button onClick={() => deleteHandle(item.id)}>
                                    Delete Quote
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Data not found</p>
                )}
            </div>
        </>
    );
};

export default Data2;
