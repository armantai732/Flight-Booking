import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  // Flights submenu
  const [flightOpen, setFlightOpen] = useState(
    location.pathname === "/admin/addflight" ||
    location.pathname === "/admin/manage-flights"
  );


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    alert("Logged out!");

    navigate("/admin/login");
  };

  const isDashboardActive =
    location.pathname === "/admin/dashboard";

  const isAddFlightActive =
    location.pathname === "/admin/addflight";

  const isManageFlightActive =
    location.pathname === "/admin/manage-flights";

  const isBookingsActive =
    location.pathname === "/admin/bookings";

  const isUsersActive =
    location.pathname === "/admin/users";

  const isSettingsActive =
    location.pathname === "/admin/settings";

  const isFlightsActive =
    isAddFlightActive || isManageFlightActive;


  return (

    <div className="w-64 h-screen bg-[#0b2545] text-white flex flex-col flex-shrink-0">

      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-blue-500 text-2xl font-black">
            ✈
          </span>
          <div>
            <h1 className="text-white font-extrabold text-lg tracking-wide">
              FlyHigh
            </h1>
            <p className="text-[10px] text-slate-400 font-normal">
              Admin Panel
            </p>
          </div>
        </div>
      </div>


      <nav className="flex-1 px-3 py-2 space-y-1 text-xs font-semibold">

        <button type="button" onClick={() => navigate("/admin/dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition${isDashboardActive ? "bg-blue-600 text-white font-bold" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
          <span>
            🏠
          </span>
          <span>
            Dashboard
          </span>
        </button>

        <div className="space-y-1">

          <button type="button" onClick={() => setFlightOpen((prev) => !prev)} className={` w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${isFlightsActive ? "bg-blue-600 text-white font-bold" : "text-slate-300 hover:bg-slate-800 hover:text-white"} `} >
            <div className="flex items-center gap-3">
              <span>
                ✈️
              </span>
              <span>
                Flights
              </span>
            </div>
            <span className={`text-[9px] transition-transform duration-200 ${flightOpen ? "rotate-180" : ""}`}>
              ▲
            </span>
          </button>


          {flightOpen && (
            <div className="pl-6 space-y-1">

              {/* ADD FLIGHTS */}
              <button type="button" onClick={() => navigate("/admin/addflight")} className={` w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-lg transition ${isAddFlightActive ? "bg-blue-500/20 text-blue-400 font-bold" : "hover:text-white"} `} >
                <span>
                  +
                </span>
                <span>
                  Add Flight
                </span>
              </button>


              {/* MANAGE FLIGHTS */}
              <button type="button" onClick={() => navigate("/admin/manage-flights")} className={` w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-lg transition ${isManageFlightActive ? "bg-blue-500/20 text-blue-400 font-bold" : "text-slate-300 hover:bg-slate-800 hover:text-white"} `} >
                <span>
                  ☰
                </span>
                <span>
                  Manage Flights
                </span>
              </button>
            </div>
          )}

        </div>



        <div className="border-t border-slate-700/60 my-3" />

        <button
          type="button"
          onClick={() => navigate("/admin/bookings")}
          className={` w-full flex items-center gap-3 px-4 py-3 rounded-xl transition

            ${isBookingsActive
              ? "bg-blue-500/20 text-blue-400 font-bold"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }
          `}
        >
          <span>
            📅
          </span>

          <span>
            Bookings
          </span>

        </button>


        {/* =================================
            USERS
        ================================= */}

        <button
          type="button"
          onClick={() => navigate("/admin/users")}
          className={` w-full flex items-center gap-3 px-4 py-3 rounded-xl transition

            ${isUsersActive
              ? "bg-blue-500/20 text-blue-400 font-bold"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }
          `}
        >

          <span>
            👥
          </span>

          <span>
            Users
          </span>

        </button>


        {/* =================================
            SETTINGS
        ================================= */}

        <button
          type="button"
          onClick={() => navigate("/admin/settings")}
          className={` w-full flex items-center gap-3 px-4 py-3 rounded-xl transition

            ${isSettingsActive
              ? "bg-blue-500/20 text-blue-400 font-bold"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }
          `}
        >

          <span>
            ⚙️
          </span>

          <span>
            Settings
          </span>

        </button>

      </nav>


      {/* =====================================
          LOGOUT
      ===================================== */}

      <div className="px-3 pb-5">

        <div className="border-t border-slate-700/60 pt-3">

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold  text-slate-400  hover:bg-red-500/10  hover:text-red-400 transition
            "
          >

            <span>
              ↪
            </span>

            <span>
              Logout
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}