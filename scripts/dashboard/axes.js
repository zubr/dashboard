function Axes(){
    this.createLayer = function(dimensions) {
        var axesLayer = new Kinetic.Layer({
            x: dimensions.mainX,
            y: dimensions.marginH,
            width: dimensions.mainW,
            height: dimensions.mainH
        });

        var border = 2;

        var axes = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: dimensions.mainW,
            height: dimensions.mainH,
            fill: '#FFFFF0'
            //stroke: 'black',
            //strokeWidth: 0.1
        });
        axesLayer.add(axes);

        var xFromX = 0;
        var xFromY = dimensions.mainH;
        var xToX = dimensions.mainW;
        var xToY = dimensions.mainH;

        var headLen = 10;   // how long you want the head of the arrow to be, you could calculate this as a fraction of the distance between the points as well.
        var angleX = Math.atan2(xToY-xFromY,xToX-xFromX);

        var x = new Kinetic.Line({
            points: [xFromX, xFromY, xToX, xToY, xToX-headLen*Math.cos(angleX-Math.PI/6),xToY-headLen*Math.sin(angleX-Math.PI/6),xToX, xToY, xToX-headLen*Math.cos(angleX+Math.PI/6),xToY-headLen*Math.sin(angleX+Math.PI/6)],
            strokeWidth:border,
            lineJoin: 'round',
            stroke: '#A0A0A0'
        });

        var yFromX = 0;
        var yFromY = dimensions.mainH;
        var yToX =  0;
        var yToY =  0;

        var angle = Math.atan2(yToY-yFromY,yToX-yFromX);
        var y = new Kinetic.Line({
            points: [yFromX, yFromY, yToX, yToY, yToX-headLen*Math.cos(angle-Math.PI/6),yToY-headLen*Math.sin(angle-Math.PI/6),yToX, yToY, yToX-headLen*Math.cos(angle+Math.PI/6),yToY-headLen*Math.sin(angle+Math.PI/6)],
            strokeWidth:border,
            stroke: '#A0A0A0',
            lineJoin: 'round'
        });

        axesLayer.add(x);
        axesLayer.add(y);

        return axesLayer;
    }
}