import BuildingState from "common/BuildingState/BuildingState";
import PageContainer from "container/PageContainer/PageContainer";
import React from "react";

export function ContactUs() {
  return (
    <PageContainer
      containerClassName={
        "d-flex flex-column justify-content-center align-items-center"
      }
    >
      ContactUs
      <BuildingState />
    </PageContainer>
  );
}
