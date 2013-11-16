function DimensionsCalculator() {
    this.calculate = function(items, options) {
        var startT = 10000000000000;
        var finishT = 0;
        _.each(items, function (item) {
            if (startT > item.start.getTime()) {
                startT = item.start.getTime();
            }

            if (finishT < item.finish.getTime()) {
                finishT = item.finish.getTime();
            }
        });

        var timeRange = finishT - startT;
        var timeM = 2 *timeRange / 100;
        startT = startT - timeM;
        finishT = finishT + timeM;

        var marginH = options.stageHeight / 100;
        var marginW = options.stageWidth / 100;
        var iconsW = 450 / items.length;

        var mainH = options.stageHeight - 2 * marginH;
        var mainW = options.stageWidth - 2 * marginW - iconsW - options.iconsRightMargin;
        var mainX = marginW + options.iconsRightMargin + iconsW;
        var itemH = mainH / items.length;

        return {
            stageWidth: options.stageWidth,
            stageHeight: options.stageHeight,
            marginH: marginH,
            marginW: marginW,
            startT: startT,
            finishT: finishT,
            iconsRightMargin: options.iconsRightMargin,
            iconsW: iconsW,
            mainH: mainH,
            mainW: mainW,
            mainX: mainX,
            itemH: itemH
        }
    }
};