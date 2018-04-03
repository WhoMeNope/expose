# portp

Deprecated!

Unsafe to use, allows outside traffic to access local services (which usually have minimal or no security of their own)!

---

Expose localhost port on local network.

(exposes http only)

## Usage

```bash
portp {localhost port} {local network port}
```

```javascript
const portp = require("portp");

const localPort = 3000;
const publicPort = 3000;
portp(localPort, publicPort)
```

