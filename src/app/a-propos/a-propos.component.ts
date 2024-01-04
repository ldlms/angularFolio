import { Component, OnInit} from '@angular/core';
import { ScriptService } from '../script.service';
import { NgFor, NgIf } from '@angular/common';

interface DivItem {
  title: string;
  content: string;
}



@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.css'
})
export class AProposComponent implements OnInit {

  constructor(private scriptService: ScriptService) {}

  divs: DivItem[] = [
    {title: 'Delmas Léo', content: 'Je recherche avant tout un poste qui me permettra de solidifier mes compétences et me donnera de nouveaux défis à relever.'},

  ]

  showContent: { [key: string]: boolean } = {
    'about': false
  };

  toggleContent(section: string): void {
    this.showContent[section] = !this.showContent[section];
    console.log(this.showContent['about']);
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
