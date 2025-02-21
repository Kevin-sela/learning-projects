"use client";

import Table from "../app/components/Table";

export default function Page() {
  return (
    <div className="container px-4 py-8 mx-auto min-h-screen bg-[url('/pictures/51380.jpg')] bg-cover bg-center bg-no-repeat">

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text animate-gradient-x">
          CRUD
        </h1>
      </div>

      <div className="container mx-auto p-4">

        <Table />
      </div>
    </div>
  );
}
