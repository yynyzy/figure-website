import{Y as w}from"./Yixiv-30bec923.js";import{p as y}from"./pictureBox-6463618b.js";import{d as k,y as C,r as s,e as B,n as P,c as a,q as W,a as l,t as N,F as b,i as z,f as d,o as n,_ as D}from"./index-3b82e300.js";const S={class:"wrapper"},F={class:"illust-box"},I=["textContent"],V={class:"illust-content"},Y={class:"pagination"},g=30,j=k({__name:"newWorks",setup(q){const{setNavigationBarActiveIndex:v}=C();v(1);const m={title:"#最新插画"},o=s(!1),u=s([]),_=async()=>{o.value=!0;const t={sort:"new",offset:r.value-1,limit:g};try{const{count:i,rows:c}=await w.getPublicPicture(t);u.value=c.map(e=>(e.regular_url=e.regular_url+"?x-oss-process=image/resize,w_450",e)),p.value=i,o.value=!1}catch{}},r=s(1),p=s(0),f=t=>{r.value=t,_()};return _(),(t,i)=>{const c=B("el-pagination"),e=P("loading");return n(),a("section",S,[W((n(),a("div",F,[l("h2",{class:"title",textContent:N(m.title)},null,8,I),l("ul",V,[(n(!0),a(b,null,z(u.value,(h,x)=>(n(),a("li",{class:"illust",key:x},[d(y,{item:h,"picture-height":258,"picture-width":225},null,8,["item"])]))),128))])])),[[e,o.value]]),l("div",Y,[d(c,{style:{justifyContent:"center"},background:"",layout:"prev, pager, next","current-page":r.value,total:p.value,"page-size":g,onCurrentChange:f},null,8,["current-page","total"])])])}}});const G=D(j,[["__scopeId","data-v-a0de456d"]]);export{G as default};