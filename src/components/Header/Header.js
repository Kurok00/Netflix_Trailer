import Styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={Styles.header}>
      <img
        // src={process.env.PUBLIC_URL + "/movie-image-no-background.png"}
        src={process.env.PUBLIC_URL + "/netflix-symbol-black.png"}
        alt="movieImage"
        className={Styles.movieImage}
      />
      <span className={Styles.title} onClick={() => window.scroll(0, 0)}>
        NetFlix-Trailer
      </span>
    </div>
  );
};

export default Header;
