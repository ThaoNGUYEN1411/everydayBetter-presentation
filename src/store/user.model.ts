import { action, Action, Thunk, thunk } from "easy-peasy";

type ResponseStatus = "success" | "server_error" | "error_400" | undefined;
export type Role = "ROLE_USER" | "ROLE_ADMIN" | "ROLE_ANONYMOUS";

//interface stoke data
export interface UserData {
  nickname: string;
  email: string;
  password: string;
}
export interface AuthInfo {
  nickname: string;
  roles: Role[];
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
    try {
      await httpService.post(`/users/create`, payload);
      actions.setResponseStatus("success");
    } catch (error: any) {
      const errorData = error.response;
      if (errorData.status === 400) {
        actions.setResponseStatus("error_400");
        if (
          errorData.data.errors?.some((err: any) => err.code == "UniqueEmail")
        ) {
          actions.setEmailError("UniqueEmail");
        }
      } else {
        actions.setResponseStatus("server_error");
      }
    }
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
    localStorage.setItem("roles", response.roles[0]);

    actions.setCurrentUser(payload); //  Store the user
  }),

  logout: thunk(async (actions, _payload, { injections }) => {
    const { httpService } = injections;
    localStorage.removeItem("nickname");
    localStorage.removeItem("roles");
    await httpService.post(
      "/users/logout",
      {}, // corps vide
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    actions.setCurrentUser(null); // Reset currentUser
    actions.setAuthInfo(null);
  }),
};
