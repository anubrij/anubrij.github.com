Date.prototype.getQuarter = function () {
    var mth = this.getMonth() + 1;
    var q = Math.ceil(mth / 3);
    return q;
};
Date.prototype.getSemester = function () {
    var mth = this.getMonth() + 1;
    var s = Math.ceil(mth / 6);
    return s;
};
Date.prototype.getNextQtrFirstDate = function () {
    var mth = this.getMonth() + 1;
    var q = (Math.ceil(mth / 3) * 3);
    return new Date(this.getFullYear(), q, 1);
};
Date.prototype.getNextSemFirstDate = function () {
    var mth = this.getMonth() + 1;
    var s = (Math.ceil(mth / 6) * 6);
    return new Date(this.getFullYear(), s, 1);
};
Date.prototype.getNextYearFirstDate = function () {
    return new Date(this.getFullYear() + 1, 1, 1);
};
Date.prototype.addDays = function (num) {
    var sum = new Date(new Date(this.getTime()).setDate(this.getDate() + num));
    return sum;
};
Date.prototype.addMonth = function (num) {
    var sum = new Date(new Date(this.getTime()).setMonth(this.getMonth() + num));
    if (sum.getDate() < this.getDate()) {
        sum.setDate(0);
    }
    return sum;
};
Date.prototype.addYear = function (num) {
    var sum = new Date(new Date(this.getTime()).setFullYear(this.getFullYear() + num));
    if (sum.getDate() < this.getDate()) {
        sum.setDate(0);
    }
    return sum;
};
Date.prototype.getFirstDateOfMonth = function () {
    var d = new Date(this);
    d.setDate(1);
    return d;
};
Date.prototype.getLastDateOfMonth = function () {
    var d = new Date(this);
    d.setDate(0);
    return d.addMonth(1);
};
Date.prototype.parseExact = function (d, f) {
    if (d == null || d == "" || typeof d == "undefined") return null;
    var aF = [];
    var availSep = [" ", "/", "\\", "-", ".", ""];
    var sep;
    var y, m, d1;
    for (var i = 0; i < availSep.length; i++) {
        aF = f.split(availSep[i]);
        if (aF.length >= 3) {
            sep = availSep[i];
            break;
        }

    }
    if (sep == null || !d) return null;
    if (!d.split) {
        debugger;
        var test = "";
    }
    var _d = d.split(sep);
    if (_d.length < 3) return null;
    for (i = 0; i < 3; i++) {
        var dd = aF[i].toLowerCase();
        if (dd == "dd" || dd == "d") d1 = _d[i];
        if (dd == "mm" || dd == "m") m = _d[i];
        if (dd == "yyyy" || dd == "yy") y = _d[i];
    }
    if (y == null || m == null || d1 == null) return null;
    return new Date(y, (m - 1), d1);

};
Date.prototype.toShortDateString = function (f) {
    if (isNaN(this)) return "";
    if (!f) return;
    var d = this.getDate().toString();
    var m = (this.getMonth() + 1).toString();
    var y = this.getFullYear().toString();
    var sep;
    var aF = [];
    var availSep = [" ", "/", "\\", "-", ".", ""];
    for (var i = 0; i < availSep.length; i++) {
        aF = f.split(availSep[i]);
        if (aF.length >= 3) {
            sep = availSep[i];
            break;
        }

    }
    var _d = [];
    for (i = 0; i < 3; i++) {
        var dd = aF[i].toLowerCase();
        if (dd == "dd") {
            if (d < 10)
                _d.push("0" + d.toString());
            else
                _d.push(d.toString());
        }
        if (dd == "d") {
            _d.push(d.toString());
        }
        if (dd == "mm") {
            if (m < 10)
                _d.push("0" + m);
            else
                _d.push(m);
        }
        if (dd == "m") {
            _d.push(m);
        }
        if (dd == "yyyy") {
            _d.push(y);
        }
    }

    return _d.join(sep);

};