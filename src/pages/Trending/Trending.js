import axios from "axios";
import { useState, useEffect } from "react";
import PageNumber from "../../components/PageNumber/PageNumber";
import SingleContent from "../../components/SingleContent/SingleContent";
import Style from "./Trending.module.css";

const Trending = () => {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=1612773dba4979088f60607d539b18c5&page=${page}`
        );
        setContents(data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTrending();
  }, [page]);

  return (
    <div>
      <h1 className="pageHeading">Trending</h1>

      <PageNumber setPage={setPage} pageNumber={page} numberOfPages={10} />

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className={Style.trending}>
          {contents.map((content) => (
            <SingleContent
              key={content.id}
              id={content.id}
              poster={content.poster_path}
              title={content.title || content.name}
              date={content.first_air_date || content.release_date}
              media_type={content.media_type}
              vote_average={content.vote_average}
            />
          ))}
        </div>
      )}

      <PageNumber setPage={setPage} pageNumber={page} numberOfPages={10} />
    </div>
  );
};

export default Trending;