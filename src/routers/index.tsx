import AntdDemo from "@/pages/antd-demo";
import Home from "@/pages/home";
import { Link } from "pure-react-router";

export const routes = [
  {
    path: "/",
    component: Home,
  },
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
          <Link className="cursor-pointer" to="/">
            回到首页
          </Link>
        </div>
      </div>
    ),
  },
]
