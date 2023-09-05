from app import create_app

if __name__ == "__name__":
    debug = True
    app = create_app(debug=debug)

    app.run()

