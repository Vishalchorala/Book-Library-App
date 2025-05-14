import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { paths } from "../../constant/menuItems";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-dvh w-full bg-white text-gray-600">
        <div className="w-10 h-10 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Checking authentication...</p>
      </div>
    );
  }

  return session ? children : <Navigate to={paths.login} />;
};

export default PrivateRoute;
