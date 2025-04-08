import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app'
  // Store API data for the hovered country
  countryData: any = null; 
  // Base URL for the World Bank API
  apiUrlBase = 'https://api.worldbank.org/v2/country/'; 
  format = 'json';

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {  
      // Select all path elements in the SVG
      const svgPaths = document.querySelectorAll('svg path');
      // F
      svgPaths.forEach(path => {
        path.addEventListener('mouseenter', (event) => {
          // Get the ID
          const countryId = (event.target as SVGPathElement).id;
          this.fetchCountryData(countryId);
        });
      });
    }
  }

  // Fetch data from the API
  //G
  fetchCountryData(countryId: string): void {
    const apiUrl = `${this.apiUrlBase}${countryId}?format=${this.format}`;
    this.http.get(apiUrl).subscribe({
      next: (data: any) => {
        if (data[1]) { 
          this.countryData = data[1][0];
        } else {
          this.countryData = null;
        }
      },
      error: (error) => {
        console.error('Error fetching country data:', error);
      }
    });
  }
  
}
