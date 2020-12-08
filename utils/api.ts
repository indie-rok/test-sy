import { serverUrl } from "../config";

export const fetchProfit = async (bankFee: string) => {
  try {
    const res = await fetch(`${serverUrl}/reports?bank_fee=${bankFee}`);
    const rows = await res.json();
    return rows;
  } catch (err) {
    throw err;
  }
};
