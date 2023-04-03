import React from "react";
import { fetchSignatureFromApi } from "~/utils/fetchSignatureFromApi";

export const SigDecodeResult = async ({
  signature,
}: {
  signature?: string;
}) => {
  if (!signature) return null;

  const sigResult = await fetchSignatureFromApi(signature);

  console.log(sigResult.function);

  return <div>It Worked</div>;
  // return <p>{sigResult.}</p>;

  // return sigResult.function.map((sig, index) => (
  //   <div key={index}>{sig.name}</div>
  // ));
};
