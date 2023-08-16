import {
  createBrowserRouter,
	Link
} from "react-router-dom";
import Home from "../pages/home";
import AntdDemo from "../pages/antd-demo";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/antd-demo",
      element: <AntdDemo />,
    },
    {
      path: "/about",
      element: (
        <div>
          <div>About</div>
          <div>
            <Link className="cursor-pointer" to="/">
              回到首页
            </Link>
          </div>
        </div>
      ),
    },
  ],
  {
    basename: "/react-template/",
  }
);

export default router
