import { trigger, transition, state, style, animate } from '@angular/animations';
export const searchMove = trigger('move', [
    state('out', style({ width: '140px' })),
    state('in', style({ width: '200px'  })),
    transition('in => out', animate('100ms ease-in')),
    transition('out => in', animate('100ms ease-out'))
]);
