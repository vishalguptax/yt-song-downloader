import "./SongCard.css";

import { FaDownload } from "react-icons/fa";

import millify from "millify";

export const SongCard = ({ title, downloadLink, imgSrc, views, duration }) => {
  let totalViews = (views || "").replace(/\./g, "");

  const hits = millify(Number(totalViews));

  return (
    <div className="songCard">
      <div className="imgCard">
        <img className="thumb" src={imgSrc} alt="Daily Limit Over" />
      </div>
      <div className="download">
        <div className="metaData">
          <p className="title">"{title}"</p>
          <div className="details">
            <p>🔥 Hits : {hits}</p>
            <p>🕒 Duration : {duration}</p>
          </div>
        </div>

        <button className="downloadBtn">
          <a href={downloadLink} target="_blank" rel="noreferrer" download>
            <FaDownload style={{ marginRight: "16px" }} /> Download
          </a>
        </button>
      </div>
    </div>
  );
};
