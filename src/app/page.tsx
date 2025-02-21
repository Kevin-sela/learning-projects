"use client";

import Table from "./components/Table";





export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">CRUD Application</h1>
      </div>


      <Table />
    </div>

  );
}
