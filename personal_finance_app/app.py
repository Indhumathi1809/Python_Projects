from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///finance.db'
db = SQLAlchemy(app)
app.secret_key = 'your_secret_key'

# Define your database models here using SQLAlchemy

if __name__ == '__main__':
    app.run(debug=True)
