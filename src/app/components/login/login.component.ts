import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import {NgClass, NgIf} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    HttpClientModule,
    NgClass,
  ],
  providers: [
    LoginService,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isSubmitting: boolean = false;
  message: string = '';
  isSuccess: boolean = false;
  timer: number = 0;
  private timerSubscription: Subscription | null = null;

  constructor(private loginService: LoginService) {}

  onSubmit() {
    if (this.isSubmitting || this.timer > 0) return;

    this.isSubmitting = true;
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.isSuccess = true;
          this.message = `Добро пожаловать, ${this.username}`;
        } else {
          this.isSuccess = false;
          this.message = 'Ошибка: Неверный логин или пароль';
        }
        this.startTimer();
      },
      error: (error) => {
        this.isSuccess = false;
        this.message = 'Ошибка: Неверный логин или пароль';
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
