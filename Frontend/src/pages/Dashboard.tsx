import { useEffect, useState } from "react";
import { useNicStore } from "../store/nicStore";
import { Card } from "../components/Card";
import { Users, User, UserCheck, FileDown, FileText, Loader2 } from "lucide-react";
import { RecentValidations } from "../components/RecentValidations";
import { Button } from "../components/Button";

const Dashboard = () => {
  const records = useNicStore((state) => state.records);
  const fetchRecords = useNicStore((state) => state.fetchRecords);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleDownloadPdf = async () => {
    setPdfLoading(true);
    try {
      const downloadPdfReport = useNicStore.getState().downloadPdfReport;
      await downloadPdfReport();
    } catch (err) {
      console.error("PDF download failed:", err);
      alert(err instanceof Error ? err.message : "Failed to download PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    setExcelLoading(true);
    try {
      const downloadExcelReport = useNicStore.getState().downloadExcelReport;
      await downloadExcelReport();
    } catch (err) {
      console.error("Excel download failed:", err);
      alert(err instanceof Error ? err.message : "Failed to download Excel");
    } finally {
      setExcelLoading(false);
    }
  };

  const total = records.length;
  const male = records.filter((r) => r.gender === "MALE").length;
  const female = records.filter((r) => r.gender === "FEMALE").length;

  const stats = [
    {
      label: "Total Validations",
      value: total,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Male Users",
      value: male,
      icon: User,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Female Users",
      value: female,
      icon: UserCheck,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
          <p className="text-slate-400">System overview and statistics</p>
        </div>
        <div className="flex items-center gap-5">
          <Button
            onClick={handleDownloadExcel}
            disabled={excelLoading}
            className="gap-2"
            size="sm"
          >
            {excelLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Downloading...
              </>
            ) : (
              <>
                <FileText size={16} /> Excel Report
              </>
            )}
          </Button>
          <Button
            onClick={handleDownloadPdf}
            disabled={pdfLoading}
            className="gap-2"
            size="sm"
          >
            {pdfLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Downloading...
              </>
            ) : (
              <>
                <FileDown size={16} /> PDF Report
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className={`p-0 stagger-${i + 1} flex-1`}>
              <div className="flex items-center gap-5">
                <div
                  className={`p-4 rounded-xl ${stat.bg} ring-1 ring-inset ring-white/5`}
                >
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold text-white mt-1 tracking-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <RecentValidations records={records} className="stagger-2" />
    </div>
  );
};

export default Dashboard;
