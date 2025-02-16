import React from "react";

const Banner = () => {
  return (
    <div className="w-full max-w-sm space-y-6 flex flex-col h-full">
      {/* Analytics Banner */}
      <div className="bg-indigo-600 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between flex-1 relative overflow-hidden">
        <p className="text-lg font-semibold leading-tight">
          See analytics of the <br /> Customer Clearly
        </p>
        <button className="mt-4 bg-white text-indigo-600 font-medium px-4 py-2 w-full rounded-lg transition hover:bg-gray-100">
          See Analytics
        </button>
        <div className="absolute bottom-2 right-2 opacity-20">
          <img src="/analytics-pattern.svg" alt="Pattern" className="w-16" />
        </div>
      </div>

      {/* Top Menu Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col flex-1 relative">
        <p className="text-lg font-bold">Top Menu</p>
        <p className="text-orange-500 font-semibold text-lg">This Week</p>
        <p className="text-gray-500 text-sm mt-1">10 - 12 Agustus 2023</p>

        <div className="mt-4 space-y-3 flex-1">
          <div className="bg-gray-100 p-3 rounded-lg font-medium relative">
            Nasi Goreng Jamur Special Resto Pak Min
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
              1
            </span>
          </div>
          <p className="text-gray-500">2. Tongseng Sapi Gurih</p>
          <p className="text-gray-500">3. Nasi Gudeg Telur Ceker</p>
          <p className="text-gray-500">4. Nasi Ayam Serundeng</p>
          <p className="text-gray-500">5. Nasi Goreng Seafood</p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[80px] bg-no-repeat bg-bottom bg-cover"
          style={{ backgroundImage: "url('/vector.png')" }}
        />
      </div>
    </div>
  );
};

export default Banner;
