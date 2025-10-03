import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Environment {
  id: number;
  name: string;
  type: string;
  project: string;
  status: string;
}

const Environments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [environments, setEnvironments] = useState<Environment[]>([
    { id: 1, name: "Production", type: "Production", project: "Customer Analytics", status: "Active" },
    { id: 2, name: "Staging", type: "Staging", project: "Sales Dashboard", status: "Active" },
    { id: 3, name: "Development", type: "Development", project: "Inventory System", status: "Active" },
    { id: 4, name: "Testing", type: "Testing", project: "Customer Analytics", status: "Inactive" },
  ]);

  const handleDelete = (id: number) => {
    setEnvironments(environments.filter(env => env.id !== id));
    toast({
      title: "Environment deleted",
      description: "Environment has been successfully removed",
    });
  };

  const filteredEnvironments = environments.filter(env =>
    env.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    env.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Environments</h1>
            <p className="text-muted-foreground">Manage deployment environments</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Add Environment
          </Button>
        </div>

        <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search environments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnvironments.map((env) => (
                <TableRow key={env.id}>
                  <TableCell className="font-medium">{env.name}</TableCell>
                  <TableCell>{env.type}</TableCell>
                  <TableCell>{env.project}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      env.status === "Active" 
                        ? "bg-accent/20 text-accent" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {env.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(env.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Environments;
