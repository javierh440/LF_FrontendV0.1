import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  standalone: true,
  imports: [],
  templateUrl: './nopagefound.component.html',
  styleUrl: './nopagefound.component.css'
})
export default class NopagefoundComponent {
 
  year = new Date().getFullYear();

}
