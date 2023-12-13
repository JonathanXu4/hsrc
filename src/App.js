import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Test from "./pages/Test";
import Rates from "./pages/RelicRates";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route exact path="/help/" element={<Help />} />
        <Route exact path="/rates/" element={<Rates />} />
        <Route exact path="/test/" element={<Test />} />
        <Route exact path="/test/:text/" element={<Test />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
