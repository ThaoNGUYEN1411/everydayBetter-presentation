import axios from "axios";
import { action, Action, Thunk, thunk } from "easy-peasy";
import { callApi } from "../services/http/http.service";

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
  create: thunk(async (actions, payload) => {
    const result = await callApi({
      method: "post",
      url: "/users/create",
      data: payload,
    });
    if (result.error === "server_error") {
      actions.setResponseStatus("server_error");
    } else if (Array.isArray(result.error)) {
      actions.setResponseStatus("error_400");
      result.error.forEach((e) => {
        if (e.field === "email" && e.code === "UniqueEmail") {
          actions.setEmailError("UniqueEmail");
        }
        //can add else if to handle other type error here
      });
    } else {
      // Success
      actions.setResponseStatus("success");
      actions.setCurrentUser(payload);
    }
    // console.log(result);
    // if (result.error) {
    //   if (result.error === "server_error") {
    //     actions.setResponseStatus("server_error");
    //   } else {
    //     actions.setResponseStatus("error_400");
    //     if (
    //       result.error?.code === "UniqueEmail" &&
    //       result.error?.field === "email"
    //     ) {
    //       actions.setEmailError("UniqueEmail");
    //     }
    //   }
    // } else {
    //   actions.setCurrentUser(payload);
    //   console.log("Success:", result.data);
    // }

    // const { api } = getStoreActions();
    // const { data, error } = await api.callApi({
    //   method: "post",
    //   url: "/users/create",
    //   data: payload,
    //   errorMap: {
    //     EMAIL_EXISTS: "email_exists",
    //   },
    // });
    // if (error) {
    //   api.setResponseStatus({ type: error });
    // } else {
    //   actions.setCurrentUser(payload);
    //   // actions.setCurrentUser(data);
    // }
    // try {
    //   await axios
    //     .post(`${VITE_API_URL}/users/create`, payload)
    //     .then((res) => {
    //       actions.setCurrentUser(payload);
    //       console.log("res :>> ", res);
    //       // actions.setResponseStatus("success");
    //     })
    //     .catch((err) => {
    //       if (err.response.status == 400) {
    //         // actions.setResponseStatus("error_400");
    //       }
    //       console.log(err);
    //     });
    // } catch (error) {
    //   // actions.setResponseStatus("server_error");
    //   console.log(error);
    // }
  }),
  authenticate: thunk(async (actions, payload) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/authenticate",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, //add the cookies if server send Set-Cookie
        }
      );
      // Sauvegarder le token uniquement si le serveur ne le met pas en cookie
      //The cookie will expire in 3600 seconds (1 hour)
      // document.cookie = `token=${response.request.token}; Path=/; Secure; Max-Age=3600`;

      actions.setAuthInfo(response.data);
      localStorage.setItem("nickname", response.data.nickname);
      console.log(response.data);

      actions.setCurrentUser(payload); //  Store the user
      return { success: true, data: response.data }; // Return success response
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false };
    }
  }),

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
