import { AnimationMetadata, keyframes, sequence, animate, style, query, group } from '@angular/animations';

export const badgeAnimation = 
  animate('300ms ease-out', keyframes([
    style({ transform: `*` }),
    style({ transform: `scale(1.2)` }),
    style({ transform: `*` })
  ])
);

export const circleAnimation: AnimationMetadata =
  group([
    query('.circle', animate('300ms ease-out', keyframes([
      style({ transform: 'translateY(-370px)' }),
    ]))),
    query('.circle', [animate('300ms', keyframes([
      style({ fill: '#ff4081', offset: 0.1 }),
      style({ opacity: 0.8, offset: 0.4 }),
      style({ opacity: 0.5, offset: 0.8 }),
      style({ opacity: 0, offset: 1 })
    ])
  )])
]);
