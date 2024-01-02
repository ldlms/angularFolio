import { Component, AfterViewInit, ElementRef, ViewChild,ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.css'
})
export class ProjetsComponent {

  @ViewChildren('accordion') accordions!: QueryList<ElementRef>;

  title = 'Portfolio';
  firstCard: { name: string };
  rightCard: { name: string };
  leftCard: { name: string };
  backCard: { name: string };
  isStyleActive: boolean = false;

  constructor(private renderer: Renderer2){
    this.firstCard = { name: "card first-card" };
    this.rightCard = { name: "card right-card" };
    this.leftCard = { name: "card left-card" };
    this.backCard = { name: "card back-card" };
  }


  ngAfterViewInit() {
    // Utilisation de ngAfterViewInit pour garantir que les éléments sont rendus avant d'essayer de les sélectionner
    if (this.accordions) {
      this.initAccordion();
    }
  }

  toggleAccordion(item: any) {
    item.active = !item.active;
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

onClickH1(event:MouseEvent) {
  const clickedElement = event.target as HTMLElement;
  const parentNode = clickedElement.parentNode as HTMLElement;
  if (parentNode.className.split(" ")[2] === "selected") {
    this.unexpand(event);
  } else {
    this.expand(event);
  }
}

onClickDiv(event: MouseEvent) {
  const clickedElement = event.target as HTMLElement;
  this.move(clickedElement);
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

move(currentDiv:HTMLElement) {
  if (currentDiv.className === this.leftCard.name) {
    this.moveRight();
  } else if (currentDiv.className === this.rightCard.name) {
    this.moveLeft();
  } else if (currentDiv.className === this.backCard.name) {
    this.moveBack();
  }
}

initAccordion() {
  console.log('Nombre d\'éléments .accordion : ', this.accordions.length);
  const accordionArray = Array.from(this.accordions);
  accordionArray.forEach((element: ElementRef) => {
    const nativeElement = element.nativeElement;
    this.renderer.listen(nativeElement, 'click', () => {
      nativeElement.classList.toggle('active');
      const panel = nativeElement.nextElementSibling as HTMLElement;
      if (panel.style.display === 'block' || getComputedStyle(panel).display === 'block') {
        this.renderer.setStyle(panel, 'display', 'none');
      } else {
        this.renderer.setStyle(panel, 'display', 'block');
      }
    });
  });
}
}
