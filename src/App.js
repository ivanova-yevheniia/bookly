import { RouterProvider } from "react-router";
import { useSigninCheck } from "reactfire";
import { Loader } from "./components/Loader";
import { router } from "./utils/router";

function App() {
  const { data: signInData, status: signInStatus } = useSigninCheck();

  if (signInStatus === "loading") {
    return <Loader />;
  }

  if (signInStatus === "error") {
    return null;
  }

  const userName = signInData?.user?.displayName;
  const signedIn = signInData?.signedIn;

  if (signedIn && !userName) {
    signInData.user.reload();
  }

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
