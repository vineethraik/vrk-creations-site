import PageContainer from "container/PageContainer/PageContainer";
import BuildingState from "common/BuildingState/BuildingState";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAnonymous } from "util/auth.js";
import { getUserData } from "services/auth.js";
import { setAuthData } from "state/slice/auth.js";

export default function Home() {
  const { roles } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAnonymous({ roles })) {
      getUserData().then((res) => {
        if (res.status === "success") {
          console.log("Home:User Data Fetched");
          dispatch(setAuthData(res.data));
        }
      });
    }
  }, [roles]);
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
