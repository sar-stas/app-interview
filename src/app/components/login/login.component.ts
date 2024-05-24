import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  isSubmitting: boolean = false;
  message: string = '';
  timer: number = 0;
  private timerSubscription: Subscription | null = null;

  constructor(private loginService: LoginService) {}

  onSubmit() {
    if (this.isSubmitting || this.timer > 0) return;

    this.isSubmitting = true;
    this.loginService.login(this.username).subscribe({
      next: (response) => {
        this.message = `Добро пожаловать, ${response.username}`;
        this.startTimer();
      },
      error: (error) => {
        this.message = 'Ошибка: Неверный логин';
        setTimeout(() => {
          this.message = '';
        }, 5000);
        this.startTimer();
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  startTimer() {
    this.timer = 60;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = interval(1000).subscribe(() => {
      this.timer--;
      if (this.timer <= 0 && this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
    });
  }
}
