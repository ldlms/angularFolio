import { Injectable } from '@angular/core';
import {ElementRef,ViewChildren, QueryList, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  @ViewChildren('accordion') accordions!: QueryList<ElementRef>;

  firstCard: { name: string };
  rightCard: { name: string };
  leftCard: { name: string };
  backCard: { name: string };
  isStyleActive: boolean = false;

  constructor(){
    this.firstCard = { name: "card first-card" };
    this.rightCard = { name: "card right-card" };
    this.leftCard = { name: "card left-card" };
    this.backCard = { name: "card back-card" };
  }


  ngAfterViewInit() {
 
  }
  

  toggleStyle() {
    this.isStyleActive = !this.isStyleActive;
    console.log(this.isStyleActive);
  }

  moveLeft(): void{
  let cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((card:Element) => {
    card.className = this.getNextLeft(card.className);
  })
}

  moveRight(): void {
  let cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((card:Element) => {
    card.className = this.getNextRight(card.className);
  });
}

  moveBack(): void {
  let cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((card:Element) => {
    card.className = this.getBack(card.className);
  });
}

getNextLeft(currentName:string): string {
  switch (currentName) {
    case this.firstCard.name:
      return this.leftCard.name;
    case this.leftCard.name:
      return this.backCard.name;
    case this.rightCard.name:
      return this.firstCard.name;
    case this.backCard.name:
      return this.rightCard.name;
    default:
      throw new Error('Invalid card name: ' + currentName);
  }
}

getNextRight(currentName:string): string {
    switch (currentName) {
      case this.firstCard.name:
        return this.rightCard.name;
      case this.rightCard.name:
        return this.backCard.name;
      case this.backCard.name:
        return this.leftCard.name;
      case this.leftCard.name:
        return this.firstCard.name;
      default:
          throw new Error('Invalid card name: ' + currentName);
    }
  }

getBack(currentName:string) {
  switch (currentName) {
    case this.backCard.name:
      return this.firstCard.name;
    case this.firstCard.name:
      return this.backCard.name;
    case this.rightCard.name:
      return this.rightCard.name;
    case this.leftCard.name:
      return this.leftCard.name;
    default:
      throw new Error('Invalid card name: ' + currentName);
  }
}

move(currentDiv:HTMLElement) {
  if (currentDiv.className === this.leftCard.name) {
    this.moveRight();
  } else if (currentDiv.className === this.rightCard.name) {
    this.moveLeft();
  } else if (currentDiv.className === this.backCard.name) {
    this.moveBack();
  }
}

expand(event: MouseEvent) {
  const clickedElement = event.target as HTMLElement;
  const parentNode = clickedElement.parentNode as HTMLElement;
  if (parentNode && parentNode.className === this.firstCard.name) {
    parentNode.className = parentNode.className + " selected";
  }
  
}

unexpand(event: MouseEvent) {
  const clickedElement = event.target as HTMLElement;
  const parentNode = clickedElement.parentNode as HTMLElement;
  if (parentNode && parentNode.className === this.firstCard.name + " selected") {
    parentNode.className = this.firstCard.name;
  }
}

}
