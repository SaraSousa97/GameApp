import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {
  user: any |undefined;

  Form: FormGroup =new FormGroup(
    {
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    avatar: new FormControl('')

});

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser().subscribe({
        next: (data) => {
          console.log('User data:', data); // Debugging: Check the data structure
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
          console.error('Erro ao carregar o usuário', error);
        }
      });
    }
  }
  

  saveProfile(): void {
    if (!this.Form.invalid) {
      console.log(this.Form.getRawValue())
      this.userService.updateUser(this.Form.getRawValue()).subscribe({
        next: data =>{
          console.log(data);
          this.router.navigate(['/user-profile', this.user?.id]);

        }, error: error =>{
          console.log('Algo deu errado:', error);
        },
        complete:()=>{

        }
      })
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