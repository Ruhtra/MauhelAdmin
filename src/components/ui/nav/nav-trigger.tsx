import { ChevronLeft, Menu } from "lucide-react";
import { Button } from "../button";
import { useSidebar } from "../sidebar";
import { useNavigate, useLocation } from "react-router";

export function NavTrigger() {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const showBackButton = location.pathname !== "/";

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex w-full items-center justify-between space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleSidebar}
        className="flex items-center px-3 py-2 text-sm font-medium"
      >
        <Menu className="mr-2 h-5 w-5" />
        Menu
      </Button>
      {showBackButton && (
        <Button
          onClick={handleBack}
          variant="ghost"
          size="sm"
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar
        </Button>
      )}
    </div>
  );
}
