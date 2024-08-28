import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from '../user-view/user-view.component';
import { UsersService } from "../../services/users.service";
import { User } from "../../models/user.interface";
import { ToastrService } from "ngx-toastr";
import { map } from 'rxjs';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserViewComponent],
  providers: [UsersService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  public users: User[] = [];
  public activeUser: User | null = null;
  public isUserViewOpened: boolean = false;
  public serverErrors: Record<string, string> | null = null;
  constructor(private toastr: ToastrService, private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUsers().pipe(map(res => res.users)).subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err: Error) => {
        console.error(err.message);
      }
    });
  }

  addUser(user: User) {
    this.userService.addUser(user).subscribe({
      next: () => {
        this.successMessage('User added');
        this.users.push(user);
      },
      error: (err) => {
        this.serverErrors = err.errors;
        this.errorMessage('User not added');
      }
    });
  }

  saveUser(user: User) {
    this.userService.updateUser(user).subscribe({
      next: () => {
        this.successMessage('User updated');
        const findUser = this.users.find((u: User) => 
          (u.username === user.old_username || u.old_username === user.old_username))!;
        const index = this.users.indexOf(findUser);
        this.users[index] = { ...user };
      },
      error: (err) => {
        this.serverErrors = err.errors;
        this.errorMessage('User not updated');
      }
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe({
        next: (status) => {
          if (status) {
            this.successMessage('User deleted');
            const index = this.users.indexOf(user);
            if (index !== -1) {
              this.users.splice(index, 1);
            }
          }
        },
        error: (err) => {
          console.error(err.message);
          this.errorMessage('User not deleted');
        }
    });
  }

  private successMessage(message: string) {
    this.toastr.success(message, 'Success');
    this.resetValues();
  }

  private errorMessage(message: string) {
    this.toastr.error(message, 'Error', { positionClass: 'toast-top-left' });
  }

  private resetValues() {
    this.isUserViewOpened = false;
    this.serverErrors = null;
    this.activeUser = null;
  }
}
