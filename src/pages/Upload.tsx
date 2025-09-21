import { AppLayout } from "@/components/layout/AppLayout";
import { UploadZone } from "@/components/upload/UploadZone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Users, Zap } from "lucide-react";

const mockViews = [
  {
    id: "1",
    name: "Premier League Midfielders",
    lastUpdated: "2024-01-15",
    playersCount: 186,
    status: "active"
  },
  {
    id: "2",
    name: "Young Prospects U21",
    lastUpdated: "2024-01-14", 
    playersCount: 234,
    status: "active"
  },
  {
    id: "3",
    name: "Championship Strikers",
    lastUpdated: "2024-01-13",
    playersCount: 156,
    status: "processing"
  }
];

const Upload = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Upload & Manage Data
          </h1>
          <p className="text-muted-foreground">
            Import Football Manager HTML exports and manage your player databases
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div>
            <UploadZone />
          </div>

          {/* Existing Views */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Existing Views
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockViews.map((view) => (
                <div
                  key={view.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{view.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {view.lastUpdated}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {view.playersCount} players
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={view.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {view.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Open
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Data Processing Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Zap className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Auto-Process</div>
                  <div className="text-xs text-muted-foreground">
                    Process all uploaded files
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Merge Views</div>
                  <div className="text-xs text-muted-foreground">
                    Combine multiple databases
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <FileText className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Export Report</div>
                  <div className="text-xs text-muted-foreground">
                    Generate analysis report
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Upload;
