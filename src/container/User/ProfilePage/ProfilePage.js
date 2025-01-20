import React, { useEffect, useState } from "react";
import "./ProfilePage.scss";
import PageContainer from "container/PageContainer/PageContainer.js";
import EditableText, {
  EditableTextMode,
} from "common/EditableText/EditableText.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ImageNameTag from "common/ImageNameTag/ImageNameTag.js";
import { setAuthData } from "state/slice/auth.js";
import { isAnonymous } from "util/auth.js";
import { pageUrls } from "constants/routeConstants.js";
import { updateUserData } from "services/auth.js";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const userdata = useSelector((state) => state.auth);
  const [name, setName] = useState(
    searchParams.get("mode") === EditableTextMode.EDIT
      ? searchParams.get("name") || userdata?.name
      : userdata?.name
  );
  const [nameFieldMode, setNameFieldMode] = useState(
    searchParams.get("mode") || EditableTextMode.EDITABLE_VIEW
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAnonymous({ roles: userdata?.roles })) {
      navigate(pageUrls.HOME);
    }
    !searchParams.get("mode") &&
      setSearchParams((prev) => {
        prev.set("mode", EditableTextMode.EDITABLE_VIEW);
        return prev;
      });
    !searchParams.get("name") &&
      setSearchParams((prev) => {
        prev.set("name", userdata?.name);
        return prev;
      });
  }, []);

  const onNameFieldModeChange = (mode) => {
    setSearchParams((prev) => {
      prev.set("mode", mode);
      return prev;
    });
    setNameFieldMode(mode);
  };

  const onNameFieldSubmit = (value) => {
    setSearchParams((prev) => {
      prev.set("name", value?.trim());
      return prev;
    });
    setName(value?.trim());
  };

  const isDataChanged = () => {
    return userdata?.name !== name;
  };

  const onCancel = () => {
    setName(userdata?.name);
    setNameFieldMode(EditableTextMode.EDITABLE_VIEW);
    setSearchParams((prev) => {
      prev.set("name", userdata?.name);
      prev.set("mode", EditableTextMode.EDITABLE_VIEW);
      return prev;
    });
  };

  const onUpdate = () => {
    setNameFieldMode(EditableTextMode.NON_EDITABLE_VIEW);
    updateUserData({
      name,
    }).then((res) => {
      if (res.status === "success") {
        console.log(res);
        dispatch(setAuthData(res.data));
      }
    });
  };

  return (
    <PageContainer
      containerClassName={
        "d-flex flex-grow-1 justify-content-center align-items-center"
      }
    >
      <div className="profile__page">
        <div className="profile__page__avatar__container">
          <ImageNameTag
            name={userdata?.name}
            imageSrc={userdata?.avatar[0]}
            className={"profile__page__avatar"}
            fontSize={"min(4rem, 20vw)"}
          />
        </div>
        <div className="profile__page__content__container">
          <EditableText
            initialMode={nameFieldMode}
            onModeChange={(mode) => {
              console.log(mode);
              onNameFieldModeChange(mode);
            }}
            onChange={(value) => {
              console.log(value);
            }}
            onSubmit={(value) => {
              console.log(value);
              onNameFieldSubmit(value);
            }}
            value={name}
            label="Name"
            editPlaceholder="John Doe"
          />
          <EditableText
            initialMode={EditableTextMode.NON_EDITABLE_VIEW}
            onModeChange={(mode) => {
              console.log("mode:", mode);
            }}
            onChange={(value) => {
              console.log("value:", value);
            }}
            value={userdata?.phone?.contact || userdata?.email}
            label={"Phone"}
            editPlaceholder="xxxxxxxxxx"
          />
        </div>
        {isDataChanged() && (
          <div className="profile__page__button__container">
            <button
              onClick={onUpdate}
              className="profile__page__button profile__page__button__update"
            >
              Update
            </button>
            <button
              onClick={onCancel}
              className="profile__page__button profile__page__button__cancel"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
