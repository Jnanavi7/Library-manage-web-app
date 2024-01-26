import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BooksComponent } from './books/books.component';
import { StudentsComponent } from './students/students.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { SearchBooksComponent } from './search-books/search-books.component';

const routes: Routes = [
  {
    path:'',component:HomepageComponent
  },
  {
    path:'books',component:BooksComponent
  },
  {
    path:'students',component:StudentsComponent
  },
  {
    path:'adminlogin',component:AdminloginComponent
  },
  {
    path:'searchBooks',component:SearchBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
