import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface Search {
  firstName: any;
  lastName: any;
  ChartNumber: any;
  address: any;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchForm!: FormGroup;
  searchValue: any;

  search: Search[] = [
    {firstName: 'Dummy', lastName: "Dummy", ChartNumber: "12345", address: "XYZ STREET"},
  ];


  constructor() { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      ChartNumber: new FormControl(''),
      address: new FormControl(''),
      searchBar: new FormControl('')
    });
  }

  searchId() {
    console.log("Form", this.searchForm.controls);
    let searchValue: any = "";
    if (this.searchForm.controls.firstName.value) {
      searchValue = searchValue + "/" + this.searchForm.controls.firstName.value
    }
    if (this.searchForm.controls.lastName.value) {
      searchValue = searchValue + "@" + this.searchForm.controls.lastName.value
    }
    if (this.searchForm.controls.ChartNumber.value) {
      searchValue = searchValue + "#" + this.searchForm.controls.ChartNumber.value
    }
    if (this.searchForm.controls.address.value) {
      searchValue = searchValue + "$" + this.searchForm.controls.address.value
    }
    this.searchForm.controls.searchBar.setValue(searchValue)
    console.log("Final Search", searchValue)
  }

  searchApiCall() {
    if (this.searchForm.controls.searchBar.value) {
      let strings = this.searchForm.controls.searchBar.value.split(/[/@#$]/);
      console.log("Strings", strings);
      strings.shift()
      if (strings.length > 0 && this.searchForm.controls.searchBar.value.includes("/")) {
        this.searchForm.controls.firstName.setValue(strings[0]);
        strings.shift();
      }
      if (strings.length > 0 && this.searchForm.controls.searchBar.value.includes("@")) {
        this.searchForm.controls.lastName.setValue(strings[0]);
        strings.shift();
      }
      if (strings.length > 0 && this.searchForm.controls.searchBar.value.includes("#")) {
        this.searchForm.controls.ChartNumber.setValue(strings[0]);
        strings.shift();
      }
      if (strings.length > 0 && this.searchForm.controls.searchBar.value.includes("$")) {
        this.searchForm.controls.address.setValue(strings[0]);
        strings.shift();
      }
    }
  }

  clear() {
    this.searchForm.controls.firstName.setValue(null);
    this.searchForm.controls.lastName.setValue(null);
    this.searchForm.controls.ChartNumber.setValue(null);
    this.searchForm.controls.address.setValue(null);
    this.searchForm.controls.searchBar.setValue(null);
  }

}
