import { Component, OnInit} from '@angular/core';
import { ScriptService } from '../script.service';
import { NgFor, NgIf } from '@angular/common';
import '@fortawesome/fontawesome-free/css/all.css';

interface DivItem {
  title: string;
  content: string;
  link?:string;
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
    {title: 'Linkedin', content:'assets/pictures/linkedin.svg', link:'https://www.linkedin.com/in/l%C3%A9o-delmas-4851b91a2/'},
    {title: 'Github', content:'assets/pictures/github.svg',link:'https://github.com/ldlms'},
  ]

  showContent: { [key: string]: boolean } = {
    'about': false,
    'socials':false
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
