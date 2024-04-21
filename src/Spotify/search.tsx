import * as client from "./client"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import TrackCarousel from "../Tracks/TrackCarousel";
import "./index.css";

export default function SpotifySearch() {
  const {query} = useParams<{ query: string }>();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [result, setResult] = useState<any>({});

  const searchSpotify = async (query: string) => {
    const result = await client.searchTracks(query);
    console.log(result);
    setResult(result);
    navigate(`/Tune/Track/Search/${query}`);
  };

  useEffect(() => {
    if (query) {
      setSearch(query);
      searchSpotify(query);
    }

    if (!query) {
      setSearch("")
      setResult({});
    }
  }, [query]);

  return (
      <div className="container justify-content-center py-4">
        {
          !query ? (
                  <div className="d-flex flex-column fill-div justify-content-center align-items-center">
                    <h1 className="mb-4">Search for a Track</h1>
                    <div className="d-flex w-75">
                      <input
                          className="form-control"
                          type="text"
                          placeholder="Search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                      />
                      <button className="btn btn-success mx-1" type="submit" onClick={() => searchSpotify(search)}>
                        Search
                      </button>
                    </div>
                  </div>
            ) :
              <>
                <h2>Search for a Track</h2>
                <div className="d-flex w-100">
                  <input
                      className="form-control"
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="btn btn-success mx-1" type="submit" onClick={() => searchSpotify(search)}>
                    Search
                  </button>
                </div>
              </>
        }
        {
          query &&
            result.total === 0 && (
                <>
                  <h1 className="pt-5 text-center">No Tracks Found. Please search again!</h1>
                </>
            )
        }
        {result &&
            result.total > 0 && (
                <>
                  <h2 className="pt-4">Tracks</h2>
                  <TrackCarousel tracks={result.tracks} color='success'/>
                </>
            )}
      </div>
  );


}