/**
 * Created by drouar_b on 07/09/15.
 */
$(document).ready(function() {
    $('#createForm').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);
        var value = $('#value').val();
        var list = $('#list');

        if(value === '') {
            alert('Les champs doivent êtres remplis');
        }
        else
        {
            $.ajax({
                url: $this.attr('action'),
                type: $this.attr('method'),
                data: $this.serialize(),
                success: function(html) {
                    if (html["status"] === "ok") {
                        var newli = "<li class='list-group-item' id='" + html["id"] + "'>" +
                                        "<div align='right' style='float:right'>" +
                                            "<button class='btn btn-danger btn-xs' id='btn-" + html["id"] + "' onClick='deleteItem(this.id)'>" +
                                                "Delete" +
                                            "</button>" +
                                        "</div>" +
                                        "<div align='left'>" + html["value"] + "</div>" +
                                    "</li>";
                        list.append(newli);
                    } else {
                        alert(html);
                    }
                }
            });
        }
    });
});

function deleteItem(clicked_id) {
    var id = clicked_id.substring(4);
    $.ajax({
        url: '/delete',
        type: 'get',
        data: 'id=' + id,
        success: function(html) {
            if (html["status"] === "ok") {
                var item = $('#' + html["value"]);
                item.remove();
            } else {
                alert(html)
            }
        }
    });
}