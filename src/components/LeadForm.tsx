// src/components/LeadForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeadForm({ setLeadCreated }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [pincode, setPincode] = useState("");
  const [pan, setPan] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // Use Next.js router for redirect
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const token = localStorage.getItem("clerk-db-jwt");
    if (!token) {
      setError("Please login to create a lead.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/v1/leads/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          dob,
          pincode,
          pan,
          gender,
          phoneNumber,
        }),
      });

      if (!res.ok) throw new Error("Failed to create lead");

      setSuccessMessage("Lead created successfully!");

      // Reset form fields after success
      setFirstName("");
      setLastName("");
      setDob("");
      setPincode("");
      setPan("");
      setGender("");
      setPhoneNumber("");

      // Update parent state to show LeadList
      setLeadCreated(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Create Lead</h2>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="my-2">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="my-2">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="my-2">
        <input
          type="text"
          placeholder="PAN"
          value={pan}
          onChange={(e) => setPan(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="my-2">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
      >
        Create Lead
      </button>
    </form>
  );
}



