# Recibe las miniaturas dibujadas por scripts/og/index.html y las guarda en public/og/.
# Uso: python scripts/og/server.py  y abrir http://localhost:5195/scripts/og/index.html en el navegador.
import base64, io, os, re
from http.server import SimpleHTTPRequestHandler, HTTPServer
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
os.chdir(ROOT)


class Handler(SimpleHTTPRequestHandler):
    def do_POST(self):
        name = re.sub(r'[^a-z0-9-]', '', self.path.split('name=')[-1])
        data = self.rfile.read(int(self.headers['Content-Length'])).decode().split(',', 1)[1]
        Image.open(io.BytesIO(base64.b64decode(data))).convert('RGB').save(f'public/og/{name}.jpg', quality=88, optimize=True)
        self.send_response(200)
        self.end_headers()

    def log_message(self, *args):
        pass


HTTPServer(('127.0.0.1', 5195), Handler).serve_forever()
