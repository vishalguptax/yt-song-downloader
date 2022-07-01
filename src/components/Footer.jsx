import "./Footer.css";
import { FaGithub } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer>
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
