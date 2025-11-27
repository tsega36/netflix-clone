import Row from "../Row/Row";
import requests from "../../../utils/requests";

function RowList() {
  return (
    <>
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLarge />
      <Row title="Top Rated Movies " fetchUrl={requests.fetchTopRatedMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </>
  );
}

export default RowList;


