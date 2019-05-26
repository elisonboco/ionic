import { WordpressService } from './../../services/wordpress.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  post: any;
 
  constructor(public route: ActivatedRoute, public wp: WordpressService) { }
 
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.wp.getPageContent(id).subscribe(res => {
      this.post = res;
    });
    
    this.wp.getPostContent(id).subscribe(res => {
      this.post = res;
    });
  }
 
  openOriginal() {
    // Add InAppBrowser for app if want
    window.open(this.post.link, '_blank');
  }
}