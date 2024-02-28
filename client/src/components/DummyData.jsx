import React, { useState, useEffect } from "react";

const DummyData = () => {
  const [frontendData, setfrontendData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // let header = new Headers({"Access-Control-Allow-Origin": "*"})
        const res = await fetch("http://localhost:3000/get");
        console.log(res)
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log(data);
        setfrontendData(data);
      } catch (err) {
        console.log(err.message);
      }
    //   let header = new Headers({"Access-Control-Allow-Origin": "*", "Content-Type": "application/json",})
    //   axios.get("https://s51-alliance-anarchy-1.onrender.com/get", {
    //         mode: 'no-cors',
    //         headers : header,
    //       }).then((ele) => console.log("ele", ele))
    //       .catch((err)=> console.error(err))
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        {frontendData.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.genre}</p>
            <div>{item.description}</div>
            <div>{item.difficulty}</div>
            <div>{item.competitiveness}</div>
            <div>{item.friendship_ruin}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DummyData;
