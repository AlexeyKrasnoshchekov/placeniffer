import React, { useEffect, useRef, useContext } from "react";
import "./Home.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import BusinessList from "../../components/BusinessList/BusinessList";
import context from "../../context/context";

export default function Home() {
  const { error, term, location, page, setPage, getPlaces, places } = useContext(context);
  const initialRender = useRef(true);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    getPlaces();
  }, [page]);

  return (
    <div className="HomePage">
      <h1>placeniffer</h1>
      <SearchBar />
      <div className="homepage-info">
        <div>
          {places.length > 0 && (
            <p>
              {`Result for: ${term} in `}
              <span
                style={{ textTransform: "capitalize" }}
              >{`${location}`}</span>
            </p>
          )}
        </div>
      </div>
      {places.length > 0 && <BusinessList places={places} />}

      {places.length > 0 && (
        <div className="pagination">
          <div style={{ cursor: "pointer" }} onClick={handleNextPage}>
            Load more...
          </div>
        </div>
      )}

      <div className="homepage-info">
        {error !== "" && places.length === 0 && <div>{error}</div>}
      </div>
    </div>
  );
}
