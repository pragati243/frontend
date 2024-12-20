"use client";

import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import LeadList from "@/components/LeadList";

export default function DashboardPage() {
  const [leadCreated, setLeadCreated] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Render LeadForm if lead not created, otherwise render LeadList */}
        {!leadCreated ? (
          <LeadForm setLeadCreated={setLeadCreated} />
        ) : (
          <LeadList />
        )}
      </div>
    </div>
  );
}
