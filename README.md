# SSRProject
基于webpack4，vue2+的ssr项目改造

本项目使用vue-server-renderer插件进行项目改造、并且再用nuxt版本进行对比。

运行：

1、先准备好静态数据服务器：
    cd ssr-server-forgery
    执行 npm install
    执行 npm run dev
    上面这个是伪造的服务器数据，因为项目数据有一定的保密性，就取了首页和部分静态数据。（跟ssr没有半毛钱关系，但是必须要启动，才能拿到首屏数据）

2、如果是vue-render-renderer版本，请在ssr目录下启动客户端：
    cd ssr
    执行 npm install
    执行 npm run ssr
    这个就是ssr的项目代码
    最后等bundle生成后，访问 http://localhost:8089/mobile/home.html

3、如果想要的是nuxt版本，则在nuxt目录下，执行npm run dev


首页效果图：
![Alt text](https://github.com/yiqianglin/SSRProject/blob/master/ssr.jpg)

