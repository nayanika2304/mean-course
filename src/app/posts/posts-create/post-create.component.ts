import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Post} from "../post.model"
import {PostService} from "../post.service";
// @ts-ignore
@Component({
  selector : 'app-post-create',//allows us to use the component
  templateUrl : './post-create.component.html', // to look for html to render
  styleUrls : ['./post-create-component.css']
})
export class PostCreateComponent{
  enteredContent = '';
  enteredTitle = '';

  constructor(public postService : PostService) {

  }

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
      this.postService.addPost(form.value.title,form.value.content)
      form.resetForm()
    }

}
