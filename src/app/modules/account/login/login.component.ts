import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LayoutService } from 'src/app/lib/services/layout-service/layout.service';
import { StorageService } from 'src/app/lib/services/storage-service/storage.service';
import { ApiHelperService } from '../../../lib/services/api-helpers/api-helper.service';

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
    { title: 'Twitter.', data: 'twitter' }]

  tableKeys: Array<any> = ["firstname", "lastname", "twitter"]
  tableData: Array<any> = [];
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
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" },
        { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" }
      ]

    }, 3000);
  }
  submit() {
    alert(JSON.stringify(this.frm.value))
  }
  add() {
    this.tableData.push({ "firstname": "Aditya", "lastname": "Deokar", "twitter": "@adityadeokar" })
  }
  view(item: any) {
    alert(JSON.stringify(item))
  }
  delete(item: any) {

    this.tableData.splice(this.tableData.indexOf(this.tableData.find(x => x.firstname == item.firstname), 1))
  }
  ngAfterContentInit(): void {
    this._layoutService.setConfig({ header: true, footer: true, sidebar: false })

  }
  ngOnDestroy(): void {
    this._layoutService.resetConfig();
  }
  


}
