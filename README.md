# Angular Electron Cordova

## Electron integration

### Source
Regarding the ElectronJS integration, this repo is greatly inspired by:
- https://github.com/maximegris/angular-electron


## Cordova integration

### Source
Regarding Cordova, I used this article:
- https://medium.com/@neridonk/create-a-mobile-app-in-angular-and-run-it-on-your-android-phone-with-cordova-5fe8a8adb598

### Requirements
Install:
- Node and NPM
- Cordova (via NPM and globally)
- openjdk-8-jdk (via apt)
    - Remove all existing Java versions first
- Gradle (via apt)
- Android Studio (via the JetBrains Toolbox)

### Add to your `.bashrc` file
- `export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"`
- `export ANDROID_SDK_ROOT="$HOME/Android/Sdk"`

### Inside Android Studio
Open the IDE settings and go to: `Appearance & Behavior -> System settings -> Android SDK` and add the `API level 29`

### Inside the Angular project
- Run `cordova create cordova`
- Run `cd cordova`
- Run `cordova platform add android` 
- Run `cordova platform add ios` (if needed)
- Then go back to the Angular project root with `cd ..`
- Update the `src/index.html` file, change the `base href` tag to `<base href="./">`
- Update the `cordova/package.json` file and add the new script: 
    - `"cordova:android": "cordova run android --device"`
- Update the root `package.json` file and add the new scripts: 
    - `"start:android": "npm run build:android && npm run --prefix ./cordova cordova:android"`
    - `"build:android": "ng build --output-path ./cordova/www/ --prod"`
    
### Build and run
To build and run the project, execute the following command :
- `npm run start:android`

### Other 
Install :
- `adb` : Android Debug Bridge. To manage plugged Android devices.
- Run `sudo usermod -aG plugdev $LOGNAME` to add your user to the `pludev` group to allow yourself to plug and manage android devices.
- `apt-get install android-sdk-platform-tools-common`
- View also: https://developer.android.com/studio/run/device
