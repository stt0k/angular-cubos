import { Component, inject, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ServiceCubos } from '../../services/service';
import { Cubo } from '../../models/cubo';

@Component({
  selector: 'app-marcas',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-zinc-900 p-6">
      <div class="max-w-6xl mx-auto">
        <!-- Botón de regreso -->
        <div class="mb-6">
          <button
            (click)="goBack()"
            class="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver
          </button>
        </div>

          <!-- Cbos de cada marca -->
          <div class="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden">
            <div class="bg-zinc-700/50 px-8 py-4">
              <h2 class="text-2xl font-semibold text-white">👥 Jugadores del Equipo</h2>
            </div>

            @if (cubos.length > 0) {
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
                        (error)="handlePlayerImageError($event)"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-white font-medium">
                        {{ cubo.nombre }}
                      </div>
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
            } @else {
            <!-- Mensaje cuando no hay jugadores -->
            <div class="text-center py-12">
              <div class="text-zinc-400 text-lg">
                👤 No hay jugadores disponibles para este equipo
              </div>
            </div>
            }
          </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class Marcas {
serviceCubos = inject(ServiceCubos)
location = inject(Location);

  // El ! es para cambiar de string a number
  @Input() name!: string;

  cubos: Cubo[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }

  // para que cuando se cambie de id se actualice
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] && changes['name'].currentValue) {
      this.cargarDatos();
    }
  }

  private cargarDatos(): void {
    if (this.name) {
      this.cargarCubosMarca(this.name);
    }
  }

  async cargarCubosMarca(name: string): Promise<void> {
    const data = await this.serviceCubos.getCubosByMarca(name);
    this.cubos = data;
  }

  goBack(): void {
    this.location.back();
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '';
  }

  handlePlayerImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '';
  }
}
