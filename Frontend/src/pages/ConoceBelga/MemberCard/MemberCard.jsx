import React from "react";
import './MemberCard.css';

export const MemberCard = ({
  className,
  img,
  name,
  position,
  rightInfo,
}) => {
  return (
    <div className={`staff-member ${className} ${rightInfo ? 'right--info' : ''}`}>
      <div className="border-card" />
      <div
        className="member-img"
        style={{
          backgroundImage: `url(${img})`,
        }}
      />
      <div className="member-info">
        <div className="info-name">{name}</div>
        <div className="info-pos">{position}</div>
      </div>
    </div>
  );
};

export default MemberCard;
