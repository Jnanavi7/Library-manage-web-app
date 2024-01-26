import { Component, OnInit } from '@angular/core';
import { BookserviceService } from '../services/bookservice.service';
import { Book } from '../model/model';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {

  bookData!: Book[];
  imagPath: string = "../../assets/";

  constructor(private bookservice: BookserviceService) { }

  ngOnInit() {
    this.getbooks();
  }

  getbooks() {
    this.bookservice.getbooks().subscribe(res => {
      this.bookData = res;
    })
  }

  searchBooks(event: any) {
    console.log(event.target.value);
    if (event.target.value) {
      this.bookservice.searchBooks(event.target.value).subscribe(res => {
        // console.log(res);
        this.bookData = res;
      })
    } else {
      this.getbooks();
    }
  }
}
