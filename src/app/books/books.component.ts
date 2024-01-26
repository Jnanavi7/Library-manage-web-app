import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Book } from '../model/model';
import { BookserviceService } from '../services/bookservice.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  bookform: FormGroup;
  bookModelObj: Book = new Book();
  bookData!: Book[];   //to store res from getbooks method

  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder, private bookservice: BookserviceService) {
    this.bookform = formbuilder.group({});
  }

  ngOnInit(): void {
    this.bookform = this.formbuilder.group({
      bookname: ['',Validators.required],
      author: ['',Validators.required],
      edition: ['',Validators.required],
      branch: ['',Validators.required],
    });
    this.getbooks();
  }

  clickaddbooks() {
    this.bookform.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  addbooks() {
    this.bookModelObj.bookname = this.bookform.value.bookname;
    this.bookModelObj.author = this.bookform.value.author;
    this.bookModelObj.edition = this.bookform.value.edition;
    this.bookModelObj.branch = this.bookform.value.branch;

    this.bookservice.postbooks(this.bookModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Book Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.bookform.reset();
      });
  }


  deletebooks(row: any) {
    this.bookservice.deletebooks(row.id).subscribe(res => {
      alert("Book Deleted");
      this.getbooks();
    })
  }


  getbooks() {
    this.bookservice.getbooks().subscribe(res => {
      this.bookData = res;
    })
  }


  onEdit(row: any) {
    this.bookModelObj.id = row.id;
    this.bookform.controls['bookname'].setValue(row.bookname);
    this.bookform.controls['author'].setValue(row.author);
    this.bookform.controls['edition'].setValue(row.edition);
    this.bookform.controls['branch'].setValue(row.branch);

    this.showAdd = false;
    this.showUpdate = true;

  }
  updatebooks() {
    this.bookModelObj.bookname = this.bookform.value.bookname;
    this.bookModelObj.author = this.bookform.value.author;
    this.bookModelObj.edition = this.bookform.value.edition;
    this.bookModelObj.branch = this.bookform.value.branch;
    this.bookservice.updatebooks(this.bookModelObj, this.bookModelObj.id).subscribe(res => {
      alert("Updated successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.bookform.reset();
      this.getbooks();
    })

  }


  searchBooks(event :any){
    console.log(event.target.value);
    if(event.target.value){
      this.bookservice.searchBooks(event.target.value).subscribe(res => {
        // console.log(res);
        this.bookData = res;
      })
    }else{
      this.getbooks();
    }
  }
}




