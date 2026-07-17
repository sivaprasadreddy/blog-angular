import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { Category, PostUserView } from '../../services/models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'new-post',
  standalone: true,
  templateUrl: './new-post.html',
  imports: [ReactiveFormsModule],
})
export class NewPost implements OnInit {
  private router = inject(Router);
  private postService = inject(PostService);
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  slug = signal('');
  categories = signal<Category[]>([]);
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
    categorySlug: [''],
  });

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories.set(categories);
    });
  }

  createPost() {
    this.postService
      .createPost({
        title: this.newPostForm.value.title!,
        slug: this.newPostForm.value.slug!,
        content: this.newPostForm.value.content!,
        categorySlug: this.newPostForm.value.categorySlug || undefined,
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
