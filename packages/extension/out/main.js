var g=Object.create;var d=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,b=Object.prototype.hasOwnProperty;var x=(t,e)=>{for(var s in e)d(t,s,{get:e[s],enumerable:!0})},h=(t,e,s,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of k(e))!b.call(t,o)&&o!==s&&d(t,o,{get:()=>e[o],enumerable:!(r=y(e,o))||r.enumerable});return t};var U=(t,e,s)=>(s=t!=null?g(S(t)):{},h(e||!t||!t.__esModule?d(s,"default",{value:t,enumerable:!0}):s,t)),P=t=>h(d({},"__esModule",{value:!0}),t);var c=(t,e,s)=>new Promise((r,o)=>{var n=i=>{try{l(s.next(i))}catch(m){o(m)}},p=i=>{try{l(s.throw(i))}catch(m){o(m)}},l=i=>i.done?r(i.value):Promise.resolve(i.value).then(n,p);l((s=s.apply(t,e)).next())});var E={};x(E,{activate:()=>W,deactivate:()=>D});module.exports=P(E);var f=U(require("path")),a=require("vscode"),T=()=>{let t=a.workspace.workspaceFolders;return t?t.map(e=>e.uri):[]},C=t=>c(void 0,null,function*(){let s=(yield a.workspace.fs.readDirectory(t)).filter(([r])=>!r.startsWith(".")&&!r.startsWith("node_modules")).map(([r,o])=>a.Uri.file(f.default.join(t.fsPath,r)));return w(s)}),w=t=>c(void 0,null,function*(){let e=[];for(let s=0;s<t.length;s++){let r=t[s];switch((yield a.workspace.fs.stat(r)).type){case a.FileType.Directory:{let n=yield C(r);e.push(...n)}case a.FileType.File:r.path.endsWith("package.json")&&e.push(r)}}return e}),j=(t,e)=>c(void 0,null,function*(){let s=t.map(n=>c(void 0,null,function*(){let p=yield a.workspace.fs.readFile(n),l=JSON.parse(p.toString());if(l.bin)return e.sendText(`cd ${n.fsPath.split("/").slice(0,-1).join("/")}`),Object.keys(l.bin)})),o=(yield Promise.all(s)).filter(n=>!!n).reduce((n,p)=>n.concat(p),[]);return console.log(o),o}),F=()=>c(void 0,null,function*(){let t=T();if(t.length<1){a.window.showErrorMessage("No workspace found");return}let e=a.window.createTerminal({name:"Tetris",shellPath:"bash",location:2}),s=yield w(t);yield j(s,e),e.show(),a.commands.executeCommand("workbench.action.toggleMaximizedPanel"),e.sendText("tb")}),u=()=>c(void 0,null,function*(){yield a.window.showInformationMessage("Starting Game",{modal:!0}),F()}),W=t=>{t.workspaceState.get("hasStarted")&&u(),a.commands.registerCommand("triplebyte.kill",()=>{t.workspaceState.update("hasStarted",!1)}),a.commands.registerCommand("triplebyte.auto",()=>{t.workspaceState.update("hasStarted",!0)}),a.commands.registerCommand("triplebyte.launch",u)},D=()=>{};0&&(module.exports={activate,deactivate});
