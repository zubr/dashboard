function Dashboard(items, options) {
    var calculator = new DimensionsCalculator();

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
            iconsRightMargin: 10
        }
    );

    var dimensions = calculator.calculate(items, options);

    var stage = new Kinetic.Stage({
        container: 'stage',
        width: dimensions.stageWidth,
        height: dimensions.stageHeight
    });


    var axesFactory = new AxesFactory();
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

    var stateFactory = new StateFactory(dimensions, options);
    var iconFactory = new IconFactory(dimensions, options);
    _.each(items, function (itemData, key) {
        iconFactory.extendLayer(key, itemData, iconsLayer, stage);
        var state = stateFactory.create(key, itemData);

        mainLayer.add(state);
    });

    stage.add(axesLayer);
    stage.add(iconsLayer);
    stage.add(mainLayer);
}