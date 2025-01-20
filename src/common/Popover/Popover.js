import { useRef } from "react";
import "./Popover.scss";
import { useOnClickOutside } from "util/events.js";
export default function Popover({
  containerStyle,
  containerClassName,
  type = PopoverTypes.DROPDOWN,
  className,
  style,
  children,
  show,
  setShow,
  sourceRef = {current: null},
}) {
  const popoverRef = useRef();
  useOnClickOutside([popoverRef, sourceRef], (e) => {
    e.stopPropagation();
    show && setShow(false);
  });
  return (
    <>
      {show && (
        <div
          ref={popoverRef}
          className={`popover__container ${containerClassName?containerClassName:""} ${PopoverContainerClassName[type]}`}
          style={{ ...PopoverContainerStyles[type], ...containerStyle }}
        >
          <div className={`popover ${className}`} style={{ ...style }}>{children}</div>
        </div>
      )}
    </>
  );
}

export const PopoverTypes = {
  DROPDOWN: "DROPDOWN",
  DROPDOWN_DOWN_LEFT: "DROPDOWN_DOWN_LEFT",
  DROPDOWN_DOWN_RIGHT: "DROPDOWN_DOWN_RIGHT",
  DROPDOWN_UP_LEFT: "DROPDOWN_UP_LEFT",
  DROPDOWN_UP_RIGHT: "DROPDOWN_UP_RIGHT",
  DROPDOWN_UP: "DROPDOWN_UP",
  MODAL: "MODAL",
};

const PopoverContainerStyles = {
  DROPDOWN: {
    position: "absolute",
    top: "calc(100% + 0.5rem)",
    left: "50%",
    transform: "translateX(-50%)",
  },
  DROPDOWN_DOWN_LEFT: {
    position: "absolute",
    top: "calc(100% + 0.5rem)",
    right: 0,
  },
  DROPDOWN_DOWN_RIGHT: {
    position: "absolute",
    top: "calc(100% + 0.5rem)",
    left: 0,
  },
  DROPDOWN_UP_LEFT: {
    position: "absolute",
    bottom: "calc(100% + 0.5rem)",
    right: 0,
  },
  DROPDOWN_UP_RIGHT: {
    position: "absolute",
    bottom: "calc(100% + 0.5rem)",
    left: 0,
  },
  DROPDOWN_UP: {
    position: "absolute",
    bottom: "calc(100% + 0.5rem)",
    left: "50%",
    transform: "translateX(-50%)",
  },
};


const PopoverContainerClassName = {
  DROPDOWN: "popover__container--dropdown",
  DROPDOWN_DOWN_LEFT: "popover__container--dropdown-down-left",
  DROPDOWN_DOWN_RIGHT: "popover__container--dropdown-down-right",
  DROPDOWN_UP_LEFT: "popover__container--dropdown-up-left",
  DROPDOWN_UP_RIGHT: "popover__container--dropdown-up-right",
  DROPDOWN_UP: "popover__container--dropdown-up",
  MODAL: "popover__container--modal",
} 

 