import "./Navbar.css";
export const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <span className="logoIcon">YT</span> Song Downloader
      </h1>
      <p className="credits">
        / by{" "}
        <a
          className="creditLink"
          target="_blank"
          rel="noreferrer"
          href="https://g.dev/vishalgupta"
        >
          Vishal
        </a>
      </p>
    </nav>
  );
};
