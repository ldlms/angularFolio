import { Component, AfterViewInit, ElementRef, ViewChild, QueryList, Renderer2 } from '@angular/core';
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
export class HomeComponent implements AfterViewInit {
  title = 'Portfolio';
  firstCard: { name: string };
  rightCard: { name: string };
  leftCard: { name: string };
  backCard: { name: string };
  accordion: HTMLCollectionOf<Element>;

  constructor(private renderer: Renderer2){
    this.firstCard = { name: "card first-card" };
    this.rightCard = { name: "card right-card" };
    this.leftCard = { name: "card left-card" };
    this.backCard = { name: "card back-card" };
    this.accordion = document.getElementsByClassName("card")
  }


  ngAfterViewInit() {
    // Utilisation de ngAfterViewInit pour garantir que les éléments sont rendus avant d'essayer de les sélectionner
    if (this.accordion) {
      console.log("Accordéon présent");
      this.initAccordion();
    }
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
  console.log(parentNode && parentNode.className);
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
  console.log('Nombre d\'éléments .accordion : ', this.accordion.length);
  const accordionArray = Array.from(this.accordion);
  accordionArray.forEach((element: Element) => {
    const nativeElement = element.nativeElement;
    console.log('Élément trouvé : ', nativeElement);
    this.renderer.listen(nativeElement, 'click', () => {
      console.log('Clic sur l\'élément : ', nativeElement);
      nativeElement.classList.toggle('active');
      const panel = nativeElement.nextElementSibling as HTMLElement;
      console.log('Style display : ', panel.style.display);
      if (panel.style.display === 'block' || getComputedStyle(panel).display === 'block') {
        this.renderer.setStyle(panel, 'display', 'none');
      } else {
        this.renderer.setStyle(panel, 'display', 'block');
      }
    });
  });
}
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





