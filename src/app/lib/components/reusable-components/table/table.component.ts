import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { debug } from 'console';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, AfterViewInit {

  @Input() tableData: Array<any> = []
  @Input() tableColumn: Array<any> = []
 
  @Input() showViewBtn: boolean = false
  @Input() showEditBtn: boolean = false
  @Input() showDeleteBtn: boolean = false

  @Output() onView: any = new EventEmitter<any>();
  @Output() onEdit: any = new EventEmitter<any>();
  @Output() onDelete: any = new EventEmitter<any>();
  DataKeys: Array<any> = []
  columns: Array<any> = []
  constructor(private cdref: ChangeDetectorRef, private renderer: Renderer2) { }
  ngAfterViewInit(): void {


    let that = this;
    $('#example').DataTable({
      data: this.tableData,
      destroy: true,
      columns: this.columns
      // [
      //   { title: 'First Name', data: 'firstname' },
      //   { title: 'Last Name', data: 'lastname' },
      //   { title: 'Twitter.', data: 'twitter' },
      //   {
      //     title: 'Action',
      //     data: 'firstname',
      //     render: function (data, type, row) {
      //       var html = ""
      //       if (that.showViewBtn) {
      //         html = html + '<button  class="btn btn-light m-1 view" data-row=' + JSON.stringify(row) + '>View</button>'
      //       }
      //       if (that.showViewBtn) {
      //         html = html + '<button *ngIf="showEditBtn" data-row=' + JSON.stringify(row) + ' class="btn btn-primary m-1 edit" (click)="edit(' + row + ')">Edit</button>'
      //       }

      //       if (that.showViewBtn) {
      //         html = html + '<button *ngIf="showDeleteBtn" data-row=' + JSON.stringify(row) + ' class="btn btn-danger m-1 delete"(click)="delete(' + row + ')">Delete</button>'
      //       }
      //       return html

      //     }
      //   },

      // ],
    });


    $('#example').on('click', 'button', function () {
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
  ngOnChanges(changes: SimpleChanges) {
    let that = this;
    this.prepareDtOptions();
    if (changes.tableData.currentValue.length > 0) {
      $('#example').DataTable({
        data: this.tableData,
        destroy: true,
        columns: that.columns
      });


    }

  }

  ngOnInit(): void {
    if (this.tableData.length > 0) {
      this.DataKeys = Object.keys(this.tableData[0]);
    }




  }

  prepareDtOptions() {
    debugger
    let that = this;
    this.columns = []
    this.columns.push({
      render: function (data:any, type:any, full:any, meta:any) {
      
        return meta.row + 1; 
      }
    }
    )
    this.columns = this.columns.concat(this.tableColumn)
    this.columns.push(
      {
        title: 'Action',

        render: function (data:any, type:any, row:any, full:any, meta:any) {
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

