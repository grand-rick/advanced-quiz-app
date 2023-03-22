import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {
  username: string = '';

  constructor () {}

  ngOnInit(): void {}

  saveHighScore(event: MouseEvent) : {
    const selectedChoice = event.target;
    alert("Saved");
  }
}
