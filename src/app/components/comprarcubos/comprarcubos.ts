import { Component, inject, OnInit } from '@angular/core';
import { ServiceCubos } from '../../services/service';
import { Router, RouterModule  } from '@angular/router';
import { Cubo } from '../../models/cubo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comprarcubos',
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-zinc-900 p-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-4">➕ Comprar Cubos</h1>
        </div>

        <!-- Formulario de crear apuesta -->
        <div class="bg-zinc-800/50 rounded-lg shadow-xl p-8">
          <form (ngSubmit)="comprarCubo()" #apuestaForm="ngForm" class="space-y-6">
            <!-- Cubos -->
            <div>
              <label for="resultado" class="block text-sm font-medium text-zinc-300 mb-2">
                Cubos
              </label>
              <select
                [(ngModel)]="compra"
                id="resultado"
                name="resultado"
                class="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                @for (cubo of cubos; track cubo.idCubo) {
                <option [value]="cubo.idCubo">{{ cubo.nombre }}</option>
                }
              </select>
            </div>

            <!-- Botones -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                (click)="volverMisCubos()"
                class="flex-1 cursor-pointer bg-zinc-600 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Cancelar
              </a>

              <button
                type="submit"
                class="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Comprar cubos
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class Comprarcubos implements OnInit {
  service = inject(ServiceCubos)
  router = inject(Router)
  cubos: Cubo[] = []

  compra: number = 0

  ngOnInit(): void {
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarCubos()
  }

  async cargarCubos(): Promise<void> {
    const data = await this.service.getCubos()
    this.cubos = data
  }

  async comprarCubo(): Promise<void> {
    await this.service.createCompra(this.compra)
    this.router.navigate(['/mis-cubos'])
  }

  volverMisCubos(): void {
    this.router.navigate(['/mis-cubos'])
  }
}
