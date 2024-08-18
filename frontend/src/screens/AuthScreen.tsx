import React, { useState } from "react";
import LoginView from "../views/LoginView";
import SignupView from "../views/SignupView";

const AuthScreen: React.FC = () => {
  const [currentOption, setCurrenOption] = useState<"login" | "signup">("login");

  if (currentOption === "login") return <LoginView onSwitch={()=>setCurrenOption("signup")}/>;

  if (currentOption === "signup") return <SignupView onSwitch={()=>setCurrenOption("login")}/>;
};

export default AuthScreen;
