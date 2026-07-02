import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { PostsResponse } from '../../services/models';
import { Pagination } from '../../components/pagination/pagination';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './posts.html',
  imports: [CommonModule, Pagination, ReactiveFormsModule],
})
export class Posts implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private postService = inject(PostService);
  private fb = inject(FormBuilder);

  page = signal(1);
  posts = signal<PostsResponse>({
    data: [],
    totalElements: 0,
    currentPageNo: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  searchForm = this.fb.group({
    query: ['', [Validators.required, Validators.pattern(/\S/)]],
  });

  ngOnInit(): void {
    this.fetchPosts();

    this.route.queryParamMap.subscribe((params) => {
      this.page.set(parseInt(params.get('page') || '1'));
      this.fetchPosts();
    });
  }

  fetchPosts() {
    this.postService
      .getPosts(this.page(), this.searchForm.value.query || '')
      .subscribe((response) => {
        this.posts.set(response);
      });
  }

  search() {
    this.router.navigate(['/posts'], { queryParams: { query: this.searchForm.value.query } });
  }
}
