import React, { useState,useEffect } from "react";
import "./ImageNameTag.scss";
import person from "assets/person.svg";
export default function ImageNameTag({
  name,
  imageSrc,
  alt,
  width,
  height,
  fontSize,
  style,
  className,
  onClick,
}) {
  const [mode, setMode] = useState(
    !!imageSrc
      ? ImageNameTagMode.IMAGE
      : !!name
      ? ImageNameTagMode.NAME_TAG
      : ImageNameTagMode.FALLBACK
  );

  useEffect(() => {
    setMode(
      !!imageSrc
        ? ImageNameTagMode.IMAGE
        : !!name
        ? ImageNameTagMode.NAME_TAG
        : ImageNameTagMode.FALLBACK
    );
  }, [imageSrc, name]);


  const styles = {
    width,
    height,
    fontSize,
    ...style,
  };

  const onImageError = () => {
    setMode(!!name ? ImageNameTagMode.NAME_TAG : ImageNameTagMode.FALLBACK);
  };

  const getNameTag = (name, limit) => {
    if (!name) {
      setMode(ImageNameTagMode.FALLBACK);
      return { tag: "", size: 0 };
    }
    let name_tag = name
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .slice(0, limit)
      .join("");
    return { tag: name_tag, size: name_tag.length };
  };
  return (
    <>
      {mode === ImageNameTagMode.IMAGE && (
        <img
          style={styles}
          className={`image__name__tag image__name__tag--image ${
            !!className ? className : ""
          }`}
          src={imageSrc}
          alt={alt || name}
          onError={onImageError}
          onClick={onClick}
        />
      )}
      {mode === ImageNameTagMode.NAME_TAG && (
        <div
          style={styles}
          className={`image__name__tag image__name__tag--name-tag ${
            !!className ? className : ""
          }`}
          onClick={onClick}
        >
          {getNameTag(name, 2).tag}
        </div>
      )}
      {mode === ImageNameTagMode.FALLBACK && (
        <img
          style={styles}
          className={`image__name__tag image__name__tag--fallback ${
            !!className ? className : ""
          }`}
          src={person}
          alt={alt || name}
          onClick={onClick}
        />
      )}
    </>
  );
}

const ImageNameTagMode = {
  IMAGE: "IMAGE",
  NAME_TAG: "NAME_TAG",
  FALLBACK: "FALLBACK",
};
