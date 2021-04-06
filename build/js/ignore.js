!function(e){var A={};function t(r){if(A[r])return A[r].exports;var n=A[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=A,t.d=function(e,A,r){t.o(e,A)||Object.defineProperty(e,A,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,A){if(1&A&&(e=t(e)),8&A)return e;if(4&A&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&A&&"string"!=typeof e)for(var n in e)t.d(r,n,function(A){return e[A]}.bind(null,n));return r},t.n=function(e){var A=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(A,"a",A),A},t.o=function(e,A){return Object.prototype.hasOwnProperty.call(e,A)},t.p="",t(t.s=0)}([function(e,A,t){t(1),t(2),t(3),t(4),t(5),t(6),e.exports=t(7)},function(e,A,t){"use strict";var r,n,o,i,a,d,s,l,c=!0,u=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,p=document.documentElement;function m(){return Math.floor(Date.now()/1e3)}function f(e){var A;a&&(a=null),A="html5"===localStorage.iss1Type?1:0,$(".iss1-player-type").removeClass("active"),$('.iss1-player-type[data-type="'+localStorage.iss1Type+'"]').addClass("active");var t='<iframe class="iss-feed-1" id="iss-feed-1" src="https://www.ustream.tv/embed/9408562?html5ui='+A+"&autoplay="+e+'&volume=0&muted=1&wmode" scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen" frameborder="0"></iframe>';$(".iss-feed-1-wrapper").find(".col-content").empty().append(t),$("#iss-feed-1").load((function(){a=UstreamEmbed("iss-feed-1"),i&&a.callMethod("play")}))}function w(e,A){s=null,d&&(d=null);var t='<iframe class="iss-feed-2" id="iss-feed-2" src="https://www.ustream.tv/embed/17074538?html5ui='+e+"&autoplay="+A+'&volume=0&muted=1" scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen" frameborder="0"></iframe>';$(".iss-feed-2-wrapper").find(".col-content").empty().append(t),$("#iss-feed-2").load((function(){d=UstreamEmbed("iss-feed-2"),i&&d.callMethod("play")}))}function h(e,A){d=null,s&&(s=null);var t='<iframe class="iss-feed-2" id="iss-feed-2" src="https://www.ustream.tv/embed/6540154?html5ui='+e+"&autoplay="+i+'&volume=50" scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" frameborder="0"></iframe>';$(".iss-feed-2-wrapper").find(".col-content").empty().append(t),$("#iss-feed-2").load((function(){s=UstreamEmbed("iss-feed-2"),i&&s.callMethod("play")}))}function g(e){var A=new XMLHttpRequest;A.open("GET","/api/txt/3-day-forecast.txt"),A.onload=function(t){if(200===A.status)try{var r=A.response;document.getElementById("text-aurora-forecast").innerHTML=r,e&&e()}catch(e){console.log(e),document.getElementById("neo-list").innerHTML='<div class="error-text-fetching-data">Error retrieving near-Earth objects</div>'}},A.onerror=function(A){document.getElementById("text-aurora-forecast").innerHTML='<div class="error-text-fetching-data">Error retrieving aurora forecast</div>',e&&e()},A.send()}localStorage.iss1Type||(localStorage.iss1Type="html5"),localStorage.iss2Type||(localStorage.iss2Type="html5"),u&&(p.className+=" ios"),"localhost"===window.location.hostname?(c=!1,r=3e4,n=3e4,o=3e4,i=!1):(r=6e5,n=18e5,o=6e5,i=!0),(window.onpopstate=function(){var e,A=/\+/g,t=/([^&=]+)=?([^&]*)/g,r=function(e){return decodeURIComponent(e.replace(A," "))},n=window.location.search.substring(1);for(l={};e=t.exec(n);)l[r(e[1])]=r(e[2])})(),c&&window.setTimeout((function(){window.setInterval((function(){$(".refresh-k-index").trigger("click")}),n),window.setInterval((function(){fetchCurrentKindex()}),6e4),$("#refresh-img-aurora-forecast").trigger("click"),window.setInterval((function(){$("#refresh-img-aurora-forecast").is(":hidden")||$("#refresh-img-aurora-forecast").trigger("click"),$("#refresh-text-aurora-forecast").is(":hidden")||$("#refresh-text-aurora-forecast").trigger("click")}),o)}),r),$(document).on("keyup",(function(e){27===e.keyCode&&($(".menu.visible").removeClass("visible"),$("body.no-scroll").removeClass("no-scroll"))})),$((function(){FastClick.attach(document.body),Swal.mixin({confirmButtonColor:"#222",padding:"0"}),checkSiteMessages(),fetchNEOs(),function(){var e=new XMLHttpRequest;e.open("GET","/api/json/peopleinspace.json"),e.onload=function(A){if(200===e.status)try{!function(e){var A,t,r=[];_.each(e,(function(A,t){"number"===t&&(r.number=A),"people"===t&&_.each(e.people,(function(e){r.push({name:e.name,title:e.title,country:""!==e.country?e.country:e.countryflag.slice(58,-4),flag:""!==e.country?e.country:e.countryflag.slice(58,-4),bio:e.bio})}))})),A=$("#people-in-space-astronaut-template").html(),t=Handlebars.compile(A)(r),$("#people-in-space").empty().append(t)}(JSON.parse(e.response))}catch(e){console.log(e),document.getElementById("people-in-space").innerHTML='<div class="error-text-fetching-data">Error retrieving people in space</div>'}else console.log("peopleinspace.json: "+e.status),document.getElementById("people-in-space").innerHTML='<div class="error-text-fetching-data">Error retrieving people in space</div>'},e.onerror=function(e){document.getElementById("people-in-space").innerHTML='<div class="error-text-fetching-data">Error retrieving people in space</div>'},e.send()}(),g(),f(i),"ISS"===window.INIT_FEED_2&&(w(1,i),$('.toggle-iss-feed-2[data-video-feed="nasa-tv"]').show()),"NASA"===window.INIT_FEED_2&&(h(1),$('.toggle-iss-feed-2[data-video-feed="iss-feed-2"]').show()),$(".iss1-player-type").on("click",(function(){var e=$(this).data("type");localStorage.iss1Type=e,f(i)})),$(".toggle-iss-feed-2").on("click",(function(){var e=$(this).data("video-feed");"nasa-tv"===e?h(1):w(1,i),$(".toggle-iss-feed-2[data-video-feed]").show(),$('.toggle-iss-feed-2[data-video-feed="'+e+'"]').hide()})),$(".refresh-btn").on("click",(function(e){var A=$(this),t=$(this).attr("id").substr(8);A.parent().parent().find(".refresh-overlay").addClass("visible"),setTimeout((function(){!function(e,A){var t=$("."+e);$.each(t,(function(){if(!$(this).is(":hidden")){var e=$(this)[0].tagName;if($(this))if("VIDEO"===e){$(this).find("source").remove();var t='<source src="./api/vid/current-corona.mp4?lastrefresh='+m()+'" type="video/mp4">';$(this).html(t)}else{var r=$(this).attr("src").replace(/\?lastrefresh=.*/,"");$(this).attr("src",""),$(this).attr("src",r+"?lastrefresh="+m())}}A&&("VIDEO"===e?A():$(this).load((function(){A()})))}))}(t,(function(){setTimeout((function(){A.parent().parent().find(".refresh-overlay").removeClass("visible")}),500)}))}),300)})),$(".refresh-aurora-forecast").on("click",(function(e){var A=$(this);A.parent().parent().find(".refresh-overlay").addClass("visible"),setTimeout((function(){g((function(){setTimeout((function(){A.parent().parent().find(".refresh-overlay").removeClass("visible")}),500)}))}),300)})),$(".toggle-aurora-forecast").on("click",(function(){var e=$(this).data("aurora-forecast");$(".grid-col[data-aurora-forecast]").hide(),$('.grid-col[data-aurora-forecast="'+e+'"]').show()})),$(".toggle-solar-visual").on("click",(function(){var e=$(this).data("solar-activity");$(".toggle-solar-visual").removeClass("active"),$(this).addClass("active"),$(".solar-activity").hide(),$('.solar-activity[data-solar-activity="'+e+'"]').show(),"video"===e&&0===$('.solar-activity[data-solar-activity="video"] source').length&&$('.solar-activity[data-solar-activity="video"]').html('<source src="./api/vid/current-corona.mp4" type="video/mp4">')})),$(".toggle-hemisphere").on("click",(function(){var e=$(this).data("hemisphere");$(".img-aurora-forecast").hide(),$('.img-aurora-forecast[data-hemisphere="'+e+'"]').show(),$(".toggle-hemisphere").show(),$('.toggle-hemisphere[data-hemisphere="'+e+'"]').hide()})),$(document).on("click",".collapsing-data",(function(e){$(this).find(".data-details").stop().slideToggle(150)})),$(".site-info-menu").on("click",(function(e){$(".menu.site-info").show().addClass("visible"),$("body").addClass("no-scroll")})),$(document).on("click",".close-menu.full-screen",(function(e){$("body").removeClass("no-scroll")})),$(".toggle-menu").on("click",(function(e){$(this).parent().parent().find(".menu").show(0,(function(){$(this).addClass("visible")}))})),$('.btn[class$="player-type"]').on("click",(function(e){$(this).data("player")})),$(document).on("click",".close-menu",(function(e){$(this).parent().removeClass("visible").hide()})),$('input[type="text"], textarea').on("keyup input keydown",(function(e){""===$(this).val()?$(this).removeClass("not-empty"):$(this).addClass("not-empty")})),$("#submit-contact-form").on("click",(function(){$("#contact-form .text-error").text("").hide(),$.ajax({type:"POST",url:"/contact.php",data:$("#contact-form").serialize(),success:function(e,A){"success"===A&&"Sentient check failed"===e?$("#contact-form .text-error").text("Human check failed, please uncheck the checkbox.").show():"success"===A&&"Email is required"===e?$("#contact-form .text-error").text("Sorry, an email is required.").show():"success"===A&&""===e&&(Swal.fire({title:"Sent!",text:"Thanks for writing!",timer:2e3,icon:"success",showConfirmButton:!1,confirmButtonColor:"#222",padding:"0.5em"}),$("#reset-contact-form").trigger("click"))},error:function(e,A,t){alert("Server error")}})})),$("#reset-contact-form").on("click",(function(){$("#contact-form").find('input[type="text"]').val(""),$("#contact-form").find("textarea").val(""),$("#contact-form").find('input[type="checkbox"]').prop("checked",!0),$('input[type="text"], textarea').trigger("keyup"),$("#contact-form .text-error").text("").hide()})),$(".header-toggle").on("click",(function(){$(".header-nav").toggleClass("visible"),$(".header-nav").hasClass("visible")?$(".header-toggle .toggle-text").empty().append("Close"):$(".header-toggle .toggle-text").empty().append("Menu")})),$(window).resize((function(){window.outerWidth>1024&&($(".header-nav").removeClass("visible"),$(".header-toggle .toggle-text").empty().append("Menu"))})),setTimeout((function(){$("#refresh-img-aurora-forecast").trigger("click")}),1500),setTimeout((function(){$("#refresh-solar-activity").trigger("click")}),2e3)}))},function(e,A,t){"use strict";_.mixin({sortKeysBy:function(e,A){var t=_.sortBy(_.keys(e),(function(t){return A?A(e[t],t):t}));return _.object(t,_.map(t,(function(A){return e[A]})))}})},function(e,A,t){"use strict";function r(){$(".current-k-index i").show();var e=new XMLHttpRequest;e.open("GET","/api/json/planetary-k-index-dst.json"),e.onload=function(A){if(200===e.status)try{var t=JSON.parse(e.response),r=t[t.length-1],n=moment(r[0]).format("HH:mm"),o=moment(moment.tz(r[0],"UTC")).tz(moment.tz.guess()).format("HH:mm"),i=moment.tz(moment.tz.guess()).zoneAbbr();if(!r)return $(".k-index-value").empty().append("-.--"),$(".kindex-local-timestamp").empty().append("--:-- "+i),$(".kindex-utc-timestamp").empty().append("--:-- UTC"),$(".geo-storm").empty().hide().css("color","#92D050"),void $(".current-k-index i").hide();var a={0:"G0",1:"G0",2:"G0",3:"G0",4:"G0",5:"G1",6:"G2",7:"G3",8:"G4",9:"G5"}[Math.floor(r[1])],d={G0:"#92D050",G1:"#F6EB14",G2:"#FFC800",G3:"#FF9600",G4:"#FF0000",G5:"#C80000"}[a];$(".geo-storm").empty().hide().css("color",d),$(".k-index-value").empty().append(r[1].toFixed(2)),$(".kindex-local-timestamp").empty().append(o+" "+i),$(".kindex-utc-timestamp").empty().append(n+" UTC"),"G0"!==a&&$(".geo-storm").append(a).show(),$(".current-k-index i").hide()}catch(e){console.log(e),$(".k-index-value").empty().append("-.--"),$(".kindex-local-timestamp").empty().append("--:-- "+i),$(".kindex-utc-timestamp").empty().append("--:-- UTC"),$(".geo-storm").empty().hide().css("color","#92D050"),$(".current-k-index i").hide()}else console.log("planetary-k-index-dst.json: "+e.status),$(".k-index-value").empty().append("-.--"),$(".geo-storm").empty().hide().css("color","#92D050"),$(".current-k-index i").hide()},e.onerror=function(e){console.log("Error")},e.send()}function n(e,A){var t=new XMLHttpRequest;t.open("GET","/api/json/noaa-planetary-k-index.json"),t.onload=function(e){if(200===t.status)try{document.querySelector(".historical-k-index-error")&&document.querySelector(".historical-k-index-error").remove();var r=JSON.parse(t.response),n={kIndexArray:[],kIndexColorArray:[],kIndexLabelArray:[],kIndexTooltipLabelArray:[],kIndexTooltipDateArray:[]},o="#FF381F",i={0:"#1DFF00",1:"#1DFF00",2:"#1DFF00",3:"#1DFF00",4:"#FFDD00",5:o,6:o,7:o,8:o,9:o};_.each(r,(function(e,A){if("time_tag"!==e[0]){n.kIndexArray.push(e[1]),n.kIndexColorArray.push(i[e[1]]);var t=e[0].substr(-12,5);n.kIndexLabelArray.push(t);var r=e[0],o=moment(e[0]).add(3,"hours").format("HH:mm"),a=(r=r.substr(-12,5))+" - "+(o=o.substr(-12,5));n.kIndexTooltipLabelArray.push(a);var d=moment(e[0]).format("D MMM YYYY");n.kIndexTooltipDateArray.push(d)}})),n.kIndexArray=n.kIndexArray.slice(-18),n.kIndexColorArray=n.kIndexColorArray.slice(-18),n.kIndexLabelArray=n.kIndexLabelArray.slice(-18),n.kIndexTooltipLabelArray=n.kIndexTooltipLabelArray.slice(-18),n.kIndexTooltipDateArray=n.kIndexTooltipDateArray.slice(-18),function(e,A){$(".k-index-wrapper").empty().append('<canvas id="planetary-k-index"></canvas>');var t=$("#planetary-k-index");window.planetarykIndexChart=new Chart(t,{type:"bar",backgroundColor:"#222",data:{labels:e.kIndexLabelArray,datasets:[{label:"Planetary K Index",data:e.kIndexArray,backgroundColor:e.kIndexColorArray,borderColor:e.kIndexColorArray,borderWidth:1,tooltipLabels:e.kIndexTooltipLabelArray,tooltipDates:e.kIndexTooltipDateArray}]},options:{animation:!1,scales:{xAxes:[{gridLines:{color:"#333"},ticks:{fontColor:"#CCC"}}],yAxes:[{gridLines:{color:"#333"},ticks:{beginAtZero:!0,fontColor:"#CCC",max:9,stepSize:1}}]},title:{display:!0,fontColor:"#CCC",text:"Planetary K Index (3 hour data - UTC)"},legend:{display:!1},tooltips:{backgroundColor:"rgba(255, 255, 255, 0.95)",titleFontColor:"#111",bodyFontColor:"#111",xPadding:10,yPadding:10,callbacks:{title:function(e,A){return"K Index: "+e[0].yLabel},label:function(e,A){return A.datasets[0].tooltipLabels[e.index]+", \n"+A.datasets[0].tooltipDates[e.index]}}},maintainAspectRatio:!1}})}(n),A&&A()}catch(e){console.log(e),document.querySelector(".k-index-wrapper").innerHTML='<div class="historical-k-index-error error-text-fetching-data">Error retrieving historical planetary K index</div>',A&&A()}else console.log("noaa-planetary-k-index.json: "+t.status),document.querySelector(".k-index-wrapper").innerHTML='<div class="historical-k-index-error error-text-fetching-data">Error retrieving historical planetary K index</div>',A&&A()},t.onerror=function(e){document.querySelector(".k-index-wrapper").innerHTML='<div class="historical-k-index-error error-text-fetching-data">Error retrieving historical planetary K index</div>',A&&A()},t.send()}$((function(){window.planetarykIndexChart="",n(0,null),r(),$(window).resize((function(){""!==window.planetarykIndexChart&&window.planetarykIndexChart.resize()})),$(".refresh-k-index").on("click",(function(e){var A=$(this);A.parent().parent().find(".refresh-overlay").addClass("visible"),setTimeout((function(){r(),n(0,(function(){A.parent().parent().find(".refresh-overlay").removeClass("visible")}))}),300)}))}))},function(e,A,t){"use strict";var r,n;function o(){var e="./site-message.json?lastrefresh="+seconds_since_epoch(),A=new XMLHttpRequest;A.open("GET",e),A.onload=function(e){if(200===A.status){var t=JSON.parse(A.response),o=t.has_site_message,i=t.has_webcast_message;r=t.site_message,n=t.webcast_message;var a=t.webcast_publish_time_start,d=t.webcast_publish_time_end,s=moment().utc().startOf("minute").format("YYYY-MM-DD HH:mm"),l=!0;""!==a&&""!==d&&(l=!1,s>=a&&s<d&&(l=!0)),"NASA_TV"===n.webcast_embed&&(n.webcast_embed=n.NASA_TV),o?($(".site-alert.message").is(":hidden")&&($(".site-alert.message").addClass("unread").show(),$(".header-toggle").addClass("unread alert"),$(".header-toggle .number").show()),r.type.error?$(".site-alert.message").addClass("error"):$(".site-alert.message").removeClass("error")):($(".site-alert.message").hide().removeClass("unread error"),i||($(".header-toggle").removeClass("unread alert"),$(".header-toggle .number").hide())),i&&l?$(".site-alert.webcast").is(":hidden")&&($(".site-alert.webcast").addClass("unread").show(),$(".header-toggle").addClass("unread alert"),$(".header-toggle .number").show()):($(".site-alert.webcast").hide().removeClass("unread"),o||($(".header-toggle").removeClass("unread alert"),$(".header-toggle .number").hide()))}},A.onerror=function(e){console.log("Error getting site message JSON.")},A.send(),setTimeout((function(){A.abort()}),1e4)}if("localhost"===window.location.hostname)var i=5e3;else i=6e4;window.setInterval((function(){o()}),i),$((function(){o(),$("#webcast-wrapper").empty(),$(document).on("click",".header-toggle.alert",(function(e){$(this).removeClass("unread"),$(".header-toggle").removeClass("unread")})),$(document).on("click",".site-alert.message",(function(e){$(this).not(".webcast")&&($(this).removeClass("unread"),Swal.fire({title:r.title,html:r.message,confirmButtonColor:"#222",padding:"0.5em"}))})),$(document).on("click",".site-alert.webcast",(function(e){$(this).removeClass("unread"),$(".header-toggle").removeClass("unread"),Swal.fire({title:n.title,html:n.message,showCancelButton:!0,confirmButtonText:"Watch now",confirmButtonColor:"#222",padding:"0.5em"}).then((function(e){if(e.value){var A=$("#webcast-template").html(),t=Handlebars.compile(A)(n);$("#webcast-wrapper").empty().append(t),issFeed1UstreamObj.callMethod("pause"),issFeed2UstreamObj&&issFeed2UstreamObj.callMethod("pause"),nasaTVUstreamObj&&nasaTVUstreamObj.callMethod("pause"),$(".webcast").show().addClass("visible"),$("body").addClass("no-scroll")}}))})),$(document).on("click",".close-webcast",(function(e){$("#webcast-wrapper").empty(),issFeed1UstreamObj.callMethod("play"),issFeed2UstreamObj&&issFeed2UstreamObj.callMethod("play"),nasaTVUstreamObj&&nasaTVUstreamObj.callMethod("play")})),$(document).on("keyup",(function(e){27===e.keyCode&&""!==$("#webcast-wrapper").html()&&($(".menu.visible").hide().removeClass("visible"),$("body.no-scroll").removeClass("no-scroll"),$("#webcast-wrapper").empty(),issFeed1UstreamObj.callMethod("play"),issFeed2UstreamObj&&issFeed2UstreamObj.callMethod("play"),nasaTVUstreamObj&&nasaTVUstreamObj.callMethod("play"))}))}))},function(e,A,t){"use strict";var r,n;function o(e){return new Promise((function(A,t){var r=new XMLHttpRequest;r.open("POST","https://api.uptimerobot.com/v2/getMonitors",!0),r.setRequestHeader("Content-type","application/x-www-form-urlencoded"),r.onload=function(e){if(200===r.status)if("Request failed"===r.response)console.log("Something went wrong.");else try{var t=JSON.parse(r.response);8!==t.monitors[0].status&&9!==t.monitors[0].status||n++}catch(e){console.log(e)}A()},r.onerror=function(e){console.log("Error retrieving monitor"),A()},r.send("api_key="+e+"&format=json&logs=1")}))}function i(){n=0;try{Promise.all([o("m778933372-05bb2c7333c04e4bd08b3959"),o("m778933374-e84a4fc81ff05ede5f44ebf6"),o("m778933363-ef6a1b05460d6e408d7dbcdd"),o("m778933376-b99856aef43a6fa669ec85c7"),o("m778933361-831c7def01778ea74ac34f95"),o("m780201323-c0bcadf010be087dc8690384")]).then((function(){n>0?(r=n>1?"I'm sorry for the inconvenience, but multiple sites providing data for Space Dashboard are down.":"I'm sorry for the inconvenience, but a site providing data for Space Dashboard is down.",$(".site-alert.site-monitor").is(":hidden")&&$(".site-alert.site-monitor").addClass("unread").show(),$(".site-alert.site-monitor .number").empty().append(n),$(".site-alert.site-monitor").show()):$(".site-alert.site-monitor").hide()})).catch((function(){console.log("Something went wrong with the promises")}))}catch(e){console.log(e)}}window.setInterval((function(){i()}),18e4),$((function(){i(),$(".site-alert.site-monitor").on("click",(function(){$(this).removeClass("unread"),Swal.fire({title:"Site Data",text:r,showCancelButton:!0,confirmButtonText:"Status Page",confirmButtonColor:"#222",padding:"0.5em"}).then((function(e){e.value&&window.open("https://status.spacedashboard.com/")}))}))}))},function(e,A,t){"use strict";function r(e,A,t,r){window.outerWidth<1024?(A.removeAttr("style"),t.removeAttr("style"),r.removeAttr("style"),e.draggabilly("disable")):e.draggabilly("enable")}$((function(){var e,A,t,n,o=$(".people-neo-wrapper"),i=$(".people-neo-dragger"),a=$("#people-in-space"),d=$("#neo-list");r(e=$(".people-neo-dragger").draggabilly({axis:"y",containment:".people-neo-wrapper"}),i,a,d),e.on("dragStart",(function(e,t){A=o.height()})),e.on("dragEnd",(function(e,r){t=i.offset().top-o.offset().top,n=t/A*100,percentFromTopPlus3pixels=(t+3)/A*100,a.css("bottom",100-n+"%"),d.css("top",percentFromTopPlus3pixels+"%"),i.css("top",n+"%")})),window.onresize=function(A){r(e,i,a,d)},i.dblclick((function(){i.removeAttr("style"),a.removeAttr("style"),d.removeAttr("style")}))}))},function(module,exports,__webpack_require__){"use strict";(function(module){var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};
/*!
 * modernizr v3.11.3
 * Build https://modernizr.com/download?-adownload-ambientlight-apng-appearance-applicationcache-arrow-atobbtoa-audio-audioautoplay-audioloop-audiopreload-backdropfilter-backgroundblendmode-backgroundcliptext-backgroundsize-batteryapi-bdi-beacon-bgpositionshorthand-bgpositionxy-bgrepeatspace_bgrepeatround-bgsizecover-blobconstructor-bloburls-blobworkers-borderimage-borderradius-boxdecorationbreak-boxshadow-boxsizing-canvas-canvasblending-canvastext-canvaswinding-capture-checked-classlist-connectioneffectivetype-contains-contenteditable-contextmenu-cookies-cors-createelementattrs_createelement_attrs-cryptography-cssall-cssanimations-csscalc-csschunit-csscolumns-cssescape-cssexunit-cssfilters-cssgradients-cssgrid_cssgridlegacy-csshyphens_softhyphens_softhyphensfind-cssinvalid-cssmask-csspointerevents-csspositionsticky-csspseudoanimations-csspseudotransitions-cssreflections-cssremunit-cssresize-cssscrollbar-csstransforms-csstransforms3d-csstransformslevel2-csstransitions-cssvalid-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-cubicbezierrange-customelements-customevent-customproperties-customprotocolhandler-dart-datachannel-datalistelem-dataset-datauri-dataview-dataworkers-details-devicemotion_deviceorientation-directory-display_runin-displaytable-documentfragment-ellipsis-emoji-es5-es5array-es5date-es5function-es5object-es5string-es5syntax-es5undefined-es6array-es6class-es6collections-es6math-es6number-es6object-es6string-es6symbol-es7array-es8object-eventlistener-eventsource-exiforientation-fetch-fileinput-filereader-filesystem-flash-flexbox-flexboxlegacy-flexboxtweener-flexgap-flexwrap-focuswithin-fontdisplay-fontface-forcetouch-formattribute-formvalidation-framed-fullscreen-gamepads-generatedcontent-generators-geolocation-getrandomvalues-getusermedia-hairline-hashchange-hidden-hiddenscroll-history-hovermq-hsla-htmlimports-ie8compat-imgcrossorigin-indexeddb-indexeddbblob-inlinesvg-input-inputformaction-inputformenctype-inputformmethod-inputformnovalidate-inputformtarget-inputsearchevent-inputtypes-intersectionobserver-intl-jpeg2000-jpegxr-json-lastchild-lazyloading-ligatures-localizednumber-localstorage-lowbandwidth-lowbattery-matchmedia-mathml-mediaqueries-mediasource-messagechannel-microdata-multiplebgs-mutationobserver-notification-nthchild-objectfit-olreversed-oninput-opacity-outputelem-overflowscrolling-pagevisibility-passiveeventlisteners-peerconnection-performance-picture-placeholder-pointerevents-pointerlock-pointermq-postmessage-preserve3d-progressbar_meter-promises-proximity-proxy-publickeycredential-queryselector-quotamanagement-regions-requestanimationframe-requestautocomplete-restdestructuringarray_restdestructuringobject-restparameters-rgba-ruby-sandbox-scriptasync-scriptdefer-scrollsnappoints-seamless-serviceworker-sessionstorage-shadowroot-shadowrootlegacy-shapes-sharedworkers-siblinggeneral-sizes-smil-speechrecognition-speechsynthesis-spreadarray-spreadobject-srcdoc-srcset-strictmode-stringtemplate-stylescoped-subpixelfont-supports-svg-svgasimg-svgclippaths-svgfilters-svgforeignobject-target-template-templatestrings-textalignlast-textareamaxlength-textdecoration-textencoder_textdecoder-textshadow-texttrackapi_track-time-todataurljpeg_todataurlpng_todataurlwebp-transferables-typedarrays-unicoderange-unknownelements-urlparser-urlsearchparams-userdata-userselect-variablefonts-vibrate-video-videoautoplay-videocrossorigin-videoloop-videopreload-vml-webanimations-webaudio-webgl-webglextensions-webintents-webp-webpalpha-webpanimation-webplossless_webp_lossless-websockets-websocketsbinary-websqldatabase-webworkers-willchange-wrapflow-xdomainrequest-xhr2-xhrresponsetype-xhrresponsetypearraybuffer-xhrresponsetypeblob-xhrresponsetypedocument-xhrresponsetypejson-xhrresponsetypetext-addtest-atrule-domprefixes-hasevent-load-mq-prefixed-prefixedcss-prefixes-printshiv-setclasses-testallprops-testprop-teststyles-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera
 *  Veeck

 * MIT License
 */!function(scriptGlobalObject,window,document,undefined){var tests=[],ModernizrProto={_version:"3.11.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,A){var t=this;setTimeout((function(){A(t[e])}),0)},addTest:function(e,A,t){tests.push({name:e,fn:A,options:t})},addAsyncTest:function(e){tests.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=ModernizrProto,Modernizr=new Modernizr;var classes=[];function is(e,A){return(void 0===e?"undefined":_typeof(e))===A}function testRunner(){var e,A,t,r,n,o;for(var i in tests)if(tests.hasOwnProperty(i)){if(e=[],(A=tests[i]).name&&(e.push(A.name.toLowerCase()),A.options&&A.options.aliases&&A.options.aliases.length))for(t=0;t<A.options.aliases.length;t++)e.push(A.options.aliases[t].toLowerCase());for(r=is(A.fn,"function")?A.fn():A.fn,n=0;n<e.length;n++)1===(o=e[n].split(".")).length?Modernizr[o[0]]=r:(Modernizr[o[0]]&&(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean)||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=r),classes.push((r?"":"no-")+o.join("-"))}}var docElement=document.documentElement,isSVG="svg"===docElement.nodeName.toLowerCase(),hasOwnProp,e;function setClasses(e){var A=docElement.className,t=Modernizr._config.classPrefix||"";if(isSVG&&(A=A.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");A=A.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(e.length>0&&(A+=" "+t+e.join(" "+t)),isSVG?docElement.className.baseVal=A:docElement.className=A)}function addTest(e,A){if("object"===(void 0===e?"undefined":_typeof(e)))for(var t in e)hasOwnProp(e,t)&&addTest(t,e[t]);else{var r=(e=e.toLowerCase()).split("."),n=Modernizr[r[0]];if(2===r.length&&(n=n[r[1]]),void 0!==n)return Modernizr;A="function"==typeof A?A():A,1===r.length?Modernizr[r[0]]=A:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=A),setClasses([(A&&!1!==A?"":"no-")+r.join("-")]),Modernizr._trigger(e,A)}return Modernizr}e={}.hasOwnProperty,hasOwnProp=is(e,"undefined")||is(e.call,"undefined")?function(e,A){return A in e&&is(e.constructor.prototype[A],"undefined")}:function(A,t){return e.call(A,t)},ModernizrProto._l={},ModernizrProto.on=function(e,A){this._l[e]||(this._l[e]=[]),this._l[e].push(A),Modernizr.hasOwnProperty(e)&&setTimeout((function(){Modernizr._trigger(e,Modernizr[e])}),0)},ModernizrProto._trigger=function(e,A){if(this._l[e]){var t=this._l[e];setTimeout((function(){var e;for(e=0;e<t.length;e++)(0,t[e])(A)}),0),delete this._l[e]}},Modernizr._q.push((function(){ModernizrProto.addTest=addTest}));var omPrefixes="Moz O ms Webkit",cssomPrefixes=ModernizrProto._config.usePrefixes?omPrefixes.split(" "):[];ModernizrProto._cssomPrefixes=cssomPrefixes;var atRule=function(e){var A,t=prefixes.length,r=window.CSSRule;if(void 0===r)return undefined;if(!e)return!1;if((A=(e=e.replace(/^@/,"")).replace(/-/g,"_").toUpperCase()+"_RULE")in r)return"@"+e;for(var n=0;n<t;n++){var o=prefixes[n];if(o.toUpperCase()+"_"+A in r)return"@-"+o.toLowerCase()+"-"+e}return!1};ModernizrProto.atRule=atRule;var domPrefixes=ModernizrProto._config.usePrefixes?omPrefixes.toLowerCase().split(" "):[];function createElement(){return"function"!=typeof document.createElement?document.createElement(arguments[0]):isSVG?document.createElementNS.call(document,"http://www.w3.org/2000/svg",arguments[0]):document.createElement.apply(document,arguments)}ModernizrProto._domPrefixes=domPrefixes;var hasEvent=function(){var e=!("onblur"in docElement);return function(A,t){var r;return!!A&&(t&&"string"!=typeof t||(t=createElement(t||"div")),!(r=(A="on"+A)in t)&&e&&(t.setAttribute||(t=createElement("div")),t.setAttribute(A,""),r="function"==typeof t[A],t[A]!==undefined&&(t[A]=undefined),t.removeAttribute(A)),r)}}(),html5;ModernizrProto.hasEvent=hasEvent,isSVG||function(e,A){var t,r,n=e.html5||{},o=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,i=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,a="_html5shiv",d=0,s={};function l(e,A){var t=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return t.innerHTML="x<style>"+A+"</style>",r.insertBefore(t.lastChild,r.firstChild)}function c(){var e=f.elements;return"string"==typeof e?e.split(" "):e}function u(e){var A=s[e[a]];return A||(A={},d++,e[a]=d,s[d]=A),A}function p(e,t,n){return t||(t=A),r?t.createElement(e):(n||(n=u(t)),!(a=n.cache[e]?n.cache[e].cloneNode():i.test(e)?(n.cache[e]=n.createElem(e)).cloneNode():n.createElem(e)).canHaveChildren||o.test(e)||a.tagUrn?a:n.frag.appendChild(a));var a}function m(e){e||(e=A);var n=u(e);return!f.shivCSS||t||n.hasCSS||(n.hasCSS=!!l(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),r||function(e,A){A.cache||(A.cache={},A.createElem=e.createElement,A.createFrag=e.createDocumentFragment,A.frag=A.createFrag()),e.createElement=function(t){return f.shivMethods?p(t,e,A):A.createElem(t)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+c().join().replace(/[\w\-:]+/g,(function(e){return A.createElem(e),A.frag.createElement(e),'c("'+e+'")'}))+");return n}")(f,A.frag)}(e,n),e}!function(){try{var e=A.createElement("a");e.innerHTML="<xyz></xyz>",t="hidden"in e,r=1==e.childNodes.length||function(){A.createElement("a");var e=A.createDocumentFragment();return void 0===e.cloneNode||void 0===e.createDocumentFragment||void 0===e.createElement}()}catch(e){t=!0,r=!0}}();var f={elements:n.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:"3.7.3",shivCSS:!1!==n.shivCSS,supportsUnknownElements:r,shivMethods:!1!==n.shivMethods,type:"default",shivDocument:m,createElement:p,createDocumentFragment:function(e,t){if(e||(e=A),r)return e.createDocumentFragment();for(var n=(t=t||u(e)).frag.cloneNode(),o=0,i=c(),a=i.length;o<a;o++)n.createElement(i[o]);return n},addElements:function(e,A){var t=f.elements;"string"!=typeof t&&(t=t.join(" ")),"string"!=typeof e&&(e=e.join(" ")),f.elements=t+" "+e,m(A)}};e.html5=f,m(A);var w=/^$|\b(?:all|print)\b/,h="html5shiv",g=!r&&function(){var t=A.documentElement;return!(void 0===A.namespaces||void 0===A.parentWindow||void 0===t.applyElement||void 0===t.removeNode||void 0===e.attachEvent)}();function v(e){for(var A,t=e.attributes,r=t.length,n=e.ownerDocument.createElement(h+":"+e.nodeName);r--;)(A=t[r]).specified&&n.setAttribute(A.nodeName,A.nodeValue);return n.style.cssText=e.style.cssText,n}function y(e){var A,t,r=u(e),n=e.namespaces,o=e.parentWindow;if(!g||e.printShived)return e;function i(){clearTimeout(r._removeSheetTimer),A&&A.removeNode(!0),A=null}return void 0===n[h]&&n.add(h),o.attachEvent("onbeforeprint",(function(){i();for(var r,n,o,a=e.styleSheets,d=[],s=a.length,u=Array(s);s--;)u[s]=a[s];for(;o=u.pop();)if(!o.disabled&&w.test(o.media)){try{n=(r=o.imports).length}catch(e){n=0}for(s=0;s<n;s++)u.push(r[s]);try{d.push(o.cssText)}catch(e){}}d=function(e){for(var A,t=e.split("{"),r=t.length,n=RegExp("(^|[\\s,>+~])("+c().join("|")+")(?=[[\\s,>+~#.:]|$)","gi");r--;)(A=t[r]=t[r].split("}"))[A.length-1]=A[A.length-1].replace(n,"$1html5shiv\\:$2"),t[r]=A.join("}");return t.join("{")}(d.reverse().join("")),t=function(e){for(var A,t=e.getElementsByTagName("*"),r=t.length,n=RegExp("^(?:"+c().join("|")+")$","i"),o=[];r--;)A=t[r],n.test(A.nodeName)&&o.push(A.applyElement(v(A)));return o}(e),A=l(e,d)})),o.attachEvent("onafterprint",(function(){!function(e){for(var A=e.length;A--;)e[A].removeNode()}(t),clearTimeout(r._removeSheetTimer),r._removeSheetTimer=setTimeout(i,500)})),e.printShived=!0,e}f.type+=" print",f.shivPrint=y,y(A),"object"==_typeof(module)&&module.exports&&(module.exports=f)}(void 0!==window?window:this,document);var err=function(){},warn=function(){};function getBody(){var e=document.body;return e||((e=createElement(isSVG?"svg":"body")).fake=!0),e}function injectElementWithStyles(e,A,t,r){var n,o,i,a,d="modernizr",s=createElement("div"),l=getBody();if(parseInt(t,10))for(;t--;)(i=createElement("div")).id=r?r[t]:d+(t+1),s.appendChild(i);return(n=createElement("style")).type="text/css",n.id="s"+d,(l.fake?l:s).appendChild(n),l.appendChild(s),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e)),s.id=d,l.fake&&(l.style.background="",l.style.overflow="hidden",a=docElement.style.overflow,docElement.style.overflow="hidden",docElement.appendChild(l)),o=A(s,e),l.fake?(l.parentNode.removeChild(l),docElement.style.overflow=a,docElement.offsetHeight):s.parentNode.removeChild(s),!!o}function computedStyle(e,A,t){var r;if("getComputedStyle"in window){r=getComputedStyle.call(window,e,A);var n=window.console;null!==r?t&&(r=r.getPropertyValue(t)):n&&n[n.error?"error":"log"].call(n,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}else r=!A&&e.currentStyle&&e.currentStyle[t];return r}window.console&&(err=function(){var e=console.error?"error":"log";window.console[e].apply(window.console,Array.prototype.slice.call(arguments))},warn=function(){var e=console.warn?"warn":"log";window.console[e].apply(window.console,Array.prototype.slice.call(arguments))}),ModernizrProto.load=function(){"yepnope"in window?(warn("yepnope.js (aka Modernizr.load) is no longer included as part of Modernizr. yepnope appears to be available on the page, so we’ll use it to handle this call to Modernizr.load, but please update your code to use yepnope directly.\n See http://github.com/Modernizr/Modernizr/issues/1182 for more information."),window.yepnope.apply(window,[].slice.call(arguments,0))):err("yepnope.js (aka Modernizr.load) is no longer included as part of Modernizr. Get it from http://yepnopejs.com. See http://github.com/Modernizr/Modernizr/issues/1182 for more information.")};var mq=function(){var e=window.matchMedia||window.msMatchMedia;return e?function(A){var t=e(A);return t&&t.matches||!1}:function(e){var A=!1;return injectElementWithStyles("@media "+e+" { #modernizr { position: absolute; } }",(function(e){A="absolute"===computedStyle(e,null,"position")})),A}}();function contains(e,A){return!!~(""+e).indexOf(A)}ModernizrProto.mq=mq;var modElem={elem:createElement("modernizr")};Modernizr._q.push((function(){delete modElem.elem}));var mStyle={style:modElem.elem.style};function domToCSS(e){return e.replace(/([A-Z])/g,(function(e,A){return"-"+A.toLowerCase()})).replace(/^ms-/,"-ms-")}function nativeTestProps(e,A){var t=e.length;if("CSS"in window&&"supports"in window.CSS){for(;t--;)if(window.CSS.supports(domToCSS(e[t]),A))return!0;return!1}if("CSSSupportsRule"in window){for(var r=[];t--;)r.push("("+domToCSS(e[t])+":"+A+")");return injectElementWithStyles("@supports ("+(r=r.join(" or "))+") { #modernizr { position: absolute; } }",(function(e){return"absolute"===computedStyle(e,null,"position")}))}return undefined}function cssToDOM(e){return e.replace(/([a-z])-([a-z])/g,(function(e,A,t){return A+t.toUpperCase()})).replace(/^-/,"")}function testProps(e,A,t,r){if(r=!is(r,"undefined")&&r,!is(t,"undefined")){var n=nativeTestProps(e,t);if(!is(n,"undefined"))return n}for(var o,i,a,d,s,l=["modernizr","tspan","samp"];!mStyle.style&&l.length;)o=!0,mStyle.modElem=createElement(l.shift()),mStyle.style=mStyle.modElem.style;function c(){o&&(delete mStyle.style,delete mStyle.modElem)}for(a=e.length,i=0;i<a;i++)if(d=e[i],s=mStyle.style[d],contains(d,"-")&&(d=cssToDOM(d)),mStyle.style[d]!==undefined){if(r||is(t,"undefined"))return c(),"pfx"!==A||d;try{mStyle.style[d]=t}catch(e){}if(mStyle.style[d]!==s)return c(),"pfx"!==A||d}return c(),!1}function fnBind(e,A){return function(){return e.apply(A,arguments)}}function testDOMProps(e,A,t){var r;for(var n in e)if(e[n]in A)return!1===t?e[n]:is(r=A[e[n]],"function")?fnBind(r,t||A):r;return!1}function testPropsAll(e,A,t,r,n){var o=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+cssomPrefixes.join(o+" ")+o).split(" ");return is(A,"string")||is(A,"undefined")?testProps(i,A,r,n):testDOMProps(i=(e+" "+domPrefixes.join(o+" ")+o).split(" "),A,t)}Modernizr._q.unshift((function(){delete mStyle.style})),ModernizrProto.testAllProps=testPropsAll;var prefixed=ModernizrProto.prefixed=function(e,A,t){return 0===e.indexOf("@")?atRule(e):(-1!==e.indexOf("-")&&(e=cssToDOM(e)),A?testPropsAll(e,A,t):testPropsAll(e,"pfx"))},prefixes=ModernizrProto._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];ModernizrProto._prefixes=prefixes;var prefixedCSS=ModernizrProto.prefixedCSS=function(e){var A=prefixed(e);return A&&domToCSS(A)};function testAllProps(e,A,t){return testPropsAll(e,undefined,undefined,A,t)}ModernizrProto.testAllProps=testAllProps;var testProp=ModernizrProto.testProp=function(e,A,t){return testProps([e],undefined,A,t)},testStyles=ModernizrProto.testStyles=injectElementWithStyles;
/*!
  {
    "name": "a[download] Attribute",
    "property": "adownload",
    "caniuse": "download",
    "tags": ["media", "attribute"],
    "builderAliases": ["a_download"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://developers.whatwg.org/links.html#downloading-resources"
    }]
  }
  !*/Modernizr.addTest("adownload",!window.externalHost&&"download"in createElement("a")),
/*!
  {
    "name": "Ambient Light Events",
    "property": "ambientlight",
    "caniuse": "ambient-light",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/ambient-light/"
    }]
  }
  !*/
Modernizr.addTest("ambientlight",hasEvent("devicelight",window)),
/*!
  {
    "name": "Application Cache",
    "property": "applicationcache",
    "caniuse": "offline-apps",
    "tags": ["storage", "offline"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/docs/HTML/Using_the_application_cache"
    }],
    "polyfills": ["html5gears"]
  }
  !*/
Modernizr.addTest("applicationcache","applicationCache"in window),
/*!
  {
    "name": "HTML5 Audio Element",
    "property": "audio",
    "caniuse": "audio",
    "tags": ["html5", "audio", "media"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements"
    }]
  }
  !*/
function(){var e=createElement("audio");Modernizr.addTest("audio",(function(){var A=!1;try{(A=!!e.canPlayType)&&(A=new Boolean(A))}catch(e){}return A}));try{e.canPlayType&&(Modernizr.addTest("audio.ogg",e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,"")),Modernizr.addTest("audio.mp3",e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,"")),Modernizr.addTest("audio.opus",e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,"")),Modernizr.addTest("audio.wav",e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,"")),Modernizr.addTest("audio.m4a",(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,"")))}catch(e){}}(),
/*!
  {
    "name": "Audio Autoplay",
    "property": "audioautoplay",
    "authors": ["Jordy van Dortmont"],
    "tags": ["audio"],
    "async": true
  }
  !*/
