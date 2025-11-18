import { Component, inject, OnInit } from '@angular/core';
import { ServiceCubos } from '../../services/service';
import { Router } from '@angular/router';
import { Compra } from '../../models/compra';

@Component({
  selector: 'app-miscubos',
  imports: [],
  template: `
    <div class="min-h-screen bg-zinc-900 p-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-4">🎰 Mis Apuestas</h1>
          <p class="text-zinc-300 text-lg">Historial de tus apuestas</p>
        </div>

        <!-- Tabla de apuestas -->
        <div class="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden mb-8">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-zinc-700/50">
                <tr>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Pedido
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Id Cubo
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Fecha del pedido
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-700/50">
                @for (compra of compras; track compra.idPedido) {
                <tr class="hover:bg-zinc-700/30 transition-colors">
                  <td class="px-6 py-4">
                    <div class="text-white font-medium">#{{ compra.idPedido }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-white font-medium">
                      {{ compra.idCubo }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-zinc-300">{{ compra.fechaPedido }}</div>
                  </td>
                </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Mensaje cuando no hay apuestas -->
          @if (compras.length === 0) {
          <div class="text-center py-12">
            <div class="text-zinc-400 text-lg">No has realizado ninguna compra aún</div>
            <div class="text-zinc-500 text-sm mt-2">
              ¡Haz tu primer pedido!
            </div>
          </div>
          }
        </div>

        <!-- Botones de acción -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            routerLink="/perfil"
            class="bg-zinc-600 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al Perfil
          </a>

          <a
            routerLink="/comprar-cubos"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Realizar pedido
          </a>
        </div>
      </div>
    </div>
  `,
})
export class Miscubos implements OnInit {
  service = inject(ServiceCubos)
  router = inject(Router)

  compras: Compra[] = []

  ngOnInit(): void {
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarCompras();
  }

  async cargarCompras(): Promise<void> {
    const data = await this.service.getCompras();
    this.compras = data;
  }
}
