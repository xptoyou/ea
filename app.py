from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
import random
import string

app = Flask(__name__)
app.secret_key = 'your-secret-key'

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your-email-password'
app.config['MAIL_DEFAULT_SENDER'] = 'your-email@gmail.com'

# Initialize Flask-Mail
mail = Mail(app)

# Generate a random code
def generate_code(length=6):
    characters = string.digits
    return ''.join(random.choice(characters) for _ in range(length))

# Send verification code via email
def send_verification_code(email, username):
    code = generate_code()
    msg = Message('Your Verification Code',
                  recipients=[email])
    msg.body = f"Hello {username},\n\nYour verification code is: {code}\n\nPlease use this code to verify your account."
    mail.send(msg)
    return code

# Route to handle the form submission
@app.route('/verify', methods=['POST'])
def verify():
    username = request.form['username']
    email = request.form['email']
    send_verification_code(email, username)  # Send verification code

    # Redirect to the email page, passing the email as a query parameter
    return redirect(url_for('show_email', email=email))

# Route to display the email and link to the game
@app.route('/email')
def show_email():
    email = request.args.get('email')
    return render_template('email.html', email=email)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
