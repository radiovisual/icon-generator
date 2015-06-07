#Icon Generator

Auto-generate multiple variably-sized icon files from one single image source.
Currently, only iOS icons are generated, but Andriod and Windows Phone support is coming soon.
**This project is a work in progress.**

##Usage

```
$ ./icongen.js [platforms] -s [source image] -o [output destination]
```

Currently, only iOS is fully supported. To generate all iOS icons, simply type:

```
$ ./icongen.js ios -s path/to/source/image.jpg -o ~/Documents/iconfiles/
```
where `-s` is the source image, and `-o` is where you want the generated icons to be saved.
If no option is supplied for `-o` then the current directory will be used.

##Planned Features

- Full Android and Windows Phone Support
- Easily customize the output sizes by supplying a config file

##License

MIT


