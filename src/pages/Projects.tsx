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
import { projectService } from "@/services/project.service";
import { Project, ProjectCreate } from "@/types/project";

const Projects = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectCreate>({
    Project_Name: "",
    Created_By_Name: "",
    Created_By_Role: "",
    Module_Name: "",
    Scenario_Name: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const result = await projectService.getAll();
    setIsLoading(false);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setProjects(result.data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = editingProject
      ? await projectService.update(editingProject.Project_ID, formData)
      : await projectService.create(formData);

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
        description: `Project ${editingProject ? "updated" : "created"} successfully`,
      });
      setIsDialogOpen(false);
      resetForm();
      fetchProjects();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setIsLoading(true);
    const result = await projectService.delete(id);
    setIsLoading(false);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Project deleted",
        description: "Project has been successfully removed",
      });
      fetchProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      Project_Name: project.Project_Name,
      Created_By_Name: project.Created_By_Name || "",
      Created_By_Role: project.Created_By_Role || "",
      Module_Name: project.Module_Name || "",
      Scenario_Name: project.Scenario_Name || "",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      Project_Name: "",
      Created_By_Name: "",
      Created_By_Role: "",
      Module_Name: "",
      Scenario_Name: "",
    });
  };

  const filteredProjects = projects.filter(project =>
    project.Project_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.Module_Name && project.Module_Name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground">Manage your data projects</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.Project_Name}
                    onChange={(e) => setFormData({ ...formData, Project_Name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="createdBy">Created By</Label>
                  <Input
                    id="createdBy"
                    value={formData.Created_By_Name}
                    onChange={(e) => setFormData({ ...formData, Created_By_Name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Creator Role</Label>
                  <Input
                    id="role"
                    value={formData.Created_By_Role}
                    onChange={(e) => setFormData({ ...formData, Created_By_Role: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="module">Module Name</Label>
                  <Input
                    id="module"
                    value={formData.Module_Name}
                    onChange={(e) => setFormData({ ...formData, Module_Name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="scenario">Scenario Name</Label>
                  <Input
                    id="scenario"
                    value={formData.Scenario_Name}
                    onChange={(e) => setFormData({ ...formData, Scenario_Name: e.target.value })}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingProject ? "Update Project" : "Create Project"}
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
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {isLoading && !projects.length ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Scenario</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.Project_ID}>
                    <TableCell className="font-medium">{project.Project_Name}</TableCell>
                    <TableCell>{project.Module_Name || "-"}</TableCell>
                    <TableCell>{project.Scenario_Name || "-"}</TableCell>
                    <TableCell>{project.Created_By_Name || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(project.Project_ID)}
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

export default Projects;
