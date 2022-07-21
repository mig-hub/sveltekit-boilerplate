These are migrations used to create content types in ContentFul.
You can run them like this:

```
contentful space migration --space-id <SPACE-ID> migrations/01-init.js
```

If there is an error about CommonJS modules, it might be because it tries to
adapt to the closest package.json which does not match the installed version of
contentful cli. In this case, try to copy and run the migrations from another
location.

[Read documentation](https://github.com/contentful/contentful-migration/blob/master/README.md)

