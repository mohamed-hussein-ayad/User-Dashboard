import { Component, Input, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatCardModule,
    NgIf,
    NgFor,
    HeaderComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  totalUsers: number = 0;
  pageSize: number = 6;
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response.data as User[];
      this.totalUsers = response.total;
      this.filteredUsers = this.users; // Initially show all users
      this.isLoading = false;
    });
  }

  onSearch(query: string): void {
    if (query) {
      this.isLoading = true;
      this.userService.getUserById(query).subscribe({
        next: (response: any) => {
          this.filteredUsers = [response.data as User];
          this.isLoading = false;
        },
        error: () => {
          this.filteredUsers = [];
          this.isLoading = false;
        },
      });
    } else {
      this.filteredUsers = this.users;
    }
  }

  onPageChange(event: any): void {
    const pageIndex = event.pageIndex + 1;
    this.userService.getUsersByPage(pageIndex).subscribe((response: any) => {
      this.users = response.data as User[];
      this.filteredUsers = this.users;
    });
  }

  navigateToUserDetails(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
}
