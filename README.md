# New Status Panel for Grafana

## Getting started

### Dev release installation

Installing dev version of grafana plugin requires:
1. to change `grafana.ini` config to allow loading unsigned plugins:
``` ini
[plugins]
allow_loading_unsigned_plugins = victoriametrics-datasource
```