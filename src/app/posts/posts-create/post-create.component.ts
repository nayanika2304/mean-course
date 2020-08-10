import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup,Validators} from "@angular/forms";
import {Post} from "../post.model"
import {PostsService} from "../posts.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {mimeType} from "./mime-type.validator";

// @ts-ignore
@Component({
  selector: 'app-post-create',//allows us to use the component
  templateUrl: './post-create.component.html', // to look for html to render
  styleUrls: ['./post-create-component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  post: Post
  form : FormGroup
  isLoading = false
  imagePreview: string;
  private mode = 'create'
  private postId: string


  constructor(public postsService: PostsService, public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      'title':new FormControl(null,{validators: [Validators.required,Validators.minLength(3)]}),
      'content': new FormControl(null,{validators:[Validators.required]}),
      'image':new FormControl(null, {validators:[Validators.required],asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit'
        this.postId = paramMap.get('pstId')
        this.isLoading = true
        this.postsService.getPost(this.postId).subscribe(postData =>{
          this.isLoading = false;
          this.post = {
            id : postData._id,
            title  : postData.title,
            content : postData.content,
            imagePath:postData.imagePath
          }
          this.form.setValue({'title':this.post.title,'content':this.post.content,image:this.post.imagePath})
        })
      } else {
        this.mode = 'create'
        this.postId = null
      }
    });
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader()
    reader.onload = () =>{
      this.imagePreview = (reader.result).toString()
    }
    reader.readAsDataURL(file);

  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      // @ts-ignore
      this.postsService.addPost(this.form.value.title, this.form.value.content,this.form.value.image)
    } else {
      // @ts-ignore
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content,this.form.value.image)
    }

    this.form.reset()
  }

}

