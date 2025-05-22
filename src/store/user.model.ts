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
  // setUsersData: Action<UserModel, UserData>;
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
  // usersData: [],
  currentUser: null,
  // setUsersData: action((state, user) => {
  //   state.usersData.push(user);
  // }),
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
    const response: any = await httpService.post(
      `/users/create`,
      payload,
      { withCredentials: true } //add the cookies
    );
    actions.setAuthInfo(response);
    localStorage.setItem("nickname", response.nickname);
    actions.setCurrentUser(payload); //  Store the user
  }),
  // create: thunk(async (actions, payload) => {
  //   const result = await callApi({
  //     method: "post",
  //     url: "/users/create",
  //     data: payload,
  //   });
  //   if (result.error === "server_error") {
  //     actions.setResponseStatus("server_error");
  //   } else if (Array.isArray(result.error)) {
  //     actions.setResponseStatus("error_400");
  //     result.error.forEach((e) => {
  //       if (e.field === "email" && e.code === "UniqueEmail") {
  //         actions.setEmailError("UniqueEmail");
  //       }
  //       //can add handle other type error here
  //     });
  //   } else {
  //     actions.setResponseStatus("success");
  //     actions.setCurrentUser(payload);
  //   }
  // }),
  authenticate: thunk(async (actions, payload, { injections }) => {
    const { httpService } = injections;
    const response: AuthInfo = await httpService.post(
      `/users/authenticate`,
      payload,
      { withCredentials: true } //add the cookies if server send Set-Cookie
    );
    actions.setAuthInfo(response);
    localStorage.setItem("nickname", response.nickname);
    actions.setCurrentUser(payload); //  Store the user
  }),

  // Sauvegarder le token uniquement si le serveur ne le met pas en cookie
  // The cookie will expire in 3600 seconds (1 hour)
  // document.cookie = `token=${response.request.token}; Path=/; Secure; Max-Age=3600`;

  logout: thunk(async (actions, _payload) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/logout",
        {}, // <- corps vide
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);

      console.log("logout");
      if (response.status === 201) {
        console.log("logout successful");
        //Reset user data
        actions.setCurrentUser(null); // Reset currentUser
        actions.setAuthInfo(null);
        console.log("log out3");
        localStorage.removeItem("nickname");
        return { success: true, data: response.data };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      return { success: false };
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
