(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()})(0,function(){"use strict"
function e(e="unreachable"){return new Error(e)}function t(e,t){if(!e)throw new Error(t||"assertion failure")}const s=Object.keys
function i(e){for(let t=1;t<arguments.length;t++){let i=arguments[t]
if(null===i||"object"!=typeof i)continue
let n=s(i)
for(let t=0;t<n.length;t++){let s=n[t]
e[s]=i[s]}}return e}let n=0
function r(e){return e._guid=++n}function a(){return Object.create(null)}class l{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(e){this.current=e,this.stack.push(e)}pop(){let e=this.stack.pop(),t=this.stack.length
return this.current=0===t?null:this.stack[t-1],void 0===e?null:e}isEmpty(){return 0===this.stack.length}}class o{constructor(e){this.next=null,this.prev=null,this.value=e}}class h{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e.next}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=t.next}insertBefore(e,t=null){return null===t?this.append(e):(t.prev?t.prev.next=e:this._head=e,e.prev=t.prev,e.next=t,t.prev=e,e)}append(e){let t=this._tail
return t?(t.next=e,e.prev=t,e.next=null):this._head=e,this._tail=e}remove(e){return e.prev?e.prev.next=e.next:this._head=e.next,e.next?e.next.prev=e.prev:this._tail=e.prev,e}}class u{constructor(e,t){this._head=e,this._tail=t}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=this.nextNode(t)}head(){return this._head}tail(){return this._tail}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e===this._tail?null:e.next}}const c=Object.freeze([]),p=1
class d{validate(e){return this.value()===e}}d.id=0
const m=[],g=[]
class f{constructor(e,t){this.type=e,this.inner=t}value(){return(0,m[this.type])(this.inner)}validate(e){return(0,g[this.type])(this.inner,e)}}function b(e){let t=m.length
m.push(e=>e.value()),g.push((e,t)=>e.validate(t)),e.id=t}m.push(()=>0),g.push((e,t)=>0===t)
const y=new f(0,null)
m.push(()=>NaN),g.push((e,t)=>NaN===t)
const v=new f(1,null)
m.push(()=>_),g.push((e,t)=>t===_)
const k=new f(2,null)
function w({tag:e}){return e===y}function S(e){return e===y}let _=p
class C extends d{static create(e=_){return new f(this.id,new C(e))}constructor(e=_){super(),this.revision=e}value(){return this.revision}dirty(){this.revision=++_}}function E(e){let t=[]
for(let s=0,i=e.length;s<i;s++){let i=e[s].tag
if(i===v)return v
i!==y&&t.push(i)}return N(t)}function x(e){let t=[],s=e.head()
for(;null!==s;){let i=s.tag
if(i===v)return v
i!==y&&t.push(i),s=e.nextNode(s)}return N(t)}function A(e){let t=[]
for(let s=0,i=e.length;s<i;s++){let i=e[s]
if(i===v)return v
i!==y&&t.push(i)}return N(t)}function N(e){switch(e.length){case 0:return y
case 1:return e[0]
case 2:return T.create(e[0],e[1])
default:return B.create(e)}}b(C)
class O extends d{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let e=this.lastChecked,t=this.lastValue
return e!==_&&(this.lastChecked=_,this.lastValue=t=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class T extends O{static create(e,t){return new f(this.id,new T(e,t))}constructor(e,t){super(),this.first=e,this.second=t}compute(){return Math.max(this.first.value(),this.second.value())}}b(T)
class B extends O{static create(e){return new f(this.id,new B(e))}constructor(e){super(),this.tags=e}compute(){let e=this.tags,t=-1
for(let s=0;s<e.length;s++){let i=e[s].value()
t=Math.max(i,t)}return t}}b(B)
class L extends O{static create(e){return new f(this.id,new L(e))}constructor(e){super(),this.tag=e,this.lastUpdated=p}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(e){e!==this.tag&&(this.tag=e,this.lastUpdated=_,this.invalidate())}}b(L)
class M{constructor(){this.lastRevision=null,this.lastValue=null}value(){let e=this.tag,t=this.lastRevision,s=this.lastValue
return null!==t&&e.validate(t)||(s=this.lastValue=this.compute(),this.lastRevision=e.value()),s}invalidate(){this.lastRevision=null}}class R{constructor(e){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=e.tag,this.reference=e}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let e=this.reference,t=this.lastRevision,s=e.tag
if(s.validate(t))return D
this.lastRevision=s.value()
let i=this.lastValue,n=e.value()
return n===i?D:(this.lastValue=n,n)}initialize(){let e=this.reference,t=this.lastValue=e.value()
return this.lastRevision=e.tag.value(),this.initialized=!0,t}}const D="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
class I{constructor(e){this.inner=e,this.tag=y}value(){return this.inner}}class F extends o{constructor(e,t){super(e.valueReferenceFor(t)),this.retained=!1,this.seen=!1,this.key=t.key,this.iterable=e,this.memo=e.memoReferenceFor(t)}update(e){this.retained=!0,this.iterable.updateValueReference(this.value,e),this.iterable.updateMemoReference(this.memo,e)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class P{constructor(e){this.iterator=null,this.map=a(),this.list=new h,this.tag=e.tag,this.iterable=e}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let e
return e=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,e}has(e){return!!this.map[e]}get(e){return this.map[e]}wasSeen(e){let t=this.map[e]
return void 0!==t&&t.seen}append(e){let t=this.map,s=this.list,i=this.iterable,n=t[e.key]=new F(i,e)
return s.append(n),n}insertBefore(e,t){let s=this.map,i=this.list,n=this.iterable,r=s[e.key]=new F(n,e)
return r.retained=!0,i.insertBefore(r,t),r}move(e,t){let s=this.list
e.retained=!0,s.remove(e),s.insertBefore(e,t)}remove(e){this.list.remove(e),delete this.map[e.key]}nextNode(e){return this.list.nextNode(e)}head(){return this.list.head()}}class z{constructor(e){this.iterator=null
let t=new P(e)
this.artifacts=t}next(){let e=this.artifacts,t=(this.iterator=this.iterator||e.iterate()).next()
return null===t?null:e.append(t)}}var j;(function(e){e[e.Append=0]="Append",e[e.Prune=1]="Prune",e[e.Done=2]="Done"})(j||(j={}))
class H{constructor({target:e,artifacts:t}){this.target=e,this.artifacts=t,this.iterator=t.iterate(),this.current=t.head()}sync(){let e=j.Append
for(;;)switch(e){case j.Append:e=this.nextAppend()
break
case j.Prune:e=this.nextPrune()
break
case j.Done:return void this.nextDone()}}advanceToKey(e){let t=this.current,s=this.artifacts,i=t
for(;null!==i&&i.key!==e;)i.seen=!0,i=s.nextNode(i)
null!==i&&(this.current=s.nextNode(i))}nextAppend(){let e=this.iterator,t=this.current,s=this.artifacts,i=e.next()
if(null===i)return this.startPrune()
let n=i.key
return null!==t&&t.key===n?this.nextRetain(i):s.has(n)?this.nextMove(i):this.nextInsert(i),j.Append}nextRetain(e){let t=this.artifacts,s=this.current;(s=s).update(e),this.current=t.nextNode(s),this.target.retain(e.key,s.value,s.memo)}nextMove(e){let t=this.current,s=this.artifacts,i=this.target,n=e.key,r=s.get(e.key)
r.update(e),s.wasSeen(e.key)?(s.move(r,t),i.move(r.key,r.value,r.memo,t?t.key:null)):this.advanceToKey(n)}nextInsert(e){let t=this.artifacts,s=this.target,i=this.current,n=t.insertBefore(e,i)
s.insert(n.key,n.value,n.memo,i?i.key:null)}startPrune(){return this.current=this.artifacts.head(),j.Prune}nextPrune(){let e=this.artifacts,t=this.target,s=this.current
if(null===s)return j.Done
let i=s
return this.current=e.nextNode(i),i.shouldRemove()?(e.remove(i),t.delete(i.key)):i.reset(),j.Prune}nextDone(){this.target.done()}}class V{constructor(){this.tags=new Set}add(e){this.tags.add(e)}combine(){let e=this.tags
return 0===e.size?y:A([...e])}}let U=null
function $(e,t){U&&U.add(W(e).updatableTagFor(t))}class G{constructor(e){this.tags=a(),this.computedPropertyTags=a(),this.trackedProperties=e?Object.create(e.trackedProperties):a(),this.trackedComputedProperties=e?Object.create(e.trackedComputedProperties):a()}tagFor(e){let t=this.tags[e]
return t||(this.trackedComputedProperties[e]?this.tags[e]=this.updatableTagFor(e):this.tags[e]=C.create())}updatableTagFor(e){let t
return this.trackedComputedProperties[e]?(t=this.computedPropertyTags[e])||(this.computedPropertyTags[e]=L.create(y)):(t=this.tags[e])||(this.tags[e]=L.create(y))}}const Y=new WeakMap
function W(e){let t=Y.get(e)
if(t)return t
let s=function(e){let t=null,s=e
for(;!t;){if(!(s=q(s)))return t
t=Y.get(s)}return t}(e)
return t=new G(s),Y.set(e,t),t}const q=Object.getPrototypeOf
const K=C.create()
let J=function(){}
class X extends Error{constructor(e,t,s){super(s),this.target=e,this.key=t}static for(e,t){return new X(e,t,`The property '${t}' on ${e} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}function Q(e,t,s=function(e,t){throw X.for(e,t)}){if("object"==typeof e&&e){return W(e).tagFor(t)}return y}class Z{constructor(e){this.debugName=null,this.__args__=null,Object.assign(this,e)}get element(){let e=this.bounds
return t(e&&e.firstNode===e.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),e.firstNode}get args(){return $(this,"args"),this.__args__}set args(e){this.__args__=e,W(this).updatableTagFor("args").inner.update(k)}static create(e){return new this(e)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const ee={attributeHook:!0,createArgs:!0,createCaller:!1,createInstance:!0,dynamicLayout:!1,dynamicScope:!1,dynamicTag:!0,elementHook:!0,prepareArgs:!1,updateHook:!0}
class te{constructor(e,t,s,i){this.name=e,this.manager=t,this.ComponentClass=s,this.handle=i,this.state={name:e,capabilities:ee,ComponentClass:s,handle:i}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class se{constructor(e){this._bounds=e}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}const ie=new class{constructor(){this.evaluateOpcode=function(e){let t=new Array(e)
for(let s=0;s<e;s++)t[s]=null
return t}(98).slice()}add(e,t,s="syscall"){this.evaluateOpcode[e]={syscall:"syscall"===s,evaluate:t}}debugBefore(e,t,s){return{sp:void 0,state:void 0}}debugAfter(e,t,s,i){i.sp,i.state}evaluate(e,t,s){let i=this.evaluateOpcode[s]
i.syscall?i.evaluate(e,t):i.evaluate(e.inner,t)}}
class ne{constructor(){r(this)}}class re extends ne{constructor(){super(...arguments),this.next=null,this.prev=null}}var ae;(function(e){e[e.pc=0]="pc",e[e.ra=1]="ra",e[e.fp=2]="fp",e[e.sp=3]="sp",e[e.s0=4]="s0",e[e.s1=5]="s1",e[e.t0=6]="t0",e[e.t1=7]="t1",e[e.v0=8]="v0"})(ae||(ae={}))
class le extends I{constructor(e){super(e)}static create(e){return void 0===e?ue:null===e?ce:!0===e?pe:!1===e?de:"number"==typeof e?new he(e):new oe(e)}get(e){return ue}}class oe extends le{constructor(){super(...arguments),this.lengthReference=null}get(e){if("length"===e){let e=this.lengthReference
return null===e&&(e=this.lengthReference=new he(this.inner.length)),e}return super.get(e)}}class he extends le{constructor(e){super(e)}}const ue=new he(void 0),ce=new he(null),pe=new he(!0),de=new he(!1)
class me{constructor(e){this.inner=e,this.tag=e.tag}value(){return this.toBool(this.inner.value())}toBool(e){return!!e}}class ge extends M{constructor(e){super(),this.parts=e,this.tag=E(e)}compute(){let e=new Array
for(let t=0;t<this.parts.length;t++){let s=this.parts[t].value()
null!=s&&(e[t]=fe(s))}return e.length>0?e.join(""):null}}function fe(e){return"function"!=typeof e.toString?"":String(e)}ie.add(1,(e,{op1:t})=>{let s=e.stack,i=e.constants.resolveHandle(t)(e,s.pop())
e.loadValue(ae.v0,i)}),ie.add(6,(e,{op1:t})=>{let s=e.referenceForSymbol(t)
e.stack.push(s)}),ie.add(4,(e,{op1:t})=>{let s=e.stack.pop()
e.scope().bindSymbol(t,s)}),ie.add(5,(e,{op1:t})=>{let s=e.stack.pop(),i=e.stack.pop(),n=e.stack.pop(),r=n?[s,i,n]:null
e.scope().bindBlock(t,r)}),ie.add(96,(e,{op1:t})=>{let s=e.constants.getString(t),i=e.scope().getPartialMap()[s]
void 0===i&&(i=e.getSelf().get(s)),e.stack.push(i)}),ie.add(20,(e,{op1:t,op2:s})=>{e.pushRootScope(t,!!s)}),ie.add(7,(e,{op1:t})=>{let s=e.constants.getString(t),i=e.stack.pop()
e.stack.push(i.get(s))}),ie.add(8,(e,{op1:t})=>{let s=e.stack,i=e.scope().getBlock(t)
i?(s.push(i[2]),s.push(i[1]),s.push(i[0])):(s.push(null),s.push(null),s.push(null))}),ie.add(9,(e,{op1:t})=>{let s=!!e.scope().getBlock(t)
e.stack.push(s?pe:de)}),ie.add(10,e=>{e.stack.pop(),e.stack.pop()
let t=e.stack.pop(),s=t&&t.parameters.length
e.stack.push(s?pe:de)}),ie.add(11,(e,{op1:t})=>{let s=new Array(t)
for(let i=t;i>0;i--){s[i-1]=e.stack.pop()}e.stack.push(new ge(s))})
const be="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function ye(e){return!(!e||!e[be])}class ve{constructor(e,t){this.inner=e,this.args=t,this[be]=!0}unwrap(e){e.realloc(this.offset)
let t=this
for(;;){var s=t
let i=s.args,n=s.inner
if(i&&(e.positional.prepend(i.positional),e.named.merge(i.named)),!ye(n))return n
t=n}}get offset(){let e=this.inner,t=this.args,s=t?t.positional.length:0
return ye(e)?s+e.offset:s}}function ke(e){return we(e)?"":String(e)}function we(e){return null==e||"function"!=typeof e.toString}function Se(e){return"object"==typeof e&&null!==e&&"function"==typeof e.toHTML}function _e(e){return"object"==typeof e&&null!==e&&"number"==typeof e.nodeType}function Ce(e){return"string"==typeof e}class Ee extends re{constructor(e,t,s){super(),this.node=e,this.reference=t,this.lastValue=s,this.type="dynamic-text",this.tag=t.tag,this.lastRevision=this.tag.value()}evaluate(){let e=this.reference,t=this.tag
t.validate(this.lastRevision)||(this.lastRevision=t.value(),this.update(e.value()))}update(e){let t,s=this.lastValue
if(e!==s&&(t=we(e)?"":Ce(e)?e:String(e))!==s){this.node.nodeValue=this.lastValue=t}}}class xe extends me{static create(e){return new xe(e)}toBool(e){return ye(e)}}class Ae{constructor(e){this.inner=e,this.tag=e.tag}value(){let e=this.inner.value()
return function(e){return Ce(e)||we(e)||"boolean"==typeof e||"number"==typeof e}(e)?1:(t=e)&&t[be]?0:Se(e)?3:function(e){return _e(e)&&11===e.nodeType}(e)?4:_e(e)?5:1
var t}}ie.add(28,e=>{let t=e.stack.pop().value(),s=we(t)?"":String(t)
e.elements().appendDynamicHTML(s)}),ie.add(29,e=>{let t=e.stack.pop().value().toHTML(),s=we(t)?"":t
e.elements().appendDynamicHTML(s)}),ie.add(32,e=>{let t=e.stack.pop(),s=t.value(),i=we(s)?"":String(s),n=e.elements().appendDynamicText(i)
w(t)||e.updateWith(new Ee(n,t,i))}),ie.add(30,e=>{let t=e.stack.pop().value()
e.elements().appendDynamicFragment(t)}),ie.add(31,e=>{let t=e.stack.pop().value()
e.elements().appendDynamicNode(t)}),ie.add(22,e=>e.pushChildScope()),ie.add(23,e=>e.popScope()),ie.add(44,e=>e.pushDynamicScope()),ie.add(45,e=>e.popDynamicScope()),ie.add(12,(e,{op1:t})=>{e.stack.push(e.constants.getOther(t))}),ie.add(13,(e,{op1:t})=>{let s=e.stack,i=t>>3
switch(7&t){case 0:s.push(i)
break
case 1:s.push(e.constants.getNumber(i))
break
case 2:s.push(e.constants.getString(i))
break
case 3:s.pushEncodedImmediate(t)
break
case 4:case 5:s.push(e.constants.getNumber(i))}}),ie.add(14,e=>{let t=e.stack
t.push(le.create(t.pop()))}),ie.add(15,e=>{let t=e.stack
t.push(t.peek().value())}),ie.add(16,(e,{op1:t,op2:s})=>{let i=e.fetchValue(t)-s
e.stack.dup(i)}),ie.add(17,(e,{op1:t})=>{e.stack.pop(t)}),ie.add(18,(e,{op1:t})=>{e.load(t)}),ie.add(19,(e,{op1:t})=>{e.fetch(t)}),ie.add(43,(e,{op1:t})=>{let s=e.constants.getArray(t)
e.bindDynamicScope(s)}),ie.add(61,(e,{op1:t})=>{e.enter(t)}),ie.add(62,e=>{e.exit()}),ie.add(48,(e,{op1:t})=>{e.stack.push(e.constants.getSerializable(t))}),ie.add(47,e=>{e.stack.push(e.scope())}),ie.add(46,e=>{let t=e.stack,s=t.pop()
s?t.pushSmi(s.compile()):t.pushNull()}),ie.add(51,e=>{let t=e.stack,s=t.pop(),i=t.pop(),n=t.pop(),r=t.pop()
if(null===n)return e.pushFrame(),void e.pushScope(i)
let a=i
{let e=n.parameters,t=e.length
if(t>0){a=a.child()
for(let s=0;s<t;s++)a.bindSymbol(e[s],r.at(s))}}e.pushFrame(),e.pushScope(a),e.call(s)}),ie.add(53,(e,{op1:t})=>{let s=e.stack.pop()
if(w(s))s.value()&&e.goto(t)
else{let i=new R(s)
i.peek()&&e.goto(t),e.updateWith(new Ne(i))}}),ie.add(54,(e,{op1:t})=>{let s=e.stack.pop()
if(w(s))s.value()||e.goto(t)
else{let i=new R(s)
i.peek()||e.goto(t),e.updateWith(new Ne(i))}}),ie.add(55,(e,{op1:t,op2:s})=>{e.stack.peek()===s&&e.goto(t)}),ie.add(56,e=>{let t=e.stack.peek()
w(t)||e.updateWith(Ne.initialize(new R(t)))}),ie.add(63,e=>{let t=e.env,s=e.stack
s.push(t.toConditionalReference(s.pop()))})
class Ne extends re{constructor(e){super(),this.type="assert",this.tag=e.tag,this.cache=e}static initialize(e){let t=new Ne(e)
return e.peek(),t}evaluate(e){let t=this.cache
t.revalidate()!==D&&e.throw()}}class Oe extends re{constructor(e,t){super(),this.target=t,this.type="jump-if-not-modified",this.tag=e,this.lastRevision=e.value()}evaluate(e){let t=this.tag,s=this.target,i=this.lastRevision
!e.alwaysRevalidate&&t.validate(i)&&e.goto(s)}didModify(){this.lastRevision=this.tag.value()}}class Te extends re{constructor(e){super(),this.target=e,this.type="did-modify",this.tag=y}evaluate(){this.target.didModify()}}class Be{constructor(e){this.tag=y,this.type="label",this.label=null,this.prev=null,this.next=null,r(this),this.label=e}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}ie.add(26,(e,{op1:t})=>{e.elements().appendText(e.constants.getString(t))}),ie.add(27,(e,{op1:t})=>{e.elements().appendComment(e.constants.getString(t))}),ie.add(33,(e,{op1:t})=>{e.elements().openElement(e.constants.getString(t))}),ie.add(34,e=>{let t=e.stack.pop().value()
e.elements().openElement(t)}),ie.add(41,e=>{let t,s,i=e.stack.pop(),n=e.stack.pop(),r=e.stack.pop().value()
if(w(i))t=i.value()
else{let s=new R(i)
t=s.peek(),e.updateWith(new Ne(s))}if(w(n))s=n.value()
else{let t=new R(n)
s=t.peek(),e.updateWith(new Ne(t))}e.elements().pushRemoteElement(t,r,s)}),ie.add(42,e=>{e.elements().popRemoteElement()}),ie.add(38,e=>{let t=e.fetchValue(ae.t0)
t&&(t.flush(e),e.loadValue(ae.t0,null)),e.elements().flushElement()}),ie.add(39,e=>{e.elements().closeElement()}),ie.add(40,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),i=e.stack.pop()
var n=e.elements()
let r=n.constructing,a=n.updateOperations,l=e.dynamicScope(),o=s.create(r,i,l,a)
e.env.scheduleInstallModifier(o,s)
let h=s.getDestructor(o)
h&&e.newDestroyable(h)
let u=s.getTag(o)
S(u)||e.updateWith(new Le(u,s,o))})
class Le extends re{constructor(e,t,s){super(),this.tag=e,this.manager=t,this.modifier=s,this.type="update-modifier",this.lastUpdated=e.value()}evaluate(e){let t=this.manager,s=this.modifier,i=this.tag,n=this.lastUpdated
i.validate(n)||(e.env.scheduleUpdateModifier(s,t),this.lastUpdated=i.value())}}ie.add(35,(e,{op1:t,op2:s,op3:i})=>{let n=e.constants.getString(t),r=e.constants.getString(s),a=i?e.constants.getString(i):null
e.elements().setStaticAttribute(n,r,a)}),ie.add(36,(e,{op1:t,op2:s,op3:i})=>{let n=e.constants.getString(t),r=e.stack.pop(),a=r.value(),l=i?e.constants.getString(i):null,o=e.elements().setDynamicAttribute(n,a,!!s,l)
w(r)||e.updateWith(new Me(r,o))})
class Me extends re{constructor(e,t){super(),this.reference=e,this.attribute=t,this.type="patch-element",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(e){let t=this.attribute,s=this.reference,i=this.tag
i.validate(this.lastRevision)||(this.lastRevision=i.value(),t.update(s.value(),e.env))}}function Re(e,t,s){return e.lookupComponentDefinition(t,s)}class De{constructor(e,t,s,i){this.inner=e,this.resolver=t,this.meta=s,this.args=i,this.tag=e.tag,this.lastValue=null,this.lastDefinition=null}value(){let e=this.inner,t=this.lastValue,s=e.value()
if(s===t)return this.lastDefinition
let i=null
if(ye(s))i=s
else if("string"==typeof s&&s){i=Re(this.resolver,s,this.meta)}return i=this.curry(i),this.lastValue=s,this.lastDefinition=i,i}get(){return ue}curry(e){let t=this.args
return!t&&ye(e)?e:e?new ve(e,t):null}}class Ie{constructor(e){this.list=e,this.tag=E(e),this.list=e}value(){let e=[],t=this.list
for(let s=0;s<t.length;s++){let i=ke(t[s].value())
i&&e.push(i)}return 0===e.length?null:e.join(" ")}}function Fe(e){return 0|(e.dynamicLayout?1:0)|(e.dynamicTag?2:0)|(e.prepareArgs?4:0)|(e.createArgs?8:0)|(e.attributeHook?16:0)|(e.elementHook?32:0)|(e.dynamicScope?64:0)|(e.createCaller?128:0)|(e.updateHook?256:0)|(e.createInstance?512:0)}function Pe(e,t){return!!(e&t)}ie.add(69,e=>{let t=e.stack,s=t.pop()
t.push(xe.create(s))}),ie.add(70,e=>{let t=e.stack,s=t.peek()
t.push(new Ae(s))}),ie.add(71,(e,{op1:t})=>{let s=e.stack,i=s.pop(),n=s.pop(),r=e.constants.getSerializable(t),a=e.constants.resolver
e.loadValue(ae.v0,new De(i,a,r,n))}),ie.add(72,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),i=s.manager,n=Fe(i.getCapabilities(s.state)),r={definition:s,manager:i,capabilities:n,state:null,handle:null,table:null,lookup:null}
e.stack.push(r)}),ie.add(75,(t,{op1:s})=>{let i,n=t.stack,r=n.pop().value(),a=t.constants.getSerializable(s)
if(t.loadValue(ae.t1,null),"string"==typeof r){i=Re(t.constants.resolver,r,a)}else{if(!ye(r))throw e()
i=r}n.push(i)}),ie.add(73,e=>{let t,s,i=e.stack,n=i.pop()
ye(n)?s=t=null:t=Fe((s=n.manager).getCapabilities(n.state)),i.push({definition:n,capabilities:t,manager:s,state:null,handle:null,table:null})}),ie.add(74,(t,{op1:s})=>{let i,n=t.stack,r=n.pop().value()
if(!ye(r))throw e()
i=r,n.push(i)}),ie.add(76,(e,{op1:t,op2:s})=>{let i=e.stack,n=e.constants.getStringArray(t),r=s>>4,a=8&s,l=[]
4&s&&l.push("main"),2&s&&l.push("else"),1&s&&l.push("attrs"),e.args.setup(i,n,l,r,!!a),i.push(e.args)}),ie.add(77,e=>{let t=e.stack
t.push(e.args.empty(t))}),ie.add(80,e=>{let t=e.stack,s=t.pop().capture()
t.push(s)}),ie.add(79,(e,{op1:t})=>{let s=e.stack,i=e.fetchValue(t),n=s.pop(),r=i.definition
ye(r)&&(r=function(e,t,s){let i=e.definition=t.unwrap(s),n=i.manager,r=i.state
return e.manager=n,e.capabilities=Fe(n.getCapabilities(r)),i}(i,r,n))
var a=r
let l=a.manager,o=a.state
if(!0!==Pe(i.capabilities,4))return void s.push(n)
let h=n.blocks.values,u=n.blocks.names,c=l.prepareArgs(o,n)
if(c){n.clear()
for(let n=0;n<h.length;n++)s.push(h[n])
let e=c.positional,t=c.named,i=e.length
for(let n=0;n<i;n++)s.push(e[n])
let r=Object.keys(t)
for(let n=0;n<r.length;n++)s.push(t[r[n]])
n.setup(s,r,u,i,!0)}s.push(n)}),ie.add(81,(e,{op1:t,op2:s})=>{let i=e.fetchValue(s),n=i.definition,r=i.manager,a=i.capabilities=Fe(r.getCapabilities(n.state)),l=null
Pe(a,64)&&(l=e.dynamicScope())
let o=1&t,h=null
Pe(a,8)&&(h=e.stack.peek())
let u=null
Pe(a,128)&&(u=e.getSelf())
let c=r.create(e.env,n.state,h,l,u,!!o)
i.state=c
let p=r.getTag(c)
Pe(a,256)&&!S(p)&&e.updateWith(new He(p,c,r,l))}),ie.add(82,(e,{op1:t})=>{var s=e.fetchValue(t)
let i=s.manager,n=s.state,r=i.getDestructor(n)
r&&e.newDestroyable(r)}),ie.add(91,e=>{e.beginCacheGroup(),e.elements().pushSimpleBlock()}),ie.add(83,e=>{e.loadValue(ae.t0,new ze)}),ie.add(37,(e,{op1:t,op2:s,op3:i})=>{let n=e.constants.getString(t),r=e.stack.pop(),a=i?e.constants.getString(i):null
e.fetchValue(ae.t0).setAttribute(n,r,!!s,a)})
class ze{constructor(){this.attributes=a(),this.classes=[]}setAttribute(e,t,s,i){let n={value:t,namespace:i,trusting:s}
"class"===e&&this.classes.push(t),this.attributes[e]=n}flush(e){for(let t in this.attributes){let s=this.attributes[t],i=s.value,n=s.namespace,r=s.trusting
if("class"===t&&(i=new Ie(this.classes)),"type"===t)continue
let a=e.elements().setDynamicAttribute(t,i.value(),r,n)
w(i)||e.updateWith(new Me(i,a))}if("type"in this.attributes){let t=this.attributes.type,s=t.value,i=t.namespace,n=t.trusting,r=e.elements().setDynamicAttribute("type",s.value(),n,i)
w(s)||e.updateWith(new Me(s,r))}}}function je(e,t,s,i,n){let r=s.table.symbols.indexOf(e),a=i.get(t);-1!==r&&n.scope().bindBlock(r+1,a),s.lookup&&(s.lookup[e]=a)}ie.add(93,(e,{op1:t})=>{var s=e.fetchValue(t)
let i=s.definition,n=s.state,r=i.manager,a=e.fetchValue(ae.t0)
r.didCreateElement(n,e.elements().expectConstructing("DidCreateElementOpcode#evaluate"),a)}),ie.add(84,(e,{op1:t})=>{var s=e.fetchValue(t)
let i=s.definition,n=s.state,r=i.manager
e.stack.push(r.getSelf(n))}),ie.add(85,(e,{op1:t})=>{var s=e.fetchValue(t)
let i=s.definition,n=s.state,r=i.manager
e.stack.push(r.getTagName(n))}),ie.add(86,(t,{op1:s})=>{let i,n=t.fetchValue(s),r=n.manager,a=n.definition,l=t.constants.resolver,o=t.stack,h=n.state,u=n.capabilities,c=a.state
if(function(e,t){return!1===Pe(e,1)}(u))i=r.getLayout(c,l)
else{if(!function(e,t){return!0===Pe(e,1)}(u))throw e()
i=r.getDynamicLayout(h,l)}o.push(i.symbolTable),o.push(i.handle)}),ie.add(68,(e,{op1:t})=>{let s=e.stack.pop(),i=e.stack.pop(),n=s.manager,r=Fe(n.getCapabilities(s.state)),a={definition:s,manager:n,capabilities:r,state:null,handle:i.handle,table:i.symbolTable,lookup:null}
e.loadValue(t,a)}),ie.add(89,(e,{op1:t})=>{let s=e.stack,i=s.pop(),n=s.pop(),r=e.fetchValue(t)
r.handle=i,r.table=n}),ie.add(21,(e,{op1:t})=>{let s=e.fetchValue(t).table.symbols
e.pushRootScope(s.length+1,!0)}),ie.add(87,(e,{op1:t})=>{let s=e.fetchValue(t)
if(s.table.hasEval){let t=s.lookup=a()
e.scope().bindEvalScope(t)}}),ie.add(2,(e,{op1:t})=>{let s=e.fetchValue(t),i=e.scope(),n=e.stack.peek(),r=n.named.atNames
for(let a=r.length-1;a>=0;a--){let e=r[a],t=s.table.symbols.indexOf(r[a]),l=n.named.get(e,!1);-1!==t&&i.bindSymbol(t+1,l),s.lookup&&(s.lookup[e]=l)}}),ie.add(3,(e,{op1:t})=>{let s=e.fetchValue(t)
let i=e.stack.peek().blocks
je("&attrs","attrs",s,i,e),je("&inverse","else",s,i,e),je("&default","main",s,i,e)}),ie.add(90,(e,{op1:t})=>{let s=e.fetchValue(t)
e.call(s.handle)}),ie.add(94,(e,{op1:t})=>{var s=e.fetchValue(t)
let i=s.manager,n=s.state,r=e.elements().popBlock()
i.didRenderLayout(n,r),e.env.didCreate(n,i),e.updateWith(new Ve(i,n,r))}),ie.add(92,e=>{e.commitCacheGroup()})
class He extends re{constructor(e,t,s,i){super(),this.tag=e,this.component=t,this.manager=s,this.dynamicScope=i,this.type="update-component"}evaluate(e){let t=this.component,s=this.manager,i=this.dynamicScope
s.update(t,i)}}class Ve extends re{constructor(e,t,s){super(),this.manager=e,this.component=t,this.bounds=s,this.type="did-update-layout",this.tag=y}evaluate(e){let t=this.manager,s=this.component,i=this.bounds
t.didUpdateLayout(s,i),e.env.didUpdate(s,t)}}let Ue=function(e,t){console.info("Use `context`, and `get(<path>)` to debug this template."),t("this")}
class $e{constructor(e,t,s){this.scope=e,this.locals=a()
for(let i=0;i<s.length;i++){let n=s[i],r=t[n-1],a=e.getSymbol(n)
this.locals[r]=a}}get(e){let t=this.scope,s=this.locals,i=e.split(".")
var n=e.split(".")
let r,a=n[0],l=n.slice(1),o=t.getEvalScope()
return"this"===a?r=t.getSelf():s[a]?r=s[a]:0===a.indexOf("@")&&o[a]?r=o[a]:(r=this.scope.getSelf(),l=i),l.reduce((e,t)=>e.get(t),r)}}ie.add(97,(e,{op1:t,op2:s})=>{let i=e.constants.getStringArray(t),n=e.constants.getArray(s),r=new $e(e.scope(),i,n)
Ue(e.getSelf().value(),e=>r.get(e).value())}),ie.add(95,(e,{op1:t,op2:s,op3:i})=>{let n=e.constants,r=e.constants.resolver,a=e.stack.pop().value(),l=n.getSerializable(t),o=n.getStringArray(s),h=n.getArray(i),u=r.lookupPartial(a,l)
var c=r.resolve(u).getPartial()
let p=c.symbolTable,d=c.handle
{let t=p.symbols,s=e.scope(),i=e.pushRootScope(t.length,!1),n=s.getEvalScope()
i.bindCallerScope(s.getCallerScope()),i.bindEvalScope(n),i.bindSelf(s.getSelf())
let r=Object.create(s.getPartialMap())
for(let e=0;e<h.length;e++){let t=h[e],i=o[t-1],n=s.getSymbol(t)
r[i]=n}if(n)for(let e=0;e<t.length;e++){let s=e+1,r=n[t[e]]
void 0!==r&&i.bind(s,r)}i.bindPartialMap(r),e.pushFrame(),e.call(d)}})
class Ge{constructor(e){this.tag=e.tag,this.artifacts=e}value(){return!this.artifacts.isEmpty()}}ie.add(66,e=>{let t=e.stack,s=t.pop(),i=t.pop(),n=e.env.iterableFor(s,i.value()),r=new z(n)
t.push(r),t.push(new Ge(r.artifacts))}),ie.add(64,(e,{op1:t})=>{e.enterList(t)}),ie.add(65,e=>{e.exitList()}),ie.add(67,(e,{op1:t})=>{let s=e.stack.peek().next()
if(s){let t=e.iterate(s.memo,s.value)
e.enterItem(s.key,t)}else e.goto(t)})
class Ye{constructor(e,t){this.element=e,this.nextSibling=t}}class We{constructor(e,t,s){this.parentNode=e,this.first=t,this.last=s}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class qe{constructor(e,t){this.parentNode=e,this.node=t}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}function Ke(e,t){return new qe(e,t)}function Je(e,t){let s=e.parentElement(),i=e.firstNode(),n=e.lastNode(),r=i
for(;r;){let e=r.nextSibling
if(s.insertBefore(r,t),r===n)return e
r=e}return null}function Xe(e){let t=e.parentElement(),s=e.firstNode(),i=e.lastNode(),n=s
for(;n;){let e=n.nextSibling
if(t.removeChild(n),n===i)return e
n=e}return null}const Qe="http://www.w3.org/2000/svg"
function Ze(e,t,s){if(!e)return t
if(!function(e,t){let s=e.createElementNS(t,"svg")
try{s.insertAdjacentHTML("beforeend","<circle></circle>")}catch(i){}finally{return 1!==s.childNodes.length||s.firstChild.namespaceURI!==Qe}}(e,s))return t
let i=e.createElement("div")
return class extends t{insertHTMLBefore(e,t,n){return null===n||""===n?super.insertHTMLBefore(e,t,n):e.namespaceURI!==s?super.insertHTMLBefore(e,t,n):function(e,t,s,i){let n="<svg>"+s+"</svg>"
t.innerHTML=n
var r=function(e,t,s){let i=e.firstChild,n=null,r=i
for(;r;)n=r,r=r.nextSibling,t.insertBefore(n,s)
return[i,n]}(t.firstChild,e,i)
let a=r[0],l=r[1]
return new We(e,a,l)}(e,i,n,t)}}}function et(e,t){return e&&function(e){let t=e.createElement("div")
if(t.innerHTML="first",t.insertAdjacentHTML("beforeend","second"),2===t.childNodes.length)return!1
return!0}(e)?class extends t{constructor(e){super(e),this.uselessComment=e.createComment("")}insertHTMLBefore(e,t,s){if(null===s)return super.insertHTMLBefore(e,t,s)
let i=!1,n=t?t.previousSibling:e.lastChild
n&&n instanceof Text&&(i=!0,e.insertBefore(this.uselessComment,t))
let r=super.insertHTMLBefore(e,t,s)
return i&&e.removeChild(this.uselessComment),r}}:t}const tt="http://www.w3.org/2000/svg",st={foreignObject:1,desc:1,title:1},it=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(e=>it[e]=1)
let nt="undefined"==typeof document?null:document
class rt{constructor(e){this.document=e,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(e,t){let s,i
if(t?(s=t.namespaceURI===tt||"svg"===e,i=st[t.tagName]):(s="svg"===e,i=!1),s&&!i){if(it[e])throw new Error(`Cannot create a ${e} inside an SVG context`)
return this.document.createElementNS(tt,e)}return this.document.createElement(e)}insertBefore(e,t,s){e.insertBefore(t,s)}insertHTMLBefore(e,t,s){return function(e,t,s,i){let n,r=t,a=s,l=a?a.previousSibling:r.lastChild
if(null===i||""===i)return new We(r,null,null)
null===a?(r.insertAdjacentHTML("beforeend",i),n=r.lastChild):a instanceof HTMLElement?(a.insertAdjacentHTML("beforebegin",i),n=a.previousSibling):(r.insertBefore(e,a),e.insertAdjacentHTML("beforebegin",i),n=e.previousSibling,r.removeChild(e))
let o=l?l.nextSibling:r.firstChild
return new We(r,o,n)}(this.uselessElement,e,t,s)}createTextNode(e){return this.document.createTextNode(e)}createComment(e){return this.document.createComment(e)}}var at;(function(e){class t extends rt{createElementNS(e,t){return this.document.createElementNS(e,t)}setAttribute(e,t,s,i=null){i?e.setAttributeNS(i,t,s):e.setAttribute(t,s)}}e.TreeConstruction=t
let s=t
s=et(nt,s),s=Ze(nt,s,tt),e.DOMTreeConstruction=s})(at||(at={}))
let lt=class extends rt{constructor(e){super(e),this.document=e,this.namespace=null}setAttribute(e,t,s){e.setAttribute(t,s)}removeAttribute(e,t){e.removeAttribute(t)}insertAfter(e,t,s){this.insertBefore(e,t,s.nextSibling)}}
lt=et(nt,lt)
var ot=lt=Ze(nt,lt,tt)
const ht=at.DOMTreeConstruction,ut=["javascript:","vbscript:"],ct=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],pt=["EMBED"],dt=["href","src","background","action"],mt=["src"]
function gt(e,t){return-1!==e.indexOf(t)}function ft(e,t){return(null===e||gt(ct,e))&&gt(dt,t)}function bt(e,t){return null!==e&&(gt(pt,e)&&gt(mt,t))}function yt(e,t){return ft(e,t)||bt(e,t)}function vt(e,t,s,i){let n=null
if(null==i)return i
if(Se(i))return i.toHTML()
n=t?t.tagName.toUpperCase():null
let r=ke(i)
if(ft(n,s)){let t=e.protocolForURL(r)
if(gt(ut,t))return`unsafe:${r}`}return bt(n,s)?`unsafe:${r}`:r}function kt(e,t){let s,i
if(t in e)i=t,s="prop"
else{let n=t.toLowerCase()
n in e?(s="prop",i=n):(s="attr",i=t)}return"prop"!==s||"style"!==i.toLowerCase()&&!function(e,t){let s=wt[e.toUpperCase()]
return s&&s[t.toLowerCase()]||!1}(e.tagName,i)||(s="attr"),{normalized:i,type:s}}const wt={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0},BUTTON:{form:!0}}
function St(e,t,s){let i=e.tagName,n={element:e,name:t,namespace:s}
if(e.namespaceURI===tt)return _t(i,t,n)
var r=kt(e,t)
let a=r.type,l=r.normalized
return"attr"===a?_t(i,l,n):function(e,t,s){if(yt(e,t))return new At(t,s)
if(function(e,t){return("INPUT"===e||"TEXTAREA"===e)&&"value"===t}(e,t))return new Ot(t,s)
if(function(e,t){return"OPTION"===e&&"selected"===t}(e,t))return new Tt(t,s)
return new xt(t,s)}(i,l,n)}function _t(e,t,s){return yt(e,t)?new Nt(s):new Et(s)}class Ct{constructor(e){this.attribute=e}}class Et extends Ct{set(e,t,s){let i=Bt(t)
if(null!==i){var n=this.attribute
let t=n.name,s=n.namespace
e.__setAttribute(t,i,s)}}update(e,t){let s=Bt(e)
var i=this.attribute
let n=i.element,r=i.name
null===s?n.removeAttribute(r):n.setAttribute(r,s)}}class xt extends Ct{constructor(e,t){super(t),this.normalizedName=e}set(e,t,s){null!=t&&(this.value=t,e.__setProperty(this.normalizedName,t))}update(e,t){let s=this.attribute.element
this.value!==e&&(s[this.normalizedName]=this.value=e,null==e&&this.removeAttribute())}removeAttribute(){var e=this.attribute
let t=e.element,s=e.namespace
s?t.removeAttributeNS(s,this.normalizedName):t.removeAttribute(this.normalizedName)}}class At extends xt{set(e,t,s){var i=this.attribute
let n=vt(s,i.element,i.name,t)
super.set(e,n,s)}update(e,t){var s=this.attribute
let i=vt(t,s.element,s.name,e)
super.update(i,t)}}class Nt extends Et{set(e,t,s){var i=this.attribute
let n=vt(s,i.element,i.name,t)
super.set(e,n,s)}update(e,t){var s=this.attribute
let i=vt(t,s.element,s.name,e)
super.update(i,t)}}class Ot extends xt{set(e,t){e.__setProperty("value",ke(t))}update(e){let t=this.attribute.element,s=t.value,i=ke(e)
s!==i&&(t.value=i)}}class Tt extends xt{set(e,t){null!=t&&!1!==t&&e.__setProperty("selected",!0)}update(e){let t=this.attribute.element
t.selected=!!e}}function Bt(e){return!1===e||null==e||void 0===e.toString?null:!0===e?"":"function"==typeof e?null:String(e)}class Lt{constructor(e,t,s,i){this.slots=e,this.callerScope=t,this.evalScope=s,this.partialMap=i}static root(e,t=0){let s=new Array(t+1)
for(let i=0;i<=t;i++)s[i]=ue
return new Lt(s,null,null,null).init({self:e})}static sized(e=0){let t=new Array(e+1)
for(let s=0;s<=e;s++)t[s]=ue
return new Lt(t,null,null,null)}init({self:e}){return this.slots[0]=e,this}getSelf(){return this.get(0)}getSymbol(e){return this.get(e)}getBlock(e){let t=this.get(e)
return t===ue?null:t}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(e,t){this.set(e,t)}bindSelf(e){this.set(0,e)}bindSymbol(e,t){this.set(e,t)}bindBlock(e,t){this.set(e,t)}bindEvalScope(e){this.evalScope=e}bindPartialMap(e){this.partialMap=e}bindCallerScope(e){this.callerScope=e}getCallerScope(){return this.callerScope}child(){return new Lt(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(e){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
return this.slots[e]}set(e,t){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
this.slots[e]=t}}class Mt{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(e,t){this.createdComponents.push(e),this.createdManagers.push(t)}didUpdate(e,t){this.updatedComponents.push(e),this.updatedManagers.push(t)}scheduleInstallModifier(e,t){this.scheduledInstallManagers.push(t),this.scheduledInstallModifiers.push(e)}scheduleUpdateModifier(e,t){this.scheduledUpdateModifierManagers.push(t),this.scheduledUpdateModifiers.push(e)}didDestroy(e){this.destructors.push(e)}commit(){let e=this.createdComponents,t=this.createdManagers
for(let h=0;h<e.length;h++){let s=e[h]
t[h].didCreate(s)}let s=this.updatedComponents,i=this.updatedManagers
for(let h=0;h<s.length;h++){let e=s[h]
i[h].didUpdate(e)}let n=this.destructors
for(let h=0;h<n.length;h++)n[h].destroy()
let r=this.scheduledInstallManagers,a=this.scheduledInstallModifiers
for(let h=0;h<r.length;h++){let e=r[h],t=a[h]
e.install(t)}let l=this.scheduledUpdateModifierManagers,o=this.scheduledUpdateModifiers
for(let h=0;h<l.length;h++){let e=l[h],t=o[h]
e.update(t)}}}class Rt{constructor({appendOperations:e,updateOperations:t}){this._transaction=null,this.appendOperations=e,this.updateOperations=t}toConditionalReference(e){return new me(e)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}begin(){this._transaction=new Mt}get transaction(){return this._transaction}didCreate(e,t){this.transaction.didCreate(e,t)}didUpdate(e,t){this.transaction.didUpdate(e,t)}scheduleInstallModifier(e,t){this.transaction.scheduleInstallModifier(e,t)}scheduleUpdateModifier(e,t){this.transaction.scheduleUpdateModifier(e,t)}didDestroy(e){this.transaction.didDestroy(e)}commit(){let e=this.transaction
this._transaction=null,e.commit()}attributeFor(e,t,s,i=null){return St(e,t,i)}}class Dt{constructor(e,t,s,i,n=-1,r=-1){this.stack=e,this.heap=t,this.program=s,this.externs=i,this.pc=n,this.ra=r,this.currentOpSize=0}pushFrame(){this.stack.pushSmi(this.ra),this.stack.pushSmi(this.stack.fp),this.stack.fp=this.stack.sp-1}popFrame(){this.stack.sp=this.stack.fp-1,this.ra=this.stack.getSmi(0),this.stack.fp=this.stack.getSmi(1)}pushSmallFrame(){this.stack.pushSmi(this.ra)}popSmallFrame(){this.ra=this.stack.popSmi()}goto(e){let t=this.pc+e-this.currentOpSize
this.pc=t}call(e){this.ra=this.pc,this.pc=this.heap.getaddr(e)}returnTo(e){let t=this.pc+e-this.currentOpSize
this.ra=t}return(){this.pc=this.ra}nextStatement(){let e=this.pc,t=this.program
if(-1===e)return null
let s=this.program.opcode(e).size,i=this.currentOpSize=s
return this.pc+=i,t.opcode(e)}evaluateOuter(e,t){this.evaluateInner(e,t)}evaluateInner(e,t){e.isMachine?this.evaluateMachine(e):this.evaluateSyscall(e,t)}evaluateMachine(e){switch(e.type){case 57:return this.pushFrame()
case 58:return this.popFrame()
case 59:return this.pushSmallFrame()
case 60:return this.popSmallFrame()
case 50:return this.call(e.op1)
case 49:return this.call(this.stack.popSmi())
case 52:return this.goto(e.op1)
case 24:return this.return()
case 25:return this.returnTo(e.op1)}}evaluateSyscall(e,t){ie.evaluate(t,e,e.type)}}class It{constructor(e){this.node=e}firstNode(){return this.node}}class Ft{constructor(e){this.node=e}lastNode(){return this.node}}class Pt{constructor(e,t,s){this.constructing=null,this.operations=null,this.cursorStack=new l,this.blockStack=new l,this.pushElement(t,s),this.env=e,this.dom=e.getAppendOperations(),this.updateOperations=e.getDOM()}static forInitialRender(e,t){let s=new this(e,t.element,t.nextSibling)
return s.pushSimpleBlock(),s}static resume(e,t,s){let i=new this(e,t.parentElement(),s)
return i.pushSimpleBlock(),i.pushBlockTracker(t),i}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(e){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new zt(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new Ht(this.element))}pushBlockList(e){return this.pushBlockTracker(new Vt(this.element,e))}pushBlockTracker(e,t=!1){let s=this.blockStack.current
return null!==s&&(s.newDestroyable(e),t||s.didAppendBounds(e)),this.__openBlock(),this.blockStack.push(e),e}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(e){let t=this.__openElement(e)
return this.constructing=t,t}__openElement(e){return this.dom.createElement(e,this.element)}flushElement(){let e=this.element,t=this.constructing
this.__flushElement(e,t),this.constructing=null,this.operations=null,this.pushElement(t,null),this.didOpenElement(t)}__flushElement(e,t){this.dom.insertBefore(e,t,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(e,t,s=null){this.__pushRemoteElement(e,t,s)}__pushRemoteElement(e,t,s){this.pushElement(e,s)
let i=new jt(e)
this.pushBlockTracker(i,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(e,t){this.cursorStack.push(new Ye(e,t))}didAddDestroyable(e){this.block().newDestroyable(e)}didAppendBounds(e){return this.block().didAppendBounds(e),e}didAppendNode(e){return this.block().didAppendNode(e),e}didOpenElement(e){return this.block().openElement(e),e}willCloseElement(){this.block().closeElement()}appendText(e){return this.didAppendNode(this.__appendText(e))}__appendText(e){let t=this.dom,s=this.element,i=this.nextSibling,n=t.createTextNode(e)
return t.insertBefore(s,n,i),n}__appendNode(e){return this.dom.insertBefore(this.element,e,this.nextSibling),e}__appendFragment(e){let t=e.firstChild
if(t){let s=function(e,t,s){return new We(e,t,s)}(this.element,t,e.lastChild)
return this.dom.insertBefore(this.element,e,this.nextSibling),s}return Ke(this.element,this.__appendComment(""))}__appendHTML(e){return this.dom.insertHTMLBefore(this.element,this.nextSibling,e)}appendDynamicHTML(e){let t=this.trustedContent(e)
this.didAppendBounds(t)}appendDynamicText(e){let t=this.untrustedContent(e)
return this.didAppendNode(t),t}appendDynamicFragment(e){let t=this.__appendFragment(e)
this.didAppendBounds(t)}appendDynamicNode(e){let t=this.__appendNode(e),s=Ke(this.element,t)
this.didAppendBounds(s)}trustedContent(e){return this.__appendHTML(e)}untrustedContent(e){return this.__appendText(e)}appendComment(e){return this.didAppendNode(this.__appendComment(e))}__appendComment(e){let t=this.dom,s=this.element,i=this.nextSibling,n=t.createComment(e)
return t.insertBefore(s,n,i),n}__setAttribute(e,t,s){this.dom.setAttribute(this.constructing,e,t,s)}__setProperty(e,t){this.constructing[e]=t}setStaticAttribute(e,t,s){this.__setAttribute(e,t,s)}setDynamicAttribute(e,t,s,i){let n=this.constructing,r=this.env.attributeFor(n,e,s,i)
return r.set(this,t,this.env),r}}class zt{constructor(e){this.parent=e,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let e=this.destroyables
if(e&&e.length)for(let t=0;t<e.length;t++)e[t].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(e){this.didAppendNode(e),this.nesting++}closeElement(){this.nesting--}didAppendNode(e){0===this.nesting&&(this.first||(this.first=new It(e)),this.last=new Ft(e))}didAppendBounds(e){0===this.nesting&&(this.first||(this.first=e),this.last=e)}newDestroyable(e){this.destroyables=this.destroyables||[],this.destroyables.push(e)}finalize(e){this.first||e.appendComment("")}}class jt extends zt{destroy(){super.destroy(),Xe(this)}}class Ht extends zt{reset(e){let t=this.destroyables
if(t&&t.length)for(let i=0;i<t.length;i++)e.didDestroy(t[i])
let s=Xe(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,s}}class Vt{constructor(e,t){this.parent=e,this.boundList=t,this.parent=e,this.boundList=t}destroy(){this.boundList.forEachNode(e=>e.destroy())}parentElement(){return this.parent}firstNode(){let e=this.boundList.head()
return e&&e.firstNode()}lastNode(){let e=this.boundList.tail()
return e&&e.lastNode()}openElement(e){}closeElement(){}didAppendNode(e){}didAppendBounds(e){}newDestroyable(e){}finalize(e){}}class Ut{constructor(e=[]){this.vec=e}clone(){return new Ut(this.vec.slice())}sliceFrom(e){return new Ut(this.vec.slice(e))}slice(e,t){return new Ut(this.vec.slice(e,t))}copy(e,t){this.vec[t]=this.vec[e]}writeRaw(e,t){this.vec[e]=t}writeSmi(e,t){var s
this.vec[e]=(s=t)<0?Math.abs(s)<<3|4:s<<3|0}getRaw(e){return this.vec[e]}getSmi(e){return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw new Error("unreachable")}}(this.vec[e])}reset(){this.vec.length=0}len(){return this.vec.length}}const $t=2147483648,Gt=2147483647
class Yt{constructor(e=new Ut,t=[]){this.inner=e,this.js=t}slice(e,t){let s
return s="number"==typeof e&&"number"==typeof t?this.inner.slice(e,t):"number"==typeof e&&void 0===t?this.inner.sliceFrom(e):this.inner.clone(),new Yt(s,this.js.slice(e,t))}sliceInner(e,t){let s=[]
for(let i=e;i<t;i++)s.push(this.get(i))
return s}copy(e,t){this.inner.copy(e,t)}write(e,t){if(function(e){let t=typeof e
if(null==e)return!0
switch(t){case"boolean":case"undefined":return!0
case"number":if(e%1!=0)return!1
let s=Math.abs(e)
return!(s>$t)
default:return!1}}(t))this.inner.writeRaw(e,qt(t))
else{let s=this.js.length
this.js.push(t),this.inner.writeRaw(e,s|$t)}}writeSmi(e,t){this.inner.writeSmi(e,t)}writeImmediate(e,t){this.inner.writeRaw(e,t)}get(t){let s=this.inner.getRaw(t)
return s&$t?this.js[s&Gt]:function(t){switch(t){case 3:return!1
case 11:return!0
case 19:return null
case 27:return
default:return function(t){switch(7&t){case 0:return t>>3
case 4:return-(t>>3)
default:throw e()}}(t)}}(s)}getSmi(e){return this.inner.getSmi(e)}reset(){this.inner.reset(),this.js.length=0}get length(){return this.inner.len()}}class Wt{constructor(e,t,s){this.stack=e,this.fp=t,this.sp=s}static empty(){return new this(new Yt,0,-1)}static restore(e){let t=new Yt
for(let s=0;s<e.length;s++)t.write(s,e[s])
return new this(t,0,e.length-1)}push(e){this.stack.write(++this.sp,e)}pushSmi(e){this.stack.writeSmi(++this.sp,e)}pushImmediate(e){this.stack.writeImmediate(++this.sp,qt(e))}pushEncodedImmediate(e){this.stack.writeImmediate(++this.sp,e)}pushNull(){this.stack.writeImmediate(++this.sp,19)}dup(e=this.sp){this.stack.copy(e,++this.sp)}copy(e,t){this.stack.copy(e,t)}pop(e=1){let t=this.stack.get(this.sp)
return this.sp-=e,t}popSmi(){return this.stack.getSmi(this.sp--)}peek(e=0){return this.stack.get(this.sp-e)}peekSmi(e=0){return this.stack.getSmi(this.sp-e)}get(e,t=this.fp){return this.stack.get(t+e)}getSmi(e,t=this.fp){return this.stack.getSmi(t+e)}set(e,t,s=this.fp){this.stack.write(s+t,e)}slice(e,t){return this.stack.slice(e,t)}sliceArray(e,t){return this.stack.sliceInner(e,t)}capture(e){let t=this.sp+1,s=t-e
return this.stack.sliceInner(s,t)}reset(){this.stack.reset()}toArray(){return this.stack.sliceInner(this.fp,this.sp+1)}}function qt(t){switch(typeof t){case"number":return function(e){return e<0?Math.abs(e)<<3|4:e<<3|0}(t)
case"boolean":return t?11:3
case"object":return 19
case"undefined":return 27
default:throw e()}}class Kt{constructor(e,t,{alwaysRevalidate:s=!1}){this.frameStack=new l,this.env=e,this.constants=t.constants,this.dom=e.getDOM(),this.alwaysRevalidate=s}execute(e,t){let s=this.frameStack
for(this.try(e,t);!s.isEmpty();){let e=this.frame.nextStatement()
null!==e?e.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(e){this.frame.goto(e)}try(e,t){this.frameStack.push(new es(e,t))}throw(){this.frame.handleException(),this.frameStack.pop()}}class Jt extends re{constructor(e,t,s,i,n){super(),this.start=e,this.state=t,this.runtime=s,this.type="block",this.next=null,this.prev=null,this.children=n,this.bounds=i}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(e){e.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.runtime.env.didDestroy(this.bounds)}}class Xt extends Jt{constructor(e,t,s,i,n){super(e,t,s,i,n),this.type="try",this.tag=this._tag=L.create(y)}didInitializeChildren(){this._tag.inner.update(x(this.children))}evaluate(e){e.try(this.children,this)}handleException(){let e=this.state,t=this.bounds,s=this.children,i=this.start,n=this.prev,r=this.next,a=this.runtime
s.clear()
let l=Pt.resume(a.env,t,t.reset(a.env)),o=cs.resume(e,a,l),u=new h
o.execute(i,t=>{t.stack=Wt.restore(e.stack),t.updatingOpcodeStack.push(u),t.updateWith(this),t.updatingOpcodeStack.push(s)}),this.prev=n,this.next=r}}class Qt{constructor(e,t){this.opcode=e,this.marker=t,this.didInsert=!1,this.didDelete=!1,this.map=e.map,this.updating=e.children}insert(e,t,s,i){let n=this.map,r=this.opcode,a=this.updating,l=null,o=null
l=i?(o=n[i]).bounds.firstNode():this.marker
let u=r.vmForInsertion(l),c=null,p=r.start
u.execute(p,i=>{n[e]=c=i.iterate(s,t),i.updatingOpcodeStack.push(new h),i.updateWith(c),i.updatingOpcodeStack.push(c.children)}),a.insertBefore(c,o),this.didInsert=!0}retain(e,t,s){}move(e,t,s,i){let n=this.map,r=this.updating,a=n[e],l=n[i]||null
Je(a,i?l.firstNode():this.marker),r.remove(a),r.insertBefore(a,l)}delete(e){let t=this.map,s=t[e]
s.didDestroy(),Xe(s),this.updating.remove(s),delete t[e],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class Zt extends Jt{constructor(e,t,s,i,n,r){super(e,t,s,i,n),this.type="list-block",this.map=a(),this.lastIterated=p,this.artifacts=r
let l=this._tag=L.create(y)
this.tag=A([r.tag,l])}didInitializeChildren(e=!0){this.lastIterated=this.artifacts.tag.value(),e&&this._tag.inner.update(x(this.children))}evaluate(e){let t=this.artifacts,s=this.lastIterated
if(!t.tag.validate(s)){let s=this.bounds,i=e.dom,n=i.createComment("")
i.insertAfter(s.parentElement(),n,s.lastNode())
let r=new Qt(this,n)
new H({target:r,artifacts:t}).sync(),this.parentElement().removeChild(n)}super.evaluate(e)}vmForInsertion(e){let t=this.bounds,s=this.state,i=this.runtime,n=Pt.forInitialRender(i.env,{element:t.parentElement(),nextSibling:e})
return cs.resume(s,i,n)}}class es{constructor(e,t){this.ops=e,this.exceptionHandler=t,this.current=e.head()}goto(e){this.current=e}nextStatement(){let e=this.current,t=this.ops
return e&&(this.current=t.nextNode(e)),e}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class ts{constructor(e,t,s,i){this.env=e,this.program=t,this.updating=s,this.bounds=i}rerender({alwaysRevalidate:e=!1}={alwaysRevalidate:!1}){let t=this.env,s=this.program,i=this.updating
new Kt(t,s,{alwaysRevalidate:e}).execute(i,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),Xe(this.bounds)}}class ss{constructor(){this.stack=null,this.positional=new is,this.named=new rs,this.blocks=new ls}empty(e){let t=e.sp+1
return this.named.empty(e,t),this.positional.empty(e,t),this.blocks.empty(e,t),this}setup(e,t,s,i,n){this.stack=e
let r=this.named,a=t.length,l=e.sp-a+1
r.setup(e,l,a,t,n)
let o=l-i
this.positional.setup(e,o,i)
let h=this.blocks,u=s.length,c=o-3*u
h.setup(e,c,u,s)}get tag(){return E([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(e){return this.positional.at(e)}realloc(e){let t=this.stack
if(e>0&&null!==t){let s=this.positional,i=this.named,n=s.base+e
for(let e=s.length+i.length-1;e>=0;e--)t.copy(e+s.base,e+n)
s.base+=e,i.base+=e,t.sp+=e}}capture(){let e=0===this.positional.length?us:this.positional.capture(),t=0===this.named.length?hs:this.named.capture()
return{tag:this.tag,length:this.length,positional:e,named:t}}clear(){let e=this.stack,t=this.length
t>0&&null!==e&&e.pop(t)}}class is{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}empty(e,t){this.stack=e,this.base=t,this.length=0,this._tag=y,this._references=c}setup(e,t,s){this.stack=e,this.base=t,this.length=s,0===s?(this._tag=y,this._references=c):(this._tag=null,this._references=null)}get tag(){let e=this._tag
return e||(e=this._tag=E(this.references)),e}at(e){let t=this.base,s=this.length,i=this.stack
return e<0||e>=s?ue:i.get(e,t)}capture(){return new ns(this.tag,this.references)}prepend(e){let t=e.length
if(t>0){let s=this.base,i=this.length,n=this.stack
this.base=s-=t,this.length=i+t
for(let r=0;r<t;r++)n.set(e.at(r),r,s)
this._tag=null,this._references=null}}get references(){let e=this._references
if(!e){let t=this.stack,s=this.base,i=this.length
e=this._references=t.sliceArray(s,s+i)}return e}}class ns{constructor(e,t,s=t.length){this.tag=e,this.references=t,this.length=s}static empty(){return new ns(y,c,0)}at(e){return this.references[e]}value(){return this.references.map(this.valueOf)}get(e){let t=this.references,s=this.length
if("length"===e)return le.create(s)
{let i=parseInt(e,10)
return i<0||i>=s?ue:t[i]}}valueOf(e){return e.value()}}class rs{constructor(){this.base=0,this.length=0,this._references=null,this._names=c,this._atNames=c}empty(e,t){this.stack=e,this.base=t,this.length=0,this._references=c,this._names=c,this._atNames=c}setup(e,t,s,i,n){this.stack=e,this.base=t,this.length=s,0===s?(this._references=c,this._names=c,this._atNames=c):(this._references=null,n?(this._names=i,this._atNames=null):(this._names=null,this._atNames=i))}get tag(){return E(this.references)}get names(){let e=this._names
return e||(e=this._names=this._atNames.map(this.toSyntheticName)),e}get atNames(){let e=this._atNames
return e||(e=this._atNames=this._names.map(this.toAtName)),e}has(e){return-1!==this.names.indexOf(e)}get(e,t=!0){let s=this.base,i=this.stack,n=(t?this.names:this.atNames).indexOf(e)
return-1===n?ue:i.get(n,s)}capture(){return new as(this.tag,this.names,this.references)}merge(e){let t=e.length
if(t>0){let s=this.names,i=this.length,n=this.stack,r=e.names
Object.isFrozen(s)&&0===s.length&&(s=[])
for(let a=0;a<t;a++){let t=r[a];-1===s.indexOf(t)&&(i=s.push(t),n.push(e.references[a]))}this.length=i,this._references=null,this._names=s,this._atNames=null}}get references(){let e=this._references
if(!e){let t=this.base,s=this.length,i=this.stack
e=this._references=i.sliceArray(t,t+s)}return e}toSyntheticName(e){return e.slice(1)}toAtName(e){return`@${e}`}}class as{constructor(e,t,s){this.tag=e,this.names=t,this.references=s,this.length=t.length,this._map=null}get map(){let e=this._map
if(!e){let t=this.names,s=this.references
e=this._map=a()
for(let i=0;i<t.length;i++){e[t[i]]=s[i]}}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names,s=this.references,i=t.indexOf(e)
return-1===i?ue:s[i]}value(){let e=this.names,t=this.references,s=a()
for(let i=0;i<e.length;i++){s[e[i]]=t[i].value()}return s}}class ls{constructor(){this.internalValues=null,this.internalTag=null,this.names=c,this.length=0,this.base=0}empty(e,t){this.stack=e,this.names=c,this.base=t,this.length=0,this.internalTag=y,this.internalValues=c}setup(e,t,s,i){this.stack=e,this.names=i,this.base=t,this.length=s,0===s?(this.internalTag=y,this.internalValues=c):(this.internalTag=null,this.internalValues=null)}get values(){let e=this.internalValues
if(!e){let t=this.base,s=this.length,i=this.stack
e=this.internalValues=i.sliceArray(t,t+3*s)}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.base,s=this.stack,i=this.names,n=i.indexOf(e)
if(-1===i.indexOf(e))return null
let r=s.get(3*n,t),a=s.get(3*n+1,t),l=s.get(3*n+2,t)
return null===l?null:[l,a,r]}capture(){return new os(this.names,this.values)}}class os{constructor(e,t){this.names=e,this.values=t,this.length=e.length}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names.indexOf(e)
return-1===t?null:[this.values[3*t+2],this.values[3*t+1],this.values[3*t]]}}const hs=new as(y,c,c),us=new ns(y,c)
class cs{constructor(e,t,s,i){this.runtime=e,this.elementStack=i,this.dynamicScopeStack=new l,this.scopeStack=new l,this.updatingOpcodeStack=new l,this.cacheGroups=new l,this.listBlockStack=new l,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.heap=this.program.heap,this.constants=this.program.constants,this.elementStack=i,this.scopeStack.push(t),this.dynamicScopeStack.push(s),this.args=new ss,this.inner=new Dt(Wt.empty(),this.heap,e.program,{debugBefore:e=>ie.debugBefore(this,e,e.type),debugAfter:(e,t)=>{ie.debugAfter(this,e,e.type,t)}})}get stack(){return this.inner.stack}set stack(e){this.inner.stack=e}set currentOpSize(e){this.inner.currentOpSize=e}get currentOpSize(){return this.inner.currentOpSize}get pc(){return this.inner.pc}set pc(e){this.inner.pc=e}get ra(){return this.inner.ra}set ra(e){this.inner.ra=e}get fp(){return this.stack.fp}set fp(e){this.stack.fp=e}get sp(){return this.stack.sp}set sp(e){this.stack.sp=e}fetch(e){this.stack.push(this[ae[e]])}load(e){this[ae[e]]=this.stack.pop()}fetchValue(e){return this[ae[e]]}loadValue(e,t){this[ae[e]]=t}pushFrame(){this.inner.pushFrame()}popFrame(){this.inner.popFrame()}goto(e){this.inner.goto(e)}call(e){this.inner.call(e)}returnTo(e){this.inner.returnTo(e)}return(){this.inner.return()}static initial(e,t,s,i,n,r){let a=e.heap.scopesizeof(r),l=Lt.root(s,a),o=new cs({program:e,env:t},l,i,n)
return o.pc=o.heap.getaddr(r),o.updatingOpcodeStack.push(new h),o}static empty(e,t,s){let i={get:()=>ue,set:()=>ue,child:()=>i},n=new cs({program:e,env:t},Lt.root(ue,0),i,s)
return n.updatingOpcodeStack.push(new h),n}static resume({scope:e,dynamicScope:t},s,i){return new cs(s,e,t,i)}get program(){return this.runtime.program}get env(){return this.runtime.env}capture(e){return{dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(e)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let e=new Be("END"),t=this.updating(),s=this.cacheGroups.pop(),i=s?t.nextNode(s):t.head(),n=t.tail(),r=x(new u(i,n)),a=new Oe(r,e)
t.insertBefore(a,i),t.append(new Te(a)),t.append(e)}enter(e){let t=new h,s=this.capture(e),i=this.elements().pushUpdatableBlock(),n=new Xt(this.heap.gethandle(this.pc),s,this.runtime,i,t)
this.didEnter(n)}iterate(e,t){let s=this.stack
s.push(t),s.push(e)
let i=this.capture(2),n=this.elements().pushUpdatableBlock()
return new Xt(this.heap.gethandle(this.pc),i,this.runtime,n,new h)}enterItem(e,t){this.listBlock().map[e]=t,this.didEnter(t)}enterList(e){let t=new h,s=this.capture(0),i=this.elements().pushBlockList(t),n=this.stack.peek().artifacts,r=this.pc+e-this.currentOpSize,a=this.heap.gethandle(r),l=new Zt(a,s,this.runtime,i,t,n)
this.listBlockStack.push(l),this.didEnter(l)}didEnter(e){this.updateWith(e),this.updatingOpcodeStack.push(e.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop(),this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(e){this.updating().append(e)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let e=this.dynamicScope().child()
return this.dynamicScopeStack.push(e),e}pushRootScope(e,t){let s=Lt.sized(e)
return t&&s.bindCallerScope(this.scope()),this.scopeStack.push(s),s}pushScope(e){this.scopeStack.push(e)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(e){this.elements().didAddDestroyable(e)}getSelf(){return this.scope().getSelf()}referenceForSymbol(e){return this.scope().getSymbol(e)}execute(e,t){let s
for(this.pc=this.heap.getaddr(e),t&&t(this);!(s=this.next()).done;);return s.value}next(){let e,t=this.env,s=this.program,i=this.updatingOpcodeStack,n=this.elementStack,r=this.inner.nextStatement()
return null!==r?(this.inner.evaluateOuter(r,this),e={done:!1,value:null}):(this.stack.reset(),e={done:!0,value:new ts(t,s,i.pop(),n.popBlock())}),e}bindDynamicScope(e){let t=this.dynamicScope()
for(let s=e.length-1;s>=0;s--){let i=this.constants.getString(e[s])
t.set(i,this.stack.pop())}}}class ps{constructor(e){this.vm=e}next(){return this.vm.next()}}class ds{get(e){return fs.create(this,e)}}class ms extends ds{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let e=this.tag,t=this._lastRevision,s=this._lastValue
return t&&e.validate(t)||(s=this._lastValue=this.compute(),this._lastRevision=e.value()),s}}class gs extends I{constructor(){super(...arguments),this.children=a()}get(e){let t=this.children[e]
return t||(t=this.children[e]=new bs(this.inner,e)),t}}class fs extends ms{static create(e,t){return w(e)?new bs(e.value(),t):new ys(e,t)}get(e){return new ys(this,e)}}class bs extends fs{constructor(e,t){super(),this._parentValue=e,this._propertyKey=t,this.tag=Q(e,t)}compute(){return this._parentValue[this._propertyKey]}}class ys extends fs{constructor(e,t){super()
let s=e.tag,i=L.create(y)
this._parentReference=e,this._parentObjectTag=i,this._propertyKey=t,this.tag=A([s,i])}compute(){let e=this._parentReference,t=this._parentObjectTag,s=this._propertyKey,i=e.value()
return t.inner.update(Q(i,s)),"string"==typeof i&&"length"===s?i.length:"object"==typeof i&&i?i[s]:void 0}}class vs extends ds{constructor(e){super(),this.tag=C.create(),this._value=e}value(){return this._value}update(e){e!==this._value&&(this.tag.inner.dirty(),this._value=e)}}class ks{constructor(e,t,s,i){let n=e.ComponentClass,r=e.name
this.args=t
let a={debugName:r,args:this.namedArgsSnapshot()}
i.setOwner(a,s),n&&(this.component=n.create(a))}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}const ws=new gs(null)
class Ss{static create(e){return new Ss(e)}constructor(e){this.env=e.env}prepareArgs(e,t){return null}getCapabilities(e){return e.capabilities}getLayout({name:e,handle:t,symbolTable:s},i){return t&&s?{handle:t,symbolTable:s}:i.compileTemplate(e,t)}create(e,t,s,i,n,r){if(t.ComponentClass){let e=this.env.getOwner()
return new ks(t,s.capture(),e,this.env)}}getSelf(e){return e?new gs(e.component):ws}didCreateElement(e,t){}didRenderLayout(e,t){e&&(e.component.bounds=new se(t))}didCreate(e){e&&e.component.didInsertElement()}getTag(e){return e?e.tag:y}update(e,t){e&&(e.component.args=e.namedArgsSnapshot())}didUpdateLayout(){}didUpdate(e){e&&e.component.didUpdate()}getDestructor(e){return e?e.component:_s}}const _s={destroy(){}}
class Cs{constructor(e,t=null){this._registry=e,this._resolver=t,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(e){let t=this._factoryDefinitionLookups[e]
if(t||(this._resolver&&(t=this._resolver.retrieve(e)),t||(t=this._registry.registration(e)),t&&(this._factoryDefinitionLookups[e]=t)),t)return this.buildFactory(e,t)}lookup(e){let t=!1!==this._registry.registeredOption(e,"singleton")
if(t&&this._lookups[e])return this._lookups[e]
let s=this.factoryFor(e)
if(!s)return
if(!1===this._registry.registeredOption(e,"instantiate"))return s.class
let i=s.create()
return t&&i&&(this._lookups[e]=i),i}defaultInjections(e){return{}}buildInjections(e){let t,s=this.defaultInjections(e),i=this._registry.registeredInjections(e)
for(let n=0;n<i.length;n++)s[(t=i[n]).property]=this.lookup(t.source)
return s}buildFactory(e,t){let s=this.buildInjections(e)
return{class:t,create(e){let i=Object.assign({},s,e)
return t.create(i)}}}}class Es{constructor(e){this._registrations={},this._registeredOptions={},this._registeredInjections={},e&&e.fallback&&(this._fallback=e.fallback)}register(e,t,s){this._registrations[e]=t,s&&(this._registeredOptions[e]=s)}registration(e){let t=this._registrations[e]
return void 0===t&&this._fallback&&(t=this._fallback.registration(e)),t}unregister(e){delete this._registrations[e],delete this._registeredOptions[e],delete this._registeredInjections[e]}registerOption(e,t,s){let i=this._registeredOptions[e]
i||(i={},this._registeredOptions[e]=i),i[t]=s}registeredOption(e,t){let s,i=this.registeredOptions(e)
return i&&(s=i[t]),void 0===s&&void 0!==this._fallback&&(s=this._fallback.registeredOption(e,t)),s}registeredOptions(e){let t=this._registeredOptions[e]
if(void 0===t){let s=e.split(":")[0]
t=this._registeredOptions[s]}return t}unregisterOption(e,t){let s=this._registeredOptions[e]
s&&delete s[t]}registerInjection(e,t,s){let i=this._registeredInjections[e]
void 0===i&&(this._registeredInjections[e]=i=[]),i.push({property:t,source:s})}registeredInjections(e){let t=e.split(":")[0],s=this._fallback?this._fallback.registeredInjections(e):[]
return Array.prototype.push.apply(s,this._registeredInjections[t]),Array.prototype.push.apply(s,this._registeredInjections[e]),s}}const xs="__owner__"
function As(e){return e[xs]}function Ns(e,t){e[xs]=t}class Os{constructor(e,t){this._registry=e,this._resolver=t}register(e,t,s){let i=this._toAbsoluteSpecifier(e)
this._registry.register(i,t,s)}registration(e){let t=this._toAbsoluteSpecifier(e)
return this._registry.registration(t)}unregister(e){let t=this._toAbsoluteSpecifier(e)
this._registry.unregister(t)}registerOption(e,t,s){let i=this._toAbsoluteOrTypeSpecifier(e)
this._registry.registerOption(i,t,s)}registeredOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOption(s,t)}registeredOptions(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOptions(t)}unregisterOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
this._registry.unregisterOption(s,t)}registerInjection(e,t,s){let i=this._toAbsoluteOrTypeSpecifier(e),n=this._toAbsoluteSpecifier(s)
this._registry.registerInjection(i,t,n)}registeredInjections(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredInjections(t)}_toAbsoluteSpecifier(e,t){return this._resolver.identify(e,t)}_toAbsoluteOrTypeSpecifier(e){return function(e){return-1===e.indexOf(":")}(e)?e:this._toAbsoluteSpecifier(e)}}class Ts{constructor(e=null){this.bucket=e?i({},e):{}}get(e){return this.bucket[e]}set(e,t){return this.bucket[e]=t}child(){return new Ts(this.bucket)}}class Bs{constructor(e,t){this.position=0,this.array=e,this.keyFor=t}isEmpty(){return 0===this.array.length}next(){let e=this.position,t=this.array,s=this.keyFor
if(e>=t.length)return null
let i=t[e],n=s(i,e),r=e
return this.position++,{key:n,value:i,memo:r}}}class Ls{constructor(e,t,s){this.position=0,this.keys=e,this.values=t,this.keyFor=s}isEmpty(){return 0===this.keys.length}next(){let e=this.position,t=this.keys,s=this.values,i=this.keyFor
if(e>=t.length)return null
let n=s[e],r=t[e],a=i(n,r)
return this.position++,{key:a,value:n,memo:r}}}const Ms=new class{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}
class Rs{constructor(e,t){this.tag=e.tag,this.ref=e,this.keyFor=t}iterate(){let e=this.ref,t=this.keyFor,s=e.value()
if(Array.isArray(s))return s.length>0?new Bs(s,t):Ms
if(null==s)return Ms
if(void 0!==s.forEach){let e=[]
return s.forEach(function(t){e.push(t)}),e.length>0?new Bs(e,t):Ms}if("object"==typeof s){let e=Object.keys(s)
return e.length>0?new Ls(e,e.map(e=>s[e]),t):Ms}throw new Error(`Don't know how to {{#each ${s}}}`)}valueReferenceFor(e){return new vs(e.value)}updateValueReference(e,t){e.update(t.value)}memoReferenceFor(e){return new vs(e.memo)}updateMemoReference(e,t){e.update(t.memo)}}class Ds extends Rt{static create(e={}){return e.document=e.document||self.document,e.appendOperations=e.appendOperations||new ht(e.document),new Ds(e)}constructor(e){super({appendOperations:e.appendOperations,updateOperations:new ot(e.document||document)}),Ns(this,As(e)),this.uselessAnchor=e.document.createElement("a")}protocolForURL(e){return this.uselessAnchor.href=e,this.uselessAnchor.protocol}iterableFor(e,t){let s
if(!t)throw new Error("Must specify a key for #each")
switch(t){case"@index":s=((e,t)=>String(t))
break
case"@primitive":s=(e=>String(e))
break
default:s=(e=>e[t])}return new Rs(e,s)}getOwner(){return As(this)}setOwner(e,t){Ns(e,t)}}const Is="object"==typeof document?document:null
class Fs{constructor(e){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=e.rootName,this.resolver=e.resolver,t(e.loader,"Must provide a Loader for preparing templates and other metadata required for a Glimmer Application."),t(e.renderer,"Must provide a Renderer to render the templates produced by the Loader."),t(e.builder,"Must provide a Builder that is responsible to building DOM."),this.document=e.document||Is,this.loader=e.loader,this.renderer=e.renderer,this.builder=e.builder}renderComponent(e,t,s=null){let i=this._roots,n=this._self
i.push({id:this._rootsIndex++,component:e,parent:t,nextSibling:s}),n&&(n.update({roots:i}),this.scheduleRerender())}async boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),await this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,setTimeout(async()=>{this._scheduled=!1,await this._rerender(),this._rendering=!1},0))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(e){this._initializers.push(e)}initRegistry(){let e=this._registry=new Es,t=new Os(this._registry,this.resolver)
e.register(`environment:/${this.rootName}/main/main`,Ds),e.registerOption("helper","instantiate",!1),e.registerOption("template","instantiate",!1),e.register(`document:/${this.rootName}/main/main`,this.document),e.registerOption("document","instantiate",!1),e.registerInjection("environment","document",`document:/${this.rootName}/main/main`),e.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let s=this._initializers
for(let i=0;i<s.length;i++)s[i].initialize(t)
this._initialized=!0}initContainer(){this._container=new Cs(this._registry,this.resolver),this._container.defaultInjections=(e=>{let t={}
return Ns(t,this),t})}async _render(){let e=this.env,t=this._self=new vs({roots:this._roots}),s=new Ts,i=this.builder.getBuilder(e),n=await this.loader.getTemplateIterator(this,e,i,s,t)
try{e.begin(),await this.renderer.render(n),e.commit(),this._didRender()}catch(r){this._didError(r)}}async _rerender(){let e=this.env
try{e.begin(),await this.renderer.rerender(),e.commit(),this._didRender()}catch(t){this._didError(t)}}_didRender(){this._rendered=!0
let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[0]())}_didError(e){let t=this._notifiers
this._notifiers=[],t.forEach(t=>t[1](e))}identify(e,t){return this.resolver.identify(e,t)}factoryFor(e,t){return this._container.factoryFor(this.identify(e,t))}lookup(e,t){return this._container.lookup(this.identify(e,t))}}class Ps{constructor(){this.byName=a(),this.byHandle=a()}hasName(e){return e in this.byName}getHandle(e){return this.byName[e]}hasHandle(e){return e in this.byHandle}getByHandle(e){return this.byHandle[e]}register(e,t,s){this.byHandle[e]=s,this.byName[t]=e}}class zs extends ms{constructor(e,t){super(),this.helper=e,this.tag=t.tag,this.args=t.capture()}compute(){let e=this.helper,t=this.args
return e(t.positional.value(),t.named.value())}}var js
function Hs(e){return function(t){return Array.isArray(t)&&t[0]===e}}(function(e){e[e.Text=0]="Text",e[e.Append=1]="Append",e[e.Comment=2]="Comment",e[e.Modifier=3]="Modifier",e[e.Block=4]="Block",e[e.Component=5]="Component",e[e.OpenElement=6]="OpenElement",e[e.OpenSplattedElement=7]="OpenSplattedElement",e[e.FlushElement=8]="FlushElement",e[e.CloseElement=9]="CloseElement",e[e.StaticAttr=10]="StaticAttr",e[e.DynamicAttr=11]="DynamicAttr",e[e.AttrSplat=12]="AttrSplat",e[e.Yield=13]="Yield",e[e.Partial=14]="Partial",e[e.DynamicArg=15]="DynamicArg",e[e.StaticArg=16]="StaticArg",e[e.TrustingAttr=17]="TrustingAttr",e[e.Debugger=18]="Debugger",e[e.ClientSideStatement=19]="ClientSideStatement",e[e.Unknown=20]="Unknown",e[e.Get=21]="Get",e[e.MaybeLocal=22]="MaybeLocal",e[e.HasBlock=23]="HasBlock",e[e.HasBlockParams=24]="HasBlockParams",e[e.Undefined=25]="Undefined",e[e.Helper=26]="Helper",e[e.Concat=27]="Concat",e[e.ClientSideExpression=28]="ClientSideExpression"})(js||(js={}))
Hs(js.Modifier),Hs(js.FlushElement),Hs(js.Get),Hs(js.MaybeLocal)
var Vs;(function(e){e[e.OpenComponentElement=0]="OpenComponentElement",e[e.DidCreateElement=1]="DidCreateElement",e[e.SetComponentAttrs=2]="SetComponentAttrs",e[e.DidRenderLayout=3]="DidRenderLayout",e[e.Debugger=4]="Debugger"})(Vs||(Vs={}))
var Us=js
const $s="&attrs"
class Gs{constructor(e=0){this.offset=e,this.names=a(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}compile(e,t){let s=e[this.offset],i=this.names[s];(0,this.funcs[i])(e,t)}}let Ys,Ws
function qs(e,t,s){let i=e[1],n=e[2],r=e[3]
s.expr(n),r?s.dynamicAttr(i,r,t):s.dynamicAttr(i,null,t)}class Ks{constructor(){var e=function(e=new Js,t=new Xs){return e.add("if",(e,t,s,i,n)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
n.replayableIf({args:()=>(n.expr(e[0]),n.toBoolean(),1),ifTrue(){n.invokeStaticBlock(s)},ifFalse(){i&&n.invokeStaticBlock(i)}})}),e.add("unless",(e,t,s,i,n)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
n.replayableIf({args:()=>(n.expr(e[0]),n.toBoolean(),1),ifTrue(){i&&n.invokeStaticBlock(i)},ifFalse(){n.invokeStaticBlock(s)}})}),e.add("with",(e,t,s,i,n)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
n.replayableIf({args:()=>(n.expr(e[0]),n.dup(),n.toBoolean(),2),ifTrue(){n.invokeStaticBlock(s,1)},ifFalse(){i&&n.invokeStaticBlock(i)}})}),e.add("each",(e,t,s,i,n)=>{n.replayable({args:()=>(t&&"key"===t[0][0]?n.expr(t[1][0]):n.pushPrimitiveReference(null),n.expr(e[0]),2),body(){n.putIterator(),n.jumpUnless("ELSE"),n.pushFrame(),n.dup(ae.fp,1),n.returnTo("ITER"),n.enterList("BODY"),n.label("ITER"),n.iterate("BREAK"),n.label("BODY"),n.invokeStaticBlock(s,2),n.pop(2),n.jump("FINALLY"),n.label("BREAK"),n.exitList(),n.popFrame(),n.jump("FINALLY"),n.label("ELSE"),i&&n.invokeStaticBlock(i)}})}),e.add("in-element",(e,t,s,i,n)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
n.replayableIf({args(){let s=t[0],i=t[1]
for(let e=0;e<s.length;e++){let t=s[e]
if("nextSibling"!==t&&"guid"!==t)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${s[0]}\` option`)
n.expr(i[e])}return n.expr(e[0]),n.dup(),4},ifTrue(){n.pushRemoteElement(),n.invokeStaticBlock(s),n.popRemoteElement()}})}),e.add("-with-dynamic-vars",(e,t,s,i,n)=>{if(t){let e=t[0],i=t[1]
n.compileParams(i),n.pushDynamicScope(),n.bindDynamicScope(e),n.invokeStaticBlock(s),n.popDynamicScope()}else n.invokeStaticBlock(s)}),e.add("component",(e,t,s,i,n)=>{if("string"==typeof e[0]&&n.staticComponentHelper(e[0],t,s))return
let r=e[0],a=e.slice(1)
n.dynamicComponent(r,a,t,!0,s,i)}),t.add("component",(e,t,s,i)=>{let n=t&&t[0]
if("string"==typeof n&&i.staticComponentHelper(n,s,null))return!0
let r=t[0],a=t.slice(1)
return i.dynamicComponent(r,a,s,!0,null,null),!0}),{blocks:e,inlines:t}}()
let t=e.blocks,s=e.inlines
this.blocks=t,this.inlines=s}}class Js{constructor(){this.names=a(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t,s,i,n,r){let a=this.names[e]
if(void 0===a){(0,this.missing)(e,t,s,i,n,r)}else{(0,this.funcs[a])(t,s,i,n,r)}}}class Xs{constructor(){this.names=a(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t){let s,i,n,r=e[1]
if(!Array.isArray(r))return["expr",r]
if(r[0]===Us.Helper)s=r[1],i=r[2],n=r[3]
else{if(r[0]!==Us.Unknown)return["expr",r]
s=r[1],i=n=null}let a=this.names[s]
if(void 0===a&&this.missing){let e=(0,this.missing)(s,i,n,t)
return!1===e?["expr",r]:e}if(void 0!==a){let e=(0,this.funcs[a])(s,i,n,t)
return!1===e?["expr",r]:e}return["expr",r]}}const Qs=-1
class Zs{constructor(e,t){this.compiler=e,this.layout=t,this.compiled=null}get symbolTable(){return this.layout.block}compile(){if(null!==this.compiled)return this.compiled
this.compiled=Qs
let e=this.layout.block.statements
return this.compiled=this.compiler.add(e,this.layout)}}class ei{constructor(e,t){this.compiler=e,this.parsed=t,this.compiled=null}get symbolTable(){return this.parsed.block}compile(){if(null!==this.compiled)return this.compiled
this.compiled=Qs
var e=this.parsed
let t=e.block.statements,s=e.containingLayout
return this.compiled=this.compiler.add(t,s)}}function ti(e,t,s){let i=function(){if(Ys)return Ys
const e=Ys=new Gs
e.add(Us.Text,(e,t)=>{t.text(e[1])}),e.add(Us.Comment,(e,t)=>{t.comment(e[1])}),e.add(Us.CloseElement,(e,t)=>{t.closeElement()}),e.add(Us.FlushElement,(e,t)=>{t.flushElement()}),e.add(Us.Modifier,(e,t)=>{let s=t.referrer,i=e[1],n=e[2],r=e[3],a=t.compiler.resolveModifier(i,s)
if(null===a)throw new Error(`Compile Error ${i} is not a modifier: Helpers may not be used in the element form.`)
t.modifier(a,n,r)}),e.add(Us.StaticAttr,(e,t)=>{let s=e[1],i=e[2],n=e[3]
t.staticAttr(s,n,i)}),e.add(Us.DynamicAttr,(e,t)=>{qs(e,!1,t)}),e.add(Us.TrustingAttr,(e,t)=>{qs(e,!0,t)}),e.add(Us.OpenElement,(e,t)=>{t.openPrimitiveElement(e[1])}),e.add(Us.OpenSplattedElement,(e,t)=>{t.setComponentAttrs(!0),t.putComponentOperations(),t.openPrimitiveElement(e[1])}),e.add(Us.Component,(e,t)=>{let s=e[1],i=e[2],n=e[3],r=e[4],a=t.referrer
var l=t.compiler.resolveLayoutForTag(s,a)
let o=l.handle,h=l.capabilities,u=l.compilable
if(null===o||null===h)throw new Error(`Compile Error: Cannot find component ${s}`)
{let e=[[Us.ClientSideStatement,Vs.SetComponentAttrs,!0],...i,[Us.ClientSideStatement,Vs.SetComponentAttrs,!1]],s=t.inlineBlock({statements:e,parameters:c}),a=t.template(r)
u?(t.pushComponentDefinition(o),t.invokeStaticComponent(h,u,s,null,n,!1,a&&a)):(t.pushComponentDefinition(o),t.invokeComponent(h,s,null,n,!1,a&&a))}}),e.add(Us.Partial,(e,t)=>{let s=e[1],i=e[2],n=t.referrer
t.replayableIf({args:()=>(t.expr(s),t.dup(),2),ifTrue(){t.invokePartial(n,t.evalSymbols(),i),t.popScope(),t.popFrame()}})}),e.add(Us.Yield,(e,t)=>{let s=e[1],i=e[2]
t.yield(s,i)}),e.add(Us.AttrSplat,(e,t)=>{let s=e[1]
t.yield(s,[]),t.setComponentAttrs(!1)}),e.add(Us.Debugger,(e,t)=>{let s=e[1]
t.debugger(t.evalSymbols(),s)}),e.add(Us.ClientSideStatement,(e,s)=>{t.compile(e,s)}),e.add(Us.Append,(e,t)=>{let s=e[1],i=e[2]
!0!==(t.compileInline(e)||s)&&t.guardedAppend(s,i)}),e.add(Us.Block,(e,t)=>{let s=e[1],i=e[2],n=e[3],r=e[4],a=e[5],l=t.template(r),o=t.template(a),h=l&&l,u=o&&o
t.compileBlock(s,i,n,h,u)})
const t=new Gs(1)
return t.add(Vs.OpenComponentElement,(e,t)=>{t.putComponentOperations(),t.openPrimitiveElement(e[2])}),t.add(Vs.DidCreateElement,(e,t)=>{t.didCreateElement(ae.s0)}),t.add(Vs.SetComponentAttrs,(e,t)=>{t.setComponentAttrs(e[2])}),t.add(Vs.Debugger,()=>{}),t.add(Vs.DidRenderLayout,(e,t)=>{t.didRenderLayout(ae.s0)}),e}()
for(let n=0;n<e.length;n++)i.compile(e[n],t)
return t.commit()}class si{constructor(e,t,s){this.main=e,this.trustingGuardedAppend=t,this.cautiousGuardedAppend=s}static compile(e){let t=this.std(e,e=>e.main()),s=this.std(e,e=>e.stdAppend(!0)),i=this.std(e,e=>e.stdAppend(!1))
return new si(t,s,i)}static std(e,t){return oi.build(e,t)}getAppend(e){return e?this.trustingGuardedAppend:this.cautiousGuardedAppend}}class ii{constructor(e,t,s){this.macros=e,this.program=t,this.resolver=s,this.initialize()}initialize(){this.stdLib=si.compile(this)}get constants(){return this.program.constants}compileInline(e,t){return this.macros.inlines.compile(e,t)}compileBlock(e,t,s,i,n,r){this.macros.blocks.compile(e,t,s,i,n,r)}add(e,t){return ti(e,this.builderFor(t))}commit(e,t){let s=this.program.heap,i=s.malloc()
for(let n=0;n<t.length;n++){let e=t[n]
"function"==typeof e?s.pushPlaceholder(e):s.push(e)}return s.finishMalloc(i,e),i}resolveLayoutForTag(e,t){let s=this.resolver.lookupComponentDefinition(e,t)
return null===s?{handle:null,capabilities:null,compilable:null}:this.resolveLayoutForHandle(s)}resolveLayoutForHandle(e){let t=this.resolver,s=t.getCapabilities(e),i=null
return s.dynamicLayout||(i=t.getLayout(e)),{handle:e,capabilities:s,compilable:i}}resolveModifier(e,t){return this.resolver.lookupModifier(e,t)}resolveHelper(e,t){return this.resolver.lookupHelper(e,t)}}class ni{constructor(e,t){this.compiler=e,this.layout=t,this.compiled=null
let s=t.block
this.symbolTable={hasEval:s.hasEval,symbols:s.symbols.concat([$s])}}compile(){if(null!==this.compiled)return this.compiled
let e=this.compiler,t=this.layout,s=e.builderFor(t)
s.startLabels(),s.fetch(ae.s1),s.getComponentTagName(ae.s0),s.primitiveReference(),s.dup(),s.load(ae.s1),s.jumpUnless("BODY"),s.fetch(ae.s1),s.putComponentOperations(),s.openDynamicElement(),s.didCreateElement(ae.s0),s.flushElement(),s.label("BODY"),s.invokeStaticBlock(function(e,t){return new ei(t,{block:{statements:e.block.statements,parameters:c},containingLayout:e})}(t,e)),s.fetch(ae.s1),s.jumpUnless("END"),s.closeElement(),s.label("END"),s.load(ae.s1),s.stopLabels()
let i=s.commit()
return this.compiled=i}}class ri{constructor(e){this.builder=e}static(e,t){let s=t[0],i=t[1],n=t[2],r=t[3],a=this.builder
if(null!==e){var l=a.compiler.resolveLayoutForHandle(e)
let t=l.capabilities,o=l.compilable
o?(a.pushComponentDefinition(e),a.invokeStaticComponent(t,o,null,s,i,!1,n,r)):(a.pushComponentDefinition(e),a.invokeComponent(t,null,s,i,!1,n,r))}}}class ai{constructor(e){this.buffer=e,this.typePos=0,this.size=0}encode(e,t){if(e>255)throw new Error(`Opcode type over 8-bits. Got ${e}.`)
this.buffer.push(e|t|arguments.length-2<<8),this.typePos=this.buffer.length-1
for(let s=2;s<arguments.length;s++){let e=arguments[s]
if("number"==typeof e&&e>65535)throw new Error(`Operand over 16-bits. Got ${e}.`)
this.buffer.push(e)}this.size=this.buffer.length}patch(e,t){if(-1!==this.buffer[e+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[e+1]=t}patchWith(e,t,s){if(-1!==this.buffer[e+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[e+1]=t,this.buffer[e+2]=s}}class li{constructor(){this.labels=a(),this.targets=[]}label(e,t){this.labels[e]=t}target(e,t){this.targets.push({at:e,target:t})}patch(e){let t=this.targets,s=this.labels
for(let n=0;n<t.length;n++){var i=t[n]
let r=i.at,a=s[i.target]-r
e.patch(r,a)}}}class oi{constructor(e,t=0){this.size=t,this.encoder=new ai([]),this.labelsStack=new l,this.compiler=e}static build(e,t){let s=new oi(e)
return t(s),s.commit()}push(e){switch(arguments.length){case 1:return this.encoder.encode(e,0)
case 2:return this.encoder.encode(e,0,arguments[1])
case 3:return this.encoder.encode(e,0,arguments[1],arguments[2])
default:return this.encoder.encode(e,0,arguments[1],arguments[2],arguments[3])}}pushMachine(e){switch(arguments.length){case 1:return this.encoder.encode(e,1024)
case 2:return this.encoder.encode(e,1024,arguments[1])
case 3:return this.encoder.encode(e,1024,arguments[1],arguments[2])
default:return this.encoder.encode(e,1024,arguments[1],arguments[2],arguments[3])}}commit(){return this.pushMachine(24),this.compiler.commit(this.size,this.encoder.buffer)}reserve(e){this.encoder.encode(e,0,-1)}reserveWithOperand(e,t){this.encoder.encode(e,0,-1,t)}reserveMachine(e){this.encoder.encode(e,1024,-1)}main(){this.push(68,ae.s0),this.invokePreparedComponent(!1,!1,!0)}appendHTML(){this.push(28)}appendSafeHTML(){this.push(29)}appendDocumentFragment(){this.push(30)}appendNode(){this.push(31)}appendText(){this.push(32)}beginComponentTransaction(){this.push(91)}commitComponentTransaction(){this.push(92)}pushDynamicScope(){this.push(44)}popDynamicScope(){this.push(45)}pushRemoteElement(){this.push(41)}popRemoteElement(){this.push(42)}pushRootScope(e,t){this.push(20,e,t?1:0)}pushVirtualRootScope(e){this.push(21,e)}pushChildScope(){this.push(22)}popScope(){this.push(23)}prepareArgs(e){this.push(79,e)}createComponent(e,t){let s=0|t
this.push(81,s,e)}registerComponentDestructor(e){this.push(82,e)}putComponentOperations(){this.push(83)}getComponentSelf(e){this.push(84,e)}getComponentTagName(e){this.push(85,e)}getComponentLayout(e){this.push(86,e)}setupForEval(e){this.push(87,e)}invokeComponentLayout(e){this.push(90,e)}didCreateElement(e){this.push(93,e)}didRenderLayout(e){this.push(94,e)}pushFrame(){this.pushMachine(57)}popFrame(){this.pushMachine(58)}pushSmallFrame(){this.pushMachine(59)}popSmallFrame(){this.pushMachine(60)}invokeVirtual(){this.pushMachine(49)}invokeYield(){this.push(51)}toBoolean(){this.push(63)}invokePreparedComponent(e,t,s,i=null){this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(ae.s0,e),i&&i(),this.registerComponentDestructor(ae.s0),this.getComponentSelf(ae.s0),this.pushVirtualRootScope(ae.s0),this.setVariable(0),this.setupForEval(ae.s0),s&&this.setNamedVariables(ae.s0),t&&this.setBlocks(ae.s0),this.pop(),this.invokeComponentLayout(ae.s0),this.didRenderLayout(ae.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}compileInline(e){return this.compiler.compileInline(e,this)}compileBlock(e,t,s,i,n){this.compiler.compileBlock(e,t,s,i,n,this)}label(e){this.labels.label(e,this.nextPos)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new li)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushCurriedComponent(){this.push(74)}pushDynamicComponentInstance(){this.push(73)}openDynamicElement(){this.push(34)}flushElement(){this.push(38)}closeElement(){this.push(39)}putIterator(){this.push(66)}enterList(e){this.reserve(64),this.labels.target(this.pos,e)}exitList(){this.push(65)}iterate(e){this.reserve(67),this.labels.target(this.pos,e)}setNamedVariables(e){this.push(2,e)}setBlocks(e){this.push(3,e)}setVariable(e){this.push(4,e)}setBlock(e){this.push(5,e)}getVariable(e){this.push(6,e)}getBlock(e){this.push(8,e)}hasBlock(e){this.push(9,e)}concat(e){this.push(11,e)}load(e){this.push(18,e)}fetch(e){this.push(19,e)}dup(e=ae.sp,t=0){return this.push(16,e,t)}pop(e=1){return this.push(17,e)}returnTo(e){this.reserveMachine(25),this.labels.target(this.pos,e)}primitiveReference(){this.push(14)}reifyU32(){this.push(15)}enter(e){this.push(61,e)}exit(){this.push(62)}return(){this.pushMachine(24)}jump(e){this.reserveMachine(52),this.labels.target(this.pos,e)}jumpIf(e){this.reserve(53),this.labels.target(this.pos,e)}jumpUnless(e){this.reserve(54),this.labels.target(this.pos,e)}jumpEq(e,t){this.reserveWithOperand(55,e),this.labels.target(this.pos,t)}assertSame(){this.push(56)}pushEmptyArgs(){this.push(77)}switch(e,t){let s=[],i=0
t(function(e,t){s.push({match:e,callback:t,label:`CLAUSE${i++}`})}),this.enter(2),this.assertSame(),this.reifyU32(),this.startLabels(),s.slice(0,-1).forEach(e=>this.jumpEq(e.match,e.label))
for(let n=s.length-1;n>=0;n--){let e=s[n]
this.label(e.label),this.pop(2),e.callback(),0!==n&&this.jump("END")}this.label("END"),this.stopLabels(),this.exit()}stdAppend(e){this.switch(this.contentType(),t=>{t(1,()=>{e?(this.assertSame(),this.appendHTML()):this.appendText()}),t(0,()=>{this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeBareComponent()}),t(3,()=>{this.assertSame(),this.appendSafeHTML()}),t(4,()=>{this.assertSame(),this.appendDocumentFragment()}),t(5,()=>{this.assertSame(),this.appendNode()})})}populateLayout(e){this.push(89,e)}invokeBareComponent(){this.fetch(ae.s0),this.dup(ae.sp,1),this.load(ae.s0),this.pushFrame(),this.pushEmptyArgs(),this.prepareArgs(ae.s0),this.invokePreparedComponent(!1,!1,!0,()=>{this.getComponentLayout(ae.s0),this.populateLayout(ae.s0)}),this.load(ae.s0)}isComponent(){this.push(69)}contentType(){this.push(70)}pushBlockScope(){this.push(47)}}class hi extends oi{constructor(e,t){super(e,t?t.block.symbols.length:0),this.containingLayout=t,this.component=new ri(this),this.expressionCompiler=function(){if(Ws)return Ws
const e=Ws=new Gs
return e.add(Us.Unknown,(e,t)=>{let s=t.compiler,i=t.referrer,n=t.containingLayout.asPartial,r=e[1],a=s.resolveHelper(r,i)
null!==a?t.helper(a,null,null):n?t.resolveMaybeLocal(r):(t.getVariable(0),t.getProperty(r))}),e.add(Us.Concat,(e,t)=>{let s=e[1]
for(let i=0;i<s.length;i++)t.expr(s[i])
t.concat(s.length)}),e.add(Us.Helper,(e,t)=>{let s=t.compiler,i=t.referrer,n=e[1],r=e[2],a=e[3]
if("component"===n){let e=r[0],s=r.slice(1)
return void t.curryComponent(e,s,a,!0)}let l=s.resolveHelper(n,i)
if(null===l)throw new Error(`Compile Error: ${n} is not a helper`)
t.helper(l,r,a)}),e.add(Us.Get,(e,t)=>{let s=e[1],i=e[2]
t.getVariable(s)
for(let n=0;n<i.length;n++)t.getProperty(i[n])}),e.add(Us.MaybeLocal,(e,t)=>{let s=e[1]
if(t.containingLayout.asPartial){let e=s[0]
s=s.slice(1),t.resolveMaybeLocal(e)}else t.getVariable(0)
for(let i=0;i<s.length;i++)t.getProperty(s[i])}),e.add(Us.Undefined,(e,t)=>t.pushPrimitiveReference(void 0)),e.add(Us.HasBlock,(e,t)=>{t.hasBlock(e[1])}),e.add(Us.HasBlockParams,(e,t)=>{t.hasBlockParams(e[1])}),e}(),this.isComponentAttrs=!1,this.constants=e.constants,this.stdLib=e.stdLib}get referrer(){return this.containingLayout&&this.containingLayout.referrer}setComponentAttrs(e){this.isComponentAttrs=e}expr(e){Array.isArray(e)?this.expressionCompiler.compile(e,this):this.pushPrimitiveReference(e)}pushArgs(e,t){let s=this.constants.stringArray(e)
this.push(76,s,t)}pushYieldableBlock(e){this.pushSymbolTable(e&&e.symbolTable),this.pushBlockScope(),this.pushBlock(e)}curryComponent(e,t,s,i){let n=this.containingLayout.referrer
this.pushFrame(),this.compileArgs(t,s,null,i),this.push(80),this.expr(e),this.push(71,this.constants.serializable(n)),this.popFrame(),this.fetch(ae.v0)}pushSymbolTable(e){if(e){let t=this.constants.serializable(e)
this.push(48,t)}else this.primitive(null)}invokeComponent(e,t,s,i,n,r,a=null,l){this.fetch(ae.s0),this.dup(ae.sp,1),this.load(ae.s0),this.pushFrame()
let o=!!(r||a||t),h=!0===e||e.prepareArgs||!(!i||0===i[0].length),u={main:r,else:a,attrs:t}
this.compileArgs(s,i,u,n),this.prepareArgs(ae.s0),this.invokePreparedComponent(null!==r,o,h,()=>{l?(this.pushSymbolTable(l.symbolTable),this.pushLayout(l),this.resolveLayout()):this.getComponentLayout(ae.s0),this.populateLayout(ae.s0)}),this.load(ae.s0)}invokeStaticComponent(t,s,i,n,r,a,l,o=null){let h=s.symbolTable
if(h.hasEval||t.prepareArgs)return void this.invokeComponent(t,i,n,r,a,l,o,s)
this.fetch(ae.s0),this.dup(ae.sp,1),this.load(ae.s0)
let u=h.symbols
t.createArgs&&(this.pushFrame(),this.compileArgs(null,r,null,a)),this.beginComponentTransaction(),t.dynamicScope&&this.pushDynamicScope(),t.createInstance&&this.createComponent(ae.s0,null!==l),t.createArgs&&this.popFrame(),this.pushFrame(),this.registerComponentDestructor(ae.s0)
let c=[]
this.getComponentSelf(ae.s0),c.push({symbol:0,isBlock:!1})
for(let d=0;d<u.length;d++){let t=u[d]
switch(t.charAt(0)){case"&":let s=null
if("&default"===t)s=l
else if("&inverse"===t)s=o
else{if(t!==$s)throw e()
s=i}s?(this.pushYieldableBlock(s),c.push({symbol:d+1,isBlock:!0})):(this.pushYieldableBlock(null),c.push({symbol:d+1,isBlock:!0}))
break
case"@":if(!r)break
let n=r[0],h=r[1],u=t
a&&(u=t.slice(1))
let p=n.indexOf(u);-1!==p&&(this.expr(h[p]),c.push({symbol:d+1,isBlock:!1}))}}this.pushRootScope(u.length+1,!!(l||o||i))
for(let e=c.length-1;e>=0;e--){var p=c[e]
let t=p.symbol
p.isBlock?this.setBlock(t):this.setVariable(t)}this.invokeStatic(s),t.createInstance&&this.didRenderLayout(ae.s0),this.popFrame(),this.popScope(),t.dynamicScope&&this.popDynamicScope(),this.commitComponentTransaction(),this.load(ae.s0)}dynamicComponent(e,t,s,i,n,r=null){this.replayable({args:()=>(this.expr(e),this.dup(),2),body:()=>{this.jumpUnless("ELSE"),this.resolveDynamicComponent(this.containingLayout.referrer),this.pushDynamicComponentInstance(),this.invokeComponent(!0,null,t,s,i,n,r),this.label("ELSE")}})}yield(e,t){this.compileArgs(t,null,null,!1),this.getBlock(e),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}guardedAppend(e,t){this.pushFrame(),this.expr(e),this.pushMachine(50,this.stdLib.getAppend(t)),this.popFrame()}invokeStaticBlock(e,t=0){let s=e.symbolTable.parameters,i=s.length,n=Math.min(t,i)
if(this.pushFrame(),n){this.pushChildScope()
for(let e=0;e<n;e++)this.dup(ae.fp,t-e),this.setVariable(s[e])}this.pushBlock(e),this.resolveBlock(),this.invokeVirtual(),n&&this.popScope(),this.popFrame()}string(e){return this.constants.string(e)}names(e){let t=[]
for(let s=0;s<e.length;s++){let i=e[s]
t[s]=this.constants.string(i)}return this.constants.array(t)}symbols(e){return this.constants.array(e)}primitive(e){let t,s=0
switch(typeof e){case"number":e%1==0?e>-1?t=e:(t=this.constants.number(e),s=4):(t=this.constants.number(e),s=1)
break
case"string":t=this.string(e),s=2
break
case"boolean":t=0|e,s=3
break
case"object":t=2,s=3
break
case"undefined":t=3,s=3
break
default:throw new Error("Invalid primitive passed to pushPrimitive")}let i=this.sizeImmediate(t<<3|s,t)
this.push(13,i)}sizeImmediate(e,t){return e>=65535||e<0?this.constants.number(t)<<3|5:e}pushPrimitiveReference(e){this.primitive(e),this.primitiveReference()}pushComponentDefinition(e){this.push(72,this.constants.handle(e))}resolveDynamicComponent(e){this.push(75,this.constants.serializable(e))}staticComponentHelper(e,t,s){var i=this.compiler.resolveLayoutForTag(e,this.referrer)
let n=i.handle,r=i.capabilities,a=i.compilable
if(null!==n&&null!==r&&a){if(t)for(let e=0;e<t.length;e+=2)t[e][0]=`@${t[e][0]}`
return this.pushComponentDefinition(n),this.invokeStaticComponent(r,a,null,null,t,!1,s&&s),!0}return!1}invokePartial(e,t,s){let i=this.constants.serializable(e),n=this.constants.stringArray(t),r=this.constants.array(s)
this.push(95,i,n,r)}resolveMaybeLocal(e){this.push(96,this.string(e))}debugger(e,t){this.push(97,this.constants.stringArray(e),this.constants.array(t))}text(e){this.push(26,this.constants.string(e))}openPrimitiveElement(e){this.push(33,this.constants.string(e))}modifier(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(40,this.constants.handle(e)),this.popFrame()}comment(e){let t=this.constants.string(e)
this.push(27,t)}dynamicAttr(e,t,s){let i=this.constants.string(e),n=t?this.constants.string(t):0
this.isComponentAttrs?this.push(37,i,!0===s?1:0,n):this.push(36,i,!0===s?1:0,n)}staticAttr(e,t,s){let i=this.constants.string(e),n=t?this.constants.string(t):0
if(this.isComponentAttrs)this.pushPrimitiveReference(s),this.push(37,i,1,n)
else{let e=this.constants.string(s)
this.push(35,i,e,n)}}hasBlockParams(e){this.getBlock(e),this.resolveBlock(),this.push(10)}getProperty(e){this.push(7,this.string(e))}helper(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(1,this.constants.handle(e)),this.popFrame(),this.fetch(ae.v0)}bindDynamicScope(e){this.push(43,this.names(e))}replayable({args:e,body:t}){this.startLabels(),this.pushFrame(),this.returnTo("ENDINITIAL")
let s=e()
this.enter(s),t(),this.label("FINALLY"),this.exit(),this.return(),this.label("ENDINITIAL"),this.popFrame(),this.stopLabels()}replayableIf({args:e,ifTrue:t,ifFalse:s}){this.replayable({args:e,body:()=>{this.jumpUnless("ELSE"),t(),this.jump("FINALLY"),this.label("ELSE"),s&&s()}})}inlineBlock(e){return new ei(this.compiler,{block:e,containingLayout:this.containingLayout})}evalSymbols(){let e=this.containingLayout.block
return e.hasEval?e.symbols:null}compileParams(e){if(!e)return 0
for(let t=0;t<e.length;t++)this.expr(e[t])
return e.length}compileArgs(e,t,s,i){s&&(this.pushYieldableBlock(s.main),this.pushYieldableBlock(s.else),this.pushYieldableBlock(s.attrs))
let n=this.compileParams(e)<<4
i&&(n|=8),s&&(n|=7)
let r=c
if(t){r=t[0]
let e=t[1]
for(let t=0;t<e.length;t++)this.expr(e[t])}this.pushArgs(r,n)}template(e){return e?this.inlineBlock(e):null}}class ui extends hi{pushBlock(e){e?this.pushOther(e):this.primitive(null)}resolveBlock(){this.push(46)}pushLayout(e){e?this.pushOther(e):this.primitive(null)}resolveLayout(){this.push(46)}invokeStatic(e){this.pushOther(e),this.push(46),this.pushMachine(49)}pushOther(e){this.push(12,this.other(e))}other(e){return this.constants.other(e)}}const ci={},pi=0,di=Object.freeze([])
class mi{constructor(){this.strings=[],this.arrays=[di],this.tables=[],this.handles=[],this.resolved=[],this.numbers=[]}string(e){let t=this.strings.indexOf(e)
return t>-1?t:this.strings.push(e)-1}stringArray(e){let t=new Array(e.length)
for(let s=0;s<e.length;s++)t[s]=this.string(e[s])
return this.array(t)}array(e){if(0===e.length)return pi
let t=this.arrays.indexOf(e)
return t>-1?t:this.arrays.push(e)-1}handle(e){let t=this.handles.indexOf(e)
return t>-1?t:(this.resolved.push(ci),this.handles.push(e)-1)}serializable(e){let t=JSON.stringify(e),s=this.strings.indexOf(t)
return s>-1?s:this.strings.push(t)-1}number(e){let t=this.numbers.indexOf(e)
return t>-1?t:this.numbers.push(e)-1}toPool(){return{strings:this.strings,arrays:this.arrays,handles:this.handles,numbers:this.numbers}}}class gi extends mi{constructor(e,t){super(),this.resolver=e,t&&(this.strings=t.strings,this.arrays=t.arrays,this.handles=t.handles,this.resolved=this.handles.map(()=>ci),this.numbers=t.numbers)}getNumber(e){return this.numbers[e]}getString(e){return this.strings[e]}getStringArray(e){let t=this.getArray(e),s=new Array(t.length)
for(let i=0;i<t.length;i++){let e=t[i]
s[i]=this.getString(e)}return s}getArray(e){return this.arrays[e]}resolveHandle(e){let t=this.resolved[e]
if(t===ci){let s=this.handles[e]
t=this.resolved[e]=this.resolver.resolve(s)}return t}getSerializable(e){return JSON.parse(this.strings[e])}}class fi extends gi{constructor(){super(...arguments),this.others=[],this.serializables=[]}serializable(e){let t=this.serializables.indexOf(e)
return t>-1?t:this.serializables.push(e)-1}getSerializable(e){return this.serializables[e]}getOther(e){return this.others[e-1]}other(e){return this.others.push(e)}}class bi{constructor(e){this.heap=e,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get isMachine(){return 1024&this.heap.getbyaddr(this.offset)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}function yi(e,t,s){return e|t<<16|s<<30}function vi(e,t){return e|t<<30}const ki=1048576
class wi{constructor(e){if(this.placeholders=[],this.offset=0,this.handle=0,this.capacity=ki,e){let t=e.buffer,s=e.table,i=e.handle
this.heap=new Uint16Array(t),this.table=s,this.offset=this.heap.length,this.handle=i,this.capacity=0}else this.heap=new Uint16Array(ki),this.table=[]}push(e){this.sizeCheck(),this.heap[this.offset++]=e}sizeCheck(){if(0===this.capacity){let e=Ci(this.heap,0,this.offset)
this.heap=new Uint16Array(e.length+ki),this.heap.set(e,0),this.capacity=ki}this.capacity--}getbyaddr(e){return this.heap[e]}setbyaddr(e,t){this.heap[e]=t}malloc(){this.table.push(this.offset,0)
let e=this.handle
return this.handle+=2,e}finishMalloc(e,t){let s=this.table[e],i=yi(this.offset-s,t,0)
this.table[e+1]=i}size(){return this.offset}getaddr(e){return this.table[e]}gethandle(e){this.table.push(e,yi(0,0,3))
let t=this.handle
return this.handle+=2,t}sizeof(e){return-1}scopesizeof(e){return(1073676288&this.table[e+1])>>16}free(e){let t=this.table[e+1]
this.table[e+1]=vi(t,1)}compact(){let e=0,t=this.table,s=this.table.length,i=this.heap
for(let n=0;n<s;n+=2){let s=t[n],r=t[n+1],a=65535&r,l=-1&r
if(2!==l)if(1===l)t[n+1]=vi(r,2),e+=a
else if(0===l){for(let t=s;t<=n+a;t++)i[t-e]=i[t]
t[n]=s-e}else 3===l&&(t[n]=s-e)}this.offset=this.offset-e}pushPlaceholder(e){this.sizeCheck()
let t=this.offset++
this.heap[t]=65535,this.placeholders.push([t,e])}patchPlaceholders(){let e=this.placeholders
for(let s=0;s<e.length;s++){var t=e[s]
let i=t[0],n=t[1]
this.setbyaddr(i,n())}}capture(e=this.offset){this.patchPlaceholders()
let t=Ci(this.heap,0,e).buffer
return{handle:this.handle,table:this.table,buffer:t}}}class Si{constructor(e=new mi,t=new wi){this.constants=e,this.heap=t,this._opcode=new bi(this.heap)}opcode(e){return this._opcode.offset=e,this._opcode}}class _i extends Si{}function Ci(e,t,s){if(void 0!==e.slice)return e.slice(t,s)
let i=new Uint16Array(s)
for(;t<s;t++)i[t]=e[t]
return i}class Ei extends ii{constructor(e,t,s){let i=new fi(t)
super(s,new _i(i),e)}builderFor(e){return new ui(this,e)}}let xi=0
class Ai{constructor(e,t){this.compiler=e,this.parsedLayout=t,this.layout=null,this.partial=null,this.wrappedLayout=null
let s=t.block
this.symbols=s.symbols,this.hasEval=s.hasEval,this.referrer=t.referrer,this.id=t.id||`client-${xi++}`}asLayout(){return this.layout?this.layout:this.layout=new Zs(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!1}))}asPartial(){return this.partial?this.partial:this.layout=new Zs(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!0}))}asWrappedLayout(){return this.wrappedLayout?this.wrappedLayout:this.wrappedLayout=new ni(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!1}))}}class Ni{constructor(e){this.owner=e,this.handleLookup=[],this.cache={component:new Ps,template:new Ps,compiledTemplate:new Ps,helper:new Ps,manager:new Ps,modifier:new Ps}}lookup(e,t,s){return this.cache[e].hasName(t)?this.cache[e].getHandle(t):null}register(e,t,s){let i=this.cache[e],n=this.handleLookup.length
return this.handleLookup.push(i),this.cache[e].register(n,t,s),n}lookupModifier(e,t){let s=this.lookup("modifier",e)
if(null===s)throw new Error(`Modifier for ${e} not found.`)
return s}compileTemplate(e,t){if(!this.cache.compiledTemplate.hasName(e)){let s=this.resolve(t),i=JSON.parse(s.block),n=new Zs(this.compiler,{block:i,referrer:s.meta,asPartial:!1}),r={handle:n.compile(),symbolTable:n.symbolTable}
return this.register("compiledTemplate",e,r),r}let s=this.lookup("compiledTemplate",e)
return this.resolve(s)}registerHelper(e,t){return this.register("helper",e,(e,s)=>new zs(t,s))}registerInternalHelper(e,t){this.register("helper",e,t)}registerComponent(e,t,s,i){let n=this.registerTemplate(t,i),r=this.managerFor(n.meta.managerId),a=new te(e,r,s,n.handle)
return this.register("component",e,a)}lookupComponentHandle(e,t){return this.cache.component.hasName(e)||this.lookupComponentDefinition(e,t),this.lookup("component",e,t)}managerFor(e="main"){let t
if(this.cache.manager.hasName(e)){let t=this.cache.manager.getHandle(e)
return this.cache.manager.getByHandle(t)}{let s=this.owner.rootName
if(!(t=this.owner.lookup(`component-manager:/${s}/component-managers/${e}`)))throw new Error(`No component manager found for ID ${e}.`)
return this.register("manager",e,t),t}}registerTemplate(e,t){return{name:e,handle:this.register("template",e,t),meta:t.meta}}lookupComponentDefinition(e,t){let s
if(this.cache.component.hasName(e))s=this.lookup("component",e,t)
else{let i=function(e,t){if(null==e)throw new Error(t)
return e}(this.identifyComponent(e,t),`Could not find the component '${e}'`),n=this.owner.lookup("template",i),r=this.owner.identify("component",i),a=null
void 0!==r&&(a=this.owner.factoryFor(r)),s=this.registerComponent(e,i,a,n)}return this.resolve(s)}lookupHelper(e,t){if(!this.cache.helper.hasName(e)){let s=this.owner,i=`helper:${e}`,n=t.specifier,r=s.identify(i,n)
if(void 0===r)return null
let a=this.owner.lookup(r,t.specifier)
return this.registerHelper(e,a)}return this.lookup("helper",e,t)}lookupPartial(e,t){throw new Error("Partials are not available in Glimmer applications.")}resolve(e){return this.handleLookup[e].getByHandle(e)}identifyComponent(e,t){let s=this.owner,i=`template:${e}`,n=t.specifier,r=s.identify(i,n)
if(void 0===r&&s.identify(`component:${e}`,n))throw new Error(`The component '${e}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return r}}var Oi={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
function Ti(e,t){let s=e.getSelf(),i=t.capture(),n=i.positional.at(0).value()
return"function"!=typeof n&&function(e,t){let s=function(e){let t,s,i=""
if(null==e)return i
"parent"in e&&"property"in e?(t=e.parent.value(),s=e.property):"_parentValue"in e&&"_propertyKey"in e&&(t=e._parentValue,s=e._propertyKey)
void 0!==s&&(i+=`('${s}' on ${function(e){let t=typeof e
if(null==e)return t
if("number"===t||"boolean"===t)return e.toString()
if(e.debugName)return e.debugName
try{return JSON.stringify(e)}catch(s){}return e.toString()}(t)}) `)
return i}(t)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${s}was ${typeof e} instead of a function.`)}(n,i.positional.at(0)),new vs(function(...e){let t=i.positional.value()
t.shift(),t.push(...e),n.apply(s&&s.value(),t)})}function Bi(e){return e[0]?e[1]:e[2]}class Li{constructor(e){this.resolver=e}getComponentDefinition(e){let s=this.resolver.resolve(e)
return t(!!s,`Couldn't find a template for ${e}`),s}getCapabilities(e){let t=this.getComponentDefinition(e),s=t.manager,i=t.state
return s.getCapabilities(i)}getLayout(e){let t=this.getComponentDefinition(e),s=t.manager.getLayout(t,this.resolver)
return{compile:()=>s.handle,symbolTable:s.symbolTable}}lookupHelper(e,t){return this.resolver.lookupHelper(e,t)}lookupModifier(e,t){return this.resolver.lookupModifier(e,t)}lookupComponentDefinition(e,t){return this.resolver.lookupComponentHandle(e,t)}lookupPartial(e,t){return this.resolver.lookupPartial(e,t)}}class Mi{constructor(e){this.resolver=e}async getTemplateIterator(e,t,s,n,r){let a=new Ni(e),l=new Li(a),o=new Ks,h=new Ei(l,a,o),u=h.program
a.compiler=h,a.registerTemplate("main",Oi),a.registerInternalHelper("action",Ti),a.registerHelper("if",Bi)
let c=function({id:e,meta:t,block:s}){let n,r=e||`client-${xi++}`
return{id:r,meta:t,create:(e,a)=>{let l=a?i({},a,t):t
return n||(n=JSON.parse(s)),new Ai(e,{id:r,block:n,referrer:l})}}}(Oi).create(h)
return Promise.resolve(function(e,t,s,i,n,r){let a=cs.initial(e,t,s,i,n,r)
return new ps(a)}(u,t,r,n,s,c.asLayout().compile()))}}class Ri{constructor({element:e,nextSibling:t=null}){this.cursor={element:e,nextSibling:t}}getBuilder(e){return function(e,t){return Pt.forInitialRender(e,t)}(e,this.cursor)}}class Di{render(e){let t
do{t=e.next()}while(!t.done)
this.result=t.value}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}function Ii(e){return void 0!==e.rootName&&void 0!==e.collection&&void 0!==e.name&&void 0!==e.type}function Fi(e){let t=e.type,s=function(e){let t=[]
e.rootName&&t.push(e.rootName)
e.collection&&t.push(e.collection)
e.namespace&&t.push(e.namespace)
e.name&&t.push(e.name)
if(t.length>0){let s=t.join("/")
return Ii(e)&&(s="/"+s),s}}(e)
return s?t+":"+s:t}function Pi(e){let t={}
if(e.indexOf(":")>-1){let s,i=e.split(":"),n=i[0],r=i[1]
t.type=n,0===r.indexOf("/")?(s=r.substr(1).split("/"),r.substr(1).startsWith("@")?t.rootName=s.shift()+"/"+s.shift():t.rootName=s.shift(),t.collection=s.shift()):s=r.split("/"),s.length>0&&(t.name=s.pop(),s.length>0&&(t.namespace=s.join("/")))}else t.type=e
return t}function zi(e,t){if(!t)throw new Error("Assertion Failed: "+e)}class ji{constructor(e,t){this.config=e,this.registry=t}identify(e,t){if(function(e){let t=e.split(":"),s=t[0],i=t[1]
return!!(s&&i&&0===i.indexOf("/")&&i.split("/").length>3)}(e))return e
let s,i=Pi(e)
if(t){let e=Pi(t)
if(Ii(e)){zi("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===i.rootName&&void 0===i.collection&&void 0===i.namespace),i.rootName=e.rootName,i.collection=e.collection
let t=this._definitiveCollection(i.type)
if(!i.name)return i.namespace=e.namespace,i.name=e.name,this._serializeAndVerify(i)
if(i.namespace=e.namespace?e.namespace+"/"+e.name:e.name,function(e){let t=e.namespace,s=e.collection,i=t.lastIndexOf("/-")
if(i>-1){i+=2
let e=t.indexOf("/",i)
s=t.slice(i,e>-1?e:void 0)}return s}(i)===t&&(s=this._serializeAndVerify(i)))return s
if(t&&(i.namespace+="/-"+t,s=this._serializeAndVerify(i)))return s
i.rootName=i.collection=i.namespace=void 0}else zi('Referrer must either be "absolute" or include a `type` to determine the associated type',e.type),i.collection=this._definitiveCollection(e.type),i.namespace||(i.namespace=e.rootName),zi(`'${e.type}' does not have a definitive collection`,i.collection)}if(i.collection||(i.collection=this._definitiveCollection(i.type),zi(`'${i.type}' does not have a definitive collection`,i.collection)),!i.rootName){if(i.rootName=this.config.app.rootName||"app",s=this._serializeAndVerify(i))return s
i.namespace?(i.rootName=i.namespace,i.namespace=void 0):(i.rootName=i.name,i.name="main")}return(s=this._serializeAndVerify(i))?s:void 0}retrieve(e){return this.registry.get(e)}resolve(e,t){let s=this.identify(e,t)
if(s)return this.retrieve(s)}_definitiveCollection(e){let t=this.config.types[e]
return zi(`'${e}' is not a recognized type`,t),t.definitiveCollection}_serializeAndVerify(e){let t=Fi(e)
if(this.registry.has(t))return t}}class Hi{constructor(e={}){this._entries=e}has(e){return e in this._entries}get(e){return this._entries[e]}}class Vi extends Z{constructor(){super(...arguments),this.messages=[]}didInsertElement(){this.element.addEventListener("got-messages",this.gotMessages.bind(this),!1)}gotMessages(e){this.updateMessages(e.detail)}addMessage(){const e=this.element.querySelector("input").value
if(e){const t=this.messages.slice()
t.push(e),this.updateMessages(t)}}updateMessages(e){this.messages=e,this.element.messages=e}}(function(e,t,s,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,i)
else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(r<3?n(a):r>3?n(t,s,a):n(t,s))||a)
r>3&&a&&Object.defineProperty(t,s,a)})([function(...e){let t=e[0],s=e[1],i=e[2]
if(i)return function(e,t,s){let i=W(e)
i.trackedProperties[t]=!0,i.trackedComputedProperties[t]=!0
let n=s.get,r=s.set
return{enumerable:!0,configurable:!1,get:function(){let e=U,s=U=new V,i=n.call(this)
U=e
let r=s.combine()
return U&&U.add(r),W(this).updatableTagFor(t).inner.update(r),i},set:r?function(){K.inner.dirty(),W(this).updatableTagFor(t).inner.update(C.create()),r.apply(this,arguments)}:void 0}}(t,s,i);(function(e,t){let s=Symbol(t)
W(e).trackedProperties[t]=!0,Object.defineProperty(e,t,{configurable:!0,get(){return $(this,t),this[s]},set(e){K.inner.dirty(),W(this).updatableTagFor(t).inner.update(C.create()),this[s]=e,J()}})})(t,s)}],Vi.prototype,"messages",void 0)
var Ui={"component:/my-app/components/MyApp":Vi,"template:/my-app/components/MyApp":{id:"BkWjsgCY",block:'{"symbols":[],"statements":[[6,"div"],[10,"class","my-app"],[8],[0,"\\n    "],[5,"MyAppChild",[],[["@messages","@addMessage"],[[21,0,["messages"]],[26,"action",[[22,["addMessage"]]],null]]],{"statements":[[0,"\\n    "]],"parameters":[]}],[0,"\\n"],[9]],"hasEval":false}',meta:{specifier:"template:/my-app/components/MyApp"}},"component:/my-app/components/MyAppChild":class extends Z{},"template:/my-app/components/MyAppChild":{id:"6rjz2uG2",block:'{"symbols":["message","@messages","@addMessage"],"statements":[[6,"div"],[8],[0,"\\n    "],[6,"ul"],[8],[0,"\\n"],[4,"each",[[21,2,[]]],[["key"],["@index"]],{"statements":[[0,"            "],[6,"li"],[8],[1,[21,1,[]],false],[9],[0,"\\n"]],"parameters":[1]},null],[0,"    "],[9],[0,"\\n    "],[6,"input"],[10,"type","text"],[8],[9],[0,"\\n    "],[6,"button"],[11,"onclick",[26,"action",[[21,3,[]]],null]],[8],[0,"Add message"],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{specifier:"template:/my-app/components/MyAppChild"}}},$i={app:{name:"my-app",rootName:"my-app"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
const Gi=new class extends Fs{constructor(){let e=new Hi(Ui),t=new ji($i,e)
const s=document.body
super({builder:new Ri({element:s,nextSibling:null}),loader:new Mi(t),renderer:new Di,resolver:t,rootName:$i.app.rootName})}},Yi=document.querySelector("floor-plan")
Yi.attachShadow({mode:"open"})
customElements.define("floor-plan",class extends HTMLElement{set messages(e){this.myApp||(this.myApp=this.shadowRoot.querySelector(".my-app")),this.myApp.dispatchEvent(new CustomEvent("got-messages",{detail:e}))}get messages(){return this.myApp||(this.myApp=this.shadowRoot.querySelector(".my-app")),this.myApp.messages}connectedCallback(){fetch("./app-34991e92b03fd6748ce94f4dfe42cd40.css",{mode:"no-cors"}).then(e=>e.text()).then(e=>{const t=document.createElement("style")
t.innerHTML=e,this.shadowRoot.appendChild(t)})}}),J=(()=>{Gi.scheduleRerender()}),Gi.registerInitializer({initialize(e){e.register(`component-manager:/${Gi.rootName}/component-managers/main`,Ss)}}),Gi.renderComponent("MyApp",Yi.shadowRoot,null),Gi.boot()})
