import {Post} from "./post.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators'
@Injectable({providedIn: 'root'})
export class PostService{
  private posts : Post[] = []
  private postUpdated = new Subject<Post[]>()

  constructor(private http : HttpClient){

  }
  getPosts(){
    this.http.get<{message:string,posts:any}>('http://localhost:3001/api/posts')
      .pipe(map((postData =>{
        return postData.posts.map(post =>{
          return {
            title : post.title,
            content : post.content,
            id : post._id
          }
        })
      })))
      .subscribe((transformedPosts) =>{
          this.posts = transformedPosts;
          this.postUpdated.next([...this.posts])
      });
  }

  getPostUpdateListener(){
    return this.postUpdated.asObservable()
  }
  getPost(id : string){
    return {...this.posts.find(p => p.id === id)}
  }
utub
  addPost(title : string,content:string){
    const post : Post = {id : null ,title: title, content : content}
    this.http.post<{message:string,postId : string}>('http://localhost:3001/api/posts',post)
      .subscribe((responseData) =>{
        const id = responseData.postId
        post.id = id;
        this.posts.push(post)
        this.postUpdated.next([...this.posts])
      })

  }

  updatePost(id : string,title:string,content:string){
    const post : Post = {id : id,title:title,content:content}
    this.http.put("http://localhost:3001/api/posts/" + id,post)
      .subscribe(response =>{
        console.log('response',response)
      })
  }

  deletePost(postId : string){
    this.http.delete("http://localhost:3001/api/posts/" + postId)
      .subscribe(() =>{
        this.posts = this.posts.filter(post => post.id !== postId)
        this.postUpdated.next([...this.posts])
      })
  }

}


