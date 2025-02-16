import CustomerTable from "@/components/features/customers/CustomerTable";
import Header from "@/components/layout/Header";
import React from "react";
import { getCustomers } from "./action";
import Banner from "@/components/layout/Banner";

async function Page() {
  const customers = await getCustomers();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 p-6 gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <CustomerTable customers={customers.customers} />
        </div>

        <div className="w-[300px]">
          <Banner />
        </div>
      </div>
    </div>
  );
}

export default Page;
