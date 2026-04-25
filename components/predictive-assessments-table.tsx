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
import { MoreVertical, Info } from "lucide-react"

const assessmentData = [
  {
    region: "Meulaboh Basin A-2",
    coordinates: "4.1481° N, 96.1283° E",
    confidence: 98.2,
    status: "RAWAN",
    timestamp: "10 mins ago",
  },
  {
    region: "Banda Aceh Coastal Zone",
    coordinates: "5.5483° N, 95.3238° E",
    confidence: 94.5,
    status: "TIDAK RAWAN",
    timestamp: "24 mins ago",
  },
  {
    region: "Lhokseumawe North District",
    coordinates: "5.1801° N, 97.1507° E",
    confidence: 89.1,
    status: "TIDAK RAWAN",
    timestamp: "1 hr ago",
  },
]

export function PredictiveAssessmentsTable() {
  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden mx-6 lg:mx-8 shadow-sm">
      <div className="px-8 py-6 border-b border-surface-container/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <h3 className="text-sm font-black text-primary uppercase tracking-[0.15em]">Latest Predictive Assessments</h3>
            <Info className="size-4 text-on-surface-variant/40" />
        </div>
        <button className="text-[11px] font-black text-primary hover:underline uppercase tracking-widest">View All History</button>
      </div>
      <div className="overflow-x-auto">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow className="bg-surface-container-low border-none hover:bg-surface-container-low">
              <TableHead className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Region Name</TableHead>
              <TableHead className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Coordinates</TableHead>
              <TableHead className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Confidence Score</TableHead>
              <TableHead className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Flood Status</TableHead>
              <TableHead className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Timestamp</TableHead>
              <TableHead className="px-8 py-5 w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-surface-container-low">
            {assessmentData.map((item, index) => (
              <TableRow 
                key={index} 
                className="hover:bg-surface-container-low/30 transition-colors border-none group"
              >
                <TableCell className="px-8 py-5 text-sm font-bold text-on-surface">{item.region}</TableCell>
                <TableCell className="px-8 py-5 text-xs font-medium font-mono text-on-surface-variant/70">{item.coordinates}</TableCell>
                <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-3 min-w-[120px]">
                        <span className="text-xs font-black text-primary">{item.confidence}%</span>
                        <div className="h-1.5 flex-1 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${item.confidence}%` }} />
                        </div>
                    </div>
                </TableCell>
                <TableCell className="px-8 py-5">
                  <Badge 
                    className={`rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-wider border-none shadow-none ${
                      item.status === 'RAWAN' 
                      ? 'bg-error-container text-on-error-container' 
                      : 'bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-8 py-5 text-xs font-medium text-on-surface-variant opacity-60">{item.timestamp}</TableCell>
                <TableCell className="px-8 py-5 text-right">
                    <button className="text-on-surface-variant/40 hover:text-primary transition-colors">
                        <MoreVertical className="size-5" />
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

