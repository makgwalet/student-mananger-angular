import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { StudentService } from './../student.service';
import { Student } from './../student';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchCriteria:any;
  searchTerm:any;
  students: Student[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private formBuilder: FormBuilder){}

  ngOnInit(): void {
      this.searchCriteria = this.route.snapshot.params['searchCriteria'];
      this.searchTerm = this.route.snapshot.params['searchTerm'];

      this.loadStudents();
  }

  loadStudents(){
    this.studentService.searchStudent(this.searchCriteria,this.searchTerm).subscribe(data => {
      this.students = data;
    });
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
