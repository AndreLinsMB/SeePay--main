import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuardService } from './services/auth.guard.service';
import { HomeComponent } from './pages/home/home.component';
import { RendimentosComponent } from './pages/rendimentos/rendimentos.component';
import { DespesasComponent } from './pages/despesas/despesas.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'cadastro',
  pathMatch: 'full',
},
{ path: 'cadastro', component: CadastroComponent },

{ path: 'login', component: LoginComponent},

{ path: 'menu', component: MenuComponent, canActivate: [AuthGuardService],
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },

    {
      path: 'rendimentos',
      component: RendimentosComponent,
    },

    {
      path: 'despesas',
      component: DespesasComponent,
    },
  ]
 },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
