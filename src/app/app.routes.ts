import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Marcas } from './components/marcas/marcas';
import { Perfil } from './components/perfil/perfil';
import { Miscubos } from './components/miscubos/miscubos';
import { Comprarcubos } from './components/comprarcubos/comprarcubos';

export const routes: Routes = [
    {
    path: "",
    component: Home,
  },
  {
    path: "login",
    component: Login,
  },
  {
    path: "marcas/:name",
    component: Marcas,
  },
  {
    path: "perfil",
    component: Perfil,
  },
  {
    path: "mis-cubos",
    component: Miscubos,
  },
  {
    path: "comprar-cubos",
    component: Comprarcubos,
  },
  { path: '**', redirectTo:'' }
];
