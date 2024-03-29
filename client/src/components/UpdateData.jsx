import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateData = () => {

    const {id} = useParams()

    // const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [competitiveness, setCompetitiveness] = useState("");
    const [friendshipRuin, setFriendshipRuin] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.patch(`https://s51-alliance-anarchy-1.onrender.com/put/${id}`, {
            title,
            genre,
            description,
            difficulty,
            competitiveness,
            friendshipRuin
        })
        .then((res) => {
            console.log("Data updated successfully:", res.data);
            alert("Data updated successfully!");
            clearForm();
            
        })
        .catch((err) => {
            if (err.response) {
                console.error("Server responded with status:", err.response.status);
                setErrorMessage(`Server responded with status: ${err.response.status}. ${err.response.data}`);
            }
        });
    };

    const clearForm = () => {
        setId("");
        setTitle("");
        setGenre("");
        setDescription("");
        setDifficulty("");
        setCompetitiveness("");
        setFriendshipRuin("");
        setErrorMessage("");
    };

    return (
        <div className="form-container"> 
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="id">ID:</label>
                <input type="number" id="id" value={id} onChange={(e) => setId(e.target.value)} name="id" required /><br /><br /> */}
                
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} name="title" required /><br /><br />
                
                <label htmlFor="genre">Genre:</label>
                <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} name="genre"/><br /><br />
                
                <label htmlFor="description">Description:</label><br />
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows="4" cols="50"></textarea><br /><br />
                
                <label htmlFor="difficulty">Difficulty:</label>
                <input type="text" id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} name="difficulty" /><br /><br />
                
                <label htmlFor="competitiveness">Competitiveness:</label>
                <input type="text" id="competitiveness" value={competitiveness} onChange={(e) => setCompetitiveness(e.target.value)} name="competitiveness" /><br /><br />
                
                <label htmlFor="friendship_ruin">Friendship Ruin:</label>
                <input type="text" id="friendship_ruin" value={friendshipRuin} onChange={(e) => setFriendshipRuin(e.target.value)} name="friendship_ruin"/><br /><br />
                
                <button type="submit">Update</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
  )
}

export default UpdateData;
