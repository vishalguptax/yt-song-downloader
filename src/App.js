import { useEffect, useState } from "react";
import { DownloadForm, Footer, Navbar, SongCard } from "./components";
import "./App.css";
import { ytSongApi, ytTrendApi, randomQuote } from "./api";
import axios from "axios";

function App() {
  const [inputData, setInputData] = useState("");

  const [videoUrl, setVideoUrl] = useState("");

  const [videoData, setVideoData] = useState([]);

  const [trend, setTrend] = useState([]);

  const [quote, setQuote] = useState("");

  // Accessing user's country using ipAPI
  const [countryCode, setCountryCode] = useState("");

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setCountryCode(data?.country_code);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getGeoInfo();
  }, []);

  //-------------------------------------------------

  // Truncating the trending video thumbnail url
  var thumbString = `${trend?.thumbnails?.[1]?.url}`;
  var shortThumbUrl = thumbString.substring(0, 48);
  const altImg = (shortThumbUrl || "").replace(/hqdefault/g, "default");
  //-----------------------------------------------

  // Modifying the user's video thumbnail url to render better quality image
  let str = videoData?.thumbUrl || altImg;
  let stringToAdd = "sd";

  // Creating a function to add text in the middle of a string
  function addStr(str, index, stringToAdd) {
    return (
      str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
  }
  //--------------------------------------------------

  // Modifying the user's videeo length string to short text
  var durString = `${videoData?.durata_video}`;
  var shortDur = durString.replace(/\D/g, "");
  shortDur = `${addStr(shortDur, 1, ":")} minutes`;
  //------------------------------------------

  const songTitle = videoData?.titolo ? videoData.titolo : trend?.title;

  const songImg = addStr(str, 35, stringToAdd);

  const songUrl = videoData?.urlMp3;

  const songDur = videoData?.durata_video
    ? shortDur
    : `${trend?.lengthText} minutes`;

  // Using replace () to replace text on trending video's view count
  const songViews = videoData?.contatore_visualizzazioni
    ? videoData?.contatore_visualizzazioni
    : ((trend?.viewCountText || "").replace(/views/g, "") || "").replace(
        /,/g,
        ""
      );
  //-----------------------------------------------

  // Receiving data from Trending video api and setting it to the trend array
  useEffect(() => {
    ytTrendApi(countryCode).then((data) => {
      setTrend(data?.contents?.[0]?.video);
    });
  }, [countryCode]);
  //---------------------------------------------

  // Receiving data from song api and setting it to the videodata array
  useEffect(() => {
    ytSongApi(videoUrl).then((data) => {
      setVideoData(data.YoutubeAPI);
    });
  }, [videoUrl]);
  // -----------------------------------------------
  useEffect(() => {
    randomQuote().then((data) => {
      setQuote(data?.content);
    });
  }, []);
  // Taking user's input url from input element and setting it's value to the inputData
  const handleChange = (e) => {
    setInputData(e.target.value);
  };
  //--------------------------------------------

  // When Go button clicks, setting the value of videoUrl received from user's input value
  let trendingVideoUrl = trend?.videoId;
  trendingVideoUrl = `https://www.youtube.com/watch?v=${trendingVideoUrl}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setVideoUrl(inputData ? inputData : trendingVideoUrl);
  };
  //---------------------------------------

  // Function for paste button to receive user's clipboard text
  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setInputData(text);
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
      });
  };
  //---------------------------------------

  return (
    <>
      <Navbar />
      <DownloadForm
        inputValue={inputData}
        inputF={handleChange}
        goButtonF={handleSubmit}
        pasteBtnF={handlePaste}
      />
      <SongCard
        title={songTitle?songTitle:quote}
        imgSrc={songImg}
        views={songViews}
        duration={songDur}
        downloadLink={songUrl}
      />
      <Footer />
    </>
  );
}

export default App;
