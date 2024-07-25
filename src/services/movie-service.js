export default class MovieService {
  accessToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWM4OGQzNDFhYzdjMGVjZTM1NzI3MGEwZjRkODU1MyIsIm5iZiI6MTcyMTI0NTkxMC4yOTUzODgsInN1YiI6IjY2OTgxZjFkZjExYjRmMWFjMTIzMTBiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g8QSZNrAjlc-JprmRxEo0OHsu5XP4Ep2L0pMdZ8mMi0';

  // apiToken = '99c88d341ac7c0ece357270a0f4d8553'

  baseURL = 'https://api.themoviedb.org/3';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    },
  };

  async getResource(query) {
    // const res = await fetch(`${this.baseURL}/${query}&api_key=${this.apiToken}`, this.options);
    const res = await fetch(`${this.baseURL}/${query}`, this.options);
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
    return await res.json();
  }

  async getMovies(searchParam) {
    const res = await this.getResource(`search/movie?query=${searchParam}`);

    return res;
  }

  async getGenres() {
    const res = await this.getResource('genre/movie/list?language=en');

    return res;
  }

  async getPage(searchParam, page) {
    const res = await this.getResource(`search/movie?query=${searchParam}&page=${page}`);

    return res;
  }

  async createGuestSession() {
    const res = await fetch(`${this.baseURL}/authentication/guest_session/new`, this.options);

    return await res.json();
  }

  async rateMovie(movieId, rate, sessionId) {
    const postOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: `{"value":${rate}}`,
    };
    await fetch(`${this.baseURL}/movie/${movieId}/rating?guest_session_id=${sessionId}`, postOptions);
  }

  async getRated(sessionId) {
    const res = await this.getResource(`guest_session/${sessionId}/rated/movies`);
    return res;
  }

  async getRatedPage(sessionId, page) {
    const res = await this.getResource(`guest_session/${sessionId}/rated/movies?page=${page}`);
    return res;
  }
}
