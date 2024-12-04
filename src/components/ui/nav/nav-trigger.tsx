import { ChevronLeft, Menu } from "lucide-react";
import { Button } from "../button";
import { useSidebar } from "../sidebar";
import { useNavigate, useLocation, Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../breadcrumb";

export function NavTrigger() {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const showBackButton = location.pathname !== "/";

  const handleBack = () => {
    navigate(-1);
  };

  const isUUID = (str: string) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(str);
  };

  return (
    <div className="flex w-full items-center justify-between space-x-4">
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSidebar}
          className="flex items-center px-3 py-2 text-sm font-medium"
        >
          <Menu className="mr-2 h-4 w-4" />
          Menu
        </Button>
        <Breadcrumb className="flex items-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              {/* Atualizado o link de Home para /admin */}
              <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {pathnames.map((name, index) => {
              if (isUUID(name)) return null;
              if (name === "admin") return null;

              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;

              return (
                <BreadcrumbItem key={routeTo}>
                  {isLast ? (
                    <BreadcrumbPage>{name}</BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink asChild>
                        <Link to={routeTo}>{name}</Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {showBackButton && (
        <Button
          onClick={handleBack}
          variant="ghost"
          size="sm"
          className="flex items-center text-sm"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar
        </Button>
      )}
    </div>
  );
}
