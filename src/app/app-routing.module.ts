import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {PostListComponent} from "./posts/posts-list/post-list.component";
import {PostCreateComponent} from "./posts/posts-create/post-create.component";

const routes : Routes = [
  {
    path : '',
    component : PostListComponent
  },
  {
    path : 'create',
    component: PostCreateComponent
  },
  {
    path : 'edit/:postId',
    component : PostCreateComponent
  }
]

// @ts-ignore

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]

})
export class AppRoutingModule {}
