"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreVerticalIcon } from "lucide-react"

const assessmentData = [
  {
    region: "Meulaboh Basin A-2",
    coordinates: "4.1481° N, 96.1292° E",
    confidence: 93.2,
    status: "RAWAN",
    timestamp: "10 mins ago",
  },
  {
    region: "Banda Aceh Coastal Zone",
    coordinates: "5.5483° N, 95.3237° E",
    confidence: 94.5,
    status: "TIDAK RAWAN",
    timestamp: "24 mins ago",
  },
  {
    region: "Lhokseumawe North District",
    coordinates: "5.1881° N, 97.1507° E",
    confidence: 89.1,
    status: "TIDAK RAWAN",
    timestamp: "1 hr ago",
  },
]

export function PredictiveAssessmentsTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-6">
        <h3 className="text-[12px] font-bold uppercase tracking-widest text-primary">Latest Predictive Assessments</h3>
        <button className="text-[11px] font-bold text-primary hover:underline">View All History</button>
      </div>
      <div className="rounded-lg border bg-card/50 overflow-hidden mx-4 lg:mx-6">
        <Table>
          <TableHeader className="bg-muted/50 border-b">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-10 text-[10px] font-black uppercase tracking-wider">Region Name</TableHead>
              <TableHead className="h-10 text-[10px] font-black uppercase tracking-wider text-center">Coordinates</TableHead>
              <TableHead className="h-10 text-[10px] font-black uppercase tracking-wider text-center">Confidence Score</TableHead>
              <TableHead className="h-10 text-[10px] font-black uppercase tracking-wider text-center">Flood Status</TableHead>
              <TableHead className="h-10 text-[10px] font-black uppercase tracking-wider text-center">Timestamp</TableHead>
              <TableHead className="h-10 w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessmentData.map((item, index) => (
              <TableRow key={index} className="group hover:bg-muted/30">
                <TableCell className="py-4 font-bold text-sm text-primary">{item.region}</TableCell>
                <TableCell className="py-4 text-xs text-muted-foreground font-mono text-center">{item.coordinates}</TableCell>
                <TableCell className="py-4 text-center">
                    <div className="flex flex-col items-center gap-1.5 min-w-[120px]">
                        <span className="text-[11px] font-bold">{item.confidence}%</span>
                        <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${item.confidence}%` }} />
                        </div>
                    </div>
                </TableCell>
                <TableCell className="py-4 text-center">
                  <Badge 
                    variant="outline" 
                    className={`rounded-sm px-2 py-0.5 text-[9px] font-black border-none ${
                      item.status === 'RAWAN' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-[11px] text-muted-foreground text-center font-medium">{item.timestamp}</TableCell>
                <TableCell className="py-4 text-center">
                    <button className="p-1 hover:bg-muted rounded text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVerticalIcon className="size-4" />
                    </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
