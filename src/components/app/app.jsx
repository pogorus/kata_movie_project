import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Flex, Spin } from 'antd';

import Header from '../header';
import SearchPanel from '../search-panel';
import MovieCardList from '../movie-card-list/';
import PaginationBar from '../pagination-bar';
import ErrorIndicator from '../error-indicator';
import OfflineIndicator from '../offline-indicator';
import { GenresProvider } from '../genres-context';
import MovieService from '../../services/movie-service';

import './app.css';

export default class App extends Component {
  movieService = new MovieService();

  componentDidMount() {
    this.createGuestSession();
    this.getMovies('return');
    this.getGenres();
  }

  state = {
    mainPage: 'search',
    sessionId: null,
    moviesData: [],
    genres: {},
    loading: true,
    error: false,
    searchData: 'return',
    totalResults: null,
    currentPage: 1,
    rating: {},
  };

  onMoviesLoaded = (movies) => {
    this.setState(() => {
      const newData = movies.results;
      return {
        moviesData: newData,
        loading: false,
        error: false,
        totalResults: movies.total_results,
        currentPage: movies.page,
      };
    });
  };

  getMovies(searchParam) {
    this.setState(() => {
      return {
        loading: true,
      };
    });

    this.movieService
      .getMovies(searchParam)
      .then((response) => {
        this.onMoviesLoaded(response);
      })
      .catch(this.onError);
  }

  onGenresLoaded = (genresData) => {
    this.setState(() => {
      const newData = Object.fromEntries(genresData.genres.map((n) => [n.id, n.name]));

      return {
        genres: newData,
      };
    });
  };

  getGenres() {
    this.movieService
      .getGenres()
      .then((response) => {
        this.onGenresLoaded(response);
      })
      .catch(this.onError);
  }

  onSessionCreated = (sessionData) => {
    this.setState(() => {
      return {
        sessionId: sessionData.guest_session_id,
      };
    });
  };

  createGuestSession() {
    this.movieService
      .createGuestSession()
      .then((response) => {
        this.onSessionCreated(response);
      })
      .catch(this.onError);
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  onInput = (query) => {
    this.getMovies(query);
    this.setState(() => {
      return {
        searchData: `${query}`,
      };
    });
  };

  onPageChange = (searchParam, page) => {
    this.setState(() => {
      return {
        loading: true,
      };
    });

    if (this.state.mainPage === 'search') {
      this.movieService
        .getPage(searchParam, page)
        .then((response) => {
          this.onMoviesLoaded(response);
        })
        .catch(this.onError);
    }

    if (this.state.mainPage === 'rated') {
      this.movieService
        .getRatedPage(this.state.sessionId, page)
        .then((response) => {
          this.onMoviesLoaded(response);
        })
        .catch(this.onError);
    }
  };

  onRate = (rate, id) => {
    this.setState(({ rating }) => {
      const newRating = { ...rating };
      newRating[id] = rate;
      return {
        rating: newRating,
      };
    });
    this.movieService.rateMovie(id, rate, this.state.sessionId);
  };

  onMainPageSwitch = (e) => {
    this.setState((state) => {
      const newData = { ...state };
      newData.mainPage = e;
      return newData;
    });
    if (e === 'rated') {
      this.setState(() => {
        return {
          loading: true,
        };
      });

      this.movieService
        .getRated(this.state.sessionId)
        .then((response) => {
          this.onMoviesLoaded(response);
        })
        .catch(this.onError);
    } else {
      this.getMovies(this.state.searchData);
    }
  };

  render() {
    const { loading, error, ...data } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const mainCOntent = hasData ? (
      <MainView
        data={data}
        onInput={this.onInput}
        onPageChange={this.onPageChange}
        onRate={this.onRate}
        onMainPageSwitch={this.onMainPageSwitch}
      />
    ) : null;

    return (
      <div className="main_background">
        <div className="main_content">
          <GenresProvider value={this.state.genres}>
            <Online>
              {errorMessage}
              {spinner}
              {mainCOntent}
            </Online>
            <Offline>
              <OfflineIndicator />
            </Offline>
          </GenresProvider>
        </div>
      </div>
    );
  }
}

const MainView = ({ data, onInput, onPageChange, onRate, onMainPageSwitch }) => {
  const { moviesData, searchData, totalResults, currentPage, mainPage, rating } = data;

  const searchPanel =
    mainPage === 'search' ? <SearchPanel onInput={(query) => onInput(query)} searchData={searchData} /> : null;

  const movieCards = (
    <>
      <MovieCardList movies={moviesData} rating={rating} onRate={(e, id) => onRate(e, id)} />
      <PaginationBar
        totalResults={totalResults}
        currentPage={currentPage}
        onPageChange={(page) => onPageChange(searchData, page)}
      />
    </>
  );

  const emptyList = <Alert message="Nothing found!" type="error" className="nothing_found_error" />;

  const content = moviesData.length > 0 ? movieCards : emptyList;

  return (
    <Flex vertical align="center">
      <Header mainPage={mainPage} onMainPageSwitch={(e) => onMainPageSwitch(e)} />
      {searchPanel}
      {content}
    </Flex>
  );
};

const Spinner = () => {
  return (
    <div className="spinner_layer">
      <Spin indicator={<LoadingOutlined className="spinner" style={{ fontSize: 150 }} spin />} />
    </div>
  );
};
