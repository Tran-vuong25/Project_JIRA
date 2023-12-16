import { RouterProvider } from "react-router-dom";
import { GlobalStyle } from "./components/global-style/GlobalStyle";
import { router } from "./routers";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLocal } from "./utils";
import { ACCESS_TOKEN } from "./constants";
import { getUser } from "./services/user.service";
import { userLogin } from "./redux/user-slice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = getLocal(ACCESS_TOKEN);
    if (accessToken) {
      getUser().then((resp) => {
        dispatch(
          userLogin({
            email: resp.email,
          })
        );
      });
    }
  }, []);

  return (
    <>
      <GlobalStyle>
        <RouterProvider router={router} />
      </GlobalStyle>
    </>
  );
}

export default App;
