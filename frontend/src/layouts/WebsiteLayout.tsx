import { Outlet } from "react-router-dom";

export function WebsiteLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
}

export default WebsiteLayout;
