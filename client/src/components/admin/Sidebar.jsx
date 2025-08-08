import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const navItems = [
  { to: "/admin", icon: assets.home_icon, label: "Dashboard", end: true },
  { to: "/admin/addBlog", icon: assets.add_icon, label: "Add Blogs" },
  { to: "/admin/listBlog", icon: assets.list_icon, label: "Blog Lists" },
  { to: "/admin/comments", icon: assets.comment_icon, label: "Comments" },
];

function Sidebar() {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      {navItems.map(({ to, icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive && "bg-primary/10 border-r-4 border-primary "
            } `
          }
        >
          <img src={icon} className="min-w-4 w-5" />
          <p className="hidden md:inline-block">{label}</p>
        </NavLink>
      ))}
      {/* <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary "
          } `
        }
      >
        <img src={assets.home_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary "
          } `
        }
      >
        <img src={assets.add_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>

      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary "
          } `
        }
      >
        <img src={assets.list_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Blog Lists</p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary "
          } `
        }
      >
        <img src={assets.comment_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink> */}
    </div>
  );
}

export default Sidebar;
