import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class WordpressService {
 
  url = `https://elison-boco-project-work.000webhostapp.com/wp-json/wp/v2/`;
  totalPosts = null;
  pages: any;
 
  constructor(public http: HttpClient) { }
 
  getPosts(page = 1): Observable<any[]> {
    let options = {
      observe: "response" as 'body',
      // params: {
      //   per_page: '2',
      //   page: ''+page
      // }
    };
 
    return this.http.get<any[]>(`${this.url}posts?_embed`, options).pipe(
      map(resp => {
        // this.pages = resp['headers'].get('x-wp-totalpages');
        this.totalPosts = resp['headers'].get('x-wp-total');
 
        let data = resp['body'];
 
        for (let post of data) {
          post.media_url = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
        }
        return data;
      })
    )
  }
 
  getPostContent(id) {
    return this.http.get(`${this.url}posts/${id}?_embed`).pipe(
      map(post => {
        post['media_url'] = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
        return post;
      })
    )
  }

  getPages(page = 1): Observable<any[]> {
    let options = {
      observe: "response" as 'body',
      // params: {
      //   per_page: '2',
      //   page: ''+page
      // }
    };
 
    return this.http.get<any[]>(`${this.url}pages`, options).pipe(
      map(resp => {
        // this.pages = resp['headers'].get('x-wp-totalpages');
        this.totalPosts = resp['headers'].get('x-wp-total');
 
        let data = [];
        for (let el of resp['body']){
          if (el['slug'].indexOf("luogo") != -1){
            data.push(el)
          }
        }
 console.log(data);
        
        return data;
      })
    )
  }
 
  getPageContent(id) {
    return this.http.get(`${this.url}pages/${id}`).pipe(
      map(post => {
        
          return post;
        
      })
    )
  }

}