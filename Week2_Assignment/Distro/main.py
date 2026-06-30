from flask import Flask, render_template, request, redirect, url_for, send_from_directory,jsonify


app = Flask(__name__)

@app.route('/submit', methods=['POST'])
#this submit function should take the first name and last name from the two text boxes in main.html, and write them to the data.txt file
def submit():
    json_data = request.get_json()
    print(json_data)
    print(json_data['name'])
    return jsonify(json_data)


@app.route('/get_last_name', methods=['GET'])
#this function should search the data.txt file for the first name sent, and return the last name
def get_last_name():
    return jsonify({'last_name': 'Bannon'})
@app.route('/')
def serve_main():
    return send_from_directory('.', 'main.html')

if __name__ == '__main__':
    app.run(debug=True)