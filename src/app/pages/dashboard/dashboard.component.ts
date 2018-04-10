import {Component} from '@angular/core';
import {AuthenticationHelper} from "../../app.authentication";
import {Router}  from '@angular/router';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.scss'],
    templateUrl: './dashboard.html'
})
export class Dashboard {
    isUser: any;
    barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    barChartLabels: string[] = ['2009', '2010', '2011', '2012', '2013', '2014'];
    barChartType: string = 'bar';
    barChartLegend: boolean = true;

    constructor(private authentication: AuthenticationHelper, private router: Router) {
    }

    navigateToInvestorProfile() {
        this.router.navigate(['/investor-profile'])
    }

    barChartData:any[] = [
        {data: [59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    // events
    chartClicked(e: any): void {
        console.log(e);
    }

    chartHovered(e: any): void {
        console.log(e);
    }

    // Doughnut chart settings and data.
    doughnutChartLabels: string[] = [' Active Users', 'Investors', 'In-active Users'];
    doughnutChartData: number[] = [350, 450, 100];
    doughnutChartType: string = 'doughnut';

    // events
    doughnutClicked(e: any): void {
        console.log(e);
    }

    doughnutHovered(e: any): void {
        console.log(e);
    }
}
