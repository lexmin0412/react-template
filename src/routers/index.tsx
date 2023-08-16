import {
  createBrowserRouter,
	Link
} from "react-router-dom";
import App from "../App";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/about",
      element: (
        <div>
          <div>About</div>
					<div>
						<Link className="cursor-pointer" to='/' >回到首页</Link>
					</div>
        </div>
      ),
    },
  ],
  {
    basename: "/react-template",
  }
);

export default router
