from flask import Flask, request, jsonify, render_template
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/init_repository', methods=['POST'])
def init_repository():
    data = request.get_json()
    path = data.get('path')

    try:
        subprocess.run(['git', 'init', path], check=True)
        message = f"Initialized empty Git repository in {path}"
    except subprocess.CalledProcessError as e:
        message = f"Error initializing repository: {e}"

    return jsonify({'message': message})

@app.route('/add_files', methods=['POST'])
def add_files():
    try:
        files = request.files.getlist('files[]')
        for file in files:
            file.save(file.filename)  # Save uploaded file temporarily
            subprocess.run(['git', 'add', file.filename])  # Add file to Git
            subprocess.run(['rm', file.filename])  # Remove temporary file

        message = f"Added {len(files)} file(s) to the repository"
    except Exception as e:
        message = f"Error adding files: {e}"

    return jsonify({'message': message})

if __name__ == '__main__':
    app.run(debug=True)
