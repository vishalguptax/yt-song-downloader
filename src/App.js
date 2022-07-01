import { useEffect, useState } from "react";
import { DownloadForm, Footer, Navbar, SongCard } from "./components";
import "./App.css";
import { ytSongApi, ytTrendApi } from "./api";

function App() {
  const [inputData, setInputData] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState([]);
  const [trend, setTrend] = useState([]);

  
  var myString = `${trend?.thumbnails?.[1]?.url}`;
  var shortUrl = myString.substring(0, 48);
  const altImg = (shortUrl || '').replace(/hqdefault/g,'default');

  let str = videoData?.thumbUrl || altImg;
  let stringToAdd = "mq";
  function addStr(str, index, stringToAdd) {
    return (
      str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
  }

  const songTitle = videoData?.titolo ? videoData.titolo : trend?.title;
  const songImg = addStr(str, 35, stringToAdd);
  const songUrl = videoData?.urlMp3;
  const songDur = videoData?.durata_video
    ? videoData.durata_video
    : `${trend?.lengthText} minutes`;
  const songViews = videoData?.contatore_visualizzazioni
    ? videoData?.contatore_visualizzazioni
    : (((trend?.viewCountText || '').replace(/views/g,''))||'').replace(/,/g,'');

  useEffect(() => {
    ytTrendApi().then((data) => {
      setTrend(data?.contents?.[0]?.video);
    });
  }, []);

  useEffect(() => {
    ytSongApi(videoUrl).then((data) => {
      setVideoData(data.YoutubeAPI);
    });
  }, [videoUrl]);

  const handleChange = (e) => {
    setInputData(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setVideoUrl(inputData);
  };

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
        title={songTitle}
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
