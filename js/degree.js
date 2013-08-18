var degree = function(id) {
    this.id         = id;
    this.detailsUrl = 'http://groscanot.aybabt.me/v1/degrees/' + this.id + '?callback=?';
    this.courses    = [];
    
    var that = this;
    
    $.getJSON(this.detailsUrl, function(degree) {
        that.name        = degree.name;
        that.uOttawaUrl  = degree.url;
        that.numCredits  = degree.credit;
        that.extraInfo   = degree.extra;
        that.dateUpdated = degree.updated;
        
        $(degree.mandat).each(function(index, courseCode) {
            that.courses.push(new course(courseCode));
        });
        
        $(that).trigger('ready');
    });
};

degree.compare = function(a, b){
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
};