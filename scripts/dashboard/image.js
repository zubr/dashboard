function IconFactory(dimensions, options){
    this.extendLayer = function(i, itemData, iconsLayer, stage) {
        var imageObj = new Image();
        var imageH = dimensions.itemH;
        var imageW = dimensions.iconsW;
        var x = 0;

        if (imageH < dimensions.iconsW) {
            imageW = imageH;
            x = (dimensions.iconsW - imageW)/2;
        }

        var imageM = imageW * 0.10;

        imageObj.onload = function () {
            var item = new Kinetic.Image({
                height: imageH - 2*imageM,
                width: imageW - 2*imageM,
                y: (imageH * i) + imageM,
                x: x + imageM,
                image: imageObj
            });
            iconsLayer.add(item);
            stage.draw();
        };

        imageObj.src = itemData.image;
    }
}