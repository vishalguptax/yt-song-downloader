import axios from "axios";
const URL = "https://youtube-search-and-download.p.rapidapi.com/trending";

export const ytTrendApi = async (countryCode) => {
  try {
    const { data } = await axios.get(URL, {
      params: { type: "mu", hl: "en", gl: countryCode },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_YT_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