Modernizr.addAsyncTest((function(){var e,A=0,t=createElement("audio"),r=t.style;function n(r){A++,clearTimeout(e);var o=r&&"playing"===r.type||0!==t.currentTime;!o&&A<5?e=setTimeout(n,200):(t.removeEventListener("playing",n,!1),addTest("audioautoplay",o),t.parentNode&&t.parentNode.removeChild(t))}if(Modernizr.audio&&"autoplay"in t){r.position="absolute",r.height=0,r.width=0;try{if(Modernizr.audio.mp3)t.src="data:audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";else{if(!Modernizr.audio.wav)return void addTest("audioautoplay",!1);t.src="data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAEAAAABAAAAABAAgAZGF0YRAAAAB/f39/f39/f39/f39/f39/"}}catch(e){return void addTest("audioautoplay",!1)}t.setAttribute("autoplay",""),r.cssText="display:none",docElement.appendChild(t),setTimeout((function(){t.addEventListener("playing",n,!1),e=setTimeout(n,200)}),0)}else addTest("audioautoplay",!1)})),
/*!
  {
    "name": "Audio Loop Attribute",
    "property": "audioloop",
    "tags": ["audio", "media"]
  }
  !*/
Modernizr.addTest("audioloop","loop"in createElement("audio")),
/*!
  {
    "name": "Audio Preload",
    "property": "audiopreload",
    "tags": ["audio", "media"],
    "async": true,
    "warnings": ["This test is very large – only include it if you absolutely need it"]
  }
  !*/
