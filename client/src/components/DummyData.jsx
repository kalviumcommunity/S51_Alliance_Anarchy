import React from "react";

const DummyData = () => {
  const data = {
    id: "2",
    title: "Mario Kart",
    genre: "Racing",
    description:
      "Kart racing game with iconic Nintendo characters where players use power-ups to hinder opponents' progress",
    difficulty: "Easy",
    competitiveness: "High",
    friendship_ruin:
      "The use of random power-ups can turn the tide of the race in an instant, leading to feelings of unfairness and resentment when players are targeted or fall behind due to uncontrollable events.",
  };

  return (
    <>
      <div>{data.id}</div>
      <h2>{data.title}</h2>
      <p>{data.genre}</p>
      <div>{data.description}</div>
      <div>{data.difficulty}</div>
      <div>{data.competitiveness}</div>
      <div>{data.friendship_ruin}</div>
    </>
  );
};

export default DummyData;
