import argparse

from router import create_app


def arg_parser():
    parser = argparse.ArgumentParser(description="Run the Flask app")
    parser.add_argument(
        "-p",
        "--port",
        type=int,
        default=3000,
        help="Port to run the app on (default 3000)",
    )
    return parser.parse_args()


def main():
    args = arg_parser()
    create_app(args.port)


if __name__ == "__main__":
    main()
