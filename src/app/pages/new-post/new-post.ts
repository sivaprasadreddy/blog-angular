import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PostUserView } from '../../services/models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'new-post',
  standalone: true,
  templateUrl: './new-post.html',
  imports: [ReactiveFormsModule],
})
export class NewPost {
  private router = inject(Router);
  private postService = inject(PostService);
  private fb = inject(FormBuilder);

  slug = signal('');
  post = signal<PostUserView>({
    id: 0,
    slug: '',
    title: '',
    content: '',
    authorId: 0,
    authorName: '',
    createdAt: new Date(),
    comments: [],
  });

  newPostForm = this.fb.group({
    title: ['', [Validators.required, Validators.pattern(/\S/)]],
    slug: ['', [Validators.required, Validators.pattern(/\S/)]],
    content: ['', [Validators.required, Validators.pattern(/\S/)]],
  });

  createPost() {
    this.postService
      .createPost({
        title: this.newPostForm.value.title!,
        slug: this.newPostForm.value.slug!,
        content: this.newPostForm.value.content!,
      })
      .subscribe(() => {
        this.router.navigate(['/posts']);
      });
  }

  fetchPost() {
    this.postService.getPost(this.slug()).subscribe((response) => {
      this.post.set(response);
    });
  }
}
