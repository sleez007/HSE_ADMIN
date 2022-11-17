import { Component, OnInit } from '@angular/core';

const menuLinks = [
  {
    name: 'Dashboard',
    icon: 'pi pi-th-large',
    hasSubMenu: false,
    link: '/dashboard',
    isOpen: false,
    subMenu :[]
  },
  {
    name: 'Staff Management',
    icon: 'pi pi-users',
    hasSubMenu: true,
    link: null,
    isOpen: true,
    subMenu :[
      {
        name: 'All Staff',
        link: '/staffs'
      },
      {
        name: 'Add New Staffs',
        link: '/add-staff'
      },
    ]
  },
  {
    name: 'Reports',
    icon: 'pi pi-book',
    hasSubMenu: true,
    link: null,
    isOpen: false,
    subMenu :[
      {
        name: 'HSE Incidents',
        link: '/hse-incidents'
      },
      {
        name: 'CPA Incidents',
        link: '/cpa-incidents'
      },
    ]
  },
  {
    name: 'Project',
    icon: 'pi pi-file-pdf',
    hasSubMenu: true,
    link: null,
    isOpen: false,
    subMenu :[
      {
        name: 'Add New Project',
        link: '/project'
      },
      {
        name: 'All Projects',
        link: '/projects'
      },
    ]
  }
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu = menuLinks;

  constructor() { }

  ngOnInit(): void {
  }
  
  toggleMenu(index: number){
    this.menu[index].isOpen = !this.menu[index].isOpen
  }

}
