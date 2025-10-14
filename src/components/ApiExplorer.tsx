import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Users, Settings, Network, Workflow } from "lucide-react";

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  tag: string;
}

const apiEndpoints: ApiEndpoint[] = [
  // User Management
  { method: "GET", path: "/users/", description: "List all users", tag: "Users" },
  { method: "POST", path: "/users/", description: "Create new user", tag: "Users" },
  { method: "GET", path: "/users/{id}", description: "Get user by ID", tag: "Users" },
  { method: "PUT", path: "/users/{id}", description: "Update user", tag: "Users" },
  { method: "DELETE", path: "/users/{id}", description: "Delete user", tag: "Users" },
  
  // Projects
  { method: "GET", path: "/projects/", description: "List all projects", tag: "Projects" },
  { method: "POST", path: "/projects/", description: "Create new project", tag: "Projects" },
  { method: "GET", path: "/projects/{id}", description: "Get project by ID", tag: "Projects" },
  { method: "PUT", path: "/projects/{id}", description: "Update project", tag: "Projects" },
  { method: "DELETE", path: "/projects/{id}", description: "Delete project", tag: "Projects" },
  
  // Environments
  { method: "GET", path: "/environments/", description: "List all environments", tag: "Environments" },
  { method: "POST", path: "/environments/", description: "Create new environment", tag: "Environments" },
  { method: "GET", path: "/environments/{id}", description: "Get environment by ID", tag: "Environments" },
  { method: "PUT", path: "/environments/{id}", description: "Update environment", tag: "Environments" },
  { method: "DELETE", path: "/environments/{id}", description: "Delete environment", tag: "Environments" },
  
  // TDM Tools
  { method: "GET", path: "/tdm-tools/", description: "List all TDM tools", tag: "TDM Tools" },
  { method: "POST", path: "/tdm-tools/", description: "Create new TDM tool", tag: "TDM Tools" },
  { method: "GET", path: "/tdm-tools/{id}", description: "Get TDM tool by ID", tag: "TDM Tools" },
  { method: "PUT", path: "/tdm-tools/{id}", description: "Update TDM tool", tag: "TDM Tools" },
  { method: "DELETE", path: "/tdm-tools/{id}", description: "Delete TDM tool", tag: "TDM Tools" },
  
  // GenRocket Services
  { method: "GET", path: "/genrocket_services_details/", description: "List all GenRocket services", tag: "GenRocket" },
  { method: "POST", path: "/genrocket_services_details/", description: "Create GenRocket service", tag: "GenRocket" },
  { method: "GET", path: "/genrocket_services_execution_details/", description: "List execution details", tag: "GenRocket" },
  { method: "POST", path: "/genrocket_services_execution_details/", description: "Create execution record", tag: "GenRocket" },
  
  // Access Matrix
  { method: "GET", path: "/access_matrix/", description: "List access matrix", tag: "Access Control" },
  { method: "POST", path: "/access_matrix/", description: "Create access rule", tag: "Access Control" },
  { method: "GET", path: "/feature_role_access_matrix/", description: "List feature role access", tag: "Access Control" },
  
  // Configuration
  { method: "GET", path: "/user_roles/", description: "List user roles", tag: "Configuration" },
  { method: "GET", path: "/feature_names/", description: "List feature names", tag: "Configuration" },
  { method: "GET", path: "/project_configs/", description: "List project configs", tag: "Configuration" },
  { method: "GET", path: "/db_definations/", description: "List DB definitions", tag: "Configuration" },
];

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    case "POST": return "bg-green-500/20 text-green-400 border-green-500/50";
    case "PUT": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    case "DELETE": return "bg-red-500/20 text-red-400 border-red-500/50";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Users":
    case "Projects":
    case "Environments":
      return <Users className="h-4 w-4" />;
    case "TDM Tools":
    case "GenRocket":
      return <Workflow className="h-4 w-4" />;
    case "Access Control":
      return <Network className="h-4 w-4" />;
    case "Configuration":
      return <Settings className="h-4 w-4" />;
    default:
      return <Database className="h-4 w-4" />;
  }
};

export const ApiExplorer = () => {
  const categories = Array.from(new Set(apiEndpoints.map(e => e.tag)));

  return (
    <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Database className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">API Explorer</h2>
      </div>
      
      <Tabs defaultValue={categories[0]} className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="gap-2">
                {getCategoryIcon(category)}
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {apiEndpoints
                  .filter(endpoint => endpoint.tag === category)
                  .map((endpoint, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Badge variant="outline" className={`${getMethodColor(endpoint.method)} font-mono text-xs`}>
                        {endpoint.method}
                      </Badge>
                      <div className="flex-1">
                        <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
                        <p className="text-xs text-muted-foreground mt-1">{endpoint.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
