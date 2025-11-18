import { Component, inject, OnInit } from '@angular/core';
import { ServiceCubos } from '../../services/service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-perfil',
  imports: [],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-white">Mi Perfil</h2>
      </div>

      @if (usuario) {
      <div class="bg-zinc-800/30 border border-white/10 rounded-lg overflow-hidden mb-6">
        <div class="bg-zinc-900/50 px-6 py-4 border-b border-white/10">
          <h3 class="text-lg font-semibold text-white">Información Personal</h3>
        </div>

        <div class="p-6 space-y-4">
          <div class="flex justify-between items-center py-3 border-b border-white/10">
            <span class="text-gray-300 font-medium">Nombre: </span>
            <span class="text-white">{{ usuario.nombre }}</span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-white/10">
            <span class="text-gray-300 font-medium">Email:</span>
            <span class="text-white">{{ usuario.email }}</span>
          </div>
        </div>
      </div>

      <div class="text-center">
        <button
          (click)="verCompras()"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Mostrar compras
        </button>
      </div>
      }
    </div>
  `,
})
export class Perfil implements OnInit {
  service = inject(ServiceCubos)
  router = inject(Router)

  usuario: Usuario | null = null

  ngOnInit(): void {
    this.verificarToken()
  }

  verificarToken(): void {
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['/login'])
      return
    }
    this.cargarPerfil()
  }

  async cargarPerfil(): Promise<void> {
    const perfil = await this.service.getPerfil();
    this.usuario = perfil;
  }

  verCompras(): void {
    this.router.navigate(['/mis-cubos'])
  }
}
