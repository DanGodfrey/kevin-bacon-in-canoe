var kb      = {};
kb.degrees  = [];
kb.nodes    = [];

$(document).ready(function(){    
    $.getJSON('http://groscanot.aybabt.me/v1/degrees?callback=?', function(degrees) {
        var $degrees = $('#degrees');
        
        degrees.sort(degree.compare);
        $(degrees).each(function(index, degreeDetails) {
            var newDegree = new degree(degreeDetails.id);
            
            $(newDegree).bind('ready', function() {
                kb.degrees.push(newDegree);

                var $degreeElem = $('<option></option>');
                $degreeElem.val(newDegree.id);
                $degreeElem.html(newDegree.name);
                $degreeElem.data('data-degree', newDegree);
                $degrees.append($degreeElem);
            });
        });
    });
    
    $('#degrees').change(function() {
        var selectedDegree = $('#degrees :selected').data('data-degree');
    
        kb.nodes = [];
    
        $(kb.degrees).each(function(index, degree) {
            if (degree !== selectedDegree) {
                var newNode = new kbNode(selectedDegree, degree);
                kb.nodes.push(newNode);
            }
        });
        
        kb.nodes = $.grep(kb.nodes, kbNode.filter);
        
        kb.nodes.sort(kbNode.compare);
        
        kbNode.renderAll($('#separations'), kb.nodes);
    });
});