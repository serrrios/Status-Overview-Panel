# New Status Panel

The New Status Panel is a plugin designed to provide an overview of the status of various components in a single view. Similar to the Single Stat panel, this plugin can hold multiple values from the same data source, and each value can be customized to mark the severity or disable status of the component, or show extra data about it.

![Simple work](https://raw.githubusercontent.com/serrrios/New-Status-Panel/master/img/preview_transparent.png)


### Dev release installation

Installing dev version of grafana plugin requires:
1. to change `grafana.ini` config to allow loading unsigned plugins:
``` ini
[plugins]
allow_loading_unsigned_plugins = krasnov-newstatus-panel
```