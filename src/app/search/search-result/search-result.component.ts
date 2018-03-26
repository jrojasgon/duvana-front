import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SinkService } from '../../shared/services/sink.service';
import { Sink } from '../../shared/model/sink.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public sinks: Array<Sink> = new Array();
  public params: Params;
  public loading: boolean;
  p: number = 1;

  constructor(private activatedRoute: ActivatedRoute, private sinkService: SinkService) {
    this.loading = false;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getData(params);
    });
  }

  getData(params: Params) {
    this.params = params;
    this.sinkService.getSinksData(params).subscribe((sinks: Array<Sink>) => {
      this.sinks = sinks;
    });
  }

  downloadFile(sinks: Array<Sink>) {
    this.loading = true;
    this.sinkService.downloadFile(sinks).subscribe(response => {
      this.loading = false;
      let blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var filename = 'duvana-report.xlsx';
      saveAs(blob, filename);      
    });
  }

}

