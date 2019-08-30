import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts=[
  //   {title: 'First Post', content:'This is the First Post\'s Content '},
  //   {title: 'Second Post', content:'This is the Second Post\'s Content '},
  //   {title: 'Third Post', content:'This is the Third Post\'s Content '}
  // ];
  @Input() posts: Post[] = [];


  constructor() { }

  ngOnInit() {
  }

}
