import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user: any | undefined;

  Form: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    avatar: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser().subscribe({
        next: (data) => {
          console.log('User data:', data);
          this.user = data;

          // Use patchValue to update the form with matching fields
          this.Form.patchValue({
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            avatar: data.avatar
          });
        },
        error: (error) => {
          console.error('Error loading user', error);
        }
      });
    }
  }

  saveProfile(): void {
    if (!this.Form.invalid) {
      console.log(this.Form.getRawValue());
      this.userService.updateUser(this.Form.getRawValue()).subscribe({
        next: (data) => {
          console.log(data);
          // Success: Show a success message using MatSnackBar
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });

          // Navigate to the user's profile after a successful update
          this.router.navigate(['/user-profile', this.user?.id]);
        },
        error: (error) => {
          console.log('Error updating profile:', error);
          // Error: Show an error message using MatSnackBar
          this.snackBar.open('Failed to update profile. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    } else {
      // If form is invalid, show an error message
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  }

  removeAvatar(): void {
    this.Form.patchValue({ avatar: '' }); // Clear the avatar field in the form
  
    if (this.user) {
      // Optionally, update the user profile to reflect the removal of the avatar
      this.userService.updateUser(this.Form.getRawValue()).subscribe({
        next: () => {
          console.log('Avatar removed successfully');
        },
        error: (error) => {
          console.error('Error while removing avatar:', error);
        }
      });
    }
  }
  
}
