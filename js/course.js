var course = function(courseCode) {
    this.courseCode = courseCode;
    this.detailsUrl = 'http://groscanot.aybabt.me/v1/courses/' + this.courseCode + '?callback=?';
};