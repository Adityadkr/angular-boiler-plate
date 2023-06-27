import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LayoutService } from 'src/app/lib/services/layout-service/layout.service';
import { StorageService } from 'src/app/lib/services/storage-service/storage.service';
import { ApiHelperService } from '../../../lib/services/api-helpers/api-helper.service';
import { webSocket } from 'rxjs/webSocket';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tableColumn: Array<any> = [
    // { title: 'Sr.No' },
    { title: 'First Name', data: 'firstname' },
    { title: 'Last Name', data: 'lastname' },
    { title: 'Twitter.', data: 'twitter' }
  ]
  tableColumn1: Array<any> = [
    // { title: 'Sr.No' },
    { title: 'Role Code', data: 'ROLE_CODE' },
    { title: 'Role Name', data: 'ROLE_NAME' },
    { title: 'Type', data: 'TYPE' }

  ]
  customBtnColumns: Array<any> = [
    // { title: 'Sr.No' },
    { type: "button", btnTitle: 'Approve', class: 'btn btn-info', condition: "ROLE_CODE == 'IMP'" },
    { type: "button", btnTitle: 'Reject', class: 'btn btn-default', condition: "ROLE_CODE == 'EXP'" },
    { type: "button", btnTitle: 'Amend', class: 'btn btn-success', condition: "ROLE_CODE == 'SA'" }


  ]
  subject = webSocket("ws://192.168.1.106:8080/topic/greetings");
  tableData: Array<any> = [];
  url: string = 'http://localhost:8070/role/getallrolesp';
  //= [{ "firstname": "Aditya", "lastname": "Deokar", "twitter": "@adityadeokar" }, { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" }]
  frm: any;
  constructor(private api: ApiHelperService, private fb: FormBuilder, private _layoutService: LayoutService, private storageService: StorageService) { }

  ngOnInit(): void {
    // this.postApi();
    // this.getApi();
    this.frm = this.fb.group({
      date1: [""],
      date2: [""]
    })
    this.frm.get('date2').setValue('2023-12-31 14:20')
    this.storageService.setLocalStorageItem("bacchi", "Saurabh")
    this.tableData.length = 0
    setTimeout(() => {

      this.tableData = [
        { "firstname": "Aditya", "lastname": "Deokar", "twitter": "@adityadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
      ]
      // var data:any = {
      //   "draw": 1,
      //   "recordsTotal": 100,
      //   "recordsFiltered": 100,
      //   "data": this.tableData
      // }
      // this.tableData = data;

    }, 3000);

    this.subject.asObservable().subscribe(
      msg => console.log('message received: ' + msg),
      // Called whenever there is a message from the server    
      err => console.log(err),
      // Called if WebSocket API signals some kind of error    
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)  
    );
  }
  submit() {
    alert(JSON.stringify(this.frm.value))
  }
  add() {
    setTimeout(() => {

      this.tableData = [
        { "firstname": "Aditya", "lastname": "Deokar", "twitter": "@adityadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },

      ]
      // this.tableData.push({ "firstname": "Prachi", "lastname": "Gaikwad", "twitter": "@prachi" })
      var data: any = {
        "draw": 1,
        "recordsTotal": 100,
        "recordsFiltered": 100,
        "data": this.tableData
      }
      this.tableData = data;
    }, 3000);
  }
  view(item: any) {
    alert(JSON.stringify(item))
  }
  delete(item: any) {

    this.tableData.splice(this.tableData.indexOf(this.tableData.find(x => x.firstname == item.firstname), 1))
  }
  custom(item: any) {
    alert(JSON.stringify(item))
  }
  ngAfterContentInit(): void {
    this._layoutService.setConfig({ header: true, footer: true, sidebar: false })

  }
  ngOnDestroy(): void {
    this._layoutService.resetConfig();
  }
  postApi() {

    this.api.post("http://localhost:8070/product/insert").subscribe(resp => {
      debugger
    })
  }

  getApi() {

    this.api.get("http://localhost:8070/product/list").subscribe(resp => {
      debugger
    })
  }

  Draw(e: any) {
    debugger
    alert(JSON.stringify(e))
  }
  sendToServer() {
    this.subject.subscribe();
    //  this.subject.next()
    this.subject.complete();

  }
}

