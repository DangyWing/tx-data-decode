import { type NextPage } from "next";
import Head from "next/head";
import { fetchSignatureFromApi } from "~/utils/fetchSignatureFromApi";
import React, { useEffect, useState } from "react";
import type { FunctionDetails } from "~/utils/fetchSignatureFromApi";

const Home: NextPage = () => {
  const [sigResult, setSigResult] = useState<FunctionDetails[] | undefined>(
    undefined
  );
  const [txData, setTxData] = useState<string | undefined>(undefined);

  function splitTxData(txData?: string) {
    if (!txData) return { methodSignature: "", params: [] };
    const methodSignature = txData.slice(0, 10);
    const params = txData.slice(10).match(/.{1,64}/g);
    return { methodSignature, params };
  }

  const { methodSignature, params } = splitTxData(txData);

  useEffect(() => {
    const getTxMethod = async () => {
      const sigResult = await fetchSignatureFromApi(methodSignature);
      const res = sigResult.function[methodSignature];
      if (res) {
        setSigResult(res);
      }
    };
    void getTxMethod();
  }, [methodSignature]);

  return (
    <>
      <Head>
        <title>Tx Data Decode</title>
        <meta name="description" content="Tx Data Decoder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] font-mono text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <input
            type="text"
            className="border border-slate-500 bg-transparent p-2"
            placeholder="0x..."
            onChange={(e) => {
              setTxData(e.target.value);
            }}
          />
          {txData && (
            <div className="text-white">Signature: {methodSignature}</div>
          )}
          <div>
            {sigResult?.map((sig, index) => (
              <div key={index}>{sig.name}</div>
            ))}
          </div>
          <div>
            {params?.map((param, index) => (
              <div key={index}>{param}</div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
