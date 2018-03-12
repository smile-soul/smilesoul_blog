---
title:  lodash相关技巧
cover: "/logos/logo-1024.png"
category: Web
tags:

    - Web
    - JavaScript

date: 10/10/2017
---

### 变量和方法
---
#### 类型
 * js的变量中只用primitive类型和object类型
 * 平时使用的字符串应该是primitive类型，应该是not an object and has no methods

	```
		const str = 'hello';
		console.log(str.charAt(0));
		// output: h
		Object.prototype.toString.call(str)
		// output: [object String]	
	```
 * 出现这样的情况，因为str.charAt时候，String(primitive)转换成了String(object)类型在[ECMAScript Language Specification&8.7.1](http://www.ecma-international.org/ecma-262/5.1/#sec-8.7) 明确指出变量类型的转换
 * 所以primitive类型的value是immutable的，而variable是mutable的，对与primitive类型的变量，为其赋值，本质上就是让变量指向新的内存。

---

#### lodash相关技巧和实例
  * N次循环技巧
 	
	```
    for(let i = 0; i < 5; i++) {
        // ...
    }
    Array.apply(null, Array(5)).forEach(() => {
        // ...
        });
    _.times(5, () => {
        // ...
        };
    ```

  * 深层次查找属性
  	
    ```
        const ownerArr = [{
    	"owner": "Colin",
      	"pets": [{"name":"dog1"}, {"name": "dog2"}]
        }, {
            "owner": "John",
            "pets": [{"name":"dog3"}, {"name": "dog4"}]
        }];

        ownerArr.map(owner => {
            return owner.pets[0].name;
            });

        _.map(ownerArr, 'pets[0].name');
    ```
  	
  * 数组独立
  	
    ```
        Array.apply(null, Array(6)).map( (item, index) => {
        return "ball_" + index;
        });

        _.times(6, _.uniqueId.bind(null, 'ball_'));

        _.times(6, _.partial(_.uniqueId, 'ball_'));
        // output: [ball_0, ball_1, ball_2, ball_3, ball_4, ball_5]
    ```
  * 对象扩展(可以直接用Object.assgin(), 底层一样的实现）
  	
    ```
         Object.prototype.extend = obj => {
    	for (let i in obj) {
      		if (obj.hasOwnProperty(i)) {
        		this[i] = obj[i];
      		}
    	}
    };
        const objA = {"name": "colin", "car": "suzuki"};
        const objB = {"name": "james", "age": 17};

        objA.extend(objB);
        console.log(objA); 
        // {"name": "james", "age": 17, "car": "suzuki"};

        _.assign(objA, objB);
        // {"name": "james", "age": 17, "car": "suzuki"};

        // ES6
        Objetct.assign({}, objA, objB);
        // {"name": "james", "age": 17, "car": "suzuki"};
        //_.assign 是浅拷贝，所以会覆盖name
    ```
  * 补充作用域：
    
    ```
    const test = '1';
    testOne() {
        return testTwo{
            cosole.log(test);
        };
        const test = '2';
    }
    testOne()();
    // output: undefined 
    
    
    const test = '1';
    testOne() {
        return testTwo{
            console.log(test);
        };
        test = '2';
    }
    // output: 1;
    ```
    因为重新定义了const，他在搜索作用域时候，会自上到下搜索**声明**的变量，如果没有声明，查找才会进去下一层，此处输出undefined，因为在testOne（）里面const之前就使用了test，所以就输出了undefined,而在第二个例子里面没有声明test，所以他就跳转出去，去下一层寻找test，即输出为1
  	
 * 作用域提升
 
	```
        const a = 1;
        b(){
            const a = b = 2;
        }
        console.log(a, b);
        // 抛出异常，因为ｂ没有定义
        
        b();
        console.log(a, b);
        //output: 1,2;
        // const a = b = 2 等价于　在全局声明const b = 2; 内部声明const a = b;因为=运算符是重右像左运算的
    ```
---
#### 附录
 * [MDN连接文档](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
 * [lodash相关技巧](http://colintoh.com/blog/lodash-10-javascript-utility-functions-stop-rewriting)
 * [10个ES6可以代替lodash的方法](https://www.sitepoint.com/lodash-features-replace-es6/)