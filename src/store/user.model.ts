import axios from "axios";
import { action, Action, Thunk, thunk } from "easy-peasy";

type ResponseStatus = "success" | "server_error" | "error_400" | undefined;
//interface stoke data
export interface UserData {
  nickname: string | null;
  email: string;
  password: string;
}
export interface AuthInfo {
  nickname: string;
  roles: [];
}

// Interface for authentication payload
export interface AuthenticateUser {
  email: string;
  password: string;
}

// User model for state management
export interface UserModel {
  currentUser: UserData | null; //store authenticated user
  authInfo: AuthInfo | null;
  responseStatus: ResponseStatus;
  emailError: string | null;
  setAuthInfo: Action<UserModel, AuthInfo | null>;
  setCurrentUser: Action<UserModel, UserData | null>;
  setResponseStatus: Action<UserModel, ResponseStatus>;
  setEmailError: Action<UserModel, string | null>;
  create: Thunk<UserModel, UserData>;
  authenticate: Thunk<UserModel, UserData>;
  logout: Thunk<UserModel>;
}

//define data default and action, call back
export const userModel: UserModel = {
  currentUser: null,
  authInfo: null,
  responseStatus: undefined,
  emailError: null,
  setAuthInfo: action((state, authInfo) => {
    state.authInfo = authInfo;
  }),
  setCurrentUser: action((state, user) => {
    state.currentUser = user;
  }),
  setResponseStatus: action((state, responseStatus) => {
    state.responseStatus = responseStatus;
  }),
  setEmailError: action((state, emailError) => {
    state.emailError = emailError;
  }),
  create: thunk(async (actions, payload, { injections }) => {
    const { httpService } = injections;
    const response: any = await httpService.post(`/users/create`, payload);
    actions.setAuthInfo(response);
  }),
  authenticate: thunk(async (actions, payload, { injections }) => {
    const { httpService } = injections;
    const response: AuthInfo = await httpService.post(
      `/users/authenticate`,
      payload,
      { withCredentials: true } //add the cookies => server send Set-Cookie
    );
    actions.setAuthInfo(response);
    localStorage.setItem("nickname", response.nickname);
    actions.setCurrentUser(payload); //  Store the user
  }),

  logout: thunk(async (actions, _payload, { injections }) => {
    const { httpService } = injections;
    const response = await httpService.post(
      "/users/logout",
      {}, // corps vide
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status === 201) {
      //Reset user data
      actions.setCurrentUser(null); // Reset currentUser
      actions.setAuthInfo(null);
    }
  }),
};

/*
If your app only needs to create an account, authenticate a user, and log out, then you don’t need an array (usersData: UserData[]). Instead, you should store just a single object for the currently authenticated user.
you should store users in an array (usersData: UserData[]) only if your app manages multiple users at the same time. Here are the common cases where you need an array
  When to Use an Array (UserData[])?
 Admin Dashboard → If your app allows an admin to view or manage multiple users.
 A user list for an admin panel
  You need getAllUsers, deleteUser, updateUser, etc.
*/
