import { Component, ViewChild, ElementRef } from '@angular/core';
import { AnimationBuilder, transition, trigger, style, animate, state, keyframes, query, stagger, sequence, group, AnimationMetadata, AnimationPlayer } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';
import { throttleTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { badgeAnimation, circleAnimation } from './animations/animations';

@Component({
  selector: 'add-cart',
  templateUrl: 'add-cart.component.html',
  styleUrls: ['add-cart.component.css'],
})
export class AddCartComponent {
  constructor(private builder: AnimationBuilder) {}

  @ViewChild('svg', { read: ElementRef }) public svg: any;
  @ViewChild('wrapper', { read: ElementRef }) public wrapper: any;

  public items: number = 0;
  private clickSubscription: Subscription;

  public ngOnInit(): void {
    const el = this.wrapper.nativeElement.querySelector('.mat-flat-button');

    this.clickSubscription = fromEvent(el, 'click')
      .pipe(throttleTime(300))
      .subscribe(() => this.moveItem());
  }

  private addItem(): void {
    const el = this.wrapper.nativeElement.querySelector('.mat-badge-content');

    this.createAnimation(badgeAnimation, el).play();
    this.items += 1;
  }

  private moveItem(): void {
    const el = this.svg.nativeElement;
    let player: AnimationPlayer = this.createAnimation(circleAnimation, el);

    player.onDone(() => {
      this.addItem();
    });

    player.play();
  }

  private createAnimation(animation: AnimationMetadata, el: Element): AnimationPlayer {
    const factory = this.builder.build(animation);
    let player: AnimationPlayer = factory.create(el);

    player.onDone(() => {
      if (player) {
        player.destroy();
        player = null;
      }
    });

    return player;
  }

  public ngOnDestroy(): void {
    if (this.clickSubscription) {
      this.clickSubscription.unsubscribe();
    }
  }
}
