// src/app/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import LeadForm from './LeadForm';

interface Lead {
  firstName: string;
  lastName: string;
  dob: string;
  pincode: string;
  pan: string;
  gender: string;
  phoneNumber: string;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("clerk-db-jwt");
    if (!token) {
      setError("Please login to view leads.");
      return;
    }

    const fetchLeads = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/leads", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch leads");

        const data = await res.json();
        setLeads(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <LeadForm />
      <h2 className="text-xl mt-4">Leads List</h2>
      <table className="table-auto w-full mt-4 border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">DOB</th>
            <th className="border p-2">Pincode</th>
            <th className="border p-2">PAN</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
              <td className="border p-2">{lead.firstName}</td>
              <td className="border p-2">{lead.lastName}</td>
              <td className="border p-2">{lead.dob}</td>
              <td className="border p-2">{lead.pincode}</td>
              <td className="border p-2">{lead.pan}</td>
              <td className="border p-2">{lead.gender}</td>
              <td className="border p-2">{lead.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
