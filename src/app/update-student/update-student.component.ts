import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { StudentService } from './../student.service';
import { Student } from './../student';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  studentId: number;
  student: Student;
  studentForm: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    mobile_number: new FormControl(''),
    email_address: new FormControl(''),
    dateOfBirth: new FormControl('')
  });
  submitted = false;
  countryCode: any = ['+27', '+1', '+2', '+3']
  selectedCountryCode:any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private formBuilder: FormBuilder) { }


    ngOnInit(): void {
      this.studentId = this.route.snapshot.params['id'];

      this.studentService.getStudentById(this.studentId)
      .subscribe(student => this.student = student)

      this.studentForm = this.formBuilder.group({
        first_name: ['', Validators.required],
      last_name: ['',Validators.required],
      mobile_number: ['',[Validators.required, Validators.maxLength(9)]],
      email_address: ['',[Validators.required, Validators.email]],
      dateOfBirth: ['',Validators.required]
      });
    }

    get studentFormControl() {
      return this.studentForm.controls;
    }

    onSubmit() {
      this.submitted = true;

      if(this.studentForm.invalid){
        return;
      }
      console.log(this.student);
      this.updateStudent();
    }

    updateStudent(){
      this.studentService.updateStudent(this.studentId,this.student)
        .subscribe(data => {console.log(data);
        this.goToSearchPage()},
        error => console.error(error));
    }

    goToSearchPage(){
      this.router.navigate(['']);
    }

    onReset(): void {
      this.submitted = false;
      this.goToSearchPage();
    }
}
