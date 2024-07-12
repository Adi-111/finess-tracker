import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Comment {
  email: string;
  comment: string;
  likes:number;
}

@Component({
  selector: 'app-comments-display',
  templateUrl: './comments-display.component.html',
  styleUrls: ['./comments-display.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class CommentsDisplayComponent implements OnInit {
  comments: Comment[] = []; // Array to hold all comments
  pagedComments: Comment[] = []; // Array to hold comments for the current page
  pageSize: number = 5; // Number of comments per page
  currentPage: number = 1; // Current page number
  totalPages: number = 0; // Total number of pages

  constructor() { }

  ngOnInit(): void {
    // Initialize comments array by retrieving saved comments from localStorage
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      this.comments = JSON.parse(savedComments);
    } else {
      // Fallback: Use an empty array if no comments are saved locally
      this.comments = [];
    }

    this.totalPages = Math.ceil(this.comments.length / this.pageSize); // Calculate total pages
    this.updatePagedComments(); // Update paged comments for initial display
  }

  updatePagedComments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedComments = this.comments.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedComments();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedComments();
    }
  }
}
