import { Score } from './../score';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { StudentService } from './../student.service';
import { Student } from '../student';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-score',
  templateUrl: './add-score.component.html',
  styleUrls: ['./add-score.component.css'],
})
export class AddScoreComponent implements OnInit {
  id: number;
  score: Score;
  student: Student = new Student();
  studentScoreForm: FormGroup = new FormGroup({
    score: new FormControl('')
  });
  submitted = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.score = new Score();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.studentScoreForm = this.formBuilder.group({
      score: [
        '',
        [Validators.max(100),
        Validators.min(0),
        Validators.required]
      ],
    });
  }

  get studentScoreFormControl() {
    return this.studentScoreForm.controls;
  }

  goToSearch() {
    this.router.navigate(['']);
  }

  createStudentScore() {
    this.studentService.createScore(this.id, this.score).subscribe(
      (data) => {
        console.log(data);
        this.goToSearch();
      },
      (error) => console.error(error)
    );
  }

  onReset(): void {
    this.submitted = false;
    this.goToSearchPage();
  }

  goToSearchPage(){
    this.router.navigate(['']);
  }

  onSubmit() {
    this.submitted = true;
    if(this.studentScoreForm.invalid){
      return;
    }

    console.log(this.createStudentScore);
    this.createStudentScore();
  }
}
