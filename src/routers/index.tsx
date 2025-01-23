import AntdDemo from "@/pages/antd-demo";
import Home from "@/pages/home";
import { Link } from "pure-react-router";

export const routes = [
  {
    path: "/antd-demo",
    component: AntdDemo,
  },
  {
    path: "/about",
    component: () => (
      <div>
        <div>About</div>
        <div>
          <Link className="cursor-pointer text-blue-700" to="/">
            回到首页
          </Link>
        </div>
      </div>
    ),
  },
  {
    path: "/",
    component: Home,
  },
]
