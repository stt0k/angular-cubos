import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCubos } from '../../services/service';
import { CommonModule } from '@angular/common';
import { Cubo } from "../../models/cubo"

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-semibold text-white text-center mb-8">
        Sistema de Gestión de Empleados
      </h1>

      <div class="bg-zinc-800/30 border border-white/10 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-medium text-white mb-4">Bienvenido</h2>
        <p class="text-gray-300 mb-6">
          Este sistema te permite gestionar información de empleados y subordinados. Accede con tus
          credenciales para ver tu perfil y gestionar tu equipo.
        </p>

        <div class="text-center">
          <p>Inicia sesión si quieres ver el contenido</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-4">Cubos</h1>
          <p class="text-zinc-300 text-lg">Lista completa de cubos</p>
        </div>

        <!-- Tabla de cubos -->
        <div class="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-zinc-700/50">
                <tr>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Imagen
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Nombre
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Modelo
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Marca
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Color
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-700/50">
                @for (cubo of cubos; track cubo.idCubo) {
                <tr class="hover:bg-zinc-700/30 transition-colors">
                  <td class="px-6 py-4">
                    <img
                      [src]="cubo.imagen"
                      [alt]="cubo.nombre"
                      class="w-12 h-12 rounded-full object-cover border-2 border-zinc-600"
                      (error)="handleImageError($event)"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-white font-medium">{{ cubo.nombre }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <span
                      class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    >
                      {{ cubo.modelo }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-zinc-300">{{ cubo.marca }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-zinc-300">{{ cubo.color }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-zinc-300">€{{ cubo.precio }}.00</div>
                  </td>
                </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Mensaje cuando no hay jugadores -->
          @if (cubos.length === 0) {
          <div class="text-center py-12">
            <div class="text-zinc-400 text-lg">🚫 No se encontraron jugadores</div>
          </div>
          }
        </div>
      </div>
    </div>
  `,

})
export class Home implements OnInit {
  service = inject(ServiceCubos);
  readonly router = inject(Router);
  cubos: Cubo[] = []

  isAuthenticated = false;

  ngOnInit(): void {
    this.cargarCubos()
  }

  async cargarCubos(): Promise<void> {
    const data = await this.service.getCubos()
    this.cubos = data
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '';
  }
  
}
