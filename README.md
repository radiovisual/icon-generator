#Icon Generator

Auto-generate multiple variably-sized icon files from one single image source.
**This project is a work in progress. Not ready for wide-spread use.**

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

- Full iOS, Android and Windows Phone Support
- Easily customize the output sizes by supplying a config file

##License

MIT


