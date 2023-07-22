import './App.css';
import Banner from './Components/Banner/Banner';
import Nav from './Components/Nav/Nav';
import Rows from './Components/Rows/Rows';
import requests from './requests';


function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />

      <Rows
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLarge={true}
      />
      <Rows
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
        isLarge={false}
      />

      <Rows
        title="Top Rated"
        fetchUrl={requests.fetchTopRatedMovies}
        isLarge={false}
      />
      <Rows
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        isLarge={false}
      />
      <Rows
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        isLarge={false}
      />
      <Rows
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        isLarge={false}
      />
      <Rows
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        isLarge={false}
      />
      <Rows
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
        isLarge={false}
      />
    </div>
  );
}

export default App;
