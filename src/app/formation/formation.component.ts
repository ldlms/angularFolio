import { Component, AfterViewInit, ElementRef, ViewChild,ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { ScriptService } from '../script.service';
import { NgFor,NgIf } from '@angular/common';

interface DivItem {
  title: string;
  content: string;
  link?:string;
  link2?:string;
}

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.css'
})
export class FormationComponent {

  constructor(private scriptService: ScriptService) {}

  divs: DivItem[] = [
    {title:"Ma formation au pôle numérique de l'ADRAR",content:"J'ai choisi, afin de concrétiser mon projet de réorientation dans les métiers du numérique, de compléter une formation au pôle numérique de l'ADRAR, cette formation de neuf mois, cloturée par un stage de deux mois, m'a permis d'acquérir de solides bases en developpement d'applications web/web mobile. "},
    {title:"Projet de fin de formation",content:"Le stage de fin de formation, effectué au sein d'une entreprise d'évènementiel, m'a permis de concevoir et de réaliser un site vitrine. La réalisation de ce site s'est accompagnée de la redaction d'un mémoire détaillant les différentes étapes du processus.",link:'assets/pictures/pdf_logo.png',link2:'assets/download/memoire_delmas.pdf'}
  ]

  showContent: { [key: string]: boolean } = {
    'presentation': false,
    'stage':false
  };

  toggleContent(section: string): void {
    this.showContent[section] = !this.showContent[section];
  }

  ngOnInit(): void {
    
    this.scriptService;
    
  }
  
  onClickH1(event:MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const parentNode = clickedElement.parentNode as HTMLElement;
    if (parentNode.className.split(" ")[2] === "selected") {
      this.scriptService.unexpand(event);
    } else {
      this.scriptService.expand(event);
    }
  }
  
  onClickDiv(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    this.scriptService.move(clickedElement);
  }
}
