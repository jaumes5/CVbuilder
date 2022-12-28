from flask import Flask, render_template


app = Flask(__name__)

MENU_ITEMS = ["Home", "Experience", "Education", "Skills", "Contact"]


@app.route("/")
def index():
    jobs = [
        {
            "title": "Exp1",
            "company": "Meritis",
            "dates": "2016-2018",
            "description": "jqjqjq",
        },
        {
            "title": "Exp2",
            "company": "Otro",
            "dates": "2017-2019",
            "description": "lorem ipsum",
        },
        {
            "title": "Exp1",
            "company": "Meritis",
            "dates": "2016-2018",
            "description": "jqjqjq",
        },
        {
            "title": "Exp2",
            "company": "Otro",
            "dates": "2017-2019",
            "description": "lorem ipsum",
        },
        {
            "title": "Exp1",
            "company": "Meritis",
            "dates": "2016-2018",
            "description": "jqjqjq",
        },
        {
            "title": "Exp2",
            "company": "Otro",
            "dates": "2017-2019",
            "description": "lorem ipsum",
        },
    ]
    return render_template(
        "index.html",
        jobs=jobs,
        name="Jaime Boixadós Martínez",
        job_title="Software Engineer/Data Engineer",
    )


if __name__ == "__main__":
    app.debug = True
    app.run()  # go to http://localhost:5000/ to view the page.
