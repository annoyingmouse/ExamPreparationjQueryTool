Exam Preparation jQuery Tool
===

Takes a json formatted file and prepares an exam based on that json file. All external resources (js and css) are served via Google CDN but can be local if you change the index.hmtl file.

To add new json exams copy the existing one and add a reference to the dropdown on the top-left of the page.

I made this so as my wife would not roll her eyes when I asked for help with revision... hopefully it'll help you too.

**Edit**

Can now have multiple json files within the main directory to ease the changing of exams. To reference the other exams add a custom.json file in this format:

```javascript
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