import axios from "axios";

const URL =
  "https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess";


export const ytSongApi = async (videoUrl) => {


  try {
    const { data } = await axios.get(URL, {
      params: {
        url: videoUrl,
        format: "mp3",
        responseFormat: "json",
        lang: "en",
        regenerate: "true",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_YT_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "t-one-youtube-converter.p.rapidapi.com",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    alert("😥 Sorry, Daily Limit is over, please try after sometime! | ( Daily download limit is 50 )");
  }
};
