import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/services/client.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchForm: FormGroup;
  public clients: Array<string>;

  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.clientService.getClients().subscribe((clients: Array<string>) => {
      this.clients = clients;
    });
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      reference: [''],
      from: ['', Validators.required],
      to: ['', Validators.required],
      client: ['', Validators.required]
    });
  }

  searchData() {
    this.router.navigate(['searchResult', 
      this.searchForm.get('reference').value, 
      this.searchForm.get('from').value,
      this.searchForm.get('to').value,
      this.searchForm.get('client').value]);
  }
}
