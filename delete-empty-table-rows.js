(function () {
    if (app.documents.length === 0) {
        alert("No documents are open.");
        return;
    }

    var doc = app.activeDocument;
    var stories = doc.stories;

    for (var i = 0; i < stories.length; i++) {
        var story = stories[i];

        for (var j = 0; j < story.tables.length; j++) {
            var table = story.tables[j];

            for (var rowIndex = table.rows.length - 1; rowIndex >= 0; rowIndex--) {
                var row = table.rows[rowIndex];
                var hasVisibleText = false;

                for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                    var cell = row.cells[cellIndex];
                    var cellText = cell.texts[0];

                    // Ignore anchored objects
                    if (cellText.rectangles.length > 0 || cellText.textFrames.length > 0 || cellText.groups.length > 0) {
                        continue;
                    }

                    // Remove invisible/structural characters from the content
                    var text = cellText.contents.replace(/[\r\n\t\u00A0\u2002\u2003\u2009\u200A\u2028\u2029\uFEFF\uFFFC\s]+/g, '');

                    if (text !== '') {
                        hasVisibleText = true;
                        break;
                    }
                }

                if (!hasVisibleText) {
                    row.remove();
                }
            }
        }
    }

    alert("Rows without visible text (ignoring hidden characters and anchors) have been deleted.");
})();