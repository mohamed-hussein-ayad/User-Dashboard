import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.getUserDetails();
    });
  }

  getUserDetails(): void {
    this.userService.getUserDetails(this.userId).subscribe((user) => {
      this.user = user;
    });
  }

  goBack(): void {
    this.router.navigate(['/user']);
  }
}