Modernizr.addAsyncTest((function(){var e,A=createElement("audio"),t=A.style;function r(t){clearTimeout(e);var n=t!==undefined&&"loadeddata"===t.type;A.removeEventListener("loadeddata",r,!1),addTest("audiopreload",n),A.parentNode&&A.parentNode.removeChild(A)}if(Modernizr.audio&&"preload"in A){t.position="absolute",t.height=0,t.width=0;try{if(Modernizr.audio.mp3)A.src="data:audio/mpeg;base64,//MUxAAB6AXgAAAAAPP+c6nf//yi/6f3//MUxAMAAAIAAAjEcH//0fTX6C9Lf//0//MUxA4BeAIAAAAAAKX2/6zv//+IlR4f//MUxBMCMAH8AAAAABYWalVMQU1FMy45//MUxBUB0AH0AAAAADkuM1VVVVVVVVVV//MUxBgBUATowAAAAFVVVVVVVVVVVVVV";else if(Modernizr.audio.m4a)A.src="data:audio/x-m4a;base64,AAAAGGZ0eXBNNEEgAAACAGlzb21pc28yAAAACGZyZWUAAAAfbWRhdN4EAABsaWJmYWFjIDEuMjgAAAFoAQBHAAACiG1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAYAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAG0dHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAYAAAAAAAAAAAAAAAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAABUG1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAArEQAAAQAVcQAAAAAAC1oZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU291bmRIYW5kbGVyAAAAAPttaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAL9zdGJsAAAAW3N0c2QAAAAAAAAAAQAAAEttcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAACdlc2RzAAAAAAMZAAEABBFAFQAAAAABftAAAAAABQISCAYBAgAAABhzdHRzAAAAAAAAAAEAAAABAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAXAAAAAQAAABRzdGNvAAAAAAAAAAEAAAAoAAAAYHVkdGEAAABYbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAraWxzdAAAACOpdG9vAAAAG2RhdGEAAAABAAAAAExhdmY1Mi42NC4y";else if(Modernizr.audio.ogg)A.src="data:audio/ogg;base64,T2dnUwACAAAAAAAAAAD/QwAAAAAAAM2LVKsBHgF2b3JiaXMAAAAAAUSsAAAAAAAAgLsAAAAAAAC4AU9nZ1MAAAAAAAAAAAAA/0MAAAEAAADmvOe6Dy3/////////////////MgN2b3JiaXMdAAAAWGlwaC5PcmcgbGliVm9yYmlzIEkgMjAwNzA2MjIAAAAAAQV2b3JiaXMfQkNWAQAAAQAYY1QpRplS0kqJGXOUMUaZYpJKiaWEFkJInXMUU6k515xrrLm1IIQQGlNQKQWZUo5SaRljkCkFmVIQS0kldBI6J51jEFtJwdaYa4tBthyEDZpSTCnElFKKQggZU4wpxZRSSkIHJXQOOuYcU45KKEG4nHOrtZaWY4updJJK5yRkTEJIKYWSSgelU05CSDWW1lIpHXNSUmpB6CCEEEK2IIQNgtCQVQAAAQDAQBAasgoAUAAAEIqhGIoChIasAgAyAAAEoCiO4iiOIzmSY0kWEBqyCgAAAgAQAADAcBRJkRTJsSRL0ixL00RRVX3VNlVV9nVd13Vd13UgNGQVAAABAEBIp5mlGiDCDGQYCA1ZBQAgAAAARijCEANCQ1YBAAABAABiKDmIJrTmfHOOg2Y5aCrF5nRwItXmSW4q5uacc845J5tzxjjnnHOKcmYxaCa05pxzEoNmKWgmtOacc57E5kFrqrTmnHPGOaeDcUYY55xzmrTmQWo21uaccxa0pjlqLsXmnHMi5eZJbS7V5pxzzjnnnHPOOeecc6oXp3NwTjjnnHOi9uZabkIX55xzPhmne3NCOOecc84555xzzjnnnHOC0JBVAAAQAABBGDaGcacgSJ+jgRhFiGnIpAfdo8MkaAxyCqlHo6ORUuoglFTGSSmdIDRkFQAACAAAIYQUUkghhRRSSCGFFFKIIYYYYsgpp5yCCiqppKKKMsoss8wyyyyzzDLrsLPOOuwwxBBDDK20EktNtdVYY62555xrDtJaaa211koppZRSSikIDVkFAIAAABAIGWSQQUYhhRRSiCGmnHLKKaigAkJDVgEAgAAAAgAAADzJc0RHdERHdERHdERHdETHczxHlERJlERJtEzL1ExPFVXVlV1b1mXd9m1hF3bd93Xf93Xj14VhWZZlWZZlWZZlWZZlWZZlWYLQkFUAAAgAAIAQQgghhRRSSCGlGGPMMeegk1BCIDRkFQAACAAgAAAAwFEcxXEkR3IkyZIsSZM0S7M8zdM8TfREURRN01RFV3RF3bRF2ZRN13RN2XRVWbVdWbZt2dZtX5Zt3/d93/d93/d93/d93/d1HQgNWQUASAAA6EiOpEiKpEiO4ziSJAGhIasAABkAAAEAKIqjOI7jSJIkSZakSZ7lWaJmaqZneqqoAqEhqwAAQAAAAQAAAAAAKJriKabiKaLiOaIjSqJlWqKmaq4om7Lruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7rui4QGrIKAJAAANCRHMmRHEmRFEmRHMkBQkNWAQAyAAACAHAMx5AUybEsS9M8zdM8TfRET/RMTxVd0QVCQ1YBAIAAAAIAAAAAADAkw1IsR3M0SZRUS7VUTbVUSxVVT1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTVN0zRNIDRkJQAABADAYo3B5SAhJSXl3hDCEJOeMSYhtV4hBJGS3jEGFYOeMqIMct5C4xCDHggNWREARAEAAMYgxxBzyDlHqZMSOeeodJQa5xyljlJnKcWYYs0oldhSrI1zjlJHraOUYiwtdpRSjanGAgAAAhwAAAIshEJDVgQAUQAAhDFIKaQUYow5p5xDjCnnmHOGMeYcc44556B0UirnnHROSsQYc445p5xzUjonlXNOSiehAACAAAcAgAALodCQFQFAnACAQZI8T/I0UZQ0TxRFU3RdUTRd1/I81fRMU1U90VRVU1Vt2VRVWZY8zzQ901RVzzRV1VRVWTZVVZZFVdVt03V123RV3ZZt2/ddWxZ2UVVt3VRd2zdV1/Zd2fZ9WdZ1Y/I8VfVM03U903Rl1XVtW3VdXfdMU5ZN15Vl03Vt25VlXXdl2fc103Rd01Vl2XRd2XZlV7ddWfZ903WF35VlX1dlWRh2XfeFW9eV5XRd3VdlVzdWWfZ9W9eF4dZ1YZk8T1U903RdzzRdV3VdX1dd19Y105Rl03Vt2VRdWXZl2fddV9Z1zzRl2XRd2zZdV5ZdWfZ9V5Z13XRdX1dlWfhVV/Z1WdeV4dZt4Tdd1/dVWfaFV5Z14dZ1Ybl1XRg+VfV9U3aF4XRl39eF31luXTiW0XV9YZVt4VhlWTl+4ViW3feVZXRdX1ht2RhWWRaGX/id5fZ943h1XRlu3efMuu8Mx++k+8rT1W1jmX3dWWZfd47hGDq/8OOpqq+brisMpywLv+3rxrP7vrKMruv7qiwLvyrbwrHrvvP8vrAso+z6wmrLwrDatjHcvm4sv3Acy2vryjHrvlG2dXxfeArD83R1XXlmXcf2dXTjRzh+ygAAgAEHAIAAE8pAoSErAoA4AQCPJImiZFmiKFmWKIqm6LqiaLqupGmmqWmeaVqaZ5qmaaqyKZquLGmaaVqeZpqap5mmaJqua5qmrIqmKcumasqyaZqy7LqybbuubNuiacqyaZqybJqmLLuyq9uu7Oq6pFmmqXmeaWqeZ5qmasqyaZquq3meanqeaKqeKKqqaqqqraqqLFueZ5qa6KmmJ4qqaqqmrZqqKsumqtqyaaq2bKqqbbuq7Pqybeu6aaqybaqmLZuqatuu7OqyLNu6L2maaWqeZ5qa55mmaZqybJqqK1uep5qeKKqq5ommaqqqLJumqsqW55mqJ4qq6omea5qqKsumatqqaZq2bKqqLZumKsuubfu+68qybqqqbJuqauumasqybMu+78qq7oqmKcumqtqyaaqyLduy78uyrPuiacqyaaqybaqqLsuybRuzbPu6aJqybaqmLZuqKtuyLfu6LNu678qub6uqrOuyLfu67vqucOu6MLyybPuqrPq6K9u6b+sy2/Z9RNOUZVM1bdtUVVl2Zdn2Zdv2fdE0bVtVVVs2TdW2ZVn2fVm2bWE0Tdk2VVXWTdW0bVmWbWG2ZeF2Zdm3ZVv2ddeVdV/XfePXZd3murLty7Kt+6qr+rbu+8Jw667wCgAAGHAAAAgwoQwUGrISAIgCAACMYYwxCI1SzjkHoVHKOecgZM5BCCGVzDkIIZSSOQehlJQy5yCUklIIoZSUWgshlJRSawUAABQ4AAAE2KApsThAoSErAYBUAACD41iW55miatqyY0meJ4qqqaq27UiW54miaaqqbVueJ4qmqaqu6+ua54miaaqq6+q6aJqmqaqu67q6Lpqiqaqq67qyrpumqqquK7uy7Oumqqqq68quLPvCqrquK8uybevCsKqu68qybNu2b9y6ruu+7/vCka3rui78wjEMRwEA4AkOAEAFNqyOcFI0FlhoyEoAIAMAgDAGIYMQQgYhhJBSSiGllBIAADDgAAAQYEIZKDRkRQAQJwAAGEMppJRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkgppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkqppJRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoplVJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSCgCQinAAkHowoQwUGrISAEgFAACMUUopxpyDEDHmGGPQSSgpYsw5xhyUklLlHIQQUmktt8o5CCGk1FJtmXNSWosx5hgz56SkFFvNOYdSUoux5ppr7qS0VmuuNedaWqs115xzzbm0FmuuOdecc8sx15xzzjnnGHPOOeecc84FAOA0OACAHtiwOsJJ0VhgoSErAYBUAAACGaUYc8456BBSjDnnHIQQIoUYc845CCFUjDnnHHQQQqgYc8w5CCGEkDnnHIQQQgghcw466CCEEEIHHYQQQgihlM5BCCGEEEooIYQQQgghhBA6CCGEEEIIIYQQQgghhFJKCCGEEEIJoZRQAABggQMAQIANqyOcFI0FFhqyEgAAAgCAHJagUs6EQY5Bjw1BylEzDUJMOdGZYk5qMxVTkDkQnXQSGWpB2V4yCwAAgCAAIMAEEBggKPhCCIgxAABBiMwQCYVVsMCgDBoc5gHAA0SERACQmKBIu7iALgNc0MVdB0IIQhCCWBxAAQk4OOGGJ97whBucoFNU6iAAAAAAAAwA4AEA4KAAIiKaq7C4wMjQ2ODo8AgAAAAAABYA+AAAOD6AiIjmKiwuMDI0Njg6PAIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAE7AwAAAAAAAD/QwAAAgAAADuydfsFAQEBAQEACg4ODg==";else{if(!Modernizr.audio.wav)return void addTest("audiopreload",!1);A.src="data:audio/wav;base64,UklGRvwZAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YdgZAAAAAAEA/v8CAP//AAABAP////8DAPz/BAD9/wEAAAAAAAAAAAABAP7/AgD//wAAAQD//wAAAQD//wAAAQD+/wIA//8AAAAAAAD//wIA/v8BAAAA//8BAAAA//8BAP//AQAAAP//AQD//wEAAAD//wEA//8BAP//AQD//wEA//8BAP//AQD+/wMA/f8DAP3/AgD+/wIA/////wMA/f8CAP7/AgD+/wMA/f8CAP7/AgD//wAAAAAAAAAAAQD+/wIA/v8CAP7/AwD9/wIA/v8BAAEA/v8CAP7/AQAAAAAAAAD//wEAAAD//wIA/f8DAP7/AQD//wEAAAD//wEA//8CAP7/AQD//wIA/v8CAP7/AQAAAAAAAAD//wEAAAAAAAAA//8BAP//AgD9/wQA+/8FAPz/AgAAAP//AgD+/wEAAAD//wIA/v8CAP3/BAD8/wQA/P8DAP7/AwD8/wQA/P8DAP7/AQAAAAAA//8BAP//AgD+/wEAAAD//wIA/v8BAP//AQD//wEAAAD//wEA//8BAAAAAAAAAP//AgD+/wEAAAAAAAAAAAD//wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AgD+/wIA/v8BAP//AQABAP7/AQD//wIA/v8CAP3/AwD/////AgD9/wMA/v8BAP//AQAAAP//AQD//wEA//8BAP//AAABAP//AAABAP//AQD//wAAAAACAP3/AwD9/wIA//8BAP//AQD//wEA//8BAP//AgD9/wMA/v8AAAIA/f8CAAAA/v8EAPv/BAD9/wIAAAD+/wQA+v8HAPr/BAD+/wEAAAD//wIA/f8EAPz/BAD7/wUA/P8EAPz/AwD+/wEAAAD//wEAAAAAAP//AgD8/wUA+/8FAPz/AwD9/wIA//8AAAEA/v8CAP//AQD//wAAAAABAP//AgD9/wMA/f8EAPz/AwD+/wAAAwD7/wUA/P8DAP7/AQAAAP//AgD+/wEAAQD+/wIA/v8BAAEA/v8CAP7/AQAAAP//AgD9/wMA/f8DAP7/AgD+/wEAAAAAAAEA//8AAAEA/v8DAP3/AgD//wEA//8BAP7/AwD9/wMA/v8BAP//AQAAAP//AgD9/wMA/v8BAP//AQAAAP//AgD+/wEAAQD+/wIA/////wIA//8AAAEA/f8DAP//AAABAP////8DAP3/AwD+/wEA//8BAP//AQAAAAAA//8BAP//AQD//wEA//8BAP//AAAAAAEA//8BAP7/AgD//wEA//8AAAAAAAAAAAAAAAD//wIA/v8BAAAA//8BAAEA/v8BAAAA//8DAPz/AwD+/wIA/v8CAP3/AwD+/wEAAAD//wEA//8BAAAA//8BAAAA/v8EAPv/BAD+/wAAAAABAP7/AgD//wAAAAABAP7/AgD//wAAAAAAAAAAAAABAP3/BAD8/wQA/f8BAAAAAAABAP7/AgD+/wIA/v8CAP7/AgD+/wIA/v8BAAAAAAD//wIA/f8DAP7/AAABAP//AAACAPz/BAD9/wIA//8AAP//AwD9/wMA/P8EAP3/AwD9/wIA//8BAP//AQD+/wMA/f8DAP7/AAABAP//AQAAAP//AQD//wIA/f8DAP7/AQAAAP//AQAAAAAA//8CAP7/AQABAP7/AgD+/wEAAQD+/wIA/v8CAP////8CAP7/AgD//wAAAAABAP7/AwD9/wIAAAD+/wMA/f8CAP//AQD+/wMA/f8CAP//AAACAPz/BQD6/wUA/v///wIA/v8CAP3/BAD7/wYA+v8FAPz/AwD/////AgD+/wEAAAD//wEAAAD//wIA/f8DAP7/AQAAAP//AgD//wAA//8BAAAAAAAAAP//AQD//wEA//8AAAIA/f8DAP3/AgAAAP//AQD//wEA//8AAAEA//8BAP////8CAP//AAABAP3/BAD9/wIA/v8BAAEA//8BAP7/AgD//wEA//8AAAEA//8BAP//AAAAAAEA//8BAP7/AgD//wEA//8AAAAAAQD+/wIA/v8BAAAAAAD//wIA/v8BAAAAAAAAAAAAAQD+/wMA/f8CAP//AQD//wIA/f8DAP7/AQD//wEA//8CAP7/AAABAP7/AwD9/wMA/v8AAAEA//8BAAAAAAD//wIA/v8BAAAA//8CAP7/AgD+/wEA//8CAP7/AgD//wAAAAAAAAAAAQD//wEA/v8DAPz/BQD8/wIA//8AAAEAAAD//wEA//8BAP//AQAAAAAA//8BAP//AgD+/wEAAAAAAP//AQD+/wMA/////wEA/v8CAP//AQD//wEA//8AAAEA//8BAAAA/v8EAPz/AwD+/wEAAAAAAAAA//8CAP7/AQD//wEA//8BAP//AAABAP7/AwD9/wIA//8BAP//AQD//wEA//8AAAEA/v8EAPv/BAD9/wIA//8BAP7/AwD9/wIA//8AAAEA//8BAP//AQD//wAAAQD//wEAAAD+/wMA/v8AAAIA/f8DAP7/AQD//wAAAQD+/wMA/f8CAP//AAABAP7/AgD+/wMA/f8CAP7/AQABAP7/AgD+/wIA/v8CAP7/AwD8/wMA//8AAAEA//8AAAAAAAABAP//AQD//wAAAQD//wIA/f8DAP3/AwD+/wAAAgD9/wIA//8AAAEAAAD+/wMA/P8FAPv/BAD9/wIA//8AAP//AgD+/wIA/v8BAAAAAAD//wEAAAAAAP//AQD//wEA//8BAP//AAABAP7/AwD9/wIA//8BAP//AAABAP//AQD//wAAAQD//wEA//8BAP//AAABAAAA//8BAP7/AwD9/wMA/f8DAP3/AgD//wEA//8BAP7/AgD//wAAAgD8/wQA/f8CAP//AQD+/wMA/f8CAP7/AgD//wAAAAAAAAAAAAABAP7/AwD9/wIA/v8DAP3/AwD9/wIA/v8DAPz/BQD7/wQA/f8CAP7/AwD9/wMA/f8CAP//AQAAAP7/AwD+/wEA//8AAAEAAAAAAP//AAABAP//AQAAAP7/AwD9/wMA/f8CAP//AQD//wEA//8AAAIA/f8CAAAA//8BAAAA//8BAAAA/v8EAPv/BAD9/wIA//8AAAEA/v8CAP//AAABAP//AAABAP//AAABAP7/AwD8/wQA/f8CAAAA/v8DAP3/AwD9/wMA/v8BAAAA//8BAAAA//8CAP7/AQAAAAAAAAAAAAAA//8CAP7/AgD+/wIA/v8CAP7/AgD//wAAAQD//wAAAQD//wAAAQD//wAAAQD+/wIA//8AAAAAAQD+/wMA/f8CAP//AQD//wEA//8AAAEA/v8DAP3/AgD//wAAAAABAP7/AwD9/wIA//8AAAEA/v8DAP3/AgD//wAAAAABAP7/AwD8/wMA/v8CAP//AAD//wIA/v8CAP7/AQABAP7/AQAAAP//AgD/////AQD//wEAAAD//wEA/v8EAPv/BAD9/wMA/v8BAAAA//8BAAEA/P8GAPr/BQD8/wMA/v8BAAAA//8CAP7/AQABAP3/BAD7/wYA+/8EAPz/AwD//wEA//8BAP7/BAD8/wMA/v8AAAIA/v8BAAAA//8BAAAA//8BAAAA//8CAP3/AwD+/wAAAgD8/wUA/P8DAP7/AAABAAAAAAD//wEAAAD//wIA/f8DAP7/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/f8EAPz/AwD/////AgD+/wIA/f8DAP7/AgD+/wEA//8CAP7/AQD//wEAAAAAAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAP//AQAAAP//AAACAP3/BAD7/wQA/v8BAAAA//8BAP//AQAAAP//AQAAAP7/BAD7/wUA+/8EAP3/AgD//wAAAQD+/wIA//8AAAEA/v8CAP//AQD+/wEAAAAAAAAAAAD//wEA//8CAP3/AwD9/wIA//8AAAAAAAAAAAAA//8BAP//AgD+/wEA//8CAP7/AQAAAP//AgD/////AgD/////AgD+/wIA//8AAP//AQABAP7/AgD9/wMA/v8CAP////8BAAAAAAAAAAAA//8CAP////8DAPz/AwD+/wEAAAAAAP//AQD//wEAAAD//wEAAAD+/wQA+/8FAPz/AgAAAP//AgD9/wMA/v8BAAAAAAD//wEAAAD//wIA/v8BAAAAAAD//wIA/v8BAAAA//8BAAAA//8CAP7/AQD//wEA//8BAAAA//8BAP//AAABAP//AQAAAP7/AgD//wEA//8AAAAAAQD+/wMA/P8EAP7///8DAPz/BQD8/wEAAQD+/wMA/v8AAAEA//8BAP//AQD//wEA/v8CAP//AQD//wAAAAABAAAA//8BAP//AQAAAAAA//8BAP//AgD+/wAAAQD//wIA/f8CAP//AQAAAP7/AwD9/wMA/v8BAP//AAABAP//AgD9/wIA//8BAAAA//8BAAAA//8CAP3/AwD+/wEAAAD+/wQA/P8DAP7/AAACAP7/AQAAAP//AQAAAP//AQAAAP//AgD9/wIAAAD//wIA/f8DAP7/AQD//wEA//8CAP7/AQD//wAAAQD//wEA//8AAAAAAQD//wEAAAD9/wUA+/8FAPz/AgD//wAAAQD//wAAAQD+/wMA/f8BAAEA/v8CAP7/AgD+/wIA/v8BAAAAAAAAAAAAAAD//wIA/v8CAP////8CAP7/AgD+/wIA/v8CAP7/AQAAAP//AQAAAP//AQD//wAAAQD//wAAAQD+/wMA/f8CAAAA/v8DAP3/AgAAAP//AQAAAP7/AwD9/wMA/v8BAP//AQD//wEAAAD+/wMA/f8CAAAA/v8CAP//AAAAAAEA//8AAAEA/v8DAP3/AwD9/wIA//8BAP//AgD8/wQA/v8BAAAA/v8CAP//AQD//wAAAAAAAAEA/f8EAPz/BAD9/wIA//8AAAAAAAABAP//AAAAAAAAAAABAP3/BAD9/wIA/v8BAAEA//8AAAAA//8CAP7/AgD9/wQA+/8FAPv/BQD8/wMA/f8DAP3/AwD+/wAAAgD9/wMA/f8CAAAA/v8EAPv/BQD7/wUA/P8DAP///v8DAP3/BAD8/wMA/f8DAP7/AQD//wEAAAD//wEA/v8CAAAA/v8CAP7/AgD//wAAAAAAAAAAAQD+/wIA//8AAAEA/v8DAPz/BAD9/wIA//8AAP//AgD//wEA/v8BAAAAAQD//wAAAAAAAAEA//8AAAEA//8BAP//AAABAP//AQD+/wIA/v8DAPz/BAD8/wQA/f8BAAAAAQD+/wMA/P8DAP//AAAAAAAAAAD//wMA+/8FAP3/AQABAP3/BAD8/wMA/v8BAAAA//8CAP3/AwD+/wEAAQD9/wMA/f8EAPz/BAD7/wQA/v8BAAEA/f8DAP7/AQAAAP//AgD+/wEAAAD//wIA/v8CAP7/AgD+/wEAAQD//wEA/v8CAP7/BAD7/wQA/f8CAAAA//8AAAAAAAABAP//AQD+/wEAAQD+/wMA/f8BAAEA/v8DAPz/AwD/////AwD8/wQA/P8DAP7/AgD//wAA//8BAAAAAAAAAP//AgD+/wEAAAD//wIA/v8BAAAA//8CAP3/AgD//wAAAQD+/wIA/v8BAAAA//8CAP7/AgD+/wEA//8CAP3/BAD7/wQA/v8BAAAA//8AAAEAAAD//wIA/f8DAP7/AgD+/wIA/v8CAP7/AgD+/wEAAAAAAP//AgD9/wMA/v8BAP//AgD9/wMA/v8AAAEA//8BAP//AQD//wEA//8AAAEA/v8EAPz/AgD//wAAAQAAAP//AAABAP//AQD//wEAAAD//wEA//8BAAEA/f8DAP7/AQABAP3/AwD+/wIA/////wEAAAAAAAAAAAD//wIA/v8CAP////8CAP7/AgD//wAA//8CAP3/BAD9/wAAAgD9/wMA/v8BAP//AQAAAP//AQAAAP//AgD9/wMA/f8EAPz/AwD+/wEAAAAAAAAAAAD//wIA/f8EAP3/AAABAAAA//8CAP7/AQAAAP//AQAAAAAA//8BAP//AQAAAP//AQAAAP//AQAAAP//AgD9/wMA/v8BAP//AQAAAP//AQD//wIA/v8CAP3/BAD9/wEAAAD//wEAAQD9/wMA/f8CAAAA/v8DAP3/AgD//wAAAQD+/wIA/v8CAP7/AQAAAP//AgD+/wEAAAAAAP//AwD7/wUA/f8BAAEA/v8BAAEA/v8DAP3/AgD//wEA//8BAP//AQD//wEA//8CAP3/BAD7/wQA/////wIA/v8AAAIA/v8CAP3/BAD7/wUA/P8DAP3/AwD9/wMA/v8AAAIA/v8CAP7/AgD+/wIA//8AAAEA/v8CAP7/AgD//wAAAAD//wEAAAAAAAAA//8BAP7/BAD7/wUA/P8CAAAA//8BAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAAAA//8CAP3/AwD+/wEA//8CAP3/AwD+/wAAAwD8/wIAAAD//wIA/////wIA/v8CAP7/AgD+/wEAAAAAAAAAAAAAAP//AgD+/wIA//8AAAAA//8CAP7/AgD+/wEA//8CAP3/AwD9/wMA/v8BAP7/AwD9/wMA/f8CAP//AQD+/wIA//8BAP//AQD+/wMA/v8BAAAA//8BAAAA//8CAP7/AQAAAP//AgD+/wIA/v8CAP//AAAAAAEA//8BAP//AAABAAAA//8BAP//AQD//wEA//8BAP//AQAAAP//AQD//wEAAAD//wIA/f8CAAAA//8BAAAA//8BAP//AAABAP//AQD//wAAAAAAAAEA/v8CAP//AQD//wAAAAABAP7/AwD9/wIAAAD+/wIA//8BAP//AgD9/wMA/f8DAP7/AgD+/wEAAAAAAAEA/v8CAP7/AgD//wAAAAAAAAAAAAAAAP//AgD/////AgD9/wQA/f8BAAAAAAAAAAEA/f8DAP////8DAP3/AQABAP7/AgD//wAAAQD+/wMA/f8CAP7/AQABAP7/AwD7/wYA+v8FAP3/AQABAP7/AgD+/wMA/f8CAP7/AwD+/wEA//8BAP//AQAAAP7/BQD5/wcA+v8FAPz/AwD+/wIA/v8BAAAA//8DAPv/BQD8/wMA/////wEAAAAAAAAAAAD//wIA/f8DAP7/AQAAAP//AQAAAP//AgD+/wIA/v8BAAEA/f8EAPz/AwD+/wEA//8CAP7/AQD//wEA//8CAP7/AQAAAP//AgD+/wEAAAAAAAAAAAAAAAAAAAD//wIA/f8EAPz/AwD+/wEA//8CAP7/AgD+/wEAAQD+/wEAAQD+/wIA/////wIA//8AAAAAAAAAAAAAAAD//wEAAAAAAP//AgD9/wMA/v8BAP//AQAAAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQAAAP7/AwD9/wMA/v8BAP7/AwD9/wMA/v8BAP//AAABAP//AQD//wAAAAABAP//AAAAAAAAAQD//wEA/v8CAAAA/v8EAPv/BAD9/wIAAAD+/wMA/P8DAP//AAAAAP//AQD//wIA/f8DAP3/AwD9/wMA/v8BAAAA//8BAAAA//8CAP3/AwD9/wQA+/8FAPv/BQD8/wMA/v8BAAAA//8BAP//AgD+/wEAAAD//wIA/v8BAAEA/f8DAP3/AgAAAP//AQD//wAAAQD//wEA//8BAP//AQD//wEA/v8DAP3/AgAAAP7/AwD9/wIAAAD//wEAAAD//wIA/f8DAP7/AgD9/wQA+/8FAPz/AgAAAP//AgD9/wIA//8BAP//AQD//wEA//8BAP//AQD//wIA/f8DAP3/AgD//wAAAQD+/wIA/v8BAAEA/v8CAP7/AgD+/wMA/P8DAP//AAABAP7/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/v8CAP3/BAD8/wMA/v8BAAAAAAD//wEAAAAAAAAAAAD//wEAAAAAAAAA//8BAP//AgD+/wEA//8CAP3/AwD9/wMA/f8EAPv/BAD+/wAAAQD//wEA//8BAP//AAABAP//AQD//wEAAAD//wEA//8BAP//AgD9/wMA/v8AAAIA/f8DAP7/AAACAP3/AwD+/wEA//8BAP//AQAAAP//AQAAAP7/AwD9/wMA/v8AAAEA//8BAP//AAAAAAEA//8AAAEA/v8CAP//AAAAAAEA/v8DAPz/BAD9/wEAAQD+/wEAAQD9/wQA/P8DAP7/AQAAAAAAAAAAAAAAAAAAAAAAAQD+/wIA/////wIA/v8BAAAA//8BAP//AQD//wEA//8BAAAA/v8EAPz/AwD///7/BAD8/wMA/////wIA/v8CAP////8CAP7/AgD+/wIA/v8CAP////8CAP7/AwD9/wIA/v8CAP//AAABAP7/AwD9/wEAAQD+/wMA/f8CAP//AAAAAAEA/v8DAPz/BAD9/wIA/v8CAP7/AgD//wAAAAD//wIA/v8CAP7/AQAAAAAA//8CAP7/AgD+/wIA/v8CAP7/AwD8/wUA+v8GAPv/AwD//wAAAAAAAAAA//8DAPv/BQD9/wAAAgD9/wMA/v8BAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAAAAAAAAAP//AQAAAAAAAAD//wEA//8CAP3/AwD+/wAAAgD+/wEAAAD//wIA/v8CAP7/AgD/////AwD8/wUA/P8CAP//AQD//wIA/f8DAP3/AwD+/wAAAQD+/wMA/f8DAP3/AgD//wAAAQD//wEA//8BAP7/AwD+/wEA//8AAAEA//8CAPz/BAD9/wIA//8AAAEA/v8DAPz/BAD9/wIA//8AAAEA/v8CAP7/AgD//wEA/f8EAPz/BAD+////AgD//wAAAQD//wAAAQD//wEA//8BAP7/AwD+/wEA"}}catch(e){return void addTest("audiopreload",!1)}A.setAttribute("preload","auto"),A.style.cssText="display:none",docElement.appendChild(A),setTimeout((function(){A.addEventListener("loadeddata",r,!1),e=setTimeout(r,300)}),0)}else addTest("audiopreload",!1)})),
/*!
  {
    "name": "Web Audio API",
    "property": "webaudio",
    "caniuse": "audio-api",
    "polyfills": ["xaudiojs", "dynamicaudiojs", "audiolibjs"],
    "tags": ["audio", "media"],
    "builderAliases": ["audio_webaudio_api"],
    "authors": ["Addy Osmani"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html"
    }]
  }
  !*/
Modernizr.addTest("webaudio",(function(){var e="webkitAudioContext"in window,A="AudioContext"in window;return Modernizr._config.usePrefixes&&e||A})),
/*!
  {
    "name": "Battery API",
    "property": "batteryapi",
    "aliases": ["battery-api"],
    "builderAliases": ["battery_api"],
    "tags": ["device", "media"],
    "authors": ["Paul Sayre", "Alex Bradley (@abrad1212)"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/DOM/window.navigator.mozBattery"
    }]
  }
  !*/
Modernizr.addTest("batteryapi",!!prefixed("battery",navigator)||!!prefixed("getBattery",navigator),{aliases:["battery-api"]}),
/*!
  {
    "name": "Low Battery Level",
    "property": "lowbattery",
    "tags": ["hardware", "mobile"],
    "builderAliases": ["battery_level"],
    "authors": ["Paul Sayre"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/battery"
    }]
  }
  !*/
Modernizr.addTest("lowbattery",(function(){var e=prefixed("battery",navigator);return!!(e&&!e.charging&&e.level<=.2)})),
/*!
  {
    "name": "Blob constructor",
    "property": "blobconstructor",
    "aliases": ["blob-constructor"],
    "builderAliases": ["blob_constructor"],
    "caniuse": "blobbuilder",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://w3c.github.io/FileAPI/#constructorBlob"
    }],
    "polyfills": ["blobjs"]
  }
  !*/
Modernizr.addTest("blobconstructor",(function(){try{return!!new Blob}catch(e){return!1}}),{aliases:["blob-constructor"]}),
/*!
  {
    "name": "Canvas",
    "property": "canvas",
    "caniuse": "canvas",
    "tags": ["canvas", "graphics"],
    "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
  }
  !*/
Modernizr.addTest("canvas",(function(){var e=createElement("canvas");return!(!e.getContext||!e.getContext("2d"))})),
/*!
  {
    "name": "canvas blending support",
    "property": "canvasblending",
    "caniuse": "canvas-blending",
    "tags": ["canvas"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://drafts.fxtf.org/compositing-1/"
    }, {
      "name": "Article",
      "href": "https://web.archive.org/web/20171003232921/http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/"
    }]
  }
  !*/
Modernizr.addTest("canvasblending",(function(){if(!1===Modernizr.canvas)return!1;var e=createElement("canvas").getContext("2d");try{e.globalCompositeOperation="screen"}catch(e){}return"screen"===e.globalCompositeOperation}));
/*!
  {
    "name": "canvas.toDataURL type support",
    "property": ["todataurljpeg", "todataurlpng", "todataurlwebp"],
    "tags": ["canvas"],
    "builderAliases": ["canvas_todataurl_type"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement.toDataURL"
    }]
  }
  !*/
var canvas=createElement("canvas");Modernizr.addTest("todataurljpeg",(function(){var e=!1;try{e=!!Modernizr.canvas&&0===canvas.toDataURL("image/jpeg").indexOf("data:image/jpeg")}catch(e){}return e})),Modernizr.addTest("todataurlpng",(function(){var e=!1;try{e=!!Modernizr.canvas&&0===canvas.toDataURL("image/png").indexOf("data:image/png")}catch(e){}return e})),Modernizr.addTest("todataurlwebp",(function(){var e=!1;try{e=!!Modernizr.canvas&&0===canvas.toDataURL("image/webp").indexOf("data:image/webp")}catch(e){}return e})),
/*!
  {
    "name": "canvas winding support",
    "property": "canvaswinding",
    "tags": ["canvas"],
    "notes": [{
      "name": "Article",
      "href": "https://web.archive.org/web/20170825024655/http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/"
    }]
  }
  !*/
Modernizr.addTest("canvaswinding",(function(){if(!1===Modernizr.canvas)return!1;var e=createElement("canvas").getContext("2d");return e.rect(0,0,10,10),e.rect(2,2,6,6),!1===e.isPointInPath(5,5,"evenodd")})),
/*!
  {
    "name": "Canvas text",
    "property": "canvastext",
    "caniuse": "canvas-text",
    "tags": ["canvas", "graphics"],
    "polyfills": ["canvastext"]
  }
  !*/
Modernizr.addTest("canvastext",(function(){return!1!==Modernizr.canvas&&"function"==typeof createElement("canvas").getContext("2d").fillText})),
/*!
  {
    "name": "Content Editable",
    "property": "contenteditable",
    "caniuse": "contenteditable",
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/interaction.html#contenteditable"
    }]
  }
  !*/
Modernizr.addTest("contenteditable",(function(){if("contentEditable"in docElement){var e=createElement("div");return e.contentEditable=!0,"true"===e.contentEditable}})),
/*!
  {
    "name": "Context menus",
    "property": "contextmenu",
    "caniuse": "menu",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/html5/interactive-elements.html#context-menus"
    }, {
      "name": "thewebrocks.com Demo",
      "href": "http://thewebrocks.com/demos/context-menu/"
    }],
    "polyfills": ["jquery-contextmenu"]
  }
  !*/
Modernizr.addTest("contextmenu","contextMenu"in docElement&&"HTMLMenuItemElement"in window),
/*!
  {
    "name": "Cookies",
    "property": "cookies",
    "tags": ["storage"],
    "authors": ["tauren"]
  }
  !*/
