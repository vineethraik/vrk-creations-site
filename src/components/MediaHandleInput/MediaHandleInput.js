import React, { useEffect, useState } from "react";
import "./MediaHandleInput.scss";
import add_button from "assets/plus-circle-fill.svg";
import edit_icon from "assets/pencil-fill.svg";
import delete_icon from "assets/x-circle-fill.svg";
import { ScrollSelect } from "common/ScrollSelect/ScrollSelect.js";
import { isArray } from "underscore";
import { socialMediaTypes } from "constants/contactUsConstants.js";

export function MediaHandleInput({ elementRef, value, onChange, className }) {
  const [mediaData, setMediaData] = useState(isArray(value) ? value : []);
  const [showHandleForm, setShowHandleForm] = useState(false);
  const [handleFormType, setHandleFormType] = useState("new");
  const [formMediaData, setFormMediaData] = useState({});
  const [formMediaDataIndex, setFormMediaDataIndex] = useState(0);

  useEffect(() => {
    onChange(mediaData);
  }, [mediaData, onChange]);

  const onElementEdit = (index) => () => {
    setFormMediaData(mediaData[index]);
    setHandleFormType("edit");
    setFormMediaDataIndex(index);
    setShowHandleForm(true);
  };

  const onElementDelete = (index) => () => {
    let mediaDataCopy = [...mediaData];
    mediaDataCopy.splice(index, 1);
    setMediaData(mediaDataCopy);
  };

  const onNewHandle = () => {
    setFormMediaData({});
    setHandleFormType("new");

    setShowHandleForm(true);
  };

  const onHandleFormClose = () => {
    setFormMediaData({});
    setHandleFormType("new");
    setShowHandleForm(false);
  };

  const onMediaHandleFormSubmit = ({ data, type, modifyIndex }) => {
    switch (type) {
      case "new":
        setMediaData((currentData) => {
          return [...currentData, data];
        });
        break;
      case "edit":
        setMediaData((currentData) => {
          currentData[modifyIndex] = data;
          return [...currentData];
        });
        break;

      default:
        break;
    }
    onHandleFormClose();
  };

  return (
    <div
      ref={elementRef}
      className={` gap-10 hide-scrollbar social__media__handle ${className}`}
    >
      {mediaData.map((data, index) => (
        <MediaHandleBox
          key={`${data?.source}:${data?.handle}(${index})`}
          hasOptions
          onEdit={onElementEdit(index)}
          onDelete={onElementDelete(index)}
          mediaDataObject={data}
        />
      ))}
      <MediaHandleBox hasOptions={false}>
        <img
          onClick={onNewHandle}
          className="social__media__handle__box__add__new"
          alt="add new social handle"
          src={add_button}
        />
      </MediaHandleBox>
      {showHandleForm && (
        <MediaHandleForm
          show={showHandleForm}
          type={handleFormType}
          modifyIndex={formMediaDataIndex}
          onSubmit={onMediaHandleFormSubmit}
          onClose={onHandleFormClose}
          handleData={formMediaData}
        />
      )}
    </div>
  );
}

function MediaHandleForm({
  show,
  onSubmit,
  onClose,
  type = "new",
  handleData,
  modifyIndex,
}) {
  const formTitle = type === "new" ? "Add new handle" : "Edit handle";
  const formSubmitTitle = type === "new" ? "Add" : "Edit";
  const { source, handle } = handleData;
  const [selectedSocial, setSelectedSocial] = useState(
    source || socialMediaTypes.whatsapp.id
  );
  const [inputHandle, setInputHandle] = useState(handle || "");

  const onSubmitClicked = (e) => {
    e.preventDefault();
    if (inputHandle !== "") {
      onSubmit({
        data: { source: selectedSocial, handle: inputHandle },
        type,
        modifyIndex,
      });
    } else {
      alert("The handle cant be empty");
    }
  };

  const onTestLinkClicked = (e) => {
    e.preventDefault();
    if (inputHandle !== "") {
      window.open(
        socialMediaTypes[selectedSocial].getUrl(inputHandle),
        "_blank"
      );
    } else {
      alert("The handle cant be empty");
    }
  };

  return show ? (
    <div className="social__media__handle__form__container">
      <div className="gap-10 social__media__handle__form">
        <img
          onClick={onClose}
          alt="close add new social handle button"
          className="social__media__handle__form__close__button"
          src={delete_icon}
        />
        <div className="social__media__handle__form__title">{formTitle}</div>
        <label className="d-flex flex-column w-100 ">
          Social App
          <div className="d-flex flex-row justify-content-around social__media__handle__form__input__container">
            <ScrollSelect
              className="social__media__handle__form__select__source"
              scrollDataArray={Object.keys(socialMediaTypes).map(
                (key) => socialMediaTypes[key]
              )}
              itemRenderer={(data) => data?.icon()}
              selectedItemRenderer={(data) =>
                data?.icon({
                  style: { boxShadow: "0 0 4px 2px black" },
                })
              }
              itemGap={50}
              itemWidth={30}
              initialSelectedIndex={Object.keys(socialMediaTypes).indexOf(
                source
              )}
              onSelected={(id) => {
                setSelectedSocial(id);
              }}
            />
            <span className="w-50 d-flex justify-content-center text-capitalize">
              {selectedSocial}
            </span>
          </div>
        </label>
        <label className="d-flex flex-column w-100 ">
          Handle
          <div className="d-flex flex-row justify-content-around social__media__handle__form__input__container ">
            <input
              className="input"
              type="text"
              required
              value={inputHandle}
              onChange={(e) => {
                setInputHandle(e.target.value);
              }}
            />
            <span className="w-50 d-flex justify-content-center">
              <button className="button" onClick={onTestLinkClicked}>
                Test Link
              </button>
            </span>
          </div>
        </label>
        <div className="social__media__handle__form__select__handle">
          <button onClick={onSubmitClicked} className="button">
            {formSubmitTitle}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

function MediaHandleBox({
  children,
  hasOptions,
  onEdit,
  onDelete,
  mediaDataObject,
}) {
  const Icon = socialMediaTypes[mediaDataObject?.source]?.icon || <></>;
  return (
    <div className={`social__media__handle__box__container`}>
      <div className={`social__media__handle__box`}>
        {children}
        {!children && <Icon />}
        {hasOptions && (
          <div className={`social__media__handle__box__options__container`}>
            <div className="social__media__handle__box__options">
              <img
                alt="edit social media handle"
                onClick={onEdit}
                className="social__media__handle__box__options__item"
                src={edit_icon}
              />
              <img
                alt="delete social media handle"
                onClick={onDelete}
                className="social__media__handle__box__options__item"
                src={delete_icon}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
