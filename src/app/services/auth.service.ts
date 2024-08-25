import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) {}

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      async (userCredential) => {
        const userUid = userCredential.user?.uid;
        if (userUid) {
          try {
            await this.firestore.collection('users').doc(userUid).set({
              email: email,
              password: password,
            });
            alert('Usuário cadastrado com sucesso!');
            this.router.navigate(['/login']);
          } catch (err) {
            alert('Erro ao salvar dados do usuário.');
            console.error('Erro ao salvar dados do usuário:', err);
          }
        }
      },
      (err: any) => {
        alert('Algo deu errado, tente novamente');
        console.error('Erro ao criar usuário:', err);
        this.router.navigate(['/cadastro']);
      }
    );
  }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/menu']);
      },
      (err) => {
        alert('Algo deu errado, tente novamente');
        this.router.navigate(['/login']);
      }
    );
  }
  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert('Algo deu errado, tente novamente');
        this.router.navigate(['/cadastro']);
      }
    );
  }
}
