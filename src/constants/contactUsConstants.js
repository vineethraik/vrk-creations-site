import instagram_icon from "assets/instagram.svg";
import twitter_icon from "assets/twitter.svg";
import snapchat_icon from "assets/snapchat.svg";
import whatsapp_icon from "assets/whatsapp.svg";
import facebook_icon from "assets/facebook.svg";

export const socialMediaTypes = {
  whatsapp: {
    id: "whatsapp",
    icon: (props) => (
      <img
        className="social__media__handle__box__icon"
        alt=""
        src={whatsapp_icon}
        {...props}
      />
    ),
    getUrl: (handle) => {
      return `https://api.whatsapp.com/send/?phone=${handle}&text&type=phone_number`;
    },
  },
  instagram: {
    id: "instagram",
    icon: (props) => (
      <img
        className="social__media__handle__box__icon"
        alt=""
        src={instagram_icon}
        {...props}
      />
    ),
    getUrl: (handle) => {
      return `https://www.instagram.com/${handle}/`;
    },
  },
  twitter: {
    id: "twitter",
    icon: (props) => (
      <img
        className="social__media__handle__box__icon"
        alt=""
        src={twitter_icon}
        {...props}
      />
    ),
    getUrl: (handle) => {
      return `https://twitter.com/${handle}`;
    },
  },
  snapchat: {
    id: "snapchat",
    icon: (props) => (
      <img
        className="social__media__handle__box__icon"
        alt=""
        src={snapchat_icon}
        {...props}
      />
    ),
    getUrl: (handle) => {
      return `https://www.snapchat.com/add/${handle}`;
    },
  },
  facebook: {
    id: "facebook",
    icon: (props) => (
      <img
        className="social__media__handle__box__icon"
        alt=""
        src={facebook_icon}
        {...props}
      />
    ),
    getUrl: (handle) => {
      return `https://www.facebook.com/${handle}`;
    },
  },
};
