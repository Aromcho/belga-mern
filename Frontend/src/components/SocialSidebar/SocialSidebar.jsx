import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom si es para navegación interna
import { classes } from "../../helpers/index.js";
import { SOCIAL } from "../../../config/index.js";
import './socialsidebar.css';

import {
  FacebookCircleIcon,
  InstaCircleIcon,
  LinkedinCircleIcon,
  YoutubeCircleIcon,
} from "../Icons/Icons.jsx";

const SocialSidebar = ({
  className,
  color,
  zIndex,
  showWithOffset,
}) => {
  const [showSidebar, setShowSidebar] = useState(!showWithOffset ? true : false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 400
        ? setShowSidebar(true)
        : setShowSidebar(!showWithOffset ? true : false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showWithOffset]);

  return (
    <div
      className={classes(className, color ?? "yellow", { show: showSidebar })}
      style={{ zIndex: zIndex }}
      id="socialSidebar"
    >
      <a href={`${SOCIAL.INSTA}`} target="_blank">
        <InstaCircleIcon className="social--link" />
      </a>
      <a href={`${SOCIAL.FACEBOOK}`} target="_blank">
        <FacebookCircleIcon className="social--link" />
      </a>
      <a href={`${SOCIAL.YOUTUBE}`} target="_blank">
        <YoutubeCircleIcon className="social--link" />
      </a>
      <a href={`${SOCIAL.LINKEDIN}`} target="_blank">
        <LinkedinCircleIcon className="social--link" />
      </a>
    </div>
  );
};
export default SocialSidebar;
