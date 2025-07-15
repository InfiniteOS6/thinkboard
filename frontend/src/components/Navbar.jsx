import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-4xl">ThinkBoard</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>

            <Link to= {"/create"} className = "btn btn-primary">
                <PlusIcon />
                <span> NewNote </span>
            </Link>
            
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
