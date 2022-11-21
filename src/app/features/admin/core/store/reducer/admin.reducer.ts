import { createFeature, createReducer, on } from "@ngrx/store"
import { ParentNodeModel } from "../../component/model"
import { adminActions } from "../action/admin.action"

export  interface AdminState {
    sideMenu: ParentNodeModel[]
};

export const adminInitialState: AdminState = {
    sideMenu: [
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
          isOpen: false,
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
}


export const adminFeature = createFeature({
    name: 'admin',
    reducer: createReducer(
        adminInitialState,
        on(adminActions.toggleMenu, (state,{nodeIndex} ) =>{
            let menu = [...state.sideMenu];
            menu[nodeIndex] = {...menu[nodeIndex], isOpen:!menu[nodeIndex].isOpen };
            return {...state, sideMenu: menu};
        }),
    )
})
