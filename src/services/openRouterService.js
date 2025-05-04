import dotenv from "dotenv";

dotenv.config();

const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export const openRouterService = async (input) => {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        model: "qwen/qwen3-30b-a3b:free",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.error}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching OpenRouter feedback:", error.message);
    throw new Error("Gagal mendapatkan feedback dari OpenRouter.");
  }
};
