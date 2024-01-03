import { Component} from '@angular/core';
import { ScriptService } from '../script.service';
import { NgFor } from '@angular/common';

interface DivItem {
  title: string;
  content: string;
  isOpen: boolean;
}



@Component({
  selector: 'app-parcours-anterieur',
  standalone: true,
  imports: [NgFor],
  templateUrl: './parcours-anterieur.component.html',
  styleUrl: './parcours-anterieur.component.css'
})
export class ParcoursAnterieurComponent {

  firstCard: { name: string } = { name : "card first-card"};
  rightCard: { name: string } = { name: "card right-card" };
  leftCard: { name: string } = {name: "card left-card"};
  backCard: { name: string } = { name: "card back-card" };
  isStyleActive: boolean = false;

  constructor(private scriptService: ScriptService) {}

  divs: DivItem[] = [
    

  ]

  ngOnInit(): void {
    
    this.scriptService.ngAfterViewInit();
    this.scriptService.toggleStyle();
    // this.scriptService.initAccordion();
    
  }

  toggleContent(div: DivItem): void {
    div.isOpen = !div.isOpen; 
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
      this.scriptService.moveRight();
    } else if (currentDiv.className === this.rightCard.name) {
      this.scriptService.moveLeft();
    } else if (currentDiv.className === this.backCard.name) {
      this.scriptService.moveBack();
    }
  }

}
