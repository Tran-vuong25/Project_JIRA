import { RouterProvider } from "react-router-dom";
import { GlobalStyle } from "./components/global-style/GlobalStyle";
import { router } from "./routers";

function App() {
  return (
    <>
      <GlobalStyle>
        <RouterProvider router={router} />
      </GlobalStyle>
    </>
  );
}

export default App;
