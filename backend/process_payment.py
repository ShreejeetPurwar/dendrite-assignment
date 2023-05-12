import stripe
from flask import request, jsonify
from .app import app

stripe.api_key = 'your_stripe_secret_key'

@app.route('/process-payment', methods=['POST'])
def process_payment():
    data = request.get_json()
    payment_method_id = data['payment_method_id']

    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=1000,  # Amount in cents
            currency='usd',
            payment_method=payment_method_id,
            confirm=True,
        )
        return jsonify({'status': 'success'})
    except stripe.error.StripeError as e:
        return jsonify({'status': 'failure', 'message': str(e)}), 400
