import { AppLayout } from "@/components/layout/AppLayout";
import { PlayersTable } from "@/components/players/PlayersTable";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, TrendingUp, Target, Filter, Download } from "lucide-react";

const Players = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Player Management
            </h1>
            <p className="text-muted-foreground">
              Analyze and scout players with advanced filtering and comparison tools
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button className="bg-gradient-primary">
              <Download className="h-4 w-4 mr-2" />
              Export Selection
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Players"
            value="1,847"
            subtitle="In database"
            icon={Users}
            trend="up"
            trendValue="23"
          />
          <StatsCard
            title="Top Rated"
            value="156"
            subtitle="Score > 8.0"
            icon={Star}
            trend="up"
            trendValue="12"
          />
          <StatsCard
            title="Young Talents"
            value="342"
            subtitle="Under 23"
            icon={TrendingUp}
            trend="up"
            trendValue="8%"
          />
          <StatsCard
            title="Targets"
            value="28"
            subtitle="Shortlisted"
            icon={Target}
            trend="neutral"
          />
        </div>

        {/* Main Table */}
        <PlayersTable />

        {/* Additional Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Comparison Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Compare Selected Players
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Similar Players Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Market Value Trends
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                Add to Shortlist
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Generate Scout Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="h-4 w-4 mr-2" />
                Save Current Filter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Players;