import { MdDashboard } from "react-icons/md";
import { FaRegCheckCircle, FaRegChartBar, FaRegListAlt } from "react-icons/fa";

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
        title: "Latest Exploits and Hacks",
        path: "/newsfeed",
        icon: <FaRegChartBar />,
    },
    {
        title: "Reports",
        path: "/",
        icon: <FaRegListAlt />,
    },
];



