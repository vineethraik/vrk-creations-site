import PageContainer from "container/PageContainer/PageContainer";
import React, { useRef, useState } from "react";
import "./ContactUs.scss";
import { MediaHandleInput } from "components/MediaHandleInput/MediaHandleInput.js";
import { submitContactUsRequest } from "services/contactUs.js";
import { useNavigate } from "react-router-dom";
import { formDataTypes } from "constants/contactUsConstants.js";

export function ContactUs(props) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const nameElementRef = useRef();
  const validateName = (event) => {
    if (event?.target?.value?.length < 3) {
      event.target.setCustomValidity("name should have at least 3 characters");
      event.target.reportValidity();
    }
  };

  const [email, setEmail] = useState("");
  const emailElementRef = useRef();
  const validateEmail = (event) => {
    let email = event?.target?.value || "";
    if (!String(email).match(/.+@.*/)) {
      event.target.setCustomValidity(
        "All email address contains a '@' so include one please"
      );
    } else if (!String(email).match(/.*@.*\./)) {
      event.target.setCustomValidity(
        "Email is structured as user@domain.extention, you might be missing a '.'"
      );
    } else if (!String(email).match(/^.*@.*\.[a-z]{2,3}$/g)) {
      event.target.setCustomValidity("This email address isn't right");
    }
    event.target.reportValidity();
  };

  const [contact, setContact] = useState("");
  const contactElementRef = useRef();
  const validateContact = (event) => {
    let contact = event?.target?.value || "";
    if (!String(contact).match(/^[0-9]{10,12}$/)) {
      event.target.setCustomValidity("Invalid Contact number");
    }
    event.target.reportValidity();
  };

  const [message, setMessage] = useState("");
  const messageElementRef = useRef();

  const [socialHandles, setSocialHandles] = useState([]);
  const socialHandleElementRef = useRef();

  const [contactHasWhatsapp, setContactHasWhatsapp] = useState(false);
  const whatsappCheckboxElementRef = useRef();

  const formDataUnits = {
    name: {
      getValue: () => name,
      targetElementRef: nameElementRef,
      setValue: setName,
      validate: validateName,
    },
    email: {
      getValue: () => email,
      targetElementRef: emailElementRef,
      setValue: setEmail,
      validate: validateEmail,
    },
    contact: {
      getValue: () => contact,
      targetElementRef: contactElementRef,
      setValue: setContact,
      validate: validateContact,
    },
    contact_has_whatsapp: {
      getValue: () => contactHasWhatsapp,
      targetElementRef: whatsappCheckboxElementRef,
      setValue: setContactHasWhatsapp,
      validate: (event) => {
        let contactHasWhatsapp = !!event?.target?.value;
        if (contactHasWhatsapp && String(contact).match(/^[0-9]{10,12}$/)) {
          event.target.setCustomValidity("Need a valid contact for whats app");
        }
      },
    },
    social_media_handles: {
      getValue: () => socialHandles,
      targetElementRef: socialHandleElementRef,
      setValue: setSocialHandles,
    },
    message: {
      getValue: () => message,
      targetElementRef: messageElementRef,
      setValue: setMessage,
      validate: (event) => {
        return true;
      },
    },
  };

  const getFormattedFormData = () => {
    return {
      name,
      email,
      contact,
      contact_has_whatsapp: contactHasWhatsapp,
      social_handles: socialHandles,
      message,
      send_to: {
        target: "general",
      },
    };
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    submitContactUsRequest(getFormattedFormData()).then((res) =>
      res.text().then((response) => {
        if (response === "ok") {
          alert("Form Submitted Successfully");
          navigate("/");
        } else {
          alert("Error Submitting Form");
        }
      })
    );
  };

  const clearCustomValidations = (inputTypeList = formDataUnits) => {
    Object.keys(formDataUnits).forEach((key) => {
      inputTypeList[key].targetElementRef?.current?.setCustomValidity &&
        inputTypeList[key].targetElementRef.current.setCustomValidity("");
    });
  };

  const onFormDataChange = (dataType) => (event) => {
    switch (dataType) {
      case formDataTypes.NAME:
      case formDataTypes.CONTACT:
      case formDataTypes.EMAIL:
      case formDataTypes.MESSAGE:
      case formDataTypes.CONTACT_HAS_WHATSAPP:
        formDataUnits[dataType].setValue(event.target.value);
        clearCustomValidations(formDataUnits);
        formDataUnits[dataType].validate &&
          formDataUnits[dataType].validate(event);
        break;
      case formDataTypes.SOCIAL_MEDIA_HANDLES:
        formDataUnits[dataType].setValue(event);
        break;
      default:
        break;
    }
  };

  return (
    <PageContainer
      containerClassName={
        "d-flex flex-column justify-content-center align-items-center contact__us"
      }
    >
      <div className="d-flex flex-column contact__us__container">
        <form
          className="d-flex flex-column gap-10 contact__us__form"
          onSubmit={onFormSubmit}
        >
          <label className="d-flex flex-column">
            <span>
              Name
              <span className="color-danger">*</span>
            </span>

            <input
              className="input"
              ref={formDataUnits[formDataTypes.NAME].targetElementRef}
              type="text"
              required={true}
              value={name}
              onChange={onFormDataChange(formDataTypes.NAME)}
            ></input>
          </label>
          <label className="d-flex flex-column">
            <span>
              Email
              <span style={{ fontSize: "0.75rem" }} className="color-danger">
                {"( * if Contact is not provided)"}
              </span>
            </span>

            <input
              className="input"
              type="email"
              ref={formDataUnits[formDataTypes.EMAIL].targetElementRef}
              required={contact === ""}
              value={email}
              onChange={onFormDataChange(formDataTypes.EMAIL)}
            ></input>
          </label>
          <label className="d-flex flex-column">
            <span>
              Contact
              <span style={{ fontSize: "0.75rem" }} className="color-danger">
                {"( * if Email is not provided)"}
              </span>
            </span>

            <input
              className="input"
              type="tel"
              ref={formDataUnits[formDataTypes.CONTACT].targetElementRef}
              required={email === ""}
              value={contact}
              onChange={onFormDataChange(formDataTypes.CONTACT)}
            ></input>
            <div className="d-flex gap-10">
              <input
                type="checkbox"
                ref={
                  formDataUnits[formDataTypes.CONTACT_HAS_WHATSAPP]
                    .targetElementRef
                }
                value={contactHasWhatsapp}
                onChange={onFormDataChange(formDataTypes.CONTACT_HAS_WHATSAPP)}
              ></input>
              <span>Contact is linked to whatsapp</span>
            </div>
          </label>
          <label className="d-flex flex-column">
            <span>Media handles</span>

            <MediaHandleInput
              elementRef={
                formDataUnits[formDataTypes.SOCIAL_MEDIA_HANDLES]
                  .targetElementRef
              }
              value={socialHandles}
              onChange={onFormDataChange(formDataTypes.SOCIAL_MEDIA_HANDLES)}
            ></MediaHandleInput>
          </label>
          <label className="d-flex flex-column">
            <span>Message</span>

            <textarea
              ref={formDataUnits[formDataTypes.MESSAGE].targetElementRef}
              value={message}
              onChange={onFormDataChange(formDataTypes.MESSAGE)}
            ></textarea>
          </label>
          <button className="button">Send Contact Request</button>
        </form>
      </div>
    </PageContainer>
  );
}
