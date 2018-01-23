# Mono

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.
当前进度：
1，没有做样式；
2，客户端的查找仅实现了按名称查找，并且没有用rxjs优化；
3，没有实现删除，支出，和收入功能；
4，没有实现增加项目和浏览项目的功能；
下一步工作：
1，建立express，在express中实现操作mogoose存储数据，现在本地实现，之后将mongodb放在网上。
2，建立restapi；
3：完善客户端的restapi；
4：更改Nginx设置，使restapi不会跨域访问；


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
