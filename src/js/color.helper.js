class ColorHelper{
    static rgbToHex (rgb) {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };

    static fullColorHex (r, g, b) {
        var red = ColorHelper.rgbToHex(r);
        var green = ColorHelper.rgbToHex(g);
        var blue = ColorHelper.rgbToHex(b);
        return red + green + blue;
    };
}

export default ColorHelper;