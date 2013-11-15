function Dashboard(items, options) {
    var calculator = new DimensionsCalculator();

    function printAxes(dimensions, axesLayer) {
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
            strokeWidth:1,
            stroke: '#A0A0A0'
    });

        var yFromX = 0;
        var yFromY = dimensions.mainH;
        var yToX =  0;
        var yToY =  0;

        var angle = Math.atan2(yToY-yFromY,yToX-yFromX);
        var y = new Kinetic.Line({
            points: [yFromX, yFromY, yToX, yToY, yToX-headLen*Math.cos(angle-Math.PI/6),yToY-headLen*Math.sin(angle-Math.PI/6),yToX, yToY, yToX-headLen*Math.cos(angle+Math.PI/6),yToY-headLen*Math.sin(angle+Math.PI/6)],
            strokeWidth:1,
            stroke: '#A0A0A0'
        });

        axesLayer.add(x);
        axesLayer.add(y);
    }

    if (options == null) {
        options = {};
    }

    _.defaults(
        options,
        {
            stageWidth: 1200,
            stageHeight: 600,
            defaultColor: '#33cc00',
            blockerColor: '#FF0000',
            iconsRightMargin: 20
        }
    );

    var dimensions = calculator.calculate(items, options);

    var stage = new Kinetic.Stage({
        container: 'stage',
        width: dimensions.stageWidth,
        height: dimensions.stageHeight
    });

    var axesLayer = new Kinetic.Layer({
        x: dimensions.mainX,
        y: dimensions.marginH,
        width: dimensions.mainW,
        height: dimensions.mainH
    });

    printAxes(dimensions, axesLayer);

    var iconsLayer = new Kinetic.Layer({
        x: dimensions.marginW,
        y: dimensions.marginH,
        width: dimensions.iconsW,
        height: dimensions.mainH
    });
    var mainLayer = new Kinetic.Layer({
        x: dimensions.mainX,
        y: dimensions.marginH,
        width: dimensions.mainW,
        height: dimensions.mainH
    });

    var iconsArea = new Kinetic.Rect({
        width: dimensions.iconsW,
        height: dimensions.mainH
    });



    iconsLayer.add(iconsArea);
    var itemH = dimensions.mainH / items.length;
    var imageM = null;
    if (itemH > dimensions.iconsW) {
        imageM = (itemH - dimensions.iconsW) / 2;
    } else {
        imageM = (dimensions.iconsW - itemH) / 2;
    }




    var images = [];
    _.each(items, function (itemData, key) {
        var imageObj = new Image();
        imageObj.onload = function () {
            var item = new Kinetic.Image({
                height: itemH - imageM * 2,
                width: dimensions.iconsW,
                y: (itemH * key) + imageM,
                image: imageObj
            });
            iconsLayer.add(item);
            stage.draw();
        };

        imageObj.src = itemData.image;

        var offsetStart = itemData.start.getTime() - dimensions.startT;
        var offsetFinish = itemData.finish.getTime() - dimensions.startT;
        var maxOffset = dimensions.finishT - dimensions.startT;
        var x = (offsetStart / maxOffset) * dimensions.mainW;
        var y = (offsetFinish / maxOffset) * dimensions.mainW;

        var color = options.defaultColor;
        if (itemData.blocker) {
            color = options.blockerColor;
        }

        var planRec = new Kinetic.Rect({
            height: itemH - imageM * 2,
            width: y - x,
            x: x,
            y: (itemH * key) + imageM,
            fill: color,
            stroke: 'black',
            strokeWidth: 0.5
        });

        mainLayer.add(planRec);
    });

    stage.add(axesLayer);
    stage.add(iconsLayer);
    stage.add(mainLayer);
}