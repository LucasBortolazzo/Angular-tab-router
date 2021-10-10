import { Route } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Tab } from './models/tab';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'angular-tab-route';
	public tabs: Tab[] = [];
	public routes: Route[] = [];
	public currentHoverTabKey = '';

	constructor(private router: Router,
		private cd: ChangeDetectorRef) { }

	ngOnInit() {
		this.router.events.subscribe((val) => {
			if (val instanceof RoutesRecognized) {
				this.checkAndAddRouteTab(val);
			}
		})
	}

	private getComp(value: RoutesRecognized): any {
		return value.state.root.firstChild ? value.state.root.firstChild.component : null;
	}

	private checkAndAddRouteTab(val: RoutesRecognized) {
		// pega o component para ativar a rota
		const comp = this.getComp(val);

		// desativa todas as tabs
		this.deactivateTabs();

		// verifica se a tab foi ativa e se realmente existe
		if (this.tabs.find(tab => tab.name == comp ? comp["name"] : null) == null) {

			// se não encontrou, adicionar a tab no array
			this.tabs.push({
				name: comp["name"],
				component: comp,
				key: comp["name"],
				active: true,
				route: val.state.root.firstChild ? val.state.root.firstChild.routeConfig : null
			})
		} else {
			// se a tab existe, então ative-a
			const tabToActivate = this.tabs.find((tab) => tab.name == comp["name"]);

			if (tabToActivate) {
				tabToActivate.active = true;
			}

			this.cd.markForCheck();
		}
	}
	private deactivateTabs() {
		this.tabs.forEach(tab => (tab.active = false));
	}
}
