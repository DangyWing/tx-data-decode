export interface OpenchainResponse {
  ok: boolean;
  result: Result;
  error?: string;
}

export interface Result {
  event: Event;
  function: { [key: string]: FunctionDetails[] };
}
export type FunctionDetails = {
  name: string;
  filtered: boolean;
};

export async function fetchSignatureFromApi(signature: string) {
  const response = await fetch(
    `https://api.openchain.xyz/signature-database/v1/lookup?filter=false&function=${signature}`
  );

  const json = (await response.json()) as OpenchainResponse;

  if (json.ok === false) {
    throw new Error(json.error);
  }

  return json.result;
}
