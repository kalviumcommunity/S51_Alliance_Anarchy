import React, { useState, useEffect } from "react";
import "./DummyData.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DummyData = () => {
  const [frontendData, setFrontendData] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((response) => {
        const deletedData = frontendData.filter((item) => item.id !== id);
        alert("Are you sure you");
        setFrontendData(deletedData);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleEdit = (id) => {
    navigate(`/updateData/${id}`);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const filteredData = selectedDifficulty
    ? frontendData.filter((item) => item.difficulty === selectedDifficulty)
    : frontendData;

  const difficultyOptions = Array.from(
    new Set(frontendData.map((item) => item.difficulty))
  );

  return (
    <div>
      <header className="header">
        <h1>Alliance Anarchy</h1>
        <button className="add-games" onClick={() => navigate("/addData")}>
          ADD +
        </button>
      </header>
      <div className="container">
        <label htmlFor="difficultyFilter">Filter by Difficulty:</label>
        <select
          id="difficultyFilter"
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
        >
          <option value="">All</option>
          {difficultyOptions.map((difficulty, index) => (
            <option key={index} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Description</th>
              <th>Difficulty</th>
              <th>Competitiveness</th>
              <th>Friendship Ruin</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.genre}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>{item.competitiveness}</td>
                <td>{item.friendship_ruin}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DummyData;