Modernizr.addTest("cookies",(function(){try{document.cookie="cookietest=1";var e=-1!==document.cookie.indexOf("cookietest=");return document.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",e}catch(e){return!1}})),
/*!
  {
    "name": "Cross-Origin Resource Sharing",
    "property": "cors",
    "caniuse": "cors",
    "authors": ["Theodoor van Donge"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS"
    }],
    "polyfills": ["pmxdr", "ppx", "flxhr"]
  }
  !*/
Modernizr.addTest("cors","XMLHttpRequest"in window&&"withCredentials"in new XMLHttpRequest);
/*!
  {
    "name": "Web Cryptography",
    "property": "cryptography",
    "caniuse": "cryptography",
    "tags": ["crypto"],
    "authors": ["roblarsen"],
    "notes": [{
      "name": "W3C Editor's Draft Spec",
      "href": "https://www.w3.org/TR/WebCryptoAPI/"
    }],
    "polyfills": ["polycrypt"]
  }
  !*/
var crypto=prefixed("crypto",window);Modernizr.addTest("crypto",!!prefixed("subtle",crypto));
/*!
  {
    "name": "getRandomValues",
    "property": "getrandomvalues",
    "caniuse": "getrandomvalues",
    "tags": ["crypto"],
    "authors": ["komachi"],
    "notes": [{
      "name": "W3C Editor’s Draft Spec",
      "href": "https://w3c.github.io/webcrypto/#Crypto-interface-methods"
    }],
    "polyfills": ["polycrypt"]
  }
  !*/
var crypto=prefixed("crypto",window),supportsGetRandomValues;if(crypto&&"getRandomValues"in crypto&&"Uint32Array"in window){var array=new Uint32Array(10),values=crypto.getRandomValues(array);supportsGetRandomValues=values&&is(values[0],"number")}Modernizr.addTest("getrandomvalues",!!supportsGetRandomValues),
/*!
  {
    "name": "cssall",
    "property": "cssall",
    "notes": [{
      "name": "Spec",
      "href": "https://drafts.csswg.org/css-cascade/#all-shorthand"
    }]
  }
  !*/
Modernizr.addTest("cssall","all"in docElement.style),
/*!
  {
    "name": "CSS Animations",
    "property": "cssanimations",
    "caniuse": "css-animation",
    "polyfills": ["transformie", "csssandpaper"],
    "tags": ["css"],
    "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
    "notes": [{
      "name": "Article: 'Dispelling the Android CSS animation myths'",
      "href": "https://web.archive.org/web/20180602074607/https://daneden.me/2011/12/14/putting-up-with-androids-bullshit/"
    }]
  }
  !*/
Modernizr.addTest("cssanimations",testAllProps("animationName","a",!0)),
/*!
  {
    "name": "Appearance",
    "property": "appearance",
    "caniuse": "css-appearance",
    "tags": ["css"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-appearance"
    }, {
      "name": "CSS-Tricks CSS Almanac: appearance",
      "href": "https://css-tricks.com/almanac/properties/a/appearance/"
    }]
  }
  !*/
Modernizr.addTest("appearance",testAllProps("appearance")),
/*!
  {
    "name": "Backdrop Filter",
    "property": "backdropfilter",
    "authors": ["Brian Seward"],
    "tags": ["css"],
    "caniuse": "css-backdrop-filter",
    "notes": [{
      "name": "W3C Editor’s Draft Spec",
      "href": "https://drafts.fxtf.org/filters-2/#BackdropFilterProperty"
    }, {
      "name": "WebKit Blog introduction + Demo",
      "href": "https://www.webkit.org/blog/3632/introducing-backdrop-filters/"
    }]
  }
  !*/
Modernizr.addTest("backdropfilter",testAllProps("backdropFilter")),
/*!
  {
    "name": "CSS Background Blend Mode",
    "property": "backgroundblendmode",
    "caniuse": "css-backgroundblendmode",
    "tags": ["css"],
    "notes": [{
      "name": "CSS Blend Modes could be the next big thing in Web Design",
      "href": "https://medium.com/@bennettfeely/css-blend-modes-could-be-the-next-big-thing-in-web-design-6b51bf53743a"
    }, {
      "name": "Demo",
      "href": "https://bennettfeely.com/gradients/"
    }]
  }
  !*/
Modernizr.addTest("backgroundblendmode",prefixed("backgroundBlendMode","text")),
/*!
  {
    "name": "CSS Background Clip Text",
    "property": "backgroundcliptext",
    "authors": ["ausi"],
    "tags": ["css"],
    "notes": [{
      "name": "CSS Tricks Article",
      "href": "https://css-tricks.com/image-under-text/"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip"
    }, {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/199"
    }]
  }
  !*/
Modernizr.addTest("backgroundcliptext",(function(){return testAllProps("backgroundClip","text")})),
/*!
  {
    "name": "Background Position Shorthand",
    "property": "bgpositionshorthand",
    "caniuse": "css-background-offsets",
    "tags": ["css"],
    "builderAliases": ["css_backgroundposition_shorthand"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/CSS/background-position"
    }, {
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css3-background/#background-position"
    }, {
      "name": "Demo",
      "href": "https://jsfiddle.net/Blink/bBXvt/"
    }]
  }
  !*/
Modernizr.addTest("bgpositionshorthand",(function(){var e=createElement("a").style,A="right 10px bottom 10px";return e.cssText="background-position: "+A+";",e.backgroundPosition===A})),
/*!
  {
    "name": "Background Position XY",
    "property": "bgpositionxy",
    "tags": ["css"],
    "builderAliases": ["css_backgroundposition_xy"],
    "authors": ["Allan Lei", "Brandom Aaron"],
    "notes": [{
      "name": "Demo",
      "href": "https://jsfiddle.net/allanlei/R8AYS/"
    }, {
      "name": "Adapted From",
      "href": "https://github.com/brandonaaron/jquery-cssHooks/blob/master/bgpos.js"
    }]
  }
  !*/
Modernizr.addTest("bgpositionxy",(function(){return testAllProps("backgroundPositionX","3px",!0)&&testAllProps("backgroundPositionY","5px",!0)})),
/*!
  {
    "name": "Background Repeat",
    "property": ["bgrepeatspace", "bgrepeatround"],
    "tags": ["css"],
    "builderAliases": ["css_backgroundrepeat"],
    "authors": ["Ryan Seddon"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat"
    }, {
      "name": "Test Page",
      "href": "https://jsbin.com/uzesun/"
    }, {
      "name": "Demo",
      "href": "https://jsfiddle.net/ryanseddon/yMLTQ/6/"
    }]
  }
  !*/
Modernizr.addTest("bgrepeatround",testAllProps("backgroundRepeat","round")),Modernizr.addTest("bgrepeatspace",testAllProps("backgroundRepeat","space")),
/*!
  {
    "name": "Background Size",
    "property": "backgroundsize",
    "tags": ["css"],
    "knownBugs": ["This will false positive in Opera Mini - https://github.com/Modernizr/Modernizr/issues/396"],
    "notes": [{
      "name": "Related Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/396"
    }]
  }
  !*/
Modernizr.addTest("backgroundsize",testAllProps("backgroundSize","100%",!0)),
/*!
  {
    "name": "Background Size Cover",
    "property": "bgsizecover",
    "tags": ["css"],
    "builderAliases": ["css_backgroundsizecover"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/CSS/background-size"
    }]
  }
  !*/
Modernizr.addTest("bgsizecover",testAllProps("backgroundSize","cover")),
/*!
  {
    "name": "Border Image",
    "property": "borderimage",
    "caniuse": "border-image",
    "polyfills": ["css3pie"],
    "knownBugs": ["Android < 2.0 is true, but has a broken implementation"],
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("borderimage",testAllProps("borderImage","url() 1",!0)),
/*!
  {
    "name": "Border Radius",
    "property": "borderradius",
    "caniuse": "border-radius",
    "polyfills": ["css3pie"],
    "tags": ["css"],
    "notes": [{
      "name": "Comprehensive Compat Chart",
      "href": "https://muddledramblings.com/table-of-css3-border-radius-compliance"
    }]
  }
  !*/
Modernizr.addTest("borderradius",testAllProps("borderRadius","0px",!0)),
/*!
  {
    "name": "Box Decoration Break",
    "property": "boxdecorationbreak",
    "caniuse": "css-boxdecorationbreak",
    "tags": ["css"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break"
    }, {
      "name": "Demo",
      "href": "https://jsbin.com/xojoro/edit?css,output"
    }]
  }
  !*/
Modernizr.addTest("boxdecorationbreak",testAllProps("boxDecorationBreak","slice")),
/*!
  {
    "name": "Box Shadow",
    "property": "boxshadow",
    "caniuse": "css-boxshadow",
    "tags": ["css"],
    "knownBugs": [
      "WebOS false positives on this test.",
      "The Kindle Silk browser false positives"
    ]
  }
  !*/
Modernizr.addTest("boxshadow",testAllProps("boxShadow","1px 1px",!0)),
/*!
  {
    "name": "Box Sizing",
    "property": "boxsizing",
    "caniuse": "css3-boxsizing",
    "polyfills": ["borderboxmodel", "boxsizingpolyfill", "borderbox"],
    "tags": ["css"],
    "builderAliases": ["css_boxsizing"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing"
    }, {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/248"
    }]
  }
  !*/
Modernizr.addTest("boxsizing",testAllProps("boxSizing","border-box",!0)&&(document.documentMode===undefined||document.documentMode>7)),
/*!
  {
    "name": "CSS Calc",
    "property": "csscalc",
    "caniuse": "calc",
    "tags": ["css"],
    "builderAliases": ["css_calc"],
    "authors": ["@calvein"]
  }
  !*/
Modernizr.addTest("csscalc",(function(){var e=createElement("a");return e.style.cssText="width:"+prefixes.join("calc(10px);width:"),!!e.style.length})),
/*!
  {
    "name": "CSS :checked pseudo-selector",
    "caniuse": "css-sel3",
    "property": "checked",
    "tags": ["css"],
    "notes": [{
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/pull/879"
    }]
  }
  !*/
Modernizr.addTest("checked",(function(){return testStyles("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}",(function(e){var A=createElement("input");return A.setAttribute("type","checkbox"),A.setAttribute("checked","checked"),e.appendChild(A),20===A.offsetLeft}))})),
/*!
  {
    "name": "CSS Font ch Units",
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "property": "csschunit",
    "caniuse": "ch-unit",
    "tags": ["css"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css3-values/#font-relative-lengths"
    }]
  }
  !*/
Modernizr.addTest("csschunit",(function(){var e,A=modElem.elem.style;try{A.fontSize="3ch",e=-1!==A.fontSize.indexOf("ch")}catch(A){e=!1}return e})),
/*!
  {
    "name": "CSS Columns",
    "property": "csscolumns",
    "caniuse": "multicolumn",
    "polyfills": ["css3multicolumnjs"],
    "tags": ["css"]
  }
  !*/
function(){Modernizr.addTest("csscolumns",(function(){var e=!1,A=testAllProps("columnCount");try{(e=!!A)&&(e=new Boolean(e))}catch(e){}return e}));for(var e,A,t=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],r=0;r<t.length;r++)e=t[r].toLowerCase(),A=testAllProps("column"+t[r]),"breakbefore"!==e&&"breakafter"!==e&&"breakinside"!==e||(A=A||testAllProps(t[r])),Modernizr.addTest("csscolumns."+e,A)}(),
/*!
  {
    "name": "CSS Grid (old & new)",
    "property": ["cssgrid", "cssgridlegacy"],
    "authors": ["Faruk Ates"],
    "tags": ["css"],
    "notes": [{
      "name": "The new, standardized CSS Grid",
      "href": "https://www.w3.org/TR/css3-grid-layout/"
    }, {
      "name": "The _old_ CSS Grid (legacy)",
      "href": "https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/"
    }]
  }
  !*/
Modernizr.addTest("cssgridlegacy",testAllProps("grid-columns","10px",!0)),Modernizr.addTest("cssgrid",testAllProps("grid-template-rows","none",!0)),
/*!
  {
    "name": "CSS Cubic Bezier Range",
    "property": "cubicbezierrange",
    "tags": ["css"],
    "builderAliases": ["css_cubicbezierrange"],
    "authors": ["@calvein"],
    "warnings": ["cubic-bezier values can't be > 1 for Webkit until [bug #45761](https://bugs.webkit.org/show_bug.cgi?id=45761) is fixed"],
    "notes": [{
      "name": "Comprehensive Compat Chart",
      "href": "https://muddledramblings.com/table-of-css3-border-radius-compliance/"
    }]
  }
  !*/
Modernizr.addTest("cubicbezierrange",(function(){var e=createElement("a");return e.style.cssText=prefixes.join("transition-timing-function:cubic-bezier(1,0,0,1.1); "),!!e.style.length}));
/*!
  {
    "name": "CSS Custom Properties",
    "property": "customproperties",
    "caniuse": "css-variables",
    "tags": ["css"],
    "builderAliases": ["css_customproperties"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/--*"
    }, {
      "name": "W3C Spec",
      "href": "https://drafts.csswg.org/css-variables/"
    }]
  }
  !*/
var supportsFn=window.CSS&&window.CSS.supports.bind(window.CSS)||window.supportsCSS;Modernizr.addTest("customproperties",!!supportsFn&&(supportsFn("--f:0")||supportsFn("--f",0))),
/*!
  {
    "name": "CSS Display run-in",
    "property": "display-runin",
    "authors": ["alanhogan"],
    "tags": ["css"],
    "builderAliases": ["css_displayrunin"],
    "notes": [{
      "name": "CSS Tricks Article",
      "href": "https://web.archive.org/web/20111204150927/http://css-tricks.com:80/596-run-in/"
    }, {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/198"
    }]
  }
  !*/
Modernizr.addTest("displayrunin",testAllProps("display","run-in"),{aliases:["display-runin"]}),
/*!
  {
    "name": "CSS Display table",
    "property": "displaytable",
    "caniuse": "css-table",
    "authors": ["scottjehl"],
    "tags": ["css"],
    "builderAliases": ["css_displaytable"],
    "notes": [{
      "name": "Detects for all additional table display values",
      "href": "https://pastebin.com/Gk9PeVaQ"
    }]
  }
  !*/
testStyles("#modernizr{display: table; direction: ltr}#modernizr div{display: table-cell; padding: 10px}",(function(e){var A,t=e.childNodes;A=t[0].offsetLeft<t[1].offsetLeft,Modernizr.addTest("displaytable",A,{aliases:["display-table"]})}),2),
/*!
  {
    "name": "CSS text-overflow ellipsis",
    "property": "ellipsis",
    "caniuse": "text-overflow",
    "polyfills": ["text-overflow"],
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("ellipsis",testAllProps("textOverflow","ellipsis"));
/*!
  {
    "name": "CSS.escape()",
    "property": "cssescape",
    "polyfills": ["css-escape"],
    "tags": ["css", "cssom"]
  }
  !*/
var CSS=window.CSS;Modernizr.addTest("cssescape",!!CSS&&"function"==typeof CSS.escape),
/*!
  {
    "name": "CSS Font ex Units",
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "property": "cssexunit",
    "caniuse": "mdn-css_types_length_ex",
    "tags": ["css"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css3-values/#font-relative-lengths"
    }]
  }
  !*/
Modernizr.addTest("cssexunit",(function(){var e,A=modElem.elem.style;try{A.fontSize="3ex",e=-1!==A.fontSize.indexOf("ex")}catch(A){e=!1}return e}));
/*!
  {
    "name": "CSS Supports",
    "property": "supports",
    "caniuse": "css-featurequeries",
    "tags": ["css"],
    "builderAliases": ["css_supports"],
    "notes": [{
      "name": "W3C Spec (The @supports rule)",
      "href": "https://dev.w3.org/csswg/css3-conditional/#at-supports"
    }, {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/648"
    }, {
      "name": "W3C Spec (The CSSSupportsRule interface)",
      "href": "https://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
    }]
  }
  !*/
var newSyntax="CSS"in window&&"supports"in window.CSS,oldSyntax="supportsCSS"in window;Modernizr.addTest("supports",newSyntax||oldSyntax),
/*!
  {
    "name": "CSS Filters",
    "property": "cssfilters",
    "caniuse": "css-filters",
    "polyfills": ["polyfilter"],
    "tags": ["css"],
    "builderAliases": ["css_filters"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/filter"
    }]
  }
  !*/
Modernizr.addTest("cssfilters",(function(){if(Modernizr.supports)return testAllProps("filter","blur(2px)");var e=createElement("a");return e.style.cssText=prefixes.join("filter:blur(2px); "),!!e.style.length&&(document.documentMode===undefined||document.documentMode>9)})),
/*!
  {
    "name": "Flexbox",
    "property": "flexbox",
    "caniuse": "flexbox",
    "tags": ["css"],
    "notes": [{
      "name": "The _new_ flexbox",
      "href": "https://www.w3.org/TR/css-flexbox-1/"
    }],
    "warnings": [
      "A `true` result for this detect does not imply that the `flex-wrap` property is supported; see the `flexwrap` detect."
    ]
  }
  !*/
Modernizr.addTest("flexbox",testAllProps("flexBasis","1px",!0)),
/*!
  {
    "name": "Flexbox (legacy)",
    "property": "flexboxlegacy",
    "tags": ["css"],
    "polyfills": ["flexie"],
    "notes": [{
      "name": "The _old_ flexbox",
      "href": "https://www.w3.org/TR/2009/WD-css3-flexbox-20090723/"
    }]
  }
  !*/
Modernizr.addTest("flexboxlegacy",testAllProps("boxDirection","reverse",!0)),
/*!
  {
    "name": "Flexbox (tweener)",
    "property": "flexboxtweener",
    "tags": ["css"],
    "polyfills": ["flexie"],
    "notes": [{
      "name": "The _inbetween_ flexbox",
      "href": "https://www.w3.org/TR/2011/WD-css3-flexbox-20111129/"
    }],
    "warnings": ["This represents an old syntax, not the latest standard syntax."]
  }
  !*/
Modernizr.addTest("flexboxtweener",testAllProps("flexAlign","end",!0)),
/*!
  {
    "name": "Flex Line Wrapping",
    "property": "flexwrap",
    "tags": ["css", "flexbox"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css-flexbox-1/"
    }],
    "warnings": [
      "Does not imply a modern implementation – see documentation."
    ]
  }
  !*/
Modernizr.addTest("flexwrap",testAllProps("flexWrap","wrap",!0)),
/*!
  {
    "name": "Flex Gap",
    "property": "flexgap",
    "caniuse": "flexbox-gap",
    "tags": ["css", "flexbox"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css-align-3/#gaps"
    }],
    "authors": ["Chris Smith (@chris13524)"]
  }
  !*/
Modernizr.addTest("flexgap",(function(){var e=createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(createElement("div")),e.appendChild(createElement("div")),docElement.appendChild(e);var A=1===e.scrollHeight;return e.parentNode.removeChild(e),A})),
/*!
  {
    "name": "CSS :focus-within pseudo-selector",
    "caniuse": "css-focus-visible",
    "property": "focuswithin",
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("focuswithin",(function(){try{document.querySelector(":focus-within")}catch(e){return!1}return!0})),
/*!
  {
    "name": "Font Display",
    "property": "fontdisplay",
    "authors": ["Patrick Kettner"],
    "caniuse": "css-font-rendering-controls",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://drafts.csswg.org/css-fonts-4/#font-display-desc"
    }, {
      "name": "`font-display` for the masses",
      "href": "https://css-tricks.com/font-display-masses/"
    }]
  }
  !*/
Modernizr.addTest("fontDisplay",testProp("font-display"));
/*!
  {
    "name": "@font-face",
    "property": "fontface",
    "authors": ["Diego Perini", "Mat Marquis"],
    "tags": ["css"],
    "knownBugs": [
      "False Positive: WebOS https://github.com/Modernizr/Modernizr/issues/342",
      "False Positive: WP7 https://github.com/Modernizr/Modernizr/issues/538"
    ],
    "notes": [{
      "name": "@font-face detection routine by Diego Perini",
      "href": "http://javascript.nwbox.com/CSSSupport/"
    }, {
      "name": "Filament Group @font-face compatibility research",
      "href": "https://docs.google.com/presentation/d/1n4NyG4uPRjAA8zn_pSQ_Ket0RhcWC6QlZ6LMjKeECo0/edit#slide=id.p"
    }, {
      "name": "Filament Grunticon/@font-face device testing results",
      "href": "https://docs.google.com/spreadsheet/ccc?key=0Ag5_yGvxpINRdHFYeUJPNnZMWUZKR2ItMEpRTXZPdUE#gid=0"
    }, {
      "name": "CSS fonts on Android",
      "href": "https://stackoverflow.com/questions/3200069/css-fonts-on-android"
    }, {
      "name": "@font-face and Android",
      "href": "http://archivist.incutio.com/viewlist/css-discuss/115960"
    }]
  }
  !*/
var unsupportedUserAgent=function(){var e=navigator.userAgent,A=e.match(/w(eb)?osbrowser/gi),t=e.match(/windows phone/gi)&&e.match(/iemobile\/([0-9])+/gi)&&parseFloat(RegExp.$1)>=9;return A||t}();function roundedEquals(e,A){return e-1===A||e===A||e+1===A}unsupportedUserAgent?Modernizr.addTest("fontface",!1):testStyles('@font-face {font-family:"font";src:url("https://")}',(function(e,A){var t=document.getElementById("smodernizr"),r=t.sheet||t.styleSheet,n=r?r.cssRules&&r.cssRules[0]?r.cssRules[0].cssText:r.cssText||"":"",o=/src/i.test(n)&&0===n.indexOf(A.split(" ")[0]);Modernizr.addTest("fontface",o)})),
/*!
  {
    "name": "CSS Generated Content",
    "property": "generatedcontent",
    "tags": ["css"],
    "warnings": ["Android won't return correct height for anything below 7px #738"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css3-selectors/#gen-content"
    }, {
      "name": "MDN Docs on :before",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/::before"
    }, {
      "name": "MDN Docs on :after",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/::after"
    }]
  }
  !*/
testStyles('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}',(function(e){Modernizr.addTest("generatedcontent",e.offsetHeight>=6)})),
/*!
  {
    "name": "CSS Gradients",
    "caniuse": "css-gradients",
    "property": "cssgradients",
    "tags": ["css"],
    "knownBugs": ["False-positives on webOS (https://github.com/Modernizr/Modernizr/issues/202)"],
    "notes": [{
      "name": "Webkit Gradient Syntax",
      "href": "https://webkit.org/blog/175/introducing-css-gradients/"
    }, {
      "name": "Linear Gradient Syntax",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient"
    }, {
      "name": "W3C Spec",
      "href": "https://drafts.csswg.org/css-images-3/#gradients"
    }]
  }
  !*/
Modernizr.addTest("cssgradients",(function(){for(var e,A="background-image:",t="",r=0,n=prefixes.length-1;r<n;r++)e=0===r?"to ":"",t+=A+prefixes[r]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(t+=A+"-webkit-gradient(linear,left top,right bottom,from(#9f9),to(white));");var o=createElement("a").style;return o.cssText=t,(""+o.backgroundImage).indexOf("gradient")>-1})),
/*! {
    "name": "CSS Hairline",
    "property": "hairline",
    "tags": ["css"],
    "authors": ["strarsis"],
    "notes": [{
      "name": "Blog post about CSS retina hairlines",
      "href": "http://dieulot.net/css-retina-hairline"
    }, {
      "name": "Derived from",
      "href": "https://gist.github.com/dieulot/520a49463f6058fbc8d1"
    }]
  }
  !*/
Modernizr.addTest("hairline",(function(){return testStyles("#modernizr {border:.5px solid transparent}",(function(e){return 1===e.offsetHeight}))})),
/*!
  {
    "name": "CSS HSLA Colors",
    "caniuse": "css3-colors",
    "property": "hsla",
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("hsla",(function(){var e=createElement("a").style;return e.cssText="background-color:hsla(120,40%,100%,.5)",contains(e.backgroundColor,"rgba")||contains(e.backgroundColor,"hsla")})),
/*!
  {
    "name": "CSS Hyphens",
    "caniuse": "css-hyphens",
    "property": ["csshyphens", "softhyphens", "softhyphensfind"],
    "tags": ["css"],
    "builderAliases": ["css_hyphens"],
    "async": true,
    "authors": ["David Newton"],
    "warnings": [
      "These tests currently require document.body to be present",
      "If loading Hyphenator.js via yepnope, be cautious of issue 158: https://github.com/mnater/hyphenator/issues/158",
      "This is very large – only include it if you absolutely need it"
    ],
    "notes": [{
      "name": "The Current State of Hyphenation on the Web.",
      "href": "https://davidnewton.ca/the-current-state-of-hyphenation-on-the-web"
    }, {
      "name": "Hyphenation Test Page",
      "href": "https://web.archive.org/web/20150319125549/http://davidnewton.ca/demos/hyphenation/test.html"
    }, {
      "name": "Hyphenation is Language Specific",
      "href": "https://code.google.com/p/hyphenator/source/diff?spec=svn975&r=975&format=side&path=/trunk/Hyphenator.js#sc_svn975_313"
    }, {
      "name": "Related Modernizr Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/312"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){setTimeout((function e(){function A(e,A){try{var t,r=createElement("div"),n=createElement("span"),o=r.style,i=0,a=!1,d=!1,s=document.body.firstElementChild||document.body.firstChild;return o.cssText="position:absolute;top:0;left:0;overflow:visible;width:1.25em;",r.appendChild(n),document.body.insertBefore(r,s),n.innerHTML="mm",i=n.offsetHeight,n.innerHTML="m"+e+"m",t=n.offsetHeight>i,A?(n.innerHTML="m<br />m",i=n.offsetWidth,n.innerHTML="m"+e+"m",d=n.offsetWidth>i):d=!0,!0===t&&!0===d&&(a=!0),document.body.removeChild(r),r.removeChild(n),a}catch(e){return!1}}function t(e){try{var A,t=createElement("input"),r=createElement("div"),n=!1,o=document.body.firstElementChild||document.body.firstChild;t.style.cssText="position:fixed;top:0;",r.style.cssText="position:fixed;top:0;",r.innerHTML="lebowski"+e+"lebowski",document.body.insertBefore(r,o),document.body.insertBefore(t,r),t.setSelectionRange?(t.focus(),t.setSelectionRange(0,0)):t.createTextRange&&((A=t.createTextRange()).collapse(!0),A.moveEnd("character",0),A.moveStart("character",0),A.select());try{window.find?n=window.find("lebowskilebowski"):n=(A=window.self.document.body.createTextRange()).findText("lebowskilebowski")}catch(e){n=!1}return document.body.removeChild(r),document.body.removeChild(t),n}catch(e){return!1}}document.body||document.getElementsByTagName("body")[0]?(addTest("csshyphens",(function(){if(!testAllProps("hyphens","auto",!0))return!1;try{return function(){try{var e,A,t,r=createElement("div"),n=createElement("span"),o=r.style,i=document.body.firstElementChild||document.body.firstChild;return r.lang="en",r.appendChild(n),n.innerHTML="Bacon ipsum dolor sit amet jerky velit in culpa hamburger et. Laborum dolor proident, enim dolore duis commodo et strip steak. Salami anim et, veniam consectetur dolore qui tenderloin jowl velit sirloin. Et ad culpa, fatback cillum jowl ball tip ham hock nulla short ribs pariatur aute. Pig pancetta ham bresaola, ut boudin nostrud commodo flank esse cow tongue culpa. Pork belly bresaola enim pig, ea consectetur nisi. Fugiat officia turkey, ea cow jowl pariatur ullamco proident do laborum velit sausage. Magna biltong sint tri-tip commodo sed bacon, esse proident aliquip. Ullamco ham sint fugiat, velit in enim sed mollit nulla cow ut adipisicing nostrud consectetur. Proident dolore beef ribs, laborum nostrud meatball ea laboris rump cupidatat labore culpa. Shankle minim beef, velit sint cupidatat fugiat tenderloin pig et ball tip. Ut cow fatback salami, bacon ball tip et in shank strip steak bresaola. In ut pork belly sed mollit tri-tip magna culpa veniam, short ribs qui in andouille ham consequat. Dolore bacon t-bone, velit short ribs enim strip steak nulla. Voluptate labore ut, biltong swine irure jerky. Cupidatat excepteur aliquip salami dolore. Ball tip strip steak in pork dolor. Ad in esse biltong. Dolore tenderloin exercitation ad pork loin t-bone, dolore in chicken ball tip qui pig. Ut culpa tongue, sint ribeye dolore ex shank voluptate hamburger. Jowl et tempor, boudin pork chop labore ham hock drumstick consectetur tri-tip elit swine meatball chicken ground round. Proident shankle mollit dolore. Shoulder ut duis t-bone quis reprehenderit. Meatloaf dolore minim strip steak, laboris ea aute bacon beef ribs elit shank in veniam drumstick qui. Ex laboris meatball cow tongue pork belly. Ea ball tip reprehenderit pig, sed fatback boudin dolore flank aliquip laboris eu quis. Beef ribs duis beef, cow corned beef adipisicing commodo nisi deserunt exercitation. Cillum dolor t-bone spare ribs, ham hock est sirloin. Brisket irure meatloaf in, boudin pork belly sirloin ball tip. Sirloin sint irure nisi nostrud aliqua. Nostrud nulla aute, enim officia culpa ham hock. Aliqua reprehenderit dolore sunt nostrud sausage, ea boudin pork loin ut t-bone ham tempor. Tri-tip et pancetta drumstick laborum. Ham hock magna do nostrud in proident. Ex ground round fatback, venison non ribeye in.",document.body.insertBefore(r,i),o.cssText="position:absolute;top:0;left:0;width:5em;text-align:justify;text-justify:newspaper;",e=n.offsetHeight,A=n.offsetWidth,o.cssText="position:absolute;top:0;left:0;width:5em;text-align:justify;text-justify:newspaper;"+prefixes.join("hyphens:auto; "),t=n.offsetHeight!==e||n.offsetWidth!==A,document.body.removeChild(r),r.removeChild(n),t}catch(r){return!1}}()}catch(e){return!1}})),addTest("softhyphens",(function(){try{return A("&#173;",!0)&&A("&#8203;",!1)}catch(e){return!1}})),addTest("softhyphensfind",(function(){try{return t("&#173;")&&t("&#8203;")}catch(e){return!1}}))):setTimeout(e,300)}),300)})),
/*!
  {
    "name": "CSS :invalid pseudo-class",
    "property": "cssinvalid",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid"
    }]
  }
  !*/
Modernizr.addTest("cssinvalid",(function(){return testStyles("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:invalid{width:50px}",(function(e){var A=createElement("input");return A.required=!0,e.appendChild(A),A.clientWidth>10}))})),
/*!
  {
    "name": "CSS :last-child pseudo-selector",
    "caniuse": "css-sel3",
    "property": "lastchild",
    "tags": ["css"],
    "builderAliases": ["css_lastchild"],
    "notes": [{
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/pull/304"
    }]
  }
  !*/
testStyles("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}",(function(e){Modernizr.addTest("lastchild",e.lastChild.offsetWidth>e.firstChild.offsetWidth)}),2),
/*!
  {
    "name": "CSS Mask",
    "caniuse": "css-masks",
    "property": "cssmask",
    "tags": ["css"],
    "builderAliases": ["css_mask"],
    "notes": [{
      "name": "Webkit blog on CSS Masks",
      "href": "https://webkit.org/blog/181/css-masks/"
    }, {
      "name": "Safari Docs",
      "href": "https://developer.apple.com/library/archive/documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Masks/Masks.html"
    }, {
      "name": "CSS SVG mask",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/mask"
    }, {
      "name": "Combine with clippaths for awesomeness",
      "href": "https://web.archive.org/web/20150508193041/http://generic.cx:80/for/webkit/test.html"
    }]
  }
  !*/
Modernizr.addTest("cssmask",testAllProps("maskRepeat","repeat-x",!0)),
/*!
  {
    "name": "CSS Media Queries",
    "caniuse": "css-mediaqueries",
    "property": "mediaqueries",
    "tags": ["css"],
    "builderAliases": ["css_mediaqueries"]
  }
  !*/
Modernizr.addTest("mediaqueries",mq("only all")),
/*!
  {
    "name": "CSS Multiple Backgrounds",
    "caniuse": "multibackgrounds",
    "property": "multiplebgs",
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("multiplebgs",(function(){var e=createElement("a").style;return e.cssText="background:url(https://),url(https://),red url(https://)",/(url\s*\(.*?){3}/.test(e.background)})),
/*!
  {
    "name": "CSS :nth-child pseudo-selector",
    "caniuse": "css-sel3",
    "property": "nthchild",
    "tags": ["css"],
    "notes": [{
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/pull/685"
    }, {
      "name": "Sitepoint :nth-child documentation",
      "href": "https://www.sitepoint.com/atoz-css-screencast-nth-child/"
    }],
    "authors": ["@emilchristensen"],
    "warnings": ["Known false negative in Safari 3.1 and Safari 3.2.2"]
  }
  !*/
testStyles("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}",(function(e){var A=e.getElementsByTagName("div"),t=A[0].offsetWidth===A[2].offsetWidth&&A[1].offsetWidth===A[3].offsetWidth&&A[0].offsetWidth!==A[1].offsetWidth;Modernizr.addTest("nthchild",t)}),4),
/*!
  {
    "name": "CSS Object Fit",
    "caniuse": "object-fit",
    "property": "objectfit",
    "tags": ["css"],
    "builderAliases": ["css_objectfit"],
    "notes": [{
      "name": "Opera Article on Object Fit",
      "href": "https://dev.opera.com/articles/css3-object-fit-object-position/"
    }]
  }
  !*/
Modernizr.addTest("objectfit",!!prefixed("objectFit"),{aliases:["object-fit"]}),
/*!
  {
    "name": "CSS Opacity",
    "caniuse": "css-opacity",
    "property": "opacity",
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("opacity",(function(){var e=createElement("a").style;return e.cssText=prefixes.join("opacity:.55;"),/^0.55$/.test(e.opacity)})),
/*!
  {
    "name": "CSS Overflow Scrolling",
    "property": "overflowscrolling",
    "tags": ["css"],
    "builderAliases": ["css_overflow_scrolling"],
    "warnings": ["Introduced in iOS5b2. API is subject to change."],
    "notes": [{
      "name": "Article on iOS overflow scrolling",
      "href": "https://css-tricks.com/snippets/css/momentum-scrolling-on-ios-overflow-elements/"
    }]
  }
  !*/
Modernizr.addTest("overflowscrolling",testAllProps("overflowScrolling","touch",!0)),
/*!
  {
    "name": "CSS Pointer Events",
    "caniuse": "pointer-events",
    "property": "csspointerevents",
    "authors": ["ausi"],
    "tags": ["css"],
    "builderAliases": ["css_pointerevents"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events"
    }, {
      "name": "Test Project Page",
      "href": "https://ausi.github.com/Feature-detection-technique-for-pointer-events/"
    }, {
      "name": "Test Project Wiki",
      "href": "https://github.com/ausi/Feature-detection-technique-for-pointer-events/wiki"
    }, {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/80"
    }]
  }
  !*/
Modernizr.addTest("csspointerevents",(function(){var e=createElement("a").style;return e.cssText="pointer-events:auto","auto"===e.pointerEvents})),
/*!
  {
    "name": "CSS position: sticky",
    "property": "csspositionsticky",
    "tags": ["css"],
    "builderAliases": ["css_positionsticky"],
    "notes": [{
      "name": "Chrome bug report",
      "href":"https://bugs.chromium.org/p/chromium/issues/detail?id=322972"
    }],
    "warnings": ["using position:sticky on anything but top aligned elements is buggy in Chrome < 37 and iOS <=7+"]
  }
  !*/
Modernizr.addTest("csspositionsticky",(function(){var e="position:",A=createElement("a").style;return A.cssText=e+prefixes.join("sticky;"+e).slice(0,-e.length),-1!==A.position.indexOf("sticky")})),
/*!
  {
    "name": "CSS Generated Content Animations",
    "property": "csspseudoanimations",
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("csspseudoanimations",(function(){var e=!1;if(!Modernizr.cssanimations)return e;var A=["@",prefixes.join("keyframes csspseudoanimations { from { font-size: 10px; } }@").replace(/\@$/,""),'#modernizr:before { content:" "; font-size:5px;',prefixes.join("animation:csspseudoanimations 1ms infinite;"),"}"].join("");return testStyles(A,(function(A){e="10px"===computedStyle(A,":before","font-size")})),e})),
/*!
  {
    "name": "CSS Transitions",
    "property": "csstransitions",
    "caniuse": "css-transitions",
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("csstransitions",testAllProps("transition","all",!0)),
/*!
  {
    "name": "CSS Generated Content Transitions",
    "property": "csspseudotransitions",
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("csspseudotransitions",(function(){var e=!1;if(!Modernizr.csstransitions)return e;var A='#modernizr:before { content:" "; font-size:5px;'+prefixes.join("transition:0s 100s;")+"}#modernizr.trigger:before { font-size:10px; }";return testStyles(A,(function(A){computedStyle(A,":before","font-size"),A.className+="trigger",e="5px"===computedStyle(A,":before","font-size")})),e})),
/*!
  {
    "name": "CSS Reflections",
    "caniuse": "css-reflections",
    "property": "cssreflections",
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("cssreflections",testAllProps("boxReflect","above",!0)),
/*!
  {
    "name": "CSS Regions",
    "caniuse": "css-regions",
    "authors": ["Mihai Balan"],
    "property": "regions",
    "tags": ["css"],
    "builderAliases": ["css_regions"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css3-regions/"
    }]
  }
  !*/
Modernizr.addTest("regions",(function(){if(isSVG)return!1;var e=prefixed("flowFrom"),A=prefixed("flowInto"),t=!1;if(!e||!A)return t;var r,n,o=createElement("iframe"),i=createElement("div"),a=createElement("div"),d=createElement("div"),s="modernizr_flow_for_regions_check";a.innerText="M",i.style.cssText="top: 150px; left: 150px; padding: 0px;",d.style.cssText="width: 50px; height: 50px; padding: 42px;",d.style[e]=s,i.appendChild(a),i.appendChild(d),docElement.appendChild(i);var l=a.getBoundingClientRect();return a.style[A]=s,r=a.getBoundingClientRect(),n=parseInt(r.left-l.left,10),docElement.removeChild(i),42===n?t=!0:(docElement.appendChild(o),l=o.getBoundingClientRect(),o.style[A]=s,r=o.getBoundingClientRect(),l.height>0&&l.height!==r.height&&0===r.height&&(t=!0)),a=d=i=o=undefined,t})),
/*!
  {
    "name": "CSS Font rem Units",
    "caniuse": "rem",
    "authors": ["nsfmc"],
    "property": "cssremunit",
    "tags": ["css"],
    "builderAliases": ["css_remunit"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css3-values/#relative0"
    }, {
      "name": "Font Size with rem by Jonathan Snook",
      "href": "https://snook.ca/archives/html_and_css/font-size-with-rem"
    }]
  }
  !*/
Modernizr.addTest("cssremunit",(function(){var e=createElement("a").style;try{e.fontSize="3rem"}catch(e){}return/rem/.test(e.fontSize)})),
/*!
  {
    "name": "CSS UI Resize",
    "property": "cssresize",
    "caniuse": "css-resize",
    "tags": ["css"],
    "builderAliases": ["css_resize"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css3-ui/#resize"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/CSS/resize"
    }]
  }
  !*/
Modernizr.addTest("cssresize",testAllProps("resize","both",!0)),
/*!
  {
    "name": "CSS rgba",
    "caniuse": "css3-colors",
    "property": "rgba",
    "tags": ["css"],
    "notes": [{
      "name": "CSSTricks Tutorial",
      "href": "https://css-tricks.com/rgba-browser-support/"
    }]
  }
  !*/
Modernizr.addTest("rgba",(function(){var e=createElement("a").style;return e.cssText="background-color:rgba(150,255,150,.5)",(""+e.backgroundColor).indexOf("rgba")>-1})),
/*!
  {
    "name": "CSS Stylable Scrollbars",
    "property": "cssscrollbar",
    "tags": ["css"],
    "builderAliases": ["css_scrollbars"]
  }
  !*/
testStyles("#modernizr{overflow: scroll; width: 40px; height: 40px; }#"+prefixes.join("scrollbar{width:10px} #modernizr::").split("#").slice(1).join("#")+"scrollbar{width:10px}",(function(e){Modernizr.addTest("cssscrollbar","scrollWidth"in e&&30===e.scrollWidth)})),
/*!
  {
    "name": "Scroll Snap Points",
    "property": "scrollsnappoints",
    "caniuse": "css-snappoints",
    "notes": [{
      "name": "Setting native-like scrolling offsets in CSS with Scrolling Snap Points",
      "href": "http://generatedcontent.org/post/66817675443/setting-native-like-scrolling-offsets-in-css-with"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap_Points"
    }],
    "polyfills": ["scrollsnap"]
  }
  !*/
Modernizr.addTest("scrollsnappoints",testAllProps("scrollSnapType")),
/*!
  {
    "name": "CSS Shapes",
    "property": "shapes",
    "tags": ["css"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css-shapes"
    }, {
      "name": "Examples from Adobe",
      "href": "https://web.archive.org/web/20171230010236/http://webplatform.adobe.com:80/shapes"
    }, {
      "name": "Examples from CSS-Tricks",
      "href": "https://css-tricks.com/examples/ShapesOfCSS/"
    }]
  }
  !*/
Modernizr.addTest("shapes",testAllProps("shapeOutside","content-box",!0)),
/*!
  {
    "name": "CSS general sibling selector",
    "caniuse": "css-sel3",
    "property": "siblinggeneral",
    "tags": ["css"],
    "notes": [{
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/pull/889"
    }]
  }
  !*/
Modernizr.addTest("siblinggeneral",(function(){return testStyles("#modernizr div {width:100px} #modernizr div ~ div {width:200px;display:block}",(function(e){return 200===e.lastChild.offsetWidth}),2)})),
/*!
  {
    "name": "CSS Subpixel Fonts",
    "property": "subpixelfont",
    "tags": ["css"],
    "builderAliases": ["css_subpixelfont"],
    "authors": ["@derSchepp", "@gerritvanaaken", "@rodneyrehm", "@yatil", "@ryanseddon"],
    "notes": [{
      "name": "Origin Test",
      "href": "https://github.com/gerritvanaaken/subpixeldetect"
    }]
  }
  !*/
testStyles("#modernizr{position: absolute; top: -10em; visibility:hidden; font: normal 10px arial;}#subpixel{float: left; font-size: 33.3333%;}",(function(e){var A=e.firstChild;A.innerHTML="This is a text written in Arial",Modernizr.addTest("subpixelfont","44px"!==computedStyle(A,null,"width"))}),1,["subpixel"]),
/*!
  {
    "name": "CSS :target pseudo-class",
    "caniuse": "css-sel3",
    "property": "target",
    "tags": ["css"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/:target"
    }],
    "authors": ["@zachleat"],
    "warnings": ["Opera Mini supports :target but doesn't update the hash for anchor links."]
  }
  !*/
Modernizr.addTest("target",(function(){var e=window.document;if(!("querySelectorAll"in e))return!1;try{return e.querySelectorAll(":target"),!0}catch(e){return!1}})),
/*!
  {
    "name": "CSS text-align-last",
    "property": "textalignlast",
    "caniuse": "css-text-align-last",
    "tags": ["css"],
    "knownBugs": ["IE does not support the 'start' or 'end' values."],
    "notes": [{
      "name": "Quirksmode",
      "href": "https://www.quirksmode.org/css/text/textalignlast.html"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last"
    }]
  }
  !*/
Modernizr.addTest("textalignlast",testAllProps("textAlignLast")),
/*!
  {
    "name": "CSS textDecoration",
    "property": "textdecoration",
    "caniuse": "text-decoration",
    "tags": ["css"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css-text-decor-3/#line-decoration"
    }]
  }
  !*/
function(){Modernizr.addTest("textdecoration",(function(){var e=!1,A=testAllProps("textDecoration");try{(e=!!A)&&(e=new Boolean(e))}catch(e){}return e}));for(var e,A,t=["Line","Style","Color","Skip","SkipInk"],r=0;r<t.length;r++)e=t[r].toLowerCase(),A=testAllProps("textDecoration"+t[r]),Modernizr.addTest("textdecoration."+e,A)}(),
/*!
  {
    "name": "CSS textshadow",
    "property": "textshadow",
    "caniuse": "css-textshadow",
    "tags": ["css"],
    "knownBugs": ["FF3.0 will false positive on this test"]
  }
  !*/
Modernizr.addTest("textshadow",testProp("textShadow","1px 1px")),
/*!
  {
    "name": "CSS Transforms",
    "property": "csstransforms",
    "caniuse": "transforms2d",
    "tags": ["css"]
  }
  !*/
Modernizr.addTest("csstransforms",(function(){return-1===navigator.userAgent.indexOf("Android 2.")&&testAllProps("transform","scale(1)",!0)})),
/*!
  {
    "name": "CSS Transforms 3D",
    "property": "csstransforms3d",
    "caniuse": "transforms3d",
    "tags": ["css"],
    "warnings": [
      "Chrome may occasionally fail this test on some systems; more info: https://bugs.chromium.org/p/chromium/issues/detail?id=129004"
    ]
  }
  !*/
Modernizr.addTest("csstransforms3d",(function(){return!!testAllProps("perspective","1px",!0)})),
/*!
  {
    "name": "CSS Transforms Level 2",
    "property": "csstransformslevel2",
    "authors": ["rupl"],
    "tags": ["css"],
    "notes": [{
      "name": "CSSWG Draft Spec",
      "href": "https://drafts.csswg.org/css-transforms-2/"
    }]
  }
  !*/
Modernizr.addTest("csstransformslevel2",(function(){return testAllProps("translate","45px",!0)})),
/*!
  {
    "name": "CSS Transform Style preserve-3d",
    "property": "preserve3d",
    "authors": ["denyskoch", "aFarkas"],
    "tags": ["css"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style"
    }, {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/1748"
    }]
  }
  !*/
Modernizr.addTest("preserve3d",(function(){var e,A,t=window.CSS,r=!1;return!!(t&&t.supports&&t.supports("(transform-style: preserve-3d)"))||(e=createElement("a"),A=createElement("a"),e.style.cssText="display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);",A.style.cssText="display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);",e.appendChild(A),docElement.appendChild(e),r=A.getBoundingClientRect(),docElement.removeChild(e),r.width&&r.width<4)})),
/*!
  {
    "name": "CSS user-select",
    "property": "userselect",
    "caniuse": "user-select-none",
    "authors": ["ryan seddon"],
    "tags": ["css"],
    "builderAliases": ["css_userselect"],
    "notes": [{
      "name": "Related Modernizr Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/250"
    }]
  }
  !*/
Modernizr.addTest("userselect",testAllProps("userSelect","none",!0)),
/*!
  {
    "name": "CSS :valid pseudo-class",
    "property": "cssvalid",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/:valid"
    }]
  }
  !*/
Modernizr.addTest("cssvalid",(function(){return testStyles("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:valid{width:50px}",(function(e){var A=createElement("input");return e.appendChild(A),A.clientWidth>10}))})),
/*!
  {
    "name": "Variable Open Type Fonts",
    "property": "variablefonts",
    "authors": ["Patrick Kettner"],
    "tags": ["css"],
    "notes": [{
      "name": "Variable fonts on the web",
      "href": "https://webkit.org/blog/7051/variable-fonts-on-the-web/"
    }, {
      "name": "Variable fonts for responsive design",
      "href": "https://alistapart.com/blog/post/variable-fonts-for-responsive-design"
    }]
  }
  !*/
Modernizr.addTest("variablefonts",testAllProps("fontVariationSettings")),
/*!
  {
    "name": "CSS vh unit",
    "property": "cssvhunit",
    "caniuse": "viewport-units",
    "tags": ["css"],
    "builderAliases": ["css_vhunit"],
    "notes": [{
      "name": "Related Modernizr Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/572"
    }, {
      "name": "Similar JSFiddle",
      "href": "https://jsfiddle.net/FWeinb/etnYC/"
    }]
  }
  !*/
testStyles("#modernizr { height: 50vh; max-height: 10px; }",(function(e){var A=parseInt(computedStyle(e,null,"height"),10);Modernizr.addTest("cssvhunit",10===A)})),
/*!
  {
    "name": "CSS vmax unit",
    "property": "cssvmaxunit",
    "caniuse": "viewport-units",
    "tags": ["css"],
    "builderAliases": ["css_vmaxunit"],
    "notes": [{
      "name": "Related Modernizr Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/572"
    }, {
      "name": "JSFiddle Example",
      "href": "https://jsfiddle.net/glsee/JDsWQ/4/"
    }]
  }
  !*/
testStyles("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",(function(e){var A=e.childNodes[2],t=e.childNodes[1],r=e.childNodes[0],n=parseInt((t.offsetWidth-t.clientWidth)/2,10),o=r.clientWidth/100,i=r.clientHeight/100,a=parseInt(50*Math.max(o,i),10),d=parseInt(computedStyle(A,null,"width"),10);Modernizr.addTest("cssvmaxunit",roundedEquals(a,d)||roundedEquals(a,d-n))}),3),
/*!
  {
    "name": "CSS vmin unit",
    "property": "cssvminunit",
    "caniuse": "viewport-units",
    "tags": ["css"],
    "builderAliases": ["css_vminunit"],
    "notes": [{
      "name": "Related Modernizr Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/572"
    }, {
      "name": "JSFiddle Example",
      "href": "https://jsfiddle.net/glsee/JRmdq/8/"
    }]
  }
  !*/
testStyles("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",(function(e){var A=e.childNodes[2],t=e.childNodes[1],r=e.childNodes[0],n=parseInt((t.offsetWidth-t.clientWidth)/2,10),o=r.clientWidth/100,i=r.clientHeight/100,a=parseInt(50*Math.min(o,i),10),d=parseInt(computedStyle(A,null,"width"),10);Modernizr.addTest("cssvminunit",roundedEquals(a,d)||roundedEquals(a,d-n))}),3),
/*!
  {
    "name": "CSS vw unit",
    "property": "cssvwunit",
    "caniuse": "viewport-units",
    "tags": ["css"],
    "builderAliases": ["css_vwunit"],
    "notes": [{
      "name": "Related Modernizr Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/572"
    }, {
      "name": "JSFiddle Example",
      "href": "https://jsfiddle.net/FWeinb/etnYC/"
    }]
  }
  !*/
testStyles("#modernizr { width: 50vw; }",(function(e){var A=parseInt(window.innerWidth/2,10),t=parseInt(computedStyle(e,null,"width"),10);Modernizr.addTest("cssvwunit",roundedEquals(t,A))})),
/*!
  {
    "name": "will-change",
    "property": "willchange",
    "caniuse": "will-change",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://drafts.csswg.org/css-will-change/"
    }]
  }
  !*/
Modernizr.addTest("willchange","willChange"in docElement.style),
/*!
  {
    "name": "CSS wrap-flow",
    "property": "wrapflow",
    "tags": ["css"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css3-exclusions"
    }, {
      "name": "Example by Louie Rootfield",
      "href": "https://webdesign.tutsplus.com/tutorials/css-exclusions--cms-28087"
    }]
  }
  !*/
Modernizr.addTest("wrapflow",(function(){var e=prefixed("wrapFlow");if(!e||isSVG)return!1;var A=e.replace(/([A-Z])/g,(function(e,A){return"-"+A.toLowerCase()})).replace(/^ms-/,"-ms-"),t=createElement("div"),r=createElement("div"),n=createElement("span");r.style.cssText="position: absolute; left: 50px; width: 100px; height: 20px;"+A+":end;",n.innerText="X",t.appendChild(r),t.appendChild(n),docElement.appendChild(t);var o=n.offsetLeft;return docElement.removeChild(t),r=n=t=undefined,150===o})),
/*!
  {
    "name": "Custom Elements API",
    "property": "customelements",
    "caniuse": "custom-elementsv1",
    "tags": ["customelements"],
    "polyfills": ["customelements"],
    "notes": [{
      "name": "Specs for Custom Elements",
      "href": "https://www.w3.org/TR/custom-elements/"
    }]
  }
  !*/
Modernizr.addTest("customelements","customElements"in window),
/*!
  {
    "name": "Custom protocol handler",
    "property": "customprotocolhandler",
    "authors": ["Ben Schwarz"],
    "builderAliases": ["custom_protocol_handler"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/dev/system-state.html#custom-handlers"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/navigator.registerProtocolHandler"
    }]
  }
  !*/
Modernizr.addTest("customprotocolhandler",(function(){if(!navigator.registerProtocolHandler)return!1;try{navigator.registerProtocolHandler("thisShouldFail")}catch(e){return e instanceof TypeError}return!1})),
/*!
  {
    "name": "CustomEvent",
    "property": "customevent",
    "tags": ["customevent"],
    "authors": ["Alberto Elias"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/DOM-Level-3-Events/#interface-CustomEvent"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/docs/Web/API/CustomEvent"
    }],
    "polyfills": ["eventlistener"]
  }
  !*/
Modernizr.addTest("customevent","CustomEvent"in window&&"function"==typeof window.CustomEvent),
/*!
  {
    "name": "Dart",
    "property": "dart",
    "authors": ["Theodoor van Donge"],
    "notes": [{
      "name": "Language website",
      "href": "https://www.dartlang.org/"
    }]
  }
  !*/
Modernizr.addTest("dart",!!prefixed("startDart",navigator)),
/*!
  {
    "name": "DataView",
    "property": "dataview",
    "authors": ["Addy Osmani"],
    "builderAliases": ["dataview_api"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/JavaScript_typed_arrays/DataView"
    }],
    "polyfills": ["jdataview"]
  }
  !*/
Modernizr.addTest("dataview","undefined"!=typeof DataView&&"getFloat64"in DataView.prototype),
/*!
  {
    "name": "classList",
    "caniuse": "classlist",
    "property": "classlist",
    "tags": ["dom"],
    "builderAliases": ["dataview_api"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/DOM/element.classList"
    }]
  }
  !*/
Modernizr.addTest("classlist","classList"in docElement),
/*!
  {
    "name": "createElement with Attributes",
    "property": ["createelementattrs", "createelement-attrs"],
    "tags": ["dom"],
    "builderAliases": ["dom_createElement_attrs"],
    "authors": ["James A. Rosen"],
    "notes": [{
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/258"
    }]
  }
  !*/
Modernizr.addTest("createelementattrs",(function(){try{return"test"===createElement('<input name="test" />').getAttribute("name")}catch(e){return!1}}),{aliases:["createelement-attrs"]}),
/*!
  {
    "name": "dataset API",
    "caniuse": "dataset",
    "property": "dataset",
    "tags": ["dom"],
    "builderAliases": ["dom_dataset"],
    "authors": ["@phiggins42"]
  }
  !*/
Modernizr.addTest("dataset",(function(){var e=createElement("div");return e.setAttribute("data-a-b","c"),!(!e.dataset||"c"!==e.dataset.aB)})),
/*!
  {
    "name": "Document Fragment",
    "property": "documentfragment",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-B63ED1A3"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment"
    }, {
      "name": "QuirksMode Compatibility Tables",
      "href": "https://www.quirksmode.org/m/w3c_core.html#t112"
    }],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "knownBugs": ["false-positive on Blackberry 9500, see QuirksMode note"],
    "tags": ["dom"]
  }
  !*/
Modernizr.addTest("documentfragment",(function(){return"createDocumentFragment"in document&&"appendChild"in docElement})),
/*!
  {
    "name": "[hidden] Attribute",
    "property": "hidden",
    "tags": ["dom"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/dev/interaction.html#the-hidden-attribute"
    }, {
      "name": "original implementation of detect code",
      "href": "https://github.com/aFarkas/html5shiv/blob/bf4fcc4/src/html5shiv.js#L38"
    }],
    "polyfills": ["html5shiv"],
    "authors": ["Ron Waldon (@jokeyrhyme)"]
  }
  !*/
Modernizr.addTest("hidden","hidden"in createElement("a")),
/*!
  {
    "name": "Intersection Observer",
    "property": "intersectionobserver",
    "caniuse": "intersectionobserver",
    "tags": ["dom"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://w3c.github.io/IntersectionObserver/"
    }, {
      "name": "IntersectionObserver polyfill",
      "href": "https://github.com/w3c/IntersectionObserver/tree/master/polyfill"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/docs/Web/API/Intersection_Observer_API"
    }]
  }
  !*/
Modernizr.addTest("intersectionobserver","IntersectionObserver"in window),
/*!
  {
    "name": "microdata",
    "property": "microdata",
    "tags": ["dom"],
    "builderAliases": ["dom_microdata"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/microdata/"
    }]
  }
  !*/
Modernizr.addTest("microdata","getItems"in document),
/*!
  {
    "name": "DOM4 MutationObserver",
    "property": "mutationobserver",
    "caniuse": "mutationobserver",
    "tags": ["dom"],
    "authors": ["Karel Sedláček (@ksdlck)"],
    "polyfills": ["mutationobservers"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver"
    }]
  }
  !*/
Modernizr.addTest("mutationobserver",!!window.MutationObserver||!!window.WebKitMutationObserver),
/*!
  {
    "property": "passiveeventlisteners",
    "caniuse": "passive-event-listener",
    "tags": ["dom"],
    "authors": ["Rick Byers"],
    "name": "Passive event listeners",
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://dom.spec.whatwg.org/#dom-addeventlisteneroptions-passive"
    }, {
      "name": "WICG explainer",
      "href": "https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md"
    }]
  }
  !*/
Modernizr.addTest("passiveeventlisteners",(function(){var e=!1;try{var A=Object.defineProperty({},"passive",{get:function(){e=!0}}),t=function(){};window.addEventListener("testPassiveEventSupport",t,A),window.removeEventListener("testPassiveEventSupport",t,A)}catch(e){}return e})),
/*!
  {
    "name": "Shadow DOM API",
    "property": "shadowroot",
    "caniuse": "shadowdomv1",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot"
    }],
    "authors": ["Kevin Coyle (@kevin-coyle-unipro)", "Pascal Lim (@pascalim)"],
    "tags": ["dom"]
  }
  !*/
Modernizr.addTest("shadowroot","attachShadow"in createElement("div")),
/*!
  {
    "name": "Shadow DOM API (Legacy)",
    "property": "shadowrootlegacy",
    "caniuse": "shadowdom",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/Element/createShadowRoot"
    }],
    "authors": ["Kevin Coyle (@kevin-coyle-unipro)", "Pascal Lim (@pascalim)"],
    "tags": ["dom"]
  }
  !*/
Modernizr.addTest("shadowrootlegacy","createShadowRoot"in createElement("div")),
/*!
  {
    "name": "bdi Element",
    "property": "bdi",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi"
    }]
  }
  !*/
Modernizr.addTest("bdi",(function(){var e=createElement("div"),A=createElement("bdi");A.innerHTML="&#1573;",e.appendChild(A),docElement.appendChild(e);var t="rtl"===computedStyle(A,null,"direction");return docElement.removeChild(e),t}));var inputElem=createElement("input"),inputattrs="autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),attrs={};
/*!
  {
    "name": "Input attributes",
    "property": "input",
    "tags": ["forms"],
    "authors": ["Mike Taylor"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/input.html#input-type-attr-summary"
    }],
    "knownBugs": ["Some blackberry devices report false positive for input.multiple"]
  }
  !*/Modernizr.input=function(e){for(var A=0,t=e.length;A<t;A++)attrs[e[A]]=!!(e[A]in inputElem);return attrs.list&&(attrs.list=!(!createElement("datalist")||!window.HTMLDataListElement)),attrs}(inputattrs),
/*!
  {
    "name": "datalist Element",
    "caniuse": "datalist",
    "property": "datalistelem",
    "tags": ["elem"],
    "builderAliases": ["elem_datalist"],
    "warnings": ["This test is a dupe of Modernizr.input.list. Only around for legacy reasons."],
    "notes": [{
      "name": "CSS Tricks Article",
      "href": "https://css-tricks.com/relevant-dropdowns-polyfill-for-datalist/"
    }, {
      "name": "Mike Taylor Code",
      "href": "https://miketaylr.com/code/datalist.html"
    }]
  }
  !*/
Modernizr.addTest("datalistelem",Modernizr.input.list),
/*!
  {
    "name": "details Element",
    "caniuse": "details",
    "property": "details",
    "tags": ["elem"],
    "builderAliases": ["elem_details"],
    "authors": ["@mathias"],
    "notes": [{
      "name": "Mathias' Original",
      "href": "https://mathiasbynens.be/notes/html5-details-jquery#comment-35"
    }]
  }
  !*/
Modernizr.addTest("details",(function(){var e,A=createElement("details");return"open"in A&&(testStyles("#modernizr details{display:block}",(function(t){t.appendChild(A),A.innerHTML="<summary>a</summary>b",e=A.offsetHeight,A.open=!0,e=e!==A.offsetHeight})),e)})),
/*!
  {
    "name": "output Element",
    "property": "outputelem",
    "tags": ["elem"],
    "builderAliases": ["elem_output"],
    "notes": [{
      "name": "WhatWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/form-elements.html#the-output-element"
    }]
  }
  !*/
Modernizr.addTest("outputelem","value"in createElement("output")),
/*!
  {
    "name": "picture Element",
    "property": "picture",
    "tags": ["elem"],
    "authors": ["Scott Jehl", "Mat Marquis"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/embedded-content.html#embedded-content"
    }, {
      "name": "Relevant spec issue",
      "href": "https://github.com/ResponsiveImagesCG/picture-element/issues/87"
    }]
  }
  !*/
Modernizr.addTest("picture","HTMLPictureElement"in window),
/*!
  {
    "name": "progress Element",
    "caniuse": "progress",
    "property": ["progressbar", "meter"],
    "tags": ["elem"],
    "builderAliases": ["elem_progress_meter"],
    "authors": ["Stefan Wallin"]
  }
  !*/
Modernizr.addTest("progressbar",createElement("progress").max!==undefined),Modernizr.addTest("meter",createElement("meter").max!==undefined),
/*!
  {
    "name": "ruby, rp, rt Elements",
    "caniuse": "ruby",
    "property": "ruby",
    "tags": ["elem"],
    "builderAliases": ["elem_ruby"],
    "authors": ["Cătălin Mariș"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-ruby-element"
    }]
  }
  !*/
Modernizr.addTest("ruby",(function(){var e=createElement("ruby"),A=createElement("rt"),t=createElement("rp");return e.appendChild(t),e.appendChild(A),docElement.appendChild(e),"none"===computedStyle(t,null,"display")||"ruby"===computedStyle(e,null,"display")&&"ruby-text"===computedStyle(A,null,"display")||"6pt"===computedStyle(t,null,"fontSize")&&"6pt"===computedStyle(A,null,"fontSize")?(r(),!0):(r(),!1);function r(){docElement.removeChild(e),e=null,A=null,t=null}})),
/*!
  {
    "name": "Template Tag",
    "property": "template",
    "caniuse": "template",
    "tags": ["elem"],
    "notes": [{
      "name": "HTML5Rocks Article",
      "href": "https://www.html5rocks.com/en/tutorials/webcomponents/template/"
    }, {
      "name": "W3C Spec",
      "href": "https://web.archive.org/web/20171130222649/http://www.w3.org/TR/html5/scripting-1.html"
    }]
  }
  !*/
Modernizr.addTest("template","content"in createElement("template")),
/*!
  {
    "name": "time Element",
    "property": "time",
    "tags": ["elem"],
    "builderAliases": ["elem_time"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element"
    }]
  }
  !*/
Modernizr.addTest("time","valueAsDate"in createElement("time")),
/*!
  {
    "name": "Track element and Timed Text Track",
    "property": ["texttrackapi", "track"],
    "tags": ["elem"],
    "builderAliases": ["elem_track"],
    "authors": ["Addy Osmani"],
    "notes": [{
      "name": "W3C Spec (Track Element)",
      "href": "https://web.archive.org/web/20121119095019/http://www.w3.org/TR/html5/the-track-element.html#the-track-element"
    }, {
      "name": "W3C Spec (Track API)",
      "href": "https://web.archive.org/web/20121119094620/http://www.w3.org/TR/html5/media-elements.html#text-track-api"
    }],
    "warnings": ["While IE10 has implemented the track element, IE10 does not expose the underlying APIs to create timed text tracks by JS (really sad)"]
  }
  !*/
Modernizr.addTest("texttrackapi","function"==typeof createElement("video").addTextTrack),Modernizr.addTest("track","kind"in createElement("track")),
/*!
  {
    "name": "Unknown Elements",
    "property": "unknownelements",
    "tags": ["elem"],
    "notes": [{
      "name": "The Story of the HTML5 Shiv",
      "href": "https://www.paulirish.com/2011/the-history-of-the-html5-shiv/"
    }, {
      "name": "original implementation of detect code",
      "href": "https://github.com/aFarkas/html5shiv/blob/bf4fcc4/src/html5shiv.js#L36"
    }],
    "polyfills": ["html5shiv"],
    "authors": ["Ron Waldon (@jokeyrhyme)"]
  }
  !*/
Modernizr.addTest("unknownelements",(function(){var e=createElement("a");return e.innerHTML="<xyz></xyz>",1===e.childNodes.length})),
/*!
  {
    "name": "Emoji",
    "property": "emoji"
  }
  !*/
Modernizr.addTest("emoji",(function(){if(!Modernizr.canvastext)return!1;var e=createElement("canvas").getContext("2d"),A=12*(e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1);return e.fillStyle="#f00",e.textBaseline="top",e.font="32px Arial",e.fillText("🐨",0,0),0!==e.getImageData(A,A,1,1).data[0]})),
/*!
  {
    "name": "ES5 Array",
    "property": "es5array",
    "notes": [{
      "name": "ECMAScript 5.1 Language Specification",
      "href": "https://www.ecma-international.org/ecma-262/5.1/"
    }],
    "polyfills": ["es5shim"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "tags": ["es5"]
  }
  !*/
Modernizr.addTest("es5array",(function(){return!!(Array.prototype&&Array.prototype.every&&Array.prototype.filter&&Array.prototype.forEach&&Array.prototype.indexOf&&Array.prototype.lastIndexOf&&Array.prototype.map&&Array.prototype.some&&Array.prototype.reduce&&Array.prototype.reduceRight&&Array.isArray)})),
/*!
  {
    "name": "ES5 Date",
    "property": "es5date",
    "notes": [{
      "name": "ECMAScript 5.1 Language Specification",
      "href": "https://www.ecma-international.org/ecma-262/5.1/"
    }],
    "polyfills": ["es5shim"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "tags": ["es5"]
  }
  !*/
Modernizr.addTest("es5date",(function(){var e=!1;try{e=!!Date.parse("2013-04-12T06:06:37.307Z")}catch(e){}return!!(Date.now&&Date.prototype&&Date.prototype.toISOString&&Date.prototype.toJSON&&e)})),
/*!
  {
    "name": "ES5 Function",
    "property": "es5function",
    "notes": [{
      "name": "ECMAScript 5.1 Language Specification",
      "href": "https://www.ecma-international.org/ecma-262/5.1/"
    }],
    "polyfills": ["es5shim"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "tags": ["es5"]
  }
  !*/
Modernizr.addTest("es5function",(function(){return!(!Function.prototype||!Function.prototype.bind)})),
/*!
  {
    "name": "ES5 Object",
    "property": "es5object",
    "notes": [{
      "name": "ECMAScript 5.1 Language Specification",
      "href": "https://www.ecma-international.org/ecma-262/5.1/"
    }],
    "polyfills": ["es5shim", "es5sham"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "tags": ["es5"]
  }
  !*/
Modernizr.addTest("es5object",(function(){return!!(Object.keys&&Object.create&&Object.getPrototypeOf&&Object.getOwnPropertyNames&&Object.isSealed&&Object.isFrozen&&Object.isExtensible&&Object.getOwnPropertyDescriptor&&Object.defineProperty&&Object.defineProperties&&Object.seal&&Object.freeze&&Object.preventExtensions)})),
/*!
  {
    "name": "ES5 Strict Mode",
    "property": "strictmode",
    "caniuse": "use-strict",
    "notes": [{
      "name": "ECMAScript 5.1 Language Specification",
      "href": "https://www.ecma-international.org/ecma-262/5.1/"
    }],
    "authors": ["@kangax"],
    "tags": ["es5"],
    "builderAliases": ["es5_strictmode"]
  }
  !*/
Modernizr.addTest("strictmode",function(){return!this}()),
/*!
  {
    "name": "ES5 String",
    "property": "es5string",
    "notes": [{
      "name": "ECMAScript 5.1 Language Specification",
      "href": "https://www.ecma-international.org/ecma-262/5.1/"
    }],
    "polyfills": ["es5shim"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "tags": ["es5"]
  }
  !*/
Modernizr.addTest("es5string",(function(){return!(!String.prototype||!String.prototype.trim)})),
/*!
  {
    "name": "JSON",
    "property": "json",
    "caniuse": "json",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Glossary/JSON"
    }],
    "polyfills": ["json2"]
  }
  !*/
Modernizr.addTest("json","JSON"in window&&"parse"in JSON&&"stringify"in JSON),
/*!
  {
    "name": "ES5 Syntax",
    "property": "es5syntax",
    "notes": [{
      "name": "ECMAScript 5.1 Language Specification",
      "href": "https://www.ecma-international.org/ecma-262/5.1/"
    }, {
      "name": "original implementation of detect code",
      "href": "https://kangax.github.io/compat-table/es5/"
    }],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "warnings": ["This detect uses `eval()`, so CSP may be a problem."],
    "tags": ["es5"]
  }
  !*/
Modernizr.addTest("es5syntax",(function(){var value,obj,stringAccess,getter,setter,reservedWords,zeroWidthChars;try{return stringAccess=eval('"foobar"[3] === "b"'),getter=eval("({ get x(){ return 1 } }).x === 1"),eval("({ set x(v){ value = v; } }).x = 1"),setter=1===value,eval("obj = ({ if: 1 })"),reservedWords=1===obj.if,zeroWidthChars=eval("_‌‍ = true"),stringAccess&&getter&&setter&&reservedWords&&zeroWidthChars}catch(e){return!1}})),
/*!
  {
    "name": "ES5 Immutable Undefined",
    "property": "es5undefined",
    "notes": [{
      "name": "ECMAScript 5.1 Language Specification",
      "href": "https://www.ecma-international.org/ecma-262/5.1/"
    }, {
      "name": "original implementation of detect code",
      "href": "https://kangax.github.io/compat-table/es5/"
    }],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "tags": ["es5"]
  }
  !*/
Modernizr.addTest("es5undefined",(function(){var e,A;try{A=window.undefined,window.undefined=12345,e=void 0===window.undefined,window.undefined=A}catch(e){return!1}return e})),
/*!
  {
    "name": "ES5",
    "property": "es5",
    "caniuse": "es5",
    "notes": [{
      "name": "ECMAScript 5.1 Language Specification",
      "href": "https://www.ecma-international.org/ecma-262/5.1/"
    }],
    "polyfills": ["es5shim", "es5sham"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "tags": ["es5"]
  }
  !*/
Modernizr.addTest("es5",(function(){return!!(Modernizr.es5array&&Modernizr.es5date&&Modernizr.es5function&&Modernizr.es5object&&Modernizr.strictmode&&Modernizr.es5string&&Modernizr.json&&Modernizr.es5syntax&&Modernizr.es5undefined)})),
/*!
  {
    "name": "ES6 Array",
    "property": "es6array",
    "notes": [{
      "name": "unofficial ECMAScript 6 draft specification",
      "href": "https://web.archive.org/web/20180825202128/https://tc39.github.io/ecma262/"
    }],
    "polyfills": ["es6shim"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("es6array",!!(Array.prototype&&Array.prototype.copyWithin&&Array.prototype.fill&&Array.prototype.find&&Array.prototype.findIndex&&Array.prototype.keys&&Array.prototype.entries&&Array.prototype.values&&Array.from&&Array.of)),
/*!
  {
    "name": "ES6 Arrow Functions",
    "property": "arrow",
    "authors": ["Vincent Riemer"],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("arrow",(function(){try{eval("()=>{}")}catch(e){return!1}return!0})),
/*!
  {
    "name": "ES6 Class",
    "property": "es6class",
    "notes": [{
      "name": "ECMAScript 6 language specification",
      "href": "https://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions"
    }],
    "caniuse": "es6-class",
    "authors": ["dabretin"],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("class",(function(){try{eval("class A{}")}catch(e){return!1}return!0})),
/*!
  {
    "name": "ES6 Collections",
    "property": "es6collections",
    "notes": [{
      "name": "unofficial ECMAScript 6 draft specification",
      "href": "https://web.archive.org/web/20180825202128/https://tc39.github.io/ecma262/"
    }],
    "polyfills": ["es6shim", "weakmap"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("es6collections",!!(window.Map&&window.Set&&window.WeakMap&&window.WeakSet)),
/*!
  {
    "name": "ES5 String.prototype.contains",
    "property": "contains",
    "authors": ["Robert Kowalski"],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("contains",is(String.prototype.contains,"function")),
/*!
  {
    "name": "ES6 Generators",
    "property": "generators",
    "authors": ["Michael Kachanovskyi"],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("generators",(function(){try{new Function("function* test() {}")()}catch(e){return!1}return!0})),
/*!
  {
    "name": "ES6 Math",
    "property": "es6math",
    "notes": [{
      "name": "unofficial ECMAScript 6 draft specification",
      "href": "https://web.archive.org/web/20180825202128/https://tc39.github.io/ecma262/"
    }],
    "polyfills": ["es6shim"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("es6math",!!(Math&&Math.clz32&&Math.cbrt&&Math.imul&&Math.sign&&Math.log10&&Math.log2&&Math.log1p&&Math.expm1&&Math.cosh&&Math.sinh&&Math.tanh&&Math.acosh&&Math.asinh&&Math.atanh&&Math.hypot&&Math.trunc&&Math.fround)),
/*!
  {
    "name": "ES6 Number",
    "property": "es6number",
    "notes": [{
      "name": "unofficial ECMAScript 6 draft specification",
      "href": "https://web.archive.org/web/20180825202128/https://tc39.github.io/ecma262/"
    }],
    "polyfills": ["es6shim"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("es6number",!!(Number.isFinite&&Number.isInteger&&Number.isSafeInteger&&Number.isNaN&&Number.parseInt&&Number.parseFloat&&Number.isInteger(Number.MAX_SAFE_INTEGER)&&Number.isInteger(Number.MIN_SAFE_INTEGER)&&Number.isFinite(Number.EPSILON))),
/*!
  {
    "name": "ES6 Object",
    "property": "es6object",
    "notes": [{
      "name": "unofficial ECMAScript 6 draft specification",
      "href": "https://web.archive.org/web/20180825202128/https://tc39.github.io/ecma262/"
    }],
    "polyfills": ["es6shim"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("es6object",!!(Object.assign&&Object.is&&Object.setPrototypeOf)),
/*!
  {
    "name": "ES6 Promises",
    "property": "promises",
    "caniuse": "promises",
    "polyfills": ["es6promises"],
    "authors": ["Krister Kari", "Jake Archibald"],
    "tags": ["es6"],
    "notes": [{
      "name": "The ES6 promises spec",
      "href": "https://github.com/domenic/promises-unwrapping"
    }, {
      "name": "Chromium dashboard - ES6 Promises",
      "href": "https://www.chromestatus.com/features/5681726336532480"
    }, {
      "name": "JavaScript Promises: an Introduction",
      "href": "https://developers.google.com/web/fundamentals/primers/promises/"
    }]
  }
  !*/
Modernizr.addTest("promises",(function(){return"Promise"in window&&"resolve"in window.Promise&&"reject"in window.Promise&&"all"in window.Promise&&"race"in window.Promise&&function(){var e;return new window.Promise((function(A){e=A})),"function"==typeof e}()})),
/*!
  {
    "name": "ES6 String",
    "property": "es6string",
    "notes": [{
      "name": "unofficial ECMAScript 6 draft specification",
      "href": "https://web.archive.org/web/20180825202128/https://tc39.github.io/ecma262/"
    }],
    "polyfills": ["es6shim"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("es6string",!!(String.fromCodePoint&&String.raw&&String.prototype.codePointAt&&String.prototype.repeat&&String.prototype.startsWith&&String.prototype.endsWith&&String.prototype.includes)),
/*!
  {
    "name": "ES6 Symbol",
    "property": "es6symbol",
    "caniuse": "mdn-javascript_builtins_symbol",
    "notes": [{
      "name": "Official ECMAScript 6 specification",
      "href": "https://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor"
    },{
      "name": "MDN web docs",
      "href": "https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Symbol"
    }],
    "polyfills": ["es6symbol"],
    "authors": ["buhichan (@buhichan)"],
    "tags": ["es6","symbol"]
  }
  !*/
Modernizr.addTest("es6symbol",!!(Symbol&&Symbol.for&&Symbol.hasInstance&&Symbol.isConcatSpreadable&&Symbol.iterator&&Symbol.keyFor&&Symbol.match&&Symbol.prototype&&Symbol.replace&&Symbol.search&&Symbol.species&&Symbol.split&&Symbol.toPrimitive&&Symbol.toStringTag&&Symbol.unscopables)),
/*!
  {
    "name": "ES6 Rest parameters",
    "property": "restparameters",
    "notes": [{
      "name": "ECMAScript 6 language specification",
      "href": "https://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions"
    }],
    "caniuse": "rest",
    "authors": ["dabretin"],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("restparameters",(function(){try{eval("function f(...rest) {}")}catch(e){return!1}return!0})),
/*!
  {
    "name": "ES6 Template Strings",
    "property": "stringtemplate",
    "caniuse": "template-literals",
    "notes": [{
      "name": "ECMAScript 6 draft specification",
      "href": "https://tc39wiki.calculist.org/es6/template-strings/"
    }],
    "authors": ["dabretin"],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("stringtemplate",(function(){try{return"-1-"===eval("(function(){var a=1; return `-${a}-`;})()")}catch(e){return!1}})),
/*!
  {
    "name": "ES6 Spread array",
    "property": "spreadarray",
    "notes": [{
      "name": "ECMAScript 6 language specification",
      "href": "https://tc39.es/ecma262/#sec-array-initializer"
    },
    {
      "name": "Article",
      "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"
    }],
    "caniuse": "mdn-javascript_operators_spread_spread_in_arrays",
    "authors": ["dabretin"],
    "warnings": ["not for object literals (implemented in ES7)"],
    "tags": ["es6"]
  }
  !*/
Modernizr.addTest("spreadarray",(function(){try{eval("(function f(){})(...[1])")}catch(e){return!1}return!0})),
/*!
  {
    "name": "ES7 Array",
    "property": "es7array",
    "notes": [{
      "name": "official ECMAScript 7 array draft specification",
      "href": "https://tc39.es/ecma262/#sec-array.prototype.includes"
    }],
    "authors": ["dabretin"],
    "warnings": ["ECMAScript 7 is still a only a draft, so this detect may not match the final specification or implementations."],
    "tags": ["es7"]
  }
  !*/
Modernizr.addTest("es7array",!(!Array.prototype||!Array.prototype.includes)),
/*!
  {
    "name": "ES7 Rest destructuring",
    "property": ["restdestructuringarray", "restdestructuringobject"],
    "caniuse" : "destructuring%20assignment",
    "notes": [{
      "name": "official ECMAScript 7 Destructuring Assignment draft specification",
      "href": "https://tc39.es/ecma262/#sec-destructuring-assignment"
    }],
    "authors": ["dabretin"],
    "warnings": ["ECMAScript 7 is still a only a draft, so this detect may not match the final specification or implementations."],
    "tags": ["es7"]
  }
  !*/
Modernizr.addTest("restdestructuringarray",(function(){try{eval("var [...rest]=[1]")}catch(e){return!1}return!0})),Modernizr.addTest("restdestructuringobject",(function(){try{eval("var {...rest}={a:1}")}catch(e){return!1}return!0})),
/*!
  {
    "name": "ES7 Spread object",
    "property": "spreadobject",
    "notes": [{
      "name": "official ECMAScript 7 array draft specification",
      "href": "http://www.ecma-international.org/ecma-262/9.0/#sec-object-initializer"
    }],
    "authors": ["dabretin"],
    "warnings": ["ECMAScript 7 is still a only a draft, so this detect may not match the final specification or implementations."],
    "tags": ["es7"]
  }
  !*/
Modernizr.addTest("spreadobject",(function(){try{eval("var a={...{b:1}}")}catch(e){return!1}return!0})),
/*!
  {
    "name": "ES8 Object",
    "property": "es8object",
    "notes": [{
      "name": "ECMAScript 8 draft specification: Object.entries",
      "href": "https://www.ecma-international.org/ecma-262/8.0/#sec-object.entries"
    }, {
      "name": "ECMAScript 8 draft specification: Object.values",
      "href": "https://www.ecma-international.org/ecma-262/8.0/#sec-object.values"
    }],
    "caniuse": "object-entries,object-values",
    "authors": ["dabretin"],
    "warnings": ["ECMAScript 8 is still a only a draft, so this detect may not match the final specification or implementations."],
    "tags": ["es8"]
  }
  !*/
Modernizr.addTest("es8object",!(!Object.entries||!Object.values)),
/*!
  {
    "name": "Orientation and Motion Events",
    "property": ["devicemotion", "deviceorientation"],
    "caniuse": "deviceorientation",
    "notes": [{
      "name": "W3C Editor's Draft Spec",
      "href": "https://w3c.github.io/deviceorientation/"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation"
    }],
    "authors": ["Shi Chuan"],
    "tags": ["event"],
    "builderAliases": ["event_deviceorientation_motion"]
  }
  !*/
Modernizr.addTest("devicemotion","DeviceMotionEvent"in window),Modernizr.addTest("deviceorientation","DeviceOrientationEvent"in window),
/*!
  {
    "name": "onInput Event",
    "property": "oninput",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.oninput"
    }, {
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/input.html#common-input-element-attributes"
    }, {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/210"
    }],
    "authors": ["Patrick Kettner"],
    "tags": ["event"]
  }
  !*/
Modernizr.addTest("oninput",(function(){var e,A=createElement("input");if(A.setAttribute("oninput","return"),A.style.cssText="position:fixed;top:0;",hasEvent("oninput",docElement)||"function"==typeof A.oninput)return!0;try{var t=document.createEvent("KeyboardEvent");e=!1;var r=function(A){e=!0,A.preventDefault(),A.stopPropagation()};t.initKeyEvent("keypress",!0,!0,window,!1,!1,!1,!1,0,"e".charCodeAt(0)),docElement.appendChild(A),A.addEventListener("input",r,!1),A.focus(),A.dispatchEvent(t),A.removeEventListener("input",r,!1),docElement.removeChild(A)}catch(A){e=!1}return e})),
/*!
  {
    "name": "Event Listener",
    "property": "eventlistener",
    "caniuse": "addeventlistener",
    "authors": ["Andrew Betts (@triblondon)"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Registration-interfaces"
    }],
    "polyfills": ["eventlistener"]
  }
  !*/
Modernizr.addTest("eventlistener","addEventListener"in window),
/*!
  {
    "name": "EXIF Orientation",
    "property": "exiforientation",
    "tags": ["image"],
    "builderAliases": ["exif_orientation"],
    "async": true,
    "authors": ["Paul Sayre"],
    "notes": [{
      "name": "Article by Dave Perrett",
      "href": "https://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/"
    }, {
      "name": "Article by Calvin Hass",
      "href": "https://www.impulseadventure.com/photo/exif-orientation.html"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){var e=new Image;e.onerror=function(){addTest("exiforientation",!1,{aliases:["exif-orientation"]})},e.onload=function(){addTest("exiforientation",2!==e.width,{aliases:["exif-orientation"]})},e.src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAASUkqAAgAAAABABIBAwABAAAABgASAAAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigD/2Q=="})),
/*!
  {
    "name": "File API",
    "property": "filereader",
    "caniuse": "fileapi",
    "notes": [{
      "name": "W3C Working Draft Spec",
      "href": "https://www.w3.org/TR/FileAPI/"
    }],
    "tags": ["file"],
    "builderAliases": ["file_api"],
    "knownBugs": ["Will fail in Safari 5 due to its lack of support for the standards defined FileReader object"]
  }
  !*/
Modernizr.addTest("filereader",!!(window.File&&window.FileList&&window.FileReader)),
/*!
  {
    "name": "Filesystem API",
    "property": "filesystem",
    "caniuse": "filesystem",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/file-system-api/"
    }],
    "authors": ["Eric Bidelman (@ebidel)"],
    "tags": ["file"],
    "builderAliases": ["file_filesystem"],
    "knownBugs": ["The API will be present in Chrome incognito, but will throw an exception. See crbug.com/93417"]
  }
  !*/
Modernizr.addTest("filesystem",!!prefixed("requestFileSystem",window)),
/*!
    {
    "name": "Flash",
    "property": "flash",
    "tags": ["flash"],
    "polyfills": ["shumway"]
    }
    !*/
Modernizr.addAsyncTest((function(){var e,A=function(e){docElement.contains(e)||docElement.appendChild(e)},t=function(e){e.fake&&e.parentNode&&e.parentNode.removeChild(e)},r=function(e,A){var t=!!e;if(t&&((t=new Boolean(t)).blocked="blocked"===e),addTest("flash",(function(){return t})),A&&a.contains(A)){for(;A.parentNode!==a;)A=A.parentNode;a.removeChild(A)}};try{e="ActiveXObject"in window&&"Pan"in new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(e){}if(!("plugins"in navigator&&"Shockwave Flash"in navigator.plugins||e)||isSVG)r(!1);else{var n,o,i=createElement("embed"),a=getBody();if(i.type="application/x-shockwave-flash",a.appendChild(i),!("Pan"in i)&&!e)return A(a),r("blocked",i),void t(a);n=function(){if(A(a),!docElement.contains(a))return a=document.body||a,(i=createElement("embed")).type="application/x-shockwave-flash",a.appendChild(i),setTimeout(n,1e3);docElement.contains(i)?(o=i.style.cssText,r(""===o||"blocked",i)):r("blocked"),t(a)},setTimeout(n,10)}})),
/*!
  {
    "name": "Force Touch Events",
    "property": "forcetouch",
    "authors": ["Kraig Walker"],
    "notes": [{
      "name": "Responding to Force Touch Events from JavaScript",
      "href": "https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/SafariJSProgTopics/RespondingtoForceTouchEventsfromJavaScript.html"
    }]
  }
  !*/
Modernizr.addTest("forcetouch",(function(){return!!hasEvent(prefixed("mouseforcewillbegin",window,!1),window)&&MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN&&MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN})),
/*!
  {
    "name": "input[capture] Attribute",
    "property": "capture",
    "tags": ["video", "image", "audio", "media", "attribute"],
    "notes": [{
      "name": "W3C Draft Spec",
      "href": "https://www.w3.org/TR/html-media-capture/"
    }]
  }
  !*/
Modernizr.addTest("capture","capture"in createElement("input")),
/*!
  {
    "name": "input[file] Attribute",
    "property": "fileinput",
    "caniuse": "forms",
    "tags": ["file", "forms", "input"],
    "builderAliases": ["forms_fileinput"]
  }
  !*/
Modernizr.addTest("fileinput",(function(){var e=navigator.userAgent;if(e.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)||e.match(/\swv\).+(chrome)\/([\w\.]+)/i))return!1;var A=createElement("input");return A.type="file",!A.disabled}));var domPrefixesAll=[""].concat(domPrefixes);function detectDeleteDatabase(e,A){var t=e.deleteDatabase(A);t.onsuccess=function(){addTest("indexeddb.deletedatabase",!0)},t.onerror=function(){addTest("indexeddb.deletedatabase",!1)}}ModernizrProto._domPrefixesAll=domPrefixesAll,
/*!
  {
    "name": "input[directory] Attribute",
    "property": "directory",
    "authors": ["silverwind"],
    "tags": ["file", "input", "attribute"]
  }
  !*/
Modernizr.addTest("fileinputdirectory",(function(){var e=createElement("input");e.type="file";for(var A=0,t=domPrefixesAll.length;A<t;A++)if(domPrefixesAll[A]+"directory"in e)return!0;return!1})),
/*!
  {
    "name": "input[form] Attribute",
    "property": "formattribute",
    "tags": ["attribute", "forms", "input"],
    "builderAliases": ["forms_formattribute"]
  }
  !*/
Modernizr.addTest("formattribute",(function(){var e,A,t=createElement("form"),r=createElement("input"),n=createElement("div"),o="formtest"+(new Date).getTime();t.id=o;try{r.setAttribute("form",o)}catch(A){document.createAttribute&&((e=document.createAttribute("form")).nodeValue=o,r.setAttributeNode(e))}return n.appendChild(t),n.appendChild(r),docElement.appendChild(n),A=t.elements&&1===t.elements.length&&r.form===t,n.parentNode.removeChild(n),A})),
/*!
  {
    "name": "Form input types",
    "property": "inputtypes",
    "caniuse": "forms",
    "tags": ["forms"],
    "authors": ["Mike Taylor"],
    "polyfills": [
      "jquerytools",
      "webshims",
      "h5f",
      "webforms2",
      "nwxforms",
      "fdslider",
      "html5slider",
      "galleryhtml5forms",
      "jscolor",
      "html5formshim",
      "selectedoptionsjs",
      "formvalidationjs"
    ]
  }
  !*/
function(){for(var e,A,t,r=["search","tel","url","email","datetime","date","month","week","time","datetime-local","number","range","color"],n=0;n<r.length;n++)inputElem.setAttribute("type",e=r[n]),(t="text"!==inputElem.type&&"style"in inputElem)&&(inputElem.value="1)",inputElem.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(e)&&inputElem.style.WebkitAppearance!==undefined?(docElement.appendChild(inputElem),t=(A=document.defaultView).getComputedStyle&&"textfield"!==A.getComputedStyle(inputElem,null).WebkitAppearance&&0!==inputElem.offsetHeight,docElement.removeChild(inputElem)):/^(search|tel)$/.test(e)||(t=/^(url|email)$/.test(e)?inputElem.checkValidity&&!1===inputElem.checkValidity():"1)"!==inputElem.value)),Modernizr.addTest("inputtypes."+e,!!t)}(),
/*!
  {
    "name": "Form Validation",
    "property": "formvalidation",
    "tags": ["forms", "validation", "attribute"],
    "builderAliases": ["forms_validation"]
  }
  !*/
Modernizr.addTest("formvalidation",(function(){var e=createElement("form");if(!("checkValidity"in e)||!("addEventListener"in e))return!1;if("reportValidity"in e)return!0;var A,t=!1;return Modernizr.formvalidationapi=!0,e.addEventListener("submit",(function(e){window.opera&&!window.operamini||e.preventDefault(),e.stopPropagation()}),!1),e.innerHTML='<input name="modTest" required="required" /><button></button>',testStyles("#modernizr form{position:absolute;top:-99999em}",(function(r){r.appendChild(e),(A=e.getElementsByTagName("input")[0]).addEventListener("invalid",(function(e){t=!0,e.preventDefault(),e.stopPropagation()}),!1),Modernizr.formvalidationmessage=!!A.validationMessage,e.getElementsByTagName("button")[0].click()})),t})),
/*!
  {
    "name": "input[type=\"number\"] Localization",
    "property": "localizednumber",
    "tags": ["forms", "localization", "attribute"],
    "authors": ["Peter Janes"],
    "notes": [{
      "name": "Webkit Bug Tracker Listing",
      "href": "https://bugs.webkit.org/show_bug.cgi?id=42484"
    }, {
      "name": "Based on This",
      "href": "https://trac.webkit.org/browser/trunk/LayoutTests/fast/forms/script-tests/input-number-keyoperation.js?rev=80096#L9"
    }],
    "knownBugs": ["Only ever returns true if the browser/OS is configured to use comma as a decimal separator. This is probably fine for most use cases."]
  }
  !*/
Modernizr.addTest("localizednumber",(function(){if(!Modernizr.inputtypes.number)return!1;if(!Modernizr.formvalidation)return!1;var e,A=getBody(),t=createElement("div"),r=A.firstElementChild||A.firstChild;A.insertBefore(t,r),t.innerHTML='<input type="number" value="1.0" step="0.1" style="position: fixed; top: 0;" />';var n=t.childNodes[0];A.appendChild(t),n.focus();try{document.execCommand("SelectAll",!1),document.execCommand("InsertText",!1,"1,1")}catch(e){}return e="number"===n.type&&1.1===n.valueAsNumber&&n.checkValidity(),A.removeChild(t),A.fake&&A.parentNode.removeChild(A),e})),
/*!
  {
    "name": "placeholder attribute",
    "property": "placeholder",
    "tags": ["forms", "attribute"],
    "builderAliases": ["forms_placeholder"]
  }
  !*/
Modernizr.addTest("placeholder","placeholder"in createElement("input")&&"placeholder"in createElement("textarea")),
/*!
  {
    "name": "form#requestAutocomplete()",
    "property": "requestautocomplete",
    "tags": ["form", "forms", "requestAutocomplete", "payments"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://wiki.whatwg.org/wiki/RequestAutocomplete"
    }]
  }
  !*/
Modernizr.addTest("requestautocomplete",!!prefixed("requestAutocomplete",createElement("form"))),
/*!
  {
    "name": "Fullscreen API",
    "property": "fullscreen",
    "caniuse": "fullscreen",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/API/Fullscreen"
    }],
    "polyfills": ["screenfulljs"],
    "builderAliases": ["fullscreen_api"]
  }
  !*/
Modernizr.addTest("fullscreen",!(!prefixed("exitFullscreen",document,!1)&&!prefixed("cancelFullScreen",document,!1))),
/*!
  {
    "name": "GamePad API",
    "property": "gamepads",
    "caniuse": "gamepad",
    "authors": ["Eric Bidelman"],
    "tags": ["media"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/gamepad/"
    }, {
      "name": "HTML5 Rocks Tutorial",
      "href": "https://www.html5rocks.com/en/tutorials/doodles/gamepad/#toc-featuredetect"
    }]
  }
  !*/
Modernizr.addTest("gamepads",!!prefixed("getGamepads",navigator)),
/*!
  {
    "name": "Geolocation API",
    "property": "geolocation",
    "caniuse": "geolocation",
    "tags": ["media"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation"
    }],
    "polyfills": [
      "joshuabell-polyfill",
      "webshims",
      "geo-location-javascript",
      "geolocation-api-polyfill"
    ]
  }
  !*/
Modernizr.addTest("geolocation","geolocation"in navigator),
/*!
  {
    "name": "Hashchange event",
    "property": "hashchange",
    "caniuse": "hashchange",
    "tags": ["history"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange"
    }],
    "polyfills": [
      "jquery-hashchange",
      "moo-historymanager",
      "jquery-ajaxy",
      "hasher",
      "shistory"
    ]
  }
  !*/
Modernizr.addTest("hashchange",(function(){return!1!==hasEvent("hashchange",window)&&(document.documentMode===undefined||document.documentMode>7)})),
/*!
  {
    "name": "Hidden Scrollbar",
    "property": "hiddenscroll",
    "authors": ["Oleg Korsunsky"],
    "tags": ["overlay"],
    "notes": [{
      "name": "Overlay Scrollbar description",
      "href": "https://developer.apple.com/library/mac/releasenotes/MacOSX/WhatsNewInOSX/Articles/MacOSX10_7.html#//apple_ref/doc/uid/TP40010355-SW39"
    }, {
      "name": "Video example of overlay scrollbars",
      "href": "https://gfycat.com/FoolishMeaslyAtlanticsharpnosepuffer"
    }]
  }
  !*/
Modernizr.addTest("hiddenscroll",(function(){return testStyles("#modernizr {width:100px;height:100px;overflow:scroll}",(function(e){return e.offsetWidth===e.clientWidth}))})),
/*!
  {
    "name": "History API",
    "property": "history",
    "caniuse": "history",
    "tags": ["history"],
    "authors": ["Hay Kranen", "Alexander Farkas"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/html51/browsers.html#the-history-interface"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
    }],
    "polyfills": ["historyjs", "html5historyapi"]
  }
  !*/
Modernizr.addTest("history",(function(){var e=navigator.userAgent;return!!e&&(-1===e.indexOf("Android 2.")&&-1===e.indexOf("Android 4.0")||-1===e.indexOf("Mobile Safari")||-1!==e.indexOf("Chrome")||-1!==e.indexOf("Windows Phone")||"file:"===location.protocol)&&window.history&&"pushState"in window.history})),
/*!
  {
    "name": "HTML Imports",
    "property": "htmlimports",
    "tags": ["html", "import"],
    "polyfills": ["polymer-htmlimports"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://w3c.github.io/webcomponents/spec/imports/"
    }, {
      "name": "HTML Imports - #include for the web",
      "href": "https://www.html5rocks.com/en/tutorials/webcomponents/imports/"
    }]
  }
  !*/
Modernizr.addTest("htmlimports","import"in createElement("link")),
/*!
  {
    "name": "IE8 compat mode",
    "property": "ie8compat",
    "authors": ["Erich Ocean"]
  }
  !*/
Modernizr.addTest("ie8compat",!window.addEventListener&&!!document.documentMode&&7===document.documentMode),
/*!
  {
    "name": "iframe[sandbox] Attribute",
    "property": "sandbox",
    "caniuse": "iframe-sandbox",
    "tags": ["iframe"],
    "builderAliases": ["iframe_sandbox"],
    "notes": [
    {
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/embedded-content.html#attr-iframe-sandbox"
    }],
    "knownBugs": ["False-positive on Firefox < 29"]
  }
  !*/
Modernizr.addTest("sandbox","sandbox"in createElement("iframe")),
/*!
  {
    "name": "iframe[seamless] Attribute",
    "property": "seamless",
    "tags": ["iframe"],
    "builderAliases": ["iframe_seamless"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/embedded-content.html#attr-iframe-seamless"
    }]
  }
  !*/
Modernizr.addTest("seamless","seamless"in createElement("iframe")),
/*!
  {
    "name": "iframe[srcdoc] Attribute",
    "property": "srcdoc",
    "caniuse": "iframe-srcdoc",
    "tags": ["iframe"],
    "builderAliases": ["iframe_srcdoc"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/embedded-content.html#attr-iframe-srcdoc"
    }]
  }
  !*/
Modernizr.addTest("srcdoc","srcdoc"in createElement("iframe")),
/*!
  {
    "name": "Animated PNG",
    "async": true,
    "property": "apng",
    "caniuse": "apng",
    "tags": ["image"],
    "builderAliases": ["img_apng"],
    "notes": [{
      "name": "Wikipedia Article",
      "href": "https://en.wikipedia.org/wiki/APNG"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){if(!Modernizr.canvas)return!1;var e=new Image,A=createElement("canvas"),t=A.getContext("2d");e.onload=function(){addTest("apng",(function(){return void 0!==A.getContext&&(t.drawImage(e,0,0),0===t.getImageData(0,0,1,1).data[3])}))},e.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg=="})),
/*!
  {
    "name": "Image crossOrigin",
    "property": "imgcrossorigin",
    "notes": [{
      "name": "Cross Domain Images and the Tainted Canvas",
      "href": "https://blog.codepen.io/2013/10/08/cross-domain-images-tainted-canvas/"
    }]
  }
  !*/
Modernizr.addTest("imgcrossorigin","crossOrigin"in createElement("img")),
/*!
  {
    "name": "JPEG 2000",
    "async": true,
    "aliases": ["jpeg-2000", "jpg2"],
    "property": "jpeg2000",
    "caniuse": "jpeg2000",
    "tags": ["image"],
    "authors": ["@eric_wvgg"],
    "notes": [{
      "name": "Wikipedia Article",
      "href": "https://en.wikipedia.org/wiki/JPEG_2000"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){var e=new Image;e.onload=e.onerror=function(){addTest("jpeg2000",1===e.width)},e.src="data:image/jp2;base64,/0//UQAyAAAAAAABAAAAAgAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAEBwEBBwEBBwEBBwEB/1IADAAAAAEAAAQEAAH/XAAEQED/ZAAlAAFDcmVhdGVkIGJ5IE9wZW5KUEVHIHZlcnNpb24gMi4wLjD/kAAKAAAAAABYAAH/UwAJAQAABAQAAf9dAAUBQED/UwAJAgAABAQAAf9dAAUCQED/UwAJAwAABAQAAf9dAAUDQED/k8+kEAGvz6QQAa/PpBABr994EAk//9k="})),
/*!
  {
    "name": "JPEG XR (extended range)",
    "async": true,
    "aliases": ["jpeg-xr"],
    "property": "jpegxr",
    "tags": ["image"],
    "notes": [{
      "name": "Wikipedia Article",
      "href": "https://en.wikipedia.org/wiki/JPEG_XR"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){var e=new Image;e.onload=e.onerror=function(){addTest("jpegxr",1===e.width,{aliases:["jpeg-xr"]})},e.src="data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA=="})),
/*!
  {
    "name": "image and iframe native lazy loading",
    "property": "lazyloading",
    "caniuse": "loading-lazy-attr",
    "tags": ["image", "lazy", "loading"],
    "notes": [{
      "name": "Native image lazy-loading for the web",
      "href": "https://addyosmani.com/blog/lazy-loading/"
    }]
  }
  !*/
Modernizr.addTest("lazyloading","loading"in HTMLImageElement.prototype),
/*!
  {
    "name": "sizes attribute",
    "async": true,
    "property": "sizes",
    "tags": ["image"],
    "authors": ["Mat Marquis"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element"
    }, {
      "name": "Srcset and sizes",
      "href": "https://ericportis.com/posts/2014/srcset-sizes/"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){var e,A,t=createElement("img"),r="sizes"in t;!r&&"srcset"in t?("data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",e="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",A=function(){addTest("sizes",2===t.width)},t.onload=A,t.onerror=A,t.setAttribute("sizes","9px"),t.srcset=e+" 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 8w",t.src=e):addTest("sizes",r)})),
/*!
  {
    "name": "srcset attribute",
    "property": "srcset",
    "caniuse": "srcset",
    "tags": ["image"],
    "notes": [{
      "name": "Smashing Magazine Article",
      "href": "https://www.smashingmagazine.com/2013/08/webkit-implements-srcset-and-why-its-a-good-thing/"
    }, {
      "name": "Generate multi-resolution images for srcset with Grunt",
      "href": "https://addyosmani.com/blog/generate-multi-resolution-images-for-srcset-with-grunt/"
    }]
  }
  !*/
Modernizr.addTest("srcset","srcset"in createElement("img")),
/*!
  {
    "name": "Webp",
    "async": true,
    "property": "webp",
    "caniuse": "webp",
    "tags": ["image"],
    "builderAliases": ["img_webp"],
    "authors": ["Krister Kari", "@amandeep", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
    "notes": [{
      "name": "Webp Info",
      "href": "https://developers.google.com/speed/webp/"
    }, {
      "name": "Chromium blog - Chrome 32 Beta: Animated WebP images and faster Chrome for Android touch input",
      "href": "https://blog.chromium.org/2013/11/chrome-32-beta-animated-webp-images-and.html"
    }, {
      "name": "Webp Lossless Spec",
      "href": "https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification"
    }, {
      "name": "Article about WebP support",
      "href": "https://optimus.keycdn.com/support/webp-support/"
    }, {
      "name": "Chromium WebP announcement",
      "href": "https://blog.chromium.org/2011/11/lossless-and-transparency-encoding-in.html?m=1"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){var e=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],A=e.shift();function t(e,A,t){var r=new Image;function n(A){var n=!(!A||"load"!==A.type)&&1===r.width;addTest(e,"webp"===e&&n?new Boolean(n):n),t&&t(A)}r.onerror=n,r.onload=n,r.src=A}t(A.name,A.uri,(function(A){if(A&&"load"===A.type)for(var r=0;r<e.length;r++)t(e[r].name,e[r].uri)}))})),
/*!
  {
    "name": "Webp Alpha",
    "async": true,
    "property": "webpalpha",
    "aliases": ["webp-alpha"],
    "tags": ["image"],
    "authors": ["Krister Kari", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
    "notes": [{
      "name": "WebP Info",
      "href": "https://developers.google.com/speed/webp/"
    }, {
      "name": "Article about WebP support",
      "href": "https://optimus.keycdn.com/support/webp-support/"
    }, {
      "name": "Chromium WebP announcement",
      "href": "https://blog.chromium.org/2011/11/lossless-and-transparency-encoding-in.html?m=1"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){var e=new Image;e.onerror=function(){addTest("webpalpha",!1,{aliases:["webp-alpha"]})},e.onload=function(){addTest("webpalpha",1===e.width,{aliases:["webp-alpha"]})},e.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="})),
/*!
  {
    "name": "Webp Animation",
    "async": true,
    "property": "webpanimation",
    "aliases": ["webp-animation"],
    "tags": ["image"],
    "authors": ["Krister Kari", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
    "notes": [{
      "name": "WebP Info",
      "href": "https://developers.google.com/speed/webp/"
    }, {
      "name": "Chromium blog - Chrome 32 Beta: Animated WebP images and faster Chrome for Android touch input",
      "href": "https://blog.chromium.org/2013/11/chrome-32-beta-animated-webp-images-and.html"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){var e=new Image;e.onerror=function(){addTest("webpanimation",!1,{aliases:["webp-animation"]})},e.onload=function(){addTest("webpanimation",1===e.width,{aliases:["webp-animation"]})},e.src="data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"})),
/*!
  {
    "name": "Webp Lossless",
    "async": true,
    "property": ["webplossless", "webp-lossless"],
    "tags": ["image"],
    "authors": ["@amandeep", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
    "notes": [{
      "name": "Webp Info",
      "href": "https://developers.google.com/speed/webp/"
    }, {
      "name": "Webp Lossless Spec",
      "href": "https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){var e=new Image;e.onerror=function(){addTest("webplossless",!1,{aliases:["webp-lossless"]})},e.onload=function(){addTest("webplossless",1===e.width,{aliases:["webp-lossless"]})},e.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="})),
/*!
  {
    "name": "IndexedDB",
    "property": "indexeddb",
    "caniuse": "indexeddb",
    "tags": ["storage"],
    "polyfills": ["indexeddb"],
    "async": true
  }
  !*/
Modernizr.addAsyncTest((function(){var e;try{e=prefixed("indexedDB",window)}catch(e){}if(e){var A,t="modernizr-"+Math.random();try{A=e.open(t)}catch(e){return void addTest("indexeddb",!1)}A.onerror=function(r){!A.error||"InvalidStateError"!==A.error.name&&"UnknownError"!==A.error.name?(addTest("indexeddb",!0),detectDeleteDatabase(e,t)):(addTest("indexeddb",!1),r.preventDefault())},A.onsuccess=function(){addTest("indexeddb",!0),detectDeleteDatabase(e,t)}}else addTest("indexeddb",!1)})),
/*!
  {
    "name": "IndexedDB Blob",
    "property": "indexeddbblob"
  }
  !*/
Modernizr.addAsyncTest((function(){var e,A,t,r,n="detect-blob-support",o=!1;try{e=prefixed("indexedDB",window)}catch(e){}if(!Modernizr.indexeddb||!Modernizr.indexeddb.deletedatabase)return!1;try{e.deleteDatabase(n).onsuccess=function(){(A=e.open(n,1)).onupgradeneeded=function(){A.result.createObjectStore("store")},A.onsuccess=function(){t=A.result;try{(r=t.transaction("store","readwrite").objectStore("store").put(new Blob,"key")).onsuccess=function(){o=!0},r.onerror=function(){o=!1}}catch(e){o=!1}finally{addTest("indexeddbblob",o),t.close(),e.deleteDatabase(n)}}}}catch(e){addTest("indexeddbblob",!1)}})),
/*!
  {
    "name": "input formaction",
    "property": "inputformaction",
    "aliases": ["input-formaction"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formaction"
    }, {
      "name": "Wufoo demo",
      "href": "https://www.wufoo.com/html5/formaction-attribute/"
    }],
    "polyfills": ["webshims"]
  }
  !*/
Modernizr.addTest("inputformaction",!!("formAction"in createElement("input")),{aliases:["input-formaction"]}),
/*!
  {
    "name": "input formenctype",
    "property": "inputformenctype",
    "aliases": ["input-formenctype"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formenctype"
    }, {
      "name": "Wufoo demo",
      "href": "https://www.wufoo.com/html5/formenctype-attribute/"
    }],
    "polyfills": ["html5formshim"]
  }
  !*/
Modernizr.addTest("inputformenctype",!!("formEnctype"in createElement("input")),{aliases:["input-formenctype"]}),
/*!
  {
    "name": "input formmethod",
    "property": "inputformmethod",
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formmethod"
    }, {
      "name": "Wufoo demo",
      "href": "https://www.wufoo.com/html5/formmethod-attribute/"
    }],
    "polyfills": ["webshims"]
  }
  !*/
Modernizr.addTest("inputformmethod",!!("formMethod"in createElement("input"))),
/*!
  {
    "name": "input formnovalidate",
    "property": "inputformnovalidate",
    "aliases": ["input-formnovalidate"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formnovalidate"
    }, {
      "name": "Wufoo demo",
      "href": "https://www.wufoo.com/html5/formnovalidate-attribute/"
    }],
    "polyfills": ["html5formshim"]
  }
  !*/
Modernizr.addTest("inputformnovalidate",!!("formNoValidate"in createElement("input")),{aliases:["input-formnovalidate"]}),
/*!
  {
    "name": "input formtarget",
    "property": "inputformtarget",
    "aliases": ["input-formtarget"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-formtarget"
    }, {
      "name": "Wufoo demo",
      "href": "https://www.wufoo.com/html5/formtarget-attribute/"
    }],
    "polyfills": ["html5formshim"]
  }
  !*/
Modernizr.addTest("inputformtarget",!!("formTarget"in createElement("input")),{aliases:["input-formtarget"]}),
/*!
  {
    "name": "input[search] search event",
    "property": "inputsearchevent",
    "tags": ["input","search"],
    "authors": ["Calvin Webster"],
    "notes": [{
      "name": "Wufoo demo",
      "href": "https://www.wufoo.com/html5/search-type/"
    }, {
      "name": "CSS Tricks",
      "href": "https://css-tricks.com/webkit-html5-search-inputs/"
    }]
  }
  !*/
Modernizr.addTest("inputsearchevent",hasEvent("search")),
/*!
  {
    "name": "Internationalization API",
    "property": "intl",
    "caniuse": "internationalization",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"
    }, {
      "name": "ECMAScript spec",
      "href": "https://www.ecma-international.org/ecma-402/1.0/"
    }]
  }
   !*/
Modernizr.addTest("intl",!!prefixed("Intl",window)),
/*!
  {
    "name": "Font Ligatures",
    "property": "ligatures",
    "caniuse": "font-feature",
    "notes": [{
      "name": "Cross-browser Web Fonts",
      "href": "https://www.sitepoint.com/cross-browser-web-fonts-part-3/"
    }]
  }
  !*/
Modernizr.addTest("ligatures",testAllProps("fontFeatureSettings",'"liga" 1')),
/*!
  {
    "name": "Reverse Ordered Lists",
    "property": "olreversed",
    "notes": [{
      "name": "Impressive Webs article",
      "href": "https://www.impressivewebs.com/reverse-ordered-lists-html5/"
    }],
    "builderAliases": ["lists_reversed"]
  }
  !*/
Modernizr.addTest("olreversed","reversed"in createElement("ol")),
/*!
  {
    "name": "MathML",
    "property": "mathml",
    "caniuse": "mathml",
    "authors": ["Addy Osmani", "Davide P. Cervone", "David Carlisle"],
    "knownBugs": ["Firefox < 4 will likely return a false, however it does support MathML inside XHTML documents"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/Math/"
    }],
    "polyfills": ["mathjax"]
  }
  !*/
Modernizr.addTest("mathml",(function(){var e;return testStyles("#modernizr{position:absolute;display:inline-block}",(function(A){A.innerHTML+="<math><mfrac><mi>xx</mi><mi>yy</mi></mfrac></math>",e=A.offsetHeight>A.offsetWidth})),e})),
/*!
  {
    "name": "Hover Media Query",
    "property": "hovermq"
  }
  !*/
Modernizr.addTest("hovermq",mq("(hover)")),
/*!
  {
    "name": "Pointer Media Query",
    "property": "pointermq"
  }
  !*/
Modernizr.addTest("pointermq",mq("(pointer:coarse),(pointer:fine),(pointer:none)")),
/*!
  {
    "name": "Media Source Extensions API",
    "caniuse": "mediasource",
    "property": "mediasource",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
    }],
    "builderAliases": ["media_source_extension_api"]
  }
  !*/
Modernizr.addTest("mediasource","MediaSource"in window),
/*!
  {
    "name": "Message Channel",
    "property": "messagechannel",
    "authors": ["Raju Konga (@kongaraju)"],
    "caniuse": "channel-messaging",
    "tags": ["performance", "messagechannel"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/2011/WD-webmessaging-20110317/#message-channels"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API/Using_channel_messaging"
    }]
  }
  !*/
Modernizr.addTest("messagechannel","MessageChannel"in window),
/*!
  {
    "name": "Beacon API",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/navigator.sendBeacon"
    }, {
      "name": "W3C Spec",
      "href": "https://w3c.github.io/beacon/"
    }],
    "property": "beacon",
    "caniuse": "beacon",
    "tags": ["beacon", "network"],
    "authors": ["Cătălin Mariș"]
  }
  !*/
Modernizr.addTest("beacon","sendBeacon"in navigator),
/*!
  {
    "name": "Low Bandwidth Connection",
    "property": "lowbandwidth",
    "tags": ["network"],
    "builderAliases": ["network_connection"]
  }
  !*/
Modernizr.addTest("lowbandwidth",(function(){var e=navigator.connection||{type:0};return 3===e.type||4===e.type||/^[23]g$/.test(e.type)})),
/*!
  {
    "name": "Connection Effective Type",
    "notes": [{
      "name": "MDN documentation",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType"
    }],
    "property": "connectioneffectivetype",
    "builderAliases": ["network_connection"],
    "tags": ["network"]
  }
  !*/
Modernizr.addTest("effectiveType",(function(){return 0!==(navigator.connection||{effectiveType:0}).effectiveType})),
/*!
  {
    "name": "Server Sent Events",
    "property": "eventsource",
    "tags": ["network"],
    "builderAliases": ["network_eventsource"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events"
    }]
  }
  !*/
Modernizr.addTest("eventsource","EventSource"in window),
/*!
  {
    "name": "Fetch API",
    "property": "fetch",
    "tags": ["network"],
    "caniuse": "fetch",
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://fetch.spec.whatwg.org/"
    }],
    "polyfills": ["fetch"]
  }
  !*/
Modernizr.addTest("fetch","fetch"in window),
/*!
  {
    "name": "XML HTTP Request Level 2 XHR2",
    "property": "xhr2",
    "caniuse": "xhr2",
    "tags": ["network"],
    "builderAliases": ["network_xhr2"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/XMLHttpRequest2/"
    }, {
      "name": "Details on Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/385"
    }]
  }
  !*/
Modernizr.addTest("xhr2","XMLHttpRequest"in window&&"withCredentials"in new XMLHttpRequest),
/*!
  {
    "name": "XHR responseType",
    "property": "xhrresponsetype",
    "tags": ["network"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
    }]
  }
  !*/
Modernizr.addTest("xhrresponsetype",function(){if("undefined"==typeof XMLHttpRequest)return!1;var e=new XMLHttpRequest;return e.open("get","/",!0),"response"in e}());var testXhrType=function(e){if("undefined"==typeof XMLHttpRequest)return!1;var A=new XMLHttpRequest;A.open("get","/",!0);try{A.responseType=e}catch(e){return!1}return"response"in A&&A.responseType===e};
/*!
  {
    "name": "XHR responseType='arraybuffer'",
    "property": "xhrresponsetypearraybuffer",
    "tags": ["network"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
    }]
  }
  !*/Modernizr.addTest("xhrresponsetypearraybuffer",testXhrType("arraybuffer")),
/*!
  {
    "name": "XHR responseType='blob'",
    "property": "xhrresponsetypeblob",
    "tags": ["network"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
    }]
  }
  !*/
Modernizr.addTest("xhrresponsetypeblob",testXhrType("blob")),
/*!
  {
    "name": "XHR responseType='document'",
    "property": "xhrresponsetypedocument",
    "tags": ["network"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
    }]
  }
  !*/
Modernizr.addTest("xhrresponsetypedocument",testXhrType("document")),
/*!
  {
    "name": "XHR responseType='json'",
    "property": "xhrresponsetypejson",
    "tags": ["network"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
    }, {
      "name": "Explanation of xhr.responseType='json'",
      "href": "https://mathiasbynens.be/notes/xhr-responsetype-json"
    }]
  }
  !*/
Modernizr.addTest("xhrresponsetypejson",testXhrType("json")),
/*!
  {
    "name": "XHR responseType='text'",
    "property": "xhrresponsetypetext",
    "tags": ["network"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://xhr.spec.whatwg.org/#the-responsetype-attribute"
    }]
  }
  !*/
Modernizr.addTest("xhrresponsetypetext",testXhrType("text")),
/*!
  {
    "name": "Notification",
    "property": "notification",
    "caniuse": "notifications",
    "authors": ["Theodoor van Donge", "Hendrik Beskow"],
    "notes": [{
      "name": "HTML5 Rocks Tutorial",
      "href": "https://www.html5rocks.com/en/tutorials/notifications/quick/"
    }, {
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/notifications/"
    }, {
      "name": "Changes in Chrome to Notifications API due to Service Worker Push Notifications",
      "href": "https://developers.google.com/web/updates/2015/05/Notifying-you-of-notificiation-changes"
    }],
    "knownBugs": ["Possibility of false-positive on Chrome for Android if permissions we're granted for a website prior to Chrome 44."],
    "polyfills": ["desktop-notify", "html5-notifications"]
  }
  !*/
Modernizr.addTest("notification",(function(){if(!window.Notification||!window.Notification.requestPermission)return!1;if("granted"===window.Notification.permission)return!0;try{new window.Notification("")}catch(e){if("TypeError"===e.name)return!1}return!0})),
/*!
  {
    "name": "Page Visibility API",
    "property": "pagevisibility",
    "caniuse": "pagevisibility",
    "tags": ["performance"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/DOM/Using_the_Page_Visibility_API"
    }, {
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/2011/WD-page-visibility-20110602/"
    }, {
      "name": "HTML5 Rocks Tutorial",
      "href": "https://www.html5rocks.com/en/tutorials/pagevisibility/intro/"
    }],
    "polyfills": ["visibilityjs", "visiblyjs", "jquery-visibility"]
  }
  !*/
Modernizr.addTest("pagevisibility",!!prefixed("hidden",document,!1)),
/*!
  {
    "name": "Navigation Timing API",
    "property": "performance",
    "caniuse": "nav-timing",
    "tags": ["performance"],
    "authors": ["Scott Murphy (@uxder)"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/navigation-timing/"
    }, {
      "name": "HTML5 Rocks Tutorial",
      "href": "https://www.html5rocks.com/en/tutorials/webperformance/basics/"
    }],
    "polyfills": ["perfnow"]
  }
  !*/
Modernizr.addTest("performance",!!prefixed("performance",window)),
/*!
  {
    "name": "DOM Pointer Events API",
    "property": "pointerevents",
    "caniuse": "pointer",
    "tags": ["input"],
    "authors": ["Stu Cox"],
    "notes": [{
      "name": "W3C Spec (Pointer Events)",
      "href": "https://www.w3.org/TR/pointerevents/"
    }, {
      "name": "W3C Spec (Pointer Events Level 2)",
      "href": "https://www.w3.org/TR/pointerevents2/"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent"
    }],
    "warnings": ["This property name now refers to W3C DOM PointerEvents: https://github.com/Modernizr/Modernizr/issues/548#issuecomment-12812099"],
    "polyfills": ["pep"]
  }
  !*/
Modernizr.addTest("pointerevents",(function(){for(var e=0,A=domPrefixesAll.length;e<A;e++)if(hasEvent(domPrefixesAll[e]+"pointerdown"))return!0;return!1})),
/*!
  {
    "name": "Pointer Lock API",
    "property": "pointerlock",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/API/Pointer_Lock_API"
    }],
    "builderAliases": ["pointerlock_api"]
  }
  !*/
Modernizr.addTest("pointerlock",!!prefixed("exitPointerLock",document));
/*!
  {
    "name": "postMessage",
    "property": "postmessage",
    "caniuse": "x-doc-messaging",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/webmessaging/#crossDocumentMessages"
    }],
    "polyfills": ["easyxdm", "postmessage-jquery"],
    "knownBugs": ["structuredclones - Android 2&3 can not send a structured clone of dates, filelists or regexps"],
    "warnings": ["Some old WebKit versions have bugs. Stick with object, array, number and pixeldata to be safe."]
  }
  !*/
var bool=!0;try{window.postMessage({toString:function(){bool=!1}},"*")}catch(e){}Modernizr.addTest("postmessage",new Boolean("postMessage"in window)),Modernizr.addTest("postmessage.structuredclones",bool),
/*!
  {
    "name": "Proximity API",
    "property": "proximity",
    "authors": ["Cătălin Mariș"],
    "tags": ["events", "proximity"],
    "caniuse": "proximity",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/Proximity_Events"
    }, {
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/proximity/"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){var e;function A(){clearTimeout(e),window.removeEventListener("deviceproximity",A),addTest("proximity",!0)}"ondeviceproximity"in window&&"onuserproximity"in window?(window.addEventListener("deviceproximity",A),e=setTimeout((function(){window.removeEventListener("deviceproximity",A),addTest("proximity",!1)}),300)):addTest("proximity",!1)})),
/*!
  {
    "name": "Proxy Object",
    "property": "proxy",
    "caniuse": "proxy",
    "authors": ["Brock Beaudry"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy"
    }],
    "polyfills": [
      "harmony-reflect"
    ]
  }
  !*/
Modernizr.addTest("proxy","Proxy"in window),
/*!
  {
    "name": "QuerySelector",
    "property": "queryselector",
    "caniuse": "queryselector",
    "tags": ["queryselector"],
    "authors": ["Andrew Betts (@triblondon)"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/selectors-api/#queryselectorall"
    }],
    "polyfills": ["css-selector-engine"]
  }
  !*/
Modernizr.addTest("queryselector","querySelector"in document&&"querySelectorAll"in document),
/*!
  {
    "name": "Quota Storage Management API",
    "property": "quotamanagement",
    "tags": ["storage"],
    "builderAliases": ["quota_management_api"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/quota-api/"
    }]
  }
  !*/
Modernizr.addTest("quotamanagement",(function(){var e=prefixed("temporaryStorage",navigator),A=prefixed("persistentStorage",navigator);return!(!e||!A)})),
/*!
  {
    "name": "requestAnimationFrame",
    "property": "requestanimationframe",
    "aliases": ["raf"],
    "caniuse": "requestanimationframe",
    "tags": ["animation"],
    "authors": ["Addy Osmani"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/animation-timing/"
    }],
    "polyfills": ["raf"]
  }
  !*/
Modernizr.addTest("requestanimationframe",!!prefixed("requestAnimationFrame",window),{aliases:["raf"]}),
/*!
  {
    "name": "script[async]",
    "property": "scriptasync",
    "caniuse": "script-async",
    "tags": ["script"],
    "builderAliases": ["script_async"],
    "authors": ["Theodoor van Donge"]
  }
  !*/
Modernizr.addTest("scriptasync","async"in createElement("script")),
/*!
  {
    "name": "script[defer]",
    "property": "scriptdefer",
    "caniuse": "script-defer",
    "tags": ["script"],
    "builderAliases": ["script_defer"],
    "authors": ["Theodoor van Donge"],
    "warnings": ["Browser implementation of the `defer` attribute vary: https://stackoverflow.com/questions/3952009/defer-attribute-chrome#answer-3982619"],
    "knownBugs": ["False positive in Opera 12"]
  }
  !*/
Modernizr.addTest("scriptdefer","defer"in createElement("script")),
/*!
  {
    "name": "ServiceWorker API",
    "property": "serviceworker",
    "caniuse": "serviceworkers",
    "notes": [{
      "name": "ServiceWorkers Explained",
      "href": "https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md"
    }]
  }
  !*/
Modernizr.addTest("serviceworker","serviceWorker"in navigator),
/*!
  {
    "property": "speechrecognition",
    "caniuse": "speech-recognition",
    "tags": ["input", "speech"],
    "authors": ["Cătălin Mariș"],
    "name": "Speech Recognition API",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://w3c.github.io/speech-api/speechapi.html#speechreco-section"
    }, {
      "name": "Introduction to the Web Speech API",
      "href": "https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API"
    }]
  }
  !*/
Modernizr.addTest("speechrecognition",(function(){try{return!!prefixed("SpeechRecognition",window)}catch(e){return!1}})),
/*!
  {
    "property": "speechsynthesis",
    "caniuse": "speech-synthesis",
    "tags": ["input", "speech"],
    "authors": ["Cătălin Mariș"],
    "name": "Speech Synthesis API",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://w3c.github.io/speech-api/speechapi.html#tts-section"
    }]
  }
  !*/
Modernizr.addTest("speechsynthesis",(function(){try{return"SpeechSynthesisUtterance"in window}catch(e){return!1}})),
/*!
  {
    "name": "Local Storage",
    "property": "localstorage",
    "caniuse": "namevalue-storage",
    "tags": ["storage"],
    "polyfills": [
      "joshuabell-polyfill",
      "cupcake",
      "storagepolyfill",
      "amplifyjs",
      "yui-cacheoffline"
    ]
  }
  !*/
Modernizr.addTest("localstorage",(function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(e){return!1}})),
/*!
  {
    "name": "Session Storage",
    "property": "sessionstorage",
    "tags": ["storage"],
    "polyfills": ["joshuabell-polyfill", "cupcake", "sessionstorage"]
  }
  !*/
Modernizr.addTest("sessionstorage",(function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(e){return!1}})),
/*!
  {
    "name": "Web SQL Database",
    "property": "websqldatabase",
    "caniuse": "sql-storage",
    "tags": ["storage"]
  }
  !*/
