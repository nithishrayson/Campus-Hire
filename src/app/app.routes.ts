import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => 
            import('./campushire-frontend-module/auth/auth').then(m => m.AuthComponent)
    },
    {
        path: 'student',
        loadComponent: () =>
            import('./campushire-frontend-module/student-home/student-home').then(m => m.StudentHomeComponent)
    },
    {
        path: 'recruiter',
        loadComponent: () =>
            import('./campushire-frontend-module/recruiter-home/recruiter-home').then(m => m.RecruiterHomeComponent)
    },
    {
        path: 'admin',
        loadComponent: () =>
            import('./campushire-frontend-module/admin/admin-home').then(m => m.AdminHomeComponent)
    },
    {
        path: '**',
        redirectTo: 'auth'
    }

];
