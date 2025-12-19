import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { useNicStore } from '../store/nicStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FileDown, Loader2 } from 'lucide-react';

const Reports = () => {
    const records = useNicStore((state) => state.records);
    const [loading, setLoading] = useState(false);

    const generatePDF = () => {
        setLoading(true);
        // Simulate async delay
        setTimeout(() => {
            const doc = new jsPDF();

            doc.setFontSize(20);
            doc.text("NIC Validation Report", 14, 22);
            doc.setFontSize(10);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

            const tableData = records.map(rec => [
                rec.originalNic || '-',
                rec.type?.toUpperCase() || '-',
                rec.birthDate ? format(rec.birthDate, 'yyyy-MM-dd') : '-',
                rec.gender || '-',
                rec.age?.toString() || '-'
            ]);

            autoTable(doc, {
                head: [['NIC Number', 'Type', 'Date of Birth', 'Gender', 'Age']],
                body: tableData,
                startY: 40,
                theme: 'grid',
                styles: { fontSize: 8 },
                headStyles: { fillColor: [66, 133, 244] }
            });

            doc.save(`nic-report-${Date.now()}.pdf`);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-enter">
            <header>
                <h2 className="text-3xl font-bold text-white mb-2">Reports</h2>
                <p className="text-slate-400">Export validation history and data</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Summary Report" className="relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/10"></div>
                    <div className="relative z-10 flex flex-col gap-6">
                        <p className="text-slate-300">
                            Download a comprehensive PDF report of all validated NIC records in the current session.
                        </p>
                        <div className="bg-slate-900/40 rounded-xl p-5 text-sm border border-white/5">
                            <span className="block font-medium text-slate-200 mb-2">Includes:</span>
                            <ul className="list-disc list-inside space-y-1 text-slate-400">
                                <li>Validated NIC Numbers</li>
                                <li>Demographic Data (Age, Gender)</li>
                                <li>Validation Timestamps</li>
                            </ul>
                        </div>
                        <div className="mt-2">
                            <Button
                                onClick={generatePDF}
                                disabled={loading || records.length === 0}
                                className="w-full sm:w-auto gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <FileDown size={18} />}
                                {loading ? 'Generating...' : 'Download PDF Report'}
                            </Button>
                        </div>
                    </div>
                </Card>

                <Card title="Export Data" className="opacity-75">
                    <div className="flex flex-col gap-6">
                        <p className="text-slate-300">
                            Export raw data to Excel/CSV for external analysis.
                        </p>
                        <div className="bg-yellow-900/20 text-yellow-500 border border-yellow-500/20 rounded-xl p-4 text-sm flex items-center justify-center">
                            Coming soon in v1.1
                        </div>
                        <Button disabled variant="secondary" className="w-full sm:w-auto gap-2 opacity-50 cursor-not-allowed">
                            <FileDown size={18} /> Export Excel
                        </Button>
                    </div>
                </Card>
            </div>

            <Card title="Preview Data" className="stagger-1">
                <div className="max-h-[400px] overflow-auto">
                    {records.length === 0 ? (
                        <div className="text-center py-12 text-slate-600">
                            No data available for reports. Validate some NICs first.
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left text-slate-300">
                            <thead className="bg-slate-900/50 text-slate-400 sticky top-0 backdrop-blur-md">
                                <tr>
                                    <th className="px-4 py-3">NIC</th>
                                    <th className="px-4 py-3">DOB</th>
                                    <th className="px-4 py-3">Gender</th>
                                    <th className="px-4 py-3">Age</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {records.map((r, i) => (
                                    <tr key={i} className="hover:bg-white/5">
                                        <td className="px-4 py-2 font-mono text-white">{r.originalNic}</td>
                                        <td className="px-4 py-2">{r.birthDate ? format(r.birthDate, 'yyyy-MM-dd') : '-'}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-0.5 rounded text-xs ${r.gender === 'Male' ? 'bg-blue-500/20 text-blue-300' : 'bg-pink-500/20 text-pink-300'}`}>
                                                {r.gender}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">{r.age}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>

        </div>
    );
};

export default Reports;
