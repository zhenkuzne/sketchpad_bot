!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define([],i):"object"==typeof exports?exports["responsive-sketchpad"]=i():t.Sketchpad=i()}(self,(()=>(()=>{"use strict";var t={};return(()=>{var i=t,e=function(){function t(t,i){if(this.sketching=!1,this._strokes=[],this.undoneStrokes=[],this.readOnly=!1,this.aspectRatio=1,this.lineWidth=5,this.lineColor="#000",this.lineCap="round",this.lineJoin="round",this.lineMiterLimit=10,null==t)throw new Error("Must pass in a container element");null!=i&&this.setOptions(i),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d");var e=(null==i?void 0:i.width)||t.clientWidth,n=(null==i?void 0:i.height)||e*this.aspectRatio;this.setCanvasSize(e,n),t.appendChild(this.canvas),this._strokes.length>0&&this.redraw(),this.listen()}return Object.defineProperty(t.prototype,"strokes",{get:function(){return this._strokes.map((function(t){return t.toObj()}))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"undos",{get:function(){return this.undoneStrokes.map((function(t){return t.toObj()}))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"opts",{get:function(){return{backgroundColor:this.backgroundColor,readOnly:this.readOnly,width:this.canvas.width,height:this.canvas.height,aspectRatio:this.canvas.width/this.canvas.height,line:{size:this.lineWidth,color:this.lineColor,cap:this.lineCap,join:this.lineJoin,miterLimit:this.lineMiterLimit}}},enumerable:!1,configurable:!0}),t.prototype.toJSON=function(){return{aspectRatio:this.canvas.width/this.canvas.height,strokes:this.strokes}},t.prototype.loadJSON=function(t){var i=t.strokes||[];this._strokes=i.map((function(t){return s.fromObj(t)})),this.redraw()},t.prototype.toDataURL=function(t){return this.canvas.toDataURL(t)},t.prototype.setCanvasSize=function(t,i){this.canvas.setAttribute("width",t.toString()),this.canvas.setAttribute("height",i.toString()),this.canvas.style.width=t+"px",this.canvas.style.height=i+"px"},t.prototype.getCanvasSize=function(){return{width:this.canvas.width,height:this.canvas.height}},t.prototype.setLineWidth=function(t){this.lineWidth=t},t.prototype.setLineSize=function(t){this.lineWidth=t},t.prototype.setLineColor=function(t){this.lineColor=t},t.prototype.setReadOnly=function(t){this.readOnly=t},t.prototype.undo=function(){0!==this._strokes.length&&(this.undoneStrokes.push(this._strokes.pop()),this.redraw())},t.prototype.redo=function(){0!==this.undoneStrokes.length&&(this._strokes.push(this.undoneStrokes.pop()),this.redraw())},t.prototype.clear=function(){this.undoneStrokes=[],this._strokes=[],this.redraw()},t.prototype.drawLine=function(t,i,e){this.setOptions({line:e}),t=this.getPointRelativeToCanvas(new o(t.x,t.y)),i=this.getPointRelativeToCanvas(new o(i.x,i.y)),this.pushStroke([t,i]),this.redraw()},t.prototype.resize=function(t){var i=t*this.aspectRatio;this.lineWidth=this.lineWidth*(t/this.canvas.width),this.setCanvasSize(t,i),this.redraw()},t.prototype.getPointRelativeToCanvas=function(t){return{x:t.x/this.canvas.width,y:t.y/this.canvas.height}},t.prototype.getLineSizeRelativeToCanvas=function(t){return t/this.canvas.width},t.prototype.setOptions=function(t){var i,e,n,o,r,a;t.backgroundColor&&(this.backgroundColor=t.backgroundColor),(null===(i=t.line)||void 0===i?void 0:i.size)&&(this.lineWidth=t.line.size),(null===(e=t.line)||void 0===e?void 0:e.cap)&&(this.lineCap=t.line.cap),(null===(n=t.line)||void 0===n?void 0:n.join)&&(this.lineJoin=t.line.join),(null===(o=t.line)||void 0===o?void 0:o.miterLimit)&&(this.lineMiterLimit=t.line.miterLimit),t.aspectRatio&&(this.aspectRatio=t.aspectRatio),t.data&&(this._strokes=null!==(a=null===(r=t.data.strokes)||void 0===r?void 0:r.map((function(t){return s.fromObj(t)})))&&void 0!==a?a:[]),t.onDrawEnd&&(this.onDrawEnd=t.onDrawEnd)},t.prototype.getCursorRelativeToCanvas=function(t){var i,e=this.canvas.getBoundingClientRect();if(n(t)){var s=t;i=new o(s.touches[0].clientX-e.left,s.touches[0].clientY-e.top)}else{var r=t;i=new o(r.clientX-e.left,r.clientY-e.top)}return new o(i.x/this.canvas.width,i.y/this.canvas.height)},t.prototype.normalizePoint=function(t){return new o(t.x*this.canvas.width,t.y*this.canvas.height)},t.prototype.getLineWidthRelativeToCanvas=function(t){return t/this.canvas.width},t.prototype.normalizeLineWidth=function(t){return t*this.canvas.width},t.prototype.clearCanvas=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.backgroundColor&&(this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height))},t.prototype.drawStroke=function(t){if(null!=t.points){this.ctx.beginPath();for(var i=0;i<t.points.length-1;i++){var e=this.normalizePoint(t.points[i]),n=this.normalizePoint(t.points[i+1]);this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(n.x,n.y)}this.ctx.closePath(),t.color&&(this.ctx.strokeStyle=t.color),t.width&&(this.ctx.lineWidth=this.normalizeLineWidth(t.width)),t.join&&(this.ctx.lineJoin=t.join),t.cap&&(this.ctx.lineCap=t.cap),t.miterLimit&&(this.ctx.miterLimit=t.miterLimit),this.ctx.stroke()}},t.prototype.pushStroke=function(t){this._strokes.push(s.fromObj({points:t,size:this.getLineWidthRelativeToCanvas(this.lineWidth),color:this.lineColor,cap:this.lineCap,join:this.lineJoin,miterLimit:this.lineMiterLimit}))},t.prototype.pushPoint=function(t){var i=this._strokes[this._strokes.length-1];i.points&&i.points.push(t)},t.prototype.redraw=function(){var t=this;this.clearCanvas(),this._strokes.forEach((function(i){return t.drawStroke(i)}))},t.prototype.listen=function(){var t=this;["mousedown","touchstart"].forEach((function(i){return t.canvas.addEventListener(i,(function(i){return t.startStrokeHandler(i)}))})),["mousemove","touchmove"].forEach((function(i){return t.canvas.addEventListener(i,(function(i){return t.drawStrokeHandler(i)}))})),["mouseup","mouseleave","touchend"].forEach((function(i){return t.canvas.addEventListener(i,(function(i){return t.endStrokeHandler(i)}))}))},t.prototype.startStrokeHandler=function(t){if(t.preventDefault(),!this.readOnly){this.sketching=!0;var i=this.getCursorRelativeToCanvas(t);this.pushStroke([i]),this.redraw()}},t.prototype.drawStrokeHandler=function(t){if(t.preventDefault(),this.sketching){var i=this.getCursorRelativeToCanvas(t);this.pushPoint(i),this.redraw()}},t.prototype.endStrokeHandler=function(t){if(t.preventDefault(),this.sketching&&(this.sketching=!1,!n(t))){var i=this.getCursorRelativeToCanvas(t);this.pushPoint(i),this.redraw(),this.onDrawEnd&&this.onDrawEnd()}},t}();function n(t){return-1!==t.type.indexOf("touch")}i.default=e;var o=function(t,i){this.x=t,this.y=i},s=function(){function t(){}return t.fromObj=function(i){var e=new t;return e.points=i.points,e.width=i.size,e.color=i.color,e.cap=i.cap,e.join=i.join,e.miterLimit=i.miterLimit,e},t.prototype.toObj=function(){return{points:this.points,size:this.width,color:this.color,cap:this.cap,join:this.join,miterLimit:this.miterLimit}},t}()})(),t.default})()));
