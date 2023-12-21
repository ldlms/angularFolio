import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import particlesJS from 'particles.js';

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

onClickDiv(currentDiv: HTMLElement) {
  if (
    currentDiv.onclick &&
    currentDiv.onclick.arguments[0].target?.className.split(" ")[0] === "card"
  ) {
    const firstChild = currentDiv.firstChild;
    if (firstChild instanceof HTMLElement) {
      this.onClickH1(firstChild);
    }
  }
  this.move(currentDiv);
}

onClickH1(currentDiv: HTMLElement) {
  const parentNode = currentDiv.parentNode as HTMLElement;
  if (parentNode.className.split(" ")[2] === "selected") {
    this.unexpand(currentDiv);
  } else {
    this.expand(currentDiv);
  }
}

expand(currentDiv: HTMLElement) {
  const parentNode = currentDiv.parentNode as HTMLElement | null;
  if (parentNode && parentNode.className === this.firstCard.name) {
    parentNode.className = parentNode.className + " selected";
  }
}

unexpand(currentDiv: HTMLElement) {
  const parentNode = currentDiv.parentNode as HTMLElement | null;
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
  let acc = document.getElementsByClassName("accordion");
  
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function(this: HTMLElement) {
      if (this instanceof HTMLElement) {
        this.classList.toggle("active");

        let panel = this.nextElementSibling;
        if (panel instanceof HTMLElement) {
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        }
      }
    });
  }
}

init(){
  this.initAccordion();
}

// init() {
//     this.initAccordion();
//     particlesJS("particles-js", {
//       particles: {
//         number: { value: 100, density: { enable: true, value_area: 500 } },
//         color: { value: "#8c8c8c" },
//         shape: {
//           type: "circle",
//           stroke: { width: 0, color: "#000000" },
//           polygon: { nb_sides: 3 },
//           image: { src: "img/github.svg", width: 100, height: 100 },
//         },
//         opacity: {
//           value: 0.5,
//           random: false,
//           anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
//         },
//         size: {
//           value: 5,
//           random: true,
//           anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
//         },
//         line_linked: {
//           enable: true,
//           distance: 100,
//           color: "#8c8c8c",
//           opacity: 0.4,
//           width: 1.8,
//         },
//         move: {
//           enable: true,
//           speed: 0.4,
//           direction: "none",
//           random: false,
//           straight: false,
//           out_mode: "out",
//           bounce: false,
//           attract: { enable: false, rotateX: 600, rotateY: 1200 },
//         },
//       },
//       interactivity: {
//         detect_on: "canvas",
//         events: {
//           onhover: { enable: false, mode: "bubble" },
//           onclick: { enable: false, mode: "push" },
//           resize: true,
//         },
//         modes: {
//           grab: { distance: 400, line_linked: { opacity: 1 } },
//           bubble: { distance: 200, size: 7, duration: 2, opacity: 8, speed: 3 },
//           repulse: { distance: 100, duration: 0.4 },
//           push: { particles_nb: 4 },
//           remove: { particles_nb: 2 },
//         },
//       },
//       retina_detect: true,
//     });
}




