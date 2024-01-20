import React, { useEffect, useState } from "react";
import "./BuildingState.scss";
import _ from "underscore";
import { buildingStateConstants } from "../../constants/stringConstants";
import { buildingStateDelays } from "../../constants/numberConstants";

export default function BuildingState({
  textData,
  loadingText = buildingStateConstants.LOADING_TEXT.CODE,
}) {
  const [text, setText] = useState("");
  const [loadingData, setLoadingData] = useState({
    text: loadingText,
    dotLimit: 5,
    currentDotCount: 2,
  });
  const [index, setIndex] = useState({ line: 0, char: 0 });
  const [transitionCompleted, setTransitionCompleted] = useState(false);

  const setTextTransition = ({ setText, textToPrint, index, setIndex }) => {
    let text = "";
    const lines = textToPrint.split("\n");
    const chars = lines[index.line];

    if (lines.length > index.line) {
      text += lines
        .slice(0, index.line)
        .reduce((reducedText, currentLine, currentIndex) => {
          return (reducedText += `${
            currentIndex !== 0 ? "\n" : ""
          }${currentLine}`);
        }, "");
    }

    if (chars.length > index.char - 1) {
      text +=
        `${index.char !== 0 ? "\n" : ""}` + chars.substring(0, index.char + 1);
    }

    setText(text);

    if (lines.length === index.line + 1 && chars.length === index.char) {
      return true;
    } else {
      if (chars.length === index.char) {
        setIndex({ line: index.line + 1, char: 0 });
      } else {
        setIndex({ line: index.line, char: index.char + 1 });
      }
      return false;
    }
  };

  const updateLoadingData = (loadingText, loadingData, setLoadingData) => {
    const { dotLimit, currentDotCount } = loadingData;
    let text = `${loadingText}${"  .".repeat(currentDotCount)}`;
    setLoadingData({
      ...loadingData,
      text,
      currentDotCount: currentDotCount < dotLimit ? currentDotCount + 1 : 0,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setTransitionCompleted(
        setTextTransition({
          textToPrint: textData || buildingStateConstants.TEXTS.CODE,
          setText,
          setIndex,
          index,
        })
      );
    }, buildingStateDelays.TEXT);
    return () => {};
  }, [index]);

  useEffect(() => {
    if (transitionCompleted) {
      setTimeout(() => {
        updateLoadingData(loadingText, loadingData, setLoadingData);
      }, buildingStateDelays.LOADING_TEXT);
    }
  }, [loadingData, transitionCompleted]);

  return (
    <div className="d-flex position-absolute flex-column building__state">
      <div className="d-flex building__state__action__bar">
        <div className="action__circle action__circle-close"></div>
        <div className="action__circle action__circle-minimize"></div>
        <div className="action__circle action__circle-maximize"></div>
      </div>
      <div className="w-100 h-100 d-flex flex-1 overflow-hidden position-relative  building__state__container">
        {!transitionCompleted && (
          <code className=" w-100 position-absolute building__state__code">
            {text.split("\n").map((textNode) => {
              return (
                <>
                  {textNode}
                  <br />
                </>
              );
            })}
          </code>
        )}
        {transitionCompleted && (
          <div className="building__state__loading">{loadingData.text}</div>
        )}
      </div>
    </div>
  );
}
