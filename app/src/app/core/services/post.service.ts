import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../config/api.config';

/**
 * Port de `providers/post/post.ts`.
 * `@angular/http` + `.map(res => res.json())` → `HttpClient` (parse JSON tout seul).
 */
@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);

  /** POST générique vers un script PHP du backend historique. */
  postData<T = any>(body: unknown, script: string): Observable<T> {
    return this.http.post<T>(apiUrl(script), JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    });
  }
}
