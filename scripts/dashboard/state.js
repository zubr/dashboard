function State(dimensions, options) {
    this.create = function(i, itemData) {
        var offsetStart = itemData.start.getTime() - dimensions.startT;
        var offsetFinish = itemData.finish.getTime() - dimensions.startT;
        var maxOffset = dimensions.finishT - dimensions.startT;
        var x = (offsetStart / maxOffset) * dimensions.mainW;
        var y = (offsetFinish / maxOffset) * dimensions.mainW;

        var stateM = null;
        if (dimensions.itemH > dimensions.iconsW) {
            stateM = (dimensions.itemH - dimensions.iconsW) / 2;
        } else {
            stateM = (dimensions.iconsW - dimensions.itemH) / 2;
        }

        var color = options.defaultColor;
        var progressColor = options.progressDefaultColor;
        if (itemData.blocker) {
            color = options.blockerColor;
            progressColor = options.progressBlockerColor;
        }

        var itemHWithMargin = dimensions.itemH - stateM * 2;

        var group = new Kinetic.Group({
            height: itemHWithMargin,
            width: y - x,
            x: x,
            y: (dimensions.itemH * i) + stateM
        });

        var rec = new Kinetic.Rect({
            height: itemHWithMargin,
            width: y - x,
            x: 0,
            y: 0,
            fill: color
        });

        var progress = new Kinetic.Rect({
            height: itemHWithMargin,
            width: (y - x) * (itemData.progress / 100),
            x: 0,
            y: 0,
            fill: progressColor
        });

        var border = new Kinetic.Rect({
            height: itemHWithMargin,
            width: y - x,
            x: 0,
            y: 0,
            stroke: 'black',
            strokeWidth: 1
        });


        group.add(rec);
        group.add(progress);
        group.add(border);
        return group;
    }
}