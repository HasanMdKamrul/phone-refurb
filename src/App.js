import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/Routes/Router";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
