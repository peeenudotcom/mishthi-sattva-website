#!/usr/bin/env python3
"""Static dev server for the Mishthi Sattva site.

Serves the project root over HTTP so the pages' ../../ asset paths resolve, and
sends no-cache headers so edits show up on a normal reload (plain
`python3 -m http.server` caches aggressively). Run: python3 serve.py
"""
import http.server
import socketserver
import os

# Serve from this file's directory regardless of where it's launched from.
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT = 8642


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"Mishthi Sattva static server → http://localhost:{PORT}/ui_kits/website/index.html")
    httpd.serve_forever()
