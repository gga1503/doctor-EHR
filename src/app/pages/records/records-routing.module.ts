import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecordsComponent } from "./records.component";
import { CreateRecordComponent } from "./create-record/create-record.component";
import { RecordDetailComponent } from "./record-detail/record-detail.component";

const routes: Routes = [
  { path: "", component: RecordsComponent },
  { path: "create", component: CreateRecordComponent },
  { path: "show", component: RecordDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule {
}
