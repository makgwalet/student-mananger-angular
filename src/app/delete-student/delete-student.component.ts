import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from './../student.service';
import { Student } from './../student';
import { AlertService } from '../alert-service.service';


@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {

  studentId: number;
  student: Student;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private alertService: AlertService) { }

    ngOnInit() {
      this.studentId  = this.route.snapshot.params['id'];;
      this.studentService.getStudentById(this.studentId)
        .subscribe(student => {
          this.student = student;
        });
    }

    onDelete() {
      this.studentService.deleteStudent(this.studentId)
        .subscribe(() => {
          this.alertService.success('Student deleted successfully');
          this.router.navigate(['/search']);
        },
        (error) => this.alertService.error("Error in deleting student")
        );
    }

    onReset(): void {
      this.goToSearchPage();
    }

    goToSearchPage(){
      this.router.navigate(['']);
    }




}
