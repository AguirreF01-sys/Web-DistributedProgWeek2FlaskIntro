from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__)
DATA_FILE = Path(__file__).with_name("data.txt")


@app.route('/submit', methods=['POST'])
# Takes the first and last name from main.html and writes them to data.txt.
def submit():
    json_data = request.get_json(silent=True) or {}

    first_name = json_data.get('firstName', '').strip()
    last_name = json_data.get('lastName', '').strip()

    if not first_name or not last_name:
        return jsonify({'error': 'First name and last name are required.'}), 400

    # Keep the same FirstName,LastName record format already used by data.txt.
    with DATA_FILE.open('a+', encoding='utf-8') as data_file:
        data_file.seek(0, 2)

        if data_file.tell() > 0:
            data_file.write('\n')

        data_file.write(f'{first_name},{last_name}')

    return jsonify({
        'message': 'Name saved successfully.',
        'firstName': first_name,
        'lastName': last_name
    })


@app.route('/get_last_name', methods=['GET'])
# Reads data.txt, searches for the supplied first name, and returns its last name.
def get_last_name():
    first_name = request.args.get('firstName', '').strip()

    if not first_name:
        return jsonify({'error': 'A first name is required.'}), 400

    if not DATA_FILE.exists():
        return jsonify({'error': 'data.txt was not found.'}), 404

    # split() handles both the original space-separated records and new lines.
    records = DATA_FILE.read_text(encoding='utf-8').split()

    for record in records:
        stored_first_name, separator, stored_last_name = record.partition(',')

        if separator and stored_first_name.casefold() == first_name.casefold():
            return jsonify({'last_name': stored_last_name})

    return jsonify({'error': 'First name not found.'}), 404


@app.route('/')
def serve_main():
    return send_from_directory('.', 'main.html')


if __name__ == '__main__':
    app.run(debug=True)
