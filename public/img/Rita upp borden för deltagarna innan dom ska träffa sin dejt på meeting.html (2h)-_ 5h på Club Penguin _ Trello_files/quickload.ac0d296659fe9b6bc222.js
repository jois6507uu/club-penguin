(window.webpackJsonp=window.webpackJsonp||[]).push([[70,67],{298:function(e,a,r){"use strict";function i(e,a){for(var r=0;r<a.length;r++){var i=a[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function t(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}r.r(a),r.d(a,"PerfKeys",function(){return n});var n={NAVIGATION:"startup:navigation",NAVIGATION_TLS:"startup:navigation-tls",NAVIGATION_TTFB:"startup:navigation-ttfb",HTML:"startup:html",TIME_TO_INTERACTIVE:"startup:time-to-interactive",LOAD_TO_INTERACTIVE:"startup:page-load-to-interactive",APP:"startup:app.js",APP_DOWNLOAD:"download:app.js",LTP:"startup:ltp.js",LTP_DOWNLOAD:"download:ltp.js",FIRST_RENDER:"startup:first-render",QL_MEMBER_HEADER:"quickload:memberHeader",QL_MEMBER_BOARDS:"quickload:memberBoards",QL_MEMBER_QUICK_BOARDS:"quickload:memberQuickBoards",QL_SEARCH:"quickload:quickBoardSearch",QL_BOARD_MIN:"quickload:currentBoardMinimal",QL_BOARD_SECONDARY:"quickload:currentBoardSecondary",QL_BOARD_PLUGINS:"quickload:currentBoardPluginData",QL_CARD:"quickload:card",QL_ORGS:"quickload:organizationBoardsPage",BOOTSTRAP_HOME_VIEW:"bootstrap:member-home-view",BOOTSTRAP_SUPERHOME_VIEW:"bootstrap:member-super-home-view",BOOTSTRAP_CARD_VIEW:"bootstrap:card-view",BOOTSTRAP_BOARD_VIEW:"bootstrap:boards-view",BOOTSTRAP_IN_APP_GALLERY_VIEW:"bootstrap:in-app-gallery-view"},o="performance"in window,s=function(e){},d=Object.keys(n).map(function(e){return n[e]}),l="requestIdleCallback"in window?window.requestIdleCallback:setTimeout,c=function(){function e(){var a=this;!function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,e),t(this,"startupReported",!1),t(this,"Keys",n),t(this,"startMeasurement",o?function(e){if(-1!==d.indexOf(e))try{window.performance.mark("".concat(e,"-start"))}catch(e){console.error(e)}}:s),t(this,"stopMeasurement",o?function(e){if(-1!==d.indexOf(e))try{window.performance.mark("".concat(e,"-end")),window.performance.measure(e,"".concat(e,"-start"),"".concat(e,"-end"));var r=window.performance.getEntriesByName(e)[0];a.reportMetrics([{name:e,totalTime:r.duration}])}catch(e){console.error(e)}}:s)}var a,r,c;return a=e,(r=[{key:"reportMetrics",value:function(e){l(function(){e.forEach(function(e){e.name,e.totalTime})})}},{key:"reportStartupMetrics",value:function(){if(!this.startupReported){try{performance.mark("done"),window.performance.measure(n.LOAD_TO_INTERACTIVE,"startup:html-start","done");var e=window.performance.getEntriesByType("navigation")[0],a=window.performance.getEntriesByType("resource").filter(function(e){return"script"===e.initiatorType&&e.name.includes("ltp")})[0],r=window.performance.getEntriesByType("resource").filter(function(e){return"script"===e.initiatorType&&e.name.includes("app")})[0],i=window.performance.getEntriesByName(n.LOAD_TO_INTERACTIVE)[0],t=window.performance.getEntriesByName("done")[0];this.reportMetrics([{name:n.NAVIGATION,totalTime:e.responseEnd-e.fetchStart},{name:n.NAVIGATION_TLS,totalTime:e.secureConnectionStart>0?e.connectEnd-e.secureConnectionStart:0},{name:n.NAVIGATION_TTFB,totalTime:e.responseStart-e.requestStart},{name:n.TIME_TO_INTERACTIVE,totalTime:i.duration},{name:n.LOAD_TO_INTERACTIVE,totalTime:t.startTime-e.startTime},{name:n.LTP_DOWNLOAD,totalTime:a.responseEnd-a.responseStart},{name:n.APP_DOWNLOAD,totalTime:r.responseEnd-r.responseStart}])}catch(e){console.error(e)}this.startupReported=!0}}}])&&i(a.prototype,r),c&&i(a,c),e}();window.TrelloPerf=window.TrelloPerf?window.TrelloPerf:new c,a.default=window.TrelloPerf},3702:function(e,a,r){var i,t,n,o,s,d,l,c,m,u,p,b,f,_,g;n=r(298).default,i=n.Keys,c=r(699).default,t=r(825),u=function(e){try{return window.JSON.parse(e)}catch(e){return e,null}},o=function(e,a){var r;(r=new XMLHttpRequest).open("GET",e,!0),r.setRequestHeader("Accept","application/json,text/plain"),r.setRequestHeader("X-Trello-Client-Version",window.trelloVersion||"dev-0"),r.onreadystatechange=function(){4===r.readyState&&(200!==r.status?a([r.status,r.responseText]):a(null,[u(r.responseText),r]))},r.send(null)},m=function(e,a){var r,i,t,n,o,s,d,l;for(null==a&&(a={}),i=[],t=/invite-token-[-a-f0-9]*=([^;]+)/g;null!=(d=null!=(o=t.exec(document.cookie))?o[1]:void 0);)i.push(unescape(d));return i.length>0&&(a.invitationTokens=i.join(",")),/^\/1\/search(\/|$)/.test(e)&&(r=null!=(s=/dsc=([^;]+)/.exec(document.cookie))?s[1]:void 0,a.dsc=r),[e,function(){var e;for(n in e=[],a)l=a[n],e.push([n,encodeURIComponent(l)].join("="));return e}().join("&")].join("?")},f={},p=location.pathname.substr(1),d=function(){var e,a,r,n,o,s,d,l,u,b;return""===p?[{key:i.QL_MEMBER_BOARDS,url:m("/1/Members/me",t.memberBoards)}]:null!=(b=null!=(n=/^\/([^\/]*)/.exec(p))?n[1]:void 0)?(b=decodeURIComponent(b).toLowerCase().replace(/[-_ ]+/g," "))?[{key:i.QL_MEMBER_QUICK_BOARDS,url:m("/1/Members/me",t.memberQuickBoards)},{key:i.QL_SEARCH,url:m("/1/search",t.quickBoardsSearch(b))}]:[{key:i.QL_MEMBER_QUICK_BOARDS,url:m("/1/Members/me",t.memberQuickBoards)}]:null!=(e=null!=(o=null!=(s=/^b\/([^\/]+)/.exec(p))?s[1]:void 0)?o:null!=(d=/^board\/[^\/]+\/([^\/]+)/.exec(p))?d[1]:void 0)?[{key:i.QL_BOARD_MIN,url:m("/1/Boards/"+e,t.currentBoardMinimal)},{key:i.QL_BOARD_SECONDARY,url:m("/1/Boards/"+e,t.currentBoardSecondary)},{key:i.QL_BOARD_PLUGINS,url:m("/1/Boards/"+e,t.currentBoardPluginData)}]:null!=(a=null!=(l=/^c\/([^\/]+)/.exec(p))?l[1]:void 0)?[{key:i.QL_CARD,url:m("/1/Cards/"+a,t.card)}]:null!=(r=null!=(u=/^([^\/]+)$/.exec(p))?u[1]:void 0)&&c(r)?[{key:i.QL_ORGS,url:m("/1/Organizations/"+r,t.organizationBoardsPage)}]:[]},g=function(e){if(e in f)return delete f[e]},b=function(e){var a,r,i;a=e.key,(i=e.url)&&(n.startMeasurement(a),r={isLoading:!0,callbacks:[],start:Date.now(),used:!1,url:i},f[i]=r,o(i,function(e,t){var o,s,d,l,c,m;if(r.isLoading=!1,e)for(r.error=e,o=0,d=(c=r.callbacks).length;o<d;o++)(0,c[o])(e);else{for(r.data=t,n.stopMeasurement(a),s=0,l=(m=r.callbacks).length;s<l;s++)(0,m[s])(null,t);setTimeout(function(){return g(i)},1e4)}}))},s=function(e){var a,r,i,t,n;for(a={},r=0,t=(n=["isLoading","start","used","url"]).length;r<t;r++)a[i=n[r]]=e[i];return a},l=function(){return/token=/.test(document.cookie)||/token3000=/.test(document.cookie)||/token2999=/.test(document.cookie)},_={init:function(){var e,a,r,n;if(l())for(e=0,r=(n=[{key:i.QL_MEMBER_HEADER,url:m("/1/Members/me",t.memberHeader)}].concat(d())).length;e<r;e++)a=n[e],b(a)},makeUrl:m,load:function(e,a){var r;if(null!=(r=f[e]))return r.used=!0,r.isLoading?r.callbacks.push(a):(a(r.error,r.data),g(e)),s(r);o(e,a)},clear:function(){var e;for(e in f)g(e)}},e.exports=window.QuickLoad=_},699:function(e,a,r){"use strict";r.r(a);var i=["blank","shortcuts","search","templates"];a.default=function(e){return/^[a-z0-9_]{3,}$/.test(e)&&-1===i.indexOf(e)}},825:function(e,a){var r;e.exports=r={},r.boardFieldsMinimal=["name","closed","dateLastActivity","dateLastView","datePluginDisable","enterpriseOwned","idOrganization","prefs","shortLink","shortUrl","url","creationMethod"].join(","),r.boardFieldsFull=[r.boardFieldsMinimal,"desc","descData","idTags","invitations","invited","labelNames","limits","memberships","powerUps","subscribed","templateGallery","idEnterprise"].join(","),r.boardFieldsMinimalSubscribed=[r.boardFieldsMinimal,"subscribed"].join(","),r.memberFields=["avatarUrl","bio","bioData","confirmed","fullName","idEnterprise","idMemberReferrer","initials","memberType","nonPublic","products","url","username"].join(","),r.memberFieldsAndPremOrgsAdmin=[r.memberFields,"idPremOrgsAdmin"].join(","),r.organizationFieldsMinimal=["name","displayName","products","prefs","logoHash","idEnterprise","tags","limits","allAdminsEnabled"].join(","),r.organizationFieldsMinimalMemberships=[r.organizationFieldsMinimal,"memberships"].join(","),r.cardFieldsBulk=["badges","closed","dateLastActivity","desc","descData","due","dueComplete","dueReminder","idAttachmentCover","idList","idBoard","idMembers","idShort","idLabels","limits","name","pos","shortUrl","shortLink","subscribed","url","locationName","address","coordinates","cover","isTemplate"].join(","),r.boardFieldsInOrganization=[r.boardFieldsMinimal,"idTags"].join(","),r.organizationBoardsFields=[r.organizationFieldsMinimal,"desc","descData","website","limits","billableCollaboratorCount"].join(","),r.cardActions=["addAttachmentToCard","addChecklistToCard","addMemberToCard","commentCard","copyCommentCard","convertToCardFromCheckItem","createCard","copyCard","deleteAttachmentFromCard","emailCard","moveCardFromBoard","moveCardToBoard","removeChecklistFromCard","removeMemberFromCard","updateCard:idList","updateCard:closed","updateCard:due","updateCard:dueComplete","updateCheckItemStateOnCard","updateCustomFieldItem"].join(","),r.boardActions=[r.cardActions,"addMemberToBoard","addToOrganizationBoard","copyBoard","createBoard","createCustomField","createList","deleteCard","deleteCustomField","disablePlugin","disablePowerUp","enablePlugin","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeObserverOfBoard","moveListFromBoard","moveListToBoard","removeFromOrganizationBoard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCustomField","updateList:closed"].join(","),r.card={fields:"all",stickers:!0,attachments:!0,customFieldItems:!0,pluginData:!0},r.currentBoardMinimal={lists:"open",list_fields:"name,closed,idBoard,pos,subscribed,limits,creationMethod,softLimit",cards:"visible",card_attachments:"cover",card_stickers:!0,card_fields:[r.cardFieldsBulk,"labels"].join(","),card_checklists:"none",enterprise:!0,enterprise_fields:"displayName",members:"all",member_fields:r.memberFields,membersInvited:"all",membersInvited_fields:r.memberFields,memberships_orgMemberType:!0,checklists:"none",organization:!0,organization_fields:"name,displayName,desc,descData,url,website,prefs,memberships,logoHash,products,limits,idEnterprise",organization_tags:!0,organization_enterprise:!0,organization_disable_mock:!0,myPrefs:!0,fields:r.boardFieldsFull},r.currentBoardSecondary={fields:"",actions:r.boardActions,actions_display:!0,actions_limit:50,action_memberCreator_fields:r.memberFieldsAndPremOrgsAdmin,action_reactions:!0,checklists:"none",cards:"visible",card_fields:"",card_checklists:"all",card_checklist_checkItems:"none",labels:"all",labels_limit:1e3},r.currentBoardPluginData={fields:"",boardPlugins:!0,cards:"visible",card_fields:"",card_attachments:!0,card_attachment_fields:"bytes,date,edgeColor,idMember,isUpload,mimeType,name,url",card_customFieldItems:!0,customFields:!0,pluginData:!0,card_pluginData:!0,organization:!0,organization_fields:"",organization_pluginData:!0},r.memberBoards={boards:"open,starred",board_fields:r.boardFieldsMinimalSubscribed,boardStars:!0,boardsInvited:"all",boardsInvited_fields:r.boardFieldsMinimalSubscribed,board_organization:!0,board_organization_fields:r.organizationFieldsMinimal,credits:"invitation,promoCode",organizations:"all",organization_fields:r.organizationFieldsMinimalMemberships,organizationsInvited:"all",organizationsInvited_fields:r.organizationFieldsMinimal,paid_account:!0},r.memberHeader={campaigns:!0,channels:!0,organizations:"all",organization_paid_account:!0,organization_fields:"name,displayName,idEnterprise",organization_enterprise:!0,paid_account:!0,pluginData:!0,savedSearches:!0,missedTransferDate:!0,enterprises:!0,enterprise_filter:["saml","member","member-unconfirmed","owned"],enterprise_fields:"name,displayName,isRealEnterprise,idAdmins"},r.organizationBoardsPage={boards:"open",board_fields:r.boardFieldsInOrganization,board_starCounts:"organization",board_membershipCounts:"active",fields:r.organizationBoardsFields,paid_account:!0,enterprise:!0,memberships:"active",members:"all",tags:!0,billableCollaboratorCount:!0},r.memberQuickBoards={fields:"idOrganizations",boards:"open,starred",board_fields:r.boardFieldsMinimal,boardStars:!0,organizations:"all",organization_fields:"idBoards"},r.quickBoardsSearch=function(e){return{query:e,modelTypes:"boards",board_fields:r.boardFieldsMinimal,partial:!0}}}},[[3702,0]]]);
//# sourceMappingURL=quickload.ac0d296659fe9b6bc222.js.map