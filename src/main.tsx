import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import Router from "./components/Router.js";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(

    <RouterProvider router={Router} />

)