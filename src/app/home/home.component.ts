import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'Portfolio';
  firstCard: { name: string };
  rightCard: { name: string };
  leftCard: { name: string };
  backCard: { name: string };

  constructor(){
    this.firstCard = { name: "card first-card" };
    this.rightCard = { name: "card right-card" };
    this.leftCard = { name: "card left-card" };
    this.backCard = { name: "card back-card" };
  }

  ngOnInit(){
    this.init();
  }

  init(){}
}
