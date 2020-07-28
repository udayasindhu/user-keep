import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "notes-app";
  addedMenu: Array<any> = [];
  fileToUpload: File;
  imageUrl: any;
  changeBg() {
    let search = document.getElementById("search");
    if (search.style.backgroundColor != "white") {
      search.style.backgroundColor = "white";
    } else {
      search.style.backgroundColor = "#f1f3f4";
    }
  }
  removeTitle() {
    document.getElementById("title").innerText = "";
  }
  removeSubTitle(event) {
    if (event.key == "Enter") {
      this.addedMenu.push(event.target.value);
      event.target.value = "";
    }
    document.getElementById("subtitle").innerText = "";
  }
  removeItem(event) {
    this.addedMenu.splice(event, 1);
  }
  loadFile(file: FileList) {
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  changeCardBg() {
    let cardBg = document.getElementById("matCard");
    if (cardBg.style.backgroundColor != "azure") {
      cardBg.style.backgroundColor = "azure";
    } else {
      cardBg.style.backgroundColor = "oldlace";
    }
  }
}
