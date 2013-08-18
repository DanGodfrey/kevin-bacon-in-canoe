var kbNode = function(kevin, bacon) {
    this.kevin               = kevin;
    this.bacon               = bacon;
    this.separation          = [];
    this.degreesOfSeparation = 0;
    
    var that = this;
    
    $(this.bacon.courses).each(function(index, bCourse) {
        // $.inArray doesn't seem to work with objects.
        var hasMatch = false;
        $(that.kevin.courses).each(function(index, kCourse) {
            if (bCourse.courseCode === kCourse.courseCode) {
                hasMatch = true;
                return false;
            }
        });
        if (!hasMatch) {
            that.separation.push(bCourse);
            that.degreesOfSeparation++;
        }
    });
    
    //yes this is ugly, deal with it. 
    
    this.$template = $('<div></div>');
    this.$template.append(this.bacon.name); 
    this.$template.append(' - '); 
    this.$template.append(this.degreesOfSeparation); 
    this.$template.append(' - ');
    this.$template.append('['); 
    $(this.separation).each(function(index, course) {
        that.$template.append(course.courseCode);
        that.$template.append(', ');
    });
    this.$template.append(']');  
};

kbNode.compare = function(a, b) {
    if (a.degreesOfSeparation < b.degreesOfSeparation) {
      return -1;
    }
    if (a.degreesOfSeparation > b.degreesOfSeparation) {
      return 1;
    }
    return 0; 
};

kbNode.filter = function(node) {
    return node.degreesOfSeparation !== node.bacon.courses.length;
};

kbNode.renderAll = function($container, nodes) {
    $container.empty();
    $(nodes).each(function(index, node) {
        $container.append(node.$template);
    });
};