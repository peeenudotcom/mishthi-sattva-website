#!/usr/bin/env python3
"""Serve the built dist/ folder for verification, with caching disabled."""
import http.server, socketserver, os, sys
ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dist")
os.chdir(ROOT)
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8731

class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", PORT), H) as httpd:
    print(f"dist → http://localhost:{PORT}/")
    httpd.serve_forever()
