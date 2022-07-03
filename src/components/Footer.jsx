import "./Footer.css";
import { FaGithub } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer>
      <p className="note">*Please note, this app can download only 50 songs per day, if you can't download please try after sometime*</p>
      <p>
        © {new Date().getFullYear()} YT Song Downloader | Source Code :{" "}
        <a
          className="gitLink"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/vishalguptax/yt-song-downloader"
        >
          GitHub <FaGithub style={{ marginLeft: "5px" }} />
        </a>
      </p>
    </footer>
  );
};
