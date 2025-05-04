export const cleanCode = (input) => {
  try {
    if (typeof input !== "string" || input.trim() === "") {
      console.error("Invalid or empty input for cleanCode.");
      return "";
    }

    let cleanedCode = input
      .replace(/\n/g, " ")
      .replace(/\t/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return cleanedCode;
  } catch (error) {
    console.error("Error cleaning code:", error.message);
    return "";
  }
};
