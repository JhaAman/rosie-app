import axios from "axios";

const path = "insert api url here";

export const api = async (prompt: string): Promise<any> => {
  const res = await axios.post(path, {
    prompt: prompt,
  });

  return res;
};
