
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"navigationBar":{"style":"custom","type":"default"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"syd-phone-frontend-uniapp","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"4.15","entryPagePath":"pages/tabIndex/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#2b2b2b","selectedColor":"#1F66FB","borderStyle":"black","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#ffffff","list":[{"pagePath":"pages/tabIndex/index","iconPath":"/static/images/index/2.png","selectedIconPath":"/static/images/index/index_active.png","text":"首页"},{"pagePath":"pages/index/index","iconPath":"/static/images/tabIndex/11.png","selectedIconPath":"/static/images/tabIndex/11_active.png","text":"数据信用评估额度"},{"pagePath":"pages/my/my","iconPath":"/static/images/index/person_normal.png","selectedIconPath":"/static/images/index/1.png","text":"我的"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/tabIndex/index","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{"titleText":"首页","type":"default"},"isNVue":false}},{"path":"pages/index/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"navigationBar":{"titleText":"数据信用评估额度","type":"default"},"isNVue":false}},{"path":"pages/my/my","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"navigationBar":{"titleText":"我的","type":"default"},"isNVue":false}},{"path":"pages/login/login","meta":{"navigationBar":{"titleText":"登录","type":"default"},"isNVue":false}},{"path":"pages/limitCalculationEdit/limitCalculationEdit","meta":{"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/resultList/resultList","meta":{"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/customerService/customerService","meta":{"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/productList/productList","meta":{"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/completeMess/completeMess","meta":{"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/productDetail/productDetail","meta":{"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/result/result","meta":{"navigationBar":{"titleText":"","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  