import React from 'react'
import { useEffect, useState } from "react";

function Backend() {
  
    const [photos, setPhotos] = useState("");

  const getData = () => {
    fetch("http://localhost:8080/", {method: "GET"})
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setPhotos(data);
    })
  }

  useEffect(() => {
    getData()
  }, []);
  return (
    <div> {photos} </div>
  );

}

export default Backend
