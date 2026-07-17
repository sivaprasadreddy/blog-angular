import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { PostUserView } from '../../services/models';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'post',
  standalone: true,
  templateUrl: './post.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class Post implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private authService = inject(AuthService);
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

  commentForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/\S/)]],
    email: ['', [Validators.required, Validators.pattern(/\S/), Validators.email]],
    content: ['', [Validators.required, Validators.pattern(/\S/)]],
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug.set(params.get('slug') || '');
      if (this.slug()) {
        this.fetchPost();
      }
    });
  }

  canEdit = computed(
    () => this.authService.isLoggedIn() && this.authService.loginUserId() === this.post().authorId,
  );

  fetchPost() {
    this.postService.getPost(this.slug()).subscribe((response) => {
      this.post.set(Object.assign(response, { comments: [] }));
      this.postService.getPostComments(this.slug()).subscribe((comments) => {
        this.post.update((p) => ({ ...p, comments }));
      });
    });
  }

  createComment() {
    this.postService
      .createComment(this.slug(), {
        name: this.commentForm.value.name!,
        email: this.commentForm.value.email!,
        content: this.commentForm.value.content!,
      })
      .subscribe(() => {
        this.commentForm.reset();
        this.fetchPost();
      });
  }
}
