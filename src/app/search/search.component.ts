import { StudentService } from './../student.service';
import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../student';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  @Input()
  searchTerm?:String;
  students: Student[];
  selectedsearchCriteria:'';
  submitted = false;
  currentPage: number = 1;
  count: number = 5;

  searchForm:FormGroup = new FormGroup({
    searchCriteria: new FormControl(''),
    termSearched: new FormGroup('')
  });

  get searchFormControl(){
    return this.searchForm.controls;
  }


  constructor(private studentService: StudentService,
     private router:Router,
     private matIconModule:MatIconModule,
     private formBuilder: FormBuilder ){}

  ngOnInit(): void {
    this.loadStudents();

    this.searchForm = this.formBuilder.group({
      searchCriteria : ['',Validators.required],
      termSearched : ['',Validators.required]
    });
  }


   loadStudents(){
    this.studentService.getStudentList().subscribe(data => {
      this.students = data;
    });
  }

  searchStudent(){
    this.submitted = true;

    if(this.searchForm.invalid){
      return;
    }

    this.router.navigate(['search-result',this.selectedsearchCriteria,this.searchTerm]);
  }

  addScore(id:number){
    this.router.navigate(['add-score',id]);
  }

  updateStudent(id:number){
    this.router.navigate(['update-student',id]);
  }

  deleteStudent(id:number){
    this.router.navigate(['/delete-student',id]);
  }
}
