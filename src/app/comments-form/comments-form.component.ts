import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Comment {
  email: string;
  comment: string;
}

@Component({
  selector: 'app-comments-form',
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css']
})
export class CommentsFormComponent implements OnInit {
  commentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Load previously saved comments from localStorage on component initialization
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      const parsedComments: Comment[] = JSON.parse(savedComments);
      // Optional: Load and display previously saved comments if needed
      console.log('Previously saved comments:', parsedComments);
    }
  }

  submitComment() {
    if (this.commentForm.valid) {
      const { email, comment } = this.commentForm.value;

      // Create a new comment object
      const newComment: Comment = { email, comment };

      // Retrieve existing comments from localStorage or initialize an empty array
      let comments: Comment[] = JSON.parse(localStorage.getItem('comments') || '[]');

      // Add the new comment to the array
      comments.push(newComment);

      // Store the updated comments array back to localStorage
      localStorage.setItem('comments', JSON.stringify(comments));

      // Optionally, log or handle successful submission
      console.log('Comment saved locally:', newComment);

      // Reset the form after submission
      this.commentForm.reset();
    }
    else {
      // Handle form validation errors if needed
      Object.keys(this.commentForm.controls).forEach(field => {
        const control = this.commentForm.get(field);
        control?.markAsTouched({ onlySelf: true }); // Optional chaining to avoid "object is possibly null" warning
      });


    }

  }
}
