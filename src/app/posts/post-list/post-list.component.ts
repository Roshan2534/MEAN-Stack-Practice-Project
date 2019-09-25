import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';

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
   totalPosts = 10;
   postsPerPage = 2;
   currentPage = 1;
   pageSizeOptions = [1, 2, 5, 10];
   private postsSub: Subscription;
   isLoading = false;

  constructor(public postService: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService.getpostUpdate().subscribe(
      (postData: { posts: Post[], postCount: number}) => {
        this.isLoading = false;
        console.log(postData.postCount);
        this.posts = postData.posts;
      }
    );
  }

  onPageChange(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  OnDelete(postId: string){
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }


  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
