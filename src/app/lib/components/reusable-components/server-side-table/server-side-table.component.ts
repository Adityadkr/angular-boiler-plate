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
  @Input() customBtn: Array<any> = []

  @Input() showViewBtn: boolean = false
  @Input() showEditBtn: boolean = false
  @Input() showDeleteBtn: boolean = false

  @Output() onView: any = new EventEmitter<any>();
  @Output() onEdit: any = new EventEmitter<any>();
  @Output() onDelete: any = new EventEmitter<any>();
  @Output() onCustom: any = new EventEmitter<any>();
  //@Output() onDraw: any = new EventEmitter<any>();
  DataKeys: Array<any> = []
  columns: Array<any> = []
  tblId: string = ""
  constructor() { }

  ngOnInit(): void {
    this.url = environment.apiURL + this.url;
    this.tblId = "#" + this.id;

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
          var sort = d.columns[d.order[0].column].data == 0 ? d.columns[1].data : d.columns[d.order[0].column].data;
          return JSON.stringify({
            "draw": d.draw,
            "length": d.length,
            "search": d.search.value,
            "start": d.start,
            "page": info.page,
            "sort": sort,
            "sortDir": d.order[0].dir,

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


    $(this.tblId).on('click', 'button', function () {
      debugger
      if ($(this).hasClass('view')) {

        that.view($(this).data('row'))
      }
      else if ($(this).hasClass('edit')) {
        that.edit($(this).data('row'))
      }
      else if ($(this).hasClass('delete')) {
        that.delete($(this).data('row'))
      }
      else {
        that.custom($(this).html(), $(this).data('row'))
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
            html = html + '<button  class="btn btn-light m-1 view" data-row=' + encodeURIComponent(JSON.stringify(row)) + '>View</button>'
          }
          if (that.showEditBtn) {
            html = html + '<button  data-row=' + encodeURIComponent(JSON.stringify(row)) + ' class="btn btn-primary m-1 edit" >Edit</button>'
          }

          if (that.showDeleteBtn) {
            html = html + '<button  class="btn btn-danger m-1 delete" data-row=' + encodeURIComponent(JSON.stringify(row)) + '>Delete</button>'

          }
          if (that.customBtn.length > 0) {
            that.customBtn.forEach(element => {
              if (element.hasOwnProperty("condition")) {
                

                if(eval("row."+element.condition))
                {
                  var custBtn = '<button class="' + element.class + ' m-1" data-row='+ encodeURIComponent(JSON.stringify(row)) +' >' + element.btnTitle + '</button>'
                  html = html + custBtn;
                }
              }
              else { 
                var custBtn = '<button class="' + element.class + ' m-1"  data-row='+ encodeURIComponent(JSON.stringify(row)) +'>' + element.btnTitle + '</button>'
                html = html + custBtn;
              }
            });
          }
          return html

        }
      })
    debugger


  }
  edit(item: any) {
    this.onEdit.emit(JSON.parse(decodeURIComponent(item)))
  }
  view(item: any) {

    this.onView.emit(JSON.parse(decodeURIComponent(item)))
  }
  delete(item: any) {
    this.onDelete.emit(JSON.parse(decodeURIComponent(item)))
  }
  custom(html: any, item: any) {
    debugger
    item = JSON.parse(decodeURIComponent(item))
    item.btn = html;
    this.onCustom.emit(item)
  }

}