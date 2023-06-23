import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface NewsItem {
  title: string;
  description: string;
  link: string;
}

interface NewsResponse {
  items: NewsItem[];
}

@Injectable({
  providedIn: 'root'
})


export class NewsService {
  private xmlToJsonAPI = 'https://api.rss2json.com/v1/api.json?rss_url=';
  private baseUrl = '/api/v1/favoriteNews';

  constructor(private http: HttpClient) { }

  //parse xml data to json
  getNewsFeed(url: string): Observable<NewsItem[]> {
    const feedUrl = `${this.xmlToJsonAPI}${encodeURIComponent(url)}`;
    return this.http.get<NewsResponse>(feedUrl).pipe(
      map(response => response.items)
    );
  }

  addFavorite(title: string): Observable<any> {
    const url = `${this.baseUrl}/favorites`;
    const body = { title };

    return this.http.post(url, body);
  }
}
