(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();var hM=`varying vec3 fragPosition;
uniform vec3 lightPosition;
varying vec3 vPosition;
varying vec3 vColor;

vec3 getNormal ( vec3 position ) {
    vec3 dx = dFdx( position );
    vec3 dy = dFdy( position );
    return normalize( cross(dx, dy) );
}

void main() {
    vec3 normal = getNormal( vPosition );

    vec3 lightDir = normalize(lightPosition - fragPosition);
    float diff = max(dot(normal, lightDir), 0.0);

    vec3 diffuseColor = vec3(1.0, 1.0, 1.0) * diff;

    gl_FragColor = vec4(diffuseColor * vColor.rgb, 1.0);
}`,fM=`attribute float pixelH;
uniform float uValue;
uniform float uTime;
uniform float index;

varying vec3 vPosition;
varying vec3 fragPosition;
varying vec3 vColor;
attribute vec3 color;

void main() {
    vColor = color;

    vec3 pos = position;
    pos.y += pixelH * uValue;

    vPosition = pos;

    fragPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`,Ii=Object.freeze({Linear:Object.freeze({None:function(r){return r},In:function(r){return this.None(r)},Out:function(r){return this.None(r)},InOut:function(r){return this.None(r)}}),Quadratic:Object.freeze({In:function(r){return r*r},Out:function(r){return r*(2-r)},InOut:function(r){return(r*=2)<1?.5*r*r:-.5*(--r*(r-2)-1)}}),Cubic:Object.freeze({In:function(r){return r*r*r},Out:function(r){return--r*r*r+1},InOut:function(r){return(r*=2)<1?.5*r*r*r:.5*((r-=2)*r*r+2)}}),Quartic:Object.freeze({In:function(r){return r*r*r*r},Out:function(r){return 1- --r*r*r*r},InOut:function(r){return(r*=2)<1?.5*r*r*r*r:-.5*((r-=2)*r*r*r-2)}}),Quintic:Object.freeze({In:function(r){return r*r*r*r*r},Out:function(r){return--r*r*r*r*r+1},InOut:function(r){return(r*=2)<1?.5*r*r*r*r*r:.5*((r-=2)*r*r*r*r+2)}}),Sinusoidal:Object.freeze({In:function(r){return 1-Math.sin((1-r)*Math.PI/2)},Out:function(r){return Math.sin(r*Math.PI/2)},InOut:function(r){return .5*(1-Math.sin(Math.PI*(.5-r)))}}),Exponential:Object.freeze({In:function(r){return r===0?0:Math.pow(1024,r-1)},Out:function(r){return r===1?1:1-Math.pow(2,-10*r)},InOut:function(r){return r===0?0:r===1?1:(r*=2)<1?.5*Math.pow(1024,r-1):.5*(-Math.pow(2,-10*(r-1))+2)}}),Circular:Object.freeze({In:function(r){return 1-Math.sqrt(1-r*r)},Out:function(r){return Math.sqrt(1- --r*r)},InOut:function(r){return(r*=2)<1?-.5*(Math.sqrt(1-r*r)-1):.5*(Math.sqrt(1-(r-=2)*r)+1)}}),Elastic:Object.freeze({In:function(r){return r===0?0:r===1?1:-Math.pow(2,10*(r-1))*Math.sin((r-1.1)*5*Math.PI)},Out:function(r){return r===0?0:r===1?1:Math.pow(2,-10*r)*Math.sin((r-.1)*5*Math.PI)+1},InOut:function(r){return r===0?0:r===1?1:(r*=2,r<1?-.5*Math.pow(2,10*(r-1))*Math.sin((r-1.1)*5*Math.PI):.5*Math.pow(2,-10*(r-1))*Math.sin((r-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(r){var e=1.70158;return r===1?1:r*r*((e+1)*r-e)},Out:function(r){var e=1.70158;return r===0?0:--r*r*((e+1)*r+e)+1},InOut:function(r){var e=2.5949095;return(r*=2)<1?.5*(r*r*((e+1)*r-e)):.5*((r-=2)*r*((e+1)*r+e)+2)}}),Bounce:Object.freeze({In:function(r){return 1-Ii.Bounce.Out(1-r)},Out:function(r){return r<1/2.75?7.5625*r*r:r<2/2.75?7.5625*(r-=1.5/2.75)*r+.75:r<2.5/2.75?7.5625*(r-=2.25/2.75)*r+.9375:7.5625*(r-=2.625/2.75)*r+.984375},InOut:function(r){return r<.5?Ii.Bounce.In(r*2)*.5:Ii.Bounce.Out(r*2-1)*.5+.5}}),generatePow:function(r){return r===void 0&&(r=4),r=r<Number.EPSILON?Number.EPSILON:r,r=r>1e4?1e4:r,{In:function(e){return Math.pow(e,r)},Out:function(e){return 1-Math.pow(1-e,r)},InOut:function(e){return e<.5?Math.pow(e*2,r)/2:(1-Math.pow(2-e*2,r))/2+.5}}}}),Ks=function(){return performance.now()},dM=function(){function r(){this._tweens={},this._tweensAddedDuringUpdate={}}return r.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},r.prototype.removeAll=function(){this._tweens={}},r.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},r.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},r.prototype.update=function(e,t){e===void 0&&(e=Ks()),t===void 0&&(t=!1);var i=Object.keys(this._tweens);if(i.length===0)return!1;for(;i.length>0;){this._tweensAddedDuringUpdate={};for(var a=0;a<i.length;a++){var o=this._tweens[i[a]],u=!t;o&&o.update(e,u)===!1&&!t&&delete this._tweens[i[a]]}i=Object.keys(this._tweensAddedDuringUpdate)}return!0},r}(),ps={Linear:function(r,e){var t=r.length-1,i=t*e,a=Math.floor(i),o=ps.Utils.Linear;return e<0?o(r[0],r[1],i):e>1?o(r[t],r[t-1],t-i):o(r[a],r[a+1>t?t:a+1],i-a)},Bezier:function(r,e){for(var t=0,i=r.length-1,a=Math.pow,o=ps.Utils.Bernstein,u=0;u<=i;u++)t+=a(1-e,i-u)*a(e,u)*r[u]*o(i,u);return t},CatmullRom:function(r,e){var t=r.length-1,i=t*e,a=Math.floor(i),o=ps.Utils.CatmullRom;return r[0]===r[t]?(e<0&&(a=Math.floor(i=t*(1+e))),o(r[(a-1+t)%t],r[a],r[(a+1)%t],r[(a+2)%t],i-a)):e<0?r[0]-(o(r[0],r[0],r[1],r[1],-i)-r[0]):e>1?r[t]-(o(r[t],r[t],r[t-1],r[t-1],i-t)-r[t]):o(r[a?a-1:0],r[a],r[t<a+1?t:a+1],r[t<a+2?t:a+2],i-a)},Utils:{Linear:function(r,e,t){return(e-r)*t+r},Bernstein:function(r,e){var t=ps.Utils.Factorial;return t(r)/t(e)/t(r-e)},Factorial:function(){var r=[1];return function(e){var t=1;if(r[e])return r[e];for(var i=e;i>1;i--)t*=i;return r[e]=t,t}}(),CatmullRom:function(r,e,t,i,a){var o=(t-r)*.5,u=(i-e)*.5,c=a*a,f=a*c;return(2*e-2*t+o+u)*f+(-3*e+3*t-2*o-u)*c+o*a+e}}},pM=function(){function r(){}return r.nextId=function(){return r._nextId++},r._nextId=0,r}(),Sc=new dM,xo=function(){function r(e,t){t===void 0&&(t=Sc),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=Ii.Linear.None,this._interpolationFunction=ps.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=pM.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return r.prototype.getId=function(){return this._id},r.prototype.isPlaying=function(){return this._isPlaying},r.prototype.isPaused=function(){return this._isPaused},r.prototype.to=function(e,t){if(t===void 0&&(t=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=t,this},r.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e,this},r.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},r.prototype.start=function(e,t){if(e===void 0&&(e=Ks()),t===void 0&&(t=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var i in this._valuesStartRepeat)this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||t){if(this._propertiesAreSetUp=!0,!this._isDynamic){var a={};for(var o in this._valuesEnd)a[o]=this._valuesEnd[o];this._valuesEnd=a}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,t)}return this},r.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},r.prototype._setupProperties=function(e,t,i,a,o){for(var u in i){var c=e[u],f=Array.isArray(c),d=f?"array":typeof c,p=!f&&Array.isArray(i[u]);if(!(d==="undefined"||d==="function")){if(p){var _=i[u];if(_.length===0)continue;for(var g=[c],M=0,T=_.length;M<T;M+=1){var A=this._handleRelativeValue(c,_[M]);if(isNaN(A)){p=!1,console.warn("Found invalid interpolation list. Skipping.");break}g.push(A)}p&&(i[u]=g)}if((d==="object"||f)&&c&&!p){t[u]=f?[]:{};var v=c;for(var m in v)t[u][m]=v[m];a[u]=f?[]:{};var _=i[u];if(!this._isDynamic){var F={};for(var m in _)F[m]=_[m];i[u]=_=F}this._setupProperties(v,t[u],_,a[u],o)}else(typeof t[u]>"u"||o)&&(t[u]=c),f||(t[u]*=1),p?a[u]=i[u].slice().reverse():a[u]=t[u]||0}}},r.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},r.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},r.prototype.pause=function(e){return e===void 0&&(e=Ks()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},r.prototype.resume=function(e){return e===void 0&&(e=Ks()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},r.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},r.prototype.group=function(e){return e===void 0&&(e=Sc),this._group=e,this},r.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},r.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},r.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},r.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},r.prototype.easing=function(e){return e===void 0&&(e=Ii.Linear.None),this._easingFunction=e,this},r.prototype.interpolation=function(e){return e===void 0&&(e=ps.Linear),this._interpolationFunction=e,this},r.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},r.prototype.onStart=function(e){return this._onStartCallback=e,this},r.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},r.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},r.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},r.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},r.prototype.onStop=function(e){return this._onStopCallback=e,this},r.prototype.update=function(e,t){if(e===void 0&&(e=Ks()),t===void 0&&(t=!0),this._isPaused)return!0;var i,a,o=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>o)return!1;t&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0),a=(e-this._startTime)/this._duration,a=this._duration===0||a>1?1:a;var u=this._easingFunction(a);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,u),this._onUpdateCallback&&this._onUpdateCallback(this._object,a),a===1)if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(i in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[i]=="string"&&(this._valuesStartRepeat[i]=this._valuesStartRepeat[i]+parseFloat(this._valuesEnd[i])),this._yoyo&&this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i];return this._yoyo&&(this._reversed=!this._reversed),this._repeatDelayTime!==void 0?this._startTime=e+this._repeatDelayTime:this._startTime=e+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var c=0,f=this._chainedTweens.length;c<f;c++)this._chainedTweens[c].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},r.prototype._updateProperties=function(e,t,i,a){for(var o in i)if(t[o]!==void 0){var u=t[o]||0,c=i[o],f=Array.isArray(e[o]),d=Array.isArray(c),p=!f&&d;p?e[o]=this._interpolationFunction(c,a):typeof c=="object"&&c?this._updateProperties(e[o],u,c,a):(c=this._handleRelativeValue(u,c),typeof c=="number"&&(e[o]=u+(c-u)*a))}},r.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},r.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],i=this._valuesEnd[e];typeof i=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(i):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},r}(),di=Sc;di.getAll.bind(di);di.removeAll.bind(di);di.add.bind(di);di.remove.bind(di);var mM=di.update.bind(di);/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class hi{constructor(e,t,i,a,o="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(a),this.$name=document.createElement("div"),this.$name.classList.add("name"),hi.nextNameID=hi.nextNameID||0,this.$name.id="lil-gui-name-"+ ++hi.nextNameID,this.$widget=document.createElement(o),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class gM extends hi{constructor(e,t,i){super(e,t,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ec(r){let e,t;return(e=r.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!t&&"#"+t}const _M={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:Ec,toHexString:Ec},ea={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},vM={isPrimitive:!1,match:Array.isArray,fromHexString(r,e,t=1){const i=ea.fromHexString(r);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(255&i)/255*t},toHexString:([r,e,t],i=1)=>ea.toHexString(r*(i=255/i)<<16^e*i<<8^t*i<<0)},xM={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,e,t=1){const i=ea.fromHexString(r);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(255&i)/255*t},toHexString:({r,g:e,b:t},i=1)=>ea.toHexString(r*(i=255/i)<<16^e*i<<8^t*i<<0)},MM=[_M,ea,vM,xM];class SM extends hi{constructor(e,t,i,a){var o;super(e,t,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(o=this.initialValue,MM.find(u=>u.match(o))),this._rgbScale=a,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const u=Ec(this.$text.value);u&&this._setValueFromHexString(u)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}let Xl=class extends hi{constructor(e,t,i){super(e,t,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",a=>{a.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}};class EM extends hi{constructor(e,t,i,a,o,u){super(e,t,i,"number"),this._initInput(),this.min(a),this.max(o);const c=u!==void 0;this.step(c?u:this._getImplicitStep(),c),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=100*t+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=p=>{const _=parseFloat(this.$input.value);isNaN(_)||(this._snapClampSetValue(_+p),this.$input.value=this.getValue())};let t,i,a,o,u,c=!1;const f=p=>{if(c){const _=p.clientX-t,g=p.clientY-i;Math.abs(g)>5?(p.preventDefault(),this.$input.blur(),c=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(_)>5&&d()}if(!c){const _=p.clientY-a;u-=_*this._step*this._arrowKeyMultiplier(p),o+u>this._max?u=this._max-o:o+u<this._min&&(u=this._min-o),this._snapClampSetValue(o+u)}a=p.clientY},d=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",d)};this.$input.addEventListener("input",()=>{let p=parseFloat(this.$input.value);isNaN(p)||(this._stepExplicit&&(p=this._snap(p)),this.setValue(this._clamp(p)))}),this.$input.addEventListener("keydown",p=>{p.code==="Enter"&&this.$input.blur(),p.code==="ArrowUp"&&(p.preventDefault(),e(this._step*this._arrowKeyMultiplier(p))),p.code==="ArrowDown"&&(p.preventDefault(),e(this._step*this._arrowKeyMultiplier(p)*-1))}),this.$input.addEventListener("wheel",p=>{this._inputFocused&&(p.preventDefault(),e(this._step*this._normalizeMouseWheel(p)))},{passive:!1}),this.$input.addEventListener("mousedown",p=>{t=p.clientX,i=a=p.clientY,c=!0,o=this.getValue(),u=0,window.addEventListener("mousemove",f),window.addEventListener("mouseup",d)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=g=>{const M=this.$slider.getBoundingClientRect();let T=(A=g,v=M.left,m=M.right,F=this._min,w=this._max,(A-v)/(m-v)*(w-F)+F);var A,v,m,F,w;this._snapClampSetValue(T)},t=g=>{e(g.clientX)},i=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",i)};let a,o,u=!1;const c=g=>{g.preventDefault(),this._setDraggingStyle(!0),e(g.touches[0].clientX),u=!1},f=g=>{if(u){const M=g.touches[0].clientX-a,T=g.touches[0].clientY-o;Math.abs(M)>Math.abs(T)?c(g):(window.removeEventListener("touchmove",f),window.removeEventListener("touchend",d))}else g.preventDefault(),e(g.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",f),window.removeEventListener("touchend",d)},p=this._callOnFinishChange.bind(this);let _;this.$slider.addEventListener("mousedown",g=>{this._setDraggingStyle(!0),e(g.clientX),window.addEventListener("mousemove",t),window.addEventListener("mouseup",i)}),this.$slider.addEventListener("touchstart",g=>{g.touches.length>1||(this._hasScrollBar?(a=g.touches[0].clientX,o=g.touches[0].clientY,u=!0):c(g),window.addEventListener("touchmove",f,{passive:!1}),window.addEventListener("touchend",d))},{passive:!1}),this.$slider.addEventListener("wheel",g=>{if(Math.abs(g.deltaX)<Math.abs(g.deltaY)&&this._hasScrollBar)return;g.preventDefault();const M=this._normalizeMouseWheel(g)*this._step;this._snapClampSetValue(this.getValue()+M),this.$input.value=this.getValue(),clearTimeout(_),_=setTimeout(p,400)},{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle("lil-gui-"+t,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class yM extends hi{constructor(e,t,i,a){super(e,t,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(a)?a:Object.values(a),this._names=Array.isArray(a)?a:Object.keys(a),this._names.forEach(o=>{const u=document.createElement("option");u.innerHTML=o,this.$select.appendChild(u)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class AM extends hi{constructor(e,t,i){super(e,t,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",a=>{a.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}let sf=!1;class Dc{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:a,title:o="Controls",injectStyles:u=!0,touchStyles:c=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",f=>{f.code!=="Enter"&&f.code!=="Space"||(f.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),c&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!sf&&u&&(function(f){const d=document.createElement("style");d.innerHTML=f;const p=document.querySelector("head link[rel=stylesheet], head style");p?document.head.insertBefore(d,p):document.head.appendChild(d)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),sf=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),a&&this.domElement.style.setProperty("--width",a+"px"),this.domElement.addEventListener("keydown",f=>f.stopPropagation()),this.domElement.addEventListener("keyup",f=>f.stopPropagation())}add(e,t,i,a,o){if(Object(i)===i)return new yM(this,e,t,i);const u=e[t];switch(typeof u){case"number":return new EM(this,e,t,i,a,o);case"boolean":return new gM(this,e,t);case"string":return new AM(this,e,t);case"function":return new Xl(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,u)}addColor(e,t,i=1){return new SM(this,e,t,i)}addFolder(e){return new Dc({parent:this,title:e})}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof Xl||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof Xl)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const i=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const a=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=a+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(t=>t.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}var Ws=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function TM(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Mo={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */Mo.exports;(function(r,e){(function(){var t,i="4.17.21",a=200,o="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",u="Expected a function",c="Invalid `variable` option passed into `_.template`",f="__lodash_hash_undefined__",d=500,p="__lodash_placeholder__",_=1,g=2,M=4,T=1,A=2,v=1,m=2,F=4,w=8,P=16,N=32,H=64,U=128,ae=256,b=512,D=30,de="...",ge=800,Z=16,ee=1,J=2,pe=3,ie=1/0,se=9007199254740991,ve=17976931348623157e292,ue=0/0,q=4294967295,Q=q-1,Re=q>>>1,Ce=[["ary",U],["bind",v],["bindKey",m],["curry",w],["curryRight",P],["flip",b],["partial",N],["partialRight",H],["rearg",ae]],Le="[object Arguments]",Oe="[object Array]",$e="[object AsyncFunction]",Fe="[object Boolean]",rt="[object Date]",Gt="[object DOMException]",Ke="[object Error]",V="[object Function]",Nt="[object GeneratorFunction]",Ue="[object Map]",We="[object Number]",Ye="[object Null]",mt="[object Object]",et="[object Promise]",Ze="[object Proxy]",st="[object RegExp]",_t="[object Set]",Rt="[object String]",C="[object Symbol]",y="[object Undefined]",Y="[object WeakMap]",xe="[object WeakSet]",fe="[object ArrayBuffer]",_e="[object DataView]",Ie="[object Float32Array]",Me="[object Float64Array]",K="[object Int8Array]",I="[object Int16Array]",ce="[object Int32Array]",Ae="[object Uint8Array]",Se="[object Uint8ClampedArray]",ye="[object Uint16Array]",Xe="[object Uint32Array]",ft=/\b__p \+= '';/g,B=/\b(__p \+=) '' \+/g,Te=/(__e\(.*?\)|\b__t\)) \+\n'';/g,j=/&(?:amp|lt|gt|quot|#39);/g,me=/[&<>"']/g,Ee=RegExp(j.source),at=RegExp(me.source),vt=/<%-([\s\S]+?)%>/g,Et=/<%([\s\S]+?)%>/g,nn=/<%=([\s\S]+?)%>/g,yt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Dn=/^\w*$/,jt=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Rr=/[\\^$.*+?()[\]{}|]/g,oa=RegExp(Rr.source),Ts=/^\s+/,Cr=/\s/,la=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,Lr=/\{\n\/\* \[wrapped with (.+)\] \*/,ca=/,? & /,Do=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,Uo=/[()=,{}\[\]\/\s]/,Io=/\\(\\)?/g,R=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,k=/\w*$/,te=/^[-+]0x[0-9a-f]+$/i,X=/^0b[01]+$/i,ne=/^\[object .+?Constructor\]$/,De=/^0o[0-7]+$/i,Be=/^(?:0|[1-9]\d*)$/,qe=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Ge=/($^)/,ot=/['\n\r\u2028\u2029\\]/g,ze="\\ud800-\\udfff",Qe="\\u0300-\\u036f",Ct="\\ufe20-\\ufe2f",Dt="\\u20d0-\\u20ff",cn=Qe+Ct+Dt,Un="\\u2700-\\u27bf",Ut="a-z\\xdf-\\xf6\\xf8-\\xff",ct="\\xac\\xb1\\xd7\\xf7",bs="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",Ft="\\u2000-\\u206f",mi=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",ws="A-Z\\xc0-\\xd6\\xd8-\\xde",Ni="\\ufe0e\\ufe0f",Pr=ct+bs+Ft+mi,Vt="['’]",gi="["+ze+"]",Dr="["+Pr+"]",$t="["+cn+"]",Ur="\\d+",No="["+Un+"]",Rs="["+Ut+"]",Vc="[^"+ze+Pr+Ur+Un+Ut+ws+"]",Fo="\\ud83c[\\udffb-\\udfff]",dp="(?:"+$t+"|"+Fo+")",kc="[^"+ze+"]",Oo="(?:\\ud83c[\\udde6-\\uddff]){2}",Bo="[\\ud800-\\udbff][\\udc00-\\udfff]",Ir="["+ws+"]",Wc="\\u200d",Xc="(?:"+Rs+"|"+Vc+")",pp="(?:"+Ir+"|"+Vc+")",Yc="(?:"+Vt+"(?:d|ll|m|re|s|t|ve))?",qc="(?:"+Vt+"(?:D|LL|M|RE|S|T|VE))?",$c=dp+"?",Kc="["+Ni+"]?",mp="(?:"+Wc+"(?:"+[kc,Oo,Bo].join("|")+")"+Kc+$c+")*",gp="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",_p="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Zc=Kc+$c+mp,vp="(?:"+[No,Oo,Bo].join("|")+")"+Zc,xp="(?:"+[kc+$t+"?",$t,Oo,Bo,gi].join("|")+")",Mp=RegExp(Vt,"g"),Sp=RegExp($t,"g"),zo=RegExp(Fo+"(?="+Fo+")|"+xp+Zc,"g"),Ep=RegExp([Ir+"?"+Rs+"+"+Yc+"(?="+[Dr,Ir,"$"].join("|")+")",pp+"+"+qc+"(?="+[Dr,Ir+Xc,"$"].join("|")+")",Ir+"?"+Xc+"+"+Yc,Ir+"+"+qc,_p,gp,Ur,vp].join("|"),"g"),yp=RegExp("["+Wc+ze+cn+Ni+"]"),Ap=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Tp=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],bp=-1,bt={};bt[Ie]=bt[Me]=bt[K]=bt[I]=bt[ce]=bt[Ae]=bt[Se]=bt[ye]=bt[Xe]=!0,bt[Le]=bt[Oe]=bt[fe]=bt[Fe]=bt[_e]=bt[rt]=bt[Ke]=bt[V]=bt[Ue]=bt[We]=bt[mt]=bt[st]=bt[_t]=bt[Rt]=bt[Y]=!1;var Tt={};Tt[Le]=Tt[Oe]=Tt[fe]=Tt[_e]=Tt[Fe]=Tt[rt]=Tt[Ie]=Tt[Me]=Tt[K]=Tt[I]=Tt[ce]=Tt[Ue]=Tt[We]=Tt[mt]=Tt[st]=Tt[_t]=Tt[Rt]=Tt[C]=Tt[Ae]=Tt[Se]=Tt[ye]=Tt[Xe]=!0,Tt[Ke]=Tt[V]=Tt[Y]=!1;var wp={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},Rp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Cp={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},Lp={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Pp=parseFloat,Dp=parseInt,jc=typeof Ws=="object"&&Ws&&Ws.Object===Object&&Ws,Up=typeof self=="object"&&self&&self.Object===Object&&self,Jt=jc||Up||Function("return this")(),Ho=e&&!e.nodeType&&e,rr=Ho&&!0&&r&&!r.nodeType&&r,Jc=rr&&rr.exports===Ho,Go=Jc&&jc.process,In=function(){try{var z=rr&&rr.require&&rr.require("util").types;return z||Go&&Go.binding&&Go.binding("util")}catch{}}(),Qc=In&&In.isArrayBuffer,eu=In&&In.isDate,tu=In&&In.isMap,nu=In&&In.isRegExp,iu=In&&In.isSet,ru=In&&In.isTypedArray;function Sn(z,re,$){switch($.length){case 0:return z.call(re);case 1:return z.call(re,$[0]);case 2:return z.call(re,$[0],$[1]);case 3:return z.call(re,$[0],$[1],$[2])}return z.apply(re,$)}function Ip(z,re,$,Pe){for(var je=-1,xt=z==null?0:z.length;++je<xt;){var kt=z[je];re(Pe,kt,$(kt),z)}return Pe}function Nn(z,re){for(var $=-1,Pe=z==null?0:z.length;++$<Pe&&re(z[$],$,z)!==!1;);return z}function Np(z,re){for(var $=z==null?0:z.length;$--&&re(z[$],$,z)!==!1;);return z}function su(z,re){for(var $=-1,Pe=z==null?0:z.length;++$<Pe;)if(!re(z[$],$,z))return!1;return!0}function Fi(z,re){for(var $=-1,Pe=z==null?0:z.length,je=0,xt=[];++$<Pe;){var kt=z[$];re(kt,$,z)&&(xt[je++]=kt)}return xt}function ua(z,re){var $=z==null?0:z.length;return!!$&&Nr(z,re,0)>-1}function Vo(z,re,$){for(var Pe=-1,je=z==null?0:z.length;++Pe<je;)if($(re,z[Pe]))return!0;return!1}function Lt(z,re){for(var $=-1,Pe=z==null?0:z.length,je=Array(Pe);++$<Pe;)je[$]=re(z[$],$,z);return je}function Oi(z,re){for(var $=-1,Pe=re.length,je=z.length;++$<Pe;)z[je+$]=re[$];return z}function ko(z,re,$,Pe){var je=-1,xt=z==null?0:z.length;for(Pe&&xt&&($=z[++je]);++je<xt;)$=re($,z[je],je,z);return $}function Fp(z,re,$,Pe){var je=z==null?0:z.length;for(Pe&&je&&($=z[--je]);je--;)$=re($,z[je],je,z);return $}function Wo(z,re){for(var $=-1,Pe=z==null?0:z.length;++$<Pe;)if(re(z[$],$,z))return!0;return!1}var Op=Xo("length");function Bp(z){return z.split("")}function zp(z){return z.match(Do)||[]}function au(z,re,$){var Pe;return $(z,function(je,xt,kt){if(re(je,xt,kt))return Pe=xt,!1}),Pe}function ha(z,re,$,Pe){for(var je=z.length,xt=$+(Pe?1:-1);Pe?xt--:++xt<je;)if(re(z[xt],xt,z))return xt;return-1}function Nr(z,re,$){return re===re?jp(z,re,$):ha(z,ou,$)}function Hp(z,re,$,Pe){for(var je=$-1,xt=z.length;++je<xt;)if(Pe(z[je],re))return je;return-1}function ou(z){return z!==z}function lu(z,re){var $=z==null?0:z.length;return $?qo(z,re)/$:ue}function Xo(z){return function(re){return re==null?t:re[z]}}function Yo(z){return function(re){return z==null?t:z[re]}}function cu(z,re,$,Pe,je){return je(z,function(xt,kt,At){$=Pe?(Pe=!1,xt):re($,xt,kt,At)}),$}function Gp(z,re){var $=z.length;for(z.sort(re);$--;)z[$]=z[$].value;return z}function qo(z,re){for(var $,Pe=-1,je=z.length;++Pe<je;){var xt=re(z[Pe]);xt!==t&&($=$===t?xt:$+xt)}return $}function $o(z,re){for(var $=-1,Pe=Array(z);++$<z;)Pe[$]=re($);return Pe}function Vp(z,re){return Lt(re,function($){return[$,z[$]]})}function uu(z){return z&&z.slice(0,pu(z)+1).replace(Ts,"")}function En(z){return function(re){return z(re)}}function Ko(z,re){return Lt(re,function($){return z[$]})}function Cs(z,re){return z.has(re)}function hu(z,re){for(var $=-1,Pe=z.length;++$<Pe&&Nr(re,z[$],0)>-1;);return $}function fu(z,re){for(var $=z.length;$--&&Nr(re,z[$],0)>-1;);return $}function kp(z,re){for(var $=z.length,Pe=0;$--;)z[$]===re&&++Pe;return Pe}var Wp=Yo(wp),Xp=Yo(Rp);function Yp(z){return"\\"+Lp[z]}function qp(z,re){return z==null?t:z[re]}function Fr(z){return yp.test(z)}function $p(z){return Ap.test(z)}function Kp(z){for(var re,$=[];!(re=z.next()).done;)$.push(re.value);return $}function Zo(z){var re=-1,$=Array(z.size);return z.forEach(function(Pe,je){$[++re]=[je,Pe]}),$}function du(z,re){return function($){return z(re($))}}function Bi(z,re){for(var $=-1,Pe=z.length,je=0,xt=[];++$<Pe;){var kt=z[$];(kt===re||kt===p)&&(z[$]=p,xt[je++]=$)}return xt}function fa(z){var re=-1,$=Array(z.size);return z.forEach(function(Pe){$[++re]=Pe}),$}function Zp(z){var re=-1,$=Array(z.size);return z.forEach(function(Pe){$[++re]=[Pe,Pe]}),$}function jp(z,re,$){for(var Pe=$-1,je=z.length;++Pe<je;)if(z[Pe]===re)return Pe;return-1}function Jp(z,re,$){for(var Pe=$+1;Pe--;)if(z[Pe]===re)return Pe;return Pe}function Or(z){return Fr(z)?em(z):Op(z)}function Xn(z){return Fr(z)?tm(z):Bp(z)}function pu(z){for(var re=z.length;re--&&Cr.test(z.charAt(re)););return re}var Qp=Yo(Cp);function em(z){for(var re=zo.lastIndex=0;zo.test(z);)++re;return re}function tm(z){return z.match(zo)||[]}function nm(z){return z.match(Ep)||[]}var im=function z(re){re=re==null?Jt:Br.defaults(Jt.Object(),re,Br.pick(Jt,Tp));var $=re.Array,Pe=re.Date,je=re.Error,xt=re.Function,kt=re.Math,At=re.Object,jo=re.RegExp,rm=re.String,Fn=re.TypeError,da=$.prototype,sm=xt.prototype,zr=At.prototype,pa=re["__core-js_shared__"],ma=sm.toString,St=zr.hasOwnProperty,am=0,mu=function(){var n=/[^.]+$/.exec(pa&&pa.keys&&pa.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""}(),ga=zr.toString,om=ma.call(At),lm=Jt._,cm=jo("^"+ma.call(St).replace(Rr,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),_a=Jc?re.Buffer:t,zi=re.Symbol,va=re.Uint8Array,gu=_a?_a.allocUnsafe:t,xa=du(At.getPrototypeOf,At),_u=At.create,vu=zr.propertyIsEnumerable,Ma=da.splice,xu=zi?zi.isConcatSpreadable:t,Ls=zi?zi.iterator:t,sr=zi?zi.toStringTag:t,Sa=function(){try{var n=ur(At,"defineProperty");return n({},"",{}),n}catch{}}(),um=re.clearTimeout!==Jt.clearTimeout&&re.clearTimeout,hm=Pe&&Pe.now!==Jt.Date.now&&Pe.now,fm=re.setTimeout!==Jt.setTimeout&&re.setTimeout,Ea=kt.ceil,ya=kt.floor,Jo=At.getOwnPropertySymbols,dm=_a?_a.isBuffer:t,Mu=re.isFinite,pm=da.join,mm=du(At.keys,At),Wt=kt.max,rn=kt.min,gm=Pe.now,_m=re.parseInt,Su=kt.random,vm=da.reverse,Qo=ur(re,"DataView"),Ps=ur(re,"Map"),el=ur(re,"Promise"),Hr=ur(re,"Set"),Ds=ur(re,"WeakMap"),Us=ur(At,"create"),Aa=Ds&&new Ds,Gr={},xm=hr(Qo),Mm=hr(Ps),Sm=hr(el),Em=hr(Hr),ym=hr(Ds),Ta=zi?zi.prototype:t,Is=Ta?Ta.valueOf:t,Eu=Ta?Ta.toString:t;function S(n){if(Ot(n)&&!Je(n)&&!(n instanceof pt)){if(n instanceof On)return n;if(St.call(n,"__wrapped__"))return yh(n)}return new On(n)}var Vr=function(){function n(){}return function(s){if(!It(s))return{};if(_u)return _u(s);n.prototype=s;var l=new n;return n.prototype=t,l}}();function ba(){}function On(n,s){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!s,this.__index__=0,this.__values__=t}S.templateSettings={escape:vt,evaluate:Et,interpolate:nn,variable:"",imports:{_:S}},S.prototype=ba.prototype,S.prototype.constructor=S,On.prototype=Vr(ba.prototype),On.prototype.constructor=On;function pt(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=q,this.__views__=[]}function Am(){var n=new pt(this.__wrapped__);return n.__actions__=gn(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=gn(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=gn(this.__views__),n}function Tm(){if(this.__filtered__){var n=new pt(this);n.__dir__=-1,n.__filtered__=!0}else n=this.clone(),n.__dir__*=-1;return n}function bm(){var n=this.__wrapped__.value(),s=this.__dir__,l=Je(n),h=s<0,x=l?n.length:0,E=Bg(0,x,this.__views__),L=E.start,O=E.end,G=O-L,oe=h?O:L-1,le=this.__iteratees__,he=le.length,we=0,Ne=rn(G,this.__takeCount__);if(!l||!h&&x==G&&Ne==G)return Yu(n,this.__actions__);var Ve=[];e:for(;G--&&we<Ne;){oe+=s;for(var nt=-1,ke=n[oe];++nt<he;){var dt=le[nt],gt=dt.iteratee,Tn=dt.type,fn=gt(ke);if(Tn==J)ke=fn;else if(!fn){if(Tn==ee)continue e;break e}}Ve[we++]=ke}return Ve}pt.prototype=Vr(ba.prototype),pt.prototype.constructor=pt;function ar(n){var s=-1,l=n==null?0:n.length;for(this.clear();++s<l;){var h=n[s];this.set(h[0],h[1])}}function wm(){this.__data__=Us?Us(null):{},this.size=0}function Rm(n){var s=this.has(n)&&delete this.__data__[n];return this.size-=s?1:0,s}function Cm(n){var s=this.__data__;if(Us){var l=s[n];return l===f?t:l}return St.call(s,n)?s[n]:t}function Lm(n){var s=this.__data__;return Us?s[n]!==t:St.call(s,n)}function Pm(n,s){var l=this.__data__;return this.size+=this.has(n)?0:1,l[n]=Us&&s===t?f:s,this}ar.prototype.clear=wm,ar.prototype.delete=Rm,ar.prototype.get=Cm,ar.prototype.has=Lm,ar.prototype.set=Pm;function _i(n){var s=-1,l=n==null?0:n.length;for(this.clear();++s<l;){var h=n[s];this.set(h[0],h[1])}}function Dm(){this.__data__=[],this.size=0}function Um(n){var s=this.__data__,l=wa(s,n);if(l<0)return!1;var h=s.length-1;return l==h?s.pop():Ma.call(s,l,1),--this.size,!0}function Im(n){var s=this.__data__,l=wa(s,n);return l<0?t:s[l][1]}function Nm(n){return wa(this.__data__,n)>-1}function Fm(n,s){var l=this.__data__,h=wa(l,n);return h<0?(++this.size,l.push([n,s])):l[h][1]=s,this}_i.prototype.clear=Dm,_i.prototype.delete=Um,_i.prototype.get=Im,_i.prototype.has=Nm,_i.prototype.set=Fm;function vi(n){var s=-1,l=n==null?0:n.length;for(this.clear();++s<l;){var h=n[s];this.set(h[0],h[1])}}function Om(){this.size=0,this.__data__={hash:new ar,map:new(Ps||_i),string:new ar}}function Bm(n){var s=za(this,n).delete(n);return this.size-=s?1:0,s}function zm(n){return za(this,n).get(n)}function Hm(n){return za(this,n).has(n)}function Gm(n,s){var l=za(this,n),h=l.size;return l.set(n,s),this.size+=l.size==h?0:1,this}vi.prototype.clear=Om,vi.prototype.delete=Bm,vi.prototype.get=zm,vi.prototype.has=Hm,vi.prototype.set=Gm;function or(n){var s=-1,l=n==null?0:n.length;for(this.__data__=new vi;++s<l;)this.add(n[s])}function Vm(n){return this.__data__.set(n,f),this}function km(n){return this.__data__.has(n)}or.prototype.add=or.prototype.push=Vm,or.prototype.has=km;function Yn(n){var s=this.__data__=new _i(n);this.size=s.size}function Wm(){this.__data__=new _i,this.size=0}function Xm(n){var s=this.__data__,l=s.delete(n);return this.size=s.size,l}function Ym(n){return this.__data__.get(n)}function qm(n){return this.__data__.has(n)}function $m(n,s){var l=this.__data__;if(l instanceof _i){var h=l.__data__;if(!Ps||h.length<a-1)return h.push([n,s]),this.size=++l.size,this;l=this.__data__=new vi(h)}return l.set(n,s),this.size=l.size,this}Yn.prototype.clear=Wm,Yn.prototype.delete=Xm,Yn.prototype.get=Ym,Yn.prototype.has=qm,Yn.prototype.set=$m;function yu(n,s){var l=Je(n),h=!l&&fr(n),x=!l&&!h&&Wi(n),E=!l&&!h&&!x&&Yr(n),L=l||h||x||E,O=L?$o(n.length,rm):[],G=O.length;for(var oe in n)(s||St.call(n,oe))&&!(L&&(oe=="length"||x&&(oe=="offset"||oe=="parent")||E&&(oe=="buffer"||oe=="byteLength"||oe=="byteOffset")||Ei(oe,G)))&&O.push(oe);return O}function Au(n){var s=n.length;return s?n[hl(0,s-1)]:t}function Km(n,s){return Ha(gn(n),lr(s,0,n.length))}function Zm(n){return Ha(gn(n))}function tl(n,s,l){(l!==t&&!qn(n[s],l)||l===t&&!(s in n))&&xi(n,s,l)}function Ns(n,s,l){var h=n[s];(!(St.call(n,s)&&qn(h,l))||l===t&&!(s in n))&&xi(n,s,l)}function wa(n,s){for(var l=n.length;l--;)if(qn(n[l][0],s))return l;return-1}function jm(n,s,l,h){return Hi(n,function(x,E,L){s(h,x,l(x),L)}),h}function Tu(n,s){return n&&si(s,Kt(s),n)}function Jm(n,s){return n&&si(s,vn(s),n)}function xi(n,s,l){s=="__proto__"&&Sa?Sa(n,s,{configurable:!0,enumerable:!0,value:l,writable:!0}):n[s]=l}function nl(n,s){for(var l=-1,h=s.length,x=$(h),E=n==null;++l<h;)x[l]=E?t:Fl(n,s[l]);return x}function lr(n,s,l){return n===n&&(l!==t&&(n=n<=l?n:l),s!==t&&(n=n>=s?n:s)),n}function Bn(n,s,l,h,x,E){var L,O=s&_,G=s&g,oe=s&M;if(l&&(L=x?l(n,h,x,E):l(n)),L!==t)return L;if(!It(n))return n;var le=Je(n);if(le){if(L=Hg(n),!O)return gn(n,L)}else{var he=sn(n),we=he==V||he==Nt;if(Wi(n))return Ku(n,O);if(he==mt||he==Le||we&&!x){if(L=G||we?{}:ph(n),!O)return G?Cg(n,Jm(L,n)):Rg(n,Tu(L,n))}else{if(!Tt[he])return x?n:{};L=Gg(n,he,O)}}E||(E=new Yn);var Ne=E.get(n);if(Ne)return Ne;E.set(n,L),kh(n)?n.forEach(function(ke){L.add(Bn(ke,s,l,ke,n,E))}):Gh(n)&&n.forEach(function(ke,dt){L.set(dt,Bn(ke,s,l,dt,n,E))});var Ve=oe?G?El:Sl:G?vn:Kt,nt=le?t:Ve(n);return Nn(nt||n,function(ke,dt){nt&&(dt=ke,ke=n[dt]),Ns(L,dt,Bn(ke,s,l,dt,n,E))}),L}function Qm(n){var s=Kt(n);return function(l){return bu(l,n,s)}}function bu(n,s,l){var h=l.length;if(n==null)return!h;for(n=At(n);h--;){var x=l[h],E=s[x],L=n[x];if(L===t&&!(x in n)||!E(L))return!1}return!0}function wu(n,s,l){if(typeof n!="function")throw new Fn(u);return Vs(function(){n.apply(t,l)},s)}function Fs(n,s,l,h){var x=-1,E=ua,L=!0,O=n.length,G=[],oe=s.length;if(!O)return G;l&&(s=Lt(s,En(l))),h?(E=Vo,L=!1):s.length>=a&&(E=Cs,L=!1,s=new or(s));e:for(;++x<O;){var le=n[x],he=l==null?le:l(le);if(le=h||le!==0?le:0,L&&he===he){for(var we=oe;we--;)if(s[we]===he)continue e;G.push(le)}else E(s,he,h)||G.push(le)}return G}var Hi=eh(ri),Ru=eh(rl,!0);function eg(n,s){var l=!0;return Hi(n,function(h,x,E){return l=!!s(h,x,E),l}),l}function Ra(n,s,l){for(var h=-1,x=n.length;++h<x;){var E=n[h],L=s(E);if(L!=null&&(O===t?L===L&&!An(L):l(L,O)))var O=L,G=E}return G}function tg(n,s,l,h){var x=n.length;for(l=tt(l),l<0&&(l=-l>x?0:x+l),h=h===t||h>x?x:tt(h),h<0&&(h+=x),h=l>h?0:Xh(h);l<h;)n[l++]=s;return n}function Cu(n,s){var l=[];return Hi(n,function(h,x,E){s(h,x,E)&&l.push(h)}),l}function Qt(n,s,l,h,x){var E=-1,L=n.length;for(l||(l=kg),x||(x=[]);++E<L;){var O=n[E];s>0&&l(O)?s>1?Qt(O,s-1,l,h,x):Oi(x,O):h||(x[x.length]=O)}return x}var il=th(),Lu=th(!0);function ri(n,s){return n&&il(n,s,Kt)}function rl(n,s){return n&&Lu(n,s,Kt)}function Ca(n,s){return Fi(s,function(l){return yi(n[l])})}function cr(n,s){s=Vi(s,n);for(var l=0,h=s.length;n!=null&&l<h;)n=n[ai(s[l++])];return l&&l==h?n:t}function Pu(n,s,l){var h=s(n);return Je(n)?h:Oi(h,l(n))}function un(n){return n==null?n===t?y:Ye:sr&&sr in At(n)?Og(n):Zg(n)}function sl(n,s){return n>s}function ng(n,s){return n!=null&&St.call(n,s)}function ig(n,s){return n!=null&&s in At(n)}function rg(n,s,l){return n>=rn(s,l)&&n<Wt(s,l)}function al(n,s,l){for(var h=l?Vo:ua,x=n[0].length,E=n.length,L=E,O=$(E),G=1/0,oe=[];L--;){var le=n[L];L&&s&&(le=Lt(le,En(s))),G=rn(le.length,G),O[L]=!l&&(s||x>=120&&le.length>=120)?new or(L&&le):t}le=n[0];var he=-1,we=O[0];e:for(;++he<x&&oe.length<G;){var Ne=le[he],Ve=s?s(Ne):Ne;if(Ne=l||Ne!==0?Ne:0,!(we?Cs(we,Ve):h(oe,Ve,l))){for(L=E;--L;){var nt=O[L];if(!(nt?Cs(nt,Ve):h(n[L],Ve,l)))continue e}we&&we.push(Ve),oe.push(Ne)}}return oe}function sg(n,s,l,h){return ri(n,function(x,E,L){s(h,l(x),E,L)}),h}function Os(n,s,l){s=Vi(s,n),n=vh(n,s);var h=n==null?n:n[ai(Hn(s))];return h==null?t:Sn(h,n,l)}function Du(n){return Ot(n)&&un(n)==Le}function ag(n){return Ot(n)&&un(n)==fe}function og(n){return Ot(n)&&un(n)==rt}function Bs(n,s,l,h,x){return n===s?!0:n==null||s==null||!Ot(n)&&!Ot(s)?n!==n&&s!==s:lg(n,s,l,h,Bs,x)}function lg(n,s,l,h,x,E){var L=Je(n),O=Je(s),G=L?Oe:sn(n),oe=O?Oe:sn(s);G=G==Le?mt:G,oe=oe==Le?mt:oe;var le=G==mt,he=oe==mt,we=G==oe;if(we&&Wi(n)){if(!Wi(s))return!1;L=!0,le=!1}if(we&&!le)return E||(E=new Yn),L||Yr(n)?hh(n,s,l,h,x,E):Ng(n,s,G,l,h,x,E);if(!(l&T)){var Ne=le&&St.call(n,"__wrapped__"),Ve=he&&St.call(s,"__wrapped__");if(Ne||Ve){var nt=Ne?n.value():n,ke=Ve?s.value():s;return E||(E=new Yn),x(nt,ke,l,h,E)}}return we?(E||(E=new Yn),Fg(n,s,l,h,x,E)):!1}function cg(n){return Ot(n)&&sn(n)==Ue}function ol(n,s,l,h){var x=l.length,E=x,L=!h;if(n==null)return!E;for(n=At(n);x--;){var O=l[x];if(L&&O[2]?O[1]!==n[O[0]]:!(O[0]in n))return!1}for(;++x<E;){O=l[x];var G=O[0],oe=n[G],le=O[1];if(L&&O[2]){if(oe===t&&!(G in n))return!1}else{var he=new Yn;if(h)var we=h(oe,le,G,n,s,he);if(!(we===t?Bs(le,oe,T|A,h,he):we))return!1}}return!0}function Uu(n){if(!It(n)||Xg(n))return!1;var s=yi(n)?cm:ne;return s.test(hr(n))}function ug(n){return Ot(n)&&un(n)==st}function hg(n){return Ot(n)&&sn(n)==_t}function fg(n){return Ot(n)&&Ya(n.length)&&!!bt[un(n)]}function Iu(n){return typeof n=="function"?n:n==null?xn:typeof n=="object"?Je(n)?Ou(n[0],n[1]):Fu(n):nf(n)}function ll(n){if(!Gs(n))return mm(n);var s=[];for(var l in At(n))St.call(n,l)&&l!="constructor"&&s.push(l);return s}function dg(n){if(!It(n))return Kg(n);var s=Gs(n),l=[];for(var h in n)h=="constructor"&&(s||!St.call(n,h))||l.push(h);return l}function cl(n,s){return n<s}function Nu(n,s){var l=-1,h=_n(n)?$(n.length):[];return Hi(n,function(x,E,L){h[++l]=s(x,E,L)}),h}function Fu(n){var s=Al(n);return s.length==1&&s[0][2]?gh(s[0][0],s[0][1]):function(l){return l===n||ol(l,n,s)}}function Ou(n,s){return bl(n)&&mh(s)?gh(ai(n),s):function(l){var h=Fl(l,n);return h===t&&h===s?Ol(l,n):Bs(s,h,T|A)}}function La(n,s,l,h,x){n!==s&&il(s,function(E,L){if(x||(x=new Yn),It(E))pg(n,s,L,l,La,h,x);else{var O=h?h(Rl(n,L),E,L+"",n,s,x):t;O===t&&(O=E),tl(n,L,O)}},vn)}function pg(n,s,l,h,x,E,L){var O=Rl(n,l),G=Rl(s,l),oe=L.get(G);if(oe){tl(n,l,oe);return}var le=E?E(O,G,l+"",n,s,L):t,he=le===t;if(he){var we=Je(G),Ne=!we&&Wi(G),Ve=!we&&!Ne&&Yr(G);le=G,we||Ne||Ve?Je(O)?le=O:Bt(O)?le=gn(O):Ne?(he=!1,le=Ku(G,!0)):Ve?(he=!1,le=Zu(G,!0)):le=[]:ks(G)||fr(G)?(le=O,fr(O)?le=Yh(O):(!It(O)||yi(O))&&(le=ph(G))):he=!1}he&&(L.set(G,le),x(le,G,h,E,L),L.delete(G)),tl(n,l,le)}function Bu(n,s){var l=n.length;if(l)return s+=s<0?l:0,Ei(s,l)?n[s]:t}function zu(n,s,l){s.length?s=Lt(s,function(E){return Je(E)?function(L){return cr(L,E.length===1?E[0]:E)}:E}):s=[xn];var h=-1;s=Lt(s,En(He()));var x=Nu(n,function(E,L,O){var G=Lt(s,function(oe){return oe(E)});return{criteria:G,index:++h,value:E}});return Gp(x,function(E,L){return wg(E,L,l)})}function mg(n,s){return Hu(n,s,function(l,h){return Ol(n,h)})}function Hu(n,s,l){for(var h=-1,x=s.length,E={};++h<x;){var L=s[h],O=cr(n,L);l(O,L)&&zs(E,Vi(L,n),O)}return E}function gg(n){return function(s){return cr(s,n)}}function ul(n,s,l,h){var x=h?Hp:Nr,E=-1,L=s.length,O=n;for(n===s&&(s=gn(s)),l&&(O=Lt(n,En(l)));++E<L;)for(var G=0,oe=s[E],le=l?l(oe):oe;(G=x(O,le,G,h))>-1;)O!==n&&Ma.call(O,G,1),Ma.call(n,G,1);return n}function Gu(n,s){for(var l=n?s.length:0,h=l-1;l--;){var x=s[l];if(l==h||x!==E){var E=x;Ei(x)?Ma.call(n,x,1):pl(n,x)}}return n}function hl(n,s){return n+ya(Su()*(s-n+1))}function _g(n,s,l,h){for(var x=-1,E=Wt(Ea((s-n)/(l||1)),0),L=$(E);E--;)L[h?E:++x]=n,n+=l;return L}function fl(n,s){var l="";if(!n||s<1||s>se)return l;do s%2&&(l+=n),s=ya(s/2),s&&(n+=n);while(s);return l}function lt(n,s){return Cl(_h(n,s,xn),n+"")}function vg(n){return Au(qr(n))}function xg(n,s){var l=qr(n);return Ha(l,lr(s,0,l.length))}function zs(n,s,l,h){if(!It(n))return n;s=Vi(s,n);for(var x=-1,E=s.length,L=E-1,O=n;O!=null&&++x<E;){var G=ai(s[x]),oe=l;if(G==="__proto__"||G==="constructor"||G==="prototype")return n;if(x!=L){var le=O[G];oe=h?h(le,G,O):t,oe===t&&(oe=It(le)?le:Ei(s[x+1])?[]:{})}Ns(O,G,oe),O=O[G]}return n}var Vu=Aa?function(n,s){return Aa.set(n,s),n}:xn,Mg=Sa?function(n,s){return Sa(n,"toString",{configurable:!0,enumerable:!1,value:zl(s),writable:!0})}:xn;function Sg(n){return Ha(qr(n))}function zn(n,s,l){var h=-1,x=n.length;s<0&&(s=-s>x?0:x+s),l=l>x?x:l,l<0&&(l+=x),x=s>l?0:l-s>>>0,s>>>=0;for(var E=$(x);++h<x;)E[h]=n[h+s];return E}function Eg(n,s){var l;return Hi(n,function(h,x,E){return l=s(h,x,E),!l}),!!l}function Pa(n,s,l){var h=0,x=n==null?h:n.length;if(typeof s=="number"&&s===s&&x<=Re){for(;h<x;){var E=h+x>>>1,L=n[E];L!==null&&!An(L)&&(l?L<=s:L<s)?h=E+1:x=E}return x}return dl(n,s,xn,l)}function dl(n,s,l,h){var x=0,E=n==null?0:n.length;if(E===0)return 0;s=l(s);for(var L=s!==s,O=s===null,G=An(s),oe=s===t;x<E;){var le=ya((x+E)/2),he=l(n[le]),we=he!==t,Ne=he===null,Ve=he===he,nt=An(he);if(L)var ke=h||Ve;else oe?ke=Ve&&(h||we):O?ke=Ve&&we&&(h||!Ne):G?ke=Ve&&we&&!Ne&&(h||!nt):Ne||nt?ke=!1:ke=h?he<=s:he<s;ke?x=le+1:E=le}return rn(E,Q)}function ku(n,s){for(var l=-1,h=n.length,x=0,E=[];++l<h;){var L=n[l],O=s?s(L):L;if(!l||!qn(O,G)){var G=O;E[x++]=L===0?0:L}}return E}function Wu(n){return typeof n=="number"?n:An(n)?ue:+n}function yn(n){if(typeof n=="string")return n;if(Je(n))return Lt(n,yn)+"";if(An(n))return Eu?Eu.call(n):"";var s=n+"";return s=="0"&&1/n==-ie?"-0":s}function Gi(n,s,l){var h=-1,x=ua,E=n.length,L=!0,O=[],G=O;if(l)L=!1,x=Vo;else if(E>=a){var oe=s?null:Ug(n);if(oe)return fa(oe);L=!1,x=Cs,G=new or}else G=s?[]:O;e:for(;++h<E;){var le=n[h],he=s?s(le):le;if(le=l||le!==0?le:0,L&&he===he){for(var we=G.length;we--;)if(G[we]===he)continue e;s&&G.push(he),O.push(le)}else x(G,he,l)||(G!==O&&G.push(he),O.push(le))}return O}function pl(n,s){return s=Vi(s,n),n=vh(n,s),n==null||delete n[ai(Hn(s))]}function Xu(n,s,l,h){return zs(n,s,l(cr(n,s)),h)}function Da(n,s,l,h){for(var x=n.length,E=h?x:-1;(h?E--:++E<x)&&s(n[E],E,n););return l?zn(n,h?0:E,h?E+1:x):zn(n,h?E+1:0,h?x:E)}function Yu(n,s){var l=n;return l instanceof pt&&(l=l.value()),ko(s,function(h,x){return x.func.apply(x.thisArg,Oi([h],x.args))},l)}function ml(n,s,l){var h=n.length;if(h<2)return h?Gi(n[0]):[];for(var x=-1,E=$(h);++x<h;)for(var L=n[x],O=-1;++O<h;)O!=x&&(E[x]=Fs(E[x]||L,n[O],s,l));return Gi(Qt(E,1),s,l)}function qu(n,s,l){for(var h=-1,x=n.length,E=s.length,L={};++h<x;){var O=h<E?s[h]:t;l(L,n[h],O)}return L}function gl(n){return Bt(n)?n:[]}function _l(n){return typeof n=="function"?n:xn}function Vi(n,s){return Je(n)?n:bl(n,s)?[n]:Eh(Mt(n))}var yg=lt;function ki(n,s,l){var h=n.length;return l=l===t?h:l,!s&&l>=h?n:zn(n,s,l)}var $u=um||function(n){return Jt.clearTimeout(n)};function Ku(n,s){if(s)return n.slice();var l=n.length,h=gu?gu(l):new n.constructor(l);return n.copy(h),h}function vl(n){var s=new n.constructor(n.byteLength);return new va(s).set(new va(n)),s}function Ag(n,s){var l=s?vl(n.buffer):n.buffer;return new n.constructor(l,n.byteOffset,n.byteLength)}function Tg(n){var s=new n.constructor(n.source,k.exec(n));return s.lastIndex=n.lastIndex,s}function bg(n){return Is?At(Is.call(n)):{}}function Zu(n,s){var l=s?vl(n.buffer):n.buffer;return new n.constructor(l,n.byteOffset,n.length)}function ju(n,s){if(n!==s){var l=n!==t,h=n===null,x=n===n,E=An(n),L=s!==t,O=s===null,G=s===s,oe=An(s);if(!O&&!oe&&!E&&n>s||E&&L&&G&&!O&&!oe||h&&L&&G||!l&&G||!x)return 1;if(!h&&!E&&!oe&&n<s||oe&&l&&x&&!h&&!E||O&&l&&x||!L&&x||!G)return-1}return 0}function wg(n,s,l){for(var h=-1,x=n.criteria,E=s.criteria,L=x.length,O=l.length;++h<L;){var G=ju(x[h],E[h]);if(G){if(h>=O)return G;var oe=l[h];return G*(oe=="desc"?-1:1)}}return n.index-s.index}function Ju(n,s,l,h){for(var x=-1,E=n.length,L=l.length,O=-1,G=s.length,oe=Wt(E-L,0),le=$(G+oe),he=!h;++O<G;)le[O]=s[O];for(;++x<L;)(he||x<E)&&(le[l[x]]=n[x]);for(;oe--;)le[O++]=n[x++];return le}function Qu(n,s,l,h){for(var x=-1,E=n.length,L=-1,O=l.length,G=-1,oe=s.length,le=Wt(E-O,0),he=$(le+oe),we=!h;++x<le;)he[x]=n[x];for(var Ne=x;++G<oe;)he[Ne+G]=s[G];for(;++L<O;)(we||x<E)&&(he[Ne+l[L]]=n[x++]);return he}function gn(n,s){var l=-1,h=n.length;for(s||(s=$(h));++l<h;)s[l]=n[l];return s}function si(n,s,l,h){var x=!l;l||(l={});for(var E=-1,L=s.length;++E<L;){var O=s[E],G=h?h(l[O],n[O],O,l,n):t;G===t&&(G=n[O]),x?xi(l,O,G):Ns(l,O,G)}return l}function Rg(n,s){return si(n,Tl(n),s)}function Cg(n,s){return si(n,fh(n),s)}function Ua(n,s){return function(l,h){var x=Je(l)?Ip:jm,E=s?s():{};return x(l,n,He(h,2),E)}}function kr(n){return lt(function(s,l){var h=-1,x=l.length,E=x>1?l[x-1]:t,L=x>2?l[2]:t;for(E=n.length>3&&typeof E=="function"?(x--,E):t,L&&hn(l[0],l[1],L)&&(E=x<3?t:E,x=1),s=At(s);++h<x;){var O=l[h];O&&n(s,O,h,E)}return s})}function eh(n,s){return function(l,h){if(l==null)return l;if(!_n(l))return n(l,h);for(var x=l.length,E=s?x:-1,L=At(l);(s?E--:++E<x)&&h(L[E],E,L)!==!1;);return l}}function th(n){return function(s,l,h){for(var x=-1,E=At(s),L=h(s),O=L.length;O--;){var G=L[n?O:++x];if(l(E[G],G,E)===!1)break}return s}}function Lg(n,s,l){var h=s&v,x=Hs(n);function E(){var L=this&&this!==Jt&&this instanceof E?x:n;return L.apply(h?l:this,arguments)}return E}function nh(n){return function(s){s=Mt(s);var l=Fr(s)?Xn(s):t,h=l?l[0]:s.charAt(0),x=l?ki(l,1).join(""):s.slice(1);return h[n]()+x}}function Wr(n){return function(s){return ko(ef(Qh(s).replace(Mp,"")),n,"")}}function Hs(n){return function(){var s=arguments;switch(s.length){case 0:return new n;case 1:return new n(s[0]);case 2:return new n(s[0],s[1]);case 3:return new n(s[0],s[1],s[2]);case 4:return new n(s[0],s[1],s[2],s[3]);case 5:return new n(s[0],s[1],s[2],s[3],s[4]);case 6:return new n(s[0],s[1],s[2],s[3],s[4],s[5]);case 7:return new n(s[0],s[1],s[2],s[3],s[4],s[5],s[6])}var l=Vr(n.prototype),h=n.apply(l,s);return It(h)?h:l}}function Pg(n,s,l){var h=Hs(n);function x(){for(var E=arguments.length,L=$(E),O=E,G=Xr(x);O--;)L[O]=arguments[O];var oe=E<3&&L[0]!==G&&L[E-1]!==G?[]:Bi(L,G);if(E-=oe.length,E<l)return oh(n,s,Ia,x.placeholder,t,L,oe,t,t,l-E);var le=this&&this!==Jt&&this instanceof x?h:n;return Sn(le,this,L)}return x}function ih(n){return function(s,l,h){var x=At(s);if(!_n(s)){var E=He(l,3);s=Kt(s),l=function(O){return E(x[O],O,x)}}var L=n(s,l,h);return L>-1?x[E?s[L]:L]:t}}function rh(n){return Si(function(s){var l=s.length,h=l,x=On.prototype.thru;for(n&&s.reverse();h--;){var E=s[h];if(typeof E!="function")throw new Fn(u);if(x&&!L&&Ba(E)=="wrapper")var L=new On([],!0)}for(h=L?h:l;++h<l;){E=s[h];var O=Ba(E),G=O=="wrapper"?yl(E):t;G&&wl(G[0])&&G[1]==(U|w|N|ae)&&!G[4].length&&G[9]==1?L=L[Ba(G[0])].apply(L,G[3]):L=E.length==1&&wl(E)?L[O]():L.thru(E)}return function(){var oe=arguments,le=oe[0];if(L&&oe.length==1&&Je(le))return L.plant(le).value();for(var he=0,we=l?s[he].apply(this,oe):le;++he<l;)we=s[he].call(this,we);return we}})}function Ia(n,s,l,h,x,E,L,O,G,oe){var le=s&U,he=s&v,we=s&m,Ne=s&(w|P),Ve=s&b,nt=we?t:Hs(n);function ke(){for(var dt=arguments.length,gt=$(dt),Tn=dt;Tn--;)gt[Tn]=arguments[Tn];if(Ne)var fn=Xr(ke),bn=kp(gt,fn);if(h&&(gt=Ju(gt,h,x,Ne)),E&&(gt=Qu(gt,E,L,Ne)),dt-=bn,Ne&&dt<oe){var zt=Bi(gt,fn);return oh(n,s,Ia,ke.placeholder,l,gt,zt,O,G,oe-dt)}var $n=he?l:this,Ti=we?$n[n]:n;return dt=gt.length,O?gt=jg(gt,O):Ve&&dt>1&&gt.reverse(),le&&G<dt&&(gt.length=G),this&&this!==Jt&&this instanceof ke&&(Ti=nt||Hs(Ti)),Ti.apply($n,gt)}return ke}function sh(n,s){return function(l,h){return sg(l,n,s(h),{})}}function Na(n,s){return function(l,h){var x;if(l===t&&h===t)return s;if(l!==t&&(x=l),h!==t){if(x===t)return h;typeof l=="string"||typeof h=="string"?(l=yn(l),h=yn(h)):(l=Wu(l),h=Wu(h)),x=n(l,h)}return x}}function xl(n){return Si(function(s){return s=Lt(s,En(He())),lt(function(l){var h=this;return n(s,function(x){return Sn(x,h,l)})})})}function Fa(n,s){s=s===t?" ":yn(s);var l=s.length;if(l<2)return l?fl(s,n):s;var h=fl(s,Ea(n/Or(s)));return Fr(s)?ki(Xn(h),0,n).join(""):h.slice(0,n)}function Dg(n,s,l,h){var x=s&v,E=Hs(n);function L(){for(var O=-1,G=arguments.length,oe=-1,le=h.length,he=$(le+G),we=this&&this!==Jt&&this instanceof L?E:n;++oe<le;)he[oe]=h[oe];for(;G--;)he[oe++]=arguments[++O];return Sn(we,x?l:this,he)}return L}function ah(n){return function(s,l,h){return h&&typeof h!="number"&&hn(s,l,h)&&(l=h=t),s=Ai(s),l===t?(l=s,s=0):l=Ai(l),h=h===t?s<l?1:-1:Ai(h),_g(s,l,h,n)}}function Oa(n){return function(s,l){return typeof s=="string"&&typeof l=="string"||(s=Gn(s),l=Gn(l)),n(s,l)}}function oh(n,s,l,h,x,E,L,O,G,oe){var le=s&w,he=le?L:t,we=le?t:L,Ne=le?E:t,Ve=le?t:E;s|=le?N:H,s&=~(le?H:N),s&F||(s&=~(v|m));var nt=[n,s,x,Ne,he,Ve,we,O,G,oe],ke=l.apply(t,nt);return wl(n)&&xh(ke,nt),ke.placeholder=h,Mh(ke,n,s)}function Ml(n){var s=kt[n];return function(l,h){if(l=Gn(l),h=h==null?0:rn(tt(h),292),h&&Mu(l)){var x=(Mt(l)+"e").split("e"),E=s(x[0]+"e"+(+x[1]+h));return x=(Mt(E)+"e").split("e"),+(x[0]+"e"+(+x[1]-h))}return s(l)}}var Ug=Hr&&1/fa(new Hr([,-0]))[1]==ie?function(n){return new Hr(n)}:Vl;function lh(n){return function(s){var l=sn(s);return l==Ue?Zo(s):l==_t?Zp(s):Vp(s,n(s))}}function Mi(n,s,l,h,x,E,L,O){var G=s&m;if(!G&&typeof n!="function")throw new Fn(u);var oe=h?h.length:0;if(oe||(s&=~(N|H),h=x=t),L=L===t?L:Wt(tt(L),0),O=O===t?O:tt(O),oe-=x?x.length:0,s&H){var le=h,he=x;h=x=t}var we=G?t:yl(n),Ne=[n,s,l,h,x,le,he,E,L,O];if(we&&$g(Ne,we),n=Ne[0],s=Ne[1],l=Ne[2],h=Ne[3],x=Ne[4],O=Ne[9]=Ne[9]===t?G?0:n.length:Wt(Ne[9]-oe,0),!O&&s&(w|P)&&(s&=~(w|P)),!s||s==v)var Ve=Lg(n,s,l);else s==w||s==P?Ve=Pg(n,s,O):(s==N||s==(v|N))&&!x.length?Ve=Dg(n,s,l,h):Ve=Ia.apply(t,Ne);var nt=we?Vu:xh;return Mh(nt(Ve,Ne),n,s)}function ch(n,s,l,h){return n===t||qn(n,zr[l])&&!St.call(h,l)?s:n}function uh(n,s,l,h,x,E){return It(n)&&It(s)&&(E.set(s,n),La(n,s,t,uh,E),E.delete(s)),n}function Ig(n){return ks(n)?t:n}function hh(n,s,l,h,x,E){var L=l&T,O=n.length,G=s.length;if(O!=G&&!(L&&G>O))return!1;var oe=E.get(n),le=E.get(s);if(oe&&le)return oe==s&&le==n;var he=-1,we=!0,Ne=l&A?new or:t;for(E.set(n,s),E.set(s,n);++he<O;){var Ve=n[he],nt=s[he];if(h)var ke=L?h(nt,Ve,he,s,n,E):h(Ve,nt,he,n,s,E);if(ke!==t){if(ke)continue;we=!1;break}if(Ne){if(!Wo(s,function(dt,gt){if(!Cs(Ne,gt)&&(Ve===dt||x(Ve,dt,l,h,E)))return Ne.push(gt)})){we=!1;break}}else if(!(Ve===nt||x(Ve,nt,l,h,E))){we=!1;break}}return E.delete(n),E.delete(s),we}function Ng(n,s,l,h,x,E,L){switch(l){case _e:if(n.byteLength!=s.byteLength||n.byteOffset!=s.byteOffset)return!1;n=n.buffer,s=s.buffer;case fe:return!(n.byteLength!=s.byteLength||!E(new va(n),new va(s)));case Fe:case rt:case We:return qn(+n,+s);case Ke:return n.name==s.name&&n.message==s.message;case st:case Rt:return n==s+"";case Ue:var O=Zo;case _t:var G=h&T;if(O||(O=fa),n.size!=s.size&&!G)return!1;var oe=L.get(n);if(oe)return oe==s;h|=A,L.set(n,s);var le=hh(O(n),O(s),h,x,E,L);return L.delete(n),le;case C:if(Is)return Is.call(n)==Is.call(s)}return!1}function Fg(n,s,l,h,x,E){var L=l&T,O=Sl(n),G=O.length,oe=Sl(s),le=oe.length;if(G!=le&&!L)return!1;for(var he=G;he--;){var we=O[he];if(!(L?we in s:St.call(s,we)))return!1}var Ne=E.get(n),Ve=E.get(s);if(Ne&&Ve)return Ne==s&&Ve==n;var nt=!0;E.set(n,s),E.set(s,n);for(var ke=L;++he<G;){we=O[he];var dt=n[we],gt=s[we];if(h)var Tn=L?h(gt,dt,we,s,n,E):h(dt,gt,we,n,s,E);if(!(Tn===t?dt===gt||x(dt,gt,l,h,E):Tn)){nt=!1;break}ke||(ke=we=="constructor")}if(nt&&!ke){var fn=n.constructor,bn=s.constructor;fn!=bn&&"constructor"in n&&"constructor"in s&&!(typeof fn=="function"&&fn instanceof fn&&typeof bn=="function"&&bn instanceof bn)&&(nt=!1)}return E.delete(n),E.delete(s),nt}function Si(n){return Cl(_h(n,t,bh),n+"")}function Sl(n){return Pu(n,Kt,Tl)}function El(n){return Pu(n,vn,fh)}var yl=Aa?function(n){return Aa.get(n)}:Vl;function Ba(n){for(var s=n.name+"",l=Gr[s],h=St.call(Gr,s)?l.length:0;h--;){var x=l[h],E=x.func;if(E==null||E==n)return x.name}return s}function Xr(n){var s=St.call(S,"placeholder")?S:n;return s.placeholder}function He(){var n=S.iteratee||Hl;return n=n===Hl?Iu:n,arguments.length?n(arguments[0],arguments[1]):n}function za(n,s){var l=n.__data__;return Wg(s)?l[typeof s=="string"?"string":"hash"]:l.map}function Al(n){for(var s=Kt(n),l=s.length;l--;){var h=s[l],x=n[h];s[l]=[h,x,mh(x)]}return s}function ur(n,s){var l=qp(n,s);return Uu(l)?l:t}function Og(n){var s=St.call(n,sr),l=n[sr];try{n[sr]=t;var h=!0}catch{}var x=ga.call(n);return h&&(s?n[sr]=l:delete n[sr]),x}var Tl=Jo?function(n){return n==null?[]:(n=At(n),Fi(Jo(n),function(s){return vu.call(n,s)}))}:kl,fh=Jo?function(n){for(var s=[];n;)Oi(s,Tl(n)),n=xa(n);return s}:kl,sn=un;(Qo&&sn(new Qo(new ArrayBuffer(1)))!=_e||Ps&&sn(new Ps)!=Ue||el&&sn(el.resolve())!=et||Hr&&sn(new Hr)!=_t||Ds&&sn(new Ds)!=Y)&&(sn=function(n){var s=un(n),l=s==mt?n.constructor:t,h=l?hr(l):"";if(h)switch(h){case xm:return _e;case Mm:return Ue;case Sm:return et;case Em:return _t;case ym:return Y}return s});function Bg(n,s,l){for(var h=-1,x=l.length;++h<x;){var E=l[h],L=E.size;switch(E.type){case"drop":n+=L;break;case"dropRight":s-=L;break;case"take":s=rn(s,n+L);break;case"takeRight":n=Wt(n,s-L);break}}return{start:n,end:s}}function zg(n){var s=n.match(Lr);return s?s[1].split(ca):[]}function dh(n,s,l){s=Vi(s,n);for(var h=-1,x=s.length,E=!1;++h<x;){var L=ai(s[h]);if(!(E=n!=null&&l(n,L)))break;n=n[L]}return E||++h!=x?E:(x=n==null?0:n.length,!!x&&Ya(x)&&Ei(L,x)&&(Je(n)||fr(n)))}function Hg(n){var s=n.length,l=new n.constructor(s);return s&&typeof n[0]=="string"&&St.call(n,"index")&&(l.index=n.index,l.input=n.input),l}function ph(n){return typeof n.constructor=="function"&&!Gs(n)?Vr(xa(n)):{}}function Gg(n,s,l){var h=n.constructor;switch(s){case fe:return vl(n);case Fe:case rt:return new h(+n);case _e:return Ag(n,l);case Ie:case Me:case K:case I:case ce:case Ae:case Se:case ye:case Xe:return Zu(n,l);case Ue:return new h;case We:case Rt:return new h(n);case st:return Tg(n);case _t:return new h;case C:return bg(n)}}function Vg(n,s){var l=s.length;if(!l)return n;var h=l-1;return s[h]=(l>1?"& ":"")+s[h],s=s.join(l>2?", ":" "),n.replace(la,`{
/* [wrapped with `+s+`] */
`)}function kg(n){return Je(n)||fr(n)||!!(xu&&n&&n[xu])}function Ei(n,s){var l=typeof n;return s=s??se,!!s&&(l=="number"||l!="symbol"&&Be.test(n))&&n>-1&&n%1==0&&n<s}function hn(n,s,l){if(!It(l))return!1;var h=typeof s;return(h=="number"?_n(l)&&Ei(s,l.length):h=="string"&&s in l)?qn(l[s],n):!1}function bl(n,s){if(Je(n))return!1;var l=typeof n;return l=="number"||l=="symbol"||l=="boolean"||n==null||An(n)?!0:Dn.test(n)||!yt.test(n)||s!=null&&n in At(s)}function Wg(n){var s=typeof n;return s=="string"||s=="number"||s=="symbol"||s=="boolean"?n!=="__proto__":n===null}function wl(n){var s=Ba(n),l=S[s];if(typeof l!="function"||!(s in pt.prototype))return!1;if(n===l)return!0;var h=yl(l);return!!h&&n===h[0]}function Xg(n){return!!mu&&mu in n}var Yg=pa?yi:Wl;function Gs(n){var s=n&&n.constructor,l=typeof s=="function"&&s.prototype||zr;return n===l}function mh(n){return n===n&&!It(n)}function gh(n,s){return function(l){return l==null?!1:l[n]===s&&(s!==t||n in At(l))}}function qg(n){var s=Wa(n,function(h){return l.size===d&&l.clear(),h}),l=s.cache;return s}function $g(n,s){var l=n[1],h=s[1],x=l|h,E=x<(v|m|U),L=h==U&&l==w||h==U&&l==ae&&n[7].length<=s[8]||h==(U|ae)&&s[7].length<=s[8]&&l==w;if(!(E||L))return n;h&v&&(n[2]=s[2],x|=l&v?0:F);var O=s[3];if(O){var G=n[3];n[3]=G?Ju(G,O,s[4]):O,n[4]=G?Bi(n[3],p):s[4]}return O=s[5],O&&(G=n[5],n[5]=G?Qu(G,O,s[6]):O,n[6]=G?Bi(n[5],p):s[6]),O=s[7],O&&(n[7]=O),h&U&&(n[8]=n[8]==null?s[8]:rn(n[8],s[8])),n[9]==null&&(n[9]=s[9]),n[0]=s[0],n[1]=x,n}function Kg(n){var s=[];if(n!=null)for(var l in At(n))s.push(l);return s}function Zg(n){return ga.call(n)}function _h(n,s,l){return s=Wt(s===t?n.length-1:s,0),function(){for(var h=arguments,x=-1,E=Wt(h.length-s,0),L=$(E);++x<E;)L[x]=h[s+x];x=-1;for(var O=$(s+1);++x<s;)O[x]=h[x];return O[s]=l(L),Sn(n,this,O)}}function vh(n,s){return s.length<2?n:cr(n,zn(s,0,-1))}function jg(n,s){for(var l=n.length,h=rn(s.length,l),x=gn(n);h--;){var E=s[h];n[h]=Ei(E,l)?x[E]:t}return n}function Rl(n,s){if(!(s==="constructor"&&typeof n[s]=="function")&&s!="__proto__")return n[s]}var xh=Sh(Vu),Vs=fm||function(n,s){return Jt.setTimeout(n,s)},Cl=Sh(Mg);function Mh(n,s,l){var h=s+"";return Cl(n,Vg(h,Jg(zg(h),l)))}function Sh(n){var s=0,l=0;return function(){var h=gm(),x=Z-(h-l);if(l=h,x>0){if(++s>=ge)return arguments[0]}else s=0;return n.apply(t,arguments)}}function Ha(n,s){var l=-1,h=n.length,x=h-1;for(s=s===t?h:s;++l<s;){var E=hl(l,x),L=n[E];n[E]=n[l],n[l]=L}return n.length=s,n}var Eh=qg(function(n){var s=[];return n.charCodeAt(0)===46&&s.push(""),n.replace(jt,function(l,h,x,E){s.push(x?E.replace(Io,"$1"):h||l)}),s});function ai(n){if(typeof n=="string"||An(n))return n;var s=n+"";return s=="0"&&1/n==-ie?"-0":s}function hr(n){if(n!=null){try{return ma.call(n)}catch{}try{return n+""}catch{}}return""}function Jg(n,s){return Nn(Ce,function(l){var h="_."+l[0];s&l[1]&&!ua(n,h)&&n.push(h)}),n.sort()}function yh(n){if(n instanceof pt)return n.clone();var s=new On(n.__wrapped__,n.__chain__);return s.__actions__=gn(n.__actions__),s.__index__=n.__index__,s.__values__=n.__values__,s}function Qg(n,s,l){(l?hn(n,s,l):s===t)?s=1:s=Wt(tt(s),0);var h=n==null?0:n.length;if(!h||s<1)return[];for(var x=0,E=0,L=$(Ea(h/s));x<h;)L[E++]=zn(n,x,x+=s);return L}function e_(n){for(var s=-1,l=n==null?0:n.length,h=0,x=[];++s<l;){var E=n[s];E&&(x[h++]=E)}return x}function t_(){var n=arguments.length;if(!n)return[];for(var s=$(n-1),l=arguments[0],h=n;h--;)s[h-1]=arguments[h];return Oi(Je(l)?gn(l):[l],Qt(s,1))}var n_=lt(function(n,s){return Bt(n)?Fs(n,Qt(s,1,Bt,!0)):[]}),i_=lt(function(n,s){var l=Hn(s);return Bt(l)&&(l=t),Bt(n)?Fs(n,Qt(s,1,Bt,!0),He(l,2)):[]}),r_=lt(function(n,s){var l=Hn(s);return Bt(l)&&(l=t),Bt(n)?Fs(n,Qt(s,1,Bt,!0),t,l):[]});function s_(n,s,l){var h=n==null?0:n.length;return h?(s=l||s===t?1:tt(s),zn(n,s<0?0:s,h)):[]}function a_(n,s,l){var h=n==null?0:n.length;return h?(s=l||s===t?1:tt(s),s=h-s,zn(n,0,s<0?0:s)):[]}function o_(n,s){return n&&n.length?Da(n,He(s,3),!0,!0):[]}function l_(n,s){return n&&n.length?Da(n,He(s,3),!0):[]}function c_(n,s,l,h){var x=n==null?0:n.length;return x?(l&&typeof l!="number"&&hn(n,s,l)&&(l=0,h=x),tg(n,s,l,h)):[]}function Ah(n,s,l){var h=n==null?0:n.length;if(!h)return-1;var x=l==null?0:tt(l);return x<0&&(x=Wt(h+x,0)),ha(n,He(s,3),x)}function Th(n,s,l){var h=n==null?0:n.length;if(!h)return-1;var x=h-1;return l!==t&&(x=tt(l),x=l<0?Wt(h+x,0):rn(x,h-1)),ha(n,He(s,3),x,!0)}function bh(n){var s=n==null?0:n.length;return s?Qt(n,1):[]}function u_(n){var s=n==null?0:n.length;return s?Qt(n,ie):[]}function h_(n,s){var l=n==null?0:n.length;return l?(s=s===t?1:tt(s),Qt(n,s)):[]}function f_(n){for(var s=-1,l=n==null?0:n.length,h={};++s<l;){var x=n[s];h[x[0]]=x[1]}return h}function wh(n){return n&&n.length?n[0]:t}function d_(n,s,l){var h=n==null?0:n.length;if(!h)return-1;var x=l==null?0:tt(l);return x<0&&(x=Wt(h+x,0)),Nr(n,s,x)}function p_(n){var s=n==null?0:n.length;return s?zn(n,0,-1):[]}var m_=lt(function(n){var s=Lt(n,gl);return s.length&&s[0]===n[0]?al(s):[]}),g_=lt(function(n){var s=Hn(n),l=Lt(n,gl);return s===Hn(l)?s=t:l.pop(),l.length&&l[0]===n[0]?al(l,He(s,2)):[]}),__=lt(function(n){var s=Hn(n),l=Lt(n,gl);return s=typeof s=="function"?s:t,s&&l.pop(),l.length&&l[0]===n[0]?al(l,t,s):[]});function v_(n,s){return n==null?"":pm.call(n,s)}function Hn(n){var s=n==null?0:n.length;return s?n[s-1]:t}function x_(n,s,l){var h=n==null?0:n.length;if(!h)return-1;var x=h;return l!==t&&(x=tt(l),x=x<0?Wt(h+x,0):rn(x,h-1)),s===s?Jp(n,s,x):ha(n,ou,x,!0)}function M_(n,s){return n&&n.length?Bu(n,tt(s)):t}var S_=lt(Rh);function Rh(n,s){return n&&n.length&&s&&s.length?ul(n,s):n}function E_(n,s,l){return n&&n.length&&s&&s.length?ul(n,s,He(l,2)):n}function y_(n,s,l){return n&&n.length&&s&&s.length?ul(n,s,t,l):n}var A_=Si(function(n,s){var l=n==null?0:n.length,h=nl(n,s);return Gu(n,Lt(s,function(x){return Ei(x,l)?+x:x}).sort(ju)),h});function T_(n,s){var l=[];if(!(n&&n.length))return l;var h=-1,x=[],E=n.length;for(s=He(s,3);++h<E;){var L=n[h];s(L,h,n)&&(l.push(L),x.push(h))}return Gu(n,x),l}function Ll(n){return n==null?n:vm.call(n)}function b_(n,s,l){var h=n==null?0:n.length;return h?(l&&typeof l!="number"&&hn(n,s,l)?(s=0,l=h):(s=s==null?0:tt(s),l=l===t?h:tt(l)),zn(n,s,l)):[]}function w_(n,s){return Pa(n,s)}function R_(n,s,l){return dl(n,s,He(l,2))}function C_(n,s){var l=n==null?0:n.length;if(l){var h=Pa(n,s);if(h<l&&qn(n[h],s))return h}return-1}function L_(n,s){return Pa(n,s,!0)}function P_(n,s,l){return dl(n,s,He(l,2),!0)}function D_(n,s){var l=n==null?0:n.length;if(l){var h=Pa(n,s,!0)-1;if(qn(n[h],s))return h}return-1}function U_(n){return n&&n.length?ku(n):[]}function I_(n,s){return n&&n.length?ku(n,He(s,2)):[]}function N_(n){var s=n==null?0:n.length;return s?zn(n,1,s):[]}function F_(n,s,l){return n&&n.length?(s=l||s===t?1:tt(s),zn(n,0,s<0?0:s)):[]}function O_(n,s,l){var h=n==null?0:n.length;return h?(s=l||s===t?1:tt(s),s=h-s,zn(n,s<0?0:s,h)):[]}function B_(n,s){return n&&n.length?Da(n,He(s,3),!1,!0):[]}function z_(n,s){return n&&n.length?Da(n,He(s,3)):[]}var H_=lt(function(n){return Gi(Qt(n,1,Bt,!0))}),G_=lt(function(n){var s=Hn(n);return Bt(s)&&(s=t),Gi(Qt(n,1,Bt,!0),He(s,2))}),V_=lt(function(n){var s=Hn(n);return s=typeof s=="function"?s:t,Gi(Qt(n,1,Bt,!0),t,s)});function k_(n){return n&&n.length?Gi(n):[]}function W_(n,s){return n&&n.length?Gi(n,He(s,2)):[]}function X_(n,s){return s=typeof s=="function"?s:t,n&&n.length?Gi(n,t,s):[]}function Pl(n){if(!(n&&n.length))return[];var s=0;return n=Fi(n,function(l){if(Bt(l))return s=Wt(l.length,s),!0}),$o(s,function(l){return Lt(n,Xo(l))})}function Ch(n,s){if(!(n&&n.length))return[];var l=Pl(n);return s==null?l:Lt(l,function(h){return Sn(s,t,h)})}var Y_=lt(function(n,s){return Bt(n)?Fs(n,s):[]}),q_=lt(function(n){return ml(Fi(n,Bt))}),$_=lt(function(n){var s=Hn(n);return Bt(s)&&(s=t),ml(Fi(n,Bt),He(s,2))}),K_=lt(function(n){var s=Hn(n);return s=typeof s=="function"?s:t,ml(Fi(n,Bt),t,s)}),Z_=lt(Pl);function j_(n,s){return qu(n||[],s||[],Ns)}function J_(n,s){return qu(n||[],s||[],zs)}var Q_=lt(function(n){var s=n.length,l=s>1?n[s-1]:t;return l=typeof l=="function"?(n.pop(),l):t,Ch(n,l)});function Lh(n){var s=S(n);return s.__chain__=!0,s}function ev(n,s){return s(n),n}function Ga(n,s){return s(n)}var tv=Si(function(n){var s=n.length,l=s?n[0]:0,h=this.__wrapped__,x=function(E){return nl(E,n)};return s>1||this.__actions__.length||!(h instanceof pt)||!Ei(l)?this.thru(x):(h=h.slice(l,+l+(s?1:0)),h.__actions__.push({func:Ga,args:[x],thisArg:t}),new On(h,this.__chain__).thru(function(E){return s&&!E.length&&E.push(t),E}))});function nv(){return Lh(this)}function iv(){return new On(this.value(),this.__chain__)}function rv(){this.__values__===t&&(this.__values__=Wh(this.value()));var n=this.__index__>=this.__values__.length,s=n?t:this.__values__[this.__index__++];return{done:n,value:s}}function sv(){return this}function av(n){for(var s,l=this;l instanceof ba;){var h=yh(l);h.__index__=0,h.__values__=t,s?x.__wrapped__=h:s=h;var x=h;l=l.__wrapped__}return x.__wrapped__=n,s}function ov(){var n=this.__wrapped__;if(n instanceof pt){var s=n;return this.__actions__.length&&(s=new pt(this)),s=s.reverse(),s.__actions__.push({func:Ga,args:[Ll],thisArg:t}),new On(s,this.__chain__)}return this.thru(Ll)}function lv(){return Yu(this.__wrapped__,this.__actions__)}var cv=Ua(function(n,s,l){St.call(n,l)?++n[l]:xi(n,l,1)});function uv(n,s,l){var h=Je(n)?su:eg;return l&&hn(n,s,l)&&(s=t),h(n,He(s,3))}function hv(n,s){var l=Je(n)?Fi:Cu;return l(n,He(s,3))}var fv=ih(Ah),dv=ih(Th);function pv(n,s){return Qt(Va(n,s),1)}function mv(n,s){return Qt(Va(n,s),ie)}function gv(n,s,l){return l=l===t?1:tt(l),Qt(Va(n,s),l)}function Ph(n,s){var l=Je(n)?Nn:Hi;return l(n,He(s,3))}function Dh(n,s){var l=Je(n)?Np:Ru;return l(n,He(s,3))}var _v=Ua(function(n,s,l){St.call(n,l)?n[l].push(s):xi(n,l,[s])});function vv(n,s,l,h){n=_n(n)?n:qr(n),l=l&&!h?tt(l):0;var x=n.length;return l<0&&(l=Wt(x+l,0)),qa(n)?l<=x&&n.indexOf(s,l)>-1:!!x&&Nr(n,s,l)>-1}var xv=lt(function(n,s,l){var h=-1,x=typeof s=="function",E=_n(n)?$(n.length):[];return Hi(n,function(L){E[++h]=x?Sn(s,L,l):Os(L,s,l)}),E}),Mv=Ua(function(n,s,l){xi(n,l,s)});function Va(n,s){var l=Je(n)?Lt:Nu;return l(n,He(s,3))}function Sv(n,s,l,h){return n==null?[]:(Je(s)||(s=s==null?[]:[s]),l=h?t:l,Je(l)||(l=l==null?[]:[l]),zu(n,s,l))}var Ev=Ua(function(n,s,l){n[l?0:1].push(s)},function(){return[[],[]]});function yv(n,s,l){var h=Je(n)?ko:cu,x=arguments.length<3;return h(n,He(s,4),l,x,Hi)}function Av(n,s,l){var h=Je(n)?Fp:cu,x=arguments.length<3;return h(n,He(s,4),l,x,Ru)}function Tv(n,s){var l=Je(n)?Fi:Cu;return l(n,Xa(He(s,3)))}function bv(n){var s=Je(n)?Au:vg;return s(n)}function wv(n,s,l){(l?hn(n,s,l):s===t)?s=1:s=tt(s);var h=Je(n)?Km:xg;return h(n,s)}function Rv(n){var s=Je(n)?Zm:Sg;return s(n)}function Cv(n){if(n==null)return 0;if(_n(n))return qa(n)?Or(n):n.length;var s=sn(n);return s==Ue||s==_t?n.size:ll(n).length}function Lv(n,s,l){var h=Je(n)?Wo:Eg;return l&&hn(n,s,l)&&(s=t),h(n,He(s,3))}var Pv=lt(function(n,s){if(n==null)return[];var l=s.length;return l>1&&hn(n,s[0],s[1])?s=[]:l>2&&hn(s[0],s[1],s[2])&&(s=[s[0]]),zu(n,Qt(s,1),[])}),ka=hm||function(){return Jt.Date.now()};function Dv(n,s){if(typeof s!="function")throw new Fn(u);return n=tt(n),function(){if(--n<1)return s.apply(this,arguments)}}function Uh(n,s,l){return s=l?t:s,s=n&&s==null?n.length:s,Mi(n,U,t,t,t,t,s)}function Ih(n,s){var l;if(typeof s!="function")throw new Fn(u);return n=tt(n),function(){return--n>0&&(l=s.apply(this,arguments)),n<=1&&(s=t),l}}var Dl=lt(function(n,s,l){var h=v;if(l.length){var x=Bi(l,Xr(Dl));h|=N}return Mi(n,h,s,l,x)}),Nh=lt(function(n,s,l){var h=v|m;if(l.length){var x=Bi(l,Xr(Nh));h|=N}return Mi(s,h,n,l,x)});function Fh(n,s,l){s=l?t:s;var h=Mi(n,w,t,t,t,t,t,s);return h.placeholder=Fh.placeholder,h}function Oh(n,s,l){s=l?t:s;var h=Mi(n,P,t,t,t,t,t,s);return h.placeholder=Oh.placeholder,h}function Bh(n,s,l){var h,x,E,L,O,G,oe=0,le=!1,he=!1,we=!0;if(typeof n!="function")throw new Fn(u);s=Gn(s)||0,It(l)&&(le=!!l.leading,he="maxWait"in l,E=he?Wt(Gn(l.maxWait)||0,s):E,we="trailing"in l?!!l.trailing:we);function Ne(zt){var $n=h,Ti=x;return h=x=t,oe=zt,L=n.apply(Ti,$n),L}function Ve(zt){return oe=zt,O=Vs(dt,s),le?Ne(zt):L}function nt(zt){var $n=zt-G,Ti=zt-oe,rf=s-$n;return he?rn(rf,E-Ti):rf}function ke(zt){var $n=zt-G,Ti=zt-oe;return G===t||$n>=s||$n<0||he&&Ti>=E}function dt(){var zt=ka();if(ke(zt))return gt(zt);O=Vs(dt,nt(zt))}function gt(zt){return O=t,we&&h?Ne(zt):(h=x=t,L)}function Tn(){O!==t&&$u(O),oe=0,h=G=x=O=t}function fn(){return O===t?L:gt(ka())}function bn(){var zt=ka(),$n=ke(zt);if(h=arguments,x=this,G=zt,$n){if(O===t)return Ve(G);if(he)return $u(O),O=Vs(dt,s),Ne(G)}return O===t&&(O=Vs(dt,s)),L}return bn.cancel=Tn,bn.flush=fn,bn}var Uv=lt(function(n,s){return wu(n,1,s)}),Iv=lt(function(n,s,l){return wu(n,Gn(s)||0,l)});function Nv(n){return Mi(n,b)}function Wa(n,s){if(typeof n!="function"||s!=null&&typeof s!="function")throw new Fn(u);var l=function(){var h=arguments,x=s?s.apply(this,h):h[0],E=l.cache;if(E.has(x))return E.get(x);var L=n.apply(this,h);return l.cache=E.set(x,L)||E,L};return l.cache=new(Wa.Cache||vi),l}Wa.Cache=vi;function Xa(n){if(typeof n!="function")throw new Fn(u);return function(){var s=arguments;switch(s.length){case 0:return!n.call(this);case 1:return!n.call(this,s[0]);case 2:return!n.call(this,s[0],s[1]);case 3:return!n.call(this,s[0],s[1],s[2])}return!n.apply(this,s)}}function Fv(n){return Ih(2,n)}var Ov=yg(function(n,s){s=s.length==1&&Je(s[0])?Lt(s[0],En(He())):Lt(Qt(s,1),En(He()));var l=s.length;return lt(function(h){for(var x=-1,E=rn(h.length,l);++x<E;)h[x]=s[x].call(this,h[x]);return Sn(n,this,h)})}),Ul=lt(function(n,s){var l=Bi(s,Xr(Ul));return Mi(n,N,t,s,l)}),zh=lt(function(n,s){var l=Bi(s,Xr(zh));return Mi(n,H,t,s,l)}),Bv=Si(function(n,s){return Mi(n,ae,t,t,t,s)});function zv(n,s){if(typeof n!="function")throw new Fn(u);return s=s===t?s:tt(s),lt(n,s)}function Hv(n,s){if(typeof n!="function")throw new Fn(u);return s=s==null?0:Wt(tt(s),0),lt(function(l){var h=l[s],x=ki(l,0,s);return h&&Oi(x,h),Sn(n,this,x)})}function Gv(n,s,l){var h=!0,x=!0;if(typeof n!="function")throw new Fn(u);return It(l)&&(h="leading"in l?!!l.leading:h,x="trailing"in l?!!l.trailing:x),Bh(n,s,{leading:h,maxWait:s,trailing:x})}function Vv(n){return Uh(n,1)}function kv(n,s){return Ul(_l(s),n)}function Wv(){if(!arguments.length)return[];var n=arguments[0];return Je(n)?n:[n]}function Xv(n){return Bn(n,M)}function Yv(n,s){return s=typeof s=="function"?s:t,Bn(n,M,s)}function qv(n){return Bn(n,_|M)}function $v(n,s){return s=typeof s=="function"?s:t,Bn(n,_|M,s)}function Kv(n,s){return s==null||bu(n,s,Kt(s))}function qn(n,s){return n===s||n!==n&&s!==s}var Zv=Oa(sl),jv=Oa(function(n,s){return n>=s}),fr=Du(function(){return arguments}())?Du:function(n){return Ot(n)&&St.call(n,"callee")&&!vu.call(n,"callee")},Je=$.isArray,Jv=Qc?En(Qc):ag;function _n(n){return n!=null&&Ya(n.length)&&!yi(n)}function Bt(n){return Ot(n)&&_n(n)}function Qv(n){return n===!0||n===!1||Ot(n)&&un(n)==Fe}var Wi=dm||Wl,e0=eu?En(eu):og;function t0(n){return Ot(n)&&n.nodeType===1&&!ks(n)}function n0(n){if(n==null)return!0;if(_n(n)&&(Je(n)||typeof n=="string"||typeof n.splice=="function"||Wi(n)||Yr(n)||fr(n)))return!n.length;var s=sn(n);if(s==Ue||s==_t)return!n.size;if(Gs(n))return!ll(n).length;for(var l in n)if(St.call(n,l))return!1;return!0}function i0(n,s){return Bs(n,s)}function r0(n,s,l){l=typeof l=="function"?l:t;var h=l?l(n,s):t;return h===t?Bs(n,s,t,l):!!h}function Il(n){if(!Ot(n))return!1;var s=un(n);return s==Ke||s==Gt||typeof n.message=="string"&&typeof n.name=="string"&&!ks(n)}function s0(n){return typeof n=="number"&&Mu(n)}function yi(n){if(!It(n))return!1;var s=un(n);return s==V||s==Nt||s==$e||s==Ze}function Hh(n){return typeof n=="number"&&n==tt(n)}function Ya(n){return typeof n=="number"&&n>-1&&n%1==0&&n<=se}function It(n){var s=typeof n;return n!=null&&(s=="object"||s=="function")}function Ot(n){return n!=null&&typeof n=="object"}var Gh=tu?En(tu):cg;function a0(n,s){return n===s||ol(n,s,Al(s))}function o0(n,s,l){return l=typeof l=="function"?l:t,ol(n,s,Al(s),l)}function l0(n){return Vh(n)&&n!=+n}function c0(n){if(Yg(n))throw new je(o);return Uu(n)}function u0(n){return n===null}function h0(n){return n==null}function Vh(n){return typeof n=="number"||Ot(n)&&un(n)==We}function ks(n){if(!Ot(n)||un(n)!=mt)return!1;var s=xa(n);if(s===null)return!0;var l=St.call(s,"constructor")&&s.constructor;return typeof l=="function"&&l instanceof l&&ma.call(l)==om}var Nl=nu?En(nu):ug;function f0(n){return Hh(n)&&n>=-se&&n<=se}var kh=iu?En(iu):hg;function qa(n){return typeof n=="string"||!Je(n)&&Ot(n)&&un(n)==Rt}function An(n){return typeof n=="symbol"||Ot(n)&&un(n)==C}var Yr=ru?En(ru):fg;function d0(n){return n===t}function p0(n){return Ot(n)&&sn(n)==Y}function m0(n){return Ot(n)&&un(n)==xe}var g0=Oa(cl),_0=Oa(function(n,s){return n<=s});function Wh(n){if(!n)return[];if(_n(n))return qa(n)?Xn(n):gn(n);if(Ls&&n[Ls])return Kp(n[Ls]());var s=sn(n),l=s==Ue?Zo:s==_t?fa:qr;return l(n)}function Ai(n){if(!n)return n===0?n:0;if(n=Gn(n),n===ie||n===-ie){var s=n<0?-1:1;return s*ve}return n===n?n:0}function tt(n){var s=Ai(n),l=s%1;return s===s?l?s-l:s:0}function Xh(n){return n?lr(tt(n),0,q):0}function Gn(n){if(typeof n=="number")return n;if(An(n))return ue;if(It(n)){var s=typeof n.valueOf=="function"?n.valueOf():n;n=It(s)?s+"":s}if(typeof n!="string")return n===0?n:+n;n=uu(n);var l=X.test(n);return l||De.test(n)?Dp(n.slice(2),l?2:8):te.test(n)?ue:+n}function Yh(n){return si(n,vn(n))}function v0(n){return n?lr(tt(n),-se,se):n===0?n:0}function Mt(n){return n==null?"":yn(n)}var x0=kr(function(n,s){if(Gs(s)||_n(s)){si(s,Kt(s),n);return}for(var l in s)St.call(s,l)&&Ns(n,l,s[l])}),qh=kr(function(n,s){si(s,vn(s),n)}),$a=kr(function(n,s,l,h){si(s,vn(s),n,h)}),M0=kr(function(n,s,l,h){si(s,Kt(s),n,h)}),S0=Si(nl);function E0(n,s){var l=Vr(n);return s==null?l:Tu(l,s)}var y0=lt(function(n,s){n=At(n);var l=-1,h=s.length,x=h>2?s[2]:t;for(x&&hn(s[0],s[1],x)&&(h=1);++l<h;)for(var E=s[l],L=vn(E),O=-1,G=L.length;++O<G;){var oe=L[O],le=n[oe];(le===t||qn(le,zr[oe])&&!St.call(n,oe))&&(n[oe]=E[oe])}return n}),A0=lt(function(n){return n.push(t,uh),Sn($h,t,n)});function T0(n,s){return au(n,He(s,3),ri)}function b0(n,s){return au(n,He(s,3),rl)}function w0(n,s){return n==null?n:il(n,He(s,3),vn)}function R0(n,s){return n==null?n:Lu(n,He(s,3),vn)}function C0(n,s){return n&&ri(n,He(s,3))}function L0(n,s){return n&&rl(n,He(s,3))}function P0(n){return n==null?[]:Ca(n,Kt(n))}function D0(n){return n==null?[]:Ca(n,vn(n))}function Fl(n,s,l){var h=n==null?t:cr(n,s);return h===t?l:h}function U0(n,s){return n!=null&&dh(n,s,ng)}function Ol(n,s){return n!=null&&dh(n,s,ig)}var I0=sh(function(n,s,l){s!=null&&typeof s.toString!="function"&&(s=ga.call(s)),n[s]=l},zl(xn)),N0=sh(function(n,s,l){s!=null&&typeof s.toString!="function"&&(s=ga.call(s)),St.call(n,s)?n[s].push(l):n[s]=[l]},He),F0=lt(Os);function Kt(n){return _n(n)?yu(n):ll(n)}function vn(n){return _n(n)?yu(n,!0):dg(n)}function O0(n,s){var l={};return s=He(s,3),ri(n,function(h,x,E){xi(l,s(h,x,E),h)}),l}function B0(n,s){var l={};return s=He(s,3),ri(n,function(h,x,E){xi(l,x,s(h,x,E))}),l}var z0=kr(function(n,s,l){La(n,s,l)}),$h=kr(function(n,s,l,h){La(n,s,l,h)}),H0=Si(function(n,s){var l={};if(n==null)return l;var h=!1;s=Lt(s,function(E){return E=Vi(E,n),h||(h=E.length>1),E}),si(n,El(n),l),h&&(l=Bn(l,_|g|M,Ig));for(var x=s.length;x--;)pl(l,s[x]);return l});function G0(n,s){return Kh(n,Xa(He(s)))}var V0=Si(function(n,s){return n==null?{}:mg(n,s)});function Kh(n,s){if(n==null)return{};var l=Lt(El(n),function(h){return[h]});return s=He(s),Hu(n,l,function(h,x){return s(h,x[0])})}function k0(n,s,l){s=Vi(s,n);var h=-1,x=s.length;for(x||(x=1,n=t);++h<x;){var E=n==null?t:n[ai(s[h])];E===t&&(h=x,E=l),n=yi(E)?E.call(n):E}return n}function W0(n,s,l){return n==null?n:zs(n,s,l)}function X0(n,s,l,h){return h=typeof h=="function"?h:t,n==null?n:zs(n,s,l,h)}var Zh=lh(Kt),jh=lh(vn);function Y0(n,s,l){var h=Je(n),x=h||Wi(n)||Yr(n);if(s=He(s,4),l==null){var E=n&&n.constructor;x?l=h?new E:[]:It(n)?l=yi(E)?Vr(xa(n)):{}:l={}}return(x?Nn:ri)(n,function(L,O,G){return s(l,L,O,G)}),l}function q0(n,s){return n==null?!0:pl(n,s)}function $0(n,s,l){return n==null?n:Xu(n,s,_l(l))}function K0(n,s,l,h){return h=typeof h=="function"?h:t,n==null?n:Xu(n,s,_l(l),h)}function qr(n){return n==null?[]:Ko(n,Kt(n))}function Z0(n){return n==null?[]:Ko(n,vn(n))}function j0(n,s,l){return l===t&&(l=s,s=t),l!==t&&(l=Gn(l),l=l===l?l:0),s!==t&&(s=Gn(s),s=s===s?s:0),lr(Gn(n),s,l)}function J0(n,s,l){return s=Ai(s),l===t?(l=s,s=0):l=Ai(l),n=Gn(n),rg(n,s,l)}function Q0(n,s,l){if(l&&typeof l!="boolean"&&hn(n,s,l)&&(s=l=t),l===t&&(typeof s=="boolean"?(l=s,s=t):typeof n=="boolean"&&(l=n,n=t)),n===t&&s===t?(n=0,s=1):(n=Ai(n),s===t?(s=n,n=0):s=Ai(s)),n>s){var h=n;n=s,s=h}if(l||n%1||s%1){var x=Su();return rn(n+x*(s-n+Pp("1e-"+((x+"").length-1))),s)}return hl(n,s)}var ex=Wr(function(n,s,l){return s=s.toLowerCase(),n+(l?Jh(s):s)});function Jh(n){return Bl(Mt(n).toLowerCase())}function Qh(n){return n=Mt(n),n&&n.replace(qe,Wp).replace(Sp,"")}function tx(n,s,l){n=Mt(n),s=yn(s);var h=n.length;l=l===t?h:lr(tt(l),0,h);var x=l;return l-=s.length,l>=0&&n.slice(l,x)==s}function nx(n){return n=Mt(n),n&&at.test(n)?n.replace(me,Xp):n}function ix(n){return n=Mt(n),n&&oa.test(n)?n.replace(Rr,"\\$&"):n}var rx=Wr(function(n,s,l){return n+(l?"-":"")+s.toLowerCase()}),sx=Wr(function(n,s,l){return n+(l?" ":"")+s.toLowerCase()}),ax=nh("toLowerCase");function ox(n,s,l){n=Mt(n),s=tt(s);var h=s?Or(n):0;if(!s||h>=s)return n;var x=(s-h)/2;return Fa(ya(x),l)+n+Fa(Ea(x),l)}function lx(n,s,l){n=Mt(n),s=tt(s);var h=s?Or(n):0;return s&&h<s?n+Fa(s-h,l):n}function cx(n,s,l){n=Mt(n),s=tt(s);var h=s?Or(n):0;return s&&h<s?Fa(s-h,l)+n:n}function ux(n,s,l){return l||s==null?s=0:s&&(s=+s),_m(Mt(n).replace(Ts,""),s||0)}function hx(n,s,l){return(l?hn(n,s,l):s===t)?s=1:s=tt(s),fl(Mt(n),s)}function fx(){var n=arguments,s=Mt(n[0]);return n.length<3?s:s.replace(n[1],n[2])}var dx=Wr(function(n,s,l){return n+(l?"_":"")+s.toLowerCase()});function px(n,s,l){return l&&typeof l!="number"&&hn(n,s,l)&&(s=l=t),l=l===t?q:l>>>0,l?(n=Mt(n),n&&(typeof s=="string"||s!=null&&!Nl(s))&&(s=yn(s),!s&&Fr(n))?ki(Xn(n),0,l):n.split(s,l)):[]}var mx=Wr(function(n,s,l){return n+(l?" ":"")+Bl(s)});function gx(n,s,l){return n=Mt(n),l=l==null?0:lr(tt(l),0,n.length),s=yn(s),n.slice(l,l+s.length)==s}function _x(n,s,l){var h=S.templateSettings;l&&hn(n,s,l)&&(s=t),n=Mt(n),s=$a({},s,h,ch);var x=$a({},s.imports,h.imports,ch),E=Kt(x),L=Ko(x,E),O,G,oe=0,le=s.interpolate||Ge,he="__p += '",we=jo((s.escape||Ge).source+"|"+le.source+"|"+(le===nn?R:Ge).source+"|"+(s.evaluate||Ge).source+"|$","g"),Ne="//# sourceURL="+(St.call(s,"sourceURL")?(s.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++bp+"]")+`
`;n.replace(we,function(ke,dt,gt,Tn,fn,bn){return gt||(gt=Tn),he+=n.slice(oe,bn).replace(ot,Yp),dt&&(O=!0,he+=`' +
__e(`+dt+`) +
'`),fn&&(G=!0,he+=`';
`+fn+`;
__p += '`),gt&&(he+=`' +
((__t = (`+gt+`)) == null ? '' : __t) +
'`),oe=bn+ke.length,ke}),he+=`';
`;var Ve=St.call(s,"variable")&&s.variable;if(!Ve)he=`with (obj) {
`+he+`
}
`;else if(Uo.test(Ve))throw new je(c);he=(G?he.replace(ft,""):he).replace(B,"$1").replace(Te,"$1;"),he="function("+(Ve||"obj")+`) {
`+(Ve?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(O?", __e = _.escape":"")+(G?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+he+`return __p
}`;var nt=tf(function(){return xt(E,Ne+"return "+he).apply(t,L)});if(nt.source=he,Il(nt))throw nt;return nt}function vx(n){return Mt(n).toLowerCase()}function xx(n){return Mt(n).toUpperCase()}function Mx(n,s,l){if(n=Mt(n),n&&(l||s===t))return uu(n);if(!n||!(s=yn(s)))return n;var h=Xn(n),x=Xn(s),E=hu(h,x),L=fu(h,x)+1;return ki(h,E,L).join("")}function Sx(n,s,l){if(n=Mt(n),n&&(l||s===t))return n.slice(0,pu(n)+1);if(!n||!(s=yn(s)))return n;var h=Xn(n),x=fu(h,Xn(s))+1;return ki(h,0,x).join("")}function Ex(n,s,l){if(n=Mt(n),n&&(l||s===t))return n.replace(Ts,"");if(!n||!(s=yn(s)))return n;var h=Xn(n),x=hu(h,Xn(s));return ki(h,x).join("")}function yx(n,s){var l=D,h=de;if(It(s)){var x="separator"in s?s.separator:x;l="length"in s?tt(s.length):l,h="omission"in s?yn(s.omission):h}n=Mt(n);var E=n.length;if(Fr(n)){var L=Xn(n);E=L.length}if(l>=E)return n;var O=l-Or(h);if(O<1)return h;var G=L?ki(L,0,O).join(""):n.slice(0,O);if(x===t)return G+h;if(L&&(O+=G.length-O),Nl(x)){if(n.slice(O).search(x)){var oe,le=G;for(x.global||(x=jo(x.source,Mt(k.exec(x))+"g")),x.lastIndex=0;oe=x.exec(le);)var he=oe.index;G=G.slice(0,he===t?O:he)}}else if(n.indexOf(yn(x),O)!=O){var we=G.lastIndexOf(x);we>-1&&(G=G.slice(0,we))}return G+h}function Ax(n){return n=Mt(n),n&&Ee.test(n)?n.replace(j,Qp):n}var Tx=Wr(function(n,s,l){return n+(l?" ":"")+s.toUpperCase()}),Bl=nh("toUpperCase");function ef(n,s,l){return n=Mt(n),s=l?t:s,s===t?$p(n)?nm(n):zp(n):n.match(s)||[]}var tf=lt(function(n,s){try{return Sn(n,t,s)}catch(l){return Il(l)?l:new je(l)}}),bx=Si(function(n,s){return Nn(s,function(l){l=ai(l),xi(n,l,Dl(n[l],n))}),n});function wx(n){var s=n==null?0:n.length,l=He();return n=s?Lt(n,function(h){if(typeof h[1]!="function")throw new Fn(u);return[l(h[0]),h[1]]}):[],lt(function(h){for(var x=-1;++x<s;){var E=n[x];if(Sn(E[0],this,h))return Sn(E[1],this,h)}})}function Rx(n){return Qm(Bn(n,_))}function zl(n){return function(){return n}}function Cx(n,s){return n==null||n!==n?s:n}var Lx=rh(),Px=rh(!0);function xn(n){return n}function Hl(n){return Iu(typeof n=="function"?n:Bn(n,_))}function Dx(n){return Fu(Bn(n,_))}function Ux(n,s){return Ou(n,Bn(s,_))}var Ix=lt(function(n,s){return function(l){return Os(l,n,s)}}),Nx=lt(function(n,s){return function(l){return Os(n,l,s)}});function Gl(n,s,l){var h=Kt(s),x=Ca(s,h);l==null&&!(It(s)&&(x.length||!h.length))&&(l=s,s=n,n=this,x=Ca(s,Kt(s)));var E=!(It(l)&&"chain"in l)||!!l.chain,L=yi(n);return Nn(x,function(O){var G=s[O];n[O]=G,L&&(n.prototype[O]=function(){var oe=this.__chain__;if(E||oe){var le=n(this.__wrapped__),he=le.__actions__=gn(this.__actions__);return he.push({func:G,args:arguments,thisArg:n}),le.__chain__=oe,le}return G.apply(n,Oi([this.value()],arguments))})}),n}function Fx(){return Jt._===this&&(Jt._=lm),this}function Vl(){}function Ox(n){return n=tt(n),lt(function(s){return Bu(s,n)})}var Bx=xl(Lt),zx=xl(su),Hx=xl(Wo);function nf(n){return bl(n)?Xo(ai(n)):gg(n)}function Gx(n){return function(s){return n==null?t:cr(n,s)}}var Vx=ah(),kx=ah(!0);function kl(){return[]}function Wl(){return!1}function Wx(){return{}}function Xx(){return""}function Yx(){return!0}function qx(n,s){if(n=tt(n),n<1||n>se)return[];var l=q,h=rn(n,q);s=He(s),n-=q;for(var x=$o(h,s);++l<n;)s(l);return x}function $x(n){return Je(n)?Lt(n,ai):An(n)?[n]:gn(Eh(Mt(n)))}function Kx(n){var s=++am;return Mt(n)+s}var Zx=Na(function(n,s){return n+s},0),jx=Ml("ceil"),Jx=Na(function(n,s){return n/s},1),Qx=Ml("floor");function eM(n){return n&&n.length?Ra(n,xn,sl):t}function tM(n,s){return n&&n.length?Ra(n,He(s,2),sl):t}function nM(n){return lu(n,xn)}function iM(n,s){return lu(n,He(s,2))}function rM(n){return n&&n.length?Ra(n,xn,cl):t}function sM(n,s){return n&&n.length?Ra(n,He(s,2),cl):t}var aM=Na(function(n,s){return n*s},1),oM=Ml("round"),lM=Na(function(n,s){return n-s},0);function cM(n){return n&&n.length?qo(n,xn):0}function uM(n,s){return n&&n.length?qo(n,He(s,2)):0}return S.after=Dv,S.ary=Uh,S.assign=x0,S.assignIn=qh,S.assignInWith=$a,S.assignWith=M0,S.at=S0,S.before=Ih,S.bind=Dl,S.bindAll=bx,S.bindKey=Nh,S.castArray=Wv,S.chain=Lh,S.chunk=Qg,S.compact=e_,S.concat=t_,S.cond=wx,S.conforms=Rx,S.constant=zl,S.countBy=cv,S.create=E0,S.curry=Fh,S.curryRight=Oh,S.debounce=Bh,S.defaults=y0,S.defaultsDeep=A0,S.defer=Uv,S.delay=Iv,S.difference=n_,S.differenceBy=i_,S.differenceWith=r_,S.drop=s_,S.dropRight=a_,S.dropRightWhile=o_,S.dropWhile=l_,S.fill=c_,S.filter=hv,S.flatMap=pv,S.flatMapDeep=mv,S.flatMapDepth=gv,S.flatten=bh,S.flattenDeep=u_,S.flattenDepth=h_,S.flip=Nv,S.flow=Lx,S.flowRight=Px,S.fromPairs=f_,S.functions=P0,S.functionsIn=D0,S.groupBy=_v,S.initial=p_,S.intersection=m_,S.intersectionBy=g_,S.intersectionWith=__,S.invert=I0,S.invertBy=N0,S.invokeMap=xv,S.iteratee=Hl,S.keyBy=Mv,S.keys=Kt,S.keysIn=vn,S.map=Va,S.mapKeys=O0,S.mapValues=B0,S.matches=Dx,S.matchesProperty=Ux,S.memoize=Wa,S.merge=z0,S.mergeWith=$h,S.method=Ix,S.methodOf=Nx,S.mixin=Gl,S.negate=Xa,S.nthArg=Ox,S.omit=H0,S.omitBy=G0,S.once=Fv,S.orderBy=Sv,S.over=Bx,S.overArgs=Ov,S.overEvery=zx,S.overSome=Hx,S.partial=Ul,S.partialRight=zh,S.partition=Ev,S.pick=V0,S.pickBy=Kh,S.property=nf,S.propertyOf=Gx,S.pull=S_,S.pullAll=Rh,S.pullAllBy=E_,S.pullAllWith=y_,S.pullAt=A_,S.range=Vx,S.rangeRight=kx,S.rearg=Bv,S.reject=Tv,S.remove=T_,S.rest=zv,S.reverse=Ll,S.sampleSize=wv,S.set=W0,S.setWith=X0,S.shuffle=Rv,S.slice=b_,S.sortBy=Pv,S.sortedUniq=U_,S.sortedUniqBy=I_,S.split=px,S.spread=Hv,S.tail=N_,S.take=F_,S.takeRight=O_,S.takeRightWhile=B_,S.takeWhile=z_,S.tap=ev,S.throttle=Gv,S.thru=Ga,S.toArray=Wh,S.toPairs=Zh,S.toPairsIn=jh,S.toPath=$x,S.toPlainObject=Yh,S.transform=Y0,S.unary=Vv,S.union=H_,S.unionBy=G_,S.unionWith=V_,S.uniq=k_,S.uniqBy=W_,S.uniqWith=X_,S.unset=q0,S.unzip=Pl,S.unzipWith=Ch,S.update=$0,S.updateWith=K0,S.values=qr,S.valuesIn=Z0,S.without=Y_,S.words=ef,S.wrap=kv,S.xor=q_,S.xorBy=$_,S.xorWith=K_,S.zip=Z_,S.zipObject=j_,S.zipObjectDeep=J_,S.zipWith=Q_,S.entries=Zh,S.entriesIn=jh,S.extend=qh,S.extendWith=$a,Gl(S,S),S.add=Zx,S.attempt=tf,S.camelCase=ex,S.capitalize=Jh,S.ceil=jx,S.clamp=j0,S.clone=Xv,S.cloneDeep=qv,S.cloneDeepWith=$v,S.cloneWith=Yv,S.conformsTo=Kv,S.deburr=Qh,S.defaultTo=Cx,S.divide=Jx,S.endsWith=tx,S.eq=qn,S.escape=nx,S.escapeRegExp=ix,S.every=uv,S.find=fv,S.findIndex=Ah,S.findKey=T0,S.findLast=dv,S.findLastIndex=Th,S.findLastKey=b0,S.floor=Qx,S.forEach=Ph,S.forEachRight=Dh,S.forIn=w0,S.forInRight=R0,S.forOwn=C0,S.forOwnRight=L0,S.get=Fl,S.gt=Zv,S.gte=jv,S.has=U0,S.hasIn=Ol,S.head=wh,S.identity=xn,S.includes=vv,S.indexOf=d_,S.inRange=J0,S.invoke=F0,S.isArguments=fr,S.isArray=Je,S.isArrayBuffer=Jv,S.isArrayLike=_n,S.isArrayLikeObject=Bt,S.isBoolean=Qv,S.isBuffer=Wi,S.isDate=e0,S.isElement=t0,S.isEmpty=n0,S.isEqual=i0,S.isEqualWith=r0,S.isError=Il,S.isFinite=s0,S.isFunction=yi,S.isInteger=Hh,S.isLength=Ya,S.isMap=Gh,S.isMatch=a0,S.isMatchWith=o0,S.isNaN=l0,S.isNative=c0,S.isNil=h0,S.isNull=u0,S.isNumber=Vh,S.isObject=It,S.isObjectLike=Ot,S.isPlainObject=ks,S.isRegExp=Nl,S.isSafeInteger=f0,S.isSet=kh,S.isString=qa,S.isSymbol=An,S.isTypedArray=Yr,S.isUndefined=d0,S.isWeakMap=p0,S.isWeakSet=m0,S.join=v_,S.kebabCase=rx,S.last=Hn,S.lastIndexOf=x_,S.lowerCase=sx,S.lowerFirst=ax,S.lt=g0,S.lte=_0,S.max=eM,S.maxBy=tM,S.mean=nM,S.meanBy=iM,S.min=rM,S.minBy=sM,S.stubArray=kl,S.stubFalse=Wl,S.stubObject=Wx,S.stubString=Xx,S.stubTrue=Yx,S.multiply=aM,S.nth=M_,S.noConflict=Fx,S.noop=Vl,S.now=ka,S.pad=ox,S.padEnd=lx,S.padStart=cx,S.parseInt=ux,S.random=Q0,S.reduce=yv,S.reduceRight=Av,S.repeat=hx,S.replace=fx,S.result=k0,S.round=oM,S.runInContext=z,S.sample=bv,S.size=Cv,S.snakeCase=dx,S.some=Lv,S.sortedIndex=w_,S.sortedIndexBy=R_,S.sortedIndexOf=C_,S.sortedLastIndex=L_,S.sortedLastIndexBy=P_,S.sortedLastIndexOf=D_,S.startCase=mx,S.startsWith=gx,S.subtract=lM,S.sum=cM,S.sumBy=uM,S.template=_x,S.times=qx,S.toFinite=Ai,S.toInteger=tt,S.toLength=Xh,S.toLower=vx,S.toNumber=Gn,S.toSafeInteger=v0,S.toString=Mt,S.toUpper=xx,S.trim=Mx,S.trimEnd=Sx,S.trimStart=Ex,S.truncate=yx,S.unescape=Ax,S.uniqueId=Kx,S.upperCase=Tx,S.upperFirst=Bl,S.each=Ph,S.eachRight=Dh,S.first=wh,Gl(S,function(){var n={};return ri(S,function(s,l){St.call(S.prototype,l)||(n[l]=s)}),n}(),{chain:!1}),S.VERSION=i,Nn(["bind","bindKey","curry","curryRight","partial","partialRight"],function(n){S[n].placeholder=S}),Nn(["drop","take"],function(n,s){pt.prototype[n]=function(l){l=l===t?1:Wt(tt(l),0);var h=this.__filtered__&&!s?new pt(this):this.clone();return h.__filtered__?h.__takeCount__=rn(l,h.__takeCount__):h.__views__.push({size:rn(l,q),type:n+(h.__dir__<0?"Right":"")}),h},pt.prototype[n+"Right"]=function(l){return this.reverse()[n](l).reverse()}}),Nn(["filter","map","takeWhile"],function(n,s){var l=s+1,h=l==ee||l==pe;pt.prototype[n]=function(x){var E=this.clone();return E.__iteratees__.push({iteratee:He(x,3),type:l}),E.__filtered__=E.__filtered__||h,E}}),Nn(["head","last"],function(n,s){var l="take"+(s?"Right":"");pt.prototype[n]=function(){return this[l](1).value()[0]}}),Nn(["initial","tail"],function(n,s){var l="drop"+(s?"":"Right");pt.prototype[n]=function(){return this.__filtered__?new pt(this):this[l](1)}}),pt.prototype.compact=function(){return this.filter(xn)},pt.prototype.find=function(n){return this.filter(n).head()},pt.prototype.findLast=function(n){return this.reverse().find(n)},pt.prototype.invokeMap=lt(function(n,s){return typeof n=="function"?new pt(this):this.map(function(l){return Os(l,n,s)})}),pt.prototype.reject=function(n){return this.filter(Xa(He(n)))},pt.prototype.slice=function(n,s){n=tt(n);var l=this;return l.__filtered__&&(n>0||s<0)?new pt(l):(n<0?l=l.takeRight(-n):n&&(l=l.drop(n)),s!==t&&(s=tt(s),l=s<0?l.dropRight(-s):l.take(s-n)),l)},pt.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},pt.prototype.toArray=function(){return this.take(q)},ri(pt.prototype,function(n,s){var l=/^(?:filter|find|map|reject)|While$/.test(s),h=/^(?:head|last)$/.test(s),x=S[h?"take"+(s=="last"?"Right":""):s],E=h||/^find/.test(s);x&&(S.prototype[s]=function(){var L=this.__wrapped__,O=h?[1]:arguments,G=L instanceof pt,oe=O[0],le=G||Je(L),he=function(dt){var gt=x.apply(S,Oi([dt],O));return h&&we?gt[0]:gt};le&&l&&typeof oe=="function"&&oe.length!=1&&(G=le=!1);var we=this.__chain__,Ne=!!this.__actions__.length,Ve=E&&!we,nt=G&&!Ne;if(!E&&le){L=nt?L:new pt(this);var ke=n.apply(L,O);return ke.__actions__.push({func:Ga,args:[he],thisArg:t}),new On(ke,we)}return Ve&&nt?n.apply(this,O):(ke=this.thru(he),Ve?h?ke.value()[0]:ke.value():ke)})}),Nn(["pop","push","shift","sort","splice","unshift"],function(n){var s=da[n],l=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",h=/^(?:pop|shift)$/.test(n);S.prototype[n]=function(){var x=arguments;if(h&&!this.__chain__){var E=this.value();return s.apply(Je(E)?E:[],x)}return this[l](function(L){return s.apply(Je(L)?L:[],x)})}}),ri(pt.prototype,function(n,s){var l=S[s];if(l){var h=l.name+"";St.call(Gr,h)||(Gr[h]=[]),Gr[h].push({name:s,func:l})}}),Gr[Ia(t,m).name]=[{name:"wrapper",func:t}],pt.prototype.clone=Am,pt.prototype.reverse=Tm,pt.prototype.value=bm,S.prototype.at=tv,S.prototype.chain=nv,S.prototype.commit=iv,S.prototype.next=rv,S.prototype.plant=av,S.prototype.reverse=ov,S.prototype.toJSON=S.prototype.valueOf=S.prototype.value=lv,S.prototype.first=S.prototype.head,Ls&&(S.prototype[Ls]=sv),S},Br=im();rr?((rr.exports=Br)._=Br,Ho._=Br):Jt._=Br}).call(Ws)})(Mo,Mo.exports);var bM=Mo.exports;const wM=TM(bM);/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uc="156",$r={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Kr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},RM=0,af=1,CM=2,wd=1,LM=2,Di=3,nr=0,Mn=1,li=2,Ji=0,gs=1,of=2,lf=3,cf=4,PM=5,fs=100,DM=101,UM=102,uf=103,hf=104,IM=200,NM=201,FM=202,OM=203,Rd=204,Cd=205,BM=206,zM=207,HM=208,GM=209,VM=210,kM=0,WM=1,XM=2,yc=3,YM=4,qM=5,$M=6,KM=7,Ld=0,ZM=1,jM=2,Qi=0,JM=1,QM=2,eS=3,tS=4,nS=5,Pd=300,xs=301,Ms=302,Ac=303,Tc=304,To=306,bc=1e3,ei=1001,wc=1002,mn=1003,ff=1004,Yl=1005,kn=1006,iS=1007,ta=1008,er=1009,rS=1010,sS=1011,Ic=1012,Dd=1013,Zi=1014,ji=1015,na=1016,Ud=1017,Id=1018,xr=1020,aS=1021,ti=1023,oS=1024,lS=1025,Mr=1026,Ss=1027,cS=1028,Nd=1029,uS=1030,Fd=1031,Od=1033,ql=33776,$l=33777,Kl=33778,Zl=33779,df=35840,pf=35841,mf=35842,gf=35843,hS=36196,_f=37492,vf=37496,xf=37808,Mf=37809,Sf=37810,Ef=37811,yf=37812,Af=37813,Tf=37814,bf=37815,wf=37816,Rf=37817,Cf=37818,Lf=37819,Pf=37820,Df=37821,jl=36492,Uf=36494,If=36495,fS=36283,Nf=36284,Ff=36285,Of=36286,Bd=3e3,Sr=3001,dS=3200,pS=3201,mS=0,gS=1,Er="",Pt="srgb",pi="srgb-linear",bo="display-p3",Jl=7680,_S=519,vS=512,xS=513,MS=514,SS=515,ES=516,yS=517,AS=518,TS=519,Bf=35044,zf="300 es",Rc=1035,Ui=2e3,So=2001;class br{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const o=a.indexOf(t);o!==-1&&a.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let o=0,u=a.length;o<u;o++)a[o].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hf=1234567;const js=Math.PI/180,ia=180/Math.PI;function ys(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(an[r&255]+an[r>>8&255]+an[r>>16&255]+an[r>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]).toLowerCase()}function ln(r,e,t){return Math.max(e,Math.min(t,r))}function Nc(r,e){return(r%e+e)%e}function bS(r,e,t,i,a){return i+(r-e)*(a-i)/(t-e)}function wS(r,e,t){return r!==e?(t-r)/(e-r):0}function Js(r,e,t){return(1-t)*r+t*e}function RS(r,e,t,i){return Js(r,e,1-Math.exp(-t*i))}function CS(r,e=1){return e-Math.abs(Nc(r,e*2)-e)}function LS(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function PS(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function DS(r,e){return r+Math.floor(Math.random()*(e-r+1))}function US(r,e){return r+Math.random()*(e-r)}function IS(r){return r*(.5-Math.random())}function NS(r){r!==void 0&&(Hf=r);let e=Hf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function FS(r){return r*js}function OS(r){return r*ia}function Cc(r){return(r&r-1)===0&&r!==0}function BS(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Eo(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function zS(r,e,t,i,a){const o=Math.cos,u=Math.sin,c=o(t/2),f=u(t/2),d=o((e+i)/2),p=u((e+i)/2),_=o((e-i)/2),g=u((e-i)/2),M=o((i-e)/2),T=u((i-e)/2);switch(a){case"XYX":r.set(c*p,f*_,f*g,c*d);break;case"YZY":r.set(f*g,c*p,f*_,c*d);break;case"ZXZ":r.set(f*_,f*g,c*p,c*d);break;case"XZX":r.set(c*p,f*T,f*M,c*d);break;case"YXY":r.set(f*M,c*p,f*T,c*d);break;case"ZYZ":r.set(f*T,f*M,c*p,c*d);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function ds(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function dn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const HS={DEG2RAD:js,RAD2DEG:ia,generateUUID:ys,clamp:ln,euclideanModulo:Nc,mapLinear:bS,inverseLerp:wS,lerp:Js,damp:RS,pingpong:CS,smoothstep:LS,smootherstep:PS,randInt:DS,randFloat:US,randFloatSpread:IS,seededRandom:NS,degToRad:FS,radToDeg:OS,isPowerOfTwo:Cc,ceilPowerOfTwo:BS,floorPowerOfTwo:Eo,setQuaternionFromProperEuler:zS,normalize:dn,denormalize:ds};class ht{constructor(e=0,t=0){ht.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6],this.y=a[1]*t+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ln(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),a=Math.sin(t),o=this.x-e.x,u=this.y-e.y;return this.x=o*i-u*a+e.x,this.y=o*a+u*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ut{constructor(e,t,i,a,o,u,c,f,d){ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,a,o,u,c,f,d)}set(e,t,i,a,o,u,c,f,d){const p=this.elements;return p[0]=e,p[1]=a,p[2]=c,p[3]=t,p[4]=o,p[5]=f,p[6]=i,p[7]=u,p[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,o=this.elements,u=i[0],c=i[3],f=i[6],d=i[1],p=i[4],_=i[7],g=i[2],M=i[5],T=i[8],A=a[0],v=a[3],m=a[6],F=a[1],w=a[4],P=a[7],N=a[2],H=a[5],U=a[8];return o[0]=u*A+c*F+f*N,o[3]=u*v+c*w+f*H,o[6]=u*m+c*P+f*U,o[1]=d*A+p*F+_*N,o[4]=d*v+p*w+_*H,o[7]=d*m+p*P+_*U,o[2]=g*A+M*F+T*N,o[5]=g*v+M*w+T*H,o[8]=g*m+M*P+T*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],a=e[2],o=e[3],u=e[4],c=e[5],f=e[6],d=e[7],p=e[8];return t*u*p-t*c*d-i*o*p+i*c*f+a*o*d-a*u*f}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],o=e[3],u=e[4],c=e[5],f=e[6],d=e[7],p=e[8],_=p*u-c*d,g=c*f-p*o,M=d*o-u*f,T=t*_+i*g+a*M;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=_*A,e[1]=(a*d-p*i)*A,e[2]=(c*i-a*u)*A,e[3]=g*A,e[4]=(p*t-a*f)*A,e[5]=(a*o-c*t)*A,e[6]=M*A,e[7]=(i*f-d*t)*A,e[8]=(u*t-i*o)*A,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,a,o,u,c){const f=Math.cos(o),d=Math.sin(o);return this.set(i*f,i*d,-i*(f*u+d*c)+u+e,-a*d,a*f,-a*(-d*u+f*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(Ql.makeScale(e,t)),this}rotate(e){return this.premultiply(Ql.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ql.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<9;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ql=new ut;function zd(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function yo(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function GS(){const r=yo("canvas");return r.style.display="block",r}const Gf={};function Qs(r){r in Gf||(Gf[r]=!0,console.warn(r))}function _s(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ec(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const VS=new ut().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),kS=new ut().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function WS(r){return r.convertSRGBToLinear().applyMatrix3(kS)}function XS(r){return r.applyMatrix3(VS).convertLinearToSRGB()}const YS={[pi]:r=>r,[Pt]:r=>r.convertSRGBToLinear(),[bo]:WS},qS={[pi]:r=>r,[Pt]:r=>r.convertLinearToSRGB(),[bo]:XS},Kn={enabled:!0,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(r){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!r},get workingColorSpace(){return pi},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const i=YS[e],a=qS[t];if(i===void 0||a===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return a(i(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)}};let Zr;class Hd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Zr===void 0&&(Zr=yo("canvas")),Zr.width=e.width,Zr.height=e.height;const i=Zr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Zr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=yo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),o=a.data;for(let u=0;u<o.length;u++)o[u]=_s(o[u]/255)*255;return i.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(_s(t[i]/255)*255):t[i]=_s(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let $S=0;class Gd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$S++}),this.uuid=ys(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let o;if(Array.isArray(a)){o=[];for(let u=0,c=a.length;u<c;u++)a[u].isDataTexture?o.push(tc(a[u].image)):o.push(tc(a[u]))}else o=tc(a);i.url=o}return t||(e.images[this.uuid]=i),i}}function tc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Hd.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let KS=0;class Cn extends br{constructor(e=Cn.DEFAULT_IMAGE,t=Cn.DEFAULT_MAPPING,i=ei,a=ei,o=kn,u=ta,c=ti,f=er,d=Cn.DEFAULT_ANISOTROPY,p=Er){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:KS++}),this.uuid=ys(),this.name="",this.source=new Gd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=o,this.minFilter=u,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=f,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof p=="string"?this.colorSpace=p:(Qs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=p===Sr?Pt:Er),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bc:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case wc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bc:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case wc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Qs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Pt?Sr:Bd}set encoding(e){Qs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Sr?Pt:Er}}Cn.DEFAULT_IMAGE=null;Cn.DEFAULT_MAPPING=Pd;Cn.DEFAULT_ANISOTROPY=1;class en{constructor(e=0,t=0,i=0,a=1){en.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,a){return this.x=e,this.y=t,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,o=this.w,u=e.elements;return this.x=u[0]*t+u[4]*i+u[8]*a+u[12]*o,this.y=u[1]*t+u[5]*i+u[9]*a+u[13]*o,this.z=u[2]*t+u[6]*i+u[10]*a+u[14]*o,this.w=u[3]*t+u[7]*i+u[11]*a+u[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,a,o;const f=e.elements,d=f[0],p=f[4],_=f[8],g=f[1],M=f[5],T=f[9],A=f[2],v=f[6],m=f[10];if(Math.abs(p-g)<.01&&Math.abs(_-A)<.01&&Math.abs(T-v)<.01){if(Math.abs(p+g)<.1&&Math.abs(_+A)<.1&&Math.abs(T+v)<.1&&Math.abs(d+M+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(d+1)/2,P=(M+1)/2,N=(m+1)/2,H=(p+g)/4,U=(_+A)/4,ae=(T+v)/4;return w>P&&w>N?w<.01?(i=0,a=.707106781,o=.707106781):(i=Math.sqrt(w),a=H/i,o=U/i):P>N?P<.01?(i=.707106781,a=0,o=.707106781):(a=Math.sqrt(P),i=H/a,o=ae/a):N<.01?(i=.707106781,a=.707106781,o=0):(o=Math.sqrt(N),i=U/o,a=ae/o),this.set(i,a,o,t),this}let F=Math.sqrt((v-T)*(v-T)+(_-A)*(_-A)+(g-p)*(g-p));return Math.abs(F)<.001&&(F=1),this.x=(v-T)/F,this.y=(_-A)/F,this.z=(g-p)/F,this.w=Math.acos((d+M+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ZS extends br{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new en(0,0,e,t),this.scissorTest=!1,this.viewport=new en(0,0,e,t);const a={width:e,height:t,depth:1};i.encoding!==void 0&&(Qs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Sr?Pt:Er),this.texture=new Cn(a,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.internalFormat=i.internalFormat!==void 0?i.internalFormat:null,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:kn,this.depthBuffer=i.depthBuffer!==void 0?i.depthBuffer:!0,this.stencilBuffer=i.stencilBuffer!==void 0?i.stencilBuffer:!1,this.depthTexture=i.depthTexture!==void 0?i.depthTexture:null,this.samples=i.samples!==void 0?i.samples:0}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Gd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ar extends ZS{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Vd extends Cn{constructor(e=null,t=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=mn,this.minFilter=mn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jS extends Cn{constructor(e=null,t=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=mn,this.minFilter=mn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tr{constructor(e=0,t=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=a}static slerpFlat(e,t,i,a,o,u,c){let f=i[a+0],d=i[a+1],p=i[a+2],_=i[a+3];const g=o[u+0],M=o[u+1],T=o[u+2],A=o[u+3];if(c===0){e[t+0]=f,e[t+1]=d,e[t+2]=p,e[t+3]=_;return}if(c===1){e[t+0]=g,e[t+1]=M,e[t+2]=T,e[t+3]=A;return}if(_!==A||f!==g||d!==M||p!==T){let v=1-c;const m=f*g+d*M+p*T+_*A,F=m>=0?1:-1,w=1-m*m;if(w>Number.EPSILON){const N=Math.sqrt(w),H=Math.atan2(N,m*F);v=Math.sin(v*H)/N,c=Math.sin(c*H)/N}const P=c*F;if(f=f*v+g*P,d=d*v+M*P,p=p*v+T*P,_=_*v+A*P,v===1-c){const N=1/Math.sqrt(f*f+d*d+p*p+_*_);f*=N,d*=N,p*=N,_*=N}}e[t]=f,e[t+1]=d,e[t+2]=p,e[t+3]=_}static multiplyQuaternionsFlat(e,t,i,a,o,u){const c=i[a],f=i[a+1],d=i[a+2],p=i[a+3],_=o[u],g=o[u+1],M=o[u+2],T=o[u+3];return e[t]=c*T+p*_+f*M-d*g,e[t+1]=f*T+p*g+d*_-c*M,e[t+2]=d*T+p*M+c*g-f*_,e[t+3]=p*T-c*_-f*g-d*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,a){return this._x=e,this._y=t,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,a=e._y,o=e._z,u=e._order,c=Math.cos,f=Math.sin,d=c(i/2),p=c(a/2),_=c(o/2),g=f(i/2),M=f(a/2),T=f(o/2);switch(u){case"XYZ":this._x=g*p*_+d*M*T,this._y=d*M*_-g*p*T,this._z=d*p*T+g*M*_,this._w=d*p*_-g*M*T;break;case"YXZ":this._x=g*p*_+d*M*T,this._y=d*M*_-g*p*T,this._z=d*p*T-g*M*_,this._w=d*p*_+g*M*T;break;case"ZXY":this._x=g*p*_-d*M*T,this._y=d*M*_+g*p*T,this._z=d*p*T+g*M*_,this._w=d*p*_-g*M*T;break;case"ZYX":this._x=g*p*_-d*M*T,this._y=d*M*_+g*p*T,this._z=d*p*T-g*M*_,this._w=d*p*_+g*M*T;break;case"YZX":this._x=g*p*_+d*M*T,this._y=d*M*_+g*p*T,this._z=d*p*T-g*M*_,this._w=d*p*_-g*M*T;break;case"XZY":this._x=g*p*_-d*M*T,this._y=d*M*_-g*p*T,this._z=d*p*T+g*M*_,this._w=d*p*_+g*M*T;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],a=t[4],o=t[8],u=t[1],c=t[5],f=t[9],d=t[2],p=t[6],_=t[10],g=i+c+_;if(g>0){const M=.5/Math.sqrt(g+1);this._w=.25/M,this._x=(p-f)*M,this._y=(o-d)*M,this._z=(u-a)*M}else if(i>c&&i>_){const M=2*Math.sqrt(1+i-c-_);this._w=(p-f)/M,this._x=.25*M,this._y=(a+u)/M,this._z=(o+d)/M}else if(c>_){const M=2*Math.sqrt(1+c-i-_);this._w=(o-d)/M,this._x=(a+u)/M,this._y=.25*M,this._z=(f+p)/M}else{const M=2*Math.sqrt(1+_-i-c);this._w=(u-a)/M,this._x=(o+d)/M,this._y=(f+p)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ln(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,t/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,a=e._y,o=e._z,u=e._w,c=t._x,f=t._y,d=t._z,p=t._w;return this._x=i*p+u*c+a*d-o*f,this._y=a*p+u*f+o*c-i*d,this._z=o*p+u*d+i*f-a*c,this._w=u*p-i*c-a*f-o*d,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,a=this._y,o=this._z,u=this._w;let c=u*e._w+i*e._x+a*e._y+o*e._z;if(c<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,c=-c):this.copy(e),c>=1)return this._w=u,this._x=i,this._y=a,this._z=o,this;const f=1-c*c;if(f<=Number.EPSILON){const M=1-t;return this._w=M*u+t*this._w,this._x=M*i+t*this._x,this._y=M*a+t*this._y,this._z=M*o+t*this._z,this.normalize(),this._onChangeCallback(),this}const d=Math.sqrt(f),p=Math.atan2(d,c),_=Math.sin((1-t)*p)/d,g=Math.sin(t*p)/d;return this._w=u*_+this._w*g,this._x=i*_+this._x*g,this._y=a*_+this._y*g,this._z=o*_+this._z*g,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),a=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(t*Math.cos(a),i*Math.sin(o),i*Math.cos(o),t*Math.sin(a))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(e=0,t=0,i=0){W.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,a=this.z,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6]*a,this.y=o[1]*t+o[4]*i+o[7]*a,this.z=o[2]*t+o[5]*i+o[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,o=e.elements,u=1/(o[3]*t+o[7]*i+o[11]*a+o[15]);return this.x=(o[0]*t+o[4]*i+o[8]*a+o[12])*u,this.y=(o[1]*t+o[5]*i+o[9]*a+o[13])*u,this.z=(o[2]*t+o[6]*i+o[10]*a+o[14])*u,this}applyQuaternion(e){const t=this.x,i=this.y,a=this.z,o=e.x,u=e.y,c=e.z,f=e.w,d=f*t+u*a-c*i,p=f*i+c*t-o*a,_=f*a+o*i-u*t,g=-o*t-u*i-c*a;return this.x=d*f+g*-o+p*-c-_*-u,this.y=p*f+g*-u+_*-o-d*-c,this.z=_*f+g*-c+d*-u-p*-o,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,a=this.z,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*a,this.y=o[1]*t+o[5]*i+o[9]*a,this.z=o[2]*t+o[6]*i+o[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,a=e.y,o=e.z,u=t.x,c=t.y,f=t.z;return this.x=a*f-o*c,this.y=o*u-i*f,this.z=i*c-a*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return nc.copy(this).projectOnVector(e),this.sub(nc)}reflect(e){return this.sub(nc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ln(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return t*t+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const a=Math.sin(t)*e;return this.x=a*Math.sin(i),this.y=Math.cos(t)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nc=new W,Vf=new Tr;class sa{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(wi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(wi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=wi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),jr.copy(e.boundingBox),jr.applyMatrix4(e.matrixWorld),this.union(jr);else{const a=e.geometry;if(a!==void 0)if(t&&a.attributes!==void 0&&a.attributes.position!==void 0){const o=a.attributes.position;for(let u=0,c=o.count;u<c;u++)wi.fromBufferAttribute(o,u).applyMatrix4(e.matrixWorld),this.expandByPoint(wi)}else a.boundingBox===null&&a.computeBoundingBox(),jr.copy(a.boundingBox),jr.applyMatrix4(e.matrixWorld),this.union(jr)}const i=e.children;for(let a=0,o=i.length;a<o;a++)this.expandByObject(i[a],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,wi),wi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xs),Ka.subVectors(this.max,Xs),Jr.subVectors(e.a,Xs),Qr.subVectors(e.b,Xs),es.subVectors(e.c,Xs),Xi.subVectors(Qr,Jr),Yi.subVectors(es,Qr),dr.subVectors(Jr,es);let t=[0,-Xi.z,Xi.y,0,-Yi.z,Yi.y,0,-dr.z,dr.y,Xi.z,0,-Xi.x,Yi.z,0,-Yi.x,dr.z,0,-dr.x,-Xi.y,Xi.x,0,-Yi.y,Yi.x,0,-dr.y,dr.x,0];return!ic(t,Jr,Qr,es,Ka)||(t=[1,0,0,0,1,0,0,0,1],!ic(t,Jr,Qr,es,Ka))?!1:(Za.crossVectors(Xi,Yi),t=[Za.x,Za.y,Za.z],ic(t,Jr,Qr,es,Ka))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const bi=[new W,new W,new W,new W,new W,new W,new W,new W],wi=new W,jr=new sa,Jr=new W,Qr=new W,es=new W,Xi=new W,Yi=new W,dr=new W,Xs=new W,Ka=new W,Za=new W,pr=new W;function ic(r,e,t,i,a){for(let o=0,u=r.length-3;o<=u;o+=3){pr.fromArray(r,o);const c=a.x*Math.abs(pr.x)+a.y*Math.abs(pr.y)+a.z*Math.abs(pr.z),f=e.dot(pr),d=t.dot(pr),p=i.dot(pr);if(Math.max(-Math.max(f,d,p),Math.min(f,d,p))>c)return!1}return!0}const JS=new sa,Ys=new W,rc=new W;class Fc{constructor(e=new W,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):JS.setFromPoints(e).getCenter(i);let a=0;for(let o=0,u=e.length;o<u;o++)a=Math.max(a,i.distanceToSquared(e[o]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ys.subVectors(e,this.center);const t=Ys.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),a=(i-this.radius)*.5;this.center.addScaledVector(Ys,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(rc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ys.copy(e.center).add(rc)),this.expandByPoint(Ys.copy(e.center).sub(rc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ri=new W,sc=new W,ja=new W,qi=new W,ac=new W,Ja=new W,oc=new W;class kd{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ri.copy(this.origin).addScaledVector(this.direction,t),Ri.distanceToSquared(e))}distanceSqToSegment(e,t,i,a){sc.copy(e).add(t).multiplyScalar(.5),ja.copy(t).sub(e).normalize(),qi.copy(this.origin).sub(sc);const o=e.distanceTo(t)*.5,u=-this.direction.dot(ja),c=qi.dot(this.direction),f=-qi.dot(ja),d=qi.lengthSq(),p=Math.abs(1-u*u);let _,g,M,T;if(p>0)if(_=u*f-c,g=u*c-f,T=o*p,_>=0)if(g>=-T)if(g<=T){const A=1/p;_*=A,g*=A,M=_*(_+u*g+2*c)+g*(u*_+g+2*f)+d}else g=o,_=Math.max(0,-(u*g+c)),M=-_*_+g*(g+2*f)+d;else g=-o,_=Math.max(0,-(u*g+c)),M=-_*_+g*(g+2*f)+d;else g<=-T?(_=Math.max(0,-(-u*o+c)),g=_>0?-o:Math.min(Math.max(-o,-f),o),M=-_*_+g*(g+2*f)+d):g<=T?(_=0,g=Math.min(Math.max(-o,-f),o),M=g*(g+2*f)+d):(_=Math.max(0,-(u*o+c)),g=_>0?o:Math.min(Math.max(-o,-f),o),M=-_*_+g*(g+2*f)+d);else g=u>0?-o:o,_=Math.max(0,-(u*g+c)),M=-_*_+g*(g+2*f)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,_),a&&a.copy(sc).addScaledVector(ja,g),M}intersectSphere(e,t){Ri.subVectors(e.center,this.origin);const i=Ri.dot(this.direction),a=Ri.dot(Ri)-i*i,o=e.radius*e.radius;if(a>o)return null;const u=Math.sqrt(o-a),c=i-u,f=i+u;return f<0?null:c<0?this.at(f,t):this.at(c,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,a,o,u,c,f;const d=1/this.direction.x,p=1/this.direction.y,_=1/this.direction.z,g=this.origin;return d>=0?(i=(e.min.x-g.x)*d,a=(e.max.x-g.x)*d):(i=(e.max.x-g.x)*d,a=(e.min.x-g.x)*d),p>=0?(o=(e.min.y-g.y)*p,u=(e.max.y-g.y)*p):(o=(e.max.y-g.y)*p,u=(e.min.y-g.y)*p),i>u||o>a||((o>i||isNaN(i))&&(i=o),(u<a||isNaN(a))&&(a=u),_>=0?(c=(e.min.z-g.z)*_,f=(e.max.z-g.z)*_):(c=(e.max.z-g.z)*_,f=(e.min.z-g.z)*_),i>f||c>a)||((c>i||i!==i)&&(i=c),(f<a||a!==a)&&(a=f),a<0)?null:this.at(i>=0?i:a,t)}intersectsBox(e){return this.intersectBox(e,Ri)!==null}intersectTriangle(e,t,i,a,o){ac.subVectors(t,e),Ja.subVectors(i,e),oc.crossVectors(ac,Ja);let u=this.direction.dot(oc),c;if(u>0){if(a)return null;c=1}else if(u<0)c=-1,u=-u;else return null;qi.subVectors(this.origin,e);const f=c*this.direction.dot(Ja.crossVectors(qi,Ja));if(f<0)return null;const d=c*this.direction.dot(ac.cross(qi));if(d<0||f+d>u)return null;const p=-c*qi.dot(oc);return p<0?null:this.at(p/u,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tn{constructor(e,t,i,a,o,u,c,f,d,p,_,g,M,T,A,v){tn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,a,o,u,c,f,d,p,_,g,M,T,A,v)}set(e,t,i,a,o,u,c,f,d,p,_,g,M,T,A,v){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=a,m[1]=o,m[5]=u,m[9]=c,m[13]=f,m[2]=d,m[6]=p,m[10]=_,m[14]=g,m[3]=M,m[7]=T,m[11]=A,m[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tn().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,a=1/ts.setFromMatrixColumn(e,0).length(),o=1/ts.setFromMatrixColumn(e,1).length(),u=1/ts.setFromMatrixColumn(e,2).length();return t[0]=i[0]*a,t[1]=i[1]*a,t[2]=i[2]*a,t[3]=0,t[4]=i[4]*o,t[5]=i[5]*o,t[6]=i[6]*o,t[7]=0,t[8]=i[8]*u,t[9]=i[9]*u,t[10]=i[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,a=e.y,o=e.z,u=Math.cos(i),c=Math.sin(i),f=Math.cos(a),d=Math.sin(a),p=Math.cos(o),_=Math.sin(o);if(e.order==="XYZ"){const g=u*p,M=u*_,T=c*p,A=c*_;t[0]=f*p,t[4]=-f*_,t[8]=d,t[1]=M+T*d,t[5]=g-A*d,t[9]=-c*f,t[2]=A-g*d,t[6]=T+M*d,t[10]=u*f}else if(e.order==="YXZ"){const g=f*p,M=f*_,T=d*p,A=d*_;t[0]=g+A*c,t[4]=T*c-M,t[8]=u*d,t[1]=u*_,t[5]=u*p,t[9]=-c,t[2]=M*c-T,t[6]=A+g*c,t[10]=u*f}else if(e.order==="ZXY"){const g=f*p,M=f*_,T=d*p,A=d*_;t[0]=g-A*c,t[4]=-u*_,t[8]=T+M*c,t[1]=M+T*c,t[5]=u*p,t[9]=A-g*c,t[2]=-u*d,t[6]=c,t[10]=u*f}else if(e.order==="ZYX"){const g=u*p,M=u*_,T=c*p,A=c*_;t[0]=f*p,t[4]=T*d-M,t[8]=g*d+A,t[1]=f*_,t[5]=A*d+g,t[9]=M*d-T,t[2]=-d,t[6]=c*f,t[10]=u*f}else if(e.order==="YZX"){const g=u*f,M=u*d,T=c*f,A=c*d;t[0]=f*p,t[4]=A-g*_,t[8]=T*_+M,t[1]=_,t[5]=u*p,t[9]=-c*p,t[2]=-d*p,t[6]=M*_+T,t[10]=g-A*_}else if(e.order==="XZY"){const g=u*f,M=u*d,T=c*f,A=c*d;t[0]=f*p,t[4]=-_,t[8]=d*p,t[1]=g*_+A,t[5]=u*p,t[9]=M*_-T,t[2]=T*_-M,t[6]=c*p,t[10]=A*_+g}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(QS,e,eE)}lookAt(e,t,i){const a=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),$i.crossVectors(i,wn),$i.lengthSq()===0&&(Math.abs(i.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),$i.crossVectors(i,wn)),$i.normalize(),Qa.crossVectors(wn,$i),a[0]=$i.x,a[4]=Qa.x,a[8]=wn.x,a[1]=$i.y,a[5]=Qa.y,a[9]=wn.y,a[2]=$i.z,a[6]=Qa.z,a[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,o=this.elements,u=i[0],c=i[4],f=i[8],d=i[12],p=i[1],_=i[5],g=i[9],M=i[13],T=i[2],A=i[6],v=i[10],m=i[14],F=i[3],w=i[7],P=i[11],N=i[15],H=a[0],U=a[4],ae=a[8],b=a[12],D=a[1],de=a[5],ge=a[9],Z=a[13],ee=a[2],J=a[6],pe=a[10],ie=a[14],se=a[3],ve=a[7],ue=a[11],q=a[15];return o[0]=u*H+c*D+f*ee+d*se,o[4]=u*U+c*de+f*J+d*ve,o[8]=u*ae+c*ge+f*pe+d*ue,o[12]=u*b+c*Z+f*ie+d*q,o[1]=p*H+_*D+g*ee+M*se,o[5]=p*U+_*de+g*J+M*ve,o[9]=p*ae+_*ge+g*pe+M*ue,o[13]=p*b+_*Z+g*ie+M*q,o[2]=T*H+A*D+v*ee+m*se,o[6]=T*U+A*de+v*J+m*ve,o[10]=T*ae+A*ge+v*pe+m*ue,o[14]=T*b+A*Z+v*ie+m*q,o[3]=F*H+w*D+P*ee+N*se,o[7]=F*U+w*de+P*J+N*ve,o[11]=F*ae+w*ge+P*pe+N*ue,o[15]=F*b+w*Z+P*ie+N*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],a=e[8],o=e[12],u=e[1],c=e[5],f=e[9],d=e[13],p=e[2],_=e[6],g=e[10],M=e[14],T=e[3],A=e[7],v=e[11],m=e[15];return T*(+o*f*_-a*d*_-o*c*g+i*d*g+a*c*M-i*f*M)+A*(+t*f*M-t*d*g+o*u*g-a*u*M+a*d*p-o*f*p)+v*(+t*d*_-t*c*M-o*u*_+i*u*M+o*c*p-i*d*p)+m*(-a*c*p-t*f*_+t*c*g+a*u*_-i*u*g+i*f*p)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],o=e[3],u=e[4],c=e[5],f=e[6],d=e[7],p=e[8],_=e[9],g=e[10],M=e[11],T=e[12],A=e[13],v=e[14],m=e[15],F=_*v*d-A*g*d+A*f*M-c*v*M-_*f*m+c*g*m,w=T*g*d-p*v*d-T*f*M+u*v*M+p*f*m-u*g*m,P=p*A*d-T*_*d+T*c*M-u*A*M-p*c*m+u*_*m,N=T*_*f-p*A*f-T*c*g+u*A*g+p*c*v-u*_*v,H=t*F+i*w+a*P+o*N;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/H;return e[0]=F*U,e[1]=(A*g*o-_*v*o-A*a*M+i*v*M+_*a*m-i*g*m)*U,e[2]=(c*v*o-A*f*o+A*a*d-i*v*d-c*a*m+i*f*m)*U,e[3]=(_*f*o-c*g*o-_*a*d+i*g*d+c*a*M-i*f*M)*U,e[4]=w*U,e[5]=(p*v*o-T*g*o+T*a*M-t*v*M-p*a*m+t*g*m)*U,e[6]=(T*f*o-u*v*o-T*a*d+t*v*d+u*a*m-t*f*m)*U,e[7]=(u*g*o-p*f*o+p*a*d-t*g*d-u*a*M+t*f*M)*U,e[8]=P*U,e[9]=(T*_*o-p*A*o-T*i*M+t*A*M+p*i*m-t*_*m)*U,e[10]=(u*A*o-T*c*o+T*i*d-t*A*d-u*i*m+t*c*m)*U,e[11]=(p*c*o-u*_*o-p*i*d+t*_*d+u*i*M-t*c*M)*U,e[12]=N*U,e[13]=(p*A*a-T*_*a+T*i*g-t*A*g-p*i*v+t*_*v)*U,e[14]=(T*c*a-u*A*a-T*i*f+t*A*f+u*i*v-t*c*v)*U,e[15]=(u*_*a-p*c*a+p*i*f-t*_*f-u*i*g+t*c*g)*U,this}scale(e){const t=this.elements,i=e.x,a=e.y,o=e.z;return t[0]*=i,t[4]*=a,t[8]*=o,t[1]*=i,t[5]*=a,t[9]*=o,t[2]*=i,t[6]*=a,t[10]*=o,t[3]*=i,t[7]*=a,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,a))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),a=Math.sin(t),o=1-i,u=e.x,c=e.y,f=e.z,d=o*u,p=o*c;return this.set(d*u+i,d*c-a*f,d*f+a*c,0,d*c+a*f,p*c+i,p*f-a*u,0,d*f-a*c,p*f+a*u,o*f*f+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,a,o,u){return this.set(1,i,o,0,e,1,u,0,t,a,1,0,0,0,0,1),this}compose(e,t,i){const a=this.elements,o=t._x,u=t._y,c=t._z,f=t._w,d=o+o,p=u+u,_=c+c,g=o*d,M=o*p,T=o*_,A=u*p,v=u*_,m=c*_,F=f*d,w=f*p,P=f*_,N=i.x,H=i.y,U=i.z;return a[0]=(1-(A+m))*N,a[1]=(M+P)*N,a[2]=(T-w)*N,a[3]=0,a[4]=(M-P)*H,a[5]=(1-(g+m))*H,a[6]=(v+F)*H,a[7]=0,a[8]=(T+w)*U,a[9]=(v-F)*U,a[10]=(1-(g+A))*U,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,i){const a=this.elements;let o=ts.set(a[0],a[1],a[2]).length();const u=ts.set(a[4],a[5],a[6]).length(),c=ts.set(a[8],a[9],a[10]).length();this.determinant()<0&&(o=-o),e.x=a[12],e.y=a[13],e.z=a[14],Zn.copy(this);const d=1/o,p=1/u,_=1/c;return Zn.elements[0]*=d,Zn.elements[1]*=d,Zn.elements[2]*=d,Zn.elements[4]*=p,Zn.elements[5]*=p,Zn.elements[6]*=p,Zn.elements[8]*=_,Zn.elements[9]*=_,Zn.elements[10]*=_,t.setFromRotationMatrix(Zn),i.x=o,i.y=u,i.z=c,this}makePerspective(e,t,i,a,o,u,c=Ui){const f=this.elements,d=2*o/(t-e),p=2*o/(i-a),_=(t+e)/(t-e),g=(i+a)/(i-a);let M,T;if(c===Ui)M=-(u+o)/(u-o),T=-2*u*o/(u-o);else if(c===So)M=-u/(u-o),T=-u*o/(u-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return f[0]=d,f[4]=0,f[8]=_,f[12]=0,f[1]=0,f[5]=p,f[9]=g,f[13]=0,f[2]=0,f[6]=0,f[10]=M,f[14]=T,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,i,a,o,u,c=Ui){const f=this.elements,d=1/(t-e),p=1/(i-a),_=1/(u-o),g=(t+e)*d,M=(i+a)*p;let T,A;if(c===Ui)T=(u+o)*_,A=-2*_;else if(c===So)T=o*_,A=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return f[0]=2*d,f[4]=0,f[8]=0,f[12]=-g,f[1]=0,f[5]=2*p,f[9]=0,f[13]=-M,f[2]=0,f[6]=0,f[10]=A,f[14]=-T,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<16;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ts=new W,Zn=new tn,QS=new W(0,0,0),eE=new W(1,1,1),$i=new W,Qa=new W,wn=new W,kf=new tn,Wf=new Tr;class wo{constructor(e=0,t=0,i=0,a=wo.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,a=this._order){return this._x=e,this._y=t,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const a=e.elements,o=a[0],u=a[4],c=a[8],f=a[1],d=a[5],p=a[9],_=a[2],g=a[6],M=a[10];switch(t){case"XYZ":this._y=Math.asin(ln(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-p,M),this._z=Math.atan2(-u,o)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-ln(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(c,M),this._z=Math.atan2(f,d)):(this._y=Math.atan2(-_,o),this._z=0);break;case"ZXY":this._x=Math.asin(ln(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-u,d)):(this._y=0,this._z=Math.atan2(f,o));break;case"ZYX":this._y=Math.asin(-ln(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,M),this._z=Math.atan2(f,o)):(this._x=0,this._z=Math.atan2(-u,d));break;case"YZX":this._z=Math.asin(ln(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-p,d),this._y=Math.atan2(-_,o)):(this._x=0,this._y=Math.atan2(c,M));break;case"XZY":this._z=Math.asin(-ln(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-p,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return kf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wf.setFromEuler(this),this.setFromQuaternion(Wf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wo.DEFAULT_ORDER="XYZ";class Wd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let tE=0;const Xf=new W,ns=new Tr,Ci=new tn,eo=new W,qs=new W,nE=new W,iE=new Tr,Yf=new W(1,0,0),qf=new W(0,1,0),$f=new W(0,0,1),rE={type:"added"},sE={type:"removed"};class Ln extends br{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tE++}),this.uuid=ys(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ln.DEFAULT_UP.clone();const e=new W,t=new wo,i=new Tr,a=new W(1,1,1);function o(){i.setFromEuler(t,!1)}function u(){t.setFromQuaternion(i,void 0,!1)}t._onChange(o),i._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new tn},normalMatrix:{value:new ut}}),this.matrix=new tn,this.matrixWorld=new tn,this.matrixAutoUpdate=Ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Wd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ns.setFromAxisAngle(e,t),this.quaternion.multiply(ns),this}rotateOnWorldAxis(e,t){return ns.setFromAxisAngle(e,t),this.quaternion.premultiply(ns),this}rotateX(e){return this.rotateOnAxis(Yf,e)}rotateY(e){return this.rotateOnAxis(qf,e)}rotateZ(e){return this.rotateOnAxis($f,e)}translateOnAxis(e,t){return Xf.copy(e).applyQuaternion(this.quaternion),this.position.add(Xf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yf,e)}translateY(e){return this.translateOnAxis(qf,e)}translateZ(e){return this.translateOnAxis($f,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?eo.copy(e):eo.set(e,t,i);const a=this.parent;this.updateWorldMatrix(!0,!1),qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(qs,eo,this.up):Ci.lookAt(eo,qs,this.up),this.quaternion.setFromRotationMatrix(Ci),a&&(Ci.extractRotation(a.matrixWorld),ns.setFromRotationMatrix(Ci),this.quaternion.premultiply(ns.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(rE)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sE)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,a=this.children.length;i<a;i++){const u=this.children[i].getObjectByProperty(e,t);if(u!==void 0)return u}}getObjectsByProperty(e,t){let i=[];this[e]===t&&i.push(this);for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectsByProperty(e,t);u.length>0&&(i=i.concat(u))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,e,nE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,iE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,a=t.length;i<a;i++){const o=t[i];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const a=this.children;for(let o=0,u=a.length;o<u;o++){const c=a[o];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON()));function o(c,f){return c[f.uuid]===void 0&&(c[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=o(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const f=c.shapes;if(Array.isArray(f))for(let d=0,p=f.length;d<p;d++){const _=f[d];o(e.shapes,_)}else o(e.shapes,f)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let f=0,d=this.material.length;f<d;f++)c.push(o(e.materials,this.material[f]));a.material=c}else a.material=o(e.materials,this.material);if(this.children.length>0){a.children=[];for(let c=0;c<this.children.length;c++)a.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let c=0;c<this.animations.length;c++){const f=this.animations[c];a.animations.push(o(e.animations,f))}}if(t){const c=u(e.geometries),f=u(e.materials),d=u(e.textures),p=u(e.images),_=u(e.shapes),g=u(e.skeletons),M=u(e.animations),T=u(e.nodes);c.length>0&&(i.geometries=c),f.length>0&&(i.materials=f),d.length>0&&(i.textures=d),p.length>0&&(i.images=p),_.length>0&&(i.shapes=_),g.length>0&&(i.skeletons=g),M.length>0&&(i.animations=M),T.length>0&&(i.nodes=T)}return i.object=a,i;function u(c){const f=[];for(const d in c){const p=c[d];delete p.metadata,f.push(p)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Ln.DEFAULT_UP=new W(0,1,0);Ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jn=new W,Li=new W,lc=new W,Pi=new W,is=new W,rs=new W,Kf=new W,cc=new W,uc=new W,hc=new W;let to=!1;class Qn{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,a){a.subVectors(i,t),jn.subVectors(e,t),a.cross(jn);const o=a.lengthSq();return o>0?a.multiplyScalar(1/Math.sqrt(o)):a.set(0,0,0)}static getBarycoord(e,t,i,a,o){jn.subVectors(a,t),Li.subVectors(i,t),lc.subVectors(e,t);const u=jn.dot(jn),c=jn.dot(Li),f=jn.dot(lc),d=Li.dot(Li),p=Li.dot(lc),_=u*d-c*c;if(_===0)return o.set(-2,-1,-1);const g=1/_,M=(d*f-c*p)*g,T=(u*p-c*f)*g;return o.set(1-M-T,T,M)}static containsPoint(e,t,i,a){return this.getBarycoord(e,t,i,a,Pi),Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getUV(e,t,i,a,o,u,c,f){return to===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),to=!0),this.getInterpolation(e,t,i,a,o,u,c,f)}static getInterpolation(e,t,i,a,o,u,c,f){return this.getBarycoord(e,t,i,a,Pi),f.setScalar(0),f.addScaledVector(o,Pi.x),f.addScaledVector(u,Pi.y),f.addScaledVector(c,Pi.z),f}static isFrontFacing(e,t,i,a){return jn.subVectors(i,t),Li.subVectors(e,t),jn.cross(Li).dot(a)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,a){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,i,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),jn.cross(Li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,a,o){return to===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),to=!0),Qn.getInterpolation(e,this.a,this.b,this.c,t,i,a,o)}getInterpolation(e,t,i,a,o){return Qn.getInterpolation(e,this.a,this.b,this.c,t,i,a,o)}containsPoint(e){return Qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,a=this.b,o=this.c;let u,c;is.subVectors(a,i),rs.subVectors(o,i),cc.subVectors(e,i);const f=is.dot(cc),d=rs.dot(cc);if(f<=0&&d<=0)return t.copy(i);uc.subVectors(e,a);const p=is.dot(uc),_=rs.dot(uc);if(p>=0&&_<=p)return t.copy(a);const g=f*_-p*d;if(g<=0&&f>=0&&p<=0)return u=f/(f-p),t.copy(i).addScaledVector(is,u);hc.subVectors(e,o);const M=is.dot(hc),T=rs.dot(hc);if(T>=0&&M<=T)return t.copy(o);const A=M*d-f*T;if(A<=0&&d>=0&&T<=0)return c=d/(d-T),t.copy(i).addScaledVector(rs,c);const v=p*T-M*_;if(v<=0&&_-p>=0&&M-T>=0)return Kf.subVectors(o,a),c=(_-p)/(_-p+(M-T)),t.copy(a).addScaledVector(Kf,c);const m=1/(v+A+g);return u=A*m,c=g*m,t.copy(i).addScaledVector(is,u).addScaledVector(rs,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let aE=0;class Ro extends br{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:aE++}),this.uuid=ys(),this.name="",this.type="Material",this.blending=gs,this.side=nr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Rd,this.blendDst=Cd,this.blendEquation=fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=yc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_S,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jl,this.stencilZFail=Jl,this.stencilZPass=Jl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(i.blending=this.blending),this.side!==nr&&(i.side=this.side),this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.stencilWrite=this.stencilWrite,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=this.alphaHash),this.alphaToCoverage===!0&&(i.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(i.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=this.flatShading),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(o){const u=[];for(const c in o){const f=o[c];delete f.metadata,u.push(f)}return u}if(t){const o=a(e.textures),u=a(e.images);o.length>0&&(i.textures=o),u.length>0&&(i.images=u)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const a=t.length;i=new Array(a);for(let o=0;o!==a;++o)i[o]=t[o].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},no={h:0,s:0,l:0};function fc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class wt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Kn.toWorkingColorSpace(this,t),this}setRGB(e,t,i,a=Kn.workingColorSpace){return this.r=e,this.g=t,this.b=i,Kn.toWorkingColorSpace(this,a),this}setHSL(e,t,i,a=Kn.workingColorSpace){if(e=Nc(e,1),t=ln(t,0,1),i=ln(i,0,1),t===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+t):i+t-i*t,u=2*i-o;this.r=fc(u,o,e+1/3),this.g=fc(u,o,e),this.b=fc(u,o,e-1/3)}return Kn.toWorkingColorSpace(this,a),this}setStyle(e,t=Pt){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const u=a[1],c=a[2];switch(u){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=a[1],u=o.length;if(u===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(u===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pt){const i=Xd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}copyLinearToSRGB(e){return this.r=ec(e.r),this.g=ec(e.g),this.b=ec(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return Kn.fromWorkingColorSpace(on.copy(this),e),Math.round(ln(on.r*255,0,255))*65536+Math.round(ln(on.g*255,0,255))*256+Math.round(ln(on.b*255,0,255))}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Kn.workingColorSpace){Kn.fromWorkingColorSpace(on.copy(this),t);const i=on.r,a=on.g,o=on.b,u=Math.max(i,a,o),c=Math.min(i,a,o);let f,d;const p=(c+u)/2;if(c===u)f=0,d=0;else{const _=u-c;switch(d=p<=.5?_/(u+c):_/(2-u-c),u){case i:f=(a-o)/_+(a<o?6:0);break;case a:f=(o-i)/_+2;break;case o:f=(i-a)/_+4;break}f/=6}return e.h=f,e.s=d,e.l=p,e}getRGB(e,t=Kn.workingColorSpace){return Kn.fromWorkingColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=Pt){Kn.fromWorkingColorSpace(on.copy(this),e);const t=on.r,i=on.g,a=on.b;return e!==Pt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,t,i){return this.getHSL(Jn),Jn.h+=e,Jn.s+=t,Jn.l+=i,this.setHSL(Jn.h,Jn.s,Jn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Jn),e.getHSL(no);const i=Js(Jn.h,no.h,t),a=Js(Jn.s,no.s,t),o=Js(Jn.l,no.l,t);return this.setHSL(i,a,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,a=this.b,o=e.elements;return this.r=o[0]*t+o[3]*i+o[6]*a,this.g=o[1]*t+o[4]*i+o[7]*a,this.b=o[2]*t+o[5]*i+o[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new wt;wt.NAMES=Xd;class Yd extends Ro{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ld,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ht=new W,io=new ht;class Pn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Bf,this.updateRange={offset:0,count:-1},this.gpuType=ji,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let a=0,o=this.itemSize;a<o;a++)this.array[e+a]=t.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)io.fromBufferAttribute(this,t),io.applyMatrix3(e),this.setXY(t,io.x,io.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ds(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=dn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ds(t,this.array)),t}setX(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ds(t,this.array)),t}setY(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ds(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ds(t,this.array)),t}setW(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,a){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array),a=dn(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,t,i,a,o){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array),a=dn(a,this.array),o=dn(o,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bf&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class qd extends Pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class $d extends Pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class yr extends Pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let oE=0;const Vn=new tn,dc=new Ln,ss=new W,Rn=new sa,$s=new sa,Zt=new W;class wr extends br{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:oE++}),this.uuid=ys(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zd(e)?$d:qd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new ut().getNormalMatrix(e);i.applyNormalMatrix(o),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vn.makeRotationFromQuaternion(e),this.applyMatrix4(Vn),this}rotateX(e){return Vn.makeRotationX(e),this.applyMatrix4(Vn),this}rotateY(e){return Vn.makeRotationY(e),this.applyMatrix4(Vn),this}rotateZ(e){return Vn.makeRotationZ(e),this.applyMatrix4(Vn),this}translate(e,t,i){return Vn.makeTranslation(e,t,i),this.applyMatrix4(Vn),this}scale(e,t,i){return Vn.makeScale(e,t,i),this.applyMatrix4(Vn),this}lookAt(e){return dc.lookAt(e),dc.updateMatrix(),this.applyMatrix4(dc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(e){const t=[];for(let i=0,a=e.length;i<a;i++){const o=e[i];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new yr(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,a=t.length;i<a;i++){const o=t[i];Rn.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(Rn.setFromBufferAttribute(e),t)for(let o=0,u=t.length;o<u;o++){const c=t[o];$s.setFromBufferAttribute(c),this.morphTargetsRelative?(Zt.addVectors(Rn.min,$s.min),Rn.expandByPoint(Zt),Zt.addVectors(Rn.max,$s.max),Rn.expandByPoint(Zt)):(Rn.expandByPoint($s.min),Rn.expandByPoint($s.max))}Rn.getCenter(i);let a=0;for(let o=0,u=e.count;o<u;o++)Zt.fromBufferAttribute(e,o),a=Math.max(a,i.distanceToSquared(Zt));if(t)for(let o=0,u=t.length;o<u;o++){const c=t[o],f=this.morphTargetsRelative;for(let d=0,p=c.count;d<p;d++)Zt.fromBufferAttribute(c,d),f&&(ss.fromBufferAttribute(e,d),Zt.add(ss)),a=Math.max(a,i.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,a=t.position.array,o=t.normal.array,u=t.uv.array,c=a.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pn(new Float32Array(4*c),4));const f=this.getAttribute("tangent").array,d=[],p=[];for(let D=0;D<c;D++)d[D]=new W,p[D]=new W;const _=new W,g=new W,M=new W,T=new ht,A=new ht,v=new ht,m=new W,F=new W;function w(D,de,ge){_.fromArray(a,D*3),g.fromArray(a,de*3),M.fromArray(a,ge*3),T.fromArray(u,D*2),A.fromArray(u,de*2),v.fromArray(u,ge*2),g.sub(_),M.sub(_),A.sub(T),v.sub(T);const Z=1/(A.x*v.y-v.x*A.y);isFinite(Z)&&(m.copy(g).multiplyScalar(v.y).addScaledVector(M,-A.y).multiplyScalar(Z),F.copy(M).multiplyScalar(A.x).addScaledVector(g,-v.x).multiplyScalar(Z),d[D].add(m),d[de].add(m),d[ge].add(m),p[D].add(F),p[de].add(F),p[ge].add(F))}let P=this.groups;P.length===0&&(P=[{start:0,count:i.length}]);for(let D=0,de=P.length;D<de;++D){const ge=P[D],Z=ge.start,ee=ge.count;for(let J=Z,pe=Z+ee;J<pe;J+=3)w(i[J+0],i[J+1],i[J+2])}const N=new W,H=new W,U=new W,ae=new W;function b(D){U.fromArray(o,D*3),ae.copy(U);const de=d[D];N.copy(de),N.sub(U.multiplyScalar(U.dot(de))).normalize(),H.crossVectors(ae,de);const Z=H.dot(p[D])<0?-1:1;f[D*4]=N.x,f[D*4+1]=N.y,f[D*4+2]=N.z,f[D*4+3]=Z}for(let D=0,de=P.length;D<de;++D){const ge=P[D],Z=ge.start,ee=ge.count;for(let J=Z,pe=Z+ee;J<pe;J+=3)b(i[J+0]),b(i[J+1]),b(i[J+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let g=0,M=i.count;g<M;g++)i.setXYZ(g,0,0,0);const a=new W,o=new W,u=new W,c=new W,f=new W,d=new W,p=new W,_=new W;if(e)for(let g=0,M=e.count;g<M;g+=3){const T=e.getX(g+0),A=e.getX(g+1),v=e.getX(g+2);a.fromBufferAttribute(t,T),o.fromBufferAttribute(t,A),u.fromBufferAttribute(t,v),p.subVectors(u,o),_.subVectors(a,o),p.cross(_),c.fromBufferAttribute(i,T),f.fromBufferAttribute(i,A),d.fromBufferAttribute(i,v),c.add(p),f.add(p),d.add(p),i.setXYZ(T,c.x,c.y,c.z),i.setXYZ(A,f.x,f.y,f.z),i.setXYZ(v,d.x,d.y,d.z)}else for(let g=0,M=t.count;g<M;g+=3)a.fromBufferAttribute(t,g+0),o.fromBufferAttribute(t,g+1),u.fromBufferAttribute(t,g+2),p.subVectors(u,o),_.subVectors(a,o),p.cross(_),i.setXYZ(g+0,p.x,p.y,p.z),i.setXYZ(g+1,p.x,p.y,p.z),i.setXYZ(g+2,p.x,p.y,p.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(c,f){const d=c.array,p=c.itemSize,_=c.normalized,g=new d.constructor(f.length*p);let M=0,T=0;for(let A=0,v=f.length;A<v;A++){c.isInterleavedBufferAttribute?M=f[A]*c.data.stride+c.offset:M=f[A]*p;for(let m=0;m<p;m++)g[T++]=d[M++]}return new Pn(g,p,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wr,i=this.index.array,a=this.attributes;for(const c in a){const f=a[c],d=e(f,i);t.setAttribute(c,d)}const o=this.morphAttributes;for(const c in o){const f=[],d=o[c];for(let p=0,_=d.length;p<_;p++){const g=d[p],M=e(g,i);f.push(M)}t.morphAttributes[c]=f}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let c=0,f=u.length;c<f;c++){const d=u[c];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const d in f)f[d]!==void 0&&(e[d]=f[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const f in i){const d=i[f];e.data.attributes[f]=d.toJSON(e.data)}const a={};let o=!1;for(const f in this.morphAttributes){const d=this.morphAttributes[f],p=[];for(let _=0,g=d.length;_<g;_++){const M=d[_];p.push(M.toJSON(e.data))}p.length>0&&(a[f]=p,o=!0)}o&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const a=e.attributes;for(const d in a){const p=a[d];this.setAttribute(d,p.clone(t))}const o=e.morphAttributes;for(const d in o){const p=[],_=o[d];for(let g=0,M=_.length;g<M;g++)p.push(_[g].clone(t));this.morphAttributes[d]=p}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let d=0,p=u.length;d<p;d++){const _=u[d];this.addGroup(_.start,_.count,_.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zf=new tn,mr=new kd,ro=new Fc,jf=new W,as=new W,os=new W,ls=new W,pc=new W,so=new W,ao=new ht,oo=new ht,lo=new ht,Jf=new W,Qf=new W,ed=new W,co=new W,uo=new W;class ci extends Ln{constructor(e=new wr,t=new Yd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,u=a.length;o<u;o++){const c=a[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}getVertexPosition(e,t){const i=this.geometry,a=i.attributes.position,o=i.morphAttributes.position,u=i.morphTargetsRelative;t.fromBufferAttribute(a,e);const c=this.morphTargetInfluences;if(o&&c){so.set(0,0,0);for(let f=0,d=o.length;f<d;f++){const p=c[f],_=o[f];p!==0&&(pc.fromBufferAttribute(_,e),u?so.addScaledVector(pc,p):so.addScaledVector(pc.sub(t),p))}t.add(so)}return t}raycast(e,t){const i=this.geometry,a=this.material,o=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ro.copy(i.boundingSphere),ro.applyMatrix4(o),mr.copy(e.ray).recast(e.near),!(ro.containsPoint(mr.origin)===!1&&(mr.intersectSphere(ro,jf)===null||mr.origin.distanceToSquared(jf)>(e.far-e.near)**2))&&(Zf.copy(o).invert(),mr.copy(e.ray).applyMatrix4(Zf),!(i.boundingBox!==null&&mr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,mr)))}_computeIntersections(e,t,i){let a;const o=this.geometry,u=this.material,c=o.index,f=o.attributes.position,d=o.attributes.uv,p=o.attributes.uv1,_=o.attributes.normal,g=o.groups,M=o.drawRange;if(c!==null)if(Array.isArray(u))for(let T=0,A=g.length;T<A;T++){const v=g[T],m=u[v.materialIndex],F=Math.max(v.start,M.start),w=Math.min(c.count,Math.min(v.start+v.count,M.start+M.count));for(let P=F,N=w;P<N;P+=3){const H=c.getX(P),U=c.getX(P+1),ae=c.getX(P+2);a=ho(this,m,e,i,d,p,_,H,U,ae),a&&(a.faceIndex=Math.floor(P/3),a.face.materialIndex=v.materialIndex,t.push(a))}}else{const T=Math.max(0,M.start),A=Math.min(c.count,M.start+M.count);for(let v=T,m=A;v<m;v+=3){const F=c.getX(v),w=c.getX(v+1),P=c.getX(v+2);a=ho(this,u,e,i,d,p,_,F,w,P),a&&(a.faceIndex=Math.floor(v/3),t.push(a))}}else if(f!==void 0)if(Array.isArray(u))for(let T=0,A=g.length;T<A;T++){const v=g[T],m=u[v.materialIndex],F=Math.max(v.start,M.start),w=Math.min(f.count,Math.min(v.start+v.count,M.start+M.count));for(let P=F,N=w;P<N;P+=3){const H=P,U=P+1,ae=P+2;a=ho(this,m,e,i,d,p,_,H,U,ae),a&&(a.faceIndex=Math.floor(P/3),a.face.materialIndex=v.materialIndex,t.push(a))}}else{const T=Math.max(0,M.start),A=Math.min(f.count,M.start+M.count);for(let v=T,m=A;v<m;v+=3){const F=v,w=v+1,P=v+2;a=ho(this,u,e,i,d,p,_,F,w,P),a&&(a.faceIndex=Math.floor(v/3),t.push(a))}}}}function lE(r,e,t,i,a,o,u,c){let f;if(e.side===Mn?f=i.intersectTriangle(u,o,a,!0,c):f=i.intersectTriangle(a,o,u,e.side===nr,c),f===null)return null;uo.copy(c),uo.applyMatrix4(r.matrixWorld);const d=t.ray.origin.distanceTo(uo);return d<t.near||d>t.far?null:{distance:d,point:uo.clone(),object:r}}function ho(r,e,t,i,a,o,u,c,f,d){r.getVertexPosition(c,as),r.getVertexPosition(f,os),r.getVertexPosition(d,ls);const p=lE(r,e,t,i,as,os,ls,co);if(p){a&&(ao.fromBufferAttribute(a,c),oo.fromBufferAttribute(a,f),lo.fromBufferAttribute(a,d),p.uv=Qn.getInterpolation(co,as,os,ls,ao,oo,lo,new ht)),o&&(ao.fromBufferAttribute(o,c),oo.fromBufferAttribute(o,f),lo.fromBufferAttribute(o,d),p.uv1=Qn.getInterpolation(co,as,os,ls,ao,oo,lo,new ht),p.uv2=p.uv1),u&&(Jf.fromBufferAttribute(u,c),Qf.fromBufferAttribute(u,f),ed.fromBufferAttribute(u,d),p.normal=Qn.getInterpolation(co,as,os,ls,Jf,Qf,ed,new W),p.normal.dot(i.direction)>0&&p.normal.multiplyScalar(-1));const _={a:c,b:f,c:d,normal:new W,materialIndex:0};Qn.getNormal(as,os,ls,_.normal),p.face=_}return p}class aa extends wr{constructor(e=1,t=1,i=1,a=1,o=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:a,heightSegments:o,depthSegments:u};const c=this;a=Math.floor(a),o=Math.floor(o),u=Math.floor(u);const f=[],d=[],p=[],_=[];let g=0,M=0;T("z","y","x",-1,-1,i,t,e,u,o,0),T("z","y","x",1,-1,i,t,-e,u,o,1),T("x","z","y",1,1,e,i,t,a,u,2),T("x","z","y",1,-1,e,i,-t,a,u,3),T("x","y","z",1,-1,e,t,i,a,o,4),T("x","y","z",-1,-1,e,t,-i,a,o,5),this.setIndex(f),this.setAttribute("position",new yr(d,3)),this.setAttribute("normal",new yr(p,3)),this.setAttribute("uv",new yr(_,2));function T(A,v,m,F,w,P,N,H,U,ae,b){const D=P/U,de=N/ae,ge=P/2,Z=N/2,ee=H/2,J=U+1,pe=ae+1;let ie=0,se=0;const ve=new W;for(let ue=0;ue<pe;ue++){const q=ue*de-Z;for(let Q=0;Q<J;Q++){const Re=Q*D-ge;ve[A]=Re*F,ve[v]=q*w,ve[m]=ee,d.push(ve.x,ve.y,ve.z),ve[A]=0,ve[v]=0,ve[m]=H>0?1:-1,p.push(ve.x,ve.y,ve.z),_.push(Q/U),_.push(1-ue/ae),ie+=1}}for(let ue=0;ue<ae;ue++)for(let q=0;q<U;q++){const Q=g+q+J*ue,Re=g+q+J*(ue+1),Ce=g+(q+1)+J*(ue+1),Le=g+(q+1)+J*ue;f.push(Q,Re,Le),f.push(Re,Ce,Le),se+=6}c.addGroup(M,se,b),M+=se,g+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new aa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Es(r){const e={};for(const t in r){e[t]={};for(const i in r[t]){const a=r[t][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=a.clone():Array.isArray(a)?e[t][i]=a.slice():e[t][i]=a}}return e}function pn(r){const e={};for(let t=0;t<r.length;t++){const i=Es(r[t]);for(const a in i)e[a]=i[a]}return e}function cE(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Kd(r){return r.getRenderTarget()===null?r.outputColorSpace:pi}const uE={clone:Es,merge:pn};var hE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ir extends Ro{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hE,this.fragmentShader=fE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Es(e.uniforms),this.uniformsGroups=cE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const u=this.uniforms[a].value;u&&u.isTexture?t.uniforms[a]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[a]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[a]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[a]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[a]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[a]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[a]={type:"m4",value:u.toArray()}:t.uniforms[a]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Zd extends Ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tn,this.projectionMatrix=new tn,this.projectionMatrixInverse=new tn,this.coordinateSystem=Ui}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Wn extends Zd{constructor(e=50,t=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ia*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(js*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ia*2*Math.atan(Math.tan(js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,a,o,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=o,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(js*.5*this.fov)/this.zoom,i=2*t,a=this.aspect*i,o=-.5*a;const u=this.view;if(this.view!==null&&this.view.enabled){const f=u.fullWidth,d=u.fullHeight;o+=u.offsetX*a/f,t-=u.offsetY*i/d,a*=u.width/f,i*=u.height/d}const c=this.filmOffset;c!==0&&(o+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+a,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const cs=-90,us=1;class dE extends Ln{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null;const a=new Wn(cs,us,e,t);a.layers=this.layers,this.add(a);const o=new Wn(cs,us,e,t);o.layers=this.layers,this.add(o);const u=new Wn(cs,us,e,t);u.layers=this.layers,this.add(u);const c=new Wn(cs,us,e,t);c.layers=this.layers,this.add(c);const f=new Wn(cs,us,e,t);f.layers=this.layers,this.add(f);const d=new Wn(cs,us,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,a,o,u,c,f]=t;for(const d of t)this.remove(d);if(e===Ui)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===So)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const i=this.renderTarget;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,u,c,f,d]=this.children,p=e.getRenderTarget(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0),e.render(t,a),e.setRenderTarget(i,1),e.render(t,o),e.setRenderTarget(i,2),e.render(t,u),e.setRenderTarget(i,3),e.render(t,c),e.setRenderTarget(i,4),e.render(t,f),i.texture.generateMipmaps=g,e.setRenderTarget(i,5),e.render(t,d),e.setRenderTarget(p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class jd extends Cn{constructor(e,t,i,a,o,u,c,f,d,p){e=e!==void 0?e:[],t=t!==void 0?t:xs,super(e,t,i,a,o,u,c,f,d,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pE extends Ar{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];t.encoding!==void 0&&(Qs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Sr?Pt:Er),this.texture=new jd(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:kn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new aa(5,5,5),o=new ir({name:"CubemapFromEquirect",uniforms:Es(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Mn,blending:Ji});o.uniforms.tEquirect.value=t;const u=new ci(a,o),c=t.minFilter;return t.minFilter===ta&&(t.minFilter=kn),new dE(1,10,this).update(e,u),t.minFilter=c,u.geometry.dispose(),u.material.dispose(),this}clear(e,t,i,a){const o=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,i,a);e.setRenderTarget(o)}}const mc=new W,mE=new W,gE=new ut;class Ki{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,a){return this.normal.set(e,t,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const a=mc.subVectors(i,t).cross(mE.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(mc),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/a;return o<0||o>1?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||gE.getNormalMatrix(e),a=this.coplanarPoint(mc).applyMatrix4(e),o=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gr=new Fc,fo=new W;class Jd{constructor(e=new Ki,t=new Ki,i=new Ki,a=new Ki,o=new Ki,u=new Ki){this.planes=[e,t,i,a,o,u]}set(e,t,i,a,o,u){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(i),c[3].copy(a),c[4].copy(o),c[5].copy(u),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ui){const i=this.planes,a=e.elements,o=a[0],u=a[1],c=a[2],f=a[3],d=a[4],p=a[5],_=a[6],g=a[7],M=a[8],T=a[9],A=a[10],v=a[11],m=a[12],F=a[13],w=a[14],P=a[15];if(i[0].setComponents(f-o,g-d,v-M,P-m).normalize(),i[1].setComponents(f+o,g+d,v+M,P+m).normalize(),i[2].setComponents(f+u,g+p,v+T,P+F).normalize(),i[3].setComponents(f-u,g-p,v-T,P-F).normalize(),i[4].setComponents(f-c,g-_,v-A,P-w).normalize(),t===Ui)i[5].setComponents(f+c,g+_,v+A,P+w).normalize();else if(t===So)i[5].setComponents(c,_,A,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gr)}intersectsSprite(e){return gr.center.set(0,0,0),gr.radius=.7071067811865476,gr.applyMatrix4(e.matrixWorld),this.intersectsSphere(gr)}intersectsSphere(e){const t=this.planes,i=e.center,a=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const a=t[i];if(fo.x=a.normal.x>0?e.max.x:e.min.x,fo.y=a.normal.y>0?e.max.y:e.min.y,fo.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(fo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Qd(){let r=null,e=!1,t=null,i=null;function a(o,u){t(o,u),i=r.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(i=r.requestAnimationFrame(a),e=!0)},stop:function(){r.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){r=o}}}function _E(r,e){const t=e.isWebGL2,i=new WeakMap;function a(d,p){const _=d.array,g=d.usage,M=r.createBuffer();r.bindBuffer(p,M),r.bufferData(p,_,g),d.onUploadCallback();let T;if(_ instanceof Float32Array)T=r.FLOAT;else if(_ instanceof Uint16Array)if(d.isFloat16BufferAttribute)if(t)T=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else T=r.UNSIGNED_SHORT;else if(_ instanceof Int16Array)T=r.SHORT;else if(_ instanceof Uint32Array)T=r.UNSIGNED_INT;else if(_ instanceof Int32Array)T=r.INT;else if(_ instanceof Int8Array)T=r.BYTE;else if(_ instanceof Uint8Array)T=r.UNSIGNED_BYTE;else if(_ instanceof Uint8ClampedArray)T=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+_);return{buffer:M,type:T,bytesPerElement:_.BYTES_PER_ELEMENT,version:d.version}}function o(d,p,_){const g=p.array,M=p.updateRange;r.bindBuffer(_,d),M.count===-1?r.bufferSubData(_,0,g):(t?r.bufferSubData(_,M.offset*g.BYTES_PER_ELEMENT,g,M.offset,M.count):r.bufferSubData(_,M.offset*g.BYTES_PER_ELEMENT,g.subarray(M.offset,M.offset+M.count)),M.count=-1),p.onUploadCallback()}function u(d){return d.isInterleavedBufferAttribute&&(d=d.data),i.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=i.get(d);p&&(r.deleteBuffer(p.buffer),i.delete(d))}function f(d,p){if(d.isGLBufferAttribute){const g=i.get(d);(!g||g.version<d.version)&&i.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}d.isInterleavedBufferAttribute&&(d=d.data);const _=i.get(d);_===void 0?i.set(d,a(d,p)):_.version<d.version&&(o(_.buffer,d,p),_.version=d.version)}return{get:u,remove:c,update:f}}class Co extends wr{constructor(e=1,t=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:a};const o=e/2,u=t/2,c=Math.floor(i),f=Math.floor(a),d=c+1,p=f+1,_=e/c,g=t/f,M=[],T=[],A=[],v=[];for(let m=0;m<p;m++){const F=m*g-u;for(let w=0;w<d;w++){const P=w*_-o;T.push(P,-F,0),A.push(0,0,1),v.push(w/c),v.push(1-m/f)}}for(let m=0;m<f;m++)for(let F=0;F<c;F++){const w=F+d*m,P=F+d*(m+1),N=F+1+d*(m+1),H=F+1+d*m;M.push(w,P,H),M.push(P,N,H)}this.setIndex(M),this.setAttribute("position",new yr(T,3)),this.setAttribute("normal",new yr(A,3)),this.setAttribute("uv",new yr(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Co(e.width,e.height,e.widthSegments,e.heightSegments)}}var vE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ME=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,SE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,EE=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,yE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,AE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,TE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,RE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,CE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,LE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,PE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,DE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,UE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,IE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,NE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,FE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,OE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,BE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,zE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,HE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,GE=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,VE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,WE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,XE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,YE="gl_FragColor = linearToOutputTexel( gl_FragColor );",qE=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$E=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,KE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ZE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,JE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,QE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ey=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ty=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ny=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ry=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,sy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ay=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,oy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ly=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,uy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,py=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,my=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gy=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_y=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometry.viewDir, geometry.normal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,xy=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,My=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Ey=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,yy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ay=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ty=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,by=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ry=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cy=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ly=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Py=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Dy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Uy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,Iy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ny=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Oy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,By=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,zy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Hy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ky=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$y=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ky=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Jy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Qy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,eA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,iA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,aA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,uA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_A=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SA=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,EA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,yA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,AA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,TA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,RA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,CA=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,LA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,IA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,FA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,OA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,BA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,HA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,VA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,WA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,XA=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$A=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:vE,alphahash_pars_fragment:xE,alphamap_fragment:ME,alphamap_pars_fragment:SE,alphatest_fragment:EE,alphatest_pars_fragment:yE,aomap_fragment:AE,aomap_pars_fragment:TE,begin_vertex:bE,beginnormal_vertex:wE,bsdfs:RE,iridescence_fragment:CE,bumpmap_pars_fragment:LE,clipping_planes_fragment:PE,clipping_planes_pars_fragment:DE,clipping_planes_pars_vertex:UE,clipping_planes_vertex:IE,color_fragment:NE,color_pars_fragment:FE,color_pars_vertex:OE,color_vertex:BE,common:zE,cube_uv_reflection_fragment:HE,defaultnormal_vertex:GE,displacementmap_pars_vertex:VE,displacementmap_vertex:kE,emissivemap_fragment:WE,emissivemap_pars_fragment:XE,colorspace_fragment:YE,colorspace_pars_fragment:qE,envmap_fragment:$E,envmap_common_pars_fragment:KE,envmap_pars_fragment:ZE,envmap_pars_vertex:jE,envmap_physical_pars_fragment:cy,envmap_vertex:JE,fog_vertex:QE,fog_pars_vertex:ey,fog_fragment:ty,fog_pars_fragment:ny,gradientmap_pars_fragment:iy,lightmap_fragment:ry,lightmap_pars_fragment:sy,lights_lambert_fragment:ay,lights_lambert_pars_fragment:oy,lights_pars_begin:ly,lights_toon_fragment:uy,lights_toon_pars_fragment:hy,lights_phong_fragment:fy,lights_phong_pars_fragment:dy,lights_physical_fragment:py,lights_physical_pars_fragment:my,lights_fragment_begin:gy,lights_fragment_maps:_y,lights_fragment_end:vy,logdepthbuf_fragment:xy,logdepthbuf_pars_fragment:My,logdepthbuf_pars_vertex:Sy,logdepthbuf_vertex:Ey,map_fragment:yy,map_pars_fragment:Ay,map_particle_fragment:Ty,map_particle_pars_fragment:by,metalnessmap_fragment:wy,metalnessmap_pars_fragment:Ry,morphcolor_vertex:Cy,morphnormal_vertex:Ly,morphtarget_pars_vertex:Py,morphtarget_vertex:Dy,normal_fragment_begin:Uy,normal_fragment_maps:Iy,normal_pars_fragment:Ny,normal_pars_vertex:Fy,normal_vertex:Oy,normalmap_pars_fragment:By,clearcoat_normal_fragment_begin:zy,clearcoat_normal_fragment_maps:Hy,clearcoat_pars_fragment:Gy,iridescence_pars_fragment:Vy,opaque_fragment:ky,packing:Wy,premultiplied_alpha_fragment:Xy,project_vertex:Yy,dithering_fragment:qy,dithering_pars_fragment:$y,roughnessmap_fragment:Ky,roughnessmap_pars_fragment:Zy,shadowmap_pars_fragment:jy,shadowmap_pars_vertex:Jy,shadowmap_vertex:Qy,shadowmask_pars_fragment:eA,skinbase_vertex:tA,skinning_pars_vertex:nA,skinning_vertex:iA,skinnormal_vertex:rA,specularmap_fragment:sA,specularmap_pars_fragment:aA,tonemapping_fragment:oA,tonemapping_pars_fragment:lA,transmission_fragment:cA,transmission_pars_fragment:uA,uv_pars_fragment:hA,uv_pars_vertex:fA,uv_vertex:dA,worldpos_vertex:pA,background_vert:mA,background_frag:gA,backgroundCube_vert:_A,backgroundCube_frag:vA,cube_vert:xA,cube_frag:MA,depth_vert:SA,depth_frag:EA,distanceRGBA_vert:yA,distanceRGBA_frag:AA,equirect_vert:TA,equirect_frag:bA,linedashed_vert:wA,linedashed_frag:RA,meshbasic_vert:CA,meshbasic_frag:LA,meshlambert_vert:PA,meshlambert_frag:DA,meshmatcap_vert:UA,meshmatcap_frag:IA,meshnormal_vert:NA,meshnormal_frag:FA,meshphong_vert:OA,meshphong_frag:BA,meshphysical_vert:zA,meshphysical_frag:HA,meshtoon_vert:GA,meshtoon_frag:VA,points_vert:kA,points_frag:WA,shadow_vert:XA,shadow_frag:YA,sprite_vert:qA,sprite_frag:$A},be={common:{diffuse:{value:new wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new wt(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},oi={basic:{uniforms:pn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:pn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new wt(0)}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:pn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new wt(0)},specular:{value:new wt(1118481)},shininess:{value:30}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:pn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:pn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new wt(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:pn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:pn([be.points,be.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:pn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:pn([be.common,be.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:pn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:pn([be.sprite,be.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distanceRGBA:{uniforms:pn([be.common,be.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distanceRGBA_vert,fragmentShader:it.distanceRGBA_frag},shadow:{uniforms:pn([be.lights,be.fog,{color:{value:new wt(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};oi.physical={uniforms:pn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new wt(0)},specularColor:{value:new wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};const po={r:0,b:0,g:0};function KA(r,e,t,i,a,o,u){const c=new wt(0);let f=o===!0?0:1,d,p,_=null,g=0,M=null;function T(v,m){let F=!1,w=m.isScene===!0?m.background:null;w&&w.isTexture&&(w=(m.backgroundBlurriness>0?t:e).get(w)),w===null?A(c,f):w&&w.isColor&&(A(w,1),F=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,u):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,u),(r.autoClear||F)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),w&&(w.isCubeTexture||w.mapping===To)?(p===void 0&&(p=new ci(new aa(1,1,1),new ir({name:"BackgroundCubeMaterial",uniforms:Es(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(N,H,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(p)),p.material.uniforms.envMap.value=w,p.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,p.material.toneMapped=w.colorSpace!==Pt,(_!==w||g!==w.version||M!==r.toneMapping)&&(p.material.needsUpdate=!0,_=w,g=w.version,M=r.toneMapping),p.layers.enableAll(),v.unshift(p,p.geometry,p.material,0,0,null)):w&&w.isTexture&&(d===void 0&&(d=new ci(new Co(2,2),new ir({name:"BackgroundMaterial",uniforms:Es(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:nr,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(d)),d.material.uniforms.t2D.value=w,d.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,d.material.toneMapped=w.colorSpace!==Pt,w.matrixAutoUpdate===!0&&w.updateMatrix(),d.material.uniforms.uvTransform.value.copy(w.matrix),(_!==w||g!==w.version||M!==r.toneMapping)&&(d.material.needsUpdate=!0,_=w,g=w.version,M=r.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null))}function A(v,m){v.getRGB(po,Kd(r)),i.buffers.color.setClear(po.r,po.g,po.b,m,u)}return{getClearColor:function(){return c},setClearColor:function(v,m=1){c.set(v),f=m,A(c,f)},getClearAlpha:function(){return f},setClearAlpha:function(v){f=v,A(c,f)},render:T}}function ZA(r,e,t,i){const a=r.getParameter(r.MAX_VERTEX_ATTRIBS),o=i.isWebGL2?null:e.get("OES_vertex_array_object"),u=i.isWebGL2||o!==null,c={},f=v(null);let d=f,p=!1;function _(ee,J,pe,ie,se){let ve=!1;if(u){const ue=A(ie,pe,J);d!==ue&&(d=ue,M(d.object)),ve=m(ee,ie,pe,se),ve&&F(ee,ie,pe,se)}else{const ue=J.wireframe===!0;(d.geometry!==ie.id||d.program!==pe.id||d.wireframe!==ue)&&(d.geometry=ie.id,d.program=pe.id,d.wireframe=ue,ve=!0)}se!==null&&t.update(se,r.ELEMENT_ARRAY_BUFFER),(ve||p)&&(p=!1,ae(ee,J,pe,ie),se!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(se).buffer))}function g(){return i.isWebGL2?r.createVertexArray():o.createVertexArrayOES()}function M(ee){return i.isWebGL2?r.bindVertexArray(ee):o.bindVertexArrayOES(ee)}function T(ee){return i.isWebGL2?r.deleteVertexArray(ee):o.deleteVertexArrayOES(ee)}function A(ee,J,pe){const ie=pe.wireframe===!0;let se=c[ee.id];se===void 0&&(se={},c[ee.id]=se);let ve=se[J.id];ve===void 0&&(ve={},se[J.id]=ve);let ue=ve[ie];return ue===void 0&&(ue=v(g()),ve[ie]=ue),ue}function v(ee){const J=[],pe=[],ie=[];for(let se=0;se<a;se++)J[se]=0,pe[se]=0,ie[se]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:J,enabledAttributes:pe,attributeDivisors:ie,object:ee,attributes:{},index:null}}function m(ee,J,pe,ie){const se=d.attributes,ve=J.attributes;let ue=0;const q=pe.getAttributes();for(const Q in q)if(q[Q].location>=0){const Ce=se[Q];let Le=ve[Q];if(Le===void 0&&(Q==="instanceMatrix"&&ee.instanceMatrix&&(Le=ee.instanceMatrix),Q==="instanceColor"&&ee.instanceColor&&(Le=ee.instanceColor)),Ce===void 0||Ce.attribute!==Le||Le&&Ce.data!==Le.data)return!0;ue++}return d.attributesNum!==ue||d.index!==ie}function F(ee,J,pe,ie){const se={},ve=J.attributes;let ue=0;const q=pe.getAttributes();for(const Q in q)if(q[Q].location>=0){let Ce=ve[Q];Ce===void 0&&(Q==="instanceMatrix"&&ee.instanceMatrix&&(Ce=ee.instanceMatrix),Q==="instanceColor"&&ee.instanceColor&&(Ce=ee.instanceColor));const Le={};Le.attribute=Ce,Ce&&Ce.data&&(Le.data=Ce.data),se[Q]=Le,ue++}d.attributes=se,d.attributesNum=ue,d.index=ie}function w(){const ee=d.newAttributes;for(let J=0,pe=ee.length;J<pe;J++)ee[J]=0}function P(ee){N(ee,0)}function N(ee,J){const pe=d.newAttributes,ie=d.enabledAttributes,se=d.attributeDivisors;pe[ee]=1,ie[ee]===0&&(r.enableVertexAttribArray(ee),ie[ee]=1),se[ee]!==J&&((i.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](ee,J),se[ee]=J)}function H(){const ee=d.newAttributes,J=d.enabledAttributes;for(let pe=0,ie=J.length;pe<ie;pe++)J[pe]!==ee[pe]&&(r.disableVertexAttribArray(pe),J[pe]=0)}function U(ee,J,pe,ie,se,ve,ue){ue===!0?r.vertexAttribIPointer(ee,J,pe,se,ve):r.vertexAttribPointer(ee,J,pe,ie,se,ve)}function ae(ee,J,pe,ie){if(i.isWebGL2===!1&&(ee.isInstancedMesh||ie.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;w();const se=ie.attributes,ve=pe.getAttributes(),ue=J.defaultAttributeValues;for(const q in ve){const Q=ve[q];if(Q.location>=0){let Re=se[q];if(Re===void 0&&(q==="instanceMatrix"&&ee.instanceMatrix&&(Re=ee.instanceMatrix),q==="instanceColor"&&ee.instanceColor&&(Re=ee.instanceColor)),Re!==void 0){const Ce=Re.normalized,Le=Re.itemSize,Oe=t.get(Re);if(Oe===void 0)continue;const $e=Oe.buffer,Fe=Oe.type,rt=Oe.bytesPerElement,Gt=i.isWebGL2===!0&&(Fe===r.INT||Fe===r.UNSIGNED_INT||Re.gpuType===Dd);if(Re.isInterleavedBufferAttribute){const Ke=Re.data,V=Ke.stride,Nt=Re.offset;if(Ke.isInstancedInterleavedBuffer){for(let Ue=0;Ue<Q.locationSize;Ue++)N(Q.location+Ue,Ke.meshPerAttribute);ee.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=Ke.meshPerAttribute*Ke.count)}else for(let Ue=0;Ue<Q.locationSize;Ue++)P(Q.location+Ue);r.bindBuffer(r.ARRAY_BUFFER,$e);for(let Ue=0;Ue<Q.locationSize;Ue++)U(Q.location+Ue,Le/Q.locationSize,Fe,Ce,V*rt,(Nt+Le/Q.locationSize*Ue)*rt,Gt)}else{if(Re.isInstancedBufferAttribute){for(let Ke=0;Ke<Q.locationSize;Ke++)N(Q.location+Ke,Re.meshPerAttribute);ee.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let Ke=0;Ke<Q.locationSize;Ke++)P(Q.location+Ke);r.bindBuffer(r.ARRAY_BUFFER,$e);for(let Ke=0;Ke<Q.locationSize;Ke++)U(Q.location+Ke,Le/Q.locationSize,Fe,Ce,Le*rt,Le/Q.locationSize*Ke*rt,Gt)}}else if(ue!==void 0){const Ce=ue[q];if(Ce!==void 0)switch(Ce.length){case 2:r.vertexAttrib2fv(Q.location,Ce);break;case 3:r.vertexAttrib3fv(Q.location,Ce);break;case 4:r.vertexAttrib4fv(Q.location,Ce);break;default:r.vertexAttrib1fv(Q.location,Ce)}}}}H()}function b(){ge();for(const ee in c){const J=c[ee];for(const pe in J){const ie=J[pe];for(const se in ie)T(ie[se].object),delete ie[se];delete J[pe]}delete c[ee]}}function D(ee){if(c[ee.id]===void 0)return;const J=c[ee.id];for(const pe in J){const ie=J[pe];for(const se in ie)T(ie[se].object),delete ie[se];delete J[pe]}delete c[ee.id]}function de(ee){for(const J in c){const pe=c[J];if(pe[ee.id]===void 0)continue;const ie=pe[ee.id];for(const se in ie)T(ie[se].object),delete ie[se];delete pe[ee.id]}}function ge(){Z(),p=!0,d!==f&&(d=f,M(d.object))}function Z(){f.geometry=null,f.program=null,f.wireframe=!1}return{setup:_,reset:ge,resetDefaultState:Z,dispose:b,releaseStatesOfGeometry:D,releaseStatesOfProgram:de,initAttributes:w,enableAttribute:P,disableUnusedAttributes:H}}function jA(r,e,t,i){const a=i.isWebGL2;let o;function u(d){o=d}function c(d,p){r.drawArrays(o,d,p),t.update(p,o,1)}function f(d,p,_){if(_===0)return;let g,M;if(a)g=r,M="drawArraysInstanced";else if(g=e.get("ANGLE_instanced_arrays"),M="drawArraysInstancedANGLE",g===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[M](o,d,p,_),t.update(p,o,_)}this.setMode=u,this.render=c,this.renderInstances=f}function JA(r,e,t){let i;function a(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(U){if(U==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const u=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let c=t.precision!==void 0?t.precision:"highp";const f=o(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const d=u||e.has("WEBGL_draw_buffers"),p=t.logarithmicDepthBuffer===!0,_=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=r.getParameter(r.MAX_TEXTURE_SIZE),T=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),A=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),m=r.getParameter(r.MAX_VARYING_VECTORS),F=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,P=u||e.has("OES_texture_float"),N=w&&P,H=u?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:u,drawBuffers:d,getMaxAnisotropy:a,getMaxPrecision:o,precision:c,logarithmicDepthBuffer:p,maxTextures:_,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:T,maxAttributes:A,maxVertexUniforms:v,maxVaryings:m,maxFragmentUniforms:F,vertexTextures:w,floatFragmentTextures:P,floatVertexTextures:N,maxSamples:H}}function QA(r){const e=this;let t=null,i=0,a=!1,o=!1;const u=new Ki,c=new ut,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const M=_.length!==0||g||i!==0||a;return a=g,i=_.length,M},this.beginShadows=function(){o=!0,p(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(_,g){t=p(_,g,0)},this.setState=function(_,g,M){const T=_.clippingPlanes,A=_.clipIntersection,v=_.clipShadows,m=r.get(_);if(!a||T===null||T.length===0||o&&!v)o?p(null):d();else{const F=o?0:i,w=F*4;let P=m.clippingState||null;f.value=P,P=p(T,g,w,M);for(let N=0;N!==w;++N)P[N]=t[N];m.clippingState=P,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=F}};function d(){f.value!==t&&(f.value=t,f.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function p(_,g,M,T){const A=_!==null?_.length:0;let v=null;if(A!==0){if(v=f.value,T!==!0||v===null){const m=M+A*4,F=g.matrixWorldInverse;c.getNormalMatrix(F),(v===null||v.length<m)&&(v=new Float32Array(m));for(let w=0,P=M;w!==A;++w,P+=4)u.copy(_[w]).applyMatrix4(F,c),u.normal.toArray(v,P),v[P+3]=u.constant}f.value=v,f.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,v}}function eT(r){let e=new WeakMap;function t(u,c){return c===Ac?u.mapping=xs:c===Tc&&(u.mapping=Ms),u}function i(u){if(u&&u.isTexture&&u.isRenderTargetTexture===!1){const c=u.mapping;if(c===Ac||c===Tc)if(e.has(u)){const f=e.get(u).texture;return t(f,u.mapping)}else{const f=u.image;if(f&&f.height>0){const d=new pE(f.height/2);return d.fromEquirectangularTexture(r,u),e.set(u,d),u.addEventListener("dispose",a),t(d.texture,u.mapping)}else return null}}return u}function a(u){const c=u.target;c.removeEventListener("dispose",a);const f=e.get(c);f!==void 0&&(e.delete(c),f.dispose())}function o(){e=new WeakMap}return{get:i,dispose:o}}class tT extends Zd{constructor(e=-1,t=1,i=1,a=-1,o=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=a,this.near=o,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,a,o,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=o,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let o=i-e,u=i+e,c=a+t,f=a-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=d*this.view.offsetX,u=o+d*this.view.width,c-=p*this.view.offsetY,f=c-p*this.view.height}this.projectionMatrix.makeOrthographic(o,u,c,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ms=4,td=[.125,.215,.35,.446,.526,.582],vr=20,gc=new tT,nd=new wt;let _c=null;const _r=(1+Math.sqrt(5))/2,hs=1/_r,id=[new W(1,1,1),new W(-1,1,1),new W(1,1,-1),new W(-1,1,-1),new W(0,_r,hs),new W(0,_r,-hs),new W(hs,0,_r),new W(-hs,0,_r),new W(_r,hs,0),new W(-_r,hs,0)];class rd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,a=100){_c=this._renderer.getRenderTarget(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,a,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=od(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ad(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_c),e.scissorTest=!1,mo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===xs||e.mapping===Ms?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_c=this._renderer.getRenderTarget();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:kn,minFilter:kn,generateMipmaps:!1,type:na,format:ti,colorSpace:pi,depthBuffer:!1},a=sd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sd(e,t,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=nT(o)),this._blurMaterial=iT(o,e,t)}return a}_compileMaterial(e){const t=new ci(this._lodPlanes[0],e);this._renderer.compile(t,gc)}_sceneToCubeUV(e,t,i,a){const c=new Wn(90,1,t,i),f=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,_=p.autoClear,g=p.toneMapping;p.getClearColor(nd),p.toneMapping=Qi,p.autoClear=!1;const M=new Yd({name:"PMREM.Background",side:Mn,depthWrite:!1,depthTest:!1}),T=new ci(new aa,M);let A=!1;const v=e.background;v?v.isColor&&(M.color.copy(v),e.background=null,A=!0):(M.color.copy(nd),A=!0);for(let m=0;m<6;m++){const F=m%3;F===0?(c.up.set(0,f[m],0),c.lookAt(d[m],0,0)):F===1?(c.up.set(0,0,f[m]),c.lookAt(0,d[m],0)):(c.up.set(0,f[m],0),c.lookAt(0,0,d[m]));const w=this._cubeSize;mo(a,F*w,m>2?w:0,w,w),p.setRenderTarget(a),A&&p.render(T,c),p.render(e,c)}T.geometry.dispose(),T.material.dispose(),p.toneMapping=g,p.autoClear=_,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,a=e.mapping===xs||e.mapping===Ms;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=od()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ad());const o=a?this._cubemapMaterial:this._equirectMaterial,u=new ci(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=e;const f=this._cubeSize;mo(t,0,0,3*f,2*f),i.setRenderTarget(t),i.render(u,gc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let a=1;a<this._lodPlanes.length;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),u=id[(a-1)%id.length];this._blur(e,a-1,a,o,u)}t.autoClear=i}_blur(e,t,i,a,o){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,i,a,"latitudinal",o),this._halfBlur(u,e,i,i,a,"longitudinal",o)}_halfBlur(e,t,i,a,o,u,c){const f=this._renderer,d=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const p=3,_=new ci(this._lodPlanes[a],d),g=d.uniforms,M=this._sizeLods[i]-1,T=isFinite(o)?Math.PI/(2*M):2*Math.PI/(2*vr-1),A=o/T,v=isFinite(o)?1+Math.floor(p*A):vr;v>vr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${vr}`);const m=[];let F=0;for(let U=0;U<vr;++U){const ae=U/A,b=Math.exp(-ae*ae/2);m.push(b),U===0?F+=b:U<v&&(F+=2*b)}for(let U=0;U<m.length;U++)m[U]=m[U]/F;g.envMap.value=e.texture,g.samples.value=v,g.weights.value=m,g.latitudinal.value=u==="latitudinal",c&&(g.poleAxis.value=c);const{_lodMax:w}=this;g.dTheta.value=T,g.mipInt.value=w-i;const P=this._sizeLods[a],N=3*P*(a>w-ms?a-w+ms:0),H=4*(this._cubeSize-P);mo(t,N,H,3*P,2*P),f.setRenderTarget(t),f.render(_,gc)}}function nT(r){const e=[],t=[],i=[];let a=r;const o=r-ms+1+td.length;for(let u=0;u<o;u++){const c=Math.pow(2,a);t.push(c);let f=1/c;u>r-ms?f=td[u-r+ms-1]:u===0&&(f=0),i.push(f);const d=1/(c-2),p=-d,_=1+d,g=[p,p,_,p,_,_,p,p,_,_,p,_],M=6,T=6,A=3,v=2,m=1,F=new Float32Array(A*T*M),w=new Float32Array(v*T*M),P=new Float32Array(m*T*M);for(let H=0;H<M;H++){const U=H%3*2/3-1,ae=H>2?0:-1,b=[U,ae,0,U+2/3,ae,0,U+2/3,ae+1,0,U,ae,0,U+2/3,ae+1,0,U,ae+1,0];F.set(b,A*T*H),w.set(g,v*T*H);const D=[H,H,H,H,H,H];P.set(D,m*T*H)}const N=new wr;N.setAttribute("position",new Pn(F,A)),N.setAttribute("uv",new Pn(w,v)),N.setAttribute("faceIndex",new Pn(P,m)),e.push(N),a>ms&&a--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function sd(r,e,t){const i=new Ar(r,e,t);return i.texture.mapping=To,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function mo(r,e,t,i,a){r.viewport.set(e,t,i,a),r.scissor.set(e,t,i,a)}function iT(r,e,t){const i=new Float32Array(vr),a=new W(0,1,0);return new ir({name:"SphericalGaussianBlur",defines:{n:vr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function ad(){return new ir({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function od(){return new ir({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Oc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function rT(r){let e=new WeakMap,t=null;function i(c){if(c&&c.isTexture){const f=c.mapping,d=f===Ac||f===Tc,p=f===xs||f===Ms;if(d||p)if(c.isRenderTargetTexture&&c.needsPMREMUpdate===!0){c.needsPMREMUpdate=!1;let _=e.get(c);return t===null&&(t=new rd(r)),_=d?t.fromEquirectangular(c,_):t.fromCubemap(c,_),e.set(c,_),_.texture}else{if(e.has(c))return e.get(c).texture;{const _=c.image;if(d&&_&&_.height>0||p&&_&&a(_)){t===null&&(t=new rd(r));const g=d?t.fromEquirectangular(c):t.fromCubemap(c);return e.set(c,g),c.addEventListener("dispose",o),g.texture}else return null}}}return c}function a(c){let f=0;const d=6;for(let p=0;p<d;p++)c[p]!==void 0&&f++;return f===d}function o(c){const f=c.target;f.removeEventListener("dispose",o);const d=e.get(f);d!==void 0&&(e.delete(f),d.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:u}}function sT(r){const e={};function t(i){if(e[i]!==void 0)return e[i];let a;switch(i){case"WEBGL_depth_texture":a=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=r.getExtension(i)}return e[i]=a,a}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const a=t(i);return a===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function aT(r,e,t,i){const a={},o=new WeakMap;function u(_){const g=_.target;g.index!==null&&e.remove(g.index);for(const T in g.attributes)e.remove(g.attributes[T]);for(const T in g.morphAttributes){const A=g.morphAttributes[T];for(let v=0,m=A.length;v<m;v++)e.remove(A[v])}g.removeEventListener("dispose",u),delete a[g.id];const M=o.get(g);M&&(e.remove(M),o.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(_,g){return a[g.id]===!0||(g.addEventListener("dispose",u),a[g.id]=!0,t.memory.geometries++),g}function f(_){const g=_.attributes;for(const T in g)e.update(g[T],r.ARRAY_BUFFER);const M=_.morphAttributes;for(const T in M){const A=M[T];for(let v=0,m=A.length;v<m;v++)e.update(A[v],r.ARRAY_BUFFER)}}function d(_){const g=[],M=_.index,T=_.attributes.position;let A=0;if(M!==null){const F=M.array;A=M.version;for(let w=0,P=F.length;w<P;w+=3){const N=F[w+0],H=F[w+1],U=F[w+2];g.push(N,H,H,U,U,N)}}else if(T!==void 0){const F=T.array;A=T.version;for(let w=0,P=F.length/3-1;w<P;w+=3){const N=w+0,H=w+1,U=w+2;g.push(N,H,H,U,U,N)}}else return;const v=new(zd(g)?$d:qd)(g,1);v.version=A;const m=o.get(_);m&&e.remove(m),o.set(_,v)}function p(_){const g=o.get(_);if(g){const M=_.index;M!==null&&g.version<M.version&&d(_)}else d(_);return o.get(_)}return{get:c,update:f,getWireframeAttribute:p}}function oT(r,e,t,i){const a=i.isWebGL2;let o;function u(g){o=g}let c,f;function d(g){c=g.type,f=g.bytesPerElement}function p(g,M){r.drawElements(o,M,c,g*f),t.update(M,o,1)}function _(g,M,T){if(T===0)return;let A,v;if(a)A=r,v="drawElementsInstanced";else if(A=e.get("ANGLE_instanced_arrays"),v="drawElementsInstancedANGLE",A===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}A[v](o,M,c,g*f,T),t.update(M,o,T)}this.setMode=u,this.setIndex=d,this.render=p,this.renderInstances=_}function lT(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,u,c){switch(t.calls++,u){case r.TRIANGLES:t.triangles+=c*(o/3);break;case r.LINES:t.lines+=c*(o/2);break;case r.LINE_STRIP:t.lines+=c*(o-1);break;case r.LINE_LOOP:t.lines+=c*o;break;case r.POINTS:t.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:i}}function cT(r,e){return r[0]-e[0]}function uT(r,e){return Math.abs(e[1])-Math.abs(r[1])}function hT(r,e,t){const i={},a=new Float32Array(8),o=new WeakMap,u=new en,c=[];for(let d=0;d<8;d++)c[d]=[d,0];function f(d,p,_){const g=d.morphTargetInfluences;if(e.isWebGL2===!0){const T=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,A=T!==void 0?T.length:0;let v=o.get(p);if(v===void 0||v.count!==A){let J=function(){Z.dispose(),o.delete(p),p.removeEventListener("dispose",J)};var M=J;v!==void 0&&v.texture.dispose();const w=p.morphAttributes.position!==void 0,P=p.morphAttributes.normal!==void 0,N=p.morphAttributes.color!==void 0,H=p.morphAttributes.position||[],U=p.morphAttributes.normal||[],ae=p.morphAttributes.color||[];let b=0;w===!0&&(b=1),P===!0&&(b=2),N===!0&&(b=3);let D=p.attributes.position.count*b,de=1;D>e.maxTextureSize&&(de=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const ge=new Float32Array(D*de*4*A),Z=new Vd(ge,D,de,A);Z.type=ji,Z.needsUpdate=!0;const ee=b*4;for(let pe=0;pe<A;pe++){const ie=H[pe],se=U[pe],ve=ae[pe],ue=D*de*4*pe;for(let q=0;q<ie.count;q++){const Q=q*ee;w===!0&&(u.fromBufferAttribute(ie,q),ge[ue+Q+0]=u.x,ge[ue+Q+1]=u.y,ge[ue+Q+2]=u.z,ge[ue+Q+3]=0),P===!0&&(u.fromBufferAttribute(se,q),ge[ue+Q+4]=u.x,ge[ue+Q+5]=u.y,ge[ue+Q+6]=u.z,ge[ue+Q+7]=0),N===!0&&(u.fromBufferAttribute(ve,q),ge[ue+Q+8]=u.x,ge[ue+Q+9]=u.y,ge[ue+Q+10]=u.z,ge[ue+Q+11]=ve.itemSize===4?u.w:1)}}v={count:A,texture:Z,size:new ht(D,de)},o.set(p,v),p.addEventListener("dispose",J)}let m=0;for(let w=0;w<g.length;w++)m+=g[w];const F=p.morphTargetsRelative?1:1-m;_.getUniforms().setValue(r,"morphTargetBaseInfluence",F),_.getUniforms().setValue(r,"morphTargetInfluences",g),_.getUniforms().setValue(r,"morphTargetsTexture",v.texture,t),_.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}else{const T=g===void 0?0:g.length;let A=i[p.id];if(A===void 0||A.length!==T){A=[];for(let P=0;P<T;P++)A[P]=[P,0];i[p.id]=A}for(let P=0;P<T;P++){const N=A[P];N[0]=P,N[1]=g[P]}A.sort(uT);for(let P=0;P<8;P++)P<T&&A[P][1]?(c[P][0]=A[P][0],c[P][1]=A[P][1]):(c[P][0]=Number.MAX_SAFE_INTEGER,c[P][1]=0);c.sort(cT);const v=p.morphAttributes.position,m=p.morphAttributes.normal;let F=0;for(let P=0;P<8;P++){const N=c[P],H=N[0],U=N[1];H!==Number.MAX_SAFE_INTEGER&&U?(v&&p.getAttribute("morphTarget"+P)!==v[H]&&p.setAttribute("morphTarget"+P,v[H]),m&&p.getAttribute("morphNormal"+P)!==m[H]&&p.setAttribute("morphNormal"+P,m[H]),a[P]=U,F+=U):(v&&p.hasAttribute("morphTarget"+P)===!0&&p.deleteAttribute("morphTarget"+P),m&&p.hasAttribute("morphNormal"+P)===!0&&p.deleteAttribute("morphNormal"+P),a[P]=0)}const w=p.morphTargetsRelative?1:1-F;_.getUniforms().setValue(r,"morphTargetBaseInfluence",w),_.getUniforms().setValue(r,"morphTargetInfluences",a)}}return{update:f}}function fT(r,e,t,i){let a=new WeakMap;function o(f){const d=i.render.frame,p=f.geometry,_=e.get(f,p);if(a.get(_)!==d&&(e.update(_),a.set(_,d)),f.isInstancedMesh&&(f.hasEventListener("dispose",c)===!1&&f.addEventListener("dispose",c),a.get(f)!==d&&(t.update(f.instanceMatrix,r.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,r.ARRAY_BUFFER),a.set(f,d))),f.isSkinnedMesh){const g=f.skeleton;a.get(g)!==d&&(g.update(),a.set(g,d))}return _}function u(){a=new WeakMap}function c(f){const d=f.target;d.removeEventListener("dispose",c),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:o,dispose:u}}const ep=new Cn,tp=new Vd,np=new jS,ip=new jd,ld=[],cd=[],ud=new Float32Array(16),hd=new Float32Array(9),fd=new Float32Array(4);function As(r,e,t){const i=r[0];if(i<=0||i>0)return r;const a=e*t;let o=ld[a];if(o===void 0&&(o=new Float32Array(a),ld[a]=o),e!==0){i.toArray(o,0);for(let u=1,c=0;u!==e;++u)c+=t,r[u].toArray(o,c)}return o}function Yt(r,e){if(r.length!==e.length)return!1;for(let t=0,i=r.length;t<i;t++)if(r[t]!==e[t])return!1;return!0}function qt(r,e){for(let t=0,i=e.length;t<i;t++)r[t]=e[t]}function Lo(r,e){let t=cd[e];t===void 0&&(t=new Int32Array(e),cd[e]=t);for(let i=0;i!==e;++i)t[i]=r.allocateTextureUnit();return t}function dT(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function pT(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2fv(this.addr,e),qt(t,e)}}function mT(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;r.uniform3fv(this.addr,e),qt(t,e)}}function gT(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4fv(this.addr,e),qt(t,e)}}function _T(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Yt(t,i))return;fd.set(i),r.uniformMatrix2fv(this.addr,!1,fd),qt(t,i)}}function vT(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Yt(t,i))return;hd.set(i),r.uniformMatrix3fv(this.addr,!1,hd),qt(t,i)}}function xT(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Yt(t,i))return;ud.set(i),r.uniformMatrix4fv(this.addr,!1,ud),qt(t,i)}}function MT(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function ST(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2iv(this.addr,e),qt(t,e)}}function ET(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;r.uniform3iv(this.addr,e),qt(t,e)}}function yT(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4iv(this.addr,e),qt(t,e)}}function AT(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function TT(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2uiv(this.addr,e),qt(t,e)}}function bT(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;r.uniform3uiv(this.addr,e),qt(t,e)}}function wT(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4uiv(this.addr,e),qt(t,e)}}function RT(r,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(r.uniform1i(this.addr,a),i[0]=a),t.setTexture2D(e||ep,a)}function CT(r,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(r.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(e||np,a)}function LT(r,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(r.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(e||ip,a)}function PT(r,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(r.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(e||tp,a)}function DT(r){switch(r){case 5126:return dT;case 35664:return pT;case 35665:return mT;case 35666:return gT;case 35674:return _T;case 35675:return vT;case 35676:return xT;case 5124:case 35670:return MT;case 35667:case 35671:return ST;case 35668:case 35672:return ET;case 35669:case 35673:return yT;case 5125:return AT;case 36294:return TT;case 36295:return bT;case 36296:return wT;case 35678:case 36198:case 36298:case 36306:case 35682:return RT;case 35679:case 36299:case 36307:return CT;case 35680:case 36300:case 36308:case 36293:return LT;case 36289:case 36303:case 36311:case 36292:return PT}}function UT(r,e){r.uniform1fv(this.addr,e)}function IT(r,e){const t=As(e,this.size,2);r.uniform2fv(this.addr,t)}function NT(r,e){const t=As(e,this.size,3);r.uniform3fv(this.addr,t)}function FT(r,e){const t=As(e,this.size,4);r.uniform4fv(this.addr,t)}function OT(r,e){const t=As(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function BT(r,e){const t=As(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function zT(r,e){const t=As(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function HT(r,e){r.uniform1iv(this.addr,e)}function GT(r,e){r.uniform2iv(this.addr,e)}function VT(r,e){r.uniform3iv(this.addr,e)}function kT(r,e){r.uniform4iv(this.addr,e)}function WT(r,e){r.uniform1uiv(this.addr,e)}function XT(r,e){r.uniform2uiv(this.addr,e)}function YT(r,e){r.uniform3uiv(this.addr,e)}function qT(r,e){r.uniform4uiv(this.addr,e)}function $T(r,e,t){const i=this.cache,a=e.length,o=Lo(t,a);Yt(i,o)||(r.uniform1iv(this.addr,o),qt(i,o));for(let u=0;u!==a;++u)t.setTexture2D(e[u]||ep,o[u])}function KT(r,e,t){const i=this.cache,a=e.length,o=Lo(t,a);Yt(i,o)||(r.uniform1iv(this.addr,o),qt(i,o));for(let u=0;u!==a;++u)t.setTexture3D(e[u]||np,o[u])}function ZT(r,e,t){const i=this.cache,a=e.length,o=Lo(t,a);Yt(i,o)||(r.uniform1iv(this.addr,o),qt(i,o));for(let u=0;u!==a;++u)t.setTextureCube(e[u]||ip,o[u])}function jT(r,e,t){const i=this.cache,a=e.length,o=Lo(t,a);Yt(i,o)||(r.uniform1iv(this.addr,o),qt(i,o));for(let u=0;u!==a;++u)t.setTexture2DArray(e[u]||tp,o[u])}function JT(r){switch(r){case 5126:return UT;case 35664:return IT;case 35665:return NT;case 35666:return FT;case 35674:return OT;case 35675:return BT;case 35676:return zT;case 5124:case 35670:return HT;case 35667:case 35671:return GT;case 35668:case 35672:return VT;case 35669:case 35673:return kT;case 5125:return WT;case 36294:return XT;case 36295:return YT;case 36296:return qT;case 35678:case 36198:case 36298:case 36306:case 35682:return $T;case 35679:case 36299:case 36307:return KT;case 35680:case 36300:case 36308:case 36293:return ZT;case 36289:case 36303:case 36311:case 36292:return jT}}class QT{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=DT(t.type)}}class eb{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=JT(t.type)}}class tb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const a=this.seq;for(let o=0,u=a.length;o!==u;++o){const c=a[o];c.setValue(e,t[c.id],i)}}}const vc=/(\w+)(\])?(\[|\.)?/g;function dd(r,e){r.seq.push(e),r.map[e.id]=e}function nb(r,e,t){const i=r.name,a=i.length;for(vc.lastIndex=0;;){const o=vc.exec(i),u=vc.lastIndex;let c=o[1];const f=o[2]==="]",d=o[3];if(f&&(c=c|0),d===void 0||d==="["&&u+2===a){dd(t,d===void 0?new QT(c,r,e):new eb(c,r,e));break}else{let _=t.map[c];_===void 0&&(_=new tb(c),dd(t,_)),t=_}}}class vo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),u=e.getUniformLocation(t,o.name);nb(o,u,this)}}setValue(e,t,i,a){const o=this.map[t];o!==void 0&&o.setValue(e,i,a)}setOptional(e,t,i){const a=t[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,t,i,a){for(let o=0,u=t.length;o!==u;++o){const c=t[o],f=i[c.id];f.needsUpdate!==!1&&c.setValue(e,f.value,a)}}static seqWithValue(e,t){const i=[];for(let a=0,o=e.length;a!==o;++a){const u=e[a];u.id in t&&i.push(u)}return i}}function pd(r,e,t){const i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}let ib=0;function rb(r,e){const t=r.split(`
`),i=[],a=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let u=a;u<o;u++){const c=u+1;i.push(`${c===e?">":" "} ${c}: ${t[u]}`)}return i.join(`
`)}function sb(r){switch(r){case pi:return["Linear","( value )"];case Pt:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),["Linear","( value )"]}}function md(r,e,t){const i=r.getShaderParameter(e,r.COMPILE_STATUS),a=r.getShaderInfoLog(e).trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const u=parseInt(o[1]);return t.toUpperCase()+`

`+a+`

`+rb(r.getShaderSource(e),u)}else return a}function ab(r,e){const t=sb(e);return"vec4 "+r+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function ob(r,e){let t;switch(e){case JM:t="Linear";break;case QM:t="Reinhard";break;case eS:t="OptimizedCineon";break;case tS:t="ACESFilmic";break;case nS:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function lb(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Zs).join(`
`)}function cb(r){const e=[];for(const t in r){const i=r[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ub(r,e){const t={},i=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const o=r.getActiveAttrib(e,a),u=o.name;let c=1;o.type===r.FLOAT_MAT2&&(c=2),o.type===r.FLOAT_MAT3&&(c=3),o.type===r.FLOAT_MAT4&&(c=4),t[u]={type:o.type,location:r.getAttribLocation(e,u),locationSize:c}}return t}function Zs(r){return r!==""}function gd(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _d(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const hb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lc(r){return r.replace(hb,db)}const fb=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function db(r,e){let t=it[e];if(t===void 0){const i=fb.get(e);if(i!==void 0)t=it[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Lc(t)}const pb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vd(r){return r.replace(pb,mb)}function mb(r,e,t,i){let a="";for(let o=parseInt(e);o<parseInt(t);o++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return a}function xd(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function gb(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===wd?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===LM?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Di&&(e="SHADOWMAP_TYPE_VSM"),e}function _b(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case xs:case Ms:e="ENVMAP_TYPE_CUBE";break;case To:e="ENVMAP_TYPE_CUBE_UV";break}return e}function vb(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ms:e="ENVMAP_MODE_REFRACTION";break}return e}function xb(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ld:e="ENVMAP_BLENDING_MULTIPLY";break;case ZM:e="ENVMAP_BLENDING_MIX";break;case jM:e="ENVMAP_BLENDING_ADD";break}return e}function Mb(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Sb(r,e,t,i){const a=r.getContext(),o=t.defines;let u=t.vertexShader,c=t.fragmentShader;const f=gb(t),d=_b(t),p=vb(t),_=xb(t),g=Mb(t),M=t.isWebGL2?"":lb(t),T=cb(o),A=a.createProgram();let v,m,F=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,T].filter(Zs).join(`
`),v.length>0&&(v+=`
`),m=[M,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,T].filter(Zs).join(`
`),m.length>0&&(m+=`
`)):(v=[xd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,T,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zs).join(`
`),m=[M,xd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,T,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",t.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qi?"#define TONE_MAPPING":"",t.toneMapping!==Qi?it.tonemapping_pars_fragment:"",t.toneMapping!==Qi?ob("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,ab("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zs).join(`
`)),u=Lc(u),u=gd(u,t),u=_d(u,t),c=Lc(c),c=gd(c,t),c=_d(c,t),u=vd(u),c=vd(c),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(F=`#version 300 es
`,v=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,m=["#define varying in",t.glslVersion===zf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const w=F+v+u,P=F+m+c,N=pd(a,a.VERTEX_SHADER,w),H=pd(a,a.FRAGMENT_SHADER,P);if(a.attachShader(A,N),a.attachShader(A,H),t.index0AttributeName!==void 0?a.bindAttribLocation(A,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(A,0,"position"),a.linkProgram(A),r.debug.checkShaderErrors){const b=a.getProgramInfoLog(A).trim(),D=a.getShaderInfoLog(N).trim(),de=a.getShaderInfoLog(H).trim();let ge=!0,Z=!0;if(a.getProgramParameter(A,a.LINK_STATUS)===!1)if(ge=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(a,A,N,H);else{const ee=md(a,N,"vertex"),J=md(a,H,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(A,a.VALIDATE_STATUS)+`

Program Info Log: `+b+`
`+ee+`
`+J)}else b!==""?console.warn("THREE.WebGLProgram: Program Info Log:",b):(D===""||de==="")&&(Z=!1);Z&&(this.diagnostics={runnable:ge,programLog:b,vertexShader:{log:D,prefix:v},fragmentShader:{log:de,prefix:m}})}a.deleteShader(N),a.deleteShader(H);let U;this.getUniforms=function(){return U===void 0&&(U=new vo(a,A)),U};let ae;return this.getAttributes=function(){return ae===void 0&&(ae=ub(a,A)),ae},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ib++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=N,this.fragmentShader=H,this}let Eb=0;class yb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(t),o=this._getShaderStage(i),u=this._getShaderCacheForMaterial(e);return u.has(a)===!1&&(u.add(a),a.usedTimes++),u.has(o)===!1&&(u.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Ab(e),t.set(e,i)),i}}class Ab{constructor(e){this.id=Eb++,this.code=e,this.usedTimes=0}}function Tb(r,e,t,i,a,o,u){const c=new Wd,f=new yb,d=[],p=a.isWebGL2,_=a.logarithmicDepthBuffer,g=a.vertexTextures;let M=a.precision;const T={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(b){return b===0?"uv":`uv${b}`}function v(b,D,de,ge,Z){const ee=ge.fog,J=Z.geometry,pe=b.isMeshStandardMaterial?ge.environment:null,ie=(b.isMeshStandardMaterial?t:e).get(b.envMap||pe),se=ie&&ie.mapping===To?ie.image.height:null,ve=T[b.type];b.precision!==null&&(M=a.getMaxPrecision(b.precision),M!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",M,"instead."));const ue=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,q=ue!==void 0?ue.length:0;let Q=0;J.morphAttributes.position!==void 0&&(Q=1),J.morphAttributes.normal!==void 0&&(Q=2),J.morphAttributes.color!==void 0&&(Q=3);let Re,Ce,Le,Oe;if(ve){const yt=oi[ve];Re=yt.vertexShader,Ce=yt.fragmentShader}else Re=b.vertexShader,Ce=b.fragmentShader,f.update(b),Le=f.getVertexShaderID(b),Oe=f.getFragmentShaderID(b);const $e=r.getRenderTarget(),Fe=Z.isInstancedMesh===!0,rt=!!b.map,Gt=!!b.matcap,Ke=!!ie,V=!!b.aoMap,Nt=!!b.lightMap,Ue=!!b.bumpMap,We=!!b.normalMap,Ye=!!b.displacementMap,mt=!!b.emissiveMap,et=!!b.metalnessMap,Ze=!!b.roughnessMap,st=b.anisotropy>0,_t=b.clearcoat>0,Rt=b.iridescence>0,C=b.sheen>0,y=b.transmission>0,Y=st&&!!b.anisotropyMap,xe=_t&&!!b.clearcoatMap,fe=_t&&!!b.clearcoatNormalMap,_e=_t&&!!b.clearcoatRoughnessMap,Ie=Rt&&!!b.iridescenceMap,Me=Rt&&!!b.iridescenceThicknessMap,K=C&&!!b.sheenColorMap,I=C&&!!b.sheenRoughnessMap,ce=!!b.specularMap,Ae=!!b.specularColorMap,Se=!!b.specularIntensityMap,ye=y&&!!b.transmissionMap,Xe=y&&!!b.thicknessMap,ft=!!b.gradientMap,B=!!b.alphaMap,Te=b.alphaTest>0,j=!!b.alphaHash,me=!!b.extensions,Ee=!!J.attributes.uv1,at=!!J.attributes.uv2,vt=!!J.attributes.uv3;let Et=Qi;return b.toneMapped&&($e===null||$e.isXRRenderTarget===!0)&&(Et=r.toneMapping),{isWebGL2:p,shaderID:ve,shaderType:b.type,shaderName:b.name,vertexShader:Re,fragmentShader:Ce,defines:b.defines,customVertexShaderID:Le,customFragmentShaderID:Oe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:M,instancing:Fe,instancingColor:Fe&&Z.instanceColor!==null,supportsVertexTextures:g,outputColorSpace:$e===null?r.outputColorSpace:$e.isXRRenderTarget===!0?$e.texture.colorSpace:pi,map:rt,matcap:Gt,envMap:Ke,envMapMode:Ke&&ie.mapping,envMapCubeUVHeight:se,aoMap:V,lightMap:Nt,bumpMap:Ue,normalMap:We,displacementMap:g&&Ye,emissiveMap:mt,normalMapObjectSpace:We&&b.normalMapType===gS,normalMapTangentSpace:We&&b.normalMapType===mS,metalnessMap:et,roughnessMap:Ze,anisotropy:st,anisotropyMap:Y,clearcoat:_t,clearcoatMap:xe,clearcoatNormalMap:fe,clearcoatRoughnessMap:_e,iridescence:Rt,iridescenceMap:Ie,iridescenceThicknessMap:Me,sheen:C,sheenColorMap:K,sheenRoughnessMap:I,specularMap:ce,specularColorMap:Ae,specularIntensityMap:Se,transmission:y,transmissionMap:ye,thicknessMap:Xe,gradientMap:ft,opaque:b.transparent===!1&&b.blending===gs,alphaMap:B,alphaTest:Te,alphaHash:j,combine:b.combine,mapUv:rt&&A(b.map.channel),aoMapUv:V&&A(b.aoMap.channel),lightMapUv:Nt&&A(b.lightMap.channel),bumpMapUv:Ue&&A(b.bumpMap.channel),normalMapUv:We&&A(b.normalMap.channel),displacementMapUv:Ye&&A(b.displacementMap.channel),emissiveMapUv:mt&&A(b.emissiveMap.channel),metalnessMapUv:et&&A(b.metalnessMap.channel),roughnessMapUv:Ze&&A(b.roughnessMap.channel),anisotropyMapUv:Y&&A(b.anisotropyMap.channel),clearcoatMapUv:xe&&A(b.clearcoatMap.channel),clearcoatNormalMapUv:fe&&A(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&A(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&A(b.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&A(b.iridescenceThicknessMap.channel),sheenColorMapUv:K&&A(b.sheenColorMap.channel),sheenRoughnessMapUv:I&&A(b.sheenRoughnessMap.channel),specularMapUv:ce&&A(b.specularMap.channel),specularColorMapUv:Ae&&A(b.specularColorMap.channel),specularIntensityMapUv:Se&&A(b.specularIntensityMap.channel),transmissionMapUv:ye&&A(b.transmissionMap.channel),thicknessMapUv:Xe&&A(b.thicknessMap.channel),alphaMapUv:B&&A(b.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(We||st),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,vertexUv1s:Ee,vertexUv2s:at,vertexUv3s:vt,pointsUvs:Z.isPoints===!0&&!!J.attributes.uv&&(rt||B),fog:!!ee,useFog:b.fog===!0,fogExp2:ee&&ee.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:_,skinning:Z.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:Q,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&de.length>0,shadowMapType:r.shadowMap.type,toneMapping:Et,useLegacyLights:r._useLegacyLights,decodeVideoTexture:rt&&b.map.isVideoTexture===!0&&b.map.colorSpace===Pt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===li,flipSided:b.side===Mn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:me&&b.extensions.derivatives===!0,extensionFragDepth:me&&b.extensions.fragDepth===!0,extensionDrawBuffers:me&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:me&&b.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:p||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:p||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:p||i.has("EXT_shader_texture_lod"),customProgramCacheKey:b.customProgramCacheKey()}}function m(b){const D=[];if(b.shaderID?D.push(b.shaderID):(D.push(b.customVertexShaderID),D.push(b.customFragmentShaderID)),b.defines!==void 0)for(const de in b.defines)D.push(de),D.push(b.defines[de]);return b.isRawShaderMaterial===!1&&(F(D,b),w(D,b),D.push(r.outputColorSpace)),D.push(b.customProgramCacheKey),D.join()}function F(b,D){b.push(D.precision),b.push(D.outputColorSpace),b.push(D.envMapMode),b.push(D.envMapCubeUVHeight),b.push(D.mapUv),b.push(D.alphaMapUv),b.push(D.lightMapUv),b.push(D.aoMapUv),b.push(D.bumpMapUv),b.push(D.normalMapUv),b.push(D.displacementMapUv),b.push(D.emissiveMapUv),b.push(D.metalnessMapUv),b.push(D.roughnessMapUv),b.push(D.anisotropyMapUv),b.push(D.clearcoatMapUv),b.push(D.clearcoatNormalMapUv),b.push(D.clearcoatRoughnessMapUv),b.push(D.iridescenceMapUv),b.push(D.iridescenceThicknessMapUv),b.push(D.sheenColorMapUv),b.push(D.sheenRoughnessMapUv),b.push(D.specularMapUv),b.push(D.specularColorMapUv),b.push(D.specularIntensityMapUv),b.push(D.transmissionMapUv),b.push(D.thicknessMapUv),b.push(D.combine),b.push(D.fogExp2),b.push(D.sizeAttenuation),b.push(D.morphTargetsCount),b.push(D.morphAttributeCount),b.push(D.numDirLights),b.push(D.numPointLights),b.push(D.numSpotLights),b.push(D.numSpotLightMaps),b.push(D.numHemiLights),b.push(D.numRectAreaLights),b.push(D.numDirLightShadows),b.push(D.numPointLightShadows),b.push(D.numSpotLightShadows),b.push(D.numSpotLightShadowsWithMaps),b.push(D.shadowMapType),b.push(D.toneMapping),b.push(D.numClippingPlanes),b.push(D.numClipIntersection),b.push(D.depthPacking)}function w(b,D){c.disableAll(),D.isWebGL2&&c.enable(0),D.supportsVertexTextures&&c.enable(1),D.instancing&&c.enable(2),D.instancingColor&&c.enable(3),D.matcap&&c.enable(4),D.envMap&&c.enable(5),D.normalMapObjectSpace&&c.enable(6),D.normalMapTangentSpace&&c.enable(7),D.clearcoat&&c.enable(8),D.iridescence&&c.enable(9),D.alphaTest&&c.enable(10),D.vertexColors&&c.enable(11),D.vertexAlphas&&c.enable(12),D.vertexUv1s&&c.enable(13),D.vertexUv2s&&c.enable(14),D.vertexUv3s&&c.enable(15),D.vertexTangents&&c.enable(16),D.anisotropy&&c.enable(17),b.push(c.mask),c.disableAll(),D.fog&&c.enable(0),D.useFog&&c.enable(1),D.flatShading&&c.enable(2),D.logarithmicDepthBuffer&&c.enable(3),D.skinning&&c.enable(4),D.morphTargets&&c.enable(5),D.morphNormals&&c.enable(6),D.morphColors&&c.enable(7),D.premultipliedAlpha&&c.enable(8),D.shadowMapEnabled&&c.enable(9),D.useLegacyLights&&c.enable(10),D.doubleSided&&c.enable(11),D.flipSided&&c.enable(12),D.useDepthPacking&&c.enable(13),D.dithering&&c.enable(14),D.transmission&&c.enable(15),D.sheen&&c.enable(16),D.opaque&&c.enable(17),D.pointsUvs&&c.enable(18),D.decodeVideoTexture&&c.enable(19),b.push(c.mask)}function P(b){const D=T[b.type];let de;if(D){const ge=oi[D];de=uE.clone(ge.uniforms)}else de=b.uniforms;return de}function N(b,D){let de;for(let ge=0,Z=d.length;ge<Z;ge++){const ee=d[ge];if(ee.cacheKey===D){de=ee,++de.usedTimes;break}}return de===void 0&&(de=new Sb(r,D,b,o),d.push(de)),de}function H(b){if(--b.usedTimes===0){const D=d.indexOf(b);d[D]=d[d.length-1],d.pop(),b.destroy()}}function U(b){f.remove(b)}function ae(){f.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:P,acquireProgram:N,releaseProgram:H,releaseShaderCache:U,programs:d,dispose:ae}}function bb(){let r=new WeakMap;function e(o){let u=r.get(o);return u===void 0&&(u={},r.set(o,u)),u}function t(o){r.delete(o)}function i(o,u,c){r.get(o)[u]=c}function a(){r=new WeakMap}return{get:e,remove:t,update:i,dispose:a}}function wb(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Md(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Sd(){const r=[];let e=0;const t=[],i=[],a=[];function o(){e=0,t.length=0,i.length=0,a.length=0}function u(_,g,M,T,A,v){let m=r[e];return m===void 0?(m={id:_.id,object:_,geometry:g,material:M,groupOrder:T,renderOrder:_.renderOrder,z:A,group:v},r[e]=m):(m.id=_.id,m.object=_,m.geometry=g,m.material=M,m.groupOrder=T,m.renderOrder=_.renderOrder,m.z=A,m.group=v),e++,m}function c(_,g,M,T,A,v){const m=u(_,g,M,T,A,v);M.transmission>0?i.push(m):M.transparent===!0?a.push(m):t.push(m)}function f(_,g,M,T,A,v){const m=u(_,g,M,T,A,v);M.transmission>0?i.unshift(m):M.transparent===!0?a.unshift(m):t.unshift(m)}function d(_,g){t.length>1&&t.sort(_||wb),i.length>1&&i.sort(g||Md),a.length>1&&a.sort(g||Md)}function p(){for(let _=e,g=r.length;_<g;_++){const M=r[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:i,transparent:a,init:o,push:c,unshift:f,finish:p,sort:d}}function Rb(){let r=new WeakMap;function e(i,a){const o=r.get(i);let u;return o===void 0?(u=new Sd,r.set(i,[u])):a>=o.length?(u=new Sd,o.push(u)):u=o[a],u}function t(){r=new WeakMap}return{get:e,dispose:t}}function Cb(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new W,color:new wt};break;case"SpotLight":t={position:new W,direction:new W,color:new wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new wt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new wt,groundColor:new wt};break;case"RectAreaLight":t={color:new wt,position:new W,halfWidth:new W,halfHeight:new W};break}return r[e.id]=t,t}}}function Lb(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Pb=0;function Db(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Ub(r,e){const t=new Cb,i=Lb(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let p=0;p<9;p++)a.probe.push(new W);const o=new W,u=new tn,c=new tn;function f(p,_){let g=0,M=0,T=0;for(let de=0;de<9;de++)a.probe[de].set(0,0,0);let A=0,v=0,m=0,F=0,w=0,P=0,N=0,H=0,U=0,ae=0;p.sort(Db);const b=_===!0?Math.PI:1;for(let de=0,ge=p.length;de<ge;de++){const Z=p[de],ee=Z.color,J=Z.intensity,pe=Z.distance,ie=Z.shadow&&Z.shadow.map?Z.shadow.map.texture:null;if(Z.isAmbientLight)g+=ee.r*J*b,M+=ee.g*J*b,T+=ee.b*J*b;else if(Z.isLightProbe)for(let se=0;se<9;se++)a.probe[se].addScaledVector(Z.sh.coefficients[se],J);else if(Z.isDirectionalLight){const se=t.get(Z);if(se.color.copy(Z.color).multiplyScalar(Z.intensity*b),Z.castShadow){const ve=Z.shadow,ue=i.get(Z);ue.shadowBias=ve.bias,ue.shadowNormalBias=ve.normalBias,ue.shadowRadius=ve.radius,ue.shadowMapSize=ve.mapSize,a.directionalShadow[A]=ue,a.directionalShadowMap[A]=ie,a.directionalShadowMatrix[A]=Z.shadow.matrix,P++}a.directional[A]=se,A++}else if(Z.isSpotLight){const se=t.get(Z);se.position.setFromMatrixPosition(Z.matrixWorld),se.color.copy(ee).multiplyScalar(J*b),se.distance=pe,se.coneCos=Math.cos(Z.angle),se.penumbraCos=Math.cos(Z.angle*(1-Z.penumbra)),se.decay=Z.decay,a.spot[m]=se;const ve=Z.shadow;if(Z.map&&(a.spotLightMap[U]=Z.map,U++,ve.updateMatrices(Z),Z.castShadow&&ae++),a.spotLightMatrix[m]=ve.matrix,Z.castShadow){const ue=i.get(Z);ue.shadowBias=ve.bias,ue.shadowNormalBias=ve.normalBias,ue.shadowRadius=ve.radius,ue.shadowMapSize=ve.mapSize,a.spotShadow[m]=ue,a.spotShadowMap[m]=ie,H++}m++}else if(Z.isRectAreaLight){const se=t.get(Z);se.color.copy(ee).multiplyScalar(J),se.halfWidth.set(Z.width*.5,0,0),se.halfHeight.set(0,Z.height*.5,0),a.rectArea[F]=se,F++}else if(Z.isPointLight){const se=t.get(Z);if(se.color.copy(Z.color).multiplyScalar(Z.intensity*b),se.distance=Z.distance,se.decay=Z.decay,Z.castShadow){const ve=Z.shadow,ue=i.get(Z);ue.shadowBias=ve.bias,ue.shadowNormalBias=ve.normalBias,ue.shadowRadius=ve.radius,ue.shadowMapSize=ve.mapSize,ue.shadowCameraNear=ve.camera.near,ue.shadowCameraFar=ve.camera.far,a.pointShadow[v]=ue,a.pointShadowMap[v]=ie,a.pointShadowMatrix[v]=Z.shadow.matrix,N++}a.point[v]=se,v++}else if(Z.isHemisphereLight){const se=t.get(Z);se.skyColor.copy(Z.color).multiplyScalar(J*b),se.groundColor.copy(Z.groundColor).multiplyScalar(J*b),a.hemi[w]=se,w++}}F>0&&(e.isWebGL2||r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=be.LTC_FLOAT_1,a.rectAreaLTC2=be.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(a.rectAreaLTC1=be.LTC_HALF_1,a.rectAreaLTC2=be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),a.ambient[0]=g,a.ambient[1]=M,a.ambient[2]=T;const D=a.hash;(D.directionalLength!==A||D.pointLength!==v||D.spotLength!==m||D.rectAreaLength!==F||D.hemiLength!==w||D.numDirectionalShadows!==P||D.numPointShadows!==N||D.numSpotShadows!==H||D.numSpotMaps!==U)&&(a.directional.length=A,a.spot.length=m,a.rectArea.length=F,a.point.length=v,a.hemi.length=w,a.directionalShadow.length=P,a.directionalShadowMap.length=P,a.pointShadow.length=N,a.pointShadowMap.length=N,a.spotShadow.length=H,a.spotShadowMap.length=H,a.directionalShadowMatrix.length=P,a.pointShadowMatrix.length=N,a.spotLightMatrix.length=H+U-ae,a.spotLightMap.length=U,a.numSpotLightShadowsWithMaps=ae,D.directionalLength=A,D.pointLength=v,D.spotLength=m,D.rectAreaLength=F,D.hemiLength=w,D.numDirectionalShadows=P,D.numPointShadows=N,D.numSpotShadows=H,D.numSpotMaps=U,a.version=Pb++)}function d(p,_){let g=0,M=0,T=0,A=0,v=0;const m=_.matrixWorldInverse;for(let F=0,w=p.length;F<w;F++){const P=p[F];if(P.isDirectionalLight){const N=a.directional[g];N.direction.setFromMatrixPosition(P.matrixWorld),o.setFromMatrixPosition(P.target.matrixWorld),N.direction.sub(o),N.direction.transformDirection(m),g++}else if(P.isSpotLight){const N=a.spot[T];N.position.setFromMatrixPosition(P.matrixWorld),N.position.applyMatrix4(m),N.direction.setFromMatrixPosition(P.matrixWorld),o.setFromMatrixPosition(P.target.matrixWorld),N.direction.sub(o),N.direction.transformDirection(m),T++}else if(P.isRectAreaLight){const N=a.rectArea[A];N.position.setFromMatrixPosition(P.matrixWorld),N.position.applyMatrix4(m),c.identity(),u.copy(P.matrixWorld),u.premultiply(m),c.extractRotation(u),N.halfWidth.set(P.width*.5,0,0),N.halfHeight.set(0,P.height*.5,0),N.halfWidth.applyMatrix4(c),N.halfHeight.applyMatrix4(c),A++}else if(P.isPointLight){const N=a.point[M];N.position.setFromMatrixPosition(P.matrixWorld),N.position.applyMatrix4(m),M++}else if(P.isHemisphereLight){const N=a.hemi[v];N.direction.setFromMatrixPosition(P.matrixWorld),N.direction.transformDirection(m),v++}}}return{setup:f,setupView:d,state:a}}function Ed(r,e){const t=new Ub(r,e),i=[],a=[];function o(){i.length=0,a.length=0}function u(_){i.push(_)}function c(_){a.push(_)}function f(_){t.setup(i,_)}function d(_){t.setupView(i,_)}return{init:o,state:{lightsArray:i,shadowsArray:a,lights:t},setupLights:f,setupLightsView:d,pushLight:u,pushShadow:c}}function Ib(r,e){let t=new WeakMap;function i(o,u=0){const c=t.get(o);let f;return c===void 0?(f=new Ed(r,e),t.set(o,[f])):u>=c.length?(f=new Ed(r,e),c.push(f)):f=c[u],f}function a(){t=new WeakMap}return{get:i,dispose:a}}class Nb extends Ro{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Fb extends Ro{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ob=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zb(r,e,t){let i=new Jd;const a=new ht,o=new ht,u=new en,c=new Nb({depthPacking:pS}),f=new Fb,d={},p=t.maxTextureSize,_={[nr]:Mn,[Mn]:nr,[li]:li},g=new ir({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:Ob,fragmentShader:Bb}),M=g.clone();M.defines.HORIZONTAL_PASS=1;const T=new wr;T.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new ci(T,g),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wd;let m=this.type;this.render=function(N,H,U){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||N.length===0)return;const ae=r.getRenderTarget(),b=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),de=r.state;de.setBlending(Ji),de.buffers.color.setClear(1,1,1,1),de.buffers.depth.setTest(!0),de.setScissorTest(!1);const ge=m!==Di&&this.type===Di,Z=m===Di&&this.type!==Di;for(let ee=0,J=N.length;ee<J;ee++){const pe=N[ee],ie=pe.shadow;if(ie===void 0){console.warn("THREE.WebGLShadowMap:",pe,"has no shadow.");continue}if(ie.autoUpdate===!1&&ie.needsUpdate===!1)continue;a.copy(ie.mapSize);const se=ie.getFrameExtents();if(a.multiply(se),o.copy(ie.mapSize),(a.x>p||a.y>p)&&(a.x>p&&(o.x=Math.floor(p/se.x),a.x=o.x*se.x,ie.mapSize.x=o.x),a.y>p&&(o.y=Math.floor(p/se.y),a.y=o.y*se.y,ie.mapSize.y=o.y)),ie.map===null||ge===!0||Z===!0){const ue=this.type!==Di?{minFilter:mn,magFilter:mn}:{};ie.map!==null&&ie.map.dispose(),ie.map=new Ar(a.x,a.y,ue),ie.map.texture.name=pe.name+".shadowMap",ie.camera.updateProjectionMatrix()}r.setRenderTarget(ie.map),r.clear();const ve=ie.getViewportCount();for(let ue=0;ue<ve;ue++){const q=ie.getViewport(ue);u.set(o.x*q.x,o.y*q.y,o.x*q.z,o.y*q.w),de.viewport(u),ie.updateMatrices(pe,ue),i=ie.getFrustum(),P(H,U,ie.camera,pe,this.type)}ie.isPointLightShadow!==!0&&this.type===Di&&F(ie,U),ie.needsUpdate=!1}m=this.type,v.needsUpdate=!1,r.setRenderTarget(ae,b,D)};function F(N,H){const U=e.update(A);g.defines.VSM_SAMPLES!==N.blurSamples&&(g.defines.VSM_SAMPLES=N.blurSamples,M.defines.VSM_SAMPLES=N.blurSamples,g.needsUpdate=!0,M.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new Ar(a.x,a.y)),g.uniforms.shadow_pass.value=N.map.texture,g.uniforms.resolution.value=N.mapSize,g.uniforms.radius.value=N.radius,r.setRenderTarget(N.mapPass),r.clear(),r.renderBufferDirect(H,null,U,g,A,null),M.uniforms.shadow_pass.value=N.mapPass.texture,M.uniforms.resolution.value=N.mapSize,M.uniforms.radius.value=N.radius,r.setRenderTarget(N.map),r.clear(),r.renderBufferDirect(H,null,U,M,A,null)}function w(N,H,U,ae){let b=null;const D=U.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(D!==void 0)b=D;else if(b=U.isPointLight===!0?f:c,r.localClippingEnabled&&H.clipShadows===!0&&Array.isArray(H.clippingPlanes)&&H.clippingPlanes.length!==0||H.displacementMap&&H.displacementScale!==0||H.alphaMap&&H.alphaTest>0||H.map&&H.alphaTest>0){const de=b.uuid,ge=H.uuid;let Z=d[de];Z===void 0&&(Z={},d[de]=Z);let ee=Z[ge];ee===void 0&&(ee=b.clone(),Z[ge]=ee),b=ee}if(b.visible=H.visible,b.wireframe=H.wireframe,ae===Di?b.side=H.shadowSide!==null?H.shadowSide:H.side:b.side=H.shadowSide!==null?H.shadowSide:_[H.side],b.alphaMap=H.alphaMap,b.alphaTest=H.alphaTest,b.map=H.map,b.clipShadows=H.clipShadows,b.clippingPlanes=H.clippingPlanes,b.clipIntersection=H.clipIntersection,b.displacementMap=H.displacementMap,b.displacementScale=H.displacementScale,b.displacementBias=H.displacementBias,b.wireframeLinewidth=H.wireframeLinewidth,b.linewidth=H.linewidth,U.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const de=r.properties.get(b);de.light=U}return b}function P(N,H,U,ae,b){if(N.visible===!1)return;if(N.layers.test(H.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&b===Di)&&(!N.frustumCulled||i.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,N.matrixWorld);const ge=e.update(N),Z=N.material;if(Array.isArray(Z)){const ee=ge.groups;for(let J=0,pe=ee.length;J<pe;J++){const ie=ee[J],se=Z[ie.materialIndex];if(se&&se.visible){const ve=w(N,se,ae,b);r.renderBufferDirect(U,null,ge,ve,N,ie)}}}else if(Z.visible){const ee=w(N,Z,ae,b);r.renderBufferDirect(U,null,ge,ee,N,null)}}const de=N.children;for(let ge=0,Z=de.length;ge<Z;ge++)P(de[ge],H,U,ae,b)}}function Hb(r,e,t){const i=t.isWebGL2;function a(){let B=!1;const Te=new en;let j=null;const me=new en(0,0,0,0);return{setMask:function(Ee){j!==Ee&&!B&&(r.colorMask(Ee,Ee,Ee,Ee),j=Ee)},setLocked:function(Ee){B=Ee},setClear:function(Ee,at,vt,Et,nn){nn===!0&&(Ee*=Et,at*=Et,vt*=Et),Te.set(Ee,at,vt,Et),me.equals(Te)===!1&&(r.clearColor(Ee,at,vt,Et),me.copy(Te))},reset:function(){B=!1,j=null,me.set(-1,0,0,0)}}}function o(){let B=!1,Te=null,j=null,me=null;return{setTest:function(Ee){Ee?$e(r.DEPTH_TEST):Fe(r.DEPTH_TEST)},setMask:function(Ee){Te!==Ee&&!B&&(r.depthMask(Ee),Te=Ee)},setFunc:function(Ee){if(j!==Ee){switch(Ee){case kM:r.depthFunc(r.NEVER);break;case WM:r.depthFunc(r.ALWAYS);break;case XM:r.depthFunc(r.LESS);break;case yc:r.depthFunc(r.LEQUAL);break;case YM:r.depthFunc(r.EQUAL);break;case qM:r.depthFunc(r.GEQUAL);break;case $M:r.depthFunc(r.GREATER);break;case KM:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}j=Ee}},setLocked:function(Ee){B=Ee},setClear:function(Ee){me!==Ee&&(r.clearDepth(Ee),me=Ee)},reset:function(){B=!1,Te=null,j=null,me=null}}}function u(){let B=!1,Te=null,j=null,me=null,Ee=null,at=null,vt=null,Et=null,nn=null;return{setTest:function(yt){B||(yt?$e(r.STENCIL_TEST):Fe(r.STENCIL_TEST))},setMask:function(yt){Te!==yt&&!B&&(r.stencilMask(yt),Te=yt)},setFunc:function(yt,Dn,jt){(j!==yt||me!==Dn||Ee!==jt)&&(r.stencilFunc(yt,Dn,jt),j=yt,me=Dn,Ee=jt)},setOp:function(yt,Dn,jt){(at!==yt||vt!==Dn||Et!==jt)&&(r.stencilOp(yt,Dn,jt),at=yt,vt=Dn,Et=jt)},setLocked:function(yt){B=yt},setClear:function(yt){nn!==yt&&(r.clearStencil(yt),nn=yt)},reset:function(){B=!1,Te=null,j=null,me=null,Ee=null,at=null,vt=null,Et=null,nn=null}}}const c=new a,f=new o,d=new u,p=new WeakMap,_=new WeakMap;let g={},M={},T=new WeakMap,A=[],v=null,m=!1,F=null,w=null,P=null,N=null,H=null,U=null,ae=null,b=!1,D=null,de=null,ge=null,Z=null,ee=null;const J=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let pe=!1,ie=0;const se=r.getParameter(r.VERSION);se.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(se)[1]),pe=ie>=1):se.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),pe=ie>=2);let ve=null,ue={};const q=r.getParameter(r.SCISSOR_BOX),Q=r.getParameter(r.VIEWPORT),Re=new en().fromArray(q),Ce=new en().fromArray(Q);function Le(B,Te,j,me){const Ee=new Uint8Array(4),at=r.createTexture();r.bindTexture(B,at),r.texParameteri(B,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(B,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let vt=0;vt<j;vt++)i&&(B===r.TEXTURE_3D||B===r.TEXTURE_2D_ARRAY)?r.texImage3D(Te,0,r.RGBA,1,1,me,0,r.RGBA,r.UNSIGNED_BYTE,Ee):r.texImage2D(Te+vt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ee);return at}const Oe={};Oe[r.TEXTURE_2D]=Le(r.TEXTURE_2D,r.TEXTURE_2D,1),Oe[r.TEXTURE_CUBE_MAP]=Le(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Oe[r.TEXTURE_2D_ARRAY]=Le(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Oe[r.TEXTURE_3D]=Le(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),c.setClear(0,0,0,1),f.setClear(1),d.setClear(0),$e(r.DEPTH_TEST),f.setFunc(yc),Ye(!1),mt(af),$e(r.CULL_FACE),Ue(Ji);function $e(B){g[B]!==!0&&(r.enable(B),g[B]=!0)}function Fe(B){g[B]!==!1&&(r.disable(B),g[B]=!1)}function rt(B,Te){return M[B]!==Te?(r.bindFramebuffer(B,Te),M[B]=Te,i&&(B===r.DRAW_FRAMEBUFFER&&(M[r.FRAMEBUFFER]=Te),B===r.FRAMEBUFFER&&(M[r.DRAW_FRAMEBUFFER]=Te)),!0):!1}function Gt(B,Te){let j=A,me=!1;if(B)if(j=T.get(Te),j===void 0&&(j=[],T.set(Te,j)),B.isWebGLMultipleRenderTargets){const Ee=B.texture;if(j.length!==Ee.length||j[0]!==r.COLOR_ATTACHMENT0){for(let at=0,vt=Ee.length;at<vt;at++)j[at]=r.COLOR_ATTACHMENT0+at;j.length=Ee.length,me=!0}}else j[0]!==r.COLOR_ATTACHMENT0&&(j[0]=r.COLOR_ATTACHMENT0,me=!0);else j[0]!==r.BACK&&(j[0]=r.BACK,me=!0);me&&(t.isWebGL2?r.drawBuffers(j):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(j))}function Ke(B){return v!==B?(r.useProgram(B),v=B,!0):!1}const V={[fs]:r.FUNC_ADD,[DM]:r.FUNC_SUBTRACT,[UM]:r.FUNC_REVERSE_SUBTRACT};if(i)V[uf]=r.MIN,V[hf]=r.MAX;else{const B=e.get("EXT_blend_minmax");B!==null&&(V[uf]=B.MIN_EXT,V[hf]=B.MAX_EXT)}const Nt={[IM]:r.ZERO,[NM]:r.ONE,[FM]:r.SRC_COLOR,[Rd]:r.SRC_ALPHA,[VM]:r.SRC_ALPHA_SATURATE,[HM]:r.DST_COLOR,[BM]:r.DST_ALPHA,[OM]:r.ONE_MINUS_SRC_COLOR,[Cd]:r.ONE_MINUS_SRC_ALPHA,[GM]:r.ONE_MINUS_DST_COLOR,[zM]:r.ONE_MINUS_DST_ALPHA};function Ue(B,Te,j,me,Ee,at,vt,Et){if(B===Ji){m===!0&&(Fe(r.BLEND),m=!1);return}if(m===!1&&($e(r.BLEND),m=!0),B!==PM){if(B!==F||Et!==b){if((w!==fs||H!==fs)&&(r.blendEquation(r.FUNC_ADD),w=fs,H=fs),Et)switch(B){case gs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case of:r.blendFunc(r.ONE,r.ONE);break;case lf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case cf:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case gs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case of:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case lf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case cf:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}P=null,N=null,U=null,ae=null,F=B,b=Et}return}Ee=Ee||Te,at=at||j,vt=vt||me,(Te!==w||Ee!==H)&&(r.blendEquationSeparate(V[Te],V[Ee]),w=Te,H=Ee),(j!==P||me!==N||at!==U||vt!==ae)&&(r.blendFuncSeparate(Nt[j],Nt[me],Nt[at],Nt[vt]),P=j,N=me,U=at,ae=vt),F=B,b=!1}function We(B,Te){B.side===li?Fe(r.CULL_FACE):$e(r.CULL_FACE);let j=B.side===Mn;Te&&(j=!j),Ye(j),B.blending===gs&&B.transparent===!1?Ue(Ji):Ue(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.premultipliedAlpha),f.setFunc(B.depthFunc),f.setTest(B.depthTest),f.setMask(B.depthWrite),c.setMask(B.colorWrite);const me=B.stencilWrite;d.setTest(me),me&&(d.setMask(B.stencilWriteMask),d.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),d.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ze(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?$e(r.SAMPLE_ALPHA_TO_COVERAGE):Fe(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(B){D!==B&&(B?r.frontFace(r.CW):r.frontFace(r.CCW),D=B)}function mt(B){B!==RM?($e(r.CULL_FACE),B!==de&&(B===af?r.cullFace(r.BACK):B===CM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Fe(r.CULL_FACE),de=B}function et(B){B!==ge&&(pe&&r.lineWidth(B),ge=B)}function Ze(B,Te,j){B?($e(r.POLYGON_OFFSET_FILL),(Z!==Te||ee!==j)&&(r.polygonOffset(Te,j),Z=Te,ee=j)):Fe(r.POLYGON_OFFSET_FILL)}function st(B){B?$e(r.SCISSOR_TEST):Fe(r.SCISSOR_TEST)}function _t(B){B===void 0&&(B=r.TEXTURE0+J-1),ve!==B&&(r.activeTexture(B),ve=B)}function Rt(B,Te,j){j===void 0&&(ve===null?j=r.TEXTURE0+J-1:j=ve);let me=ue[j];me===void 0&&(me={type:void 0,texture:void 0},ue[j]=me),(me.type!==B||me.texture!==Te)&&(ve!==j&&(r.activeTexture(j),ve=j),r.bindTexture(B,Te||Oe[B]),me.type=B,me.texture=Te)}function C(){const B=ue[ve];B!==void 0&&B.type!==void 0&&(r.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function y(){try{r.compressedTexImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Y(){try{r.compressedTexImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function xe(){try{r.texSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function fe(){try{r.texSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function _e(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ie(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Me(){try{r.texStorage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function K(){try{r.texStorage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function I(){try{r.texImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ce(){try{r.texImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ae(B){Re.equals(B)===!1&&(r.scissor(B.x,B.y,B.z,B.w),Re.copy(B))}function Se(B){Ce.equals(B)===!1&&(r.viewport(B.x,B.y,B.z,B.w),Ce.copy(B))}function ye(B,Te){let j=_.get(Te);j===void 0&&(j=new WeakMap,_.set(Te,j));let me=j.get(B);me===void 0&&(me=r.getUniformBlockIndex(Te,B.name),j.set(B,me))}function Xe(B,Te){const me=_.get(Te).get(B);p.get(Te)!==me&&(r.uniformBlockBinding(Te,me,B.__bindingPointIndex),p.set(Te,me))}function ft(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),i===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},ve=null,ue={},M={},T=new WeakMap,A=[],v=null,m=!1,F=null,w=null,P=null,N=null,H=null,U=null,ae=null,b=!1,D=null,de=null,ge=null,Z=null,ee=null,Re.set(0,0,r.canvas.width,r.canvas.height),Ce.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),d.reset()}return{buffers:{color:c,depth:f,stencil:d},enable:$e,disable:Fe,bindFramebuffer:rt,drawBuffers:Gt,useProgram:Ke,setBlending:Ue,setMaterial:We,setFlipSided:Ye,setCullFace:mt,setLineWidth:et,setPolygonOffset:Ze,setScissorTest:st,activeTexture:_t,bindTexture:Rt,unbindTexture:C,compressedTexImage2D:y,compressedTexImage3D:Y,texImage2D:I,texImage3D:ce,updateUBOMapping:ye,uniformBlockBinding:Xe,texStorage2D:Me,texStorage3D:K,texSubImage2D:xe,texSubImage3D:fe,compressedTexSubImage2D:_e,compressedTexSubImage3D:Ie,scissor:Ae,viewport:Se,reset:ft}}function Gb(r,e,t,i,a,o,u){const c=a.isWebGL2,f=a.maxTextures,d=a.maxCubemapSize,p=a.maxTextureSize,_=a.maxSamples,g=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,M=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),T=new WeakMap;let A;const v=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function F(C,y){return m?new OffscreenCanvas(C,y):yo("canvas")}function w(C,y,Y,xe){let fe=1;if((C.width>xe||C.height>xe)&&(fe=xe/Math.max(C.width,C.height)),fe<1||y===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const _e=y?Eo:Math.floor,Ie=_e(fe*C.width),Me=_e(fe*C.height);A===void 0&&(A=F(Ie,Me));const K=Y?F(Ie,Me):A;return K.width=Ie,K.height=Me,K.getContext("2d").drawImage(C,0,0,Ie,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+Ie+"x"+Me+")."),K}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function P(C){return Cc(C.width)&&Cc(C.height)}function N(C){return c?!1:C.wrapS!==ei||C.wrapT!==ei||C.minFilter!==mn&&C.minFilter!==kn}function H(C,y){return C.generateMipmaps&&y&&C.minFilter!==mn&&C.minFilter!==kn}function U(C){r.generateMipmap(C)}function ae(C,y,Y,xe,fe=!1){if(c===!1)return y;if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let _e=y;return y===r.RED&&(Y===r.FLOAT&&(_e=r.R32F),Y===r.HALF_FLOAT&&(_e=r.R16F),Y===r.UNSIGNED_BYTE&&(_e=r.R8)),y===r.RED_INTEGER&&(Y===r.UNSIGNED_BYTE&&(_e=r.R8UI),Y===r.UNSIGNED_SHORT&&(_e=r.R16UI),Y===r.UNSIGNED_INT&&(_e=r.R32UI),Y===r.BYTE&&(_e=r.R8I),Y===r.SHORT&&(_e=r.R16I),Y===r.INT&&(_e=r.R32I)),y===r.RG&&(Y===r.FLOAT&&(_e=r.RG32F),Y===r.HALF_FLOAT&&(_e=r.RG16F),Y===r.UNSIGNED_BYTE&&(_e=r.RG8)),y===r.RGBA&&(Y===r.FLOAT&&(_e=r.RGBA32F),Y===r.HALF_FLOAT&&(_e=r.RGBA16F),Y===r.UNSIGNED_BYTE&&(_e=xe===Pt&&fe===!1?r.SRGB8_ALPHA8:r.RGBA8),Y===r.UNSIGNED_SHORT_4_4_4_4&&(_e=r.RGBA4),Y===r.UNSIGNED_SHORT_5_5_5_1&&(_e=r.RGB5_A1)),(_e===r.R16F||_e===r.R32F||_e===r.RG16F||_e===r.RG32F||_e===r.RGBA16F||_e===r.RGBA32F)&&e.get("EXT_color_buffer_float"),_e}function b(C,y,Y){return H(C,Y)===!0||C.isFramebufferTexture&&C.minFilter!==mn&&C.minFilter!==kn?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function D(C){return C===mn||C===ff||C===Yl?r.NEAREST:r.LINEAR}function de(C){const y=C.target;y.removeEventListener("dispose",de),Z(y),y.isVideoTexture&&T.delete(y)}function ge(C){const y=C.target;y.removeEventListener("dispose",ge),J(y)}function Z(C){const y=i.get(C);if(y.__webglInit===void 0)return;const Y=C.source,xe=v.get(Y);if(xe){const fe=xe[y.__cacheKey];fe.usedTimes--,fe.usedTimes===0&&ee(C),Object.keys(xe).length===0&&v.delete(Y)}i.remove(C)}function ee(C){const y=i.get(C);r.deleteTexture(y.__webglTexture);const Y=C.source,xe=v.get(Y);delete xe[y.__cacheKey],u.memory.textures--}function J(C){const y=C.texture,Y=i.get(C),xe=i.get(y);if(xe.__webglTexture!==void 0&&(r.deleteTexture(xe.__webglTexture),u.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let fe=0;fe<6;fe++){if(Array.isArray(Y.__webglFramebuffer[fe]))for(let _e=0;_e<Y.__webglFramebuffer[fe].length;_e++)r.deleteFramebuffer(Y.__webglFramebuffer[fe][_e]);else r.deleteFramebuffer(Y.__webglFramebuffer[fe]);Y.__webglDepthbuffer&&r.deleteRenderbuffer(Y.__webglDepthbuffer[fe])}else{if(Array.isArray(Y.__webglFramebuffer))for(let fe=0;fe<Y.__webglFramebuffer.length;fe++)r.deleteFramebuffer(Y.__webglFramebuffer[fe]);else r.deleteFramebuffer(Y.__webglFramebuffer);if(Y.__webglDepthbuffer&&r.deleteRenderbuffer(Y.__webglDepthbuffer),Y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(Y.__webglMultisampledFramebuffer),Y.__webglColorRenderbuffer)for(let fe=0;fe<Y.__webglColorRenderbuffer.length;fe++)Y.__webglColorRenderbuffer[fe]&&r.deleteRenderbuffer(Y.__webglColorRenderbuffer[fe]);Y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(Y.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let fe=0,_e=y.length;fe<_e;fe++){const Ie=i.get(y[fe]);Ie.__webglTexture&&(r.deleteTexture(Ie.__webglTexture),u.memory.textures--),i.remove(y[fe])}i.remove(y),i.remove(C)}let pe=0;function ie(){pe=0}function se(){const C=pe;return C>=f&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+f),pe+=1,C}function ve(C){const y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function ue(C,y){const Y=i.get(C);if(C.isVideoTexture&&_t(C),C.isRenderTargetTexture===!1&&C.version>0&&Y.__version!==C.version){const xe=C.image;if(xe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(xe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{rt(Y,C,y);return}}t.bindTexture(r.TEXTURE_2D,Y.__webglTexture,r.TEXTURE0+y)}function q(C,y){const Y=i.get(C);if(C.version>0&&Y.__version!==C.version){rt(Y,C,y);return}t.bindTexture(r.TEXTURE_2D_ARRAY,Y.__webglTexture,r.TEXTURE0+y)}function Q(C,y){const Y=i.get(C);if(C.version>0&&Y.__version!==C.version){rt(Y,C,y);return}t.bindTexture(r.TEXTURE_3D,Y.__webglTexture,r.TEXTURE0+y)}function Re(C,y){const Y=i.get(C);if(C.version>0&&Y.__version!==C.version){Gt(Y,C,y);return}t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture,r.TEXTURE0+y)}const Ce={[bc]:r.REPEAT,[ei]:r.CLAMP_TO_EDGE,[wc]:r.MIRRORED_REPEAT},Le={[mn]:r.NEAREST,[ff]:r.NEAREST_MIPMAP_NEAREST,[Yl]:r.NEAREST_MIPMAP_LINEAR,[kn]:r.LINEAR,[iS]:r.LINEAR_MIPMAP_NEAREST,[ta]:r.LINEAR_MIPMAP_LINEAR},Oe={[vS]:r.NEVER,[TS]:r.ALWAYS,[xS]:r.LESS,[SS]:r.LEQUAL,[MS]:r.EQUAL,[AS]:r.GEQUAL,[ES]:r.GREATER,[yS]:r.NOTEQUAL};function $e(C,y,Y){if(Y?(r.texParameteri(C,r.TEXTURE_WRAP_S,Ce[y.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,Ce[y.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,Ce[y.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,Le[y.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,Le[y.minFilter])):(r.texParameteri(C,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(C,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(y.wrapS!==ei||y.wrapT!==ei)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(C,r.TEXTURE_MAG_FILTER,D(y.magFilter)),r.texParameteri(C,r.TEXTURE_MIN_FILTER,D(y.minFilter)),y.minFilter!==mn&&y.minFilter!==kn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,Oe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const xe=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===mn||y.minFilter!==Yl&&y.minFilter!==ta||y.type===ji&&e.has("OES_texture_float_linear")===!1||c===!1&&y.type===na&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||i.get(y).__currentAnisotropy)&&(r.texParameterf(C,xe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,a.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy)}}function Fe(C,y){let Y=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",de));const xe=y.source;let fe=v.get(xe);fe===void 0&&(fe={},v.set(xe,fe));const _e=ve(y);if(_e!==C.__cacheKey){fe[_e]===void 0&&(fe[_e]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,Y=!0),fe[_e].usedTimes++;const Ie=fe[C.__cacheKey];Ie!==void 0&&(fe[C.__cacheKey].usedTimes--,Ie.usedTimes===0&&ee(y)),C.__cacheKey=_e,C.__webglTexture=fe[_e].texture}return Y}function rt(C,y,Y){let xe=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(xe=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(xe=r.TEXTURE_3D);const fe=Fe(C,y),_e=y.source;t.bindTexture(xe,C.__webglTexture,r.TEXTURE0+Y);const Ie=i.get(_e);if(_e.version!==Ie.__version||fe===!0){t.activeTexture(r.TEXTURE0+Y),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.NONE);const Me=N(y)&&P(y.image)===!1;let K=w(y.image,Me,!1,p);K=Rt(y,K);const I=P(K)||c,ce=o.convert(y.format,y.colorSpace);let Ae=o.convert(y.type),Se=ae(y.internalFormat,ce,Ae,y.colorSpace,y.isVideoTexture);$e(xe,y,I);let ye;const Xe=y.mipmaps,ft=c&&y.isVideoTexture!==!0,B=Ie.__version===void 0||fe===!0,Te=b(y,K,I);if(y.isDepthTexture)Se=r.DEPTH_COMPONENT,c?y.type===ji?Se=r.DEPTH_COMPONENT32F:y.type===Zi?Se=r.DEPTH_COMPONENT24:y.type===xr?Se=r.DEPTH24_STENCIL8:Se=r.DEPTH_COMPONENT16:y.type===ji&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Mr&&Se===r.DEPTH_COMPONENT&&y.type!==Ic&&y.type!==Zi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Zi,Ae=o.convert(y.type)),y.format===Ss&&Se===r.DEPTH_COMPONENT&&(Se=r.DEPTH_STENCIL,y.type!==xr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=xr,Ae=o.convert(y.type))),B&&(ft?t.texStorage2D(r.TEXTURE_2D,1,Se,K.width,K.height):t.texImage2D(r.TEXTURE_2D,0,Se,K.width,K.height,0,ce,Ae,null));else if(y.isDataTexture)if(Xe.length>0&&I){ft&&B&&t.texStorage2D(r.TEXTURE_2D,Te,Se,Xe[0].width,Xe[0].height);for(let j=0,me=Xe.length;j<me;j++)ye=Xe[j],ft?t.texSubImage2D(r.TEXTURE_2D,j,0,0,ye.width,ye.height,ce,Ae,ye.data):t.texImage2D(r.TEXTURE_2D,j,Se,ye.width,ye.height,0,ce,Ae,ye.data);y.generateMipmaps=!1}else ft?(B&&t.texStorage2D(r.TEXTURE_2D,Te,Se,K.width,K.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,K.width,K.height,ce,Ae,K.data)):t.texImage2D(r.TEXTURE_2D,0,Se,K.width,K.height,0,ce,Ae,K.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ft&&B&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Te,Se,Xe[0].width,Xe[0].height,K.depth);for(let j=0,me=Xe.length;j<me;j++)ye=Xe[j],y.format!==ti?ce!==null?ft?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,ye.width,ye.height,K.depth,ce,ye.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,j,Se,ye.width,ye.height,K.depth,0,ye.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?t.texSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,ye.width,ye.height,K.depth,ce,Ae,ye.data):t.texImage3D(r.TEXTURE_2D_ARRAY,j,Se,ye.width,ye.height,K.depth,0,ce,Ae,ye.data)}else{ft&&B&&t.texStorage2D(r.TEXTURE_2D,Te,Se,Xe[0].width,Xe[0].height);for(let j=0,me=Xe.length;j<me;j++)ye=Xe[j],y.format!==ti?ce!==null?ft?t.compressedTexSubImage2D(r.TEXTURE_2D,j,0,0,ye.width,ye.height,ce,ye.data):t.compressedTexImage2D(r.TEXTURE_2D,j,Se,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?t.texSubImage2D(r.TEXTURE_2D,j,0,0,ye.width,ye.height,ce,Ae,ye.data):t.texImage2D(r.TEXTURE_2D,j,Se,ye.width,ye.height,0,ce,Ae,ye.data)}else if(y.isDataArrayTexture)ft?(B&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Te,Se,K.width,K.height,K.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ce,Ae,K.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,Se,K.width,K.height,K.depth,0,ce,Ae,K.data);else if(y.isData3DTexture)ft?(B&&t.texStorage3D(r.TEXTURE_3D,Te,Se,K.width,K.height,K.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ce,Ae,K.data)):t.texImage3D(r.TEXTURE_3D,0,Se,K.width,K.height,K.depth,0,ce,Ae,K.data);else if(y.isFramebufferTexture){if(B)if(ft)t.texStorage2D(r.TEXTURE_2D,Te,Se,K.width,K.height);else{let j=K.width,me=K.height;for(let Ee=0;Ee<Te;Ee++)t.texImage2D(r.TEXTURE_2D,Ee,Se,j,me,0,ce,Ae,null),j>>=1,me>>=1}}else if(Xe.length>0&&I){ft&&B&&t.texStorage2D(r.TEXTURE_2D,Te,Se,Xe[0].width,Xe[0].height);for(let j=0,me=Xe.length;j<me;j++)ye=Xe[j],ft?t.texSubImage2D(r.TEXTURE_2D,j,0,0,ce,Ae,ye):t.texImage2D(r.TEXTURE_2D,j,Se,ce,Ae,ye);y.generateMipmaps=!1}else ft?(B&&t.texStorage2D(r.TEXTURE_2D,Te,Se,K.width,K.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,ce,Ae,K)):t.texImage2D(r.TEXTURE_2D,0,Se,ce,Ae,K);H(y,I)&&U(xe),Ie.__version=_e.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Gt(C,y,Y){if(y.image.length!==6)return;const xe=Fe(C,y),fe=y.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+Y);const _e=i.get(fe);if(fe.version!==_e.__version||xe===!0){t.activeTexture(r.TEXTURE0+Y),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.NONE);const Ie=y.isCompressedTexture||y.image[0].isCompressedTexture,Me=y.image[0]&&y.image[0].isDataTexture,K=[];for(let j=0;j<6;j++)!Ie&&!Me?K[j]=w(y.image[j],!1,!0,d):K[j]=Me?y.image[j].image:y.image[j],K[j]=Rt(y,K[j]);const I=K[0],ce=P(I)||c,Ae=o.convert(y.format,y.colorSpace),Se=o.convert(y.type),ye=ae(y.internalFormat,Ae,Se,y.colorSpace),Xe=c&&y.isVideoTexture!==!0,ft=_e.__version===void 0||xe===!0;let B=b(y,I,ce);$e(r.TEXTURE_CUBE_MAP,y,ce);let Te;if(Ie){Xe&&ft&&t.texStorage2D(r.TEXTURE_CUBE_MAP,B,ye,I.width,I.height);for(let j=0;j<6;j++){Te=K[j].mipmaps;for(let me=0;me<Te.length;me++){const Ee=Te[me];y.format!==ti?Ae!==null?Xe?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,0,0,Ee.width,Ee.height,Ae,Ee.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,ye,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,0,0,Ee.width,Ee.height,Ae,Se,Ee.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,ye,Ee.width,Ee.height,0,Ae,Se,Ee.data)}}}else{Te=y.mipmaps,Xe&&ft&&(Te.length>0&&B++,t.texStorage2D(r.TEXTURE_CUBE_MAP,B,ye,K[0].width,K[0].height));for(let j=0;j<6;j++)if(Me){Xe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,K[j].width,K[j].height,Ae,Se,K[j].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,ye,K[j].width,K[j].height,0,Ae,Se,K[j].data);for(let me=0;me<Te.length;me++){const at=Te[me].image[j].image;Xe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,0,0,at.width,at.height,Ae,Se,at.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,ye,at.width,at.height,0,Ae,Se,at.data)}}else{Xe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ae,Se,K[j]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,ye,Ae,Se,K[j]);for(let me=0;me<Te.length;me++){const Ee=Te[me];Xe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,0,0,Ae,Se,Ee.image[j]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,ye,Ae,Se,Ee.image[j])}}}H(y,ce)&&U(r.TEXTURE_CUBE_MAP),_e.__version=fe.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Ke(C,y,Y,xe,fe,_e){const Ie=o.convert(Y.format,Y.colorSpace),Me=o.convert(Y.type),K=ae(Y.internalFormat,Ie,Me,Y.colorSpace);if(!i.get(y).__hasExternalTextures){const ce=Math.max(1,y.width>>_e),Ae=Math.max(1,y.height>>_e);fe===r.TEXTURE_3D||fe===r.TEXTURE_2D_ARRAY?t.texImage3D(fe,_e,K,ce,Ae,y.depth,0,Ie,Me,null):t.texImage2D(fe,_e,K,ce,Ae,0,Ie,Me,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),st(y)?g.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xe,fe,i.get(Y).__webglTexture,0,Ze(y)):(fe===r.TEXTURE_2D||fe>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&fe<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,xe,fe,i.get(Y).__webglTexture,_e),t.bindFramebuffer(r.FRAMEBUFFER,null)}function V(C,y,Y){if(r.bindRenderbuffer(r.RENDERBUFFER,C),y.depthBuffer&&!y.stencilBuffer){let xe=r.DEPTH_COMPONENT16;if(Y||st(y)){const fe=y.depthTexture;fe&&fe.isDepthTexture&&(fe.type===ji?xe=r.DEPTH_COMPONENT32F:fe.type===Zi&&(xe=r.DEPTH_COMPONENT24));const _e=Ze(y);st(y)?g.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_e,xe,y.width,y.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,xe,y.width,y.height)}else r.renderbufferStorage(r.RENDERBUFFER,xe,y.width,y.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,C)}else if(y.depthBuffer&&y.stencilBuffer){const xe=Ze(y);Y&&st(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,r.DEPTH24_STENCIL8,y.width,y.height):st(y)?g.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xe,r.DEPTH24_STENCIL8,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,C)}else{const xe=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let fe=0;fe<xe.length;fe++){const _e=xe[fe],Ie=o.convert(_e.format,_e.colorSpace),Me=o.convert(_e.type),K=ae(_e.internalFormat,Ie,Me,_e.colorSpace),I=Ze(y);Y&&st(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,I,K,y.width,y.height):st(y)?g.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,I,K,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,K,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Nt(C,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),ue(y.depthTexture,0);const xe=i.get(y.depthTexture).__webglTexture,fe=Ze(y);if(y.depthTexture.format===Mr)st(y)?g.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,xe,0,fe):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,xe,0);else if(y.depthTexture.format===Ss)st(y)?g.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,xe,0,fe):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,xe,0);else throw new Error("Unknown depthTexture format")}function Ue(C){const y=i.get(C),Y=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!y.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");Nt(y.__webglFramebuffer,C)}else if(Y){y.__webglDepthbuffer=[];for(let xe=0;xe<6;xe++)t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[xe]),y.__webglDepthbuffer[xe]=r.createRenderbuffer(),V(y.__webglDepthbuffer[xe],C,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=r.createRenderbuffer(),V(y.__webglDepthbuffer,C,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function We(C,y,Y){const xe=i.get(C);y!==void 0&&Ke(xe.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Y!==void 0&&Ue(C)}function Ye(C){const y=C.texture,Y=i.get(C),xe=i.get(y);C.addEventListener("dispose",ge),C.isWebGLMultipleRenderTargets!==!0&&(xe.__webglTexture===void 0&&(xe.__webglTexture=r.createTexture()),xe.__version=y.version,u.memory.textures++);const fe=C.isWebGLCubeRenderTarget===!0,_e=C.isWebGLMultipleRenderTargets===!0,Ie=P(C)||c;if(fe){Y.__webglFramebuffer=[];for(let Me=0;Me<6;Me++)if(c&&y.mipmaps&&y.mipmaps.length>0){Y.__webglFramebuffer[Me]=[];for(let K=0;K<y.mipmaps.length;K++)Y.__webglFramebuffer[Me][K]=r.createFramebuffer()}else Y.__webglFramebuffer[Me]=r.createFramebuffer()}else{if(c&&y.mipmaps&&y.mipmaps.length>0){Y.__webglFramebuffer=[];for(let Me=0;Me<y.mipmaps.length;Me++)Y.__webglFramebuffer[Me]=r.createFramebuffer()}else Y.__webglFramebuffer=r.createFramebuffer();if(_e)if(a.drawBuffers){const Me=C.texture;for(let K=0,I=Me.length;K<I;K++){const ce=i.get(Me[K]);ce.__webglTexture===void 0&&(ce.__webglTexture=r.createTexture(),u.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(c&&C.samples>0&&st(C)===!1){const Me=_e?y:[y];Y.__webglMultisampledFramebuffer=r.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let K=0;K<Me.length;K++){const I=Me[K];Y.__webglColorRenderbuffer[K]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Y.__webglColorRenderbuffer[K]);const ce=o.convert(I.format,I.colorSpace),Ae=o.convert(I.type),Se=ae(I.internalFormat,ce,Ae,I.colorSpace,C.isXRRenderTarget===!0),ye=Ze(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,Se,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+K,r.RENDERBUFFER,Y.__webglColorRenderbuffer[K])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(Y.__webglDepthRenderbuffer=r.createRenderbuffer(),V(Y.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(fe){t.bindTexture(r.TEXTURE_CUBE_MAP,xe.__webglTexture),$e(r.TEXTURE_CUBE_MAP,y,Ie);for(let Me=0;Me<6;Me++)if(c&&y.mipmaps&&y.mipmaps.length>0)for(let K=0;K<y.mipmaps.length;K++)Ke(Y.__webglFramebuffer[Me][K],C,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,K);else Ke(Y.__webglFramebuffer[Me],C,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0);H(y,Ie)&&U(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){const Me=C.texture;for(let K=0,I=Me.length;K<I;K++){const ce=Me[K],Ae=i.get(ce);t.bindTexture(r.TEXTURE_2D,Ae.__webglTexture),$e(r.TEXTURE_2D,ce,Ie),Ke(Y.__webglFramebuffer,C,ce,r.COLOR_ATTACHMENT0+K,r.TEXTURE_2D,0),H(ce,Ie)&&U(r.TEXTURE_2D)}t.unbindTexture()}else{let Me=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(c?Me=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Me,xe.__webglTexture),$e(Me,y,Ie),c&&y.mipmaps&&y.mipmaps.length>0)for(let K=0;K<y.mipmaps.length;K++)Ke(Y.__webglFramebuffer[K],C,y,r.COLOR_ATTACHMENT0,Me,K);else Ke(Y.__webglFramebuffer,C,y,r.COLOR_ATTACHMENT0,Me,0);H(y,Ie)&&U(Me),t.unbindTexture()}C.depthBuffer&&Ue(C)}function mt(C){const y=P(C)||c,Y=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let xe=0,fe=Y.length;xe<fe;xe++){const _e=Y[xe];if(H(_e,y)){const Ie=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Me=i.get(_e).__webglTexture;t.bindTexture(Ie,Me),U(Ie),t.unbindTexture()}}}function et(C){if(c&&C.samples>0&&st(C)===!1){const y=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],Y=C.width,xe=C.height;let fe=r.COLOR_BUFFER_BIT;const _e=[],Ie=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Me=i.get(C),K=C.isWebGLMultipleRenderTargets===!0;if(K)for(let I=0;I<y.length;I++)t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+I,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+I,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let I=0;I<y.length;I++){_e.push(r.COLOR_ATTACHMENT0+I),C.depthBuffer&&_e.push(Ie);const ce=Me.__ignoreDepthValues!==void 0?Me.__ignoreDepthValues:!1;if(ce===!1&&(C.depthBuffer&&(fe|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&(fe|=r.STENCIL_BUFFER_BIT)),K&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Me.__webglColorRenderbuffer[I]),ce===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Ie]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Ie])),K){const Ae=i.get(y[I]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ae,0)}r.blitFramebuffer(0,0,Y,xe,0,0,Y,xe,fe,r.NEAREST),M&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,_e)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),K)for(let I=0;I<y.length;I++){t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+I,r.RENDERBUFFER,Me.__webglColorRenderbuffer[I]);const ce=i.get(y[I]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+I,r.TEXTURE_2D,ce,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}}function Ze(C){return Math.min(_,C.samples)}function st(C){const y=i.get(C);return c&&C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function _t(C){const y=u.render.frame;T.get(C)!==y&&(T.set(C,y),C.update())}function Rt(C,y){const Y=C.colorSpace,xe=C.format,fe=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===Rc||Y!==pi&&Y!==Er&&(Y===Pt||Y===bo?c===!1?e.has("EXT_sRGB")===!0&&xe===ti?(C.format=Rc,C.minFilter=kn,C.generateMipmaps=!1):y=Hd.sRGBToLinear(y):(xe!==ti||fe!==er)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),y}this.allocateTextureUnit=se,this.resetTextureUnits=ie,this.setTexture2D=ue,this.setTexture2DArray=q,this.setTexture3D=Q,this.setTextureCube=Re,this.rebindTextures=We,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=et,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=Ke,this.useMultisampledRTT=st}const Vb=0,Xt=1;function kb(r,e,t){const i=t.isWebGL2;function a(o,u=Er){let c;const f=u===Pt||u===bo?Xt:Vb;if(o===er)return r.UNSIGNED_BYTE;if(o===Ud)return r.UNSIGNED_SHORT_4_4_4_4;if(o===Id)return r.UNSIGNED_SHORT_5_5_5_1;if(o===rS)return r.BYTE;if(o===sS)return r.SHORT;if(o===Ic)return r.UNSIGNED_SHORT;if(o===Dd)return r.INT;if(o===Zi)return r.UNSIGNED_INT;if(o===ji)return r.FLOAT;if(o===na)return i?r.HALF_FLOAT:(c=e.get("OES_texture_half_float"),c!==null?c.HALF_FLOAT_OES:null);if(o===aS)return r.ALPHA;if(o===ti)return r.RGBA;if(o===oS)return r.LUMINANCE;if(o===lS)return r.LUMINANCE_ALPHA;if(o===Mr)return r.DEPTH_COMPONENT;if(o===Ss)return r.DEPTH_STENCIL;if(o===Rc)return c=e.get("EXT_sRGB"),c!==null?c.SRGB_ALPHA_EXT:null;if(o===cS)return r.RED;if(o===Nd)return r.RED_INTEGER;if(o===uS)return r.RG;if(o===Fd)return r.RG_INTEGER;if(o===Od)return r.RGBA_INTEGER;if(o===ql||o===$l||o===Kl||o===Zl)if(f===Xt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(o===ql)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===$l)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===Kl)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===Zl)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(o===ql)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===$l)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===Kl)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===Zl)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===df||o===pf||o===mf||o===gf)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(o===df)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===pf)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===mf)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===gf)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===hS)return c=e.get("WEBGL_compressed_texture_etc1"),c!==null?c.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===_f||o===vf)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(o===_f)return f===Xt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(o===vf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===xf||o===Mf||o===Sf||o===Ef||o===yf||o===Af||o===Tf||o===bf||o===wf||o===Rf||o===Cf||o===Lf||o===Pf||o===Df)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(o===xf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Mf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===Sf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Ef)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===yf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===Af)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===Tf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===bf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===wf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===Rf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===Cf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===Lf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===Pf)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===Df)return f===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===jl||o===Uf||o===If)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(o===jl)return f===Xt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===Uf)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===If)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===fS||o===Nf||o===Ff||o===Of)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(o===jl)return c.COMPRESSED_RED_RGTC1_EXT;if(o===Nf)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===Ff)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===Of)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===xr?i?r.UNSIGNED_INT_24_8:(c=e.get("WEBGL_depth_texture"),c!==null?c.UNSIGNED_INT_24_8_WEBGL:null):r[o]!==void 0?r[o]:null}return{convert:a}}class Wb extends Wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class go extends Ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xb={type:"move"};class xc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new go,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new go,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new go,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let a=null,o=null,u=null;const c=this._targetRay,f=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){u=!0;for(const A of e.hand.values()){const v=t.getJointPose(A,i),m=this._getHandJoint(d,A);v!==null&&(m.matrix.fromArray(v.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=v.radius),m.visible=v!==null}const p=d.joints["index-finger-tip"],_=d.joints["thumb-tip"],g=p.position.distanceTo(_.position),M=.02,T=.005;d.inputState.pinching&&g>M+T?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&g<=M-T&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,i),o!==null&&(f.matrix.fromArray(o.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,o.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(o.linearVelocity)):f.hasLinearVelocity=!1,o.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(o.angularVelocity)):f.hasAngularVelocity=!1));c!==null&&(a=t.getPose(e.targetRaySpace,i),a===null&&o!==null&&(a=o),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Xb)))}return c!==null&&(c.visible=a!==null),f!==null&&(f.visible=o!==null),d!==null&&(d.visible=u!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new go;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Yb extends Cn{constructor(e,t,i,a,o,u,c,f,d,p){if(p=p!==void 0?p:Mr,p!==Mr&&p!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&p===Mr&&(i=Zi),i===void 0&&p===Ss&&(i=xr),super(null,a,o,u,c,f,p,i,d),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=c!==void 0?c:mn,this.minFilter=f!==void 0?f:mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class qb extends br{constructor(e,t){super();const i=this;let a=null,o=1,u=null,c="local-floor",f=1,d=null,p=null,_=null,g=null,M=null,T=null;const A=t.getContextAttributes();let v=null,m=null;const F=[],w=[],P=new Wn;P.layers.enable(1),P.viewport=new en;const N=new Wn;N.layers.enable(2),N.viewport=new en;const H=[P,N],U=new Wb;U.layers.enable(1),U.layers.enable(2);let ae=null,b=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Q=F[q];return Q===void 0&&(Q=new xc,F[q]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(q){let Q=F[q];return Q===void 0&&(Q=new xc,F[q]=Q),Q.getGripSpace()},this.getHand=function(q){let Q=F[q];return Q===void 0&&(Q=new xc,F[q]=Q),Q.getHandSpace()};function D(q){const Q=w.indexOf(q.inputSource);if(Q===-1)return;const Re=F[Q];Re!==void 0&&(Re.update(q.inputSource,q.frame,d||u),Re.dispatchEvent({type:q.type,data:q.inputSource}))}function de(){a.removeEventListener("select",D),a.removeEventListener("selectstart",D),a.removeEventListener("selectend",D),a.removeEventListener("squeeze",D),a.removeEventListener("squeezestart",D),a.removeEventListener("squeezeend",D),a.removeEventListener("end",de),a.removeEventListener("inputsourceschange",ge);for(let q=0;q<F.length;q++){const Q=w[q];Q!==null&&(w[q]=null,F[q].disconnect(Q))}ae=null,b=null,e.setRenderTarget(v),M=null,g=null,_=null,a=null,m=null,ue.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){c=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||u},this.setReferenceSpace=function(q){d=q},this.getBaseLayer=function(){return g!==null?g:M},this.getBinding=function(){return _},this.getFrame=function(){return T},this.getSession=function(){return a},this.setSession=async function(q){if(a=q,a!==null){if(v=e.getRenderTarget(),a.addEventListener("select",D),a.addEventListener("selectstart",D),a.addEventListener("selectend",D),a.addEventListener("squeeze",D),a.addEventListener("squeezestart",D),a.addEventListener("squeezeend",D),a.addEventListener("end",de),a.addEventListener("inputsourceschange",ge),A.xrCompatible!==!0&&await t.makeXRCompatible(),a.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Q={antialias:a.renderState.layers===void 0?A.antialias:!0,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:o};M=new XRWebGLLayer(a,t,Q),a.updateRenderState({baseLayer:M}),m=new Ar(M.framebufferWidth,M.framebufferHeight,{format:ti,type:er,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil})}else{let Q=null,Re=null,Ce=null;A.depth&&(Ce=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=A.stencil?Ss:Mr,Re=A.stencil?xr:Zi);const Le={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:o};_=new XRWebGLBinding(a,t),g=_.createProjectionLayer(Le),a.updateRenderState({layers:[g]}),m=new Ar(g.textureWidth,g.textureHeight,{format:ti,type:er,depthTexture:new Yb(g.textureWidth,g.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0});const Oe=e.properties.get(m);Oe.__ignoreDepthValues=g.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(f),d=null,u=await a.requestReferenceSpace(c),ue.setContext(a),ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode};function ge(q){for(let Q=0;Q<q.removed.length;Q++){const Re=q.removed[Q],Ce=w.indexOf(Re);Ce>=0&&(w[Ce]=null,F[Ce].disconnect(Re))}for(let Q=0;Q<q.added.length;Q++){const Re=q.added[Q];let Ce=w.indexOf(Re);if(Ce===-1){for(let Oe=0;Oe<F.length;Oe++)if(Oe>=w.length){w.push(Re),Ce=Oe;break}else if(w[Oe]===null){w[Oe]=Re,Ce=Oe;break}if(Ce===-1)break}const Le=F[Ce];Le&&Le.connect(Re)}}const Z=new W,ee=new W;function J(q,Q,Re){Z.setFromMatrixPosition(Q.matrixWorld),ee.setFromMatrixPosition(Re.matrixWorld);const Ce=Z.distanceTo(ee),Le=Q.projectionMatrix.elements,Oe=Re.projectionMatrix.elements,$e=Le[14]/(Le[10]-1),Fe=Le[14]/(Le[10]+1),rt=(Le[9]+1)/Le[5],Gt=(Le[9]-1)/Le[5],Ke=(Le[8]-1)/Le[0],V=(Oe[8]+1)/Oe[0],Nt=$e*Ke,Ue=$e*V,We=Ce/(-Ke+V),Ye=We*-Ke;Q.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ye),q.translateZ(We),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const mt=$e+We,et=Fe+We,Ze=Nt-Ye,st=Ue+(Ce-Ye),_t=rt*Fe/et*mt,Rt=Gt*Fe/et*mt;q.projectionMatrix.makePerspective(Ze,st,_t,Rt,mt,et),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function pe(q,Q){Q===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Q.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(a===null)return;U.near=N.near=P.near=q.near,U.far=N.far=P.far=q.far,(ae!==U.near||b!==U.far)&&(a.updateRenderState({depthNear:U.near,depthFar:U.far}),ae=U.near,b=U.far);const Q=q.parent,Re=U.cameras;pe(U,Q);for(let Ce=0;Ce<Re.length;Ce++)pe(Re[Ce],Q);Re.length===2?J(U,P,N):U.projectionMatrix.copy(P.projectionMatrix),ie(q,U,Q)};function ie(q,Q,Re){Re===null?q.matrix.copy(Q.matrixWorld):(q.matrix.copy(Re.matrixWorld),q.matrix.invert(),q.matrix.multiply(Q.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ia*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(g===null&&M===null))return f},this.setFoveation=function(q){f=q,g!==null&&(g.fixedFoveation=q),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=q)};let se=null;function ve(q,Q){if(p=Q.getViewerPose(d||u),T=Q,p!==null){const Re=p.views;M!==null&&(e.setRenderTargetFramebuffer(m,M.framebuffer),e.setRenderTarget(m));let Ce=!1;Re.length!==U.cameras.length&&(U.cameras.length=0,Ce=!0);for(let Le=0;Le<Re.length;Le++){const Oe=Re[Le];let $e=null;if(M!==null)$e=M.getViewport(Oe);else{const rt=_.getViewSubImage(g,Oe);$e=rt.viewport,Le===0&&(e.setRenderTargetTextures(m,rt.colorTexture,g.ignoreDepthValues?void 0:rt.depthStencilTexture),e.setRenderTarget(m))}let Fe=H[Le];Fe===void 0&&(Fe=new Wn,Fe.layers.enable(Le),Fe.viewport=new en,H[Le]=Fe),Fe.matrix.fromArray(Oe.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(Oe.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set($e.x,$e.y,$e.width,$e.height),Le===0&&(U.matrix.copy(Fe.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ce===!0&&U.cameras.push(Fe)}}for(let Re=0;Re<F.length;Re++){const Ce=w[Re],Le=F[Re];Ce!==null&&Le!==void 0&&Le.update(Ce,Q,d||u)}se&&se(q,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),T=null}const ue=new Qd;ue.setAnimationLoop(ve),this.setAnimationLoop=function(q){se=q},this.dispose=function(){}}}function $b(r,e){function t(v,m){v.matrixAutoUpdate===!0&&v.updateMatrix(),m.value.copy(v.matrix)}function i(v,m){m.color.getRGB(v.fogColor.value,Kd(r)),m.isFog?(v.fogNear.value=m.near,v.fogFar.value=m.far):m.isFogExp2&&(v.fogDensity.value=m.density)}function a(v,m,F,w,P){m.isMeshBasicMaterial||m.isMeshLambertMaterial?o(v,m):m.isMeshToonMaterial?(o(v,m),_(v,m)):m.isMeshPhongMaterial?(o(v,m),p(v,m)):m.isMeshStandardMaterial?(o(v,m),g(v,m),m.isMeshPhysicalMaterial&&M(v,m,P)):m.isMeshMatcapMaterial?(o(v,m),T(v,m)):m.isMeshDepthMaterial?o(v,m):m.isMeshDistanceMaterial?(o(v,m),A(v,m)):m.isMeshNormalMaterial?o(v,m):m.isLineBasicMaterial?(u(v,m),m.isLineDashedMaterial&&c(v,m)):m.isPointsMaterial?f(v,m,F,w):m.isSpriteMaterial?d(v,m):m.isShadowMaterial?(v.color.value.copy(m.color),v.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function o(v,m){v.opacity.value=m.opacity,m.color&&v.diffuse.value.copy(m.color),m.emissive&&v.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(v.map.value=m.map,t(m.map,v.mapTransform)),m.alphaMap&&(v.alphaMap.value=m.alphaMap,t(m.alphaMap,v.alphaMapTransform)),m.bumpMap&&(v.bumpMap.value=m.bumpMap,t(m.bumpMap,v.bumpMapTransform),v.bumpScale.value=m.bumpScale,m.side===Mn&&(v.bumpScale.value*=-1)),m.normalMap&&(v.normalMap.value=m.normalMap,t(m.normalMap,v.normalMapTransform),v.normalScale.value.copy(m.normalScale),m.side===Mn&&v.normalScale.value.negate()),m.displacementMap&&(v.displacementMap.value=m.displacementMap,t(m.displacementMap,v.displacementMapTransform),v.displacementScale.value=m.displacementScale,v.displacementBias.value=m.displacementBias),m.emissiveMap&&(v.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,v.emissiveMapTransform)),m.specularMap&&(v.specularMap.value=m.specularMap,t(m.specularMap,v.specularMapTransform)),m.alphaTest>0&&(v.alphaTest.value=m.alphaTest);const F=e.get(m).envMap;if(F&&(v.envMap.value=F,v.flipEnvMap.value=F.isCubeTexture&&F.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=m.reflectivity,v.ior.value=m.ior,v.refractionRatio.value=m.refractionRatio),m.lightMap){v.lightMap.value=m.lightMap;const w=r._useLegacyLights===!0?Math.PI:1;v.lightMapIntensity.value=m.lightMapIntensity*w,t(m.lightMap,v.lightMapTransform)}m.aoMap&&(v.aoMap.value=m.aoMap,v.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,v.aoMapTransform))}function u(v,m){v.diffuse.value.copy(m.color),v.opacity.value=m.opacity,m.map&&(v.map.value=m.map,t(m.map,v.mapTransform))}function c(v,m){v.dashSize.value=m.dashSize,v.totalSize.value=m.dashSize+m.gapSize,v.scale.value=m.scale}function f(v,m,F,w){v.diffuse.value.copy(m.color),v.opacity.value=m.opacity,v.size.value=m.size*F,v.scale.value=w*.5,m.map&&(v.map.value=m.map,t(m.map,v.uvTransform)),m.alphaMap&&(v.alphaMap.value=m.alphaMap,t(m.alphaMap,v.alphaMapTransform)),m.alphaTest>0&&(v.alphaTest.value=m.alphaTest)}function d(v,m){v.diffuse.value.copy(m.color),v.opacity.value=m.opacity,v.rotation.value=m.rotation,m.map&&(v.map.value=m.map,t(m.map,v.mapTransform)),m.alphaMap&&(v.alphaMap.value=m.alphaMap,t(m.alphaMap,v.alphaMapTransform)),m.alphaTest>0&&(v.alphaTest.value=m.alphaTest)}function p(v,m){v.specular.value.copy(m.specular),v.shininess.value=Math.max(m.shininess,1e-4)}function _(v,m){m.gradientMap&&(v.gradientMap.value=m.gradientMap)}function g(v,m){v.metalness.value=m.metalness,m.metalnessMap&&(v.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,v.metalnessMapTransform)),v.roughness.value=m.roughness,m.roughnessMap&&(v.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,v.roughnessMapTransform)),e.get(m).envMap&&(v.envMapIntensity.value=m.envMapIntensity)}function M(v,m,F){v.ior.value=m.ior,m.sheen>0&&(v.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),v.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(v.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,v.sheenColorMapTransform)),m.sheenRoughnessMap&&(v.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,v.sheenRoughnessMapTransform))),m.clearcoat>0&&(v.clearcoat.value=m.clearcoat,v.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(v.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,v.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(v.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Mn&&v.clearcoatNormalScale.value.negate())),m.iridescence>0&&(v.iridescence.value=m.iridescence,v.iridescenceIOR.value=m.iridescenceIOR,v.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(v.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,v.iridescenceMapTransform)),m.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),m.transmission>0&&(v.transmission.value=m.transmission,v.transmissionSamplerMap.value=F.texture,v.transmissionSamplerSize.value.set(F.width,F.height),m.transmissionMap&&(v.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,v.transmissionMapTransform)),v.thickness.value=m.thickness,m.thicknessMap&&(v.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=m.attenuationDistance,v.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(v.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(v.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=m.specularIntensity,v.specularColor.value.copy(m.specularColor),m.specularColorMap&&(v.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,v.specularColorMapTransform)),m.specularIntensityMap&&(v.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,v.specularIntensityMapTransform))}function T(v,m){m.matcap&&(v.matcap.value=m.matcap)}function A(v,m){const F=e.get(m).light;v.referencePosition.value.setFromMatrixPosition(F.matrixWorld),v.nearDistance.value=F.shadow.camera.near,v.farDistance.value=F.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function Kb(r,e,t,i){let a={},o={},u=[];const c=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function f(F,w){const P=w.program;i.uniformBlockBinding(F,P)}function d(F,w){let P=a[F.id];P===void 0&&(T(F),P=p(F),a[F.id]=P,F.addEventListener("dispose",v));const N=w.program;i.updateUBOMapping(F,N);const H=e.render.frame;o[F.id]!==H&&(g(F),o[F.id]=H)}function p(F){const w=_();F.__bindingPointIndex=w;const P=r.createBuffer(),N=F.__size,H=F.usage;return r.bindBuffer(r.UNIFORM_BUFFER,P),r.bufferData(r.UNIFORM_BUFFER,N,H),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,w,P),P}function _(){for(let F=0;F<c;F++)if(u.indexOf(F)===-1)return u.push(F),F;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(F){const w=a[F.id],P=F.uniforms,N=F.__cache;r.bindBuffer(r.UNIFORM_BUFFER,w);for(let H=0,U=P.length;H<U;H++){const ae=P[H];if(M(ae,H,N)===!0){const b=ae.__offset,D=Array.isArray(ae.value)?ae.value:[ae.value];let de=0;for(let ge=0;ge<D.length;ge++){const Z=D[ge],ee=A(Z);typeof Z=="number"?(ae.__data[0]=Z,r.bufferSubData(r.UNIFORM_BUFFER,b+de,ae.__data)):Z.isMatrix3?(ae.__data[0]=Z.elements[0],ae.__data[1]=Z.elements[1],ae.__data[2]=Z.elements[2],ae.__data[3]=Z.elements[0],ae.__data[4]=Z.elements[3],ae.__data[5]=Z.elements[4],ae.__data[6]=Z.elements[5],ae.__data[7]=Z.elements[0],ae.__data[8]=Z.elements[6],ae.__data[9]=Z.elements[7],ae.__data[10]=Z.elements[8],ae.__data[11]=Z.elements[0]):(Z.toArray(ae.__data,de),de+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,b,ae.__data)}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(F,w,P){const N=F.value;if(P[w]===void 0){if(typeof N=="number")P[w]=N;else{const H=Array.isArray(N)?N:[N],U=[];for(let ae=0;ae<H.length;ae++)U.push(H[ae].clone());P[w]=U}return!0}else if(typeof N=="number"){if(P[w]!==N)return P[w]=N,!0}else{const H=Array.isArray(P[w])?P[w]:[P[w]],U=Array.isArray(N)?N:[N];for(let ae=0;ae<H.length;ae++){const b=H[ae];if(b.equals(U[ae])===!1)return b.copy(U[ae]),!0}}return!1}function T(F){const w=F.uniforms;let P=0;const N=16;let H=0;for(let U=0,ae=w.length;U<ae;U++){const b=w[U],D={boundary:0,storage:0},de=Array.isArray(b.value)?b.value:[b.value];for(let ge=0,Z=de.length;ge<Z;ge++){const ee=de[ge],J=A(ee);D.boundary+=J.boundary,D.storage+=J.storage}if(b.__data=new Float32Array(D.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=P,U>0){H=P%N;const ge=N-H;H!==0&&ge-D.boundary<0&&(P+=N-H,b.__offset=P)}P+=D.storage}return H=P%N,H>0&&(P+=N-H),F.__size=P,F.__cache={},this}function A(F){const w={boundary:0,storage:0};return typeof F=="number"?(w.boundary=4,w.storage=4):F.isVector2?(w.boundary=8,w.storage=8):F.isVector3||F.isColor?(w.boundary=16,w.storage=12):F.isVector4?(w.boundary=16,w.storage=16):F.isMatrix3?(w.boundary=48,w.storage=48):F.isMatrix4?(w.boundary=64,w.storage=64):F.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",F),w}function v(F){const w=F.target;w.removeEventListener("dispose",v);const P=u.indexOf(w.__bindingPointIndex);u.splice(P,1),r.deleteBuffer(a[w.id]),delete a[w.id],delete o[w.id]}function m(){for(const F in a)r.deleteBuffer(a[F]);u=[],a={},o={}}return{bind:f,update:d,dispose:m}}class rp{constructor(e={}){const{canvas:t=GS(),context:i=null,depth:a=!0,stencil:o=!0,alpha:u=!1,antialias:c=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:d=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:_=!1}=e;this.isWebGLRenderer=!0;let g;i!==null?g=i.getContextAttributes().alpha:g=u;const M=new Uint32Array(4),T=new Int32Array(4);let A=null,v=null;const m=[],F=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputColorSpace=Pt,this._useLegacyLights=!1,this.toneMapping=Qi,this.toneMappingExposure=1;const w=this;let P=!1,N=0,H=0,U=null,ae=-1,b=null;const D=new en,de=new en;let ge=null;const Z=new wt(0);let ee=0,J=t.width,pe=t.height,ie=1,se=null,ve=null;const ue=new en(0,0,J,pe),q=new en(0,0,J,pe);let Q=!1;const Re=new Jd;let Ce=!1,Le=!1,Oe=null;const $e=new tn,Fe=new ht,rt=new W,Gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ke(){return U===null?ie:1}let V=i;function Nt(R,k){for(let te=0;te<R.length;te++){const X=R[te],ne=t.getContext(X,k);if(ne!==null)return ne}return null}try{const R={alpha:!0,depth:a,stencil:o,antialias:c,premultipliedAlpha:f,preserveDrawingBuffer:d,powerPreference:p,failIfMajorPerformanceCaveat:_};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Uc}`),t.addEventListener("webglcontextlost",Te,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",me,!1),V===null){const k=["webgl2","webgl","experimental-webgl"];if(w.isWebGL1Renderer===!0&&k.shift(),V=Nt(k,R),V===null)throw Nt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&V instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),V.getShaderPrecisionFormat===void 0&&(V.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Ue,We,Ye,mt,et,Ze,st,_t,Rt,C,y,Y,xe,fe,_e,Ie,Me,K,I,ce,Ae,Se,ye,Xe;function ft(){Ue=new sT(V),We=new JA(V,Ue,e),Ue.init(We),Se=new kb(V,Ue,We),Ye=new Hb(V,Ue,We),mt=new lT(V),et=new bb,Ze=new Gb(V,Ue,Ye,et,We,Se,mt),st=new eT(w),_t=new rT(w),Rt=new _E(V,We),ye=new ZA(V,Ue,Rt,We),C=new aT(V,Rt,mt,ye),y=new fT(V,C,Rt,mt),I=new hT(V,We,Ze),Ie=new QA(et),Y=new Tb(w,st,_t,Ue,We,ye,Ie),xe=new $b(w,et),fe=new Rb,_e=new Ib(Ue,We),K=new KA(w,st,_t,Ye,y,g,f),Me=new zb(w,y,We),Xe=new Kb(V,mt,We,Ye),ce=new jA(V,Ue,mt,We),Ae=new oT(V,Ue,mt,We),mt.programs=Y.programs,w.capabilities=We,w.extensions=Ue,w.properties=et,w.renderLists=fe,w.shadowMap=Me,w.state=Ye,w.info=mt}ft();const B=new qb(w,V);this.xr=B,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const R=Ue.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ue.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(R){R!==void 0&&(ie=R,this.setSize(J,pe,!1))},this.getSize=function(R){return R.set(J,pe)},this.setSize=function(R,k,te=!0){if(B.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=R,pe=k,t.width=Math.floor(R*ie),t.height=Math.floor(k*ie),te===!0&&(t.style.width=R+"px",t.style.height=k+"px"),this.setViewport(0,0,R,k)},this.getDrawingBufferSize=function(R){return R.set(J*ie,pe*ie).floor()},this.setDrawingBufferSize=function(R,k,te){J=R,pe=k,ie=te,t.width=Math.floor(R*te),t.height=Math.floor(k*te),this.setViewport(0,0,R,k)},this.getCurrentViewport=function(R){return R.copy(D)},this.getViewport=function(R){return R.copy(ue)},this.setViewport=function(R,k,te,X){R.isVector4?ue.set(R.x,R.y,R.z,R.w):ue.set(R,k,te,X),Ye.viewport(D.copy(ue).multiplyScalar(ie).floor())},this.getScissor=function(R){return R.copy(q)},this.setScissor=function(R,k,te,X){R.isVector4?q.set(R.x,R.y,R.z,R.w):q.set(R,k,te,X),Ye.scissor(de.copy(q).multiplyScalar(ie).floor())},this.getScissorTest=function(){return Q},this.setScissorTest=function(R){Ye.setScissorTest(Q=R)},this.setOpaqueSort=function(R){se=R},this.setTransparentSort=function(R){ve=R},this.getClearColor=function(R){return R.copy(K.getClearColor())},this.setClearColor=function(){K.setClearColor.apply(K,arguments)},this.getClearAlpha=function(){return K.getClearAlpha()},this.setClearAlpha=function(){K.setClearAlpha.apply(K,arguments)},this.clear=function(R=!0,k=!0,te=!0){let X=0;if(R){let ne=!1;if(U!==null){const De=U.texture.format;ne=De===Od||De===Fd||De===Nd}if(ne){const De=U.texture.type,Be=De===er||De===Zi||De===Ic||De===xr||De===Ud||De===Id,qe=K.getClearColor(),Ge=K.getClearAlpha(),ot=qe.r,ze=qe.g,Qe=qe.b;Be?(M[0]=ot,M[1]=ze,M[2]=Qe,M[3]=Ge,V.clearBufferuiv(V.COLOR,0,M)):(T[0]=ot,T[1]=ze,T[2]=Qe,T[3]=Ge,V.clearBufferiv(V.COLOR,0,T))}else X|=V.COLOR_BUFFER_BIT}k&&(X|=V.DEPTH_BUFFER_BIT),te&&(X|=V.STENCIL_BUFFER_BIT),V.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",me,!1),fe.dispose(),_e.dispose(),et.dispose(),st.dispose(),_t.dispose(),y.dispose(),ye.dispose(),Xe.dispose(),Y.dispose(),B.dispose(),B.removeEventListener("sessionstart",yt),B.removeEventListener("sessionend",Dn),Oe&&(Oe.dispose(),Oe=null),jt.stop()};function Te(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function j(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const R=mt.autoReset,k=Me.enabled,te=Me.autoUpdate,X=Me.needsUpdate,ne=Me.type;ft(),mt.autoReset=R,Me.enabled=k,Me.autoUpdate=te,Me.needsUpdate=X,Me.type=ne}function me(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Ee(R){const k=R.target;k.removeEventListener("dispose",Ee),at(k)}function at(R){vt(R),et.remove(R)}function vt(R){const k=et.get(R).programs;k!==void 0&&(k.forEach(function(te){Y.releaseProgram(te)}),R.isShaderMaterial&&Y.releaseShaderCache(R))}this.renderBufferDirect=function(R,k,te,X,ne,De){k===null&&(k=Gt);const Be=ne.isMesh&&ne.matrixWorld.determinant()<0,qe=Do(R,k,te,X,ne);Ye.setMaterial(X,Be);let Ge=te.index,ot=1;if(X.wireframe===!0){if(Ge=C.getWireframeAttribute(te),Ge===void 0)return;ot=2}const ze=te.drawRange,Qe=te.attributes.position;let Ct=ze.start*ot,Dt=(ze.start+ze.count)*ot;De!==null&&(Ct=Math.max(Ct,De.start*ot),Dt=Math.min(Dt,(De.start+De.count)*ot)),Ge!==null?(Ct=Math.max(Ct,0),Dt=Math.min(Dt,Ge.count)):Qe!=null&&(Ct=Math.max(Ct,0),Dt=Math.min(Dt,Qe.count));const cn=Dt-Ct;if(cn<0||cn===1/0)return;ye.setup(ne,X,qe,te,Ge);let Un,Ut=ce;if(Ge!==null&&(Un=Rt.get(Ge),Ut=Ae,Ut.setIndex(Un)),ne.isMesh)X.wireframe===!0?(Ye.setLineWidth(X.wireframeLinewidth*Ke()),Ut.setMode(V.LINES)):Ut.setMode(V.TRIANGLES);else if(ne.isLine){let ct=X.linewidth;ct===void 0&&(ct=1),Ye.setLineWidth(ct*Ke()),ne.isLineSegments?Ut.setMode(V.LINES):ne.isLineLoop?Ut.setMode(V.LINE_LOOP):Ut.setMode(V.LINE_STRIP)}else ne.isPoints?Ut.setMode(V.POINTS):ne.isSprite&&Ut.setMode(V.TRIANGLES);if(ne.isInstancedMesh)Ut.renderInstances(Ct,cn,ne.count);else if(te.isInstancedBufferGeometry){const ct=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,bs=Math.min(te.instanceCount,ct);Ut.renderInstances(Ct,cn,bs)}else Ut.render(Ct,cn)},this.compile=function(R,k){function te(X,ne,De){X.transparent===!0&&X.side===li&&X.forceSinglePass===!1?(X.side=Mn,X.needsUpdate=!0,Lr(X,ne,De),X.side=nr,X.needsUpdate=!0,Lr(X,ne,De),X.side=li):Lr(X,ne,De)}v=_e.get(R),v.init(),F.push(v),R.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),v.setupLights(w._useLegacyLights),R.traverse(function(X){const ne=X.material;if(ne)if(Array.isArray(ne))for(let De=0;De<ne.length;De++){const Be=ne[De];te(Be,R,X)}else te(ne,R,X)}),F.pop(),v=null};let Et=null;function nn(R){Et&&Et(R)}function yt(){jt.stop()}function Dn(){jt.start()}const jt=new Qd;jt.setAnimationLoop(nn),typeof self<"u"&&jt.setContext(self),this.setAnimationLoop=function(R){Et=R,B.setAnimationLoop(R),R===null?jt.stop():jt.start()},B.addEventListener("sessionstart",yt),B.addEventListener("sessionend",Dn),this.render=function(R,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),B.enabled===!0&&B.isPresenting===!0&&(B.cameraAutoUpdate===!0&&B.updateCamera(k),k=B.getCamera()),R.isScene===!0&&R.onBeforeRender(w,R,k,U),v=_e.get(R,F.length),v.init(),F.push(v),$e.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Re.setFromProjectionMatrix($e),Le=this.localClippingEnabled,Ce=Ie.init(this.clippingPlanes,Le),A=fe.get(R,m.length),A.init(),m.push(A),Rr(R,k,0,w.sortObjects),A.finish(),w.sortObjects===!0&&A.sort(se,ve),this.info.render.frame++,Ce===!0&&Ie.beginShadows();const te=v.state.shadowsArray;if(Me.render(te,R,k),Ce===!0&&Ie.endShadows(),this.info.autoReset===!0&&this.info.reset(),K.render(A,R),v.setupLights(w._useLegacyLights),k.isArrayCamera){const X=k.cameras;for(let ne=0,De=X.length;ne<De;ne++){const Be=X[ne];oa(A,R,Be,Be.viewport)}}else oa(A,R,k);U!==null&&(Ze.updateMultisampleRenderTarget(U),Ze.updateRenderTargetMipmap(U)),R.isScene===!0&&R.onAfterRender(w,R,k),ye.resetDefaultState(),ae=-1,b=null,F.pop(),F.length>0?v=F[F.length-1]:v=null,m.pop(),m.length>0?A=m[m.length-1]:A=null};function Rr(R,k,te,X){if(R.visible===!1)return;if(R.layers.test(k.layers)){if(R.isGroup)te=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(k);else if(R.isLight)v.pushLight(R),R.castShadow&&v.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Re.intersectsSprite(R)){X&&rt.setFromMatrixPosition(R.matrixWorld).applyMatrix4($e);const Be=y.update(R),qe=R.material;qe.visible&&A.push(R,Be,qe,te,rt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Re.intersectsObject(R))){const Be=y.update(R),qe=R.material;if(X&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),rt.copy(R.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),rt.copy(Be.boundingSphere.center)),rt.applyMatrix4(R.matrixWorld).applyMatrix4($e)),Array.isArray(qe)){const Ge=Be.groups;for(let ot=0,ze=Ge.length;ot<ze;ot++){const Qe=Ge[ot],Ct=qe[Qe.materialIndex];Ct&&Ct.visible&&A.push(R,Be,Ct,te,rt.z,Qe)}}else qe.visible&&A.push(R,Be,qe,te,rt.z,null)}}const De=R.children;for(let Be=0,qe=De.length;Be<qe;Be++)Rr(De[Be],k,te,X)}function oa(R,k,te,X){const ne=R.opaque,De=R.transmissive,Be=R.transparent;v.setupLightsView(te),Ce===!0&&Ie.setGlobalState(w.clippingPlanes,te),De.length>0&&Ts(ne,De,k,te),X&&Ye.viewport(D.copy(X)),ne.length>0&&Cr(ne,k,te),De.length>0&&Cr(De,k,te),Be.length>0&&Cr(Be,k,te),Ye.buffers.depth.setTest(!0),Ye.buffers.depth.setMask(!0),Ye.buffers.color.setMask(!0),Ye.setPolygonOffset(!1)}function Ts(R,k,te,X){const ne=We.isWebGL2;Oe===null&&(Oe=new Ar(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")?na:er,minFilter:ta,samples:ne?4:0})),w.getDrawingBufferSize(Fe),ne?Oe.setSize(Fe.x,Fe.y):Oe.setSize(Eo(Fe.x),Eo(Fe.y));const De=w.getRenderTarget();w.setRenderTarget(Oe),w.getClearColor(Z),ee=w.getClearAlpha(),ee<1&&w.setClearColor(16777215,.5),w.clear();const Be=w.toneMapping;w.toneMapping=Qi,Cr(R,te,X),Ze.updateMultisampleRenderTarget(Oe),Ze.updateRenderTargetMipmap(Oe);let qe=!1;for(let Ge=0,ot=k.length;Ge<ot;Ge++){const ze=k[Ge],Qe=ze.object,Ct=ze.geometry,Dt=ze.material,cn=ze.group;if(Dt.side===li&&Qe.layers.test(X.layers)){const Un=Dt.side;Dt.side=Mn,Dt.needsUpdate=!0,la(Qe,te,X,Ct,Dt,cn),Dt.side=Un,Dt.needsUpdate=!0,qe=!0}}qe===!0&&(Ze.updateMultisampleRenderTarget(Oe),Ze.updateRenderTargetMipmap(Oe)),w.setRenderTarget(De),w.setClearColor(Z,ee),w.toneMapping=Be}function Cr(R,k,te){const X=k.isScene===!0?k.overrideMaterial:null;for(let ne=0,De=R.length;ne<De;ne++){const Be=R[ne],qe=Be.object,Ge=Be.geometry,ot=X===null?Be.material:X,ze=Be.group;qe.layers.test(te.layers)&&la(qe,k,te,Ge,ot,ze)}}function la(R,k,te,X,ne,De){R.onBeforeRender(w,k,te,X,ne,De),R.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ne.onBeforeRender(w,k,te,X,R,De),ne.transparent===!0&&ne.side===li&&ne.forceSinglePass===!1?(ne.side=Mn,ne.needsUpdate=!0,w.renderBufferDirect(te,k,X,ne,R,De),ne.side=nr,ne.needsUpdate=!0,w.renderBufferDirect(te,k,X,ne,R,De),ne.side=li):w.renderBufferDirect(te,k,X,ne,R,De),R.onAfterRender(w,k,te,X,ne,De)}function Lr(R,k,te){k.isScene!==!0&&(k=Gt);const X=et.get(R),ne=v.state.lights,De=v.state.shadowsArray,Be=ne.state.version,qe=Y.getParameters(R,ne.state,De,k,te),Ge=Y.getProgramCacheKey(qe);let ot=X.programs;X.environment=R.isMeshStandardMaterial?k.environment:null,X.fog=k.fog,X.envMap=(R.isMeshStandardMaterial?_t:st).get(R.envMap||X.environment),ot===void 0&&(R.addEventListener("dispose",Ee),ot=new Map,X.programs=ot);let ze=ot.get(Ge);if(ze!==void 0){if(X.currentProgram===ze&&X.lightsStateVersion===Be)return ca(R,qe),ze}else qe.uniforms=Y.getUniforms(R),R.onBuild(te,qe,w),R.onBeforeCompile(qe,w),ze=Y.acquireProgram(qe,Ge),ot.set(Ge,ze),X.uniforms=qe.uniforms;const Qe=X.uniforms;(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Qe.clippingPlanes=Ie.uniform),ca(R,qe),X.needsLights=Io(R),X.lightsStateVersion=Be,X.needsLights&&(Qe.ambientLightColor.value=ne.state.ambient,Qe.lightProbe.value=ne.state.probe,Qe.directionalLights.value=ne.state.directional,Qe.directionalLightShadows.value=ne.state.directionalShadow,Qe.spotLights.value=ne.state.spot,Qe.spotLightShadows.value=ne.state.spotShadow,Qe.rectAreaLights.value=ne.state.rectArea,Qe.ltc_1.value=ne.state.rectAreaLTC1,Qe.ltc_2.value=ne.state.rectAreaLTC2,Qe.pointLights.value=ne.state.point,Qe.pointLightShadows.value=ne.state.pointShadow,Qe.hemisphereLights.value=ne.state.hemi,Qe.directionalShadowMap.value=ne.state.directionalShadowMap,Qe.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,Qe.spotShadowMap.value=ne.state.spotShadowMap,Qe.spotLightMatrix.value=ne.state.spotLightMatrix,Qe.spotLightMap.value=ne.state.spotLightMap,Qe.pointShadowMap.value=ne.state.pointShadowMap,Qe.pointShadowMatrix.value=ne.state.pointShadowMatrix);const Ct=ze.getUniforms(),Dt=vo.seqWithValue(Ct.seq,Qe);return X.currentProgram=ze,X.uniformsList=Dt,ze}function ca(R,k){const te=et.get(R);te.outputColorSpace=k.outputColorSpace,te.instancing=k.instancing,te.instancingColor=k.instancingColor,te.skinning=k.skinning,te.morphTargets=k.morphTargets,te.morphNormals=k.morphNormals,te.morphColors=k.morphColors,te.morphTargetsCount=k.morphTargetsCount,te.numClippingPlanes=k.numClippingPlanes,te.numIntersection=k.numClipIntersection,te.vertexAlphas=k.vertexAlphas,te.vertexTangents=k.vertexTangents,te.toneMapping=k.toneMapping}function Do(R,k,te,X,ne){k.isScene!==!0&&(k=Gt),Ze.resetTextureUnits();const De=k.fog,Be=X.isMeshStandardMaterial?k.environment:null,qe=U===null?w.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:pi,Ge=(X.isMeshStandardMaterial?_t:st).get(X.envMap||Be),ot=X.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,ze=!!te.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Qe=!!te.morphAttributes.position,Ct=!!te.morphAttributes.normal,Dt=!!te.morphAttributes.color;let cn=Qi;X.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(cn=w.toneMapping);const Un=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,Ut=Un!==void 0?Un.length:0,ct=et.get(X),bs=v.state.lights;if(Ce===!0&&(Le===!0||R!==b)){const $t=R===b&&X.id===ae;Ie.setState(X,R,$t)}let Ft=!1;X.version===ct.__version?(ct.needsLights&&ct.lightsStateVersion!==bs.state.version||ct.outputColorSpace!==qe||ne.isInstancedMesh&&ct.instancing===!1||!ne.isInstancedMesh&&ct.instancing===!0||ne.isSkinnedMesh&&ct.skinning===!1||!ne.isSkinnedMesh&&ct.skinning===!0||ne.isInstancedMesh&&ct.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&ct.instancingColor===!1&&ne.instanceColor!==null||ct.envMap!==Ge||X.fog===!0&&ct.fog!==De||ct.numClippingPlanes!==void 0&&(ct.numClippingPlanes!==Ie.numPlanes||ct.numIntersection!==Ie.numIntersection)||ct.vertexAlphas!==ot||ct.vertexTangents!==ze||ct.morphTargets!==Qe||ct.morphNormals!==Ct||ct.morphColors!==Dt||ct.toneMapping!==cn||We.isWebGL2===!0&&ct.morphTargetsCount!==Ut)&&(Ft=!0):(Ft=!0,ct.__version=X.version);let mi=ct.currentProgram;Ft===!0&&(mi=Lr(X,k,ne));let ws=!1,Ni=!1,Pr=!1;const Vt=mi.getUniforms(),gi=ct.uniforms;if(Ye.useProgram(mi.program)&&(ws=!0,Ni=!0,Pr=!0),X.id!==ae&&(ae=X.id,Ni=!0),ws||b!==R){Vt.setValue(V,"projectionMatrix",R.projectionMatrix),Vt.setValue(V,"viewMatrix",R.matrixWorldInverse);const $t=Vt.map.cameraPosition;$t!==void 0&&$t.setValue(V,rt.setFromMatrixPosition(R.matrixWorld)),We.logarithmicDepthBuffer&&Vt.setValue(V,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Vt.setValue(V,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,Ni=!0,Pr=!0)}if(ne.isSkinnedMesh){Vt.setOptional(V,ne,"bindMatrix"),Vt.setOptional(V,ne,"bindMatrixInverse");const $t=ne.skeleton;$t&&(We.floatVertexTextures?($t.boneTexture===null&&$t.computeBoneTexture(),Vt.setValue(V,"boneTexture",$t.boneTexture,Ze),Vt.setValue(V,"boneTextureSize",$t.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Dr=te.morphAttributes;if((Dr.position!==void 0||Dr.normal!==void 0||Dr.color!==void 0&&We.isWebGL2===!0)&&I.update(ne,te,mi),(Ni||ct.receiveShadow!==ne.receiveShadow)&&(ct.receiveShadow=ne.receiveShadow,Vt.setValue(V,"receiveShadow",ne.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(gi.envMap.value=Ge,gi.flipEnvMap.value=Ge.isCubeTexture&&Ge.isRenderTargetTexture===!1?-1:1),Ni&&(Vt.setValue(V,"toneMappingExposure",w.toneMappingExposure),ct.needsLights&&Uo(gi,Pr),De&&X.fog===!0&&xe.refreshFogUniforms(gi,De),xe.refreshMaterialUniforms(gi,X,ie,pe,Oe),vo.upload(V,ct.uniformsList,gi,Ze)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(vo.upload(V,ct.uniformsList,gi,Ze),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Vt.setValue(V,"center",ne.center),Vt.setValue(V,"modelViewMatrix",ne.modelViewMatrix),Vt.setValue(V,"normalMatrix",ne.normalMatrix),Vt.setValue(V,"modelMatrix",ne.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const $t=X.uniformsGroups;for(let Ur=0,No=$t.length;Ur<No;Ur++)if(We.isWebGL2){const Rs=$t[Ur];Xe.update(Rs,mi),Xe.bind(Rs,mi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return mi}function Uo(R,k){R.ambientLightColor.needsUpdate=k,R.lightProbe.needsUpdate=k,R.directionalLights.needsUpdate=k,R.directionalLightShadows.needsUpdate=k,R.pointLights.needsUpdate=k,R.pointLightShadows.needsUpdate=k,R.spotLights.needsUpdate=k,R.spotLightShadows.needsUpdate=k,R.rectAreaLights.needsUpdate=k,R.hemisphereLights.needsUpdate=k}function Io(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(R,k,te){et.get(R.texture).__webglTexture=k,et.get(R.depthTexture).__webglTexture=te;const X=et.get(R);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=te===void 0,X.__autoAllocateDepthBuffer||Ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,k){const te=et.get(R);te.__webglFramebuffer=k,te.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(R,k=0,te=0){U=R,N=k,H=te;let X=!0,ne=null,De=!1,Be=!1;if(R){const Ge=et.get(R);Ge.__useDefaultFramebuffer!==void 0?(Ye.bindFramebuffer(V.FRAMEBUFFER,null),X=!1):Ge.__webglFramebuffer===void 0?Ze.setupRenderTarget(R):Ge.__hasExternalTextures&&Ze.rebindTextures(R,et.get(R.texture).__webglTexture,et.get(R.depthTexture).__webglTexture);const ot=R.texture;(ot.isData3DTexture||ot.isDataArrayTexture||ot.isCompressedArrayTexture)&&(Be=!0);const ze=et.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ze[k])?ne=ze[k][te]:ne=ze[k],De=!0):We.isWebGL2&&R.samples>0&&Ze.useMultisampledRTT(R)===!1?ne=et.get(R).__webglMultisampledFramebuffer:Array.isArray(ze)?ne=ze[te]:ne=ze,D.copy(R.viewport),de.copy(R.scissor),ge=R.scissorTest}else D.copy(ue).multiplyScalar(ie).floor(),de.copy(q).multiplyScalar(ie).floor(),ge=Q;if(Ye.bindFramebuffer(V.FRAMEBUFFER,ne)&&We.drawBuffers&&X&&Ye.drawBuffers(R,ne),Ye.viewport(D),Ye.scissor(de),Ye.setScissorTest(ge),De){const Ge=et.get(R.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ge.__webglTexture,te)}else if(Be){const Ge=et.get(R.texture),ot=k||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Ge.__webglTexture,te||0,ot)}ae=-1},this.readRenderTargetPixels=function(R,k,te,X,ne,De,Be){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qe=et.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Be!==void 0&&(qe=qe[Be]),qe){Ye.bindFramebuffer(V.FRAMEBUFFER,qe);try{const Ge=R.texture,ot=Ge.format,ze=Ge.type;if(ot!==ti&&Se.convert(ot)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Qe=ze===na&&(Ue.has("EXT_color_buffer_half_float")||We.isWebGL2&&Ue.has("EXT_color_buffer_float"));if(ze!==er&&Se.convert(ze)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ze===ji&&(We.isWebGL2||Ue.has("OES_texture_float")||Ue.has("WEBGL_color_buffer_float")))&&!Qe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=R.width-X&&te>=0&&te<=R.height-ne&&V.readPixels(k,te,X,ne,Se.convert(ot),Se.convert(ze),De)}finally{const Ge=U!==null?et.get(U).__webglFramebuffer:null;Ye.bindFramebuffer(V.FRAMEBUFFER,Ge)}}},this.copyFramebufferToTexture=function(R,k,te=0){const X=Math.pow(2,-te),ne=Math.floor(k.image.width*X),De=Math.floor(k.image.height*X);Ze.setTexture2D(k,0),V.copyTexSubImage2D(V.TEXTURE_2D,te,0,0,R.x,R.y,ne,De),Ye.unbindTexture()},this.copyTextureToTexture=function(R,k,te,X=0){const ne=k.image.width,De=k.image.height,Be=Se.convert(te.format),qe=Se.convert(te.type);Ze.setTexture2D(te,0),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,te.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,te.unpackAlignment),k.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,X,R.x,R.y,ne,De,Be,qe,k.image.data):k.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,X,R.x,R.y,k.mipmaps[0].width,k.mipmaps[0].height,Be,k.mipmaps[0].data):V.texSubImage2D(V.TEXTURE_2D,X,R.x,R.y,Be,qe,k.image),X===0&&te.generateMipmaps&&V.generateMipmap(V.TEXTURE_2D),Ye.unbindTexture()},this.copyTextureToTexture3D=function(R,k,te,X,ne=0){if(w.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const De=R.max.x-R.min.x+1,Be=R.max.y-R.min.y+1,qe=R.max.z-R.min.z+1,Ge=Se.convert(X.format),ot=Se.convert(X.type);let ze;if(X.isData3DTexture)Ze.setTexture3D(X,0),ze=V.TEXTURE_3D;else if(X.isDataArrayTexture)Ze.setTexture2DArray(X,0),ze=V.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,X.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,X.unpackAlignment);const Qe=V.getParameter(V.UNPACK_ROW_LENGTH),Ct=V.getParameter(V.UNPACK_IMAGE_HEIGHT),Dt=V.getParameter(V.UNPACK_SKIP_PIXELS),cn=V.getParameter(V.UNPACK_SKIP_ROWS),Un=V.getParameter(V.UNPACK_SKIP_IMAGES),Ut=te.isCompressedTexture?te.mipmaps[0]:te.image;V.pixelStorei(V.UNPACK_ROW_LENGTH,Ut.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Ut.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,R.min.x),V.pixelStorei(V.UNPACK_SKIP_ROWS,R.min.y),V.pixelStorei(V.UNPACK_SKIP_IMAGES,R.min.z),te.isDataTexture||te.isData3DTexture?V.texSubImage3D(ze,ne,k.x,k.y,k.z,De,Be,qe,Ge,ot,Ut.data):te.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),V.compressedTexSubImage3D(ze,ne,k.x,k.y,k.z,De,Be,qe,Ge,Ut.data)):V.texSubImage3D(ze,ne,k.x,k.y,k.z,De,Be,qe,Ge,ot,Ut),V.pixelStorei(V.UNPACK_ROW_LENGTH,Qe),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Ct),V.pixelStorei(V.UNPACK_SKIP_PIXELS,Dt),V.pixelStorei(V.UNPACK_SKIP_ROWS,cn),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Un),ne===0&&X.generateMipmaps&&V.generateMipmap(ze),Ye.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?Ze.setTextureCube(R,0):R.isData3DTexture?Ze.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ze.setTexture2DArray(R,0):Ze.setTexture2D(R,0),Ye.unbindTexture()},this.resetState=function(){N=0,H=0,U=null,Ye.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ui}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Pt?Sr:Bd}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Sr?Pt:pi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Zb extends rp{}Zb.prototype.isWebGL1Renderer=!0;class jb extends Ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class yd{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(ln(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uc);const Ad={type:"change"},Mc={type:"start"},Td={type:"end"},_o=new kd,bd=new Ki,Jb=Math.cos(70*HS.DEG2RAD);class Qb extends br{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new W,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$r.ROTATE,MIDDLE:$r.DOLLY,RIGHT:$r.PAN},this.touches={ONE:Kr.ROTATE,TWO:Kr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(I){I.addEventListener("keydown",y),this._domElementKeyEvents=I},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",y),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Ad),i.update(),o=a.NONE},this.update=function(){const I=new W,ce=new Tr().setFromUnitVectors(e.up,new W(0,1,0)),Ae=ce.clone().invert(),Se=new W,ye=new Tr,Xe=new W,ft=2*Math.PI;return function(Te=null){const j=i.object.position;I.copy(j).sub(i.target),I.applyQuaternion(ce),c.setFromVector3(I),i.autoRotate&&o===a.NONE&&de(b(Te)),i.enableDamping?(c.theta+=f.theta*i.dampingFactor,c.phi+=f.phi*i.dampingFactor):(c.theta+=f.theta,c.phi+=f.phi);let me=i.minAzimuthAngle,Ee=i.maxAzimuthAngle;isFinite(me)&&isFinite(Ee)&&(me<-Math.PI?me+=ft:me>Math.PI&&(me-=ft),Ee<-Math.PI?Ee+=ft:Ee>Math.PI&&(Ee-=ft),me<=Ee?c.theta=Math.max(me,Math.min(Ee,c.theta)):c.theta=c.theta>(me+Ee)/2?Math.max(me,c.theta):Math.min(Ee,c.theta)),c.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,c.phi)),c.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(p,i.dampingFactor):i.target.add(p),i.zoomToCursor&&H||i.object.isOrthographicCamera?c.radius=ve(c.radius):c.radius=ve(c.radius*d),I.setFromSpherical(c),I.applyQuaternion(Ae),j.copy(i.target).add(I),i.object.lookAt(i.target),i.enableDamping===!0?(f.theta*=1-i.dampingFactor,f.phi*=1-i.dampingFactor,p.multiplyScalar(1-i.dampingFactor)):(f.set(0,0,0),p.set(0,0,0));let at=!1;if(i.zoomToCursor&&H){let vt=null;if(i.object.isPerspectiveCamera){const Et=I.length();vt=ve(Et*d);const nn=Et-vt;i.object.position.addScaledVector(P,nn),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Et=new W(N.x,N.y,0);Et.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/d)),i.object.updateProjectionMatrix(),at=!0;const nn=new W(N.x,N.y,0);nn.unproject(i.object),i.object.position.sub(nn).add(Et),i.object.updateMatrixWorld(),vt=I.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;vt!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(vt).add(i.object.position):(_o.origin.copy(i.object.position),_o.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(_o.direction))<Jb?e.lookAt(i.target):(bd.setFromNormalAndCoplanarPoint(i.object.up,i.target),_o.intersectPlane(bd,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/d)),i.object.updateProjectionMatrix(),at=!0);return d=1,H=!1,at||Se.distanceToSquared(i.object.position)>u||8*(1-ye.dot(i.object.quaternion))>u||Xe.distanceToSquared(i.target)>0?(i.dispatchEvent(Ad),Se.copy(i.object.position),ye.copy(i.object.quaternion),Xe.copy(i.target),at=!1,!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",fe),i.domElement.removeEventListener("pointerdown",et),i.domElement.removeEventListener("pointercancel",st),i.domElement.removeEventListener("wheel",C),i.domElement.removeEventListener("pointermove",Ze),i.domElement.removeEventListener("pointerup",st),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",y),i._domElementKeyEvents=null)};const i=this,a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=a.NONE;const u=1e-6,c=new yd,f=new yd;let d=1;const p=new W,_=new ht,g=new ht,M=new ht,T=new ht,A=new ht,v=new ht,m=new ht,F=new ht,w=new ht,P=new W,N=new ht;let H=!1;const U=[],ae={};function b(I){return I!==null?2*Math.PI/60*i.autoRotateSpeed*I:2*Math.PI/60/60*i.autoRotateSpeed}function D(){return Math.pow(.95,i.zoomSpeed)}function de(I){f.theta-=I}function ge(I){f.phi-=I}const Z=function(){const I=new W;return function(Ae,Se){I.setFromMatrixColumn(Se,0),I.multiplyScalar(-Ae),p.add(I)}}(),ee=function(){const I=new W;return function(Ae,Se){i.screenSpacePanning===!0?I.setFromMatrixColumn(Se,1):(I.setFromMatrixColumn(Se,0),I.crossVectors(i.object.up,I)),I.multiplyScalar(Ae),p.add(I)}}(),J=function(){const I=new W;return function(Ae,Se){const ye=i.domElement;if(i.object.isPerspectiveCamera){const Xe=i.object.position;I.copy(Xe).sub(i.target);let ft=I.length();ft*=Math.tan(i.object.fov/2*Math.PI/180),Z(2*Ae*ft/ye.clientHeight,i.object.matrix),ee(2*Se*ft/ye.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(Z(Ae*(i.object.right-i.object.left)/i.object.zoom/ye.clientWidth,i.object.matrix),ee(Se*(i.object.top-i.object.bottom)/i.object.zoom/ye.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function pe(I){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?d/=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ie(I){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?d*=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function se(I){if(!i.zoomToCursor)return;H=!0;const ce=i.domElement.getBoundingClientRect(),Ae=I.clientX-ce.left,Se=I.clientY-ce.top,ye=ce.width,Xe=ce.height;N.x=Ae/ye*2-1,N.y=-(Se/Xe)*2+1,P.set(N.x,N.y,1).unproject(i.object).sub(i.object.position).normalize()}function ve(I){return Math.max(i.minDistance,Math.min(i.maxDistance,I))}function ue(I){_.set(I.clientX,I.clientY)}function q(I){se(I),m.set(I.clientX,I.clientY)}function Q(I){T.set(I.clientX,I.clientY)}function Re(I){g.set(I.clientX,I.clientY),M.subVectors(g,_).multiplyScalar(i.rotateSpeed);const ce=i.domElement;de(2*Math.PI*M.x/ce.clientHeight),ge(2*Math.PI*M.y/ce.clientHeight),_.copy(g),i.update()}function Ce(I){F.set(I.clientX,I.clientY),w.subVectors(F,m),w.y>0?pe(D()):w.y<0&&ie(D()),m.copy(F),i.update()}function Le(I){A.set(I.clientX,I.clientY),v.subVectors(A,T).multiplyScalar(i.panSpeed),J(v.x,v.y),T.copy(A),i.update()}function Oe(I){se(I),I.deltaY<0?ie(D()):I.deltaY>0&&pe(D()),i.update()}function $e(I){let ce=!1;switch(I.code){case i.keys.UP:I.ctrlKey||I.metaKey||I.shiftKey?ge(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):J(0,i.keyPanSpeed),ce=!0;break;case i.keys.BOTTOM:I.ctrlKey||I.metaKey||I.shiftKey?ge(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):J(0,-i.keyPanSpeed),ce=!0;break;case i.keys.LEFT:I.ctrlKey||I.metaKey||I.shiftKey?de(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):J(i.keyPanSpeed,0),ce=!0;break;case i.keys.RIGHT:I.ctrlKey||I.metaKey||I.shiftKey?de(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):J(-i.keyPanSpeed,0),ce=!0;break}ce&&(I.preventDefault(),i.update())}function Fe(){if(U.length===1)_.set(U[0].pageX,U[0].pageY);else{const I=.5*(U[0].pageX+U[1].pageX),ce=.5*(U[0].pageY+U[1].pageY);_.set(I,ce)}}function rt(){if(U.length===1)T.set(U[0].pageX,U[0].pageY);else{const I=.5*(U[0].pageX+U[1].pageX),ce=.5*(U[0].pageY+U[1].pageY);T.set(I,ce)}}function Gt(){const I=U[0].pageX-U[1].pageX,ce=U[0].pageY-U[1].pageY,Ae=Math.sqrt(I*I+ce*ce);m.set(0,Ae)}function Ke(){i.enableZoom&&Gt(),i.enablePan&&rt()}function V(){i.enableZoom&&Gt(),i.enableRotate&&Fe()}function Nt(I){if(U.length==1)g.set(I.pageX,I.pageY);else{const Ae=K(I),Se=.5*(I.pageX+Ae.x),ye=.5*(I.pageY+Ae.y);g.set(Se,ye)}M.subVectors(g,_).multiplyScalar(i.rotateSpeed);const ce=i.domElement;de(2*Math.PI*M.x/ce.clientHeight),ge(2*Math.PI*M.y/ce.clientHeight),_.copy(g)}function Ue(I){if(U.length===1)A.set(I.pageX,I.pageY);else{const ce=K(I),Ae=.5*(I.pageX+ce.x),Se=.5*(I.pageY+ce.y);A.set(Ae,Se)}v.subVectors(A,T).multiplyScalar(i.panSpeed),J(v.x,v.y),T.copy(A)}function We(I){const ce=K(I),Ae=I.pageX-ce.x,Se=I.pageY-ce.y,ye=Math.sqrt(Ae*Ae+Se*Se);F.set(0,ye),w.set(0,Math.pow(F.y/m.y,i.zoomSpeed)),pe(w.y),m.copy(F)}function Ye(I){i.enableZoom&&We(I),i.enablePan&&Ue(I)}function mt(I){i.enableZoom&&We(I),i.enableRotate&&Nt(I)}function et(I){i.enabled!==!1&&(U.length===0&&(i.domElement.setPointerCapture(I.pointerId),i.domElement.addEventListener("pointermove",Ze),i.domElement.addEventListener("pointerup",st)),_e(I),I.pointerType==="touch"?Y(I):_t(I))}function Ze(I){i.enabled!==!1&&(I.pointerType==="touch"?xe(I):Rt(I))}function st(I){Ie(I),U.length===0&&(i.domElement.releasePointerCapture(I.pointerId),i.domElement.removeEventListener("pointermove",Ze),i.domElement.removeEventListener("pointerup",st)),i.dispatchEvent(Td),o=a.NONE}function _t(I){let ce;switch(I.button){case 0:ce=i.mouseButtons.LEFT;break;case 1:ce=i.mouseButtons.MIDDLE;break;case 2:ce=i.mouseButtons.RIGHT;break;default:ce=-1}switch(ce){case $r.DOLLY:if(i.enableZoom===!1)return;q(I),o=a.DOLLY;break;case $r.ROTATE:if(I.ctrlKey||I.metaKey||I.shiftKey){if(i.enablePan===!1)return;Q(I),o=a.PAN}else{if(i.enableRotate===!1)return;ue(I),o=a.ROTATE}break;case $r.PAN:if(I.ctrlKey||I.metaKey||I.shiftKey){if(i.enableRotate===!1)return;ue(I),o=a.ROTATE}else{if(i.enablePan===!1)return;Q(I),o=a.PAN}break;default:o=a.NONE}o!==a.NONE&&i.dispatchEvent(Mc)}function Rt(I){switch(o){case a.ROTATE:if(i.enableRotate===!1)return;Re(I);break;case a.DOLLY:if(i.enableZoom===!1)return;Ce(I);break;case a.PAN:if(i.enablePan===!1)return;Le(I);break}}function C(I){i.enabled===!1||i.enableZoom===!1||o!==a.NONE||(I.preventDefault(),i.dispatchEvent(Mc),Oe(I),i.dispatchEvent(Td))}function y(I){i.enabled===!1||i.enablePan===!1||$e(I)}function Y(I){switch(Me(I),U.length){case 1:switch(i.touches.ONE){case Kr.ROTATE:if(i.enableRotate===!1)return;Fe(),o=a.TOUCH_ROTATE;break;case Kr.PAN:if(i.enablePan===!1)return;rt(),o=a.TOUCH_PAN;break;default:o=a.NONE}break;case 2:switch(i.touches.TWO){case Kr.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ke(),o=a.TOUCH_DOLLY_PAN;break;case Kr.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;V(),o=a.TOUCH_DOLLY_ROTATE;break;default:o=a.NONE}break;default:o=a.NONE}o!==a.NONE&&i.dispatchEvent(Mc)}function xe(I){switch(Me(I),o){case a.TOUCH_ROTATE:if(i.enableRotate===!1)return;Nt(I),i.update();break;case a.TOUCH_PAN:if(i.enablePan===!1)return;Ue(I),i.update();break;case a.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ye(I),i.update();break;case a.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;mt(I),i.update();break;default:o=a.NONE}}function fe(I){i.enabled!==!1&&I.preventDefault()}function _e(I){U.push(I)}function Ie(I){delete ae[I.pointerId];for(let ce=0;ce<U.length;ce++)if(U[ce].pointerId==I.pointerId){U.splice(ce,1);return}}function Me(I){let ce=ae[I.pointerId];ce===void 0&&(ce=new ht,ae[I.pointerId]=ce),ce.set(I.pageX,I.pageY)}function K(I){const ce=I.pointerId===U[0].pointerId?U[1]:U[0];return ae[ce.pointerId]}i.domElement.addEventListener("contextmenu",fe),i.domElement.addEventListener("pointerdown",et),i.domElement.addEventListener("pointercancel",st),i.domElement.addEventListener("wheel",C,{passive:!1}),this.update()}}const Ao={width:window.innerWidth,height:window.innerHeight},Bc=document.createElement("canvas");document.body.appendChild(Bc);const tr=new jb,ra=new Wn(75,Ao.width/Ao.height,.1,1e5);ra.position.set(0,1e3,1e3);const sp=new Qb(ra,Bc);sp.enableDamping=!0;const Po=new rp({canvas:Bc,alpha:!0});Po.setSize(Ao.width,Ao.height);Po.setPixelRatio(Math.min(window.devicePixelRatio,2));let ni=[],zc=[];const Hc={uTime:{value:0},uValue:{value:1},uMax:{value:0},uFixAspect:{value:0},lightPosition:{value:new W(0,0,0)}},ew=new ir({vertexShader:fM,fragmentShader:hM,uniforms:Hc,extensions:{derivatives:!0},side:li}),ap=1,tw=256/ap,nw=7.77*ap,fi={x:14499,y:6457},ui={rows:10,cols:10},iw=r=>new Promise((e,t)=>{const i=new Image;i.crossOrigin="Anonymous",i.onload=function(){const a=document.createElement("canvas");a.width=this.width,a.height=this.height;const o=a.getContext("2d");o.drawImage(this,0,0),e(o)},i.onerror=t,i.src=r}),op=async r=>{const t=(await iw(r)).getImageData(0,0,256,256).data,i=[];for(let a=0;a<256;a++)for(let o=0;o<256;o++){const u=(a*256+o)*4,c=t[u]/255,f=t[u+1]/255,d=t[u+2]/255;i.push(c,f,d)}return new Float32Array(i)},rw=async(r,e)=>{try{const t=await fetch(`https://cyberjapandata.gsi.go.jp/xyz/dem/14/${r}/${e}.txt`);if(!t.ok)throw new Error("Failed to fetch the text file.");const i=await t.text();return new Float32Array(i.split(`
`).slice(0,-1).flatMap(a=>a.split(",")).map(a=>a.includes("e")?0:parseFloat(a/nw)))}catch(t){return console.error("Error fetching the text file:",t),null}},ii=new Dc,vs={lightX:2e3,lightY:2e3,lightZ:2e3};ii.add(Hc.uValue,"value",-1.5,1).listen().name("高さのスケール");ii.add(vs,"lightX",-3e3,3e3).name("光源 X");ii.add(vs,"lightY",-3e3,3e3).name("光源 Y");ii.add(vs,"lightZ",-3e3,3e3).name("光源 Z");const Gc=wM.debounce(()=>{tr.children.forEach(async(r,e)=>{if(r.geometry){const t=r.userData.x+fi.x,i=r.userData.y+fi.y,a=await rw(t,i);r.geometry.setAttribute("pixelH",new Pn(a,1)),r.geometry.attributes.pixelH.needsUpdate=!0;const o=Pc[cp.basetilte].replace("{z}",14).replace("{x}",t).replace("{y}",i),u=await op(o);r.geometry.setAttribute("color",new Pn(u,3)),r.geometry.attributes.color.needsUpdate=!0}})},300),lp=()=>{const r=tw,e=new Co(r,r,255,255);e.rotateX(-Math.PI/2);const t=-(ui.cols-1)*r*.5,i=(ui.rows-1)*r*.5;for(let a=0;a<ui.rows;a++)for(let o=0;o<ui.cols;o++){const u=e.clone(),c=new ci(u,ew);c.position.x=o*r+t,c.position.z=a*r-i,c.userData={x:o,y:a},tr.add(c),ni.push(c)}ni.forEach(a=>{zc.push(a.position.clone())}),Gc()};lp();const cp={basetilte:"写真"},Pc={写真:"https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",OSM:"https://tile.openstreetmap.org/{z}/{x}/{y}.png",地理院淡色:"https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",地理院基本:"https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"};ii.add(cp,"basetilte",Object.keys(Pc)).name("ラスタータイル").onChange(r=>{tr.children.forEach(async e=>{if(e.geometry){const t=Pc[r].replace("{z}",14).replace("{x}",e.userData.x+fi.x).replace("{y}",e.userData.y+fi.y),i=await op(t);e.geometry.setAttribute("color",new Pn(i,3)),e.geometry.attributes.color.needsUpdate=!0}})});ii.add(fi,"x",fi.x-100,fi.x+100,1).name("左上のタイル座標X").onChange(Gc);ii.add(fi,"y",fi.y-100,fi.y+100,1).name("左上のタイル座標Y").onChange(Gc);const up=()=>{for(let r=tr.children.length-1;r>=0;r--){const e=tr.children[r];e instanceof ci&&tr.remove(e)}ni=[],zc=[],lp()};ii.add(ui,"rows",ui.rows-9,ui.rows+10,1).name("タイルの枚数（縦）").onChange(up);ii.add(ui,"cols",ui.cols-9,ui.cols+10,1).name("タイルの枚数（横）").onChange(up);const sw=r=>{for(let e=r.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[r[e],r[t]]=[r[t],r[e]]}},aw=()=>{const r=[];ni.forEach(t=>r.push(t.position.clone())),sw(r);const e=10;for(let t=0;t<ni.length;t++){const i=r[t],a=ni[t];new xo(a.position).to({x:i.x,y:i.y,z:i.z},1e3).easing(Ii.Quadratic.Out).delay(t*e).start();const o=Math.random()<.5?1:-1;new xo(a.rotation).to({y:a.rotation.y+2*Math.PI*o,x:a.rotation.y+2*Math.PI*o},1e3).easing(Ii.Quadratic.Out).delay(t*e).start()}},ow=()=>{for(let r=0;r<ni.length;r++){const e=zc[r],t=10;new xo(ni[r].position).to({x:e.x,y:e.y,z:e.z},1e3).easing(Ii.Quadratic.Out).delay(r*t).start();const i=Math.random()<.5?1:-1;new xo(ni[r].rotation).to({x:ni[r].rotation.x+2*Math.PI*i,y:ni[r].rotation.y+2*Math.PI*i},1500).easing(Ii.Quadratic.Out).delay(r*t).start()}},hp={rearrange(){aw()},reset(){ow()}};ii.add(hp,"rearrange").name("タイルをシャッフル");ii.add(hp,"reset").name("タイルをもとの位置に戻す");const fp=()=>{requestAnimationFrame(fp),mM(),tr.children.length>0&&Hc.lightPosition.value.set(vs.lightX,vs.lightY,vs.lightZ),sp.update(),Po.render(tr,ra)};fp();window.addEventListener("resize",()=>{ra.aspect=window.innerWidth/window.innerHeight,ra.updateProjectionMatrix(),Po.setSize(window.innerWidth,window.innerHeight)},!1);
