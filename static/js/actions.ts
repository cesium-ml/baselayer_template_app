import * as API from "baselayer/API";

import type { AppDispatch } from "./store";

export const FETCH_USER_PROFILE = "template_app/FETCH_USER_PROFILE";
export const FETCH_USER_PROFILE_OK = "template_app/FETCH_USER_PROFILE_OK";

export const EXAMPLE_RESULT = "template_app/EXAMPLE_RESULT";

export function fetchUserProfile() {
  return API.GET("/baselayer/profile", FETCH_USER_PROFILE);
}

export function hydrate() {
  return (dispatch: AppDispatch) => {
    void dispatch(fetchUserProfile());
  };
}
