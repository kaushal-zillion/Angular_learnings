import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

  getPosts() {
    return this.http.get<Post[]>(this.apiUrl);
  }
}
