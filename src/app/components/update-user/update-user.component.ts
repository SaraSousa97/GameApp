import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user: any | undefined;
  notification: string | undefined = undefined;

  Form: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    avatar: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private notificationsService:NotificationsService
  ) { this.notificationsService.notification.subscribe(
    (message) => (this.notification = message)
  );}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser().subscribe({
        next: (data) => {
          
          this.user = data;

          this.Form.patchValue({
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            avatar: data.avatar,
          });
        },
        error: (error) => {
          console.error('Error loading user', error);
        },
      });
    }
  }

  saveProfile(): void {
    if (!this.Form.invalid) {
      this.userService.updateUser(this.Form.getRawValue()).subscribe({
        next: (data) => {
          this.notificationsService.showNotification('Profile updated sucessfully!');

          this.router.navigate(['/user-profile', this.user?.id]);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.notificationsService.showNotification('Error updating profile');
        },
      });
    }
  }

  removeAvatar(): void {
    this.Form.patchValue({ avatar: '' });

    if (this.user) {
      this.userService.updateUser(this.Form.getRawValue()).subscribe({
        next: () => {
          this.notificationsService.showNotification('Avatar removed successfully!');
        },
        error: (error) => {
          console.error('Error while removing avatar:', error);
        },
      });
    }
  }
}
