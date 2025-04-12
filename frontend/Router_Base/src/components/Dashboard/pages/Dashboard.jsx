import {
  ExclamationCircleIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import UserTable from "../components/UserTable";
import { NavLink } from "react-router-dom";

const Dashboard = ({ users }) => {
  const stats = [
    {
      name: "Total Routers Sold",
      value: "12,450",
      icon: ShoppingBagIcon,
      change: "+8.2%",
      changeType: "positive",
    },
    {
      name: "Active Connections",
      value: "98,765",
      icon: UserGroupIcon,
      change: "+4.5%",
      changeType: "positive",
    },
    {
      name: "Revenue",
      value: "$1,245,678",
      icon: CurrencyDollarIcon,
      change: "+6.7%",
      changeType: "positive",
    },
    {
      name: "Downtime Reports",
      value: "42",
      icon: ExclamationCircleIcon,
      change: "-3.2%",
      changeType: "negative",
    },
    {
      name: "New Subscriptions",
      value: "3,250",
      icon: ClipboardDocumentCheckIcon,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      name: "Average Speed (Mbps)",
      value: "256",
      icon: BoltIcon,
      change: "+7.1%",
      changeType: "positive",
    },
  ];

  return (
    <div className="space-y-6 dark:bg-[var(--background)] p-4 md:p-6 text-[--text-color] ">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-[var(--card-bg)] overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] shadow-black/50 rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-gray-500">
                  <stat.icon className="h-6 w-6 " aria-hidden="true" />
                </div>
                <div className="ml-2 md:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm md:text-base font-medium  truncate w-full">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-500  ">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className={` py-3 text-right`}>
              <span
                className={`text-xs font-medium  p-5 rounded-tl-4xl  ${
                  stat.changeType === "positive"
                    ? "bg-success-500 "
                    : "bg-error-500 "
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--card-bg)]  shadow-lg rounded-lg p-6 px-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium ">Recent Users</h2>
          <NavLink
            to="/customers"
            className="text-sm font-medium text-primary-600 hover:text-primary-500 cursor-pointer "
          >
            View all
          </NavLink>
        </div>
        <UserTable limit={5} users={users} />
      </div>
    </div>
  );
};

export default Dashboard;
