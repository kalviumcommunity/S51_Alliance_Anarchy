import React, { useState, useEffect } from "react";
import "./DummyData.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const DummyData = () => {
  const [frontendData, setFrontendData] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    loginStatus();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://s51-alliance-anarchy-1.onrender.com/get");
      setFrontendData(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const loginStatus = () => {
    const token = getCookie("token");
    setIsLoggedIn(!!token);
  };

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    window.location.reload();
  };

  const getCookie = (name) => {
    const value = document.cookie;
    const parts = value.split(`${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      const deletedData = frontendData.filter((item) => item.id !== id);
      setFrontendData(deletedData);
      alert("Item deleted successfully.");
    } catch (err) {
      console.log("Error", err);
      alert("Failed to delete item.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/updateData/${id}`);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const difficultyOptions = Array.from(
    new Set(frontendData.map((item) => item.difficulty))
  );

  const filteredData = selectedDifficulty
    ? frontendData.filter((item) => item.difficulty === selectedDifficulty)
    : frontendData;

  return (
    <div>
      <header className="header">
        <h1>Alliance Anarchy</h1>
        <div className="options">
        {isLoggedIn && (
          <button className="add-games" onClick={() => navigate("/addData")}>
            ADD +
          </button>
        )}
        {isLoggedIn ? (
          <button className="logout" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="login">Login</button>
          </Link>
        )}
        </div>
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
        <div className="data-container">
          {filteredData.map((item) => (
            <div key={item.id} className="data-row">
              <div><h1>Title: {item.title}</h1></div>
              <div>Genre: {item.genre}</div>
              <div>Description: {item.description}</div>
              <div>Difficulty: {item.difficulty}</div>
              <div>Competitiveness: {item.competitiveness}</div>
              <div>Friendship Ruin: {item.friendship_ruin}</div>
              {isLoggedIn && (
                <div className="button-container">
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DummyData;
