(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["settings"],{"014b":function(t,e,n){"use strict";var r=n("e53d"),i=n("07e3"),o=n("8e60"),c=n("63b6"),s=n("9138"),a=n("ebfd").KEY,u=n("294c"),f=n("dbdb"),l=n("45f2"),p=n("62a0"),v=n("5168"),d=n("ccb9"),b=n("6718"),h=n("47ee"),y=n("9003"),m=n("e4ae"),g=n("f772"),x=n("241e"),w=n("36c3"),S=n("1bc3"),_=n("aebd"),O=n("a159"),C=n("0395"),P=n("bf0b"),E=n("9aa9"),j=n("d9f6"),L=n("c3a1"),k=P.f,A=j.f,T=C.f,M=r.Symbol,N=r.JSON,F=N&&N.stringify,$="prototype",D=v("_hidden"),G=v("toPrimitive"),I={}.propertyIsEnumerable,R=f("symbol-registry"),z=f("symbols"),V=f("op-symbols"),B=Object[$],J="function"==typeof M&&!!E.f,W=r.QObject,H=!W||!W[$]||!W[$].findChild,K=o&&u((function(){return 7!=O(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=k(B,e);r&&delete B[e],A(t,e,n),r&&t!==B&&A(B,e,r)}:A,Y=function(t){var e=z[t]=O(M[$]);return e._k=t,e},q=J&&"symbol"==typeof M.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof M},Q=function(t,e,n){return t===B&&Q(V,e,n),m(t),e=S(e,!0),m(n),i(z,e)?(n.enumerable?(i(t,D)&&t[D][e]&&(t[D][e]=!1),n=O(n,{enumerable:_(0,!1)})):(i(t,D)||A(t,D,_(1,{})),t[D][e]=!0),K(t,e,n)):A(t,e,n)},U=function(t,e){m(t);var n,r=h(e=w(e)),i=0,o=r.length;while(o>i)Q(t,n=r[i++],e[n]);return t},X=function(t,e){return void 0===e?O(t):U(O(t),e)},Z=function(t){var e=I.call(this,t=S(t,!0));return!(this===B&&i(z,t)&&!i(V,t))&&(!(e||!i(this,t)||!i(z,t)||i(this,D)&&this[D][t])||e)},tt=function(t,e){if(t=w(t),e=S(e,!0),t!==B||!i(z,e)||i(V,e)){var n=k(t,e);return!n||!i(z,e)||i(t,D)&&t[D][e]||(n.enumerable=!0),n}},et=function(t){var e,n=T(w(t)),r=[],o=0;while(n.length>o)i(z,e=n[o++])||e==D||e==a||r.push(e);return r},nt=function(t){var e,n=t===B,r=T(n?V:w(t)),o=[],c=0;while(r.length>c)!i(z,e=r[c++])||n&&!i(B,e)||o.push(z[e]);return o};J||(M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===B&&e.call(V,n),i(this,D)&&i(this[D],t)&&(this[D][t]=!1),K(this,t,_(1,n))};return o&&H&&K(B,t,{configurable:!0,set:e}),Y(t)},s(M[$],"toString",(function(){return this._k})),P.f=tt,j.f=Q,n("6abf").f=C.f=et,n("355d").f=Z,E.f=nt,o&&!n("b8e3")&&s(B,"propertyIsEnumerable",Z,!0),d.f=function(t){return Y(v(t))}),c(c.G+c.W+c.F*!J,{Symbol:M});for(var rt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),it=0;rt.length>it;)v(rt[it++]);for(var ot=L(v.store),ct=0;ot.length>ct;)b(ot[ct++]);c(c.S+c.F*!J,"Symbol",{for:function(t){return i(R,t+="")?R[t]:R[t]=M(t)},keyFor:function(t){if(!q(t))throw TypeError(t+" is not a symbol!");for(var e in R)if(R[e]===t)return e},useSetter:function(){H=!0},useSimple:function(){H=!1}}),c(c.S+c.F*!J,"Object",{create:X,defineProperty:Q,defineProperties:U,getOwnPropertyDescriptor:tt,getOwnPropertyNames:et,getOwnPropertySymbols:nt});var st=u((function(){E.f(1)}));c(c.S+c.F*st,"Object",{getOwnPropertySymbols:function(t){return E.f(x(t))}}),N&&c(c.S+c.F*(!J||u((function(){var t=M();return"[null]"!=F([t])||"{}"!=F({a:t})||"{}"!=F(Object(t))}))),"JSON",{stringify:function(t){var e,n,r=[t],i=1;while(arguments.length>i)r.push(arguments[i++]);if(n=e=r[1],(g(e)||void 0!==t)&&!q(t))return y(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!q(e))return e}),r[1]=e,F.apply(N,r)}}),M[$][G]||n("35e8")(M[$],G,M[$].valueOf),l(M,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},"0395":function(t,e,n){var r=n("36c3"),i=n("6abf").f,o={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return i(t)}catch(e){return c.slice()}};t.exports.f=function(t){return c&&"[object Window]"==o.call(t)?s(t):i(r(t))}},"07e3":function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},"0fc9":function(t,e,n){var r=n("3a38"),i=Math.max,o=Math.min;t.exports=function(t,e){return t=r(t),t<0?i(t+e,0):o(t,e)}},1654:function(t,e,n){"use strict";var r=n("71c1")(!0);n("30f1")(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})}))},1691:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},"1bc3":function(t,e,n){var r=n("f772");t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},"1ec9":function(t,e,n){var r=n("f772"),i=n("e53d").document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},"241e":function(t,e,n){var r=n("25eb");t.exports=function(t){return Object(r(t))}},"25eb":function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},"26d3":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("div",{staticClass:"left"},[n("span",{staticClass:"header"},[t._v("Settings")]),n("ul",{staticClass:"nav"},[t._l(t.tabs.set,(function(e,r){return n("li",{key:r,staticClass:"pill",class:{active:t.tabs.active==r},on:{click:function(e){t.tabs.active=r}}},[n("span",[t._v(t._s(e))])])})),n("li",{staticClass:"spacer"}),n("li",{staticClass:"pill",class:{active:"credits"==t.tabs.active},on:{click:function(e){t.tabs.active="credits"}}},[t._v("Credits")]),n("li",{staticClass:"pill"},[n("a",{attrs:{href:"https://github.com/LegendEffects/PixelBot-Designer"}},[n("font-awesome-icon",{attrs:{icon:"link"}}),t._v("  Github")],1)]),n("li",{staticClass:"pill"},[n("a",{attrs:{href:"https://github.com/LegendEffects/PixelBot-Designer/issues/new/choose"}},[n("font-awesome-icon",{attrs:{icon:"link"}}),t._v("  Report an issue")],1)])],2)]),n("div",{staticClass:"right"},[n("div",{staticClass:"pageHeader"},[n("span",{staticClass:"header"},[t._v(t._s(t.tabs.set[t.tabs.active]||t.tabs.manual[t.tabs.active]))]),n("div",{staticClass:"closeContainer"},[n("router-link",{staticClass:"close",attrs:{to:"/"}},[n("font-awesome-icon",{attrs:{icon:"times-circle"}})],1)],1)]),n("div",{staticClass:"tabs"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive("layout"),expression:"isActive('layout')"}]},[t.storageSupported?t._e():n("div",{staticClass:"alert-danger"},[t._v("LocalStorage is not supported by your browser. Changes made will not be saved for any future sessions.")]),n("div",{staticClass:"optionGroup"},[n("span",{staticClass:"name"},[t._v("Pixel Size")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.settings.pixelSize,expression:"$store.state.settings.pixelSize"}],attrs:{type:"number"},domProps:{value:t.$store.state.settings.pixelSize},on:{change:function(e){return t.$store.commit("settings/changePixelSize")},input:function(e){e.target.composing||t.$set(t.$store.state.settings,"pixelSize",e.target.value)}}}),t._v("px\n                ")]),n("div",{staticClass:"optionGroup"},[n("span",{staticClass:"name"},[t._v("Toolbox Mounting Position")]),n("position-selector",{attrs:{value:t.$store.state.settings.layout.toolbox},on:{input:t.toolboxChanged}})],1),n("div",{staticClass:"optionGroup"},[n("span",{staticClass:"name"},[t._v("Animation Timeline Mounting Position")]),n("position-selector",{attrs:{value:t.$store.state.settings.layout.timeline},on:{input:t.timelineChanged}})],1)]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isActive("credits"),expression:"isActive('credits')"}],staticClass:"credits"},[t._m(0),t._m(1),t._m(2),t._m(3)])])])])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("Original PixelBot concept invented by "),n("a",{attrs:{href:"https://laboratory424.com"}},[t._v("Laboratory424")]),n("br")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("Editor developed by "),n("a",{attrs:{href:"https://legendeffects.co.uk"}},[t._v("LegendEffects")]),n("br")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("Original Editor by "),n("a",{attrs:{href:"https://clawstudios.com"}},[t._v("Claw Studios")]),n("br")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("First editor concept by "),n("a",{attrs:{href:"https://www.twitch.tv/CaptainPDA"}},[t._v("CaptainPDA")]),n("br")])}],o=n("5d58"),c=n.n(o),s=n("67bb"),a=n.n(s);function u(t){return u="function"===typeof a.a&&"symbol"===typeof c.a?function(t){return typeof t}:function(t){return t&&"function"===typeof a.a&&t.constructor===a.a&&t!==a.a.prototype?"symbol":typeof t},u(t)}function f(t){return f="function"===typeof a.a&&"symbol"===u(c.a)?function(t){return u(t)}:function(t){return t&&"function"===typeof a.a&&t.constructor===a.a&&t!==a.a.prototype?"symbol":u(t)},f(t)}var l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"positionSelector"},[r("img",{class:{active:"top"==t.selected},attrs:{src:n("af97")},on:{click:function(e){return t.changeActive("top")}}}),r("img",{class:{active:"bottom"==t.selected},attrs:{src:n("40e3")},on:{click:function(e){return t.changeActive("bottom")}}}),r("img",{class:{active:"left"==t.selected},attrs:{src:n("5b92")},on:{click:function(e){return t.changeActive("left")}}}),r("img",{class:{active:"right"==t.selected},attrs:{src:n("a2a7")},on:{click:function(e){return t.changeActive("right")}}})])},p=[],v={name:"positionSelector",props:["value"],data:function(){return{selected:null}},methods:{changeActive:function(t){this.selected=t,this.$emit("input",this.selected)}},created:function(){this.selected=this.value}},d=v,b=(n("89ea"),n("2877")),h=Object(b["a"])(d,l,p,!1,null,"d68e0f2a",null),y=h.exports,m={name:"settings",components:{positionSelector:y},data:function(){return{tabs:{active:"layout",set:{layout:"Layout",other:"Another pill in the list"},manual:{credits:"Credits"}}}},computed:{storageSupported:function(){return void 0!==("undefined"===typeof storage?"undefined":f(storage))}},methods:{isActive:function(t){return this.tabs.active==t},toolboxChanged:function(t){this.$store.commit("settings/moveToolbox",t)},timelineChanged:function(t){this.$store.commit("settings/moveTimeline",t)}}},g=m,x=(n("dfdc"),Object(b["a"])(g,r,i,!1,null,"796b9695",null));e["default"]=x.exports},"294c":function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},"30f1":function(t,e,n){"use strict";var r=n("b8e3"),i=n("63b6"),o=n("9138"),c=n("35e8"),s=n("481b"),a=n("8f60"),u=n("45f2"),f=n("53e2"),l=n("5168")("iterator"),p=!([].keys&&"next"in[].keys()),v="@@iterator",d="keys",b="values",h=function(){return this};t.exports=function(t,e,n,y,m,g,x){a(n,e,y);var w,S,_,O=function(t){if(!p&&t in j)return j[t];switch(t){case d:return function(){return new n(this,t)};case b:return function(){return new n(this,t)}}return function(){return new n(this,t)}},C=e+" Iterator",P=m==b,E=!1,j=t.prototype,L=j[l]||j[v]||m&&j[m],k=L||O(m),A=m?P?O("entries"):k:void 0,T="Array"==e&&j.entries||L;if(T&&(_=f(T.call(new t)),_!==Object.prototype&&_.next&&(u(_,C,!0),r||"function"==typeof _[l]||c(_,l,h))),P&&L&&L.name!==b&&(E=!0,k=function(){return L.call(this)}),r&&!x||!p&&!E&&j[l]||c(j,l,k),s[e]=k,s[C]=h,m)if(w={values:P?k:O(b),keys:g?k:O(d),entries:A},x)for(S in w)S in j||o(j,S,w[S]);else i(i.P+i.F*(p||E),e,w);return w}},"32fc":function(t,e,n){var r=n("e53d").document;t.exports=r&&r.documentElement},"335c":function(t,e,n){var r=n("6b4c");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},"355d":function(t,e){e.f={}.propertyIsEnumerable},"35e8":function(t,e,n){var r=n("d9f6"),i=n("aebd");t.exports=n("8e60")?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},"36c3":function(t,e,n){var r=n("335c"),i=n("25eb");t.exports=function(t){return r(i(t))}},"3a38":function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},"40e3":function(t,e,n){t.exports=n.p+"img/bottom.879e2c2d.png"},"45f2":function(t,e,n){var r=n("d9f6").f,i=n("07e3"),o=n("5168")("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},"47ee":function(t,e,n){var r=n("c3a1"),i=n("9aa9"),o=n("355d");t.exports=function(t){var e=r(t),n=i.f;if(n){var c,s=n(t),a=o.f,u=0;while(s.length>u)a.call(t,c=s[u++])&&e.push(c)}return e}},"481b":function(t,e){t.exports={}},"50ed":function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},5168:function(t,e,n){var r=n("dbdb")("wks"),i=n("62a0"),o=n("e53d").Symbol,c="function"==typeof o,s=t.exports=function(t){return r[t]||(r[t]=c&&o[t]||(c?o:i)("Symbol."+t))};s.store=r},"53e2":function(t,e,n){var r=n("07e3"),i=n("241e"),o=n("5559")("IE_PROTO"),c=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},5559:function(t,e,n){var r=n("dbdb")("keys"),i=n("62a0");t.exports=function(t){return r[t]||(r[t]=i(t))}},"584a":function(t,e){var n=t.exports={version:"2.6.9"};"number"==typeof __e&&(__e=n)},"5b4e":function(t,e,n){var r=n("36c3"),i=n("b447"),o=n("0fc9");t.exports=function(t){return function(e,n,c){var s,a=r(e),u=i(a.length),f=o(c,u);if(t&&n!=n){while(u>f)if(s=a[f++],s!=s)return!0}else for(;u>f;f++)if((t||f in a)&&a[f]===n)return t||f||0;return!t&&-1}}},"5b92":function(t,e,n){t.exports=n.p+"img/left.02ae6dcd.png"},"5c63":function(t,e,n){},"5d58":function(t,e,n){t.exports=n("d8d6")},"62a0":function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},"63b6":function(t,e,n){var r=n("e53d"),i=n("584a"),o=n("d864"),c=n("35e8"),s=n("07e3"),a="prototype",u=function(t,e,n){var f,l,p,v=t&u.F,d=t&u.G,b=t&u.S,h=t&u.P,y=t&u.B,m=t&u.W,g=d?i:i[e]||(i[e]={}),x=g[a],w=d?r:b?r[e]:(r[e]||{})[a];for(f in d&&(n=e),n)l=!v&&w&&void 0!==w[f],l&&s(g,f)||(p=l?w[f]:n[f],g[f]=d&&"function"!=typeof w[f]?n[f]:y&&l?o(p,r):m&&w[f]==p?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[a]=t[a],e}(p):h&&"function"==typeof p?o(Function.call,p):p,h&&((g.virtual||(g.virtual={}))[f]=p,t&u.R&&x&&!x[f]&&c(x,f,p)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},6718:function(t,e,n){var r=n("e53d"),i=n("584a"),o=n("b8e3"),c=n("ccb9"),s=n("d9f6").f;t.exports=function(t){var e=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:c.f(t)})}},"67bb":function(t,e,n){t.exports=n("f921")},"69d3":function(t,e,n){n("6718")("asyncIterator")},"6abf":function(t,e,n){var r=n("e6f3"),i=n("1691").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},"6b4c":function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},"6c1c":function(t,e,n){n("c367");for(var r=n("e53d"),i=n("35e8"),o=n("481b"),c=n("5168")("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),a=0;a<s.length;a++){var u=s[a],f=r[u],l=f&&f.prototype;l&&!l[c]&&i(l,c,u),o[u]=o.Array}},"71c1":function(t,e,n){var r=n("3a38"),i=n("25eb");t.exports=function(t){return function(e,n){var o,c,s=String(i(e)),a=r(n),u=s.length;return a<0||a>=u?t?"":void 0:(o=s.charCodeAt(a),o<55296||o>56319||a+1===u||(c=s.charCodeAt(a+1))<56320||c>57343?t?s.charAt(a):o:t?s.slice(a,a+2):c-56320+(o-55296<<10)+65536)}}},"765d":function(t,e,n){n("6718")("observable")},"794b":function(t,e,n){t.exports=!n("8e60")&&!n("294c")((function(){return 7!=Object.defineProperty(n("1ec9")("div"),"a",{get:function(){return 7}}).a}))},"79aa":function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},"7e90":function(t,e,n){var r=n("d9f6"),i=n("e4ae"),o=n("c3a1");t.exports=n("8e60")?Object.defineProperties:function(t,e){i(t);var n,c=o(e),s=c.length,a=0;while(s>a)r.f(t,n=c[a++],e[n]);return t}},8436:function(t,e){t.exports=function(){}},"89ea":function(t,e,n){"use strict";var r=n("5c63"),i=n.n(r);i.a},"8e60":function(t,e,n){t.exports=!n("294c")((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},"8f60":function(t,e,n){"use strict";var r=n("a159"),i=n("aebd"),o=n("45f2"),c={};n("35e8")(c,n("5168")("iterator"),(function(){return this})),t.exports=function(t,e,n){t.prototype=r(c,{next:i(1,n)}),o(t,e+" Iterator")}},9003:function(t,e,n){var r=n("6b4c");t.exports=Array.isArray||function(t){return"Array"==r(t)}},9138:function(t,e,n){t.exports=n("35e8")},"9aa9":function(t,e){e.f=Object.getOwnPropertySymbols},a159:function(t,e,n){var r=n("e4ae"),i=n("7e90"),o=n("1691"),c=n("5559")("IE_PROTO"),s=function(){},a="prototype",u=function(){var t,e=n("1ec9")("iframe"),r=o.length,i="<",c=">";e.style.display="none",n("32fc").appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(i+"script"+c+"document.F=Object"+i+"/script"+c),t.close(),u=t.F;while(r--)delete u[a][o[r]];return u()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[a]=r(t),n=new s,s[a]=null,n[c]=t):n=u(),void 0===e?n:i(n,e)}},a2a7:function(t,e,n){t.exports=n.p+"img/right.bb22aa49.png"},aebd:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},af97:function(t,e,n){t.exports=n.p+"img/top.3c534f17.png"},b447:function(t,e,n){var r=n("3a38"),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},b8e3:function(t,e){t.exports=!0},bf0b:function(t,e,n){var r=n("355d"),i=n("aebd"),o=n("36c3"),c=n("1bc3"),s=n("07e3"),a=n("794b"),u=Object.getOwnPropertyDescriptor;e.f=n("8e60")?u:function(t,e){if(t=o(t),e=c(e,!0),a)try{return u(t,e)}catch(n){}if(s(t,e))return i(!r.f.call(t,e),t[e])}},c207:function(t,e){},c367:function(t,e,n){"use strict";var r=n("8436"),i=n("50ed"),o=n("481b"),c=n("36c3");t.exports=n("30f1")(Array,"Array",(function(t,e){this._t=c(t),this._i=0,this._k=e}),(function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):i(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])}),"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},c3a1:function(t,e,n){var r=n("e6f3"),i=n("1691");t.exports=Object.keys||function(t){return r(t,i)}},ccb9:function(t,e,n){e.f=n("5168")},d864:function(t,e,n){var r=n("79aa");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},d8d6:function(t,e,n){n("1654"),n("6c1c"),t.exports=n("ccb9").f("iterator")},d9f6:function(t,e,n){var r=n("e4ae"),i=n("794b"),o=n("1bc3"),c=Object.defineProperty;e.f=n("8e60")?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return c(t,e,n)}catch(s){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},dbdb:function(t,e,n){var r=n("584a"),i=n("e53d"),o="__core-js_shared__",c=i[o]||(i[o]={});(t.exports=function(t,e){return c[t]||(c[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n("b8e3")?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},dfdc:function(t,e,n){"use strict";var r=n("fd2c"),i=n.n(r);i.a},e4ae:function(t,e,n){var r=n("f772");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},e53d:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},e6f3:function(t,e,n){var r=n("07e3"),i=n("36c3"),o=n("5b4e")(!1),c=n("5559")("IE_PROTO");t.exports=function(t,e){var n,s=i(t),a=0,u=[];for(n in s)n!=c&&r(s,n)&&u.push(n);while(e.length>a)r(s,n=e[a++])&&(~o(u,n)||u.push(n));return u}},ebfd:function(t,e,n){var r=n("62a0")("meta"),i=n("f772"),o=n("07e3"),c=n("d9f6").f,s=0,a=Object.isExtensible||function(){return!0},u=!n("294c")((function(){return a(Object.preventExtensions({}))})),f=function(t){c(t,r,{value:{i:"O"+ ++s,w:{}}})},l=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!a(t))return"F";if(!e)return"E";f(t)}return t[r].i},p=function(t,e){if(!o(t,r)){if(!a(t))return!0;if(!e)return!1;f(t)}return t[r].w},v=function(t){return u&&d.NEED&&a(t)&&!o(t,r)&&f(t),t},d=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:p,onFreeze:v}},f772:function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},f921:function(t,e,n){n("014b"),n("c207"),n("69d3"),n("765d"),t.exports=n("584a").Symbol},fd2c:function(t,e,n){}}]);
//# sourceMappingURL=settings.632295cb.js.map