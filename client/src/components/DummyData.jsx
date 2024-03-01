import React, { useState, useEffect } from "react";
import "./DummyData.css"; 
import { Link } from "react-router-dom"
import axios from "axios";

const DummyData = () => {
  const [frontendData, setFrontendData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/get");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setFrontendData(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) =>{
      axios.delete(`http://localhost:3000/delete/${id}`)
      .then((response)=>{
        const deletedData = frontendData.filter(item => item.id !== id)
        setFrontendData(deletedData)
      }).catch((err)=>{
        console.log("Error" , err)
      })
  }

  return (
    <div>
      <header className="header">
        <h1>Alliance Anarchy</h1>
        <Link to="/addData">
        <button className="add-games">ADD +</button>
        </Link>
      </header>
      <div className="container">
        <table className="data-table"> {/* Table element */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Description</th>
              <th>Difficulty</th>
              <th>Competitiveness</th>
              <th>Friendship Ruin</th>
            </tr>
          </thead>
          <tbody>
            {frontendData.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.genre}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>{item.competitiveness}</td>
                <td>{item.friendship_ruin}</td>
                <Link to={`/updateData/${item.id}`}><button>Edit</button></Link>
                <button onClick={(e)=>handleDelete(item.id)}>Delete</button> 
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DummyData;
