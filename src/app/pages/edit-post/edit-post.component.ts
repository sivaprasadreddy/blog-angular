import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PostUserView } from '../../services/models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'edit-post',
  standalone: true,
  templateUrl: './edit-post.component.html',
  imports: [ReactiveFormsModule],
})
export class EditPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
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

  editPostForm = this.fb.group({
    title: ['', [Validators.required, Validators.pattern(/\S/)]],
    slug: ['', [Validators.required, Validators.pattern(/\S/)]],
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

  updatePost() {
    this.postService
      .updatePost(this.slug(), {
        title: this.editPostForm.value.title!,
        slug: this.editPostForm.value.slug!,
        content: this.editPostForm.value.content!,
      })
      .subscribe(() => {
        this.router.navigate(['/posts', this.editPostForm.value.slug!]);
      });
  }

  fetchPost() {
    this.postService.getPost(this.slug()).subscribe((response) => {
      this.post.set(response);
      this.editPostForm.setValue({
        title: this.post().title,
        slug: this.post().slug,
        content: this.post().content,
      });
    });
  }
}
