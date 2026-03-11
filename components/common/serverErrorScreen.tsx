import React from "react";

const ServerErrorScreen = ({ error }: { error: any }) => {
  return (
    <div className="min-h-screen p-6 flex  pt-40 sm:pt-20">
      <div className="flex flex-col items-center justify-center text-black w-full gap-4">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-2xl capitalize">{`${error?.response?.data?.message || error?.message}`}</p>
      </div>
    </div>
  );
};

export default ServerErrorScreen;
