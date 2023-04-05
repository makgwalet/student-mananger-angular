import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Student } from '../student';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {
  constructor(
    private studentservice: StudentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  selectedCountryCode:any;
  student: Student = new Student();
  studenForm: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    mobile_number: new FormControl(''),
    email_address: new FormControl(''),
    dateOfBirth: new FormControl(''),
    current_score:new FormControl(''),
    countryCode:new FormGroup('')
  });
  submitted = false;

  ngOnInit(): void {
    this.studenForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['',Validators.required],
      mobile_number: ['',[Validators.required, Validators.maxLength(9)]],
      email_address: ['',[Validators.required, Validators.email]],
      dateOfBirth: ['',Validators.required],
      current_score: ['',[Validators.max(100), Validators.min(0), Validators.maxLength(3)]],
      countryCode: ['',Validators.required]
    });
  }

  get studentFormControl() {
    return this.studenForm.controls;
  }

  saveStudent() {
    this.student.mobile_number = this.selectedCountryCode + this.student.mobile_number;
    this.studentservice.createStudent(this.student).subscribe(
      (data) => {
        this.alertService.success('Student deleted successfully');
        console.log(data);
        this.goToSearch();
      },
      (error) => this.alertService.error("Error in deleting student")
    );
  }

  goToSearch() {
    this.router.navigate(['']);
  }

  onSubmit() {
    this.submitted = true;

    if(this.studenForm.invalid){
      return;
    }
    console.log(this.student);
    this.saveStudent();
  }

  onReset(): void {
    this.submitted = false;
    this.studenForm.reset();
  }


}


