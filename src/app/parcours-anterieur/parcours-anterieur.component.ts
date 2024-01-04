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

  constructor(private scriptService: ScriptService) {}

  divs: DivItem[] = []

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
