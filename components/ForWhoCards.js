import React from "react";
import PropTypes from "prop-types";

const ForWhoCards = ({ src, alt = "", title, children }) => (
  <div
  className={`
    card w-full bg-white
    border border-[#E6E6E6]
    rounded-xl
  `}
>
    <figure className="px-10 pt-10">
      <img src={src} alt={alt} className="rounded-xl" />
    </figure>

    <div className="card-body px-10 items-start text-left">
      <h2 className="card-title">{title}</h2>
      <p>{children}</p>
    </div>
  </div>
);

ForWhoCards.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string.isRequired,
  /** Card copy is passed as children */
  children: PropTypes.node.isRequired,
};

export default ForWhoCards;