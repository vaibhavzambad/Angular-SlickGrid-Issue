import { Component, OnInit } from "@angular/core";
import { Column, GridOption } from "angular-slickgrid";
import { RowDetailPreloadComponent } from "../row-detail-preload/row-detail-preload.component";
import { RowDetailViewComponent } from "../row-detail-view/row-detail-view.component";

@Component({
  selector: "app-grid-basic",
  templateUrl: "./grid-basic.component.html",
  styleUrls: ["./grid-basic.component.scss"]
})
export class GridBasicComponent implements OnInit {
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: "title", name: "Title", field: "title", sortable: true },
      {
        id: "duration",
        name: "Duration (days)",
        field: "duration",
        sortable: true
      },
      { id: "%", name: "% Complete", field: "percentComplete", sortable: true },
      { id: "start", name: "Start", field: "start" },
      { id: "finish", name: "Finish", field: "finish" },
      {
        id: "effort-driven",
        name: "Effort Driven",
        field: "effortDriven",
        sortable: true
      }
    ];
    const mappedColumnDefinitions = this.columnDefinitions
      .slice(0, 10)
      .map(col => {
        return { columnId: col.id.toString(), width: 20 };
      });
    this.gridOptions = {
      enableAutoResize: true, // true by default
      enableCellNavigation: true,
      enableRowDetailView: true,
      checkboxSelector: {
        hideInColumnTitleRow: true,
        hideInFilterHeaderRow: true
      },
      rowSelectionOptions: {
        selectActiveRow: true
      },
      rowDetailView: {
        // We can load the "process" asynchronously in 2 different ways (httpClient OR even Promise)
        process: item => this.simulateServerAsyncCall(item),
        // process: (item) => this.http.get(`api/item/${item.id}`),

        // load only once and reuse the same item detail without calling process method
        loadOnce: true,

        // limit expanded row to only 1 at a time
        singleRowExpand: false,

        // false by default, clicking anywhere on the row will open the detail view
        // when set to false, only the "+" icon would open the row detail
        // if you use editor or cell navigation you would want this flag set to false (default)
        useRowClick: true,

        // how many grid rows do we want to use for the row detail panel (this is only set once and will be used for all row detail)
        // also note that the detail view adds an extra 1 row for padding purposes
        // so if you choose 4 panelRows, the display will in fact use 5 rows
        panelRows: 4,

        // you can override the logic for showing (or not) the expand icon
        // for example, display the expand icon only on every 2nd row
        // expandableOverride: (row: number, dataContext: any, grid: any) => (dataContext.id % 2 === 1),

        // Preload View Component
        preloadComponent: RowDetailPreloadComponent,

        // View Component to load when row detail data is ready
        viewComponent: RowDetailViewComponent
      },
      presets: {
        columns: mappedColumnDefinitions
      },
      enableCheckboxSelector: true,
      enableRowSelection: true,
      alwaysShowVerticalScroll: false,
      autoHeight: true
    };

    // fill the dataset with your data
    // VERY IMPORTANT, Angular-Slickgrid uses Slickgrid DataView which REQUIRES a unique "id" and it has to be lowercase "id" and be part of the dataset
    this.dataset = [];

    // for demo purpose, let's mock a 1000 lines of data
    for (let i = 0; i < 10; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 28);
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: i, // again VERY IMPORTANT to fill the "id" with unique values
        title: "Task " + i,
        duration: Math.round(Math.random() * 100) + "",
        percentComplete: randomPercent,
        start: `${randomMonth}/${randomDay}/${randomYear}`,
        finish: `${randomMonth}/${randomDay}/${randomYear}`,
        effortDriven: i % 5 === 0
      };
    }
  }
  simulateServerAsyncCall(item: any) {
    // random set of names to use for more item detail
    const randomNames = [
      "John Doe",
      "Jane Doe",
      "Chuck Norris",
      "Bumblebee",
      "Jackie Chan",
      "Elvis Presley",
      "Bob Marley",
      "Mohammed Ali",
      "Bruce Lee",
      "Rocky Balboa"
    ];

    // fill the template on async delay
    return new Promise(resolve => {
      setTimeout(() => {
        const itemDetail = item;

        // let's add some extra properties to our item for a better async simulation
        itemDetail.assignee = randomNames[this.randomNumber(0, 10)];
        itemDetail.reporter = randomNames[this.randomNumber(0, 10)];

        // resolve the data after delay specified
        resolve(itemDetail);
      }, 1000);
    });
  }

  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
