import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PlayersTable } from "@/components/players/PlayersTable";
import { PlayerRadarChart } from "@/components/players/PlayerRadarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Database, Award, Upload, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const mockRadarData = [
  { attribute: "Pace", value: 85, fill: "hsl(var(--chart-1))" },
  { attribute: "Shooting", value: 78, fill: "hsl(var(--chart-2))" },
  { attribute: "Passing", value: 92, fill: "hsl(var(--chart-3))" },
  { attribute: "Defending", value: 45, fill: "hsl(var(--chart-4))" },
  { attribute: "Physical", value: 76, fill: "hsl(var(--chart-5))" },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-hero p-8 border border-border">
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              FM Moneyball Scout
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Advanced player analytics powered by Football Manager data
            </p>
            <div className="flex items-center gap-4">
              <Button className="bg-gradient-primary hover:bg-primary-hover shadow-glow">
                <Upload className="h-4 w-4 mr-2" />
                Upload FM Data
              </Button>
              <Button variant="outline">
                <Zap className="h-4 w-4 mr-2" />
                Run AI Analysis
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 rounded-full blur-3xl" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Players"
            value="1,847"
            subtitle="Analyzed"
            icon={Users}
            trend="up"
            trendValue="12%"
          />
          <StatsCard
            title="Avg Moneyball Score"
            value="7.3"
            subtitle="This season"
            icon={TrendingUp}
            trend="up"
            trendValue="0.4"
          />
          <StatsCard
            title="Database Views"
            value="23"
            subtitle="Active"
            icon={Database}
            trend="neutral"
          />
          <StatsCard
            title="Top Prospects"
            value="156"
            subtitle="Under 23"
            icon={Award}
            trend="up"
            trendValue="8"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Players Table */}
          <div className="lg:col-span-2">
            <PlayersTable />
          </div>

          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Player Attributes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PlayerRadarChart data={mockRadarData} />
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Bruno Silva - Sporting CP
                </p>
                <p className="text-lg font-bold text-center text-primary mt-1">
                  Moneyball Score: 8.4
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <Upload className="h-5 w-5" />
                <span>Import New Data</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>Generate Report</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <Zap className="h-5 w-5" />
                <span>AI Analysis</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;
