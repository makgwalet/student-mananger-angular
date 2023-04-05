import { Student } from './student';
import { Score } from './score';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private httpClient:HttpClient) { }

  getStudentById(id:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}getStudent/${id}`);
  }

  getStudentList():Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.baseUrl}`+'students');
  }

  createStudent(student:Student):Observable<object>{
    return this.httpClient.post(`${this.baseUrl}`+'createStudent',student);
  }

  deleteStudent(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}deleteStudent/${id}`);
  }

  updateStudent(id:number, student:Student):Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}updateEmployee/${id}`,student);
  }

  createScore(id:number,score:Score):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}createScore/${id}`,score);
  }

  searchStudent(searchCriteria:String, searchTerm:String):Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.baseUrl}searchStudent/${searchCriteria}/${searchTerm}`);
  }


}
