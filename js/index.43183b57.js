(function(e){function t(t){for(var n,a,c=t[0],o=t[1],l=t[2],d=0,v=[];d<c.length;d++)a=c[d],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&v.push(i[a][0]),i[a]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);u&&u(t);while(v.length)v.shift()();return r.push.apply(r,l||[]),s()}function s(){for(var e,t=0;t<r.length;t++){for(var s=r[t],n=!0,c=1;c<s.length;c++){var o=s[c];0!==i[o]&&(n=!1)}n&&(r.splice(t--,1),e=a(a.s=s[0]))}return e}var n={},i={index:0},r=[];function a(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=n,a.d=function(e,t,s){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(s,n,function(t){return e[t]}.bind(null,n));return s},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/asb-client-spa/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=o;r.push([2,"chunk-vendors"]),s()})({0:function(e,t){},1:function(e,t){},2:function(e,t,s){e.exports=s("56d7")},3:function(e,t){},"56d7":function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d"),s("92c6");var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"section"},[s("div",{staticClass:"container is-fluid"},[s("the-service-bus-client",{on:{"create:serviceBusClient":e.setServiceBusClient,"destroy:serviceBusClient":e.destroyServiceBusClient}}),s("service-bus-queue-client",{attrs:{sbClient:e.sbClient}})],1)])},i=[],r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("form",[s("div",{staticClass:"field"},[e.errors.length?s("p",[s("b",[e._v("Please correct the following error(s):")]),s("ul",e._l(e.errors,(function(t,n){return s("li",{key:n,staticClass:"help is-danger"},[e._v(e._s(t))])})),0)]):e._e()]),s("div",{staticClass:"field is-horizontal"},[s("div",{staticClass:"field-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control is-expanded"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.qName,expression:"qName",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"text",placeholder:"Enter a Queue Name",disabled:e.qClient},domProps:{value:e.qName},on:{input:function(t){t.target.composing||(e.qName=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])])])]),s("div",{staticClass:"field is-horizontal"},[s("div",{staticClass:"field-body"},[s("div",{staticClass:"field is-grouped"},[s("div",{staticClass:"control"},[s("button",{staticClass:"button is-success",attrs:{disabled:e.disableConnectButton},on:{click:function(t){return t.preventDefault(),e.checkForm(t)}}},[e._v("Connect")])]),s("div",{staticClass:"control"},[s("button",{staticClass:"button is-warning",attrs:{disabled:!e.qClient},on:{click:function(t){return t.preventDefault(),e.disconnect(t)}}},[e._v("Disconnect")])]),s("p",{staticClass:"content is-medium",class:!e.qClient&&"is-invisible"},[e._v("Connected to "),s("span",{staticClass:"tag is-success"},[e._v(e._s(e.qClient?e.qClient.entityPath:""))])])])])])])])]),s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("queue-client-message-receiver",{attrs:{qClient:e.qClient}})],1),s("div",{staticClass:"column"},[s("queue-client-message-sender",{attrs:{qClient:e.qClient}})],1)])])},a=[],c=(s("99af"),s("b0c0"),s("96cf"),s("1da1")),o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("div",{staticClass:"control"},[s("button",{staticClass:"button is-success is-fullwidth",attrs:{disabled:!e.qClient||e.isReceiving},on:{click:e.receiveMessages}},[e._v("Receive Messages")])]),s("p",{staticClass:"content",class:!e.isReceiving&&"is-invisible"},[e._v("Receiving messages from "),s("span",{staticClass:"tag is-success"},[e._v(e._s(e.qClient?e.qClient.entityPath:""))])]),s("p",{staticClass:"content",class:0===e.messages.length&&"is-invisible"},[e._v("Messages received: "+e._s(e.messages.length))])]),s("div",{staticClass:"column"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("button",{staticClass:"button is-warning is-fullwidth",attrs:{disabled:!e.isReceiving},on:{click:e.stopReceivingMessages}},[e._v("Stop receiving Messages")])])]),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("button",{staticClass:"button is-warning is-fullwidth",attrs:{disabled:0===e.messages.length},on:{click:e.clearMessages}},[e._v("Clear Received Messages")])])])])]),s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},e._l(e.messages,(function(t,n){return s("article",{key:t.messageId,staticClass:"message is-small",class:0===n?"is-info":"is-dark"},[s("div",{staticClass:"message-header"},[s("p",[e._v("MessageId: "+e._s(t.messageId)+". Enqueued at: "+e._s(t.enqueuedTimeUtc))])]),s("div",{staticClass:"message-body"},[e._v(e._s(t))])])})),0)])])},l=[],u=s("a893"),d={name:"QueueClientMessageReceiver",data:function(){return{isReceiving:!1,messages:[],receiver:null}},props:{qClient:Object},methods:{clearMessages:function(){this.messages=[]},receiveMessages:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.receiver=e.qClient.createReceiver(u["c"].receiveAndDelete),e.receiver.registerMessageHandler(function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(s){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$log.info("Received message:",s),n={body:s.body,correlationId:s.correlationId,enqueuedTimeUtc:s.enqueuedTimeUtc,messageId:s.messageId,userProperties:s.userProperties},e.$log.info("Simplified message:",n),e.messages.unshift(n);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(s){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$log.error("Error receiving message:",s);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),e.$log.info("Receiving messages"),e.isReceiving=!0;case 4:case"end":return t.stop()}}),t)})))()},stopReceivingMessages:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.receiver.close();case 2:e.isReceiving=!1,e.$log.info("Receiver closed");case 4:case"end":return t.stop()}}),t)})))()}},watch:{qClient:function(){this.qClient||(this.isReceiving=!1)}}},v=d,m=s("2877"),g=Object(m["a"])(v,o,l,!1,null,null,null),f=g.exports,p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("form",{on:{submit:function(t){return t.preventDefault(),e.checkForm(t)}}},[s("div",{staticClass:"field"},[e.errors.length?s("p",[s("b",[e._v("Please correct the following error(s):")]),s("ul",e._l(e.errors,(function(t,n){return s("li",{key:n,staticClass:"help is-danger"},[e._v(e._s(t))])})),0)]):e._e()]),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.message,expression:"message",modifiers:{trim:!0}}],staticClass:"textarea",attrs:{placeholder:"Enter message to send",rows:"8"},domProps:{value:e.message},on:{input:function(t){t.target.composing||(e.message=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])]),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.uuidProps,expression:"uuidProps",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"text",placeholder:"Enter UUID properties"},domProps:{value:e.uuidProps},on:{input:function(t){t.target.composing||(e.uuidProps=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])]),s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("div",{staticClass:"control"},[s("button",{staticClass:"button is-success is-fullwidth",attrs:{disabled:!e.qClient}},[e._v("Send Message")])])]),s("div",{staticClass:"column"},[s("div",{staticClass:"control"},[s("button",{staticClass:"button is-warning is-fullwidth",attrs:{disabled:0===e.messages.length},on:{click:e.clearMessages}},[e._v("Clear Sent Messages")])])])]),s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("div",{staticClass:"control"},[s("p",{class:0===e.messages.length&&"is-invisible"},[e._v("Messages sent to "),s("span",{staticClass:"tag is-success"},[e._v(e._s(e.qClient&&e.qClient.entityPath))]),e._v(": "+e._s(e.messages.length))])])])])])])]),s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},e._l(e.messages,(function(t,n){return s("article",{key:n,staticClass:"message is-small"},[s("div",{staticClass:"message-body"},[e._v(e._s(t))])])})),0)])])},C=[],h=(s("4160"),s("d81d"),s("ac1f"),s("1276"),s("498a"),s("159b"),s("e144")),b=h.v1;function _(e,t){var s=JSON.parse(e);return t&&t.split(",").map((function(e){return e.trim()})).forEach((function(e){s[e]=b()})),s}var w={name:"QueueClientMessageSender",data:function(){return{errors:[],message:null,messages:[],sender:null,uuidProps:null}},props:{qClient:Object},methods:{checkForm:function(){this.errors=[],this.$log.info("Validation pending..."),this.errors.length||(localStorage.setItem("message",this.message),localStorage.setItem("uuidProps",this.uuidProps),this.sendMessage())},clearMessages:function(){this.messages=[]},sendMessage:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.sender||(e.sender=e.qClient.createSender()),t.prev=1,s=_(e.message,e.uuidProps),t.next=5,e.sender.send(s);case 5:e.messages.unshift(s),e.$log.info("Sending message",s),t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](1),e.errors.push(t.t0),e.$log.error("Error during message sending",t.t0);case 13:case"end":return t.stop()}}),t,null,[[1,9]])})))()}},created:function(){this.$log.info("QueueClientMessageSender component created"),localStorage.getItem("message")&&(this.message=localStorage.getItem("message")),this.uuidProps=localStorage.getItem("uuidProps")},watch:{qClient:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.qClient?e.sender=e.qClient.createSender():e.sender=null;case 1:case"end":return t.stop()}}),t)})))()},sender:function(){this.sender||(this.errors=[],this.messages=[])}}},S=w,q=Object(m["a"])(S,p,C,!1,null,null,null),x=q.exports,k={name:"ServiceBusQueueClient",components:{QueueClientMessageReceiver:f,QueueClientMessageSender:x},data:function(){return{errors:[],qClient:null,qName:null}},props:{sbClient:Object},methods:{checkForm:function(){this.errors=[],this.qName||this.errors.push("Queue Name is required."),this.errors.length||(localStorage.setItem("qName",this.qName),this.createQueueClient())},createQueueClient:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,s=e.sbClient.createQueueClient(e.qName),t.next=4,s.peek();case 4:e.qClient=s,e.$log.info("Peeked message successfully. Both Service Bus Client and Queue Client are valid."),t.next=21;break;case 8:t.prev=8,t.t0=t["catch"](0),n=t.t0.name,t.t1=n,t.next="ServiceCommunicationError"===t.t1?14:"MessagingEntityNotFoundError"===t.t1?16:"UnauthorizedError"===t.t1?18:20;break;case 14:return e.errors.push('Service Bus "'.concat(e.sbClient.name,'" is invalid. Please check the connection string. Additional information - ').concat(t.t0)),t.abrupt("break",21);case 16:return e.errors.push('Queue "'.concat(e.qName,'" is invalid. Does it exist on the service bus? Additional information - ').concat(t.t0)),t.abrupt("break",21);case 18:return e.errors.push("Connection String is invalid. Additional information - ".concat(t.t0)),t.abrupt("break",21);case 20:e.errors.push(t.t0);case 21:case"end":return t.stop()}}),t,null,[[0,8]])})))()},disconnect:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.qClient){t.next=7;break}return t.next=3,e.qClient.close();case 3:e.qClient=null,e.$log.info("Disconneted QueueClient"),t.next=8;break;case 7:e.$log.info("QueueClient did not exist");case 8:case"end":return t.stop()}}),t)})))()}},computed:{disableConnectButton:function(){return this.sbClient&&this.qClient?(this.$log.info("sb exists, qc exists, disable it"),!0):this.sbClient&&!this.qClient?(this.$log.info("sb exists, qc doesnt exist, enable it"),!1):this.sbClient?(this.$log.info("default, disable"),!0):(this.$log.info("sb doesnt exist, disable it"),!0)}},watch:{sbClient:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.sbClient||!e.qName){t.next=4;break}e.createQueueClient(),t.next=7;break;case 4:return e.errors=[],t.next=7,e.disconnect();case 7:case"end":return t.stop()}}),t)})))()}},created:function(){this.$log.info("ServiceBusQueueClient component created"),this.qName=localStorage.getItem("qName")}},y=k,R=Object(m["a"])(y,r,a,!1,null,null,null),$=R.exports,P=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("form",[s("div",{staticClass:"field"},[e.errors.length?s("p",[s("b",[e._v("Please correct the following error(s):")]),s("ul",e._l(e.errors,(function(t,n){return s("li",{key:n,staticClass:"help is-danger"},[e._v(e._s(t))])})),0)]):e._e()]),s("div",{staticClass:"field is-horizontal"},[s("div",{staticClass:"field-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control is-expanded"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.connectionString,expression:"connectionString",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"text",placeholder:"Enter a Connection String",disabled:e.sbClient},domProps:{value:e.connectionString},on:{input:function(t){t.target.composing||(e.connectionString=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])])])]),s("div",{staticClass:"field is-horizontal"},[s("div",{staticClass:"field-body"},[s("div",{staticClass:"field is-grouped"},[s("div",{staticClass:"control"},[s("button",{staticClass:"button is-success",attrs:{disabled:e.sbClient},on:{click:function(t){return t.preventDefault(),e.checkForm(t)}}},[e._v("Connect")])]),s("div",{staticClass:"control"},[s("button",{staticClass:"button is-warning",attrs:{disabled:!e.sbClient},on:{click:function(t){return t.preventDefault(),e.disconnect(t)}}},[e._v("Disconnect")])]),s("p",{staticClass:"content is-medium",class:!e.sbClient&&"is-invisible"},[e._v("Connected to "),s("span",{staticClass:"tag is-success"},[e._v(e._s(e.sbClient?e.sbClient.name:""))])])])])])])])])},O=[],M=s("bc90"),j={name:"TheServiceBusClient",components:{},data:function(){return{errors:[],connectionString:null,sbClient:null}},created:function(){this.$log.info("TheServiceBusClient component created"),this.connectionString=localStorage.getItem("connectionString"),this.connectionString&&this.connectToServiceBus()},methods:{checkForm:function(){this.errors=[],this.connectionString||this.errors.push("Connection String is required."),this.errors.length||(localStorage.setItem("connectionString",this.connectionString),this.connectToServiceBus())},connectToServiceBus:function(){this.sbClient=M["a"].createFromConnectionString(this.connectionString),this.$emit("create:serviceBusClient",this.sbClient),this.$log.info("Connected to ServiceBusClient")},disconnect:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.sbClient.close();case 2:e.sbClient=null,e.$emit("destroy:serviceBusClient"),e.$log.info("Disconneted ServiceBusClient");case 5:case"end":return t.stop()}}),t)})))()}}},B=j,N=Object(m["a"])(B,P,O,!1,null,null,null),Q=N.exports,E={name:"App",components:{ServiceBusQueueClient:$,TheServiceBusClient:Q},data:function(){return{sbClient:null}},methods:{destroyServiceBusClient:function(){this.sbClient=null,this.$log.info("Destroying ServiceBusClient")},setServiceBusClient:function(e){this.sbClient=e}}},I=E,D=Object(m["a"])(I,n,i,!1,null,null,null),T=D.exports,U=s("5c7d"),F=s.n(U),A={install:function(e,t){F.a.disableAll(),e.prototype.$log=F.a}},z=s("2b0e");z["a"].config.productionTip=!1,z["a"].use(A),new z["a"]({render:function(e){return e(T)}}).$mount("#app")}});
//# sourceMappingURL=index.43183b57.js.map