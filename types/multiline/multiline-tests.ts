/// <reference path="multiline" />

var text:string = multiline(function() {/*
    This is some text.

    It will show up indented.
*/});

var text:string = multiline.stripIndent(function() {/*
 This is some text.

 It will not show up indented.
*/})
