import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Despesa } from './../models/despesa';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

    private async getUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }
  addDespesa(despesa: Despesa): Observable<void> {
    return from(this.getUserId()).pipe(
      switchMap((userId) => {
        if (!userId) {
          throw new Error('Usuário não autenticado');
        }
        const id = this.afs.createId();
        const despesaComId: Despesa = {
          id: id,
          despesa: despesa.despesa,
          valor: despesa.valor,
          data: despesa.data,
          userId: userId,
        };
        return from(this.afs.collection('/despesas').doc(id).set(despesaComId));
      })
    );
  }
}
