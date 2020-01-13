import { Component, OnInit } from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import * as _ from 'lodash';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: any[];
  xOrO = ['X', 'O'];
  isXNext: boolean;
  winner: string;
  isGameOver;

  constructor(private toastrService: NbToastrService) { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    // randomize the first player
    this.isXNext = _.sample(this.xOrO) === 'X';
    this.winner = null;
    this.isGameOver = false;
  }

  get player() {
    return this.isXNext ? 'X' : 'O';
  }

  makeMove(squareId: number) {
    if (!this.squares[squareId]) {
      this.squares.splice(squareId, 1, this.player);
      this.isXNext = !this.isXNext;
    }

    this.winner = this.calculateWinner();

    // show winner if the game is over
    if (this.winner) {
      this.isGameOver = true;
      this.toastrService.primary('The winner is: ' + this.winner,
        'Game Over', {
        icon: 'bell-outline'
      });
    }
  }

  private calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
