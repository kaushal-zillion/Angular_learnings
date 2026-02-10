import { Component, inject, OnInit, signal } from '@angular/core';
import { Post } from '../../models/post.model';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Modal } from '../ui/modal/modal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, Modal, FormsModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit {
  posts = signal(<Post[]>([]));
  filteredPosts = signal(<Post[]>([]));
  loading = signal(false);
  errorMessage = signal('');
  openPost = signal<Post | null>(null);
  searchTerm = signal('');

  postService = inject(DataService);

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts.set(data);
        this.filteredPosts.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load posts. Please try again later.');
        this.loading.set(false);
      },
    });
  }

  getPostDetails(post: Post) {
    this.openPost.set(post);
    // console.log(this.openPost());
  }

  closePostDetails() {
    this.openPost.set(null);
  }

  getFilteredPosts() {
    if (!this.searchTerm().trim()) {
      return this.filteredPosts.set(this.posts());
    }
    const term = this.searchTerm().toLowerCase();
    return this.filteredPosts.set(
      this.posts().filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.body.toLowerCase().includes(term)
      )
    );
  }
}