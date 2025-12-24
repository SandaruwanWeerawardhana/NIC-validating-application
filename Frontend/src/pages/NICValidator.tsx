import { useState, useEffect } from "react";
import { type NICData } from "../utils/nicValidation";
import { useNicStore } from "../store/nicStore";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Search, RotateCcw, CheckCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

export const NICValidator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<NICData | null>(null);

  const { validateNic, loading, error, successMessage, clearMessages } =
    useNicStore();

  useEffect(() => {
    if (error) {
      toast.error("Enter a valid NIC number");
      clearMessages();
    }
    if (successMessage) {
      toast.success(successMessage);
      clearMessages();
    }
  }, [error, successMessage, clearMessages]);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null); 

    if (!input.trim()) {
      toast.error("Please enter a NIC number"); 
      return;
    }

    try {
      const data = await validateNic(input.trim());
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    clearMessages();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-enter">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Check ID</h2>
          <p className="text-slate-400">
            Validate Sri Lankan Identity Cards instantly
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Input Details" className="h-fit">
          <form onSubmit={handleValidate} className="space-y-6">
            <Input
              label="NIC Number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 853400512V or 198534000512"
              error={error ?? undefined}
              className="text-lg tracking-wide"
            />
            <div className="flex gap-4 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 gap-2 shadow-blue-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Validating...
                  </>
                ) : (
                  <>
                    <Search size={18} /> Validate
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw size={18} /> Reset
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-6">
          {result?.isValid ? (
            <Card className="bg-emerald-900/10 border-emerald-500/20 relative overflow-hidden stagger-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>

              <div className="flex items-center gap-4 mb-8 text-emerald-400 border-b border-emerald-500/10 pb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <CheckCircle className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Valid NIC Number
                  </h3>
                  <p className="text-xs text-emerald-400/70">
                    Verified by algorithm
                  </p>
                </div>
              </div>

              <dl className="space-y-5 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <dt className="text-sm font-medium text-slate-400">
                    NIC Format
                  </dt>
                  <dd className="text-sm font-bold text-white capitalize">
                    {result.type} Format
                  </dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <dt className="text-sm font-medium text-slate-400">
                    Date of Birth
                  </dt>
                  <dd className="text-sm font-bold text-white">
                    {result.birthDate
                      ? format(result.birthDate, "MMMM do, yyyy")
                      : "-"}
                  </dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <dt className="text-sm font-medium text-slate-400">Gender</dt>
                  <dd className="text-sm font-bold text-white flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        result.gender === "Male" ? "bg-blue-400" : "bg-pink-400"
                      }`}
                    ></span>
                    {result.gender}
                  </dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <dt className="text-sm font-medium text-slate-400">Age</dt>
                  <dd className="text-sm font-bold text-white">
                    {result.age} Years Old
                  </dd>
                </div>
              </dl>
            </Card>
          ) : (
            <Card className="flex items-center justify-center min-h-[350px] border-dashed border-2 border-slate-700/50 bg-transparent opacity-70">
              <div className="text-center text-slate-500">
                <div className="mx-auto w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center mb-4 ring-1 ring-white/5">
                  <Search size={28} className="opacity-50" />
                </div>
                <p>Enter an NIC number to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default NICValidator;
