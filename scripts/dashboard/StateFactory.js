function StateFactory(dimensions, options) {
    this.create = function(i, itemData) {
        var offsetStart = itemData.start.getTime() - dimensions.startT;
        var offsetFinish = itemData.finish.getTime() - dimensions.startT;
        var maxOffset = dimensions.finishT - dimensions.startT;
        var x = (offsetStart / maxOffset) * dimensions.mainW;
        var y = (offsetFinish / maxOffset) * dimensions.mainW;


        var stateM = dimensions.itemH * 0.1;

        var color = options.defaultColor;
        var progressColor = options.progressDefaultColor;
        if (itemData.blocker) {
            color = options.blockerColor;
            progressColor = options.progressBlockerColor;
        }

        var itemHWithMargin = dimensions.itemH - 2 * stateM;

        var group = new Kinetic.Group({
            height: itemHWithMargin,
            width: y - x,
            x: x,
            y: (dimensions.itemH * i)
        });


        var rec = new Kinetic.Rect({
            height: itemHWithMargin,
            width: (y - x) * (1 - (itemData.progress / 100)),
            x: (y - x) * (itemData.progress / 100),
            y: stateM,
            fill: color,
            opacity: 0.8
        });

        var progress = new Kinetic.Rect({
            height: itemHWithMargin,
            width: (y - x) * (itemData.progress / 100),
            x: 0,
            y: stateM,
            fill: progressColor,
            opacity: 0.9
        });


        var border = new Kinetic.Rect({
            height: itemHWithMargin,
            width: y - x,
            x: 0,
            y: stateM,
            stroke: 'black',
            strokeWidth: 1
        });


        var releaseLine = new Kinetic.Line({
            points: [y - x, dimensions.itemH - stateM, y - x, (dimensions.mainH - dimensions.itemH * i)],
            stroke: 'black',
            strokeWidth: 0.5,
            dashArray: [5, 5],
            opacity: 0.5
        });

        group.add(rec);
        group.add(progress);
        group.add(border);
        group.add(releaseLine);

        return group;
    }
}