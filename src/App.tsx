import React from "react";
import { router } from "@app/routes";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@app/store/store";
import AuthProvider from "@app/utils/auth-provider";

function App() {
  return (
    <div className="w-full min-h-screen bg-[#F5F5F7] font-sfpro">
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>,
    </div>
  );
}

export default App;
