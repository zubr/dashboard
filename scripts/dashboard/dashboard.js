function Dashboard(items, options) {
    var calculator = new DimensionsCalculator();

    function printAxes(dimensions, axesLayer) {

    }

    if (options == null) {
        options = {};
    }

    _.defaults(
        options,
        {
            stageWidth: 1200,
            stageHeight: 600,
            defaultColor: '#009900',
            progressDefaultColor: '#33cc00',
            blockerColor: '#FF0000',
            progressBlockerColor: '#FF6600',
            iconsRightMargin: 20
        }
    );

    var dimensions = calculator.calculate(items, options);

    var stage = new Kinetic.Stage({
        container: 'stage',
        width: dimensions.stageWidth,
        height: dimensions.stageHeight
    });


    var axesFactory = new Axes();
    var axesLayer = axesFactory.createLayer(dimensions)

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




    var stateFactory = new State(dimensions, options);

    _.each(items, function (itemData, key) {
        var imageObj = new Image();
        var imageH = dimensions.itemH;
        var imageW = dimensions.iconsW;
        var x = 0;
        if (imageH < dimensions.iconsW) {
            imageW = imageH;
            x = (dimensions.iconsW - imageW)/2;
        }

        imageObj.onload = function () {
            var item = new Kinetic.Image({
                height: imageH - imageM * 2,
                width: imageW,
                y: (imageH * key) + imageM,
                x: x,
                image: imageObj
            });
            iconsLayer.add(item);
            stage.draw();
        };

        imageObj.src = itemData.image;

        var state = stateFactory.create(key, itemData, imageM, itemH);

        mainLayer.add(state);
    });

    stage.add(axesLayer);
    stage.add(iconsLayer);
    stage.add(mainLayer);
}