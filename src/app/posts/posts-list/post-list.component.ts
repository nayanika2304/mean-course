import {Component, OnDestroy, OnInit} from "@angular/core";
import {Post} from "../post.model"
import {PostService} from "../post.service";
import {Subscription} from "rxjs";

// @ts-ignore
@Component({
  selector : 'app-post-list',//allows us to use the component
  templateUrl : './post-list.component.html', // to look for html to render
  styleUrls : ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{
  // posts = [
  //   {
  //     title :'First-post',
  //     content:'This is the first post content'
  //   },
  //   {
  //     title :'Second-post',
  //     content:'This is the second post content'
  //   },
  //   {
  //     title :'Third-post',
  //     content:'This is the third post content'
  //   }
  // ]

  posts : Post[] = []
  private postSub : Subscription;
  constructor(public postService : PostService) {

  }

  ngOnInit(){
    this.postService.getPosts()
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts:Post[]) => {
      this.posts = posts;
    })
  }

  onDelete(postId : string){
    this.postService.deletePost(postId)
  }

  ngOnDestroy(){
    this.postSub.unsubscribe()
  }
}
