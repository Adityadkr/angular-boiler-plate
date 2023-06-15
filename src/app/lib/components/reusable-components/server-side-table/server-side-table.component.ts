import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-server-side-table',
  templateUrl: './server-side-table.component.html',
  styleUrls: ['./server-side-table.component.css']
})
export class ServerSideTableComponent implements OnInit {


  @Input() url: string = '';
  @Input() id: string = '';
  @Input() tableColumn: Array<any> = []

  @Input() showViewBtn: boolean = false
  @Input() showEditBtn: boolean = false
  @Input() showDeleteBtn: boolean = false

  @Output() onView: any = new EventEmitter<any>();
  @Output() onEdit: any = new EventEmitter<any>();
  @Output() onDelete: any = new EventEmitter<any>();
  //@Output() onDraw: any = new EventEmitter<any>();
  DataKeys: Array<any> = []
  columns: Array<any> = []
  tblId:string=""
  constructor() { }

  ngOnInit(): void {
    this.url = environment.apiURL + this.url;
    this.tblId = "#"+this.id;

  }
  ngAfterViewInit(): void {
    let that = this;

    this.prepareDtOptions();
    var table = $(this.tblId).DataTable({
      paging: true,
      serverSide: true,
      processing: true,

      ajax: {
        url: this.url,
        method: "POST",
        contentType: "application/json",
        "dataSrc": function (json) {
          debugger
          // json  =
          // {"draw":1,
          // "recordsTotal":32,
          // "recordsFiltered":32,
          // "data":{"data":json.RESPONSE_MESSAGE_DETAILS.DATA}}
          return json.data;
        },
        data: function (d) {
          debugger
          var info = $(that.tblId).DataTable().page.info();
          var sort = d.columns[d.order[0].column].data ==0 ? d.columns[1].data:d.columns[d.order[0].column].data;
          return JSON.stringify({
            "draw": d.draw,
            "length": d.length,
            "search": d.search.value,
            "start": d.start,
            "page": info.page,
            "sort":sort,
            "sortDir":d.order[0].dir,

          })
        },
        error: function (e) {
          return JSON.stringify({
            "draw": 1,
            "length": 10,
            "search": "",
            "start": 0,
            "page": 0
          })
        }
      },

      orderMulti: false, //Multi column order is disabled

      columns: this.columns
    });
    // $('.dataTables_filter input')
    //   .off()
    //   .on('keyup', function (e) {
    //     var value =(e.target as HTMLInputElement).value.trim()
    //     if(value.length > 2){

    //       $('#example').DataTable().search((e.target as HTMLInputElement).value.trim(), false, false).draw();
    //     }
    //     else{
    //     table.draw();
    //     }
    //   });
    
    $(this.tblId).on('click', 'button', function () {
      debugger
      if ($(this).hasClass('view')) {

        that.view(JSON.stringify($(this).data('row')))
      }
      else if ($(this).hasClass('edit')) {
        that.edit(JSON.stringify($(this).data('row')))
      }
      else if ($(this).hasClass('delete')) {
        that.delete(JSON.stringify($(this).data('row')))
      }
    });
  }
  ngOnChanges(): void {
    let that = this;

    this.prepareDtOptions();
    var table = $(this.tblId).DataTable({
      paging: true,
      serverSide: true,
      processing: true,

      ajax: {
        url: this.url,
        method: "POST",
        contentType: "application/json",
        "dataSrc": function (json) {
          debugger
          // json  =
          // {"draw":1,
          // "recordsTotal":32,
          // "recordsFiltered":32,
          // "data":{"data":json.RESPONSE_MESSAGE_DETAILS.DATA}}
          return json.data;
        },
        data: function (d) {
          debugger
          var info = $(that.tblId).DataTable().page.info();
          var sort = d.columns[d.order[0].column].data ==0 ? d.columns[1].data:d.columns[d.order[0].column].data;
          return JSON.stringify({
            "draw": d.draw,
            "length": d.length,
            "search": d.search.value,
            "start": d.start,
            "page": info.page,
            "sort":sort,
            "sortDir":d.order[0].dir,

          })
        },
        error: function (e) {
          return JSON.stringify({
            "draw": 1,
            "length": 10,
            "search": "",
            "start": 0,
            "page": 0
          })
        }
      },

      orderMulti: false, //Multi column order is disabled

      columns: this.columns
    });
    // $('.dataTables_filter input')
    //   .off()
    //   .on('keyup', function (e) {
    //     var value =(e.target as HTMLInputElement).value.trim()
    //     if(value.length > 2){

    //       $('#example').DataTable().search((e.target as HTMLInputElement).value.trim(), false, false).draw();
    //     }
    //     else{
    //     table.draw();
    //     }
    //   });
    
    $(this.tblId).on('click', 'button', function () {
      debugger
      if ($(this).hasClass('view')) {

        that.view(JSON.stringify($(this).data('row')))
      }
      else if ($(this).hasClass('edit')) {
        that.edit(JSON.stringify($(this).data('row')))
      }
      else if ($(this).hasClass('delete')) {
        that.delete(JSON.stringify($(this).data('row')))
      }
    });
  }
  prepareDtOptions() {
    debugger
    let that = this;
    this.columns = []
    this.columns.push({
      render: function (data: any, type: any, full: any, meta: any) {

        return meta.row + meta.settings._iDisplayStart + 1;
      }
    }
    )
    this.columns = this.columns.concat(this.tableColumn)
    this.columns.push(
      {
        title: 'Action',

        render: function (data: any, type: any, row: any, full: any, meta: any) {
          var html = ""
          if (that.showViewBtn) {
            html = html + '<button  class="btn btn-light m-1 view" data-row=' + JSON.stringify(row) + '>View</button>'
          }
          if (that.showEditBtn) {
            html = html + '<button *ngIf="showEditBtn" data-row=' + JSON.stringify(row) + ' class="btn btn-primary m-1 edit" (click)="edit(' + row + ')">Edit</button>'
          }

          if (that.showDeleteBtn) {
            html = html + '<button *ngIf="showDeleteBtn" data-row=' + JSON.stringify(row) + ' class="btn btn-danger m-1 delete"(click)="delete(' + row + ')">Delete</button>'
          }
          return html

        }
      })

  }
  edit(item: any) {
    this.onEdit.emit(item)
  }
  view(item: any) {

    this.onView.emit(item)
  }
  delete(item: any) {
    this.onDelete.emit(item)
  }

}