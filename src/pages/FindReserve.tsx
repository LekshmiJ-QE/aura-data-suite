import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, Lock, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface DataRecord {
  id: number;
  name: string;
  type: string;
  size: string;
  lastUpdated: string;
  status: "Available" | "Reserved";
}

const FindReserve = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [reservationDuration, setReservationDuration] = useState("7");
  const [dataRecords, setDataRecords] = useState<DataRecord[]>([
    { id: 1, name: "Customer_Dataset_2024", type: "CSV", size: "2.4 GB", lastUpdated: "2024-01-15", status: "Available" },
    { id: 2, name: "Sales_Analytics_Q1", type: "JSON", size: "512 MB", lastUpdated: "2024-01-14", status: "Available" },
    { id: 3, name: "Inventory_Records", type: "Database", size: "1.8 GB", lastUpdated: "2024-01-13", status: "Reserved" },
    { id: 4, name: "User_Behavior_Logs", type: "CSV", size: "3.2 GB", lastUpdated: "2024-01-12", status: "Available" },
  ]);

  const handleReserve = (id: number) => {
    setDataRecords(records =>
      records.map(record =>
        record.id === id ? { ...record, status: "Reserved" as const } : record
      )
    );
    toast({
      title: "Data Reserved",
      description: `Data reserved for ${reservationDuration} days`,
    });
  };

  const handleRelease = (id: number) => {
    setDataRecords(records =>
      records.map(record =>
        record.id === id ? { ...record, status: "Available" as const } : record
      )
    );
    toast({
      title: "Reservation Released",
      description: "Data is now available for others",
    });
  };

  const filteredRecords = dataRecords.filter(record =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find & Reserve</h1>
          <p className="text-muted-foreground">Mine and reserve data resources</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold">
                  {dataRecords.filter(r => r.status === "Available").length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-accent to-primary">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reserved</p>
                <p className="text-2xl font-bold">
                  {dataRecords.filter(r => r.status === "Reserved").length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Size</p>
                <p className="text-2xl font-bold">7.9 GB</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="search">Search Data</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="duration">Reservation Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="7"
                value={reservationDuration}
                onChange={(e) => setReservationDuration(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.name}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.size}</TableCell>
                  <TableCell>{record.lastUpdated}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.status === "Available" 
                        ? "bg-accent/20 text-accent" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {record.status === "Available" ? (
                      <Button
                        size="sm"
                        onClick={() => handleReserve(record.id)}
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Reserve
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRelease(record.id)}
                      >
                        Release
                      </Button>
                    )}
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

export default FindReserve;
