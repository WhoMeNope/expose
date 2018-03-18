# Expose

Expose localhost port on local network.

(exposes http only)

## Usage

```bash
expose {localhost port} {local network port}
```

```javascript
const expose = require("expose");

const localPort = 3000;
const publicPort = 3000;
expose(localPort, publicPort)
```

