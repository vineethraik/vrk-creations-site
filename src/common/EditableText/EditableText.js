import React, { useState } from "react";
import "./EditableText.scss";
import pencil from "assets/pencil-fill.svg";
import checkCircle from "assets/check2-circle.svg";

export default function EditableText({
  label,
  value,
  editPlaceholder,
  onChange,
  onSubmit,
  onModeChange,
  initialMode,
}) {
  const [mode, setMode] = useState(
    initialMode || EditableTextMode.EDITABLE_VIEW
  );
  const [text, setText] = useState(value);

  const onEditClicked = () => {
    setText(value);
    setMode(EditableTextMode.EDIT);
    onModeChange(EditableTextMode.EDIT);
  };

  const onTextChange = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  const onUpdateClicked = () => {
    setMode(EditableTextMode.EDITABLE_VIEW);
    onModeChange(EditableTextMode.EDITABLE_VIEW);
    onSubmit(text);
  };

  const isMode = (checkMode) => {
    return mode === checkMode;
  };

  return (
    <div className="editable__text">
      <span className="editable__text__label">{label}</span>
      <div className="editable__text__container">
        {isMode(EditableTextMode.EDITABLE_VIEW) && (
          <>
            <span className="editable__text__value">{value}</span>
            <img
              src={pencil}
              alt="edit"
              className="editable__text__button editable__text__button__edit"
              onClick={onEditClicked}
            />
          </>
        )}
        {isMode(EditableTextMode.NON_EDITABLE_VIEW) && (
          <>
            <span className="editable__text__value">{value}</span>
          </>
        )}
        {isMode(EditableTextMode.EDIT) && (
          <>
            <input
              className="editable__text__input"
              value={text}
              placeholder={editPlaceholder}
              onChange={onTextChange}
              onBlur={() => onModeChange(EditableTextMode.NON_EDITABLE_VIEW)}
            />
            <img
              src={checkCircle}
              alt="edit"
              className="editable__text__button editable__text__button__save"
              onClick={onUpdateClicked}
            />
          </>
        )}
      </div>
    </div>
  );
}

export const EditableTextMode = {
  EDITABLE_VIEW: "editable_view",
  NON_EDITABLE_VIEW: "non_editable_view",
  EDIT: "edit",
};