Modernizr.addTest("websqldatabase","openDatabase"in window),
/*!
  {
    "name": "style[scoped]",
    "property": "stylescoped",
    "caniuse": "style-scoped",
    "tags": ["dom"],
    "builderAliases": ["style_scoped"],
    "authors": ["Cătălin Mariș"],
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://html.spec.whatwg.org/multipage/semantics.html#attr-style-scoped"
    }],
    "polyfills": ["scoped-styles"]
  }
  !*/
Modernizr.addTest("stylescoped","scoped"in createElement("style")),
/*!
  {
    "name": "SVG",
    "property": "svg",
    "caniuse": "svg",
    "tags": ["svg"],
    "authors": ["Erik Dahlstrom"],
    "polyfills": [
      "svgweb",
      "raphael",
      "amplesdk",
      "canvg",
      "svg-boilerplate",
      "sie",
      "dojogfx",
      "fabricjs"
    ]
  }
  !*/
Modernizr.addTest("svg",!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),
/*!
  {
    "name": "SVG as an <img> tag source",
    "property": "svgasimg",
    "caniuse": "svg-img",
    "tags": ["svg"],
    "aliases": ["svgincss"],
    "authors": ["Chris Coyier"],
    "notes": [{
      "name": "HTML5 Spec",
      "href": "https://www.w3.org/TR/html5/embedded-content-0.html#the-img-element"
    }]
  }
  !*/
