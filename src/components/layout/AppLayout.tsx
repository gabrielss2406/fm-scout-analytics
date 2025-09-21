import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, BarChart3, Users, Upload, Settings, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", icon: BarChart3, href: "/" },
  { name: "Players", icon: Users, href: "/players" },
  { name: "Analysis", icon: Target, href: "/analysis" },
  { name: "Upload", icon: Upload, href: "/upload" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex h-16 items-center px-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in">
                <h1 className="text-lg font-bold text-foreground">FM Scout</h1>
                <p className="text-xs text-muted-foreground">Moneyball</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12",
                    !sidebarOpen && "px-0 justify-center",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {sidebarOpen && (
                    <span className="animate-fade-in">{item.name}</span>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        {/* Header */}
        <header className="h-16 bg-card border-b border-border px-6 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Export Data
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-primary" />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}