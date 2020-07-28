import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Post} from "../post.model"
import {PostService} from "../post.service";
import {ActivatedRoute} from "@angular/router";
import {ParamMap} from "@angular/router";


// @ts-ignore
@Component({
  selector : 'app-post-create',//allows us to use the component
  templateUrl : './post-create.component.html', // to look for html to render
  styleUrls : ['./post-create-component.css']
})
export class PostCreateComponent implements OnInit{
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create'
  private postId : string
  private post :Post

  constructor(public postService : PostService, public route : ActivatedRoute) {

  }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has('postId')){
        this.mode = 'edit'
        this.postId = paramMap.get('pstId')
        this.post = this.postService.getPost(this.postId)
      }else{
        this.mode = 'create'
        this.postId = null
      }
    });
  }

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
      this.postService.addPost(form.value.title,form.value.content)
      form.resetForm()
    }

}
