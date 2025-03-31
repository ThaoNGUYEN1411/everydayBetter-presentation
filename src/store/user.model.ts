import axios from "axios";
import { action, Action, Thunk, thunk } from "easy-peasy";
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
  setAuthInfo: Action<UserModel, AuthInfo | null>;
  setCurrentUser: Action<UserModel, UserData | null>;
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
  setAuthInfo: action((state, authInfo) => {
    state.authInfo = authInfo;
  }),
  setCurrentUser: action((state, user) => {
    state.currentUser = user;
  }),
  create: thunk(async (actions, payload) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/create",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("user created");
      if (response.status === 201) {
        actions.setCurrentUser(payload); //Store the user
        return { success: true, data: response.data }; //Return success response
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false };
    }
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

      if (response.status === 201) {
        actions.setAuthInfo(response.data);
        console.log(response.data);

        actions.setCurrentUser(payload); //  Store the user
        return { success: true, data: response.data }; // Return success response
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false };
    }
  }),

  logout: thunk(async (actions, payload) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, //add the cookies if server send Set-Cookie
        }
      );
      console.log("logout");
      if (response.status === 200) {
        console.log("logout successful");
        //Reset user data
        actions.setCurrentUser(null); // Reset currentUser
        actions.setAuthInfo(null);
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
