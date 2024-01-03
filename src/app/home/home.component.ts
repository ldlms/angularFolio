import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProjetsComponent } from '../projets/projets.component';
import { FormationComponent } from '../formation/formation.component';
import { ParcoursAnterieurComponent } from '../parcours-anterieur/parcours-anterieur.component';
import { AProposComponent } from '../a-propos/a-propos.component';
// import particlesJS from 'particles.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ProjetsComponent,FormationComponent,ParcoursAnterieurComponent,AProposComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {}

 





