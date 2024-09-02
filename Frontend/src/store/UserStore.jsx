import { makeAutoObservable } from 'mobx';

class UserStore {
  favorites = [];
  searchs = [];

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    if (typeof window !== "undefined") {
      this.favorites = JSON.parse(localStorage.getItem('belga_favorites')) || [];
      this.searchs = JSON.parse(localStorage.getItem('belga_searchs')) || [];
    }
  }

  toggleFavorite(id) {
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter(fav => fav !== id);
    } else {
      this.favorites.push(id);
    }
    localStorage.setItem('belga_favorites', JSON.stringify(this.favorites));
  }

  saveSearch(query) {
    const newQuery = {
      ...query,
      url: window.location.pathname + window.location.search
    };
    this.searchs = this.searchs.filter(item => item.url !== newQuery.url);
    this.searchs.push(newQuery);
    localStorage.setItem('belga_searchs', JSON.stringify(this.searchs));
  }

  removeSearch(query) {
    this.searchs = this.searchs.filter(item => item.url !== query.url);
    localStorage.setItem('belga_searchs', JSON.stringify(this.searchs));
  }

  isFavorite(id) {
    return this.favorites.includes(id);
  }
}

export default new UserStore();
