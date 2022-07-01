import axios from "axios";
const URL = "https://youtube-search-and-download.p.rapidapi.com/trending";

export const ytTrendApi = async ()=>{
    try {
const { data } = await axios.get(URL, {
  params: { type: "mu", hl: "en", gl: "IN" },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_YTTREND_API_KEY,
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
});
return data;
    }
    catch(err) {
console.log(err)
    }
}