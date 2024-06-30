import React, { useEffect, useRef, useState } from "react";
import "./ScrollSelect.scss";
import _ from "underscore";

import left_arrow from "assets/caret-left-fill.svg";
import right_arrow from "assets/caret-right-fill.svg";
import styled from "styled-components";

export function ScrollSelect({
  className,
  scrollDataArray,
  itemRenderer,
  itemGap = 50,
  itemWidth = 30,
  scrollSelectOffsetAllowance = 0,
  selectedItemRenderer,
  initialSelectedIndex = 0,
  onSelected,
}) {
  const scrollSelectorRef = useRef(undefined);

  const [selectedIndex, setSelectedIndex] = useState(
    initialSelectedIndex === -1 ? 0 : initialSelectedIndex
  );

  const onScroll = (event) => {
    let calculatedIndex = findSelectedIndex({
      scrollValue: event.target.scrollLeft,
      itemGap,
      itemWidth,
      offsetAllowance: scrollSelectOffsetAllowance,
    });
    if (calculatedIndex !== undefined) {
      setSelectedIndex(calculatedIndex);
      onSelected(scrollDataArray[calculatedIndex]?.id);
    }
  };

  const scroll = (direction = scrollConstant.SCROLL_NEXT) => {
    let nextIndex = selectedIndex;
    if (direction === scrollConstant.SCROLL_NEXT) {
      nextIndex++;
    } else if (direction === scrollConstant.SCROLL_PREVIOUS) {
      nextIndex--;
    } else {
      return;
    }
    nextIndex += scrollDataArray.length;
    nextIndex %= scrollDataArray.length;
    setSelectedIndex(nextIndex);
  };
  const findSelectedIndex = ({
    scrollValue = 0,
    itemGap = 50,
    itemWidth = 30,
    offsetAllowance = 0.1,
  }) => {
    let currentElementOffsetWidth = scrollValue;
    let containerWidth = 2 * (itemWidth + itemGap);
    let indexMultiplier = containerWidth / 2;
    let indexApproximation = currentElementOffsetWidth / indexMultiplier;
    if (
      currentElementOffsetWidth % indexMultiplier <=
      indexMultiplier * offsetAllowance
    ) {
      return Math.round(indexApproximation);
    }
    return undefined;
  };

  useEffect(() => {
    scrollSelectorRef.current.scrollTo({
      left: selectedIndex * (itemGap + itemWidth),
      top: 0,
      behavior: "smooth",
    });
  }, [selectedIndex, itemGap, itemWidth]);

  return (
    <SliderContainer
      key={"slider_container"}
      className={`${className || ""} scroll__selector__container`}
    >
      <img
        alt="select previous social media provider"
        className="scroll__selector__arrow left"
        src={left_arrow}
        onClick={() => {
          scroll(scrollConstant.SCROLL_PREVIOUS);
        }}
      />
      <Slider
        $itemGap={itemGap}
        $itemWidth={itemWidth}
        ref={scrollSelectorRef}
        onScroll={onScroll}
        className="scroll__selector hide-scrollbar"
      >
        {scrollDataArray.map((data, index) => {
          return (
            <Item key={data?.id} className="scroll__selector__item">
              {selectedIndex === index
                ? _.isFunction(selectedItemRenderer)
                  ? selectedItemRenderer(data)
                  : itemRenderer(data)
                : itemRenderer(data)}
            </Item>
          );
        })}
      </Slider>
      <img
        alt="select next social media provider"
        className="scroll__selector__arrow right"
        src={right_arrow}
        onClick={() => {
          scroll(scrollConstant.SCROLL_NEXT);
        }}
      />
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  flex-direction: row;
`;

const Slider = styled.div`
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: ${(props) => props.$itemGap}px;
  width: calc(
    2 * ${(props) => props.$itemWidth}px + 2 * ${(props) => props.$itemGap}px
  );
  padding: 0
    calc(${(props) => props.$itemGap}px + ${(props) => props.$itemWidth}px / 2);
`;
const Item = styled.div`
  scroll-snap-align: center;
`;

const scrollConstant = {
  SCROLL_NEXT: "SCROLL_NEXT",
  SCROLL_PREVIOUS: "SCROLL_PREVIOUS",
};
