import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";

export const Cart = () => {
  let { user,removeFromCart } = useContext(GlobalContext);

  const remfromcart = (e,cid) => {
    e.preventDefault()
    removeFromCart(cid)
  }
    return (
      <div>
          <h1>Cart</h1>
        {user.cart.map((poster, index) => (
          <div key={poster._id}>
             < Poster key={poster.item._id} index={index} poster={poster.item} /> 
         <button onClick={e=>remfromcart(e,poster._id)}>Remove</button>
          </div>
        ))}         
      </div>
    )
}
