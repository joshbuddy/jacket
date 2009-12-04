// THIS FILE HAS BEEN MINIFIED

if(typeof(RGraph) == 'undefined') RGraph = {};RGraph.Line = function (id)
{
this.id = id;this.canvas = document.getElementById(id);this.context = this.canvas.getContext ? this.canvas.getContext("2d") : null;this.canvas.__object__ = this;this.type = 'line';this.max = 0;this.coords = [];this.hasnegativevalues = false;this.properties = [];this.properties['chart.background.barcolor1'] = 'rgba(0,0,0,0)';this.properties['chart.background.barcolor2'] = 'rgba(0,0,0,0)';this.properties['chart.background.grid'] = 1;this.properties['chart.background.grid.width'] = 1;this.properties['chart.background.grid.hsize'] = 25;this.properties['chart.background.grid.vsize'] = 25;this.properties['chart.background.grid.color'] = '#ddd';this.properties['chart.background.grid.vlines'] = true;this.properties['chart.background.grid.hlines'] = true;this.properties['chart.background.grid.border'] = true;this.properties['chart.background.hbars'] = null;this.properties['chart.labels'] = null;this.properties['chart.labels.ingraph'] = null;this.properties['chart.xtickgap'] = 20;this.properties['chart.smallxticks'] = 3;this.properties['chart.largexticks'] = 5;this.properties['chart.ytickgap'] = 20;this.properties['chart.smallyticks'] = 3;this.properties['chart.largeyticks'] = 5;this.properties['chart.linewidth'] = 1;this.properties['chart.colors'] = ['#f00', '#0f0', '#00f', '#f0f', '#ff0', '#0ff'];this.properties['chart.border.color'] = '#090';this.properties['chart.hmargin'] = 0;this.properties['chart.tickmarks.dot.color'] = 'white';this.properties['chart.tickmarks'] = null;this.properties['chart.ticksize'] = 3;this.properties['chart.gutter'] = 25;this.properties['chart.tickdirection'] = -1;this.properties['chart.yaxispoints'] = 5;this.properties['chart.fillstyle'] = null;this.properties['chart.xaxispos'] = 'bottom';this.properties['chart.yaxispos'] = 'left';this.properties['chart.xticks'] = null;this.properties['chart.text.size'] = 10;this.properties['chart.text.angle'] = 0;this.properties['chart.text.color'] = 'black';this.properties['chart.text.font'] = 'Verdana';this.properties['chart.ymax'] = null;this.properties['chart.title'] = '';this.properties['chart.title.vpos'] = null;this.properties['chart.shadow'] = false;this.properties['chart.shadow.offsetx'] = 2;this.properties['chart.shadow.offsety'] = 2;this.properties['chart.shadow.blur'] = 3;this.properties['chart.shadow.color'] = 'rgba(0,0,0,0.5)';this.properties['chart.tooltips'] = null;this.properties['chart.tooltip.effect'] = 'fade';this.properties['chart.stepped'] = false;this.properties['chart.key'] = [];this.properties['chart.key.background'] = '#fff';this.properties['chart.key.position'] = 'graph';this.properties['chart.key.shadow'] = false;this.properties['chart.contextmenu'] = null;this.properties['chart.ylabels'] = true;this.properties['chart.noaxes'] = false;this.properties['chart.noxaxis'] = false;this.properties['chart.noendxtick'] = false;this.properties['chart.units.post'] = '';this.properties['chart.units.pre'] = '';this.properties['chart.scale.decimals'] = 0;this.properties['chart.crosshairs'] = false;this.properties['chart.crosshairs.color'] = '#333';this.properties['chart.annotatable'] = false;this.properties['chart.annotate.color'] = '#000';this.properties['chart.axesontop'] = false;this.properties['chart.filled.range'] = false;this.properties['chart.variant'] = null;this.properties['chart.axis.color'] = 'black';this.properties['chart.zoom.factor'] = 1.5;this.properties['chart.zoom.fade.in'] = true;this.properties['chart.zoom.fade.out'] = true;this.properties['chart.zoom.hdir'] = 'right';this.properties['chart.zoom.vdir'] = 'down';this.properties['chart.zoom.frames'] = 15;this.properties['chart.zoom.delay'] = 33;this.properties['chart.zoom.shadow'] = true;this.properties['chart.zoom.mode'] = 'canvas';this.properties['chart.zoom.thumbnail.width'] = 75;this.properties['chart.zoom.thumbnail.height'] = 75;for (var i=1; i<arguments.length; ++i){
if(typeof(arguments[i]) == 'null' || !arguments[i]){
arguments[i] = [];}
}
if(typeof(RGraph) == 'undefined'){
alert('[LINE] Fatal error: The common library does not appear to have been included');}
this.original_data = [];for (var i=1; i<arguments.length; ++i){
this.original_data[i - 1] = RGraph.array_clone(arguments[i]);}
if(!this.canvas){
alert('[LINE] Fatal error: no canvas support');return;}
}
RGraph.Line.prototype.Set = function (name, value)
{
if(name == 'chart.tooltips'){
this.properties['chart.tooltips'] = [];for (var i=1; i<arguments.length; i++){
for (j=0; j<arguments[i].length; j++){
this.Get('chart.tooltips').push(arguments[i][j]);}
}
}
this.properties[name] = value;}
RGraph.Line.prototype.Get = function (name)
{
return this.properties[name];}
RGraph.Line.prototype.Draw = function ()
{
this.data = RGraph.array_clone(this.original_data);this.max = 0;this.data = RGraph.array_reverse(this.data);if(this.Get('chart.filled') && !this.Get('chart.filled.range') && this.data.length > 1){
var accumulation = [];for (var set=0; set<this.data.length; ++set){
for (var point=0; point<this.data[set].length; ++point){
this.data[set][point] = Number(accumulation[point] ? accumulation[point] : 0) + this.data[set][point];accumulation[point] = this.data[set][point];}
}
}
if(this.Get('chart.ymax')){
this.max = this.Get('chart.ymax');this.scale = [
(this.max * (1/5)).toFixed(this.Get('chart.scale.decimals')),
(this.max * (2/5)).toFixed(this.Get('chart.scale.decimals')),
(this.max * (3/5)).toFixed(this.Get('chart.scale.decimals')),
(this.max * (4/5)).toFixed(this.Get('chart.scale.decimals')),
this.max.toFixed(this.Get('chart.scale.decimals'))
];} else {
for (dataset=0; dataset<this.data.length; ++dataset){
for (var datapoint=0; datapoint<this.data[dataset].length; datapoint++){
this.max = Math.max(this.max, this.data[dataset][datapoint] ? Math.abs(parseFloat(this.data[dataset][datapoint])) : 0);this.hasnegativevalues = (this.data[dataset][datapoint] < 0);}
}
this.scale = RGraph.getScale(Math.abs(parseFloat(this.max)));this.max = this.scale[4] ? this.scale[4] : 0;if(this.Get('chart.scale.decimals')){
this.scale[0] = Number(this.scale[0]).toFixed(this.Get('chart.scale.decimals'));this.scale[1] = Number(this.scale[1]).toFixed(this.Get('chart.scale.decimals'));this.scale[2] = Number(this.scale[2]).toFixed(this.Get('chart.scale.decimals'));this.scale[3] = Number(this.scale[3]).toFixed(this.Get('chart.scale.decimals'));this.scale[4] = Number(this.scale[4]).toFixed(this.Get('chart.scale.decimals'));}
}
RGraph.ShowContext(this);this.coords = [];this.grapharea = this.canvas.height - ( (2 * this.Get('chart.gutter')));this.halfgrapharea = this.grapharea / 2;this.halfTextHeight = this.Get('chart.text.size') / 2;if(this.Get('chart.xaxispos') == 'bottom' && this.hasnegativevalues){
alert('[LINE] You have negative values and the X axis is at the bottom. This is not good...');}
this.canvas.style.border = this.Get('chart.border.color');if(this.Get('chart.variant') == '3d'){
RGraph.Draw3DAxes(this);}
RGraph.background.Draw(this);if(this.Get('chart.background.hbars') && this.Get('chart.background.hbars').length > 0){
RGraph.DrawBars(this);}
this.DrawAxes();for (var i=(this.data.length - 1), j=0; i>=0; i--, j++){
this.context.beginPath();if(this.Get('chart.shadow') && !this.Get('chart.filled')){
this.context.shadowColor = this.Get('chart.shadow.color');this.context.shadowBlur = this.Get('chart.shadow.blur');this.context.shadowOffsetX = this.Get('chart.shadow.offsetx');this.context.shadowOffsetY = this.Get('chart.shadow.offsety');} else if(this.Get('chart.filled') && this.Get('chart.shadow')){
alert('[LINE] Shadows are not permitted when the line is filled');}
if(this.Get('chart.fillstyle')){
if(typeof(this.Get('chart.fillstyle')) == 'object' && this.Get('chart.fillstyle')[j]){
var fill = this.Get('chart.fillstyle')[j];} else if(typeof(this.Get('chart.fillstyle')) == 'string'){
var fill = this.Get('chart.fillstyle');} else {
alert('[LINE] Warning: chart.fillstyle must be either a string or an array with the same number of elements as you have sets of data');}
} else if(this.Get('chart.filled')){
var fill = this.Get('chart.colors')[j];} else {
var fill = null;}
this.DrawLine(this.data[i], this.Get('chart.colors')[j], fill);this.context.stroke();}
this.DrawLabels();this.DrawRange();if(this.Get('chart.key').length){
RGraph.DrawKey(this, this.Get('chart.key'), this.Get('chart.colors'));}
RGraph.DrawInGraphLabels(this);RGraph.DrawCrosshairs(this);RGraph.Annotate(this);if(this.Get('chart.filled') && this.Get('chart.filled.range') && this.data.length == 2){
this.context.beginPath();var len = this.coords.length / 2;this.context.lineWidth = this.Get('chart.linewidth');this.context.strokeStyle = this.Get('chart.colors')[0];for (var i=0; i<len; ++i){
if(i == 0){
this.context.moveTo(this.coords[i][0], this.coords[i][1]);} else {
this.context.lineTo(this.coords[i][0], this.coords[i][1]);}
}
this.context.stroke();this.context.beginPath();if(this.Get('chart.colors')[1]){
this.context.strokeStyle = this.Get('chart.colors')[1];}
for (var i=this.coords.length - 1; i>=len; --i){
if(i == (this.coords.length - 1) ){
this.context.moveTo(this.coords[i][0], this.coords[i][1]);} else {
this.context.lineTo(this.coords[i][0], this.coords[i][1]);}
}
this.context.stroke();} else if(this.Get('chart.filled') && this.Get('chart.filled.range')){
alert('[LINE] You must have only two sets of data for a filled range chart');}
RGraph.ShowZoomWindow(this);}
RGraph.Line.prototype.DrawAxes = function ()
{
var gutter = this.Get('chart.gutter');if(this.Get('chart.noaxes')){
return;}
this.context.shadowColor = 'rgba(0,0,0,0)';this.context.shadowBlur = 0;this.context.shadowOffsetX = 0;this.context.shadowOffsetY = 0;this.context.lineWidth = 1;this.context.strokeStyle = this.Get('chart.axis.color');this.context.beginPath();if(this.Get('chart.noxaxis') == false){
if(this.Get('chart.xaxispos') == 'center'){
this.context.moveTo(gutter, this.grapharea / 2 + gutter);this.context.lineTo(this.canvas.width - gutter, this.grapharea / 2 + gutter);} else {
this.context.moveTo(gutter, this.canvas.height - gutter);this.context.lineTo(this.canvas.width - gutter, this.canvas.height - gutter);}
}
if(this.Get('chart.yaxispos') == 'left'){
this.context.moveTo(gutter, gutter);this.context.lineTo(gutter, this.canvas.height - (gutter) );} else {
this.context.moveTo(this.canvas.width - gutter, gutter);this.context.lineTo(this.canvas.width - gutter, this.canvas.height - gutter );}
if(this.Get('chart.noxaxis') == false){
var xTickInterval = (this.canvas.width - (2 * gutter)) / (this.Get('chart.xticks') ? this.Get('chart.xticks') : this.data[0].length);for (x=gutter + (this.Get('chart.yaxispos') == 'left' ? xTickInterval : 0); x<=(this.canvas.width - gutter + 1 ); x+=xTickInterval){
if(this.Get('chart.yaxispos') == 'right' && x >= (this.canvas.width - gutter - 1) ){
break;}
if(this.Get('chart.noendxtick')){
if(this.Get('chart.yaxispos') == 'left' && x >= (this.canvas.width - this.Get('chart.gutter'))){
break;} else if(this.Get('chart.yaxispos') == 'right' && x == this.Get('chart.gutter')){
continue;}
}
var yStart = this.Get('chart.xaxispos') == 'center' ? (this.canvas.height / 2) - 3 : this.canvas.height - gutter;var yEnd = this.Get('chart.xaxispos') == 'center' ? yStart + 6 : this.canvas.height - gutter - (x % 60 == 0 ? this.Get('chart.largexticks') * this.Get('chart.tickdirection') : this.Get('chart.smallxticks') * this.Get('chart.tickdirection'));this.context.moveTo(x, yStart);this.context.lineTo(x, yEnd);}
}
var counter = 0;var adjustment = 0;if(this.Get('chart.yaxispos') == 'right'){
adjustment = (this.canvas.width - (2 * gutter));}
if(this.Get('chart.xaxispos') == 'center'){
var interval = (this.grapharea / 10);var lineto = (this.Get('chart.yaxispos') == 'left' ? gutter : this.canvas.width - gutter + this.Get('chart.smallyticks'));for (y=gutter; y < (this.grapharea / 2) + gutter; y+=interval){
this.context.moveTo((this.Get('chart.yaxispos') == 'left' ? gutter - this.Get('chart.smallyticks') : this.canvas.width - gutter), y);this.context.lineTo(lineto, y);}
for (y=gutter + (this.halfgrapharea) + interval; y <= this.grapharea + gutter; y+=interval){
this.context.moveTo((this.Get('chart.yaxispos') == 'left' ? gutter - this.Get('chart.smallyticks') : this.canvas.width - gutter), y);this.context.lineTo(lineto, y);}
} else {
var lineto = (this.Get('chart.yaxispos') == 'left' ? gutter - this.Get('chart.smallyticks') : this.canvas.width - gutter + this.Get('chart.smallyticks'));for (y=gutter; y < (this.canvas.height - gutter) && counter < 10; y+=( (this.canvas.height - (2 * gutter)) / 10) ){
this.context.moveTo(gutter + adjustment, y);this.context.lineTo(lineto, y);var counter = counter +1;}
}
this.context.stroke();}
RGraph.Line.prototype.DrawLabels = function ()
{
this.context.fillStyle = this.Get('chart.text.color');this.context.lineWidth = 1;this.context.shadowColor = 'rgba(0,0,0,0)';this.context.shadowBlur = 3;this.context.shadowOffsetX = 3;this.context.shadowOffsetY = 3;if(this.Get('chart.ylabels')){
var gutter = this.Get('chart.gutter');var text_size = this.Get('chart.text.size');var units_pre = this.Get('chart.units.pre');var units_post = this.Get('chart.units.post');var context = this.context;var xpos = this.Get('chart.yaxispos') == 'left' ? gutter - 5 : this.canvas.width - gutter + 5;var align = this.Get('chart.yaxispos') == 'left' ? 'right' : 'left';var font = this.Get('chart.text.font');if(this.Get('chart.xaxispos') == 'center'){
var half = this.grapharea / 2;RGraph.Text(context, font, text_size, xpos, gutter + ( (0/5) * half ) + this.halfTextHeight, RGraph.number_format(this.scale[4], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + ( (1/5) * half ) + this.halfTextHeight, RGraph.number_format(this.scale[3], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + ( (2/5) * half ) + this.halfTextHeight, RGraph.number_format(this.scale[2], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + ( (3/5) * half ) + this.halfTextHeight, RGraph.number_format(this.scale[1], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + ( (4/5) * half ) + this.halfTextHeight, RGraph.number_format(this.scale[0], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + ( (6/5) * half ) + this.halfTextHeight, '-' + RGraph.number_format(this.scale[0], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + ( (7/5) * half ) + this.halfTextHeight, '-' + RGraph.number_format(this.scale[1], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + ( (8/5) * half ) + this.halfTextHeight, '-' + RGraph.number_format(this.scale[2], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + ( (9/5) * half ) + this.halfTextHeight, '-' + RGraph.number_format(this.scale[3], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + ( (10/5) * half ) + this.halfTextHeight, '-' + RGraph.number_format( (this.scale[4] == '1.0' ? '1.0' : this.scale[4]), units_pre, units_post), null, align);} else {
RGraph.Text(context, font, text_size, xpos, gutter + this.halfTextHeight + ((0/5) * (this.canvas.height - (2 * this.Get('chart.gutter')) ) ), RGraph.number_format(this.scale[4], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + this.halfTextHeight + ((1/5) * (this.canvas.height - (2 * this.Get('chart.gutter')) ) ), RGraph.number_format(this.scale[3], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + this.halfTextHeight + ((2/5) * (this.canvas.height - (2 * this.Get('chart.gutter')) ) ), RGraph.number_format(this.scale[2], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + this.halfTextHeight + ((3/5) * (this.canvas.height - (2 * this.Get('chart.gutter')) ) ), RGraph.number_format(this.scale[1], units_pre, units_post), null, align);RGraph.Text(context, font, text_size, xpos, gutter + this.halfTextHeight + ((4/5) * (this.canvas.height - (2 * this.Get('chart.gutter')) ) ), RGraph.number_format(this.scale[0], units_pre, units_post), null, align);}
}
if(this.Get('chart.labels')){
var yOffset = 13;var angle = 0;var valign = null;var halign = 'center';if(this.Get('chart.text.angle') == 45 || this.Get('chart.text.angle') == 90){
angle = -1 * this.Get('chart.text.angle');valign = 'center';halign = 'right';yOffset = 5
}
this.context.fillStyle = this.Get('chart.text.color');for (i=0; i<this.Get('chart.labels').length; ++i){
var labelX = this.coords[i][0];if(this.Get('chart.labels').length != this.data[0].length){
labelX = this.Get('chart.gutter') + this.Get('chart.hmargin') + ((this.canvas.width - (2 * this.Get('chart.gutter')) - (2 * this.Get('chart.hmargin'))) * (i / (this.Get('chart.labels').length - 1)));}
RGraph.Text(context, font,
text_size,
labelX,
(this.canvas.height - gutter) + yOffset,
String(this.Get('chart.labels')[i]),
valign,
halign,
null,
angle);}
}
this.context.stroke();}
RGraph.Line.prototype.DrawLine = function (lineData, color, fill)
{
var penUp = false;var yPos = 0;var xPos = 0;this.context.lineWidth = 1;var lineCoords = [];var xInterval = (this.canvas.width - (2 * this.Get('chart.hmargin')) - ( (2 * this.Get('chart.gutter'))) ) / (lineData.length - 1);for (i=0; i<lineData.length; i++){
yPos = this.canvas.height - ( (lineData[i] / this.max) * ((this.canvas.height - (2 * this.Get('chart.gutter'))) ));if(this.Get('chart.xaxispos') == 'center'){
yPos /= 2;} else if(this.Get('chart.xaxispos') == 'bottom'){
yPos -= this.Get('chart.gutter');}
if(lineData[i] == null){
yPos = null;}
this.context.lineCap = 'round';this.context.lineJoin = 'round';if(i > 0){
xPos = xPos + xInterval;} else {
xPos = this.Get('chart.hmargin') + this.Get('chart.gutter');}
this.coords.push([xPos, yPos]);lineCoords.push([xPos, yPos]);}
this.context.stroke();this.context.beginPath();this.context.fillStyle = fill;this.context.strokeStyle = fill;var isStepped = this.Get('chart.stepped');for (var i=0; i< lineCoords.length; ++i){
xPos = lineCoords[i][0];yPos = lineCoords[i][1];var prevY = (lineCoords[i - 1] ? lineCoords[i - 1][1] : null);var isLast = (i + 1) == lineCoords.length;if(i == 0 || penUp || !yPos || !prevY){
if(this.Get('chart.filled') && !this.Get('chart.filled.range')){
this.context.moveTo(xPos + 1, this.canvas.height - this.Get('chart.gutter') - (this.Get('chart.xaxispos') == 'center' ? (this.canvas.height - (2 * this.Get('chart.gutter'))) / 2 : 0) );this.context.lineTo(xPos + 1, yPos);} else {
this.context.moveTo(xPos, yPos);}
penUp = false;} else {
if(isStepped){
this.context.lineTo(xPos, lineCoords[i - 1][1]);}
if(yPos >= this.Get('chart.gutter') && yPos <= (this.canvas.height - this.Get('chart.gutter'))){
if(isLast && this.Get('chart.filled') && !this.Get('chart.filled.range') && this.Get('chart.yaxispos') == 'right'){
xPos -= 1;}
if(!isStepped || !isLast){
this.context.lineTo(xPos, yPos);}
penUp = false;} else {
penUp = true;}
}
}
if(this.Get('chart.filled') && !this.Get('chart.filled.range')){
var fillStyle = this.Get('chart.fillstyle');this.context.lineTo(xPos, this.canvas.height - this.Get('chart.gutter') - 1 -  + (this.Get('chart.xaxispos') == 'center' ? (this.canvas.height - (2 * this.Get('chart.gutter'))) / 2 : 0));this.context.fillStyle = fillStyle ;this.context.fill();}
this.context.stroke();this.RedrawLine(lineCoords, color);this.context.stroke();if(this.Get('chart.axesontop')){
this.DrawAxes();}
for (var i=0; i<lineCoords.length; ++i){
i = Number(i);if(
(
this.Get('chart.tickmarks') != 'endcircle'

&& this.Get('chart.tickmarks') != 'endsquare'
&& this.Get('chart.tickmarks') != 'filledendsquare'
&& this.Get('chart.tickmarks') != 'endtick'
&& this.Get('chart.tickmarks') != 'arrow'
&& this.Get('chart.tickmarks') != 'filledarrow'
)
|| (i == 0 && this.Get('chart.tickmarks') != 'arrow' && this.Get('chart.tickmarks') != 'filledarrow')
|| i == (lineCoords.length - 1)
){
var prevX = (i <= 0 ? null : lineCoords[i - 1][0]);var prevY = (i <= 0 ? null : lineCoords[i - 1][1]);this.DrawTick(lineCoords[i][0], lineCoords[i][1], color, false, prevX, prevY);if(this.Get('chart.stepped') && lineCoords[i + 1] && this.Get('chart.tickmarks') != 'endsquare' && this.Get('chart.tickmarks') != 'endcircle' && this.Get('chart.tickmarks') != 'endtick'){
this.DrawTick(lineCoords[i + 1][0], lineCoords[i][1], color);}
}
}
this.context.beginPath();this.context.arc(this.canvas.width + 50, this.canvas.height + 50, 2, 0, 6.38, 1);if(this.Get('chart.tooltips') && this.Get('chart.tooltips').length){
RGraph.Register(this);this.canvas.onmousemove = function (e)
{
e = RGraph.FixEventObject(document.all ? event : e);var canvas = e.target;var context = canvas.getContext('2d');var obj = canvas.__object__;RGraph.Register(obj);var mouseCoords = RGraph.getMouseXY(e);var mouseX = mouseCoords[0];var mouseY = mouseCoords[1];for (i=0; i<obj.coords.length; ++i){
var idx = i;var xCoord = obj.coords[i][0];var yCoord = obj.coords[i][1];if(
mouseX <= xCoord + 5

&& mouseX >= xCoord - 5
&& mouseY <= yCoord + 5
&& mouseY >= yCoord - 5
&& obj.Get('chart.tooltips')[i]
){
canvas.style.cursor = document.all ? 'hand' : 'pointer';if(RGraph.Registry.Get('chart.tooltip') && RGraph.Registry.Get('chart.tooltip').__index__ == idx){
return;}
RGraph.Redraw();RGraph.Tooltip(canvas, obj.Get('chart.tooltips')[idx], e.pageX, e.pageY);RGraph.Registry.Get('chart.tooltip').__index__ = Number(idx);context.beginPath();context.moveTo(xCoord, yCoord);context.arc(xCoord, yCoord, 2, 0, 6.28, 0);context.strokeStyle = '#999';context.fillStyle = 'white';context.stroke();context.fill();e.stopPropagation = true;e.cancelBubble = true;return;}
}
canvas.style.cursor = null;}
} else {
this.canvas.onmousemove = null;}
}
RGraph.Line.prototype.DrawTick = function (xPos, yPos, color, isShadow, prevX, prevY)
{
if(yPos == null){
return;}
this.context.beginPath();var offset = 0;this.context.lineWidth = this.Get('chart.linewidth');this.context.strokeStyle = isShadow ? this.Get('chart.shadow.color') : this.context.strokeStyle;this.context.fillStyle = isShadow ? this.Get('chart.shadow.color') : this.context.strokeStyle;if(   this.Get('chart.tickmarks') == 'circle'
|| this.Get('chart.tickmarks') == 'filledcircle'
|| this.Get('chart.tickmarks') == 'endcircle'){
if(this.Get('chart.tickmarks') == 'circle'|| this.Get('chart.tickmarks') == 'filledcircle' || (this.Get('chart.tickmarks') == 'endcircle') ){
this.context.beginPath();this.context.arc(xPos + offset, yPos + offset, this.Get('chart.ticksize'), 0, 360 / (180 / Math.PI), false);if(this.Get('chart.tickmarks') == 'filledcircle'){
this.context.fillStyle = isShadow ? this.Get('chart.shadow.color') : this.context.strokeStyle;} else {
this.context.fillStyle = isShadow ? this.Get('chart.shadow.color') : '#fff';}
this.context.fill();this.context.stroke();}
} else if(this.Get('chart.tickmarks') == 'halftick'){
this.context.beginPath();this.context.moveTo(xPos, yPos);this.context.lineTo(xPos, yPos + this.Get('chart.ticksize'));this.context.stroke();} else if(this.Get('chart.tickmarks') == 'tick'){
this.context.beginPath();this.context.moveTo(xPos, yPos -  this.Get('chart.ticksize'));this.context.lineTo(xPos, yPos + this.Get('chart.ticksize'));this.context.stroke();} else if(this.Get('chart.tickmarks') == 'endtick'){
this.context.beginPath();this.context.moveTo(xPos, yPos -  this.Get('chart.ticksize'));this.context.lineTo(xPos, yPos + this.Get('chart.ticksize'));this.context.stroke();} else if(this.Get('tickmarks') == 'cross'){
this.context.beginPath();this.context.moveTo(xPos - this.Get('chart.ticksize'), yPos - this.Get('chart.ticksize'));this.context.lineTo(xPos + this.Get('chart.ticksize'), yPos + this.Get('chart.ticksize'));this.context.moveTo(xPos + this.Get('chart.ticksize'), yPos - this.Get('chart.ticksize'));this.context.lineTo(xPos - this.Get('chart.ticksize'), yPos + this.Get('chart.ticksize'));this.context.stroke();} else if(this.Get('chart.tickmarks') == 'borderedcircle' || this.Get('chart.tickmarks') == 'dot'){
this.context.lineWidth = 1;this.context.strokeStyle = this.Get('chart.tickmarks.dot.color');this.context.fillStyle = this.Get('chart.tickmarks.dot.color');this.context.beginPath();this.context.arc(xPos, yPos, this.Get('chart.ticksize'), 0, 360 / (180 / Math.PI), false);this.context.closePath();this.context.fill();this.context.stroke();this.context.beginPath();this.context.fillStyle = color;this.context.strokeStyle = color;this.context.arc(xPos, yPos, this.Get('chart.ticksize') - 2, 0, 360 / (180 / Math.PI), false);this.context.closePath();this.context.fill();this.context.stroke();} else if(   this.Get('chart.tickmarks') == 'square'
|| this.Get('chart.tickmarks') == 'filledsquare'
|| (this.Get('chart.tickmarks') == 'endsquare')
|| (this.Get('chart.tickmarks') == 'filledendsquare') ){
this.context.fillStyle = 'white';this.context.strokeStyle = this.context.strokeStyle;this.context.beginPath();this.context.strokeRect(xPos - this.Get('chart.ticksize'), yPos - this.Get('chart.ticksize'), this.Get('chart.ticksize') * 2, this.Get('chart.ticksize') * 2);if(this.Get('chart.tickmarks') == 'filledsquare' || this.Get('chart.tickmarks') == 'filledendsquare'){
this.context.fillStyle = isShadow ? this.Get('chart.shadow.color') : this.context.strokeStyle;this.context.fillRect(xPos - this.Get('chart.ticksize'), yPos - this.Get('chart.ticksize'), this.Get('chart.ticksize') * 2, this.Get('chart.ticksize') * 2);} else if(this.Get('chart.tickmarks') == 'square' || this.Get('chart.tickmarks') == 'endsquare'){
this.context.fillStyle = isShadow ? this.Get('chart.shadow.color') : 'white';this.context.fillRect((xPos - this.Get('chart.ticksize')) + 1, (yPos - this.Get('chart.ticksize')) + 1, (this.Get('chart.ticksize') * 2) - 2, (this.Get('chart.ticksize') * 2) - 2);}
this.context.stroke();this.context.fill();} else if(this.Get('chart.tickmarks') == 'filledarrow'){
var x = Math.abs(xPos - prevX);var y = Math.abs(yPos - prevY);if(yPos < prevY){
var a = Math.atan(x / y) + 1.57;} else {
var a = Math.atan(y / x) + 3.14;}
this.context.beginPath();this.context.moveTo(xPos, yPos);this.context.arc(xPos, yPos, 7, a - 0.5, a + 0.5, false);this.context.closePath();this.context.stroke();this.context.fill();} else if(this.Get('chart.tickmarks') == 'arrow'){
var x = Math.abs(xPos - prevX);var y = Math.abs(yPos - prevY);if(yPos < prevY){
var a = Math.atan(x / y) + 1.57;} else {
var a = Math.atan(y / x) + 3.14;}
this.context.beginPath();this.context.moveTo(xPos, yPos);this.context.arc(xPos, yPos, 7, a - 0.5, a - 0.5, false);this.context.moveTo(xPos, yPos);this.context.arc(xPos, yPos, 7, a + 0.5, a + 0.5, false);this.context.stroke();}
}
RGraph.Line.prototype.DrawRange = function ()
{
if(this.Get('chart.filled.range') && this.Get('chart.filled')){
this.context.beginPath();this.context.fillStyle = this.Get('chart.fillstyle');this.context.strokeStyle = this.Get('chart.fillstyle');this.context.lineWidth = 1;var len = (this.coords.length / 2);for (var i=0; i<len; ++i){
if(i == 0){
this.context.moveTo(this.coords[i][0], this.coords[i][1])
} else {
this.context.lineTo(this.coords[i][0], this.coords[i][1])
}
}
for (var i=this.coords.length - 1; i>=len; --i){
this.context.lineTo(this.coords[i][0], this.coords[i][1])
}
this.context.stroke();this.context.fill();}
}
RGraph.Line.prototype.RedrawLine = function (coords, color)
{
this.context.beginPath();this.context.strokeStyle = color;this.context.lineWidth = this.Get('chart.linewidth');var len = coords.length;var gutter = this.Get('chart.gutter');for (var i=0; i<len; ++i){
var width = this.canvas.width;var height = this.canvas.height;var xPos = coords[i][0];var yPos = coords[i][1];if(i > 0){
var prevX = coords[i - 1][0];var prevY = coords[i - 1][1];}
if(
(i == 0 && coords[i])
|| (yPos < gutter)
|| (yPos > (height - gutter) )
|| (i > 0 && prevX > (width - gutter) )
|| (i > 0 && prevY > (height - gutter) )
){
this.context.moveTo(coords[i][0], coords[i][1]);} else {
if(this.Get('chart.stepped') && i > 0){
this.context.lineTo(coords[i][0], coords[i - 1][1]);}
if(!this.Get('chart.stepped') || i < (coords.length - 1)){
this.context.lineTo(coords[i][0], coords[i][1]);}
}
}
}