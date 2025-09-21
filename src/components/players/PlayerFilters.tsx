import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";

interface PlayerFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export function PlayerFilters({ onFiltersChange }: PlayerFiltersProps) {
  const [filters, setFilters] = useState({
    position: "",
    ageRange: [18, 35],
    overallRange: [60, 100],
    potentialRange: [60, 100],
    moneyballScore: [0, 10]
  });

  const positions = ["GK", "CB", "LB", "RB", "DM", "CM", "AM", "LW", "RW", "ST"];

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      position: "",
      ageRange: [18, 35],
      overallRange: [60, 100],
      potentialRange: [60, 100],
      moneyballScore: [0, 10]
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Position Filter */}
        <div className="space-y-2">
          <Label>Position</Label>
          <Select value={filters.position} onValueChange={(value) => updateFilter("position", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All positions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All positions</SelectItem>
              {positions.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Age Range */}
        <div className="space-y-3">
          <Label>Age Range</Label>
          <div className="px-2">
            <Slider
              value={filters.ageRange}
              onValueChange={(value) => updateFilter("ageRange", value)}
              max={40}
              min={16}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{filters.ageRange[0]} years</span>
              <span>{filters.ageRange[1]} years</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Overall Rating */}
        <div className="space-y-3">
          <Label>Overall Rating</Label>
          <div className="px-2">
            <Slider
              value={filters.overallRange}
              onValueChange={(value) => updateFilter("overallRange", value)}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{filters.overallRange[0]}</span>
              <span>{filters.overallRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Potential Rating */}
        <div className="space-y-3">
          <Label>Potential Rating</Label>
          <div className="px-2">
            <Slider
              value={filters.potentialRange}
              onValueChange={(value) => updateFilter("potentialRange", value)}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{filters.potentialRange[0]}</span>
              <span>{filters.potentialRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Moneyball Score */}
        <div className="space-y-3">
          <Label>Moneyball Score</Label>
          <div className="px-2">
            <Slider
              value={filters.moneyballScore}
              onValueChange={(value) => updateFilter("moneyballScore", value)}
              max={10}
              min={0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{filters.moneyballScore[0].toFixed(1)}</span>
              <span>{filters.moneyballScore[1].toFixed(1)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Active Filters */}
        {(filters.position || 
          filters.ageRange[0] !== 18 || filters.ageRange[1] !== 35 ||
          filters.overallRange[0] !== 60 || filters.overallRange[1] !== 100) && (
          <div className="space-y-2">
            <Label>Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.position && (
                <Badge variant="secondary" className="gap-2">
                  Position: {filters.position}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFilter("position", "")}
                  />
                </Badge>
              )}
              {(filters.ageRange[0] !== 18 || filters.ageRange[1] !== 35) && (
                <Badge variant="secondary" className="gap-2">
                  Age: {filters.ageRange[0]}-{filters.ageRange[1]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFilter("ageRange", [18, 35])}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}