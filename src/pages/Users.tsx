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
import { userService } from "@/services/user.service";
import { User, UserCreate } from "@/types/user";

const Users = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserCreate>({
    User_Name: "",
    User_Emp_ID: "",
    User_Email_ID: "",
    User_Role: "",
    User_Password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    const result = await userService.getAll();
    setIsLoading(false);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setUsers(result.data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = editingUser
      ? await userService.update(editingUser.User_ID, formData)
      : await userService.create(formData);

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
        description: `User ${editingUser ? "updated" : "created"} successfully`,
      });
      setIsDialogOpen(false);
      resetForm();
      fetchUsers();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setIsLoading(true);
    const result = await userService.delete(id);
    setIsLoading(false);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "User deleted",
        description: "User has been successfully removed",
      });
      fetchUsers();
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      User_Name: user.User_Name,
      User_Emp_ID: user.User_Emp_ID || "",
      User_Email_ID: user.User_Email_ID || "",
      User_Role: user.User_Role || "",
      User_Password: "",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormData({
      User_Name: "",
      User_Emp_ID: "",
      User_Email_ID: "",
      User_Role: "",
      User_Password: "",
    });
  };

  const filteredUsers = users.filter(user =>
    user.User_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.User_Email_ID && user.User_Email_ID.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Users</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.User_Name}
                    onChange={(e) => setFormData({ ...formData, User_Name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="empId">Employee ID</Label>
                  <Input
                    id="empId"
                    value={formData.User_Emp_ID}
                    onChange={(e) => setFormData({ ...formData, User_Emp_ID: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.User_Email_ID}
                    onChange={(e) => setFormData({ ...formData, User_Email_ID: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.User_Role}
                    onChange={(e) => setFormData({ ...formData, User_Role: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    required={!editingUser}
                    value={formData.User_Password}
                    onChange={(e) => setFormData({ ...formData, User_Password: e.target.value })}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingUser ? "Update User" : "Create User"}
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {isLoading && !users.length ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.User_ID}>
                    <TableCell className="font-medium">{user.User_Name}</TableCell>
                    <TableCell>{user.User_Emp_ID || "-"}</TableCell>
                    <TableCell>{user.User_Email_ID || "-"}</TableCell>
                    <TableCell>{user.User_Role || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(user.User_ID)}
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

export default Users;
