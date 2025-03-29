import axios from "axios";
import { action, Action, Thunk, thunk } from "easy-peasy";
//interface stoke data
export interface UserData {
  nickname: String;
  email: String;
  password: String;
}

export interface AuthenticateUser {
  email: String;
  password: String;
}

//interface stoke data et action
export interface UserModel {
  usersData: UserData[];
  currentUser: null;
  createUser: Thunk<UserModel, UserData>;
  setUsersData: Action<UserModel, UserData>;
  setCurrentUser: Action<UserModel, any>;
  authenticateUser: Thunk<UserModel, UserData>;
}

//define data default and action, call back
export const userModel: UserModel = {
  usersData: [],
  currentUser: null,
  createUser: thunk(async (actions, payload) => {
    console.log(payload);

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

      //console.log(response.status);

      if (response.status === 201) {
        actions.setUsersData(payload); // ✅ Store the user
        return { success: true, data: response.data }; // ✅ Return success response
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false };
    }
  }),
  setUsersData: action((state, user) => {
    state.usersData.push(user);
  }),
  setCurrentUser: action((state, user) => {
    state.currentUser = user;
  }),
  authenticateUser: thunk(async (actions, payload) => {
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
      console.log("user created");
      // Sauvegarder le token uniquement si le serveur ne le met pas en cookie
      //The cookie will expire in 3600 seconds (1 hour)
      // document.cookie = `token=${response.request.token}; Path=/; Secure; Max-Age=3600`;

      if (response.status === 201) {
        actions.setUsersData(payload); // ✅ Store the user
        return { success: true, data: response.data }; // ✅ Return success response
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false };
    }
  }),
};
