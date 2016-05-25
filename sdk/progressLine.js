function progressLine(parent, leftcolor, showRightValue, rightColor) {
    var _height = 35, _width = 500;
    var _fontSize = 18;

    var _valueLeft = 50;
    var _minValue = 0, _maxValue = 100;

    var _leftText = "";
    var _rightText = "";

    function make() {
        var tabOldSVG = d3.select(parent).selectAll("svg");
        tabOldSVG.each(function(index, el) {
            d3.select(this).remove();
        });

        var container = d3.select(parent).append("svg")
            .attr("width", _width)
            .attr("height", _height)
            .attr("opacity", 0.0);

        var leftProgressLine = container.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", _height)
            .attr("class", "leftProgressLine")
            .attr("style", "fill: " + leftcolor + ";");

        var leftValue = _width * ((_valueLeft - _minValue) / _maxValue);

        var rightProgressLine = container.append("rect")
            .attr("x", _width)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", _height)
            .attr("class", "rightProgressLine")
            .attr("style", "fill: " + rightColor + ";");

        var leftText = container.append("text")
            .attr("class", "progress-text")
            .attr("y", (_fontSize / 3) + (_height / 2))
            .attr("x", 25)
            .style({"font-size": _fontSize + "px"})
            .text(_leftText);
            //.text((((_valueLeft - _minValue) / _maxValue) * 100) + "%");

        if (showRightValue === true) {
            var rightText = container.append("text")
                .attr("class", "progress-text")
                .attr("y", (_fontSize / 3) + (_height / 2))
                .attr("x", _width - 50)
                .style({"font-size": _fontSize + "px"})
                .text(_rightText);
                //.text((100 - (((_valueLeft - _minValue) / _maxValue) * 100)) + "%");
        }


        container.transition()
            .duration(1000)
            .attr("opacity", 1.0);

        leftProgressLine.transition()
            .duration(1000)
            .attr('width', leftValue);

        rightProgressLine.transition()
            .duration(1000)
            .attr('x', leftValue)
            .attr('width', _width - leftValue);
    }

    make.minValue = function(_) {
        if (!arguments.length) return _minValue;
        _minValue = _;
        make();
        return make;
    }

    make.maxValue = function(_) {
        if (!arguments.length) return _maxValue;
        _maxValue = _;
        make();
        return make;
    }

    make.width = function(_) {
        if (!arguments.length) return _width;
        _width = _;
        make();
        return make;
    }

    make.height = function(_) {
        if (!arguments.length) return _height;
        _height = _;
        make();
        return make;
    }

    make.valueLeft = function(_) {
        if (!arguments.length) return _valueLeft;
        _valueLeft = _;
        make();
        return make;
    }

    make.fontSize = function(_) {
        if (!arguments.length) return _fontSize;
        _fontSize = _;
        make();
        return make;
    }

    make.leftText = function(_) {
        if (!arguments.length) return _leftText;
        _leftText = _;
        make();
        return make;
    }

    make.rightText = function(_) {
        if (!arguments.length) return _rightText;
        _rightText = _;
        make();
        return make;
    }

    return make
}
