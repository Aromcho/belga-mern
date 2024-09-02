import React, { useEffect, useState } from "react";
import { ArrowBackIcon } from "../Icons/Icons.jsx";
import "./BackToTop.css";

const BackToTop = ({ className, offsetShow = 400, color }) => {
  const [showBtn, setShowBtn] = useState(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > offsetShow ? setShowBtn(true) : setShowBtn(false);
    });
  }, [offsetShow]);

  return (
    <div
      className={`backToTopContainer ${color || "red"} ${showBtn ? "show" : ""}`}
      onClick={goToTop}
      id="backTop"
    >
      <ArrowBackIcon className="icon--arrow" />
    </div>
  );
};


export default BackToTop;