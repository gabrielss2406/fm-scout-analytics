import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Player {
  id: string;
  name: string;
  position: string;
  age: number;
  club: string;
  overall: number;
  potential: number;
  value: string;
  moneyballScore: number;
}

const mockPlayers: Player[] = [
  {
    id: "1",
    name: "Bruno Silva",
    position: "CM",
    age: 22,
    club: "Sporting CP",
    overall: 78,
    potential: 86,
    value: "€15M",
    moneyballScore: 8.4
  },
  {
    id: "2", 
    name: "João Santos",
    position: "RW",
    age: 20,
    club: "FC Porto",
    overall: 74,
    potential: 89,
    value: "€12M",
    moneyballScore: 9.1
  },
  {
    id: "3",
    name: "Pedro Costa", 
    position: "CB",
    age: 24,
    club: "Benfica",
    overall: 80,
    potential: 83,
    value: "€18M",
    moneyballScore: 7.2
  },
];

export function PlayersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const filteredPlayers = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.club.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "text-success";
    if (score >= 7.0) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Player Analysis
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Player</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Position</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Age</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Club</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Overall</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Potential</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Value</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Moneyball Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, index) => (
                <tr
                  key={player.id}
                  className={cn(
                    "border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer",
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  )}
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-foreground">{player.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className="text-xs">
                      {player.position}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{player.age}</td>
                  <td className="py-3 px-4 text-muted-foreground">{player.club}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary transition-all duration-300"
                          style={{ width: `${player.overall}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{player.overall}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-accent transition-all duration-300"
                          style={{ width: `${player.potential}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{player.potential}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-foreground">{player.value}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-lg font-bold", getScoreColor(player.moneyballScore))}>
                      {player.moneyballScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}