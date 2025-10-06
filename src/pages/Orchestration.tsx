import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api";

const Orchestration = () => {
  const { toast } = useToast();
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [response, setResponse] = useState("");
  const [httpMethod, setHttpMethod] = useState("get");
  const [isLoading, setIsLoading] = useState(false);

  const handleExecute = async () => {
    if (!apiEndpoint) {
      toast({
        title: "Error",
        description: "Please enter an API endpoint",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse("Loading...");

    try {
      const headers = apiKey ? { 'Authorization': `Bearer ${apiKey}` } : undefined;
      let result;

      switch (httpMethod) {
        case 'get':
          result = await apiClient.get(apiEndpoint, headers);
          break;
        case 'post':
          result = await apiClient.post(apiEndpoint, {}, headers);
          break;
        case 'put':
          result = await apiClient.put(apiEndpoint, {}, headers);
          break;
        case 'delete':
          result = await apiClient.delete(apiEndpoint, headers);
          break;
        default:
          result = await apiClient.get(apiEndpoint, headers);
      }

      if (result.error) {
        setResponse(JSON.stringify({
          error: result.error,
          status: result.status,
          timestamp: new Date().toISOString()
        }, null, 2));

        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        setResponse(JSON.stringify(result.data, null, 2));

        toast({
          title: "Success",
          description: "API call executed successfully",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setResponse(JSON.stringify({
        error: errorMessage,
        timestamp: new Date().toISOString()
      }, null, 2));

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setApiEndpoint("");
    setApiKey("");
    setResponse("");
    setHttpMethod("get");
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Orchestration</h1>
          <p className="text-muted-foreground">Integrate with test data management APIs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="endpoint">API Endpoint</Label>
                <Input
                  id="endpoint"
                  placeholder="https://api.example.com/v1/data"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>

              <Tabs defaultValue="get" className="w-full" onValueChange={setHttpMethod}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="get">GET</TabsTrigger>
                  <TabsTrigger value="post">POST</TabsTrigger>
                  <TabsTrigger value="put">PUT</TabsTrigger>
                  <TabsTrigger value="delete">DELETE</TabsTrigger>
                </TabsList>
                <TabsContent value="get" className="mt-4">
                  <p className="text-sm text-muted-foreground">Fetch data from the API</p>
                </TabsContent>
                <TabsContent value="post" className="mt-4">
                  <p className="text-sm text-muted-foreground">Send data to the API</p>
                </TabsContent>
                <TabsContent value="put" className="mt-4">
                  <p className="text-sm text-muted-foreground">Update existing data</p>
                </TabsContent>
                <TabsContent value="delete" className="mt-4">
                  <p className="text-sm text-muted-foreground">Delete data from the API</p>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleExecute}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isLoading ? "Loading..." : "Execute"}
                </Button>
                <Button variant="outline" onClick={handleReset} disabled={isLoading}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              <div className="pt-4 border-t mt-4">
                <p className="text-xs text-muted-foreground">
                  Backend URL: <span className="font-mono">{API_CONFIG.BASE_URL}</span>
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Response</h2>
            <div className="bg-muted rounded-lg p-4 h-[400px] overflow-auto">
              <pre className="text-sm font-mono">
                {response || "No response yet. Execute an API call to see the response."}
              </pre>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm mt-6">
          <h2 className="text-xl font-semibold mb-4">Recent API Calls</h2>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">GET /api/data/sync</p>
                  <p className="text-sm text-muted-foreground">2 minutes ago</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-accent/20 text-accent">
                  Success
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Orchestration;
