import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import Rates from "./pages/RelicRates";
import Calculator from "./pages/Calculator";
import Help from "./pages/Help";
import Test from "./pages/Test";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route exact path="/rates/" element={<Rates />} />
        <Route exact path="/calculator/" element={<Calculator />} />
        <Route exact path="/help/" element={<Help />} />
        <Route exact path="/test/" element={<Test />} />
        <Route exact path="/test/:text/" element={<Test />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
