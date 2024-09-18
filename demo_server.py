import os
from http.server import SimpleHTTPRequestHandler, HTTPServer

# Define the base directory to serve
BASE_DIR = os.path.abspath(os.getcwd())  # This will be your `./` directory

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Get the original path
        original_path = super().translate_path(path)

        # Resolve the absolute path
        abs_path = os.path.abspath(original_path)

        # Check if it's a symlink
        if os.path.islink(original_path):
            # Resolve the symlink
            abs_path = os.path.realpath(original_path)
        
        # Ensure the resolved path is within the allowed base directory
        if not abs_path.startswith(BASE_DIR):
            print(f"Security Warning: Attempt to access outside the allowed directory: {abs_path}")
            return None  # Block access if the symlink points outside the base directory

        return abs_path

# Set up the HTTP server
def run(server_class=HTTPServer, handler_class=MyHTTPRequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Serving HTTP on port {port}...")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
