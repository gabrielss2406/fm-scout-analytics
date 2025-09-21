import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Download, Star, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlayerFilters } from "@/components/players/PlayerFilters";

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
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<any>({});

  const filteredPlayers = mockPlayers.filter(player => {
    const searchMatch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.club.toLowerCase().includes(searchTerm.toLowerCase());
    
    const positionMatch = !filters.position || player.position === filters.position;
    const ageMatch = !filters.ageRange || (player.age >= filters.ageRange[0] && player.age <= filters.ageRange[1]);
    const overallMatch = !filters.overallRange || (player.overall >= filters.overallRange[0] && player.overall <= filters.overallRange[1]);
    
    return searchMatch && positionMatch && ageMatch && overallMatch;
  });

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "text-success";
    if (score >= 7.0) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filters Sidebar */}
      {showFilters && (
        <div className="lg:col-span-1">
          <PlayerFilters onFiltersChange={setFilters} />
        </div>
      )}

      {/* Main Content */}
      <div className={cn("lg:col-span-3", !showFilters && "lg:col-span-4")}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Player Analysis
                <Badge variant="secondary" className="ml-2">
                  {filteredPlayers.length} players
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? "bg-primary text-primary-foreground" : ""}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Player
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>Overall</TableHead>
                  <TableHead>Potential</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Moneyball Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player.id} className="cursor-pointer">
                    <TableCell>
                      <div className="font-medium">{player.name}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {player.position}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{player.age}</TableCell>
                    <TableCell className="text-muted-foreground">{player.club}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={player.overall} className="w-12 h-2" />
                        <span className="text-sm font-medium">{player.overall}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={player.potential} className="w-12 h-2" />
                        <span className="text-sm font-medium">{player.potential}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{player.value}</TableCell>
                    <TableCell>
                      <span className={cn("text-lg font-bold", getScoreColor(player.moneyballScore))}>
                        {player.moneyballScore}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}