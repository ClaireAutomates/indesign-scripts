pages = app.documents[0].pages.everyItem().getElements();
thread = pages[0].textFrames[0];
for (i = 1; i < pages.length; i++) {
  thread.endTextFrame.nextTextFrame = pages[i].textFrames[0];
}