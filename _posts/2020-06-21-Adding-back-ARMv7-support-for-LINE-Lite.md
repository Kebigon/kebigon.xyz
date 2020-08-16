---
title: Adding back ARMv7 support for LINE Lite
layout: post
---

*UPDATE 2020/08/07*: It seems the ARMv7 apk of Line Lite is still available, it was just not distributed anymore on the website I usually download it.

Recently, LINE removed support for ARM v7 on their LINE Lite android application, however it can be easily added back, let's see how !


I recently had to install line lite on my galaxy nexus, and noticed that the latest version of the application (2.12) does not have support for ARM v7 anymore. I still had the apk of the version I previously used with this phone (2.8.1), so I gave it a try. The installation went correctly, however the application refused to let me login, asking me to update it to a more recent version.

After comparing the content of both 2.8.1 and 2.12 APKs, I noticed a difference in term of native libraries present inside:
* 2.8.1 has a /lib/armeabi-v7a/ folder containing libandromeda.so
* 2.12 has a /lib/arm64-v8a/ folder instead, containing not only libandromeda.so, but also libandromeda-renderengine.so and libpl_droidsonroids_gif.so

## Finding the native libraries for ARMv7

libpl_droidsonroids_gif.so was the easiest to find, as it came from an open-source project: [android-gif-drawable](https://github.com/koral--/android-gif-drawable). You can download a pre-built aar archive from the [Maven central repository](https://mvnrepository.com/artifact/pl.droidsonroids.gif/android-gif-drawable), and extract the library from `/jni/armeabi-v7a/`.

libandromeda.so and libandromeda-renderengine.so were nowhere to be found on the Internet, so I think they are proprietary software made in-house by LINE. After downloading the "normal" (understand: bloated) LINE app's APK, I noticed this one still has support for ARM v7, and its /lib/armeabi-v7a/ contains both libandromeda.so and libandromeda-renderengine.so

## Now that we have all the ingredients, let's do some cooking

You will need:
* The LINE Lite APK
* The three libraries mentionned above
* [APK tool](https://ibotpeaches.github.io/Apktool) to decompile and recompile the APK
* [APK signer](https://github.com/patrickfav/uber-apk-signer) to sign the APK with a debug certificate

First, let's decode the application content using APK Tool:
```
$ java -jar apktool.jar d linelite.apk
```

Now remove the /lib/arm64-v8a/ folder, and create a new one named /lib/armeabi-v7a/, copy the 3 libraries into it.

Then, we'll build the APK again with the new content:
```
$ java -jar apktool.jar b linelite
```

Unfortunately APK tool produces unsigned APKs, this is fine to test with an emulator, but a real android device will refuse to have it sideloaded, so we need to sign it using APK signer:
```
$ java -jar uber-apk-signer.jar -a linelite/dist/linelite.apk
```

## Conclusion

It seems the reasons behind the ARM v7 support removal are not technical, and it can easily be added back.
