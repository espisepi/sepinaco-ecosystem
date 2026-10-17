import { Component, OnInit } from "@angular/core";
import { App } from "../core";

@Component({
  selector: "three",
  templateUrl: "./three.component.html",
  styleUrl: "./three.component.scss",
})
export class ThreeComponent implements OnInit {
  public ngOnInit(): void {
    App.start();
  }
}
