import { Component, input } from '@angular/core';
import { PostsResponse } from '../../services/models';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.html',
  imports: [RouterLink, NgClass],
})
export class Pagination {
  query = input('');

  postsResponse = input<PostsResponse>({
    data: [],
    hasNextPage: false,
    hasPreviousPage: false,
    currentPageNo: 0,
    totalElements: 0,
    totalPages: 0,
  });
}
