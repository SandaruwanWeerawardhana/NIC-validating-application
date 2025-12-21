import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInYears } from "date-fns";
import { useNicStore } from "../store/nicStore";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PlusCircle, Calendar, User, CreditCard } from "lucide-react";
import type { NICData } from "../utils/nicValidation";

const AddRecord = () => {
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [error, setError] = useState("");

  const addRecord = useNicStore((state) => state.addRecord);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nic || !dob) {
      setError("Please fill in all required fields");
      return;
    }

    const birthDate = new Date(dob);
    const age = differenceInYears(new Date(), birthDate);

    if (age < 0 || age > 120) {
      setError("Invalid date of birth");
      return;
    }

    let type: "old" | "new" = "new";
    if (nic.length === 10) type = "old";

    const newRecord: NICData = {
      isValid: true,
      type,
      gender,
      birthDate,
      age,
      originalNic: nic.toUpperCase(),
    };

    addRecord(newRecord);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-enter">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Add NIC Data</h2>
        <p className="text-slate-400">
          Manually add a verified record to the system
        </p>
      </header>

      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 md:col-span-2">
              <label htmlFor="nic" className="block text-sm font-medium text-slate-400 mb-1">
                NIC Number
              </label>
              <div className="relative">
                <CreditCard
                  className="absolute left-4 top-3.5 text-slate-500"
                  size={20}
                />
                <input
                  id="nic"
                  type="text"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  placeholder="Enter NIC Number"
                  className="w-full rounded-xl pl-12 pr-4 py-3 outline-none glass-input"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="dob" className="block text-sm font-medium text-slate-400 mb-1">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-3.5 text-slate-500"
                  size={20}
                />
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full rounded-xl pl-12 pr-4 py-3 outline-none glass-input"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="gender" className="block text-sm font-medium text-slate-400 mb-1">
                Gender
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-3.5 text-slate-500"
                  size={20}
                />
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value as "Male" | "Female")
                  }
                  className="w-full rounded-xl pl-12 pr-4 py-3 outline-none glass-input appearance-none"
                >
                  <option value="Male" className="bg-slate-800">
                    Male
                  </option>
                  <option value="Female" className="bg-slate-800">
                    Female
                  </option>
                </select>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <div className="pt-4 flex gap-4">
            <Button
              type="submit"
              className="flex-1 gap-2 shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
            >
              <PlusCircle size={20} /> Add Record
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/")}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddRecord;
