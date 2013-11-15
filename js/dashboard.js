function DashBoard(items) {

    var stageWidth = 1200;
    var stageHeight = 600;
    var marginH = Math.floor(stageHeight / 100);
    var marginW = Math.floor(stageWidth / 100);
    var startT = 10000000000000;
    var finishT = 0;
    _.each(items, function(item) {
        if(startT > item.start.getTime()) {
            startT = item.start.getTime();
        }

        if(finishT < item.finish.getTime()) {
            finishT = item.finish.getTime();
        }
    });

    var timeRange = finishT - startT;
    var timeM = timeRange/100;
    startT = startT - timeM;
    finishT = finishT + timeM;

    var iconsW = 100;
    if(items.length > 4) {
        iconsW = 450 / items.length;
    }


    var mainH  = stageHeight - 2 * marginH;

    var iconsAreaMargin = 10;

    var stage = new Kinetic.Stage({
        container: 'stage',
        width: stageWidth,
        height: stageHeight
    });

    var mainWidth = stageWidth - 2 * marginW - iconsW - iconsAreaMargin;
    var mainX = marginW + iconsAreaMargin + iconsW;

    var axesLayer = new Kinetic.Layer();

    var iconsLayer = new Kinetic.Layer({
        x: marginW,
        y: marginH,
        width: iconsW,
        height: mainH
    });
    var mainLayer = new Kinetic.Layer({
        x: mainX,
        y: marginH,
        width: mainWidth,
        height: mainH
    });

    var iconsArea = new Kinetic.Rect({
        width: iconsW,
        height: mainH
    });

    var mainArea = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: mainWidth,
        height: mainH,
        fill: '#FFFFE0',
        stroke: 'black',
        strokeWidth: 0.1
    });

    iconsLayer.add(iconsArea);
    var itemH = mainH / items.length;
    var imageHW = null;
    var imageM = null;
    if(itemH > iconsW) {
        imageHW = iconsW;
        imageM = (itemH - iconsW) /2;
    } else {
        imageHW = itemH;
        imageM = (iconsW - itemH) /2;
    }

    mainLayer.add(mainArea);


    var images = [];
    _.each(items, function(itemData, key) {
        var imageObj = new Image();
        imageObj.onload = function() {
            var item = new Kinetic.Image({
                height: itemH - imageM*2,
                width: iconsW,
                x:0,
                y: (itemH*key) + imageM,
                image: imageObj
            });
            iconsLayer.add(item);
            stage.draw();
        };

        images[images.length] = imageObj;

        var offsetStart = itemData.start.getTime() - startT;
        var offsetFinish = itemData.finish.getTime() - startT;
        var maxOffset = finishT - startT;
        var x = (offsetStart / maxOffset) * mainWidth;
        var y = (offsetFinish / maxOffset) * mainWidth;

        var color = '#33cc00';
        if(itemData.blocker) {
            color = '#FF0000';
        }

        var planRec = new Kinetic.Rect({
            height: itemH - imageM*2,
            width: y-x,
            x:x,
            y: (itemH*key) + imageM,
            fill: color,
            stroke: 'black',
            strokeWidth: 0.5
        });

        mainLayer.add(planRec);
    });



    _.each(items, function(item, key){
        images[key].src = item.image;

    });

    stage.add(iconsLayer);
    stage.add(mainLayer);

}