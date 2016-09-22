import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Hero } from '../hero';
import { HeroService  } from '../hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/views/heroes.component.html',
    styleUrls: ['app/css/heroes.component.css']
})

export class HeroesComponent implements OnInit{
    title = 'Tour of Heroes';  // 定义当前组件标题

    heroes : Hero[];           // 获取数据

    selectedHero : Hero;       // 定义选中目标对象

    constructor(
        private heroService: HeroService,
        private router: Router
    ){}

    getHeroes():void{
        this.heroService.getHeroes().then(heroes=> this.heroes = heroes);
    }

    ngOnInit(): void{
        this.getHeroes();
    }

    // 定义选中事件
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    };

    gotoDetail(): void{
        this.router.navigate(['/detail',this.selectedHero.id])
    }
}

