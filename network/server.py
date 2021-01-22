from flask import Flask, render_template, send_file
app = Flask(__name__)



@app.route("/")
def sanity_check():
    try:
        return send_file("image.jpg")
    except Exception as e:
        return "<html>Something failed: {}</html>".format(e)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')