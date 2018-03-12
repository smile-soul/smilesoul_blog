// initializing - 您的初始化方法（检查当前项目状态，获取配置等）
// prompting- 在哪里提示用户选择（你打电话的地方this.prompt()）
// configuring- 保存配置并配置项目（创建.editorconfig文件和其他元数据文件）
// default - 如果方法名称与优先级不匹配，将被推送到此组。
// writing - 编写生成器特定文件（路由，控制器等）的位置
// conflicts - 处理冲突（内部使用）
// install - 运行安装（npm，bower）
// end- 称为最后，清理，再见再见等

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.title = "hello";
    this.category = "Web";
    this.date = "";
  }

  info() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('blog')
    ));
  }
  prompting() {
    const Dates = new Date();
    const today = `${Dates.getDate()}/${Dates.getMonth() + 1}/${Dates.getFullYear()}`
    return this.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Please input title name:',
        default: this.title
      },
      {
        type: 'list',
        name: 'category',
        message: 'Please choose category',
        choices: ['test']
      },
      {
        type: 'input',
        name: 'date',
        message: 'date:',
        default: today
      },
    ]).then(answer => {
      this.title = answer.title;
      this.category = answer.category;
      this.date = answer.date;
    });
  };

  writing() {
    // const fscopy = (template, paths) => {
    //   this.fs.copy(
    //     this.templatePath(`${template}`),
    //     this.destinationPath(`${paths}${template}`)
    //   );
    // }
    const path = 'content/blog/';
    mkdirp(path + `${this.title}`);
    this.fs.copyTpl(
      this.templatePath('example.md'),
      this.destinationPath(`${path}${this.title}/index.md`),
      { title: this.title,
        category: this.category,
        date: this.date}
    );
    // fscopy('containers/Home.js', path);
  };
  end() {
    this.log(yosay(
      'Create page Success'
    ));
  }
};
