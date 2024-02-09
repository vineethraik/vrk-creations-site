import PageContainer from "container/PageContainer/PageContainer";
import BuildingState from "common/BuildingState/BuildingState";
import React from "react";

export default function Home() {
  return (
    <PageContainer
      containerClassName={
        "d-flex flex-grow-1 justify-content-center align-items-center"
      }
    >
      <BuildingState />
    </PageContainer>
  );
}
