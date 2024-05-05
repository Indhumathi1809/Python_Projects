from flask import Flask, render_template, request, redirect, url_for, session, make_response

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Dummy user data (replace this with your actual user database)
users = {
    'user1': 'password1',
    'user2': 'password2'
}

@app.route('/')
def index():
    if 'username' in session:
        return f'Logged in as {session["username"]} <br><a href="/logout">Logout</a>'
    return 'You are not logged in <br><a href="/login">Login</a>'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and users[username] == password:
            session['username'] = username
            return redirect(url_for('index'))
        else:
            return 'Invalid username or password'
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    # Clear cache and redirect to prevent caching of sensitive pages
    resp = make_response(redirect(url_for('index')))
    resp.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    # Add JavaScript to clear browser history
    resp.headers['Content-Type'] = 'text/html'
    resp.set_data('''
        <script type="text/javascript">
            window.history.pushState(null, '', '/');
            window.addEventListener('popstate', function(event) {
                window.location.href = '/';
            });
        </script>
    ''')
    return resp

if __name__ == '__main__':
    app.run(debug=True)
