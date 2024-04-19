import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../state/StateProvider";
import axios from "../api";
import { useEffect } from "react";

export const Header = () => {
  const { state, dispatch } = useMyContext();
  const navigate = useNavigate();

  const fetchLoginUser = async () => {
    try {
      const result = await axios.get("/auth/me");

      await dispatch({ type: "USER", payload: result.data });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchLoginUser();
  }, []);

  const onClickLogout = async () => {
    await dispatch({ type: "USER", payload: null });
    localStorage.removeItem("token");
    navigate("/login");
  };

  const userData = state.user;
  return (
    <header className="antialiased">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-end items-center">
          <div className="flex items-center lg:order-2">
            {userData ? (
              <>
                <p className="pr-4 font-medium">{userData.email}</p>
                <Link to="/">
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 
                  dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Main
                  </button>
                </Link>

                <div>
                  <Link to="/add-audit">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      variant="contained"
                    >
                      Create Audit
                    </button>
                  </Link>
                  <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={onClickLogout}
                    variant="contained"
                    color="error"
                  >
                    Exit
                  </button>
                </div>
              </>
            ) : (
              <>
                <>
                  <Link to="/login">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      variant="outlined"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      variant="contained"
                    >
                      Create account
                    </button>
                  </Link>
                </>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
