import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { Poster } from "../components/Poster";

export const PostersAdmired = () => {
  let { posters, getAdmiredPosters } = useContext(GlobalContext);
  useEffect(() => {
    getAdmiredPosters();
  }, []);

  return (
    <div>
      <h1>Admired Posters</h1>
      {posters.map((poster, index) => (
        <div key={poster._id}>
          <Poster index={index} poster={poster} />
        </div>
      ))}
    </div>
  );
};
