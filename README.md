#Exam Preparation jQuery Tool#

Takes a json formatted file and prepares an exam based on that json file. All external resources (js and css) are served via Google CDN but can be local if you change the index.hmtl file.

To add new json exams copy the existing one and add a reference to the dropdown on the top-left of the page.

I made this so as my wife would not roll her eyes when I asked for help with revision... hopefully it'll help you too.

I'm using [JsRender](https://github.com/borismoore/jsrender) though this might change soon...

##Edit##

Can now have multiple json files within the main directory to ease the changing of exams. To reference the other exams add a custom.json file in this format:

``` javascript
{   "root": "customitems",
    "chapters": [
        {"name": "Test 1", "file": "test1.json"},
        {"name": "Test 2", "file": "test2.json"},
        ...
    ]
}
```

Then you can click the "Get Custom" button on the top right to access the new files.

Also added a hint button for those who might need a little help. The hint emboldens the label for the correct answer, it won't remove the hint unless the page is reloaded... just so you'll know what you needed help with ;-)

##Usage##

You can run this after downloading but at present it will only work on [FireFox](https://www.mozilla.org/en-GB/firefox/new/) as it's pulling files from a CDN and Chrome _et al_ aren't all that keen on you loading external resources for a local file unless you're running it from a local server such as [XAMPP](https://www.apachefriends.org/index.html). As such it might be easier just to install FireFox.

Should you have you own set of json files then please just add them to the root directory (i.e. the directory where index.html is) and click the "Get Custom" button.

##Make you own##

If you want to make your own exams then just check the format of test1.json:

``` javascript
{
    "exam": [
        {
            "question": "Jack and Jill went up the hill to fetch?",
            "answers": {
                "a": "A pail of water",
                "b": "Porridge",
                "c": "Vinegar"
            },
            "solution": [
                "a"
            ]
        },
        {
            "question": "What did the old woman who lived in a shoe do to her children?",
            "answers": {
                "a": "She gave them some broth without any bread.",
                "b": "She starved them.",
                "c": "She sent them to sweep chimneys.",
                "d": "She whipped them all soundly and put them to bed."
            },
            "solution": [
                "a",
                "d"
            ]
        }
    ]
}
```

It is an object with an exam key and an array of _questions_ made up of a **question**, an **answers** object with a number of _lettered_ possible answers within it and a **solution** array with each correct _letter_ contained within it (1 or more). Dead easy ehh?

If you make more than one logical exam then add them to the custom.json as detailed above.
