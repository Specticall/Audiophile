import { products } from "../data/data";
import { ENV } from "../helper/config";

const API_URL = "http://localhost:9000";
const RESPONSE_DELAY_MILLISECONDS = 1000;

export const wait = async (timeMSeconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeMSeconds);
  });
};

const fetchFromServer = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();

    // Purposefully simulate bad connection
    await wait(RESPONSE_DELAY_MILLISECONDS);

    if (!response.ok)
      throw new Error("Something went wrong while fetching the data");

    return data;
  } catch (err) {
    if (err instanceof Error) return err.message;
  }
};

const fetchManual = async () => {
  const data = products;

  await wait(1000);

  return data;
};

export const fetchProducts =
  ENV === "development" ? fetchFromServer : fetchManual;
