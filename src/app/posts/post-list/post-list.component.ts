import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

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
   isLoading = false;
   totalPosts = 10;
   postsPerPage = 2;
   currentPage = 1;
   pageSizeOptions = [1, 2, 5, 10];
   userIsAuthenticated = false;
   userId: string;
   private postsSub: Subscription;
   private authStatusSubs: Subscription;

  constructor(public postService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postService.getpostUpdate().subscribe(
      (postData: { posts: Post[] ; postCount: number}) => {
        this.isLoading = false;
        this.posts = postData.posts;
      }
    );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
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
    }, () => {
      this.isLoading = false;
    });
  }


  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }

}
