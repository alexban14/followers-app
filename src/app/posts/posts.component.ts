import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { AppError } from '../common/app.error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any;

  constructor(private service: PostService  ) {

  }

// keep the constructor as clean as posible
// use ngOnInit() when in need of initialization
  ngOnInit() {
    this.service.getAll()
    // with this we are sub scribing to that observable
    // a subscription function
    .subscribe(posts => this.posts = posts);
  }

  create(input: HTMLInputElement) {
    let post: any = { title: input.value}
    this.posts.splice(0, 0, post);

    input.value = '';

    this.service.create(post)
      .subscribe(newPost => {
        post['id'] = newPost;

        console.log(newPost);
      }, (error: AppError) => {
        this.posts.splice(0, 1);
        if (error instanceof BadInput) {
          // this.form.setErrors(error.originalError);
        }
        else throw error;
      });
  }

  update(post: any) {
    this.service.update(post)
      .subscribe(updatedPost => {
        console.log(updatedPost);
      });
  }

  delete(post: any) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id)
      .subscribe(
        null,
        (error: AppError) => {
          this.posts.splice(index, 0, post);

          if (error instanceof NotFoundError) {
            alert('This post has already been deleted.');
          }
          else throw error;
      });
  }
}
