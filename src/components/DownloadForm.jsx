import "./DownloadForm.css";
import { FaPaste } from "react-icons/fa";
export const DownloadForm = ({ inputValue, inputF, goButtonF, pasteBtnF }) => {
  return (
    <div className="downloadForm">
      <div className="inputSection">
        <input
          className="inputField"
          type="text"
          onChange={inputF}
          value={inputValue}
          placeholder="Enter youtube video URL.."
        />
        <button className="pasteBtn" onClick={pasteBtnF}>
          <FaPaste />
          PASTE
        </button>
      </div>
      <button className="goBtn" onClick={goButtonF}>
        Go
      </button>
    </div>
  );
};
