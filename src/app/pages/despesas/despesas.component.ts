import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent {

private breakpointObserver = inject(BreakpointObserver);

  // Observável que fornece o layout dinâmico com base no tamanho da tela
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        // Layout para telas de mão (Handset)
        return {
          columns: 2,
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 2 },
        };
      } else {
        // Layout para telas maiores (desktop)
        return {
          columns: 2,
          chart: { cols: 1, rows: 2 },
          table: { cols: 2, rows: 2 },
        };
      }
    })
  );
}
