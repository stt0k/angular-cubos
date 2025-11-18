import { Component, inject } from '@angular/core';
import { ServiceCubos } from '../../services/service';
import { Router } from '@angular/router';
import { Login as LoginType } from '../../models/login';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="max-w-md mx-auto p-6">
      <h2 class="text-2xl font-semibold text-white text-center mb-8">Iniciar Sesión</h2>

      <div class="bg-zinc-800/30 border border-white/10 rounded-lg p-6">
        <form (ngSubmit)="login()" #loginForm="ngForm">
          <div class="mb-4">
            <label for="userName" class="block text-white mb-2">Email:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              [(ngModel)]="credentials.email"
              required
              class="w-full px-3 py-2 bg-zinc-700/50 border border-white/20 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div class="mb-6">
            <label for="password" class="block text-white mb-2">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="credentials.password"
              required
              class="w-full px-3 py-2 bg-zinc-700/50 border border-white/20 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  `,
})
export class Login {
  service = inject(ServiceCubos)
  router = inject(Router)

  credentials = {
    email: '',
    password: '',
  }

  async login(): Promise<void> {
    const user: LoginType = {
      email: this.credentials.email,
      password: this.credentials.password
    }
    const token = await this.service.getToken(user)
    localStorage.setItem('token', token)
    await this.router.navigate(['/perfil'])
  }
}
