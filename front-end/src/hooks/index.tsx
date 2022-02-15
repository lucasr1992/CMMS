
import React from "react";
import { AuthProvider } from "./AuthContext";

const AppProviver: React.FC = ({ children }) => (
    <AuthProvider>
       {/* <ToastProvider> */}
            {children}
      {/*  </ToastProvider>  */}
    </AuthProvider>
);

export default AppProviver;
 
