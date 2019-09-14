import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts=[
  //   {title: 'First Post', content:'This is the First Post\'s Content '},
  //   {title: 'Second Post', content:'This is the Second Post\'s Content '},
  //   {title: 'Third Post', content:'This is the Third Post\'s Content '}
  // ];
   posts: Post[] = [];
   private postsSub: Subscription;
   isLoading = false;

  constructor(public postService: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSub = this.postService.getpostUpdate().subscribe(
      (posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      }
    );
  }

  OnDelete(postId: string){
    this.postService.deletePost(postId);
  }


  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