Modernizr.addTest("svgasimg",document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"));var toStringFn={}.toString;
/*!
  {
    "name": "SVG clip paths",
    "property": "svgclippaths",
    "tags": ["svg"],
    "notes": [{
      "name": "Demo",
      "href": "http://srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg"
    }]
  }
  !*/Modernizr.addTest("svgclippaths",(function(){return!!document.createElementNS&&/SVGClipPath/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg","clipPath")))})),
/*!
  {
    "name": "SVG filters",
    "property": "svgfilters",
    "caniuse": "svg-filters",
    "tags": ["svg"],
    "builderAliases": ["svg_filters"],
    "authors": ["Erik Dahlstrom"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/SVG11/filters.html"
    }]
  }
  !*/
Modernizr.addTest("svgfilters",(function(){var e=!1;try{e="SVGFEColorMatrixElement"in window&&2===SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE}catch(e){}return e})),
/*!
  {
    "name": "SVG foreignObject",
    "property": "svgforeignobject",
    "tags": ["svg"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/SVG11/extend.html"
    }]
  }
  !*/
Modernizr.addTest("svgforeignobject",(function(){return!!document.createElementNS&&/SVGForeignObject/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg","foreignObject")))})),
/*!
  {
    "name": "Inline SVG",
    "property": "inlinesvg",
    "caniuse": "svg-html5",
    "tags": ["svg"],
    "notes": [{
      "name": "Test page",
      "href": "https://paulirish.com/demo/inline-svg"
    }, {
      "name": "Test page and results",
      "href": "https://codepen.io/eltonmesquita/full/GgXbvo/"
    }],
    "polyfills": ["inline-svg-polyfill"],
    "knownBugs": ["False negative on some Chromia browsers."]
  }
  !*/
Modernizr.addTest("inlinesvg",(function(){var e=createElement("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"===("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)})),
/*!
  {
    "name": "SVG SMIL animation",
    "property": "smil",
    "caniuse": "svg-smil",
    "tags": ["svg"],
    "notes": [{
    "name": "W3C Spec",
    "href": "https://www.w3.org/AudioVideo/"
    }]
  }
  !*/
Modernizr.addTest("smil",(function(){return!!document.createElementNS&&/SVGAnimate/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg","animate")))})),
/*!
  {
    "name": "Template strings",
    "property": "templatestrings",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Browser_compatibility"
    }]
  }
  !*/
Modernizr.addTest("templatestrings",(function(){var supports;try{eval("``"),supports=!0}catch(e){}return!!supports})),
/*!
  {
    "name": "textarea maxlength",
    "property": "textareamaxlength",
    "aliases": ["textarea-maxlength"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea"
    }],
    "polyfills": ["maxlength"]
  }
  !*/
Modernizr.addTest("textareamaxlength",!!("maxLength"in createElement("textarea"))),
/*!
  {
    "name": "Text Encoding/Decoding",
    "property": ["textencoder", "textdecoder"],
    "caniuse" : "textencoder",
    "notes": [{
      "name": "MDN TextEncoder Doc",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder"
    }, {
      "name": "MDN TextDecoder Doc",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder"
    }],
    "authors": ["dabretin"]
  }
  !*/
Modernizr.addTest("textencoder",!(!window.TextEncoder||!window.TextEncoder.prototype.encode)),Modernizr.addTest("textdecoder",!(!window.TextDecoder||!window.TextDecoder.prototype.decode)),
/*!
  {
    "name": "Typed arrays",
    "property": "typedarrays",
    "caniuse": "typedarrays",
    "tags": ["js"],
    "authors": ["Stanley Stuart (@fivetanley)"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays"
    }, {
      "name": "Kronos spec",
      "href": "http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects"
    }],
    "polyfills": ["joshuabell-polyfill"]
  }
  !*/
Modernizr.addTest("typedarrays","ArrayBuffer"in window),
/*!
  {
    "name": "Unicode Range",
    "property": "unicoderange",
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/2013/CR-css-fonts-3-20131003/#descdef-unicode-range"
    }, {
      "name": "24 Way article",
      "href": "https://24ways.org/2011/creating-custom-font-stacks-with-unicode-range"
    }]
  }
  !*/
Modernizr.addTest("unicoderange",(function(){return testStyles('@font-face{font-family:"unicodeRange";src:local("Arial");unicode-range:U+0020,U+002E}#modernizr span{font-size:20px;display:inline-block;font-family:"unicodeRange",monospace}#modernizr .mono{font-family:monospace}',(function(e){for(var A=[".",".","m","m"],t=0;t<A.length;t++){var r=createElement("span");r.innerHTML=A[t],r.className=t%2?"mono":"",e.appendChild(r),A[t]=r.clientWidth}return A[0]!==A[1]&&A[2]===A[3]}))}));
/*!
  {
    "name": "Blob URLs",
    "property": "bloburls",
    "caniuse": "bloburls",
    "notes": [{
      "name": "W3C Working Draft Spec",
      "href": "https://www.w3.org/TR/FileAPI/#creating-revoking"
    }],
    "tags": ["file", "url"],
    "authors": ["Ron Waldon (@jokeyrhyme)"]
  }
  !*/
var url=prefixed("URL",window,!1);url=url&&window[url],Modernizr.addTest("bloburls",url&&"revokeObjectURL"in url&&"createObjectURL"in url),
/*!
  {
    "name": "Data URI",
    "property": "datauri",
    "caniuse": "datauri",
    "tags": ["url"],
    "builderAliases": ["url_data_uri"],
    "async": true,
    "notes": [{
      "name": "Wikipedia article",
      "href": "https://en.wikipedia.org/wiki/Data_URI_scheme"
    }],
    "warnings": ["Support in Internet Explorer 8 is limited to images and linked resources like CSS files, not HTML files"]
  }
  !*/
Modernizr.addAsyncTest((function(){-1!==navigator.userAgent.indexOf("MSIE 7.")&&setTimeout((function(){Modernizr.addTest("datauri",new Boolean(!1))}),10);var e=new Image;e.onerror=function(){Modernizr.addTest("datauri",new Boolean(!1))},e.onload=function(){1===e.width&&1===e.height?function(){var e=new Image;e.onerror=function(){Modernizr.addTest("datauri",new Boolean(!0)),Modernizr.addTest("datauri.over32kb",!1)},e.onload=function(){Modernizr.addTest("datauri",new Boolean(!0)),Modernizr.addTest("datauri.over32kb",1===e.width&&1===e.height)};for(var A="R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";A.length<33e3;)A="\r\n"+A;e.src="data:image/gif;base64,"+A}():Modernizr.addTest("datauri",new Boolean(!1))},e.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="})),
/*!
  {
    "name": "URL parser",
    "property": "urlparser",
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://url.spec.whatwg.org/"
    }],
    "polyfills": ["urlparser"],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "tags": ["url"]
  }
  !*/
Modernizr.addTest("urlparser",(function(){try{return"http://modernizr.com/"===new URL("http://modernizr.com/").href}catch(e){return!1}})),
/*!
  {
    "property": "urlsearchparams",
    "caniuse": "urlsearchparams",
    "tags": ["querystring", "url"],
    "authors": ["Cătălin Mariș"],
    "name": "URLSearchParams API",
    "notes": [{
      "name": "WHATWG Spec",
      "href": "https://url.spec.whatwg.org/#interface-urlsearchparams"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams"
    }]
  }
  !*/
Modernizr.addTest("urlsearchparams","URLSearchParams"in window),
/*!
  {
    "name": "IE User Data API",
    "property": "userdata",
    "tags": ["storage"],
    "authors": ["@stereobooster"],
    "notes": [{
      "name": "MSDN Documentation",
      "href": "https://msdn.microsoft.com/en-us/library/ms531424.aspx"
    }]
  }
  !*/
Modernizr.addTest("userdata",!!createElement("div").addBehavior),
/*!
  {
    "name": "Vibration API",
    "property": "vibrate",
    "caniuse": "vibration",
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/DOM/window.navigator.mozVibrate"
    }, {
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/vibration/"
    }]
  }
  !*/
Modernizr.addTest("vibrate",!!prefixed("vibrate",navigator)),
/*!
  {
    "name": "HTML5 Video",
    "property": "video",
    "caniuse": "video",
    "tags": ["html5", "video", "media"],
    "knownBugs": ["Without QuickTime, `Modernizr.video.h264` will be `undefined`; https://github.com/Modernizr/Modernizr/issues/546"],
    "polyfills": [
      "html5media",
      "mediaelementjs",
      "sublimevideo",
      "videojs",
      "leanbackplayer",
      "videoforeverybody"
    ]
  }
  !*/
function(){var e=createElement("video");Modernizr.addTest("video",(function(){var A=!1;try{(A=!!e.canPlayType)&&(A=new Boolean(A))}catch(e){}return A}));try{e.canPlayType&&(Modernizr.addTest("video.ogg",e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,"")),Modernizr.addTest("video.h264",e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,"")),Modernizr.addTest("video.h265",e.canPlayType('video/mp4; codecs="hev1"').replace(/^no$/,"")),Modernizr.addTest("video.webm",e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")),Modernizr.addTest("video.vp9",e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,"")),Modernizr.addTest("video.hls",e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,"")),Modernizr.addTest("video.av1",e.canPlayType('video/mp4; codecs="av01"').replace(/^no$/,"")))}catch(e){}}(),
/*!
  {
    "name": "Video Autoplay",
    "property": "videoautoplay",
    "tags": ["video"],
    "async": true,
    "warnings": ["This test is very large – only include it if you absolutely need it"],
    "knownBugs": ["crashes with an alert on iOS7 when added to homescreen"]
  }
  !*/
Modernizr.addAsyncTest((function(){var e,A=0,t=createElement("video"),r=t.style;function n(r){A++,clearTimeout(e);var o=r&&"playing"===r.type||0!==t.currentTime;!o&&A<5?e=setTimeout(n,200):(t.removeEventListener("playing",n,!1),addTest("videoautoplay",o),t.parentNode&&t.parentNode.removeChild(t))}if(Modernizr.video&&"autoplay"in t){r.position="absolute",r.height=0,r.width=0;try{if(Modernizr.video.ogg)t.src="data:video/ogg;base64,T2dnUwACAAAAAAAAAABmnCATAAAAAHDEixYBKoB0aGVvcmEDAgEAAQABAAAQAAAQAAAAAAAFAAAAAQAAAAAAAAAAAGIAYE9nZ1MAAAAAAAAAAAAAZpwgEwEAAAACrA7TDlj///////////////+QgXRoZW9yYSsAAABYaXBoLk9yZyBsaWJ0aGVvcmEgMS4xIDIwMDkwODIyIChUaHVzbmVsZGEpAQAAABoAAABFTkNPREVSPWZmbXBlZzJ0aGVvcmEtMC4yOYJ0aGVvcmG+zSj3uc1rGLWpSUoQc5zmMYxSlKQhCDGMYhCEIQhAAAAAAAAAAAAAEW2uU2eSyPxWEvx4OVts5ir1aKtUKBMpJFoQ/nk5m41mUwl4slUpk4kkghkIfDwdjgajQYC8VioUCQRiIQh8PBwMhgLBQIg4FRba5TZ5LI/FYS/Hg5W2zmKvVoq1QoEykkWhD+eTmbjWZTCXiyVSmTiSSCGQh8PB2OBqNBgLxWKhQJBGIhCHw8HAyGAsFAiDgUCw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDAwPEhQUFQ0NDhESFRUUDg4PEhQVFRUOEBETFBUVFRARFBUVFRUVEhMUFRUVFRUUFRUVFRUVFRUVFRUVFRUVEAwLEBQZGxwNDQ4SFRwcGw4NEBQZHBwcDhATFhsdHRwRExkcHB4eHRQYGxwdHh4dGxwdHR4eHh4dHR0dHh4eHRALChAYKDM9DAwOExo6PDcODRAYKDlFOA4RFh0zV1A+EhYlOkRtZ00YIzdAUWhxXDFATldneXhlSFxfYnBkZ2MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEhIVGRoaGhoSFBYaGhoaGhUWGRoaGhoaGRoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhESFh8kJCQkEhQYIiQkJCQWGCEkJCQkJB8iJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQREhgvY2NjYxIVGkJjY2NjGBo4Y2NjY2MvQmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRISEhUXGBkbEhIVFxgZGxwSFRcYGRscHRUXGBkbHB0dFxgZGxwdHR0YGRscHR0dHhkbHB0dHR4eGxwdHR0eHh4REREUFxocIBERFBcaHCAiERQXGhwgIiUUFxocICIlJRcaHCAiJSUlGhwgIiUlJSkcICIlJSUpKiAiJSUlKSoqEBAQFBgcICgQEBQYHCAoMBAUGBwgKDBAFBgcICgwQEAYHCAoMEBAQBwgKDBAQEBgICgwQEBAYIAoMEBAQGCAgAfF5cdH1e3Ow/L66wGmYnfIUbwdUTe3LMRbqON8B+5RJEvcGxkvrVUjTMrsXYhAnIwe0dTJfOYbWrDYyqUrz7dw/JO4hpmV2LsQQvkUeGq1BsZLx+cu5iV0e0eScJ91VIQYrmqfdVSK7GgjOU0oPaPOu5IcDK1mNvnD+K8LwS87f8Jx2mHtHnUkTGAurWZlNQa74ZLSFH9oF6FPGxzLsjQO5Qe0edcpttd7BXBSqMCL4k/4tFrHIPuEQ7m1/uIWkbDMWVoDdOSuRQ9286kvVUlQjzOE6VrNguN4oRXYGkgcnih7t13/9kxvLYKQezwLTrO44sVmMPgMqORo1E0sm1/9SludkcWHwfJwTSybR4LeAz6ugWVgRaY8mV/9SluQmtHrzsBtRF/wPY+X0JuYTs+ltgrXAmlk10xQHmTu9VSIAk1+vcvU4ml2oNzrNhEtQ3CysNP8UeR35wqpKUBdGdZMSjX4WVi8nJpdpHnbhzEIdx7mwf6W1FKAiucMXrWUWVjyRf23chNtR9mIzDoT/6ZLYailAjhFlZuvPtSeZ+2oREubDoWmT3TguY+JHPdRVSLKxfKH3vgNqJ/9emeEYikGXDFNzaLjvTeGAL61mogOoeG3y6oU4rW55ydoj0lUTSR/mmRhPmF86uwIfzp3FtiufQCmppaHDlGE0r2iTzXIw3zBq5hvaTldjG4CPb9wdxAme0SyedVKczJ9AtYbgPOzYKJvZZImsN7ecrxWZg5dR6ZLj/j4qpWsIA+vYwE+Tca9ounMIsrXMB4Stiib2SPQtZv+FVIpfEbzv8ncZoLBXc3YBqTG1HsskTTotZOYTG+oVUjLk6zhP8bg4RhMUNtfZdO7FdpBuXzhJ5Fh8IKlJG7wtD9ik8rWOJxy6iQ3NwzBpQ219mlyv+FLicYs2iJGSE0u2txzed++D61ZWCiHD/cZdQVCqkO2gJpdpNaObhnDfAPrT89RxdWFZ5hO3MseBSIlANppdZNIV/Rwe5eLTDvkfWKzFnH+QJ7m9QWV1KdwnuIwTNtZdJMoXBf74OhRnh2t+OTGL+AVUnIkyYY+QG7g9itHXyF3OIygG2s2kud679ZWKqSFa9n3IHD6MeLv1lZ0XyduRhiDRtrNnKoyiFVLcBm0ba5Yy3fQkDh4XsFE34isVpOzpa9nR8iCpS4HoxG2rJpnRhf3YboVa1PcRouh5LIJv/uQcPNd095ickTaiGBnWLKVWRc0OnYTSyex/n2FofEPnDG8y3PztHrzOLK1xo6RAml2k9owKajOC0Wr4D5x+3nA0UEhK2m198wuBHF3zlWWVKWLN1CHzLClUfuoYBcx4b1llpeBKmbayaR58njtE9onD66lUcsg0Spm2snsb+8HaJRn4dYcLbCuBuYwziB8/5U1C1DOOz2gZjSZtrLJk6vrLF3hwY4Io9xuT/ruUFRSBkNtUzTOWhjh26irLEPx4jPZL3Fo3QrReoGTTM21xYTT9oFdhTUIvjqTkfkvt0bzgVUjq/hOYY8j60IaO/0AzRBtqkTS6R5ellZd5uKdzzhb8BFlDdAcrwkE0rbXTOPB+7Y0FlZO96qFL4Ykg21StJs8qIW7h16H5hGiv8V2Cflau7QVDepTAHa6Lgt6feiEvJDM21StJsmOH/hynURrKxvUpQ8BH0JF7BiyG2qZpnL/7AOU66gt+reLEXY8pVOCQvSsBtqZTNM8bk9ohRcwD18o/WVkbvrceVKRb9I59IEKysjBeTMmmbA21xu/6iHadLRxuIzkLpi8wZYmmbbWi32RVAUjruxWlJ//iFxE38FI9hNKOoCdhwf5fDe4xZ81lgREhK2m1j78vW1CqkuMu/AjBNK210kzRUX/B+69cMMUG5bYrIeZxVSEZISmkzbXOi9yxwIfPgdsov7R71xuJ7rFcACjG/9PzApqFq7wEgzNJm2suWESPuwrQvejj7cbnQxMkxpm21lUYJL0fKmogPPqywn7e3FvB/FCNxPJ85iVUkCE9/tLKx31G4CgNtWTTPFhMvlu8G4/TrgaZttTChljfNJGgOT2X6EqpETy2tYd9cCBI4lIXJ1/3uVUllZEJz4baqGF64yxaZ+zPLYwde8Uqn1oKANtUrSaTOPHkhvuQP3bBlEJ/LFe4pqQOHUI8T8q7AXx3fLVBgSCVpMba55YxN3rv8U1Dv51bAPSOLlZWebkL8vSMGI21lJmmeVxPRwFlZF1CpqCN8uLwymaZyjbXHCRytogPN3o/n74CNykfT+qqRv5AQlHcRxYrC5KvGmbbUwmZY/29BvF6C1/93x4WVglXDLFpmbapmF89HKTogRwqqSlGbu+oiAkcWFbklC6Zhf+NtTLFpn8oWz+HsNRVSgIxZWON+yVyJlE5tq/+GWLTMutYX9ekTySEQPLVNQQ3OfycwJBM0zNtZcse7CvcKI0V/zh16Dr9OSA21MpmmcrHC+6pTAPHPwoit3LHHqs7jhFNRD6W8+EBGoSEoaZttTCZljfduH/fFisn+dRBGAZYtMzbVMwvul/T/crK1NQh8gN0SRRa9cOux6clC0/mDLFpmbarmF8/e6CopeOLCNW6S/IUUg3jJIYiAcDoMcGeRbOvuTPjXR/tyo79LK3kqqkbxkkMRAOB0GODPItnX3Jnxro/25Ud+llbyVVSN4ySGIgHA6DHBnkWzr7kz410f7cqO/Syt5KqpFVJwn6gBEvBM0zNtZcpGOEPiysW8vvRd2R0f7gtjhqUvXL+gWVwHm4XJDBiMpmmZtrLfPwd/IugP5+fKVSysH1EXreFAcEhelGmbbUmZY4Xdo1vQWVnK19P4RuEnbf0gQnR+lDCZlivNM22t1ESmopPIgfT0duOfQrsjgG4tPxli0zJmF5trdL1JDUIUT1ZXSqQDeR4B8mX3TrRro/2McGeUvLtwo6jIEKMkCUXWsLyZROd9P/rFYNtXPBli0z398iVUlVKAjFlY437JXImUTm2r/4ZYtMy61hf16RPJIU9nZ1MABAwAAAAAAAAAZpwgEwIAAABhp658BScAAAAAAADnUFBQXIDGXLhwtttNHDhw5OcpQRMETBEwRPduylKVB0HRdF0A";else{if(!Modernizr.video.h264)return void addTest("videoautoplay",!1);t.src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ=="}}catch(e){return void addTest("videoautoplay",!1)}t.setAttribute("autoplay",""),r.cssText="display:none",docElement.appendChild(t),setTimeout((function(){t.addEventListener("playing",n,!1),e=setTimeout(n,200)}),0)}else addTest("videoautoplay",!1)})),
/*!
  {
    "name": "Video crossOrigin",
    "property": "videocrossorigin",
    "caniuse": "cors",
    "authors": ["Florian Mailliet"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes"
    }]
  }
  !*/
Modernizr.addTest("videocrossorigin","crossOrigin"in createElement("video")),
/*!
  {
    "name": "Video Loop Attribute",
    "property": "videoloop",
    "tags": ["video", "media"]
  }
  !*/
Modernizr.addTest("videoloop","loop"in createElement("video")),
/*!
  {
    "name": "Video Preload Attribute",
    "property": "videopreload",
    "tags": ["video", "media"]
  }
  !*/
Modernizr.addTest("videopreload","preload"in createElement("video")),
/*!
  {
    "name": "VML",
    "property": "vml",
    "tags": ["vml"],
    "authors": ["Craig Andrews (@candrews)"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/NOTE-VML"
    }, {
      "name": "MSDN Documentation",
      "href": "https://docs.microsoft.com/en-us/windows/desktop/VML/msdn-online-vml-introduction"
    }]
  }
  !*/
Modernizr.addTest("vml",(function(){var e,A=createElement("div"),t=!1;return isSVG||(A.innerHTML='<v:shape id="vml_flag1" adj="1" />',"style"in(e=A.firstChild)&&(e.style.behavior="url(#default#VML)"),t=!e||"object"===_typeof(e.adj)),t})),
/*!
  {
    "name": "Web Intents",
    "property": "webintents",
    "authors": ["Eric Bidelman"],
    "notes": [{
      "name": "Web Intents project site",
      "href": "http://www.webintents.org/"
    }],
    "polyfills": ["webintents"],
    "builderAliases": ["web_intents"]
  }
  !*/
Modernizr.addTest("webintents",!!prefixed("startActivity",navigator)),
/*!
  {
    "name": "Web Animation API",
    "property": "webanimations",
    "caniuse": "web-animation",
    "tags": ["webanimations"],
    "polyfills": ["webanimationsjs"],
    "notes": [{
      "name": "Introducing Web Animations",
      "href": "https://birtles.wordpress.com/2013/06/26/introducing-web-animations/"
    }]
  }
  !*/
Modernizr.addTest("webanimations","animate"in createElement("div")),
/*!
  {
    "name": "PublicKeyCredential",
    "notes": [
      {
        "name": "MDN Documentation",
        "href": "https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential"
      },
      {
        "name": "Google Developers solution",
        "href": "https://developers.google.com/web/updates/2018/03/webauthn-credential-management#the_solution"
      }
    ],
    "property": "publickeycredential",
    "tags": ["webauthn", "web authentication"],
    "authors": ["Eric Delia"]
  }
  !*/
Modernizr.addTest("publicKeyCredential",(function(){return!!window.PublicKeyCredential})),
/*!
  {
    "name": "WebGL",
    "property": "webgl",
    "caniuse": "webgl",
    "tags": ["webgl", "graphics"],
    "polyfills": ["jebgl", "cwebgl", "iewebgl"]
  }
  !*/
Modernizr.addTest("webgl",(function(){return"WebGLRenderingContext"in window})),
/*!
  {
    "name": "WebGL Extensions",
    "property": "webglextensions",
    "tags": ["webgl", "graphics"],
    "builderAliases": ["webgl_extensions"],
    "async": true,
    "authors": ["Ilmari Heikkinen"],
    "notes": [{
      "name": "Kronos extensions registry",
      "href": "https://www.khronos.org/registry/webgl/extensions/"
    }]
  }
  !*/
Modernizr.addAsyncTest((function(){if(Modernizr.webglextensions=!1,Modernizr.webgl){var e,A,t;try{t=(A=(e=createElement("canvas")).getContext("webgl")||e.getContext("experimental-webgl")).getSupportedExtensions()}catch(e){return}A!==undefined&&(Modernizr.webglextensions=new Boolean(!0));for(var r=-1,n=t.length;++r<n;)Modernizr.webglextensions[t[r]]=!0;e=undefined}})),
/*!
  {
    "name": "RTC Peer Connection",
    "property": "peerconnection",
    "caniuse": "rtcpeerconnection",
    "tags": ["webrtc"],
    "authors": ["Ankur Oberoi"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/webrtc/"
    }]
  }
  !*/
Modernizr.addTest("peerconnection",!!prefixed("RTCPeerConnection",window)),
/*!
  {
    "name": "RTC Data Channel",
    "property": "datachannel",
    "notes": [{
      "name": "HTML5 Rocks Tutorial",
      "href": "https://www.html5rocks.com/en/tutorials/webrtc/datachannels/"
    }]
  }
  !*/
Modernizr.addTest("datachannel",(function(){if(!Modernizr.peerconnection)return!1;for(var e=0,A=domPrefixesAll.length;e<A;e++){var t=window[domPrefixesAll[e]+"RTCPeerConnection"];if(t){var r=new t(null);return r.close(),"createDataChannel"in r}}return!1})),
/*!
  {
    "name": "getUserMedia",
    "property": "getusermedia",
    "caniuse": "stream",
    "tags": ["webrtc"],
    "authors": ["Eric Bidelman", "Masataka Yakura"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://w3c.github.io/mediacapture-main/#dom-mediadevices-getusermedia"
    }]
  }
  !*/
Modernizr.addTest("getUserMedia","mediaDevices"in navigator&&"getUserMedia"in navigator.mediaDevices);
/*!
  {
    "name": "WebSockets Support",
    "property": "websockets",
    "authors": ["Phread (@fearphage)", "Mike Sherov (@mikesherov)", "Burak Yigit Kaya (@BYK)"],
    "caniuse": "websockets",
    "tags": ["html5"],
    "warnings": [
      "This test will reject any old version of WebSockets even if it is not prefixed such as in Safari 5.1"
    ],
    "notes": [{
      "name": "CLOSING State and Spec",
      "href": "https://www.w3.org/TR/websockets/#the-websocket-interface"
    }],
    "polyfills": [
      "sockjs",
      "socketio",
      "kaazing-websocket-gateway",
      "websocketjs",
      "atmosphere",
      "graceful-websocket",
      "portal",
      "datachannel"
    ]
  }
  !*/
var supports=!1;try{supports="WebSocket"in window&&2===window.WebSocket.CLOSING}catch(e){}Modernizr.addTest("websockets",supports),
/*!
  {
    "name": "Binary WebSockets",
    "property": "websocketsbinary",
    "tags": ["websockets"],
    "builderAliases": ["websockets_binary"]
  }
  !*/
Modernizr.addTest("websocketsbinary",(function(){var e,A="https:"===location.protocol?"wss":"ws";if("WebSocket"in window){if(e="binaryType"in WebSocket.prototype)return e;try{return!!new WebSocket(A+"://.").binaryType}catch(e){}}return!1})),
/*!
  {
    "name": "Base 64 encoding/decoding",
    "property": "atobbtoa",
    "builderAliases": ["atob-btoa"],
    "caniuse": "atob-btoa",
    "tags": ["atob", "base64", "WindowBase64", "btoa"],
    "authors": ["Christian Ulbrich"],
    "notes": [{
      "name": "WindowBase64",
      "href": "https://www.w3.org/TR/html5/webappapis.html#windowbase64"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob"
    }],
    "polyfills": ["base64js"]
  }
  !*/
Modernizr.addTest("atobbtoa","atob"in window&&"btoa"in window,{aliases:["atob-btoa"]}),
/*!
  {
    "name": "Framed window",
    "property": "framed",
    "tags": ["window"],
    "builderAliases": ["window_framed"]
  }
  !*/
Modernizr.addTest("framed",window.location!==top.location),
/*!
  {
    "name": "matchMedia",
    "property": "matchmedia",
    "caniuse": "matchmedia",
    "tags": ["matchmedia"],
    "authors": ["Alberto Elias"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://drafts.csswg.org/cssom-view/#the-mediaquerylist-interface"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/Window.matchMedia"
    }],
    "polyfills": ["matchmediajs"]
  }
  !*/
Modernizr.addTest("matchmedia",!!prefixed("matchMedia",window)),
/*!
  {
    "name": "Workers from Blob URIs",
    "property": "blobworkers",
    "tags": ["performance", "workers"],
    "builderAliases": ["workers_blobworkers"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/workers/"
    }],
    "knownBugs": ["This test may output garbage to console."],
    "authors": ["Jussi Kalliokoski"],
    "async": true
  }
  !*/
Modernizr.addAsyncTest((function(){try{var e=window.BlobBuilder,A=window.URL;Modernizr._config.usePrefix&&(e=e||window.MozBlobBuilder||window.WebKitBlobBuilder||window.MSBlobBuilder||window.OBlobBuilder,A=A||window.MozURL||window.webkitURL||window.MSURL||window.OURL);var t,r,n,o,i,a="this.onmessage=function(e){postMessage(e.data)}";try{t=new Blob([a],{type:"text/javascript"})}catch(e){}t||((r=new e).append(a),t=r.getBlob()),o=A.createObjectURL(t),(n=new Worker(o)).onmessage=function(e){addTest("blobworkers","Modernizr"===e.data),s()},n.onerror=d,i=setTimeout(d,200),n.postMessage("Modernizr")}catch(e){d()}function d(){addTest("blobworkers",!1),s()}function s(){o&&A.revokeObjectURL(o),n&&n.terminate(),i&&clearTimeout(i)}})),
/*!
  {
    "name": "Workers from Data URIs",
    "property": "dataworkers",
    "tags": ["performance", "workers"],
    "builderAliases": ["workers_dataworkers"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/workers/"
    }],
    "knownBugs": ["This test may output garbage to console."],
    "authors": ["Jussi Kalliokoski"],
    "async": true
  }
  !*/
Modernizr.addAsyncTest((function(){try{var e=new Worker("data:text/javascript;base64,dGhpcy5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7cG9zdE1lc3NhZ2UoZS5kYXRhKX0=");e.onmessage=function(A){e.terminate(),addTest("dataworkers","Modernizr"===A.data),e=null},e.onerror=function(){addTest("dataworkers",!1),e=null},setTimeout((function(){addTest("dataworkers",!1)}),200),e.postMessage("Modernizr")}catch(e){setTimeout((function(){addTest("dataworkers",!1)}),0)}})),
/*!
  {
    "name": "Shared Workers",
    "property": "sharedworkers",
    "caniuse": "sharedworkers",
    "tags": ["performance", "workers"],
    "builderAliases": ["workers_sharedworkers"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/workers/"
    }]
  }
  !*/
Modernizr.addTest("sharedworkers","SharedWorker"in window),
/*!
  {
    "name": "Web Workers",
    "property": "webworkers",
    "caniuse": "webworkers",
    "tags": ["performance", "workers"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/workers/"
    }, {
      "name": "HTML5 Rocks Tutorial",
      "href": "https://www.html5rocks.com/en/tutorials/workers/basics/"
    }, {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers"
    }],
    "polyfills": ["fakeworker", "html5shims"]
  }
  !*/
Modernizr.addTest("webworkers","Worker"in window),
/*!
  {
    "name": "Transferables Objects",
    "property": "transferables",
    "tags": ["performance", "workers"],
    "builderAliases": ["transferables"],
    "notes": [{
      "name": "Transferable Objects: Lightning Fast!",
      "href": "https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast"
    }],
    "async": true
  }
  !*/
Modernizr.addAsyncTest((function(){if(!(Modernizr.blobconstructor&&Modernizr.bloburls&&Modernizr.webworkers&&Modernizr.typedarrays))return addTest("transferables",!1);try{var e,A,t=new Blob(['var hello = "world"'],{type:"text/javascript"}),r=URL.createObjectURL(t),n=new Worker(r);n.onerror=o,A=setTimeout(o,200),e=new ArrayBuffer(1),n.postMessage(e,[e]),addTest("transferables",0===e.byteLength),i()}catch(e){o()}function o(){addTest("transferables",!1),i()}function i(){r&&URL.revokeObjectURL(r),n&&n.terminate(),A&&clearTimeout(A)}})),
/*!
  {
    "name": "XDomainRequest",
    "property": "xdomainrequest",
    "tags": ["cors", "xdomainrequest", "ie9", "ie8"],
    "authors": ["Ivan Pan (@hypotenuse)"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest"
    }]
  }
  !*/
Modernizr.addTest("xdomainrequest","XDomainRequest"in window),testRunner(),setClasses(classes),delete ModernizrProto.addTest,delete ModernizrProto.addAsyncTest;for(var i=0;i<Modernizr._q.length;i++)Modernizr._q[i]();scriptGlobalObject.Modernizr=Modernizr}(window,window,document)}).call(this,__webpack_require__(8)(module))},function(e,A){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}}]);