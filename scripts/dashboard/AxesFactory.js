function AxesFactory(){
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
            strokeWidth:0.5,
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
            strokeWidth:0.5,
            stroke: '#A0A0A0',
            lineJoin: 'round'
        });

        var now = new Date();
        var offsetStart = now.getTime() - dimensions.startT;
        var maxOffset = dimensions.finishT - dimensions.startT;
        var currentTimeLineX = (offsetStart / maxOffset) * dimensions.mainW;
        var currentTimeLine = new Kinetic.Line({
            points: [currentTimeLineX, 0, currentTimeLineX, dimensions.mainH],
            stroke: 'green',
            dashArray: [5, 5],
            strokeWidth:0.5
        });

        axesLayer.add(x);
        axesLayer.add(y);

        this.calculateScale(dimensions, axesLayer);
        axesLayer.add(currentTimeLine);

        return axesLayer;
    }

    this.calculateScale = function(dimensions, axesLayer) {
        var millisecondsInDay = 86400000;
        var timeRange = dimensions.finishT - dimensions.startT;
        var days = timeRange / millisecondsInDay;
        var scale = Math.ceil(days / 20);
        var scaleStartT = Math.floor((dimensions.startT / millisecondsInDay)) * millisecondsInDay;

        var offset = (scaleStartT / timeRange) *  timeRange;

        while(scaleStartT < dimensions.finishT) {
            scaleStartT = scaleStartT + millisecondsInDay * scale;
            offset = ((scaleStartT - dimensions.startT) / timeRange) *  dimensions.mainW;

            var line = new Kinetic.Line({
                points: [offset, dimensions.mainH - 5, offset, dimensions.mainH + 5],
                stroke: '#A0A0A0',
                strokeWidth: 0.5
            });

            axesLayer.add(line);

            var date = new Date(scaleStartT);

            var text = new Kinetic.Text({
                x: offset + 2,
                y: dimensions.mainH,
                text: date.getDate() +  "/" + date.getMonth(),
                fill: 'black',
                fontFamily: 'Calibri',
                fontSize: 12
            });

            axesLayer.add(text);
        }

    }
}