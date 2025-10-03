import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Users, FolderKanban, Layers, Activity } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, color: "from-primary to-primary-glow" },
    { title: "Active Projects", value: "56", icon: FolderKanban, color: "from-accent to-accent" },
    { title: "Environments", value: "12", icon: Layers, color: "from-primary to-accent" },
    { title: "API Calls Today", value: "8,492", icon: Activity, color: "from-accent to-primary" },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Data360 Management Platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 border-0 bg-gradient-to-br from-card to-card/50">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 rounded-lg border border-border hover:border-primary transition-colors text-left">
              <h3 className="font-semibold mb-1">Create User</h3>
              <p className="text-sm text-muted-foreground">Add a new user to the system</p>
            </button>
            <button className="p-4 rounded-lg border border-border hover:border-primary transition-colors text-left">
              <h3 className="font-semibold mb-1">New Project</h3>
              <p className="text-sm text-muted-foreground">Start a new project</p>
            </button>
            <button className="p-4 rounded-lg border border-border hover:border-primary transition-colors text-left">
              <h3 className="font-semibold mb-1">Reserve Data</h3>
              <p className="text-sm text-muted-foreground">Find and reserve data resources</p>
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
