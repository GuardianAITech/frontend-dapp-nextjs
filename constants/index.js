import { MdDashboard } from "react-icons/md";
import { FaRegCheckCircle, FaRegChartBar, FaRegListAlt, FaShieldAlt } from "react-icons/fa";

  export const menuItems = [
    {
        title: "Quick Scan",
        path: "/",
        icon: <MdDashboard />,
    },
    {
        title: "Approvals",
        path: "/approval",
        icon: <FaRegCheckCircle />,
    },
    {
        title: "Monitor",
        path: "/",
        icon: <FaRegChartBar />,
    },
    {
        title: "Reports",
        path: "/",
        icon: <FaRegListAlt />,
    },
    {
        title: "Latest Exploits and Hacks",
        path: "/newsfeed",
        icon: <FaShieldAlt />,
    },
];



