function IconFactory(dimensions, options){
    this.extendLayer = function(i, itemData, iconsLayer, stage, imageM) {
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
                y: (imageH * i) + imageM,
                x: x,
                image: imageObj
            });
            iconsLayer.add(item);
            stage.draw();
        };

        imageObj.src = itemData.image;
    }
}