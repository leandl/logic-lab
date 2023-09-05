from app import create_app

if __name__ == "__main__":
    debug = True
    app = create_app(debug=debug)

    app.run()

