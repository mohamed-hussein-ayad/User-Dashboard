import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserService } from '../../services/user.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    // UserListComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  cachedUsers: any[] = [];
  isLoading: boolean = false;
  constructor(private userService: UserService, private router: Router) {}
  search(): void {
    if (this.searchQuery) {
      this.isLoading = true;
      if (this.cachedUsers.length === 0) {
        this.userService.getUsers().subscribe({
          next: (users: any) => {
            this.cachedUsers = users.data;
            this.filterResults();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching users:', error);
            this.isLoading = false;
          },
        });
      } else {
        console.log(this.cachedUsers.length);
        this.filterResults();
        this.isLoading = false;
      }
    } else {
      this.searchResults = [];
      console.log(this.searchResults.length);
      console.log(this.searchResults);
    }
  }
  private filterResults(): void {
    this.searchResults = this.cachedUsers.filter(
      (user: { id: { toString: () => string } }) => {
        return user.id.toString() === this.searchQuery;
      }
    );
  }
  navigateToDetails(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
}
