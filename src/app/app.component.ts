import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "notes-app";
  addedItems: Array<any> = [];
  fileToUpload: File;
  imageUrl: any;
  cardsList: any = [];
  cardForm: FormGroup;
  titleError: string = "";
  searchText: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      title: new FormControl(),
      content: new FormControl(),
    });
  }

  changeSearchBarColor() {
    let search = document.getElementById("search");
    if (search.style.backgroundColor != "white") {
      search.style.backgroundColor = "white";
    } else {
      search.style.backgroundColor = "#f1f3f4";
    }
  }

  searchItems(event) {
    this.searchText = event.target.value;
  }

  refreshTitle() {
    if (this.cardForm.value.title) {
      document.getElementById("title").style.display = "none";
    } else {
      document.getElementById("title").style.display = "block";
    }
  }

  refreshContent() {
    if (this.cardForm.value.content) {
      document.getElementById("content").style.display = "none";
    } else {
      document.getElementById("content").style.display = "block";
    }
  }

  addItem(event) {
    let content = this.cardForm.value.content;
    this.titleError = "";
    if (event.key == "Enter" && content) {
      if (this.addedItems.filter((item) => item.text === content).length > 0) {
        this.titleError = content + " already added!";
      } else {
        this.addedItems.push({
          text: content,
        });
      }
      this.cardForm.controls.content.setValue("");
    }
    this.refreshContent();
  }

  removeItem(index) {
    this.addedItems.splice(index, 1);
  }

  removeCard(event) {
    this.cardsList.filter((card: any) => {
      if (card.title === event.title) {
        let index = this.cardsList.indexOf(card);
        this.cardsList.splice(index, 1);
      }
    });
  }

  loadImage(imageFile: FileList) {
    console.log("Image : ", imageFile);
    this.fileToUpload = imageFile.item(0);
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

  close() {
    let title = this.cardForm.value.title;
    let content = this.cardForm.value.content;
    if (
      content &&
      this.addedItems.filter((item) => item.text === content).length == 0
    ) {
      this.addedItems.push({
        text: content,
      });
    }
    if (title && this.addedItems.length > 0) {
      this.titleError = "";
      if (this.imageUrl) {
        this.cardsList.push({
          title: title,
          content: this.addedItems,
          image: this.imageUrl,
          displayImg: true,
        });
      } else {
        this.cardsList.push({
          title: title,
          content: this.addedItems,
          displayImg: false,
        });
      }
      this.clearAll();
    } else if (!title && this.addedItems.length > 0) {
      this.titleError = "Please enter the title!";
    } else if (title) {
      this.titleError = "Please add atleast one content!";
    } else {
      this.titleError = "Title and content are required!";
    }
  }

  clearAll() {
    this.cardForm.controls.title.setValue("");
    this.cardForm.controls.content.setValue("");
    this.addedItems = [];
    this.refreshTitle();
    this.refreshContent();
    this.imageUrl = "";
  }
}