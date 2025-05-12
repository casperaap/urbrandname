import React from "react";
import PropTypes from "prop-types";

const ProbSolveCard = ({ src, alt = "", title, children }) => (
  <div
    className="
      className={`card w-full md:w-96 bg-white
      border border-[#707070]      /* thin grey border */
      drop-shadow-[0_6px_10px_rgba(160,38,255,0.5)] /* violet shadow */
      rounded-xl
    "
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

ProbSolveCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string.isRequired,
  /** Card copy is passed as children */
  children: PropTypes.node.isRequired,
};

export default ProbSolveCard;
