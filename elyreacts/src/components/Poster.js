import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";

// @ts-ignore
import cn from './styles/Poster.module.scss';

const ButtonAction = ({ callback, checkActiveFn, children }) => {
  // todo: checkActiveFn is a function which checks the Active state of the button
  // eg: checkActiveFn could return true if Poster is Admired
  // this would then add the active class to the button

  const isActive = () => (checkActiveFn ? 'active' : '');

  return (
    <button
      className={`button-icon ${isActive}`}
      onClick={callback}>
      {children}
    </button>
  );
};

export const Poster = ({ poster }) => {
  const { cart, addToCart } = useContext(GlobalContext);

  const handleAddToCart = () => addToCart(poster._id);
  const handleAdmire = () => console.log("Admired: " + poster._id);

  // todo: Verify data server-side (or at least earlier in the flow, than this component)
  poster = {
    ...poster,
    id: poster._id,
    title: poster.title || 'Untitled',
    author: poster.author || 'Unknown',
    caption: poster.caption || 'Caption',
    pictureURL: /*poster.pictureURL ||*/ 'https://source.unsplash.com/random',
    price: poster.price || 0.0,
    views: poster.views || 0,
    admires: poster.admires || 0
  };

  return (
    <div className={`${cn.container}`}>
      <div className={`${cn.previewContainer}`}>
        <a href={`/poster/${poster.id}`}>
          <img src={poster.pictureURL} alt={poster.title ? poster.title : "Untitled Poster"} />
        </a>

        <div className={`${cn.buttons}`}>
          <ButtonAction
            callback={handleAdmire}
            checkActiveFn={() => false}>
            ❤
          </ButtonAction>
          <ButtonAction
            callback={handleAddToCart}
            checkActiveFn={() => false}>
            +
          </ButtonAction>
        </div>
      </div>

      <div className={`${cn.caption}`}>
        <h2>{poster.title}</h2>
        <small>{`By ${poster.author}`}</small>

        <strong className={cn.price}>{poster.price.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export const FakePoster = ({ }) => {
  return (
    <div className={`${cn.container}`}>
      <div className={`${cn.previewContainer}`}>
        <a href={`/posters/all`}>
          <img src={'https://source.unsplash.com/random/640x480'} alt={'Blank image'} />
        </a>
      </div>

      <div className={`${cn.caption}`}>
        <h2>Sorry!</h2>
        <small>No results found</small>
      </div>
    </div>
  );
};