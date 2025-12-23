import React from "react";
import { Card } from "./Card";
import { format } from "date-fns";
import type { NICData } from "../utils/nicValidation";

interface RecentValidationsProps {
  records: NICData[];
  title?: string;
  maxRows?: number;
  className?: string;
}

export const RecentValidations: React.FC<RecentValidationsProps> = ({
  records,
  title = "Recent Validations",
  maxRows = 5,
  className,
}) => {
  const hasRecords = records && records.length > 0;

  return (
    <Card title={title} className={className}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-400 font-medium border-b border-white/5">
            <tr>
              <th className="px-4 py-4">NIC Number</th>
              <th className="px-4 py-4">Format</th>
              <th className="px-4 py-4">Date of Birth</th>
              <th className="px-4 py-4">Gender</th>
              <th className="px-4 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {hasRecords ? (
              records
                .slice(0, maxRows)
                .map((rec) => (
                  <tr key={rec.originalNic} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-white font-mono">
                      {rec.originalNic}
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-300">
                      {rec.type ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {rec.birthDate ? format(rec.birthDate, "yyyy-MM-dd") : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          rec.gender === "Male"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-pink-500/20 text-pink-300"
                        }`}
                      >
                        {rec.gender ?? "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-medium">Verified</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No recent validations
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
