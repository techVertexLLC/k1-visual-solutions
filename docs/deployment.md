# K1 Web — Production Deployment

## Architecture

```
Client → Caddy (port 80/443) → reverse_proxy /k1 → localhost:3100 (Next.js)
```

## systemd Service

The site runs as a **systemd --user** service with auto-restart and memory limits.

### Service File Location
```
~/.config/systemd/user/k1-web.service
```

### Key Settings
- `Restart=always` — auto-recovers from crashes
- `RestartSec=5` — waits 5 seconds before restart
- `MemoryMax=1G` — prevents OOM from taking down the VM
- `NODE_ENV=production`
- Port: **3100** (do not change — Caddy depends on it)

### Commands
```bash
# Status
systemctl --user status k1-web.service

# Restart (after rebuild)
systemctl --user restart k1-web.service

# Stop
systemctl --user stop k1-web.service

# View logs
journalctl --user -u k1-web.service -f

# Enable on boot (already done)
systemctl --user enable k1-web.service
loginctl enable-linger ubuntu
```

## Deploy New Version

```bash
cd ~/projects/k1-visual-solutions

# 1. Build
npm run build

# 2. Restart service (picks up new .next/ build)
systemctl --user restart k1-web.service

# 3. Verify
sleep 3
curl -sL -o /dev/null -w "%{http_code}" http://localhost:3100/k1/
# Should return 200
```

## RAM Comparison

| Mode | RSS Memory | Notes |
|------|-----------|-------|
| `next dev` | ~800MB-1.5GB | Hot reload, source maps, OOM risk |
| `next start` | ~90-100MB | Production, pre-built, stable |

## Caddy Config (excerpt)

```
handle_path /k1* {
    reverse_proxy localhost:3100
}
```
