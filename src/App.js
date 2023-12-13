import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./RootLayout";
import Home from "./Home";
import Help from "./Help";
import Test from "./Test";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route exact path="/help/" element={<Help />} />
        <Route exact path="/test/" element={<Test />} />
        <Route exact path="/test/:text/" element={<Test />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
