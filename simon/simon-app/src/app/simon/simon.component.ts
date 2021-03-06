import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-simon',
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.css']
})
export class SimonComponent implements OnInit {
  counter = 0;
  yellowButtonColor: String;
  blueButtonColor: String;
  greenButtonColor: String;
  redButtonColor: String;
  gameStarted: boolean;
  isUserTurn: boolean;
  rounds: number;
  guide: number[];
  userInput: number[];
  aSound = new Howl({
    src: '/assets/audio/notes/a.wav'
  });
  cSound = new Howl({
    src: '/assets/audio/notes/c.wav'
  });
  eSound = new Howl({
    src: '/assets/audio/notes/e.wav'
  });
  gSound = new Howl({
    src: '/assets/audio/notes/g.wav'
  });
  correctSound = new Howl({
    src: '/assets/audio/correct.mp3'
  });
  wrongSound = new Howl({
    src: '/assets/audio/wrong.wav'
  });

  constructor() {
    this.yellowButtonColor = '#DFC323';
    this.blueButtonColor = '#283676';
    this.greenButtonColor = '#00783E';
    this.redButtonColor = '#C92127';
    this.gameStarted = false;
    this.isUserTurn = false;
    this.rounds = 0;
    this.guide = [];
    this.userInput = [];
  }

  ngOnInit() {
    setTimeout(() => {
      this.startGame();
    }, 5000);
  }

  click(color) {
    if (!this.isUserTurn) return;
    switch (color) {
      case 'red':
        this.userInput.push(0);
        this.gSound.play();
        break;
      case 'green':
        this.userInput.push(1);
        this.eSound.play();
        break;
      case 'yellow':
        this.userInput.push(2);
        this.aSound.play();
        break;
      case 'blue':
        this.userInput.push(3);
        this.cSound.play();
        break;
    }

    if (this.userInput.length === this.guide.length) {
      this.isUserTurn = false;
      if (JSON.stringify(this.userInput) === JSON.stringify(this.guide)) {
        // Correct
        this.correctSound.play();
        console.log('Correct');
        this.counter++;
        this.generateSequence();
      } else {
        // Wrong
        this.wrongSound.play();
        console.log('Wrong');
        console.log(JSON.stringify(this.userInput), JSON.stringify(this.guide));
        this.gameStarted = false;
      }
    }
  }

  private startGame() {
    this.gameStarted = true;
    this.generateSequence();
  }

  private generateSequence() {
    this.guide.push(Math.round(Math.random() * 3));
    this.printSequence();
  }

  private printSequence() {
    let countPrints = 0;
    const interval = setInterval(() => {
      this.resetColors();
      console.log(countPrints, this.guide[countPrints]);
      if (countPrints < this.guide.length) {
        switch (this.guide[countPrints]) {
          case 0:
            this.redButtonColor = '#f9262d';
            this.gSound.play();
            break;
          case 1:
            this.greenButtonColor = '#00cb6f';
            this.eSound.play();
            break;
          case 2:
            this.yellowButtonColor = '#ffe225';
            this.aSound.play();
            break;
          case 3:
            this.blueButtonColor = '#3b4abd';
            this.cSound.play();
            break;
        }
        countPrints++;
      } else {
        clearInterval(interval);
        this.userInput = [];
        this.isUserTurn = true;
      }
    }, 2000);
  }

  private resetColors() {
    this.yellowButtonColor = '#DFC323';
    this.blueButtonColor = '#283676';
    this.greenButtonColor = '#00783E';
    this.redButtonColor = '#C92127';
  }

}
