import React from "react";
import "./Tag.scss";
import { authRoles } from "constants/authOptionsConstants.js";

export const Tag = ({ tag, colorPalette = {}, style, className }) => {
  const { backgroundColor, borderColor, fontColor } = Object.keys(
    authRoles
  ).some((key) => authRoles[key] === tag)
    ? ColorPalettes[tag]
    : new ColorPalette(colorPalette);
  return (
    <div
      style={{
        backgroundColor,
        borderColor,
        color: fontColor,
        ...style,
      }}
      className={`tag ${className}`}
    >
      <span>{tag}</span>
    </div>
  );
};

class ColorPalette {
  constructor(data) {
    this.backgroundColor = data.backgroundColor || "#ff000033";
    this.borderColor = data.borderColor || "#ff0000";
    this.fontColor = data.fontColor || "#ff0000";
  }
}

export const ColorPalettes = {
  [authRoles.ADMIN]: new ColorPalette({
    backgroundColor: "#ff000033",
    borderColor: "#ff0000",
    fontColor: "#ff0000",
  }),
  [authRoles.USER]: new ColorPalette({
    backgroundColor: "#00880033",
    borderColor: "#008800",
    fontColor: "#008800",
  }),
  [authRoles.ANONYMOUS]: new ColorPalette({
    backgroundColor: "#88888833",
    borderColor: "#888888",
    fontColor: "#888888",
  }),
};
