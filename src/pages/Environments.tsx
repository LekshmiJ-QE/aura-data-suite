import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { environmentService } from "@/services/environment.service";
import { Environment, EnvironmentCreate } from "@/types/environment";

const Environments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEnv, setEditingEnv] = useState<Environment | null>(null);
  const [formData, setFormData] = useState<EnvironmentCreate>({
    Env_Name: "",
    Env_Instance: "",
    Env_App_Name: "",
    Env_DB_Type: "",
  });

  useEffect(() => {
    fetchEnvironments();
  }, []);

  const fetchEnvironments = async () => {
    setIsLoading(true);
    const result = await environmentService.getAll();
    setIsLoading(false);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setEnvironments(result.data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = editingEnv
      ? await environmentService.update(editingEnv.Env_ID, formData)
      : await environmentService.create(formData);

    setIsLoading(false);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Environment ${editingEnv ? "updated" : "created"} successfully`,
      });
      setIsDialogOpen(false);
      resetForm();
      fetchEnvironments();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this environment?")) return;

    setIsLoading(true);
    const result = await environmentService.delete(id);
    setIsLoading(false);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Environment deleted",
        description: "Environment has been successfully removed",
      });
      fetchEnvironments();
    }
  };

  const handleEdit = (env: Environment) => {
    setEditingEnv(env);
    setFormData({
      Env_Name: env.Env_Name || "",
      Env_Instance: env.Env_Instance || "",
      Env_App_Name: env.Env_App_Name || "",
      Env_DB_Type: env.Env_DB_Type || "",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingEnv(null);
    setFormData({
      Env_Name: "",
      Env_Instance: "",
      Env_App_Name: "",
      Env_DB_Type: "",
    });
  };

  const filteredEnvironments = environments.filter(env =>
    (env.Env_Name && env.Env_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (env.Env_App_Name && env.Env_App_Name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Environments</h1>
            <p className="text-muted-foreground">Manage deployment environments</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add Environment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingEnv ? "Edit Environment" : "Create New Environment"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Environment Name</Label>
                  <Input
                    id="name"
                    value={formData.Env_Name}
                    onChange={(e) => setFormData({ ...formData, Env_Name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="instance">Instance</Label>
                  <Input
                    id="instance"
                    value={formData.Env_Instance}
                    onChange={(e) => setFormData({ ...formData, Env_Instance: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="appName">Application Name</Label>
                  <Input
                    id="appName"
                    value={formData.Env_App_Name}
                    onChange={(e) => setFormData({ ...formData, Env_App_Name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="dbType">Database Type</Label>
                  <Input
                    id="dbType"
                    value={formData.Env_DB_Type}
                    onChange={(e) => setFormData({ ...formData, Env_DB_Type: e.target.value })}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingEnv ? "Update Environment" : "Create Environment"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
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

          {isLoading && !environments.length ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Instance</TableHead>
                  <TableHead>Application</TableHead>
                  <TableHead>DB Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnvironments.map((env) => (
                  <TableRow key={env.Env_ID}>
                    <TableCell className="font-medium">{env.Env_Name || "-"}</TableCell>
                    <TableCell>{env.Env_Instance || "-"}</TableCell>
                    <TableCell>{env.Env_App_Name || "-"}</TableCell>
                    <TableCell>{env.Env_DB_Type || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => handleEdit(env)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(env.Env_ID)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Environments;
