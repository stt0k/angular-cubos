import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { environment } from '../../environments/environment.development';
import axios from 'axios';
import { Usuario } from '../models/usuario';
import { Cubo } from '../models/cubo';
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root',
})
export class ServiceCubos {
  async getToken(user: Login): Promise<any> {
    const request = 'api/manage/login';
    const url = environment.URL_AUTH + request;
    const response = await axios.post(url, user);
    return response.data.response;
  }

  async getPerfil(): Promise<Usuario> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const request = 'api/manage/perfilusuario';
    const url = environment.URL_AUTH + request;
    const response = await axios.get(url, { headers });
    return response.data;
  }

  async getMarcas(): Promise<string[]> {
    const request = `api/cubos/marcas`
    const url = environment.URL_AUTH + request
    const response = await axios.get(url)
    return response.data
  }

  async getCubos(): Promise<Cubo[]> {
    const request = 'api/cubos';
    const url = environment.URL_AUTH + request;
    const response = await axios.get(url);
    return response.data;
  }

  async getCubosByMarca(name: string): Promise<Cubo[]> {
    const request = 'api/cubos/cubosmarca/' + name;
    const url = environment.URL_AUTH + request;
    const response = await axios.get(url);
    return response.data;
  }

  async getCompras(): Promise<Compra[]> {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` };
    const request = 'api/compra/comprasusuario'
    const url = environment.URL_AUTH + request
    const response = await axios.get(url, { headers })
    return response.data
  }

  async createCompra(idcubo: number): Promise<any> {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` };
    const request = 'api/compra/insertarpedido/' + idcubo
    const url = environment.URL_AUTH + request
    const response = await axios.post(url, null, { headers })
    return response.data
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}


