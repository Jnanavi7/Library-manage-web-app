import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Student } from '../model/studmodel';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  studentform: FormGroup;
  studModelObj: Student = new Student();
  studentData!: Student[];   //to store res from getstudents method

  showAdd!: boolean;
  showUpdate!: boolean;
  searchbooksInput!: string;

  constructor(private formbulider: FormBuilder, private studentservice: StudentsService) {

    this.studentform = formbulider.group({});
  }

  ngOnInit(): void {
    this.studentform = this.formbulider.group({
      name: ['',Validators.required],
      branch: ['',Validators.required],
      semester: ['',Validators.required],
      email: ['',Validators.required],
    });

    this.getstudents();
  }

  clickaddstudents() {
    this.studentform.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  addstudents() {
    this.studModelObj.name = this.studentform.value.name;
    this.studModelObj.branch = this.studentform.value.branch;
    this.studModelObj.semester = this.studentform.value.semester;
    this.studModelObj.email = this.studentform.value.email;

    this.studentservice.poststudents(this.studModelObj).subscribe(res => {
      console.log(res);
      alert("Student Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.studentform.reset();
      this.getstudents();
    });
  }

  deletestudents(row: any) {
    this.studentservice.deletestudents(row.id).subscribe(res => {
      alert("Student Deleted");
      this.getstudents();

    })
  }

  getstudents() {
    this.studentservice.getstudents().subscribe(res => {
      this.studentData = res;
    })
  }

  onEdit(row: any) {
    this.studModelObj.id = row.id;
    this.studentform.controls['name'].setValue(row.name);
    this.studentform.controls['branch'].setValue(row.branch);
    this.studentform.controls['semester'].setValue(row.semester);
    this.studentform.controls['email'].setValue(row.email);

    this.showAdd = false;
    this.showUpdate = true;

  }
  updatestudents() {
    this.studModelObj.name = this.studentform.value.name;
    this.studModelObj.branch = this.studentform.value.branch;
    this.studModelObj.semester = this.studentform.value.semester;
    this.studModelObj.email = this.studentform.value.email;
    this.studentservice.updatestudents(this.studModelObj, this.studModelObj.id).subscribe(res => {
      alert("Updated successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.studentform.reset();
      this.getstudents();
    })

  }

  // onSearch(data:any){
  //   let searchname : Student ={
  //     name: " ",
  //     semester: "",
  //     branch: " ",
  //     email: "",
  //     id: 0
  //   };
  //   this.studentservice.searchstudents(data.name).subscribe(res =>{
  //     searchname = res;
  //   })
  //   console.log(searchname);
  //   if(data.name == "Digital signal Processing"){
  //     this.getstudents();
  //   }else{
  //     console.log("no such name");
  //   }
  // }

  searchStudents(event: any) {
    console.log(event.target.value);
   
    if(event.target.value){
      this.studentservice.searchstudents(event.target.value).subscribe(res => {
        // console.log(res);
        this.studentData = res;
      })
    }else{
      this.getstudents();
    }
  }
}





